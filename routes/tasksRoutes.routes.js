import express from "express";
const router = express.Router();

// Importing controllers using ES Module syntax
import { verifyToken } from "../middlewares/auth.js";
import {
  getAllTasks,
  newTask,
  getSingleTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  updateTaskName,
  updatePriority,
} from "../controllers/tasks.controller.js";

// Routes
router
  .route("/")
  .get(verifyToken, getAllTasks)
  .post(verifyToken, newTask)
  .delete(verifyToken, deleteAllTasks);
router
  .route("/:id")
  .get(verifyToken, getSingleTask)
  .patch(verifyToken, updateTask)
  .delete(verifyToken, deleteTask)
  
router.route("/:id/taskName").patch(verifyToken, updateTaskName);
router.patch("/:id/updatePriority", verifyToken, updatePriority)

export default router;
