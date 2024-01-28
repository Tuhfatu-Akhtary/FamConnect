import express from "express";
import { getConversation, addConversation, deleteConversation } from "../controllers/conversation.js";

const router=express.Router()

router.get("/", getConversation);
router.post("/messenger", addConversation);
router.delete("/messenger/delete", deleteConversation);

export default router;