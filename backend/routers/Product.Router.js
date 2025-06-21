    import express from 'express'
    import { allProduct, createProduct, deleteProduct, singleProduct, updateProduct } from '../controllers/product.Controller.js';
    import shortid from 'shortid'
    import path from 'path';
    import multer from 'multer';
import { isAuthUser } from '../middleware/auth/isAuth.js';

    const ProductRouter=express.Router()
    
    // storage stup
    const proStorage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'backend/public/product')
        },
        filename:(req,file,cb)=>{
            const iname=shortid.generate()
            cb(null,iname+path.extname(file.originalname))
        }
    })
    // initialize multer
    const uploadProduct=multer({
        storage:proStorage,
        limits:{fileSize:1024*1024*5}
    })
    ProductRouter.post("/create",isAuthUser,uploadProduct.single("productImage"),createProduct)
    ProductRouter.delete("/:id",deleteProduct)
    ProductRouter.put("/update/:id",uploadProduct.single("productImage"),updateProduct)
    ProductRouter.get("/",allProduct)
    ProductRouter.get("/:id",singleProduct)
    export default ProductRouter;