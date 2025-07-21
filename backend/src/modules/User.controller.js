import { userModel } from "../../db/Models/User.model.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken"
const getusers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const adduser = async (req, res) => {
  try {
   
    const newUser = await userModel.insertMany(req.body);
    res.json({ message: "created", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const signIn= async(req ,res)=>{
    let foundedUser = await userModel.findOne({username:req.body.username})
    if(foundedUser  ) {
        let matched = bcrypt.compareSync(req.body.password, foundedUser.password)
        

        if(matched) {
            let token = jwt.sign({_id:foundedUser._id, role: foundedUser.role}, "belal")
            res.json({message:`Welcome ${foundedUser.username}`, token})
        } 
            res.status(422).json({message:"Wrong Password or email"})
    }else{
        res.status(404).json({message: "Wrong Password or "})
    }
}
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await userModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { getusers, adduser, updateUser, deleteUser,signIn };
