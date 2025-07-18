import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './config/db.js';
import UserRouter from './routers/User.Router.js';
import bodyParser from 'body-parser';
import ProductRouter from './routers/Product.Router.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import OrderRouter from './routers/Order.Router.js';
import cors from 'cors'
dotenv.config({path:"./backend/.env"})
const app =express()
 const port =process.env.PORT || 4000;

 //! middlewares
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
  app.use(cors({
    origin:process.env.ORGIN,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

//! Serve static images
app.use("/image", express.static(path.join(process.cwd(), "public")));
//http://localhost:PORT/image/product/filename.jpg

 //! apis
 app.use("/api/user",UserRouter)
 app.use("/api/product",ProductRouter)
 app.use("/api/order",OrderRouter)

 //! 404 handle
//  app.use("*",(req,res)=>{

//  })
// app.use("*", (req, res) => {
//   res.status(404).json({ message: "API route not found" });
// });
 
//! server start
app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}`)
    dbConnect()
})