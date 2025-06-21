import express from 'express'
import { login, logout, Register, Users } from '../controllers/user.Controller.js'
import multer from 'multer'
import shortid from 'shortid'
import path from 'path'
import { isAdmin, isAuthUser } from '../middleware/auth/isAuth.js'
const UserRouter=express.Router()

//! storage setup
const userStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'backend/public/users')
    },
    filename:(req,file,cb)=>{
        const iname= shortid.generate()
        cb(null,iname+path.extname(file.originalname))
    }
})
//! multer initization
const userUpload=multer({
    storage:userStorage,
    limits:{fileSize:1024*1025*5}
})



UserRouter.post("/create",Register)
UserRouter.post("/login",login)
UserRouter.post("/logout",logout)
UserRouter.get("/amdin/allusers",isAuthUser,isAdmin,Users)

export default UserRouter