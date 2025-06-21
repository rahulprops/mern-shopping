import express from 'express'
import { createProduct } from '../controllers/product.Controller.js';

const ProductRouter=express.Router()

ProductRouter.post("/create",createProduct)

export default ProductRouter;