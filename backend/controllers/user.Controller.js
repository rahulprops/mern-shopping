import userModel from "../models/user.Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import generateToken from "../config/jwt.js";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //  Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //  Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create new user
    const user=new userModel({
        name,
        email,
        password:hashedPassword
    })
    if(user){
        await user.save()
         res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    }else{
        res.status(400).json({
            message:"user not create"
        })
    }
   } catch (error) {
    // console.error("Register error:", error);
    res.status(500).json({ message: `server error ${error.message}`});
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user (with password)
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email " });
    }

    //  Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid  password" });
    }
     
    // generate token 
       generateToken(res,user._id)
    
    

    //  Send response (you can also set it in cookie if needed)
    res.status(200).json({
      message: "Login successful",
      
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};
