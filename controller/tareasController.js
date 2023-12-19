import {validationResult}from 'express-validator'
import Tareas from "../models/Tareas.js";


const TareasGet=async(req, res)=>{
    try{
        const dataTareas = await Tareas.find()
        console.log(dataTareas)
        res.json({
            mensaje:'estas son las tareas',
            dataTareas
    })
    }catch(err){
        console.error('error en el servidor al encontrar las tareas')
        console.error(err)
    }
}
/* ========================================================================================================== */
const TareasCreate = async (req, res)=>{
    const {title,description,date}= req.body
    const userId = req.user.id;

    const errorResult = validationResult(req)
    console.log(errorResult)
    if(!errorResult.isEmpty()) return res.status(500).json({mensaje:'Datos incorrectos volver a intentar'})

    try {
        const Tarea = new Tareas({
            title,
            description,
            date,
            user: userId
        })

        const saveTarea= await Tarea.save()

        res.json({
            mensaje:'Tarea creada exitosamente',
            saveTarea
    })   
    } catch (error) {
        console.error(error)
        console.error('Error en el servidor al crear tare, intenta de nuevo')
        res.json({
            mensaje:'Error al crear la tarea'
    }) 
    }

}
/* ========================================================================================================== */

const TareasDelete= async (req, res)=>{
    const {id} = req.params
    try{
        const deleteWork= await Tareas.findByIdAndDelete(id)
        console.log(deleteWork)
        res.json({
            mensaje:'Tarea eliminada exitosamente',
            deleteWork
        })
    }catch(err){
        console.error('error al eliminar la tarea')
        console.error(err)
    }
}
/* ========================================================================================================== */

const TareasUpdate= async( req,res)=>{
    const {id}= req.params

    try{
        const putWork= await Tareas.findByIdAndUpdate({_id:id}, req.body,{new:true})
        console.log(putWork)
        res.json({
            mensaje:'Tarea actualizada exitosamente',
            putWork
        })
    }catch(err){
        console.error('error en ele servidor al actualizar Tarea')
        console.error(err)
    }
}
/* ========================================================================================================== */
// obetener tareas por su id

const getDataById= async (req, res)=>{
    const {id}= req.params
    try {
        const dataById = await Tareas.findById({_id:id}).populate("user")

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        console.log(dataById)
        res.json({mensaje:'Obtencion de tarea exitosa', dataById})
    } catch (error) {
        console.log(error)
        res.json({mensaje:'No pudimos encontrar tu tarea'})
    }
}


/* ========================================================================================================== */
//ibtener tareas dependiendo el ussuario q se loguea

const getDataByUser = async (req, res) => {
    const userId = req.user.id; 
    try {
        const dataByUser = await Tareas.find({ user: userId });
        console.log(dataByUser);
        res.json({ mensaje: 'Obtencion de tarea exitosa', dataTareas: dataByUser, usuario: req.user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'No pudimos encontrar tus tareas'});
    }
};
/* ========================================================================================================== */

export{
    TareasCreate,
    TareasGet,
    TareasDelete,
    TareasUpdate,
    getDataById,
    getDataByUser
}