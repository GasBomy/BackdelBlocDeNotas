import { Login, Register,userLogout,Profile, searchUser } from "../controller/authController.js";
import express from 'express'
import { check } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/Register',
[
    check('nombre').isLength({min: 4}),
    check('email').isEmail(),
    check('password').isLength({min: 6})
], Register)

router.post('/Login', 
[
    check('email').isEmail(),
    check('password').isLength({min: 6})
]
,Login)

router.post('/Logout',userLogout)
router.get('/Profile',authMiddleware,Profile)
router.get('/Search',searchUser)

export default router