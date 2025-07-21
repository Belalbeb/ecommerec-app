import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  rating: {
    rate: { type: Number },
    count: { type: Number }
  }
}, { timestamps: true });

export const ProductModel = mongoose.model("Product", ProductSchema);
