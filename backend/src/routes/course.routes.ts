import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authenticate, authorize(["admin", "lecturer"]), createCourse);
router.get("/", authenticate, getCourses);
router.get("/:id", authenticate, getCourseById);
router.put(
  "/:id",
  authenticate,
  authorize(["admin", "lecturer"]),
  updateCourse
);
router.delete("/:id", authenticate, authorize(["admin"]), deleteCourse);

export default router;
