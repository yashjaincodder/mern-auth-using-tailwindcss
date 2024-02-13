import User from "../model/usermodel.js";
import bcryptjs from "bcryptjs"
export const signup=async(req,res,next)=>{
const {username,email,password}=req.body;
const hashedpassword=bcryptjs.hashSync(password,10);
const newuser=new User({username,email,password:hashedpassword});
try {
    await newuser.save();
res.status(201).json({message:"user created successfully"});
} catch (error) {
    next(error)
}

}
