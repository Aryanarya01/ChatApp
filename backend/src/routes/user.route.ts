import { Router } from "express";
import express from "express";
import { getAllUser, getMe, login, logout, register, updateProfilePicture } from "../controllers/user.controller.js";
import Protect from "../middleware/protect.js";
import upload from "../middleware/upload.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(Protect, getMe);
router.route("/logout").post(logout);
router.route("/users").get(Protect,getAllUser);
router.route("/profile-picture").patch(Protect,upload.single("image"),updateProfilePicture);

export default router;
