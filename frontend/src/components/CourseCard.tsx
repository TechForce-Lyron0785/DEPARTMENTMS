"use client";

import { Course } from "@/types";
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
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
      <div className="flex flex-col gap-1 mb-6">
        <p className="text-gray-600">Course Code: {course.code}</p>
        <p className="text-gray-600">{course.description}</p>
        <p className="text-gray-500">Lecturer: {course.lecturer}</p>
        <p className="text-gray-500">
          Enrolled Students: {course.enrolledStudents}
        </p>
        <p className="text-gray-500">Materials: {course.materialCount}</p>
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
