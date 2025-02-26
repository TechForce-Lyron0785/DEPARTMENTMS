"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { currentUser, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || "",
    email: currentUser?.email || "",
    department: currentUser?.department || "",
    bio: currentUser?.bio || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await updateProfile(formData);
      setSuccess(true);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="md:flex">
          {/* Sidebar */}
          <div className="bg-gray-50 p-6 md:w-1/3">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 text-4xl mb-4">
                {currentUser?.fullName?.charAt(0) || "U"}
              </div>
              <h2 className="text-xl font-bold">{currentUser?.fullName}</h2>
              <p className="text-gray-600">
                {currentUser?.role === "lecturer" ? "Lecturer" : "Student"}
              </p>
              <p className="text-gray-500 mt-1">{currentUser?.email}</p>

              <div className="mt-6 w-full">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Account Details
                </h3>
                <ul className="space-y-2">
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-600">Member Since:</span>
                    <span>Jan 2023</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Login:</span>
                    <span>Today at 09:30</span>
                  </li>
                  {currentUser?.role === "student" && (
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-600">Courses Enrolled:</span>
                      <span>5</span>
                    </li>
                  )}
                  {currentUser?.role === "lecturer" && (
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-600">Courses:</span>
                      <span>3</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="p-6 md:w-2/3">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            {success && (
              <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4">
                Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="form-input border rounded-md p-2 w-full"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input border rounded-md p-2 w-full"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="department" className="form-label">
                    Department
                  </label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    className="form-input border rounded-md p-2 w-full"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="form-label">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={6}
                    className="form-input border rounded-md p-2 w-full"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
