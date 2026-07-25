import { Router } from "express";
import express from "express";
import { getAllUser, getMe, login, logout, register, updateProfilePicture } from "../controllers/user.controller.js";
import Protect from "../middleware/protect.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(Protect, getMe);
router.route("/logout").post(logout);
router.route("/users").get(Protect,getAllUser);
router.route("/profile-picture").patch(Protect, updateProfilePicture);

export default router;
