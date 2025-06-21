import jwt from 'jsonwebtoken'
import userModel from '../../models/user.Model.js';

export const isAuthUser=async (req,res,next)=>{
    try {
        // console.log("hello")
        const {token}=req.cookies;
        // console.log( token)
        if(!token){
            return res.status(400).json({message:"user not authrized"})
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decode)
        if(!decode){
            return res.status(400).json({message:"Invalid token"})
        }

        //! find users
        const user= await userModel.findById(decode.userId)
        if(!user){
            return res.status(400).json({message:"this token id not found user"})
        }
        req.userId=user._id
        next()
    } catch (error) {
        return res.status(500).json({
            message:`server error ${error.message}`
        })
    }
}

//! admin
export const isAdmin=async (req,res,next)=>{
    try {
        const userId =req.userId
        // console.log(userId)
        const user= await userModel.findById(userId)
        // console.log(user)
        if(user.role==='admin'){
            next()
        }else{
            return res.status(400).json({message:"user role is not admin"})
        }
    } catch (error) {
         return res.status(500).json({message:`server error ${error.message}`})
    }
}