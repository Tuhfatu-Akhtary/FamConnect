import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getConversation =(req,res)=>
{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const q = "SELECT DISTINCT um.sender_user_id,um.reciever_user_id,um.conv_id,u.user_id,user_name,profile_pic FROM user_message AS um JOIN user AS u ON (u.user_id = um.reciever_user_id) WHERE um.sender_user_id IN (?,um.reciever_user_id) OR um.reciever_user_id IN (?,um.sender_user_id)";
        // const q2 = "SELECT DISTINCT sender_user_id, receiver_user_id from user_message where sender_user_id=? or reciever_user_id=?";
        // db.query(q2, [req.query.user_id, req.query.user_id], (err, data) => {
        //     if(err) return res.status(500).json(err);
        //     const user_ids = [];
        //     data.forEach((d) => {
        //         if(d.sender_user_id != req.query.user_id){
        //             user_ids.push(d.sender_user_id);
        //         }else{
        //             user_ids.push(d.receiver_user_id);
        //         }
        //     })
        //     const q3 = "SELECT DISTINCT user_name, profile_pic from user where user_id IN (?)";
        //     db.query(q3, [user_ids], (err, data) => {
        //         if(err) return res.status(500).json(err);
        //         return res.status(200).json(data);
        //     });
        //
        // });
        db.query(q, [req.query.user_id,req.query.user_id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });

}

export const addConversation = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO likes (postId, userId) VALUES (?)";
        const values = [
            req.body.postId,
            userInfo.id,
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been liked");
        });
    });
};

export const deleteConversation = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM likes WHERE postId=? AND userId=?";

        db.query(q, [req.query.postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Like has been deleted");
        });
    });
};