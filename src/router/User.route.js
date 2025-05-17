import { Router } from "express";
import userController from "../controller/User.controller.js";


const router = Router()

router
    .post('/register', userController.UserRegister)
    .get('/confirem/:token', userController.Confirem)
    .post('/login', userController.UserLogin)


export default router