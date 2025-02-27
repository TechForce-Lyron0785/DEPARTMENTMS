import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", authenticate, (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export default router;
