import { RequestHandler } from "express";
import { Course } from "../models/Course";

export const createCourse: RequestHandler = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to create course" });
  }
};

export const getCourses: RequestHandler = async (req, res) => {
  try {
    const courses = await Course.find().populate("lecturer", "name email");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

export const getLecturerCourses: RequestHandler = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const lecturerId = req.params.lecturerId;

    const courses = await Course.find({ lecturer: lecturerId })
      .populate("lecturer", "name email")
      .populate("materials")
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Course.countDocuments({ lecturer: lecturerId });

    res.status(200).json({
      success: true,
      data: {
        data: courses,
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCourseById: RequestHandler = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch course" });
  }
};

export const updateCourse: RequestHandler = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to update course" });
  }
};

export const deleteCourse: RequestHandler = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete course" });
  }
};

export const getStudentsByCourse: RequestHandler = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    // Find the course and populate the students
    const course = await Course.findById(courseId).populate("students");

    if (!course) {
      res.status(404).json({ success: false, message: "Course not found" });
      return;
    }

    res.status(200).json({
      success: true,
      data: course.students,
    });
  } catch (error) {
    next(error);
  }
};

export const enrollStudent: RequestHandler = async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.user.userId;

  try {
    // Find the course and update the students array
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { students: studentId } }, // Use $addToSet to avoid duplicates
      { new: true } // Return the updated course
    ).populate("lecturer", "name email"); // Populate lecturer details if needed

    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to enroll student" });
  }
};

export const disenrollStudent: RequestHandler = async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.user.userId;

  try {
    // Find the course and update the students array
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { students: studentId } }, // Use $pull to remove the student ID
      { new: true } // Return the updated course
    ).populate("lecturer", "name email"); // Populate lecturer details if needed

    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to disenroll student" });
  }
};
