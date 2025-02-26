"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { currentUser } = useAuth();

  return (
    <nav className="bg-gray-800 text-white h-20 mx-auto flex justify-between items-center w-full px-4">
      <Link href="/" className="text-2xl font-bold">
        Campus connect
      </Link>
      <ul className="flex space-x-4">
        <li>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/dashboard/courses" className="hover:underline">
            Courses
          </Link>
        </li>
        {currentUser ? (
          <>
            <li>
              <Link href="/dashboard/profile" className="hover:underline">
                Profile
              </Link>
            </li>
            {currentUser.role === "lecturer" && (
              <li>
                <Link href="/dashboard/courses/new" className="hover:underline">
                  Create Course
                </Link>
              </li>
            )}
            <li>
              <Link href="/logout" className="hover:underline">
                Logout
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
