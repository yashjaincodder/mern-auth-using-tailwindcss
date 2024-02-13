import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userrouter from './route/userroute.js'
import authrouter from "./route/authroute.js"
dotenv.config();
const app=express();
mongoose.connect(process.env.MONGO)
.then(()=>{console.log("connected to mongodb")})
.catch((err)=>{console.log(err)});
app.use(express.json());
app.listen(8000,()=>{
    console.log(`server run on port number 8000`);
})
app.use("/api/user",userrouter);
app.use("/api/auth",authrouter);
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message ||"internal server error";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})