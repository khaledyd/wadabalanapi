import express from "express";
import {
  addEvent,
  attendevent,
  getallevents,
  getevent,
  attendevents,
  userAttend
} from "../controllers/event.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();


router.post("/", addEvent);
router.get("/:id", getevent);
router.get("/", getallevents);
router.put("/userAttend/:id", userAttend);

export default router;
