"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import CourseCard from "@/components/CourseCard";
import { Course } from "@/types";

export default function Dashboard() {
  const { currentUser } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user's courses
    const fetchCourses = async () => {
      try {
        // In a real app, this would be an API call
        const response = await fetch("/api/courses");
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // For demo purposes, showing mock data
  const mockCourses: Course[] = [
    {
      id: "1",
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
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome, {currentUser?.fullName}
          </h1>
          <p className="text-gray-600">
            Here&apos;s an overview of your courses
          </p>
        </div>

        {currentUser?.role === "lecturer" && (
          <a href="/dashboard/courses/new" className="btn-primary">
            Create New Course
          </a>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Total Courses</h3>
          <p className="text-3xl font-bold">{mockCourses.length}</p>
        </div>

        {currentUser?.role === "student" ? (
          <></>
        ) : (
          <>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-500">
                Total Students
              </h3>
              <p className="text-3xl font-bold">290</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-500">
                Learning Materials
              </h3>
              <p className="text-3xl font-bold">55</p>
            </div>
          </>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-4">My Courses</h2>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : mockCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              actionButton={{
                label: "View Course",
                action: `/dashboard/courses/${course.id}`,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-lg text-gray-600 mb-4">
            You haven&apos;t been assigned to any courses yet.
          </p>
          {currentUser?.role === "student" && (
            <a href="/dashboard/courses/browse" className="btn-primary">
              Browse Available Courses
            </a>
          )}
        </div>
      )}
    </div>
  );
}
