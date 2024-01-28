import express from "express";
import { register,login,logout,createFamily,searchFamily,familyProfile} from "../controllers/auth.js";

const router=express.Router()

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.post("/createFamily",createFamily);
router.get("/families",searchFamily);
router.get("/find/:familyId",familyProfile);
export default router;