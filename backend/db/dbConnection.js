import mongoose from "mongoose"

export const Db=mongoose.connect('mongodb://localhost:27017/Ecommerce').then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log(err);
})