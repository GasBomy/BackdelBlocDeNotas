import mongoose from "mongoose";
import bcrypt from "bcrypt"

/* const DB_NAME = process.env.DB_NAME
const DB_PASS = process.env.DB_PASS

const URL_CONNECTION= `mongodb+srv://gasbomy:${DB_PASS}@cluster0.yuznrqf.mongodb.net/${DB_NAME}`

mongoose.connect(URL_CONNECTION,{})  */

const userSchema =new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})


userSchema.statics.passHash=async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePass=async(password, passRecived)=>{
    return await bcrypt.compare(password, passRecived)
}

const Users = mongoose.model('users', userSchema)

export default Users