"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import CourseCard from "@/components/CourseCard";
import { Course } from "@/types/course";
// import Link from "next/link";
import { courseService } from "@/services/course.service";

export default function CoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getAllCourses();
        console.log("response", response);

        setCourses(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user]);

  const handleEnroll = async (courseId: string) => {
    try {
      const response = await courseService.enrollStudent(courseId); // Call the enroll endpoint
      console.log("Enrollment response:", response);
      // Optionally, you can update the local state to reflect the enrollment
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId
            ? { ...course, students: [...course.students, user._id] }
            : course
        )
      );
    } catch (err) {
      console.log("err", err);

      // handleError(err);
    }
  };

  const handleDisenroll = async (courseId: string) => {
    try {
      const response = await courseService.disenrollStudent(courseId);
      console.log("Disenrollment response:", response);
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId
            ? {
                ...course,
                students: course.students.filter((id) => id !== user._id),
              }
            : course
        )
      );
    } catch (err) {
      console.log("err", err);
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.lecturer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ""
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">All Courses</h1>
          <p className="text-gray-600">
            Browse and enroll in available courses
          </p>
        </div>
      </div>

      {/* Search and filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center justify-center flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search courses by title, code, or lecturer..."
              className="form-input border rounded-md p-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isEnrolled = course.students.includes(user._id);
            return (
              <CourseCard
                key={course._id}
                course={course}
                actionButton={{
                  label: isEnrolled ? "Disenroll" : "Enroll",
                  onClick: isEnrolled
                    ? () => handleDisenroll(course._id)
                    : () => handleEnroll(course._id),
                }}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-lg text-gray-600">
            No courses found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
