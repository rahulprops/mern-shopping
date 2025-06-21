import express from 'express';
import {
  allProduct,
  createProduct,
  deleteProduct,
  
  GetReviews,
  review,
  singleProduct,
  updateProduct
} from '../controllers/product.Controller.js';
import shortid from 'shortid';
import path from 'path';
import multer from 'multer';
import { isAdmin, isAuthUser } from '../middleware/auth/isAuth.js';

const ProductRouter = express.Router();

// Image upload config
const proStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/public/product');
  },
  filename: (req, file, cb) => {
    const iname = shortid.generate();
    cb(null, iname + path.extname(file.originalname));
  }
});

const uploadProduct = multer({
  storage: proStorage,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB
});

// Routes
ProductRouter.post("/create", isAuthUser, isAdmin, uploadProduct.single("productImage"), createProduct);
ProductRouter.delete("/:id", isAuthUser, isAdmin, deleteProduct);
ProductRouter.put("/update/:id", isAuthUser, isAdmin, uploadProduct.single("productImage"), updateProduct);

ProductRouter.put("/review", isAuthUser, review);

ProductRouter.get("/allreviews", GetReviews);       // Move this up!
ProductRouter.get("/", allProduct);
ProductRouter.get("/:id", singleProduct);

export default ProductRouter;
