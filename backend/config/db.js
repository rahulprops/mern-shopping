import mongoose from "mongoose";

const dbConnect = async ()=>{
    try {
        const db=mongoose.connect(process.env.DB)
    if(db){
        console.log("database connect sucessful")
    }else{
        console.log("database not connect ")
    }
    } catch (error) {
        //  throw new Error(error.message)
         process.exit(1);
    }
}
export default dbConnect;