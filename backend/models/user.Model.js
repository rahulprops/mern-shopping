import mongoose, { Schema } from "mongoose";
import { type } from "os";
import validator from "validator";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [25, "Name must be less than 25 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minLength: [8, "Password should be at least 8 characters"],
      select: false, // Exclude password from queries by default
    },
    userProfile:{
      type:String
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
