import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default:1
      }
    }
  ]
}, {
  timestamps: true
});

export const CartModel = mongoose.model("Cart", CartSchema);
