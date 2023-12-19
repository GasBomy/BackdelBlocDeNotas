import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()
import router from './routes/authRoutes.js'
import routerTarea from './routes/tareasRoutes.js'
import cookie from 'cookie-parser'

const app = express()

const PORT = process.env.PORT || 8080

const DB_NAME = process.env.DB_NAME
const DB_PASS = process.env.DB_PASS

const URL_CONNECTION= `mongodb+srv://gasbomy:yTHv9uvJVmv0ROri@cluster0.yuznrqf.mongodb.net/?gasbomyretryWrites=true&w=majority`

mongoose.connect(URL_CONNECTION,{})
.then(()=>{
    console.log('conexion a mongo atlas exitosa')
})
.catch((err)=>{
    console.error('error al conectarse a mongo atlas')
    console.error(err)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(morgan('dev'))
app.use(cookie())

app.get('/', (req, res)=>{
    res.send('hola mundo')
})

app.use('/api', router)
app.use('/api/Tareas', routerTarea)

app.listen(PORT, ()=>{
    console.log(`corriendo en el puerto http://localhost:${PORT}`)
})