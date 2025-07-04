import express from 'express'
import { allOrders, createOrder, getSingleOrders, myOrders, updateOrderStatus } from '../controllers/order.Controller.js'
import { isAdmin, isAuthUser } from '../middleware/auth/isAuth.js';
const OrderRouter=express.Router()

OrderRouter.post("/create",isAuthUser,createOrder)
OrderRouter.get("/admin/order/:id",isAuthUser,isAdmin,getSingleOrders)
OrderRouter.put("/admin/order/:id",isAuthUser,isAdmin,updateOrderStatus)
OrderRouter.get("/myOrders",isAuthUser,myOrders)
OrderRouter.get("/admin/allorders",isAuthUser,isAdmin,allOrders)

export default OrderRouter;