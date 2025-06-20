import express from 'express'
import { Register } from '../controllers/user.Controller.js'
const UserRouter=express.Router()

UserRouter.post("/create",Register)

export default UserRouter