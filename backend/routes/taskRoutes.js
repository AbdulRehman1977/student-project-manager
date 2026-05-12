import express from "express";
import { updateTask } from "../controllers/taskController.js";

const router = express.Router();

router.patch("/:id", updateTask);

export default router;
