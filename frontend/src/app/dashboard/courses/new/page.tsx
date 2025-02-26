"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function CreateCoursePage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    description: "",
    department: "",
    credits: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if user is a lecturer
  if (currentUser?.role !== "lecturer") {
    router.push("/dashboard");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/courses', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.push("/dashboard/courses");
    } catch (err) {
      setError("Failed to create course. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create New Course</h1>
        <p className="text-gray-600">
          Set up a new course for students to enroll
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="title" className="form-label">
                Course Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="form-input border rounded-md p-2 w-full mt-2"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Introduction to Computer Science"
              />
            </div>

            <div>
              <label htmlFor="code" className="form-label">
                Course Code
              </label>
              <input
                id="code"
                name="code"
                type="text"
                required
                className="form-input border rounded-md p-2 w-full mt-2"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g., CS101"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="form-label">
              Course Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              className="form-input border rounded-md p-2 w-full mt-2"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a detailed description of the course content and objectives"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="department" className="form-label">
                Department
              </label>
              <select
                id="department"
                name="department"
                className="form-input border rounded-md p-2 w-full mt-2"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="cs">Computer Science</option>
                <option value="math">Mathematics</option>
                <option value="eng">Engineering</option>
                <option value="bus">Business</option>
                <option value="arts">Arts & Humanities</option>
              </select>
            </div>

            <div>
              <label htmlFor="credits" className="form-label">
                Credits
              </label>
              <input
                id="credits"
                name="credits"
                type="number"
                min="1"
                max="6"
                required
                className="form-input border rounded-md p-2 w-full mt-2"
                value={formData.credits}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="startDate" className="form-label">
                Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                required
                className="form-input border rounded-md p-2 w-full mt-2"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="endDate" className="form-label">
                End Date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                required
                className="form-input border rounded-md p-2 w-full mt-2"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              href="/dashboard/courses"
              className="btn-secondary mr-2 px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition duration-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
            >
              {loading ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
