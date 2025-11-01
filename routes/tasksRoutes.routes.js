import express from "express";
const router = express.Router();

// Importing controllers using ES Module syntax
import {
  getAllTasks,
  newTask,
  getSingleTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";

// Routes
router.route("/").get(getAllTasks).post(newTask);
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask);

export default router;
