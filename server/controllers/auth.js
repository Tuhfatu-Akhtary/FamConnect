import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req,res)=>{

    const q = "SELECT * FROM user WHERE email = ?";

    db.query(q,[req.body.email], (err,data)=>{
        if(err){
            return res.status(500).json(err);
        }
        if(data.length){
            return res.status(409).json("User already exists")
        }
        else{
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password,salt);

            const q="INSERT INTO user (first_name, last_name, father_name, mother_name, dob, gender, email, phone_no, user_name, passwordHash, profile_pic, cover_pic) VALUES (?) "


            const values =[
                req.body.first_name,
                req.body.last_name,
                req.body.father_name,
                req.body.mother_name,
                req.body.dob,
                req.body.gender,
                req.body.email,
                req.body.phone_no,
                req.body.user_name,
                hashedPassword,
                req.body.profile_pic,
                req.body.cover_pic
            ];

            db.query(q,[values], (err,data)=>{
                if(err){
                    return res.status(500).json(err);
                }
                else{
                    return res.status(200).json("User has been created");
                }
            });
        }

    });

}

export const login = (req,res)=>{

    const q = "SELECT * FROM user WHERE email = ?"

    db.query(q,[req.body.email], (err,data)=>{
        if(err)
        {
            return res.status(500).json(err);
        }
       if(data.length === 0){
           return res.status(404).json("User not found");
       }

       else{
           const checkPassword= bcrypt.compareSync(req.body.password,data[0].passwordHash);
           if(!checkPassword){
               return res.status(400).json("Wrong Password")
           }
           else{

               const token = jwt.sign({id:data[0].id},"secretkey");

               const {passwordHash, ...others} =data[0];

               res.cookie("accessToken", token, {
                   httpOnly:true,
               }).status(200).json(others)

           }
       }
    });
};

export const logout = (req,res)=>{
    res.clearCookie("accessToken",{
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out");
};