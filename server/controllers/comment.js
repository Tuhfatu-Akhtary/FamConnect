import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
    const q = "SELECT c.*, u.user_id , u.user_name, u.profile_pic FROM comments AS c JOIN user AS u ON (u.user_id = c.commentor_id) WHERE c.postId = ? ORDER BY c.created_at DESC";

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const addComment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO comments(postId, commentor_id, comment_content, created_at) VALUES (?)";
        const values = [
            req.body.postId,
            userInfo.id,
            req.body.Content,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comment has been created.");
        });
    });
};

export const deleteComment = (req,res) =>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const commentId = req.params.comment_id;
        const q = "DELETE FROM comments WHERE comment_id = ? AND commentor_id = ?";

        db.query(q, [commentId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("Comment has been deleted!");
            return res.status(403).json("You can delete only your comment!");
        });
    });
}