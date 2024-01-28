import {db} from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getMessages =(req,res)=>
{
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json("Not logged in!");
    }

    else{
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err)
        {
            return res.status(403).json("Token is not valid!");
        }

        else {
            const q = "SELECT um.*,u.user_id,user_name,profile_pic FROM user_message AS um JOIN user AS u ON (u.user_id = um.reciever_user_id) WHERE um.conv_id=?";
            // const q = "SELECT * from user_message WHERE conv_id=? ORDER BY sent_at DESC";
            db.query(q, [req.query.conversationId], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
            });

        }
    });
    }
}

export const addMessage = (req, res) =>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO user_message(sender_user_id, reciever_user_id, message_content, sent_at, conv_id) VALUES (?)";
        const values = [
            userInfo.id,
            req.body.recieverId,
            req.body.message,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            req.body.selectedConversationId,
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Message has been sent");
        });
    });
};

export const deleteMessage = (req, res) => {
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