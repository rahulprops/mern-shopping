import orderModle from "../models/order.Modle.js";

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