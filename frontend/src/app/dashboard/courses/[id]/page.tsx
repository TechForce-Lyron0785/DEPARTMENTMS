"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Course, Material } from "@/types";
import Link from "next/link";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("materials");

  // Mock course data
  const mockCourse: Course = {
    id: "1",
    title: "Introduction to Computer Science",
    code: "CS101",
    description:
      "This course introduces fundamental concepts of computer science and programming. Students will learn problem-solving approaches, basic algorithms, and programming concepts using Python.",
    lecturer: "Dr. Jane Smith",
    enrolledStudents: 120,
    materialCount: 3,
  };

  // Mock materials data
  const mockMaterials: Material[] = [
    {
      id: "1",
      title: "Course Syllabus",
      type: "pdf",
      size: "1.2 MB",
      uploadDate: "2023-09-01",
      downloadUrl: "#",
    },
    {
      id: "2",
      title: "Introduction to Algorithms",
      type: "ppt",
      size: "3.5 MB",
      uploadDate: "2023-09-05",
      downloadUrl: "#",
    },
    {
      id: "3",
      title: "Python Basics - Code Examples",
      type: "zip",
      size: "4.8 MB",
      uploadDate: "2023-09-10",
      downloadUrl: "#",
    },
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setCourse(mockCourse);
      setMaterials(mockMaterials);
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
    <div>
      {/* Course Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="flex flex-col items-start lg:flex-row gap-4 lg:gap-0 justify-between">
              <h1 className="text-2xl font-bold">{course.title}</h1>
              {currentUser?.role === "lecturer" && (
                <div className="mb-4">
                  <Link
                    href={`/dashboard/courses/${course.id}/edit`}
                    className="btn-secondary mr-2 px-4 py-2 rounded-md bg-yellow-600 text-white hover:bg-yellow-700 transition duration-200"
                  >
                    Edit Course
                  </Link>
                  <Link
                    href={`/dashboard/courses/${course.id}/materials/upload`}
                    className="btn-primary px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
                  >
                    Upload New Material
                  </Link>
                </div>
              )}
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <span className="mr-4">Course Code: {course.code}</span>
              <span>Lecturer: {course.lecturer}</span>
            </div>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-4">
                Enrolled Students: {course.enrolledStudents}
              </span>
              <span>Materials: {course.materialCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "materials"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("materials")}
          >
            Course Materials
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "students"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("students")}
          >
            Enrolled Students
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "info"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("info")}
          >
            Course Information
          </button>
        </div>

        <div className="p-6">
          {activeTab === "materials" && (
            <div>
              {materials.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Size
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Uploaded
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {materials.map((material) => (
                        <tr key={material.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                              {material.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {material.type.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {material.size}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {material.uploadDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              href={material.downloadUrl}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              Download
                            </Link>
                            {currentUser?.role === "lecturer" && (
                              <Link
                                href="#"
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">
                    No materials have been uploaded for this course yet.
                  </p>
                  {currentUser?.role === "lecturer" && (
                    <Link
                      href={`/dashboard/courses/${course.id}/materials/upload`}
                      className="btn-primary"
                    >
                      Upload First Material
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "students" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Enrolled Students (120)
              </h2>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search students..."
                  className="form-input"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Enrollment Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            Student {i}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          student{i}@example.com
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2023-09-0{i}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Showing 5 of 120 students
                </span>
                <div className="flex">
                  <button className="btn-secondary mr-2 px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition duration-200">
                    Previous
                  </button>
                  <button className="btn-secondary px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition duration-200">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "info" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Course Information</h2>

              <div className="bg-gray-50 p-4 rounded mb-6">
                <h3 className="text-md font-medium mb-2">Course Description</h3>
                <p className="text-gray-700">{course.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-medium mb-2">Course Details</h3>
                  <ul className="bg-gray-50 rounded p-4 space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Course Code:</span>
                      <span className="font-medium">{course.code}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Lecturer:</span>
                      <span className="font-medium">{course.lecturer}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium">Computer Science</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Credits:</span>
                      <span className="font-medium">3</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">15 weeks</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-md font-medium mb-2">Schedule</h3>
                  <ul className="bg-gray-50 rounded p-4 space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Lectures:</span>
                      <span className="font-medium">
                        Mondays, 10:00 - 12:00
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Labs:</span>
                      <span className="font-medium">
                        Wednesdays, 14:00 - 16:00
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Office Hours:</span>
                      <span className="font-medium">
                        Thursdays, 13:00 - 15:00
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Start Date:</span>
                      <span className="font-medium">September 1, 2023</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">End Date:</span>
                      <span className="font-medium">December 15, 2023</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
