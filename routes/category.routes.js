import express from "express";
const router = express.Router();

import { verifyToken } from "../middlewares/auth.js";
import {createCategory, getAllCategories, deleteCategory, updateCategory} from "../controllers/category.controller.js"


router
  .route("/")
  .post(verifyToken, createCategory)
  .get(verifyToken, getAllCategories)
  .delete(verifyToken, deleteCategory)
  .patch(verifyToken, updateCategory);



export default router;
