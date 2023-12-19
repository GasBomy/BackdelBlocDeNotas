import Users from "../models/Users.js";
import {validationResult}from 'express-validator'
import jwt from 'jsonwebtoken'

const Register = async(req, res)=>{
    const {nombre,email,password}=req.body

    const errorResult = validationResult(req)

    if(!errorResult.isEmpty()) return res.status(500).json({mensaje:'Datos incorrectos volver a intentar'})

    const verifyUserEmail= await Users.findOne({email:email})
    if(verifyUserEmail)return  res.status(500).json({mensaje:'El usuario ya existe'})

    const Persona = new Users({
        nombre,
        email,
        password: await Users.passHash(password)
    })

    const saveUser= Persona.save()

    const token= jwt.sign({ id: saveUser._id }, 'perro', {
        expiresIn: '1h'})
        res.cookie('token',token)

    res.json({
        mensaje:'Usuario creado exitosamente',
        saveUser,
        token
    })
}
/*==========================================================================================================*/
const Login= async(req, res)=>{
    const {email, password}=req.body
    
    const errorResult = validationResult(req)
    if(!errorResult.isEmpty()) return res.status(500).json({mensaje:'Datos incorrectos volver a intentar'})

    const userFound = await Users.findOne({email:email})
    if(!userFound) return res.status(500).json({mensaje:'El usuario no existe'})

    const matchPassword= await Users.comparePass(password, userFound.password)
    if(!matchPassword) return res.status(500).json({mensaje:'Contraseña incorrecta, volver a intentar'})

    const token= jwt.sign({email:userFound.email, id: userFound._id}, 'perro', {
        expiresIn: '1h'})
        console.log(userFound)
        console.log({token:token})
        res.cookie('token',token,
        {httpOnly: true,
            secure:true,
            sameSite: 'None'
        })

    res.json({mensaje:' Estas logueado', token,userFound})

}
/* =========================================================================================================*/

//busacar usuario

const searchUser = async (req,res)=>{
    const {email }= req.params

    try {
        const userByEmail= await Users.findOne({email:email})
        console.log(userByEmail)
        res.json({mensaje: 'encontramos al usuario'})
    } catch (error) {
        console.log(error)
        res.json({mensaje:' el usuario no existe'})
    }
}

/*==========================================================================================================*/

//logout

const userLogout= async( req, res)=>{
    res.cookie('token','',{ expires: new Date(0), domain: 'http://localhost:5173', path: '/' })
    return res.sendStatus(200)
    /* res.clearCookie('token');
    return res.sendStatus(200); */
}

/* =========================================================================================================== */
//profile
const Profile = async (req, res) => {
    try {
        const userTokenFound = await Users.findById(req.user.id);

        if (!userTokenFound) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ userTokenFound });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

/*==========================================================================================================*/
//verificaion de token









export {
    Register,
    Login,
    userLogout,
    Profile,
    searchUser
}