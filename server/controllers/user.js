import { db } from "../connect.js";
import jwt from "jsonwebtoken";
export const getUser = (req,res)=>{
    const userId =req.params.userId;
    const q ="SELECT * FROM user WHERE user_id=?"

    db.query(q, [userId], (err,data)=>{
        if(err) return res.status(500).json(err)
        const {passwordHash, ...info}=data[0];
        return res.json(info);

    })
};