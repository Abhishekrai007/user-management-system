// userRoutes.ts
import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { auth, restrictTo } from "../middlewares/rbac";

const router = express.Router();

router.get("/", auth, getUsers);
router.get("/:id", auth, getUserById);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, restrictTo("admin"), deleteUser);

export default router;
