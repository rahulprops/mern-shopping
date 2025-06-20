import jwt from 'jsonwebtoken'

const generateToken=(res,userId)=>{
    try {
        // generate token
        const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"1d"})

        // set cookies
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:24*60*60*1000
        })
        return token;
    } catch (error) {
        throw new Error (error.message)
    }
}
export default generateToken;