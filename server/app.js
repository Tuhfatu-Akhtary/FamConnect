import express from "express";
import userRoute from "./routes/users.js"

const app=express();


app.use("server/users",userRoute);
app.listen(8000,()=>{
    console.log("Sever run successful");
})