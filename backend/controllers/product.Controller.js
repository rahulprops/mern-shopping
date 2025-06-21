import ProductModel from "../models/Product.Model.js";

//! create product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
    } = req.body;

    const productImage=req.file.filename;
    console.log(productImage)
    // Check required fields
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save product
    const product = new ProductModel({
      name,
      description,
      price,
      category,
      stock,
    });

    if(product){
    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
}else{
    res.status(400).json({
        message:"product is not created"
    })
}
  } catch (error) {
    res.status(500).json({
      message: `Server error: ${error.message}`,
    });
  }
};

//!delete product 
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    //  Check if product exists
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //  Delete the product
    await product.deleteOne(); 

    //  Success response
    res.status(200).json({
      message: "Product deleted successfully",
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

    //  Check if the product exists
    let product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //  Update the product with new data
    product = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,             // Return the updated document
      runValidators: true,   // Ensure updated values are valid
    });

    // 
    res.status(200).json({
      message: "Product updated successfully",
      product,
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


