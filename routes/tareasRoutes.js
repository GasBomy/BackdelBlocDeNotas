import { TareasCreate, TareasDelete, TareasGet, TareasUpdate,getDataById,getDataByUser } from "../controller/tareasController.js";
import { check } from "express-validator";
/* import RutasProtegidas from "../middleware/authToken.js"; */
import authMiddleware from "../middleware/authMiddleware.js";

import express from 'express'

const routerTarea = express.Router()

routerTarea.post('/Create',authMiddleware,
[
    check('title').isLength({min: 10,max: 50}),
    check('description').isLength({max: 2000}),
]
,TareasCreate)
routerTarea.get('/Get',authMiddleware,TareasGet)
routerTarea.delete('/Delete/:id',authMiddleware,TareasDelete)
routerTarea.put('/Update/:id',authMiddleware,TareasUpdate)
routerTarea.get('/GetById/:id',authMiddleware,getDataById)
routerTarea.get('/GetByUser',authMiddleware,getDataByUser)

export default routerTarea