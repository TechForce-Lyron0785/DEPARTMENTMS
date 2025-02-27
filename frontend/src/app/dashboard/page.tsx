"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import CourseCard from "@/components/CourseCard";
import { Course } from "@/types/course";
import { courseService } from "../../services/course.service";

export default function Dashboard() {
  const { user } = useAuth();
  console.log("user", user);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getLecturerCourses(user!._id);
        setCourses(response.data.data);
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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-gray-600">
            Here&apos;s an overview of your courses
          </p>
        </div>

        {user?.role === "lecturer" && (
          <a href="/dashboard/courses/new" className="btn-primary">
            Create New Course
          </a>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Total Courses</h3>
          <p className="text-3xl font-bold">{courses.length}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">My Courses</h2>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={{
                ...course,
                _id: course._id,
                courseCode: course.courseCode,
                students: course.students,
                materials: course.materials,
                lecturer: course.lecturer,
              }}
              actionButton={{
                label: "View Course",
                action: `/dashboard/courses/${course._id}`,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-lg text-gray-600 mb-4">
            You haven&apos;t been assigned to any courses yet.
          </p>
          {user?.role === "student" && (
            <a href="/dashboard/courses/browse" className="btn-primary">
              Browse Available Courses
            </a>
          )}
        </div>
      )}
    </div>
  );
}
