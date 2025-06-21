import mongoose, { Schema } from "mongoose";
import { type } from "os";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter description"],
    },
    productImage:{
      type:String,
      required:true
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLength: [7, "Price cannot exceed 7 digits"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Please enter product category"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",
          required:true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("Product", productSchema);
