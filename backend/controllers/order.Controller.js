import orderModle from "../models/order.Modle.js";

//! create order 

export const createOrder=async (req,res)=>{
    try {
        const {shippingInfo,orderItems,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice}=req.body;

        const newOrder=new orderModle({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt:Date.now(),
            user:req.userId,

        })

        await newOrder.save()
        return res.status(201).json({message:"create order sucessful",newOrder})
    } catch (error) {
        return res.status(500).json({message:`server error ${error.message}`})
    }
}

//! get single order details
export const getSingleOrders= async (req,res)=>{
    try {
         const order= await orderModle.findById(req.params.id).populate("user","name email")
         if(!order){
            return res.status(404).json({message:"order not found"})
         }
       return res.status(200).json({message:"sucess",order})
    } catch (error) {
        return res.status(500).json({message:`server error ${error.message}`})
    }
}

//! get my order
 export const myOrders=async (req,res)=>{
    try {
         const orders= await orderModle.find({user:req.userId})
         if(!orders){
            return res.status(404).json({message:"orders not found"})
         }
         return res.status(200).json({message:"my order sucessful",orders})
    } catch (error) {
        return res.status(500).json({message:`server error ${error.message}`})
    }
 }

 //! all orders
 export const allOrders=async (req,res)=>{
    try {
         const order=await orderModle.find()
         let totalAmount=0;
         order.forEach(order=>{
            totalAmount+=order.totalPrice;
         })
         return res.status(200).json({message:"all orders",order,totalAmount})
    } catch (error) {
      return res.status(500).json({message:`server error ${error.message}`})  
    }
 }