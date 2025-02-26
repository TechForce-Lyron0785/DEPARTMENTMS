"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Course } from "@/types";
import Link from "next/link";

export default function EditCoursePage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    description: "",
    lecturer: "",
  });

  useEffect(() => {
    // Simulate fetching course data
    const fetchCourse = async () => {
      // In a real app, this would be an API call
      const mockCourse: Course = {
        id: "1",
        title: "Introduction to Computer Science",
        code: "CS101",
        description:
          "Fundamental concepts of computer science and programming.",
        lecturer: "Dr. Jane Smith",
        enrolledStudents: 120,
        materialCount: 15,
      };
      setCourse(mockCourse);
      setFormData({
        title: mockCourse.title,
        code: mockCourse.code,
        description: mockCourse.description,
        lecturer: mockCourse.lecturer,
      });
      setLoading(false);
    };

    fetchCourse();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to update course
    console.log("Updated Course Data:", formData);
    // Redirect to the course details page after saving
    router.push(`/dashboard/courses/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <p className="text-lg text-gray-600">Course not found.</p>
        <Link
          href="/dashboard/courses"
          className="btn-primary mt-4 inline-block"
        >
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Course Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="title">
            Course Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="code">
            Course Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="lecturer">
            Lecturer
          </label>
          <input
            type="text"
            id="lecturer"
            name="lecturer"
            value={formData.lecturer}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="btn-primary px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200 cursor-pointer mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
