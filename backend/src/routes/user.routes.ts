import express from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", authenticate, authorize(["admin"]), getAllUsers);
router.get("/:id", authenticate, getUserById);

export default router;
