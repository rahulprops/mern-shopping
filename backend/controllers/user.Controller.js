import userModel from "../models/user.Model.js";

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