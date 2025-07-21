// import { CartModel } from "../Models/Cart.model.js";

import { CartModel } from "../../db/Models/Cart.model.js";

export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = await CartModel.create({
        userId,
        products: [{ productId, quantity }]
      });
    } else {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex >= 0) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
      await cart.save();
    }

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};


export const updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cart = await CartModel.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.products.find(p => p.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Product not in cart" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await CartModel.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true }
    );
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing product", error: error.message });
  }
};


export const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await CartModel.findOne({ userId })
      .populate("products.productId")
      .populate("userId");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json({ message: "Cart fetched", cart });
  } catch (error) {
    res.status(500).json({ message: "Error getting cart", error: error.message });
  }
};

// 5. Clear cart
export const clearCart = async (req, res) => {
  const { userId } = req.body;
  try {
    const cart = await CartModel.findOneAndUpdate(
      { userId },
      { products: [] },
      { new: true }
    );
    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error: error.message });
  }
};
