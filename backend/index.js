import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './config/db.js';
import UserRouter from './routers/User.Router.js';
import bodyParser from 'body-parser';

dotenv.config({path:"backend/.env"})
const app =express()
 const port =process.env.PORT || 4000;

 //! middlewares
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended:true}))

 //! apis
 app.use("/api/user",UserRouter)
//! server start
app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}`)
    dbConnect()
})