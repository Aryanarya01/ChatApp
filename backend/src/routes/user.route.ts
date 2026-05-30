import { Router } from "express";
import express from "express";
import { getMe, login, logout, register } from "../controllers/user.controller.js";
import Protect from "../middleware/protect.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(Protect, getMe);
router.route("/logout").post(logout)
export default router;
