import express from 'express'
import { addProduct, deleteProduct,  getbyid,  getProducts, updateProduct } from './Product.controller.js';
import { isAdmin } from '../../middleware/verifyRole.js';
import { verifyToken } from '../../middleware/VerifyToken.js';


 export const ProductRoutes=express.Router();
ProductRoutes.get("/product",getProducts)
ProductRoutes.get("/product/:id",getbyid)
ProductRoutes.post("/product",verifyToken,isAdmin,addProduct)
ProductRoutes.put("/product/:id",verifyToken,isAdmin,updateProduct)
ProductRoutes.delete("/product/:id",verifyToken,isAdmin,deleteProduct)