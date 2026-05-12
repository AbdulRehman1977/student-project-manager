import express from "express";
import { createTask, updateTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.patch("/:id", updateTask);

export default router;
