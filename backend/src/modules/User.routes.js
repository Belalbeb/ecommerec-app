import express from 'express'
import { adduser, deleteUser, getusers, signIn, updateUser } from './User.controller.js';
import { hashpassword } from '../../middleware/HashPassword.js';
 export const UserRoutes=express.Router();
UserRoutes.get("/user",getusers)
UserRoutes.post("/user",hashpassword,adduser)
UserRoutes.put("/user/:id",updateUser)
UserRoutes.delete("/user/:id",deleteUser)
UserRoutes.post("/login",signIn)