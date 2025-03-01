"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { courseService } from "@/services/course.service";
import { materialService } from "@/services/material.service";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { formatDate } from "../../../../../utils/formatDate";

export default function CourseDetailsPage() {
  const { id } = useParams();
  console.log("id", id);

  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [activeTab, setActiveTab] = useState("materials");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseResponse = await courseService.getCourseById(id);
        setCourse(courseResponse);

        const materialsResponse = await materialService.getMaterialsByCourse(
          id
        );
        setMaterials(materialsResponse);

        // Fetch students associated with the course
        const studentsResponse = await courseService.getStudentsByCourse(id);
        console.log("studentsResponse", studentsResponse.data);

        setStudents(studentsResponse.data); // Set the full student details
      } catch (err) {
        setError("Failed to fetch course details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleDeleteMaterial = async (materialId) => {
    try {
      await materialService.deleteMaterial(materialId);
      setMaterials((prev) => prev.filter((m) => m._id !== materialId));
    } catch (err) {
      setError("Failed to delete material.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

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
        <div className="flex flex-col items-start lg:flex-row gap-4 lg:gap-0 justify-between">
          <h1 className="text-2xl font-bold mb-4">{course?.title}</h1>

          {user?.role === "lecturer" && (
            <div className="mb-4">
              <Link
                href={`/dashboard/courses/${course._id}/edit`}
                className="btn-secondary mr-2 px-4 py-2 rounded-md bg-yellow-600 text-white hover:bg-yellow-700 transition duration-200"
              >
                Edit Course
              </Link>
              <Link
                href={`/dashboard/courses/${course._id}/materials/upload`}
                className="btn-primary px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
              >
                Upload New Material
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <span className="mr-4">Course Code: {course.courseCode}</span>
        </div>
        <p className="text-gray-700 mb-4">{course.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-4">
            No of Enrolled Students: {course.students.length}
          </span>
          <span>No of Materials: {course.materials.length}</span>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
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
        </div>

        <div className="p-6">
          {/* Materials Tab */}
          {activeTab === "materials" && (
            <div>
              {materials.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Uploaded
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {materials.map((material) => (
                        <tr key={material._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                              {material.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(material.uploadedAt &&
                              formatDate(material.uploadedAt)) ||
                              (material.updatedAt &&
                                formatDate(material.updatedAt))}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href={material.fileUrl}
                              download
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              Download
                            </a>
                            {user?.role === "lecturer" && (
                              <button
                                onClick={() =>
                                  handleDeleteMaterial(material._id)
                                }
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
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
                  {user?.role === "lecturer" && (
                    <Link
                      href={`/dashboard/courses/${course?._id}/materials/upload`}
                      className="btn-primary"
                    >
                      Upload First Material
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Enrolled Students ({students.length})
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {student.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
