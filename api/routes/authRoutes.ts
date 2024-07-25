import express from "express";
import { login, register, getMe } from "../controllers/authController";
import { auth } from "../middlewares/rbac";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getMe);

export default router;
