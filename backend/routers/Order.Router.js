import express from 'express'
import { createOrder, getSingleOrders, myOrders } from '../controllers/order.Controller.js'
import { isAdmin, isAuthUser } from '../middleware/auth/isAuth.js';
const OrderRouter=express.Router()

OrderRouter.post("/create",isAuthUser,createOrder)
OrderRouter.get("/admin/order/:id",isAuthUser,isAdmin,getSingleOrders)
OrderRouter.get("/myOrders",isAuthUser,myOrders)

export default OrderRouter;