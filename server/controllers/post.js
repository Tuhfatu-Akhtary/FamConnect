import { db } from "../connect.js";
export const getPosts = (req,res)=>{
    const q = "SELECT p.*,u.user_id,user_name,profile_pic FROM posts AS p JOIN user AS u ON (u.user_id = p.post_user_id)";

    db.query(q, (err,data)=>{
        if(err){
            return res.status(500).json(err);
        }
        else{
            return res.status(200).json(data);
        }
    })
}