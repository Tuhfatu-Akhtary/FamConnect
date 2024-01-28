import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req,res)=>{
    const token=req.cookies.accessToken;
    if(!token)
    {
        return res.status(401).json("Not Loggedin");
    }
    else{
        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err){
                return res.status(403).json("Token is not valid")
            }

            else{
                const q = "SELECT p.*,u.user_id,user_name,profile_pic FROM posts AS p JOIN user AS u ON (u.user_id = p.post_user_id) ORDER BY p.created_at DESC";

                db.query(q, [userInfo.id], (err,data)=>{
                    if(err){
                        return res.status(500).json(err);
                    }
                    else{
                        return res.status(200).json(data);
                    }
                })
            }
        })
    }

}

export const addPost = (req,res)=>{
    const token=req.cookies.accessToken;
    if(!token)
    {
        return res.status(401).json("Not Loggedin");
    }
    else{
        jwt.verify(token, "secretkey",(err,userInfo)=> {
            if (err) {
                return res.status(403).json("Token is not valid")
            } else {
                const q = "INSERT INTO posts (post_user_id, post_content, picture, created_at) VALUES (?)";

                const values = [
                    userInfo.id,
                    req.body.content,
                    req.body.picture,
                    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                ];

                db.query(q, [values], (err, data) => {
                    if (err) {
                        return res.status(500).json(err);
                    } else {
                        return res.status(200).json("Post has been created");
                    }
                })
            }
        });
    }

}


export const deletePost = (req,res)=>{
    const token=req.cookies.accessToken;
    if(!token)
    {
        return res.status(401).json("Not Loggedin");
    }
    else{
        jwt.verify(token, "secretkey",(err,userInfo)=> {
            if (err) {
                return res.status(403).json("Token is not valid")
            } else {
                const q = "DELETE FROM posts WHERE id=? AND post_user_id=?";
                db.query(q, [req.params.id,userInfo.id], (err, data) => {
                    if (err) return res.status(500).json(err);
                    if(data.affectedRows>0) return res.status(200).json("Post has been deleted");
                    return  res.status(403).json("You can delete only your post");

                })
            }
        });
    }

}

