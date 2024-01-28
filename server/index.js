import express from "express";

const app=express();

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
import conversationRoutes from "./routes/conversations.js";
import messageRoutes from "./routes/messages.js"
import familyRoutes from "./routes/family.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true);
    next()
})
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
}))
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post("/server/upload", upload.single("file"), (req,res)=>{
    const file = req.file;
    res.status(200).json(file.filename)
})


app.use("/server/auth",authRoutes);
app.use("/server/users",userRoutes);
app.use("/server/posts",postRoutes);
app.use("/server/comments",commentRoutes);
app.use("/server/likes",likeRoutes);
app.use("/server/relationships",relationshipRoutes);
app.use("/server/conversations",conversationRoutes);
app.use("/server/messages",messageRoutes);
app.use("/server/family",familyRoutes);

app.listen(8800, ()=>{
    console.log("Api Working");
});