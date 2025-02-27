import { Material } from "@/types/material";
import { User } from "./user";

export interface Course {
  _id: string;
  title: string;
  description: string;
  lecturer: string | User; // Can be either ID or populated user object
  students: string[] | User[]; // Can be either IDs or populated user objects
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseData {
  title: string;
  description: string;
  lecturer: string; // Lecturer ID
}

export interface UpdateCourseData {
  title?: string;
  description?: string;
  lecturer?: string;
}

export interface CourseWithDetails extends Course {
  lecturer: User;
  students: User[];
  materials: Material[];
}
