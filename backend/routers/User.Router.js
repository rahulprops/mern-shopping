import express from 'express'
import { login, Register } from '../controllers/user.Controller.js'
const UserRouter=express.Router()

UserRouter.post("/create",Register)
UserRouter.post("/login",login)

export default UserRouter