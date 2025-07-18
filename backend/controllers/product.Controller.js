import ProductModel from "../models/Product.Model.js";
import fs from 'fs';
import path from 'path';
import userModel from "../models/user.Model.js";

//! create product


export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    // Check if an image was uploaded
    if (!req.file || !req.file.filename) {
      return res.status(400).json({ message: "Please upload a product image" });
    }

    const productImage = req.file.filename;

    // Validate required fields
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create product instance
    const product = new ProductModel({
      name,
      description,
      price,
      category,
      stock,
      productImage, // store only the filename, or build URL if needed
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    console.error("Create Product Error:", error.message);
    res.status(500).json({
      message: `Server error: ${error.message}`,
    });
  }
};


//!delete product 
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    //  Find the product
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //  Get the image filename
    const imageFilename = product.productImage;
    // console.log(imageFilename)

    //  Delete image file from disk
    const imagePath = path.join(process.cwd(), 'backend','public', 'product', imageFilename);
    // console.log(imagePath)
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Delete the image
    }

    //  Delete the product from DB
    await product.deleteOne();

    //  Send response
    res.status(200).json({
      message: "Product and image deleted successfully",
      deletedProductId: id,
    });

  } catch (error) {
    res.status(500).json({
      message: `Server error: ${error.message}`,
    });
  }
};
//! update product 



export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    //  Find existing product
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //  Prepare updated fields
    const updatedFields = { ...req.body };

    // Handle image update
    if (req.file && req.file.filename) {
      // Delete old image
      const oldImagePath = path.join(process.cwd(), 'backend','public', 'product', product.productImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      // Set new image filename
      updatedFields.productImage = req.file.filename;
    }

    // 4. Update the product
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    // 5. Response
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    res.status(500).json({
      message: `Server error: ${error.message}`,
    });
  }
};


//! get all product 
export const allProduct = async (req, res) => {
  try {
    const products = await ProductModel.find();

    res.status(200).json({
      message: "All products fetched successfully",
      total: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: `Server error: ${error.message}`,
    });
  }
};

//! single products


export const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//! create revies
export const review= async (req,res)=>{
  try {
     const {rating,comment,productId}=req.body;
    //  console.log(req.userId)
    // find user
    const user= await userModel.findById(req.userId)
    // console.log(user)
    const review={
      user:user._id,
      name:user.name,
      rating:Number(rating),
      comment
    }
    const product= await ProductModel.findById(productId)
    const reviewExist= product.reviews.find(review=>review.user.toString()===user._id.toString())
    console.log(reviewExist)
    if(reviewExist){
     product.reviews.forEach(rev=>{
      if(req.userId.toString()===user._id.toString()){
        // console.log(10)
        rev.rating=review.rating,
        rev.comment=review.comment

      }
     })
    }else{
      product.reviews.push(review)
      product.numOfReviews.reviews.length
    }
    await product.save({validateBeforeSave:false})
    return res.status(200).json({message:"reviews sucessful",product})
  } catch (error) {
    return res.status(500).json({message:`server error ${error.message}`})
  }
}

//! get reviews
 export const GetReviews=async (req,res)=>{
  try {
     const product= await ProductModel.findById(req.query.id)
     if(!product){
      return res.status(400).json({message:"not found product"})

     }
     return res.status(200).json({message:"get reviews",reviews:product.reviews})
  } catch (error) {
     return res.status(500).json({message:`server error ${error.message}`})
  }
 }
