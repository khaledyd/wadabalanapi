
import express from "express";
import { attend } from "../controllers/attendees.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();


router.post("/:id", verifyToken, attend);

export default router;
