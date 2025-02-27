"use client";
import { useAuth } from "@/context/AuthContext";
import { Course } from "@/types/course";
import Link from "next/link";

interface ActionButton {
  label: string;
  action: string;
}

interface CourseCardProps {
  course: Course;
  actionButton: ActionButton;
}

export default function CourseCard({ course, actionButton }: CourseCardProps) {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
      <div className="flex flex-col gap-1 mb-6">
        <p className="text-gray-600">Course Code: {course.courseCode}</p>
        <p className="text-gray-600">{course.description}</p>
        {user?.role !== "lecturer" && (
          <>
            <p className="text-gray-500">
              Lecturer Name:{" "}
              {typeof course.lecturer === "string"
                ? "N/A"
                : course.lecturer.name}
            </p>
            <p className="text-gray-500">
              Lecturer Email:{" "}
              {typeof course.lecturer === "string"
                ? "N/A"
                : course.lecturer.email}
            </p>
          </>
        )}
        <p className="text-gray-500">
          Enrolled Students:{" "}
          {Array.isArray(course.students) ? course.students.length : 0}
        </p>
        <p className="text-gray-500">
          Materials:{" "}
          {Array.isArray(course.materials) ? course.materials.length : 0}
        </p>
      </div>
      <Link
        href={actionButton.action}
        className="btn-primary px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
      >
        {actionButton.label}
      </Link>
    </div>
  );
}
