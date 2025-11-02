import express from "express";
const router = express.Router();

import { userSignUp, userLogin } from "../controllers/users.controller.js";


//login, signup,
router.route("/signup").post(userSignUp);
router.route("/login").post(userLogin);

export default router;
