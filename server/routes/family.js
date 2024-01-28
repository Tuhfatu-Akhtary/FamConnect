import express from "express";
import {familyRequest,FamilyJoin} from "../controllers/family.js";

const router=express.Router()

router.post("/", FamilyJoin);
router.post("/familyRequest",familyRequest);

export default router;