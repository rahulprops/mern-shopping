import express from 'express'
import { createOrder } from '../controllers/order.Controller.js'
import { isAuthUser } from '../middleware/auth/isAuth.js';
const OrderRouter=express.Router()

OrderRouter.post("/create",isAuthUser,createOrder)

export default OrderRouter;