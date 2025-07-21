import express from "express";
import {
  addToCart,
  updateCartItem,
  removeFromCart,
  getCart,
  clearCart
} from "./Cart.controller.js";
import { verifyToken } from "../../middleware/VerifyToken.js";

const router = express.Router();
router.use(verifyToken)

router.post("/cart/add", addToCart);             
router.put("/cart/update", updateCartItem);      
router.delete("/cart/remove", removeFromCart)
router.get("/cart/:userId", getCart);            
router.put("/cart/clear", clearCart);            

export default router;
