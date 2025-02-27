import express from "express";
import {
  createCourse,
  getCourses,
  getLecturerCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getStudentsByCourse,
} from "../controllers/course.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authenticate, authorize(["admin", "lecturer"]), createCourse);
router.get("/", authenticate, getCourses);
router.get("/lecturer/:lecturerId", authenticate, getLecturerCourses);
router.get("/:id", authenticate, getCourseById);
router.get("/:courseId/students", getStudentsByCourse);
router.put(
  "/:id",
  authenticate,
  authorize(["admin", "lecturer"]),
  updateCourse
);
router.delete("/:id", authenticate, authorize(["admin"]), deleteCourse);

export default router;
