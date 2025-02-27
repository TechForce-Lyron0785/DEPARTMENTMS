"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import CourseCard from "@/components/CourseCard";
import { Course } from "@/types/course";
import Link from "next/link";

export default function CoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock courses data
  const mockCourses: Course[] = [
    {
      _id: "1",
      title: "Introduction to Computer Science",
      code: "CS101",
      description: "Fundamental concepts of computer science and programming.",
      lecturer: "Dr. Jane Smith",
      enrolledStudents: 120,
      materialCount: 15,
    },
    {
      id: "2",
      title: "Advanced Database Systems",
      code: "DB301",
      description: "Advanced concepts in database design and management.",
      lecturer: "Prof. Michael Johnson",
      enrolledStudents: 75,
      materialCount: 22,
    },
    {
      id: "3",
      title: "Web Development Fundamentals",
      code: "WD201",
      description: "Learn the basics of modern web development.",
      lecturer: "Dr. Sarah Lee",
      enrolledStudents: 95,
      materialCount: 18,
    },
    {
      id: "4",
      title: "Mobile App Development",
      code: "MAD202",
      description: "Create applications for mobile platforms.",
      lecturer: "Prof. Alex Wong",
      enrolledStudents: 85,
      materialCount: 14,
    },
    {
      id: "5",
      title: "Data Structures and Algorithms",
      code: "DSA201",
      description: "Study of fundamental data structures and algorithms.",
      lecturer: "Dr. Robert Chen",
      enrolledStudents: 110,
      materialCount: 20,
    },
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.lecturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">All Courses</h1>
          <p className="text-gray-600">
            {user?.role === "student"
              ? "Browse and enroll in available courses"
              : "Manage your courses and materials"}
          </p>
        </div>

        {user?.role === "lecturer" && (
          <Link
            href="/dashboard/courses/new"
            className="btn-primary px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition duration-200"
          >
            Create New Course
          </Link>
        )}
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
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              actionButton={
                user?.role === "student"
                  ? {
                      label: "Enroll",
                      action: `/dashboard/courses/${course.id}/enroll`,
                    }
                  : {
                      label: "Manage",
                      action: `/dashboard/courses/${course.id}`,
                    }
              }
            />
          ))}
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
