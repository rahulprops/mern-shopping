    import express from 'express'
    import { createProduct, deleteProduct, updateProduct } from '../controllers/product.Controller.js';
    import shortid from 'shortid'
    import path from 'path';
    import multer from 'multer';

    const ProductRouter=express.Router()
    const imatpath = path.join(process.cwd(), 'public', 'product');
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
        limits:{fileSize:1024000*5}
    })
    ProductRouter.post("/create",uploadProduct.single("productImage"),createProduct)
    ProductRouter.delete("/:id",deleteProduct)
    ProductRouter.put("/update/:id",uploadProduct.single("productImage"),updateProduct)

    export default ProductRouter;