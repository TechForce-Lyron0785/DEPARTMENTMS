import axios from "../lib/axios";
import {
  Course,
  CreateCourseData,
  UpdateCourseData,
  CourseWithDetails,
} from "../types/course";
import { ApiResponse, PaginatedResponse, QueryParams } from "../types/api";

export const courseService = {
  getAllCourses: async (
    params?: QueryParams
  ): Promise<ApiResponse<PaginatedResponse<Course>>> => {
    const response = await axios.get("/courses", { params });
    return response.data;
  },

  getCourseById: async (
    id: string
  ): Promise<ApiResponse<CourseWithDetails>> => {
    const response = await axios.get(`/courses/${id}`);
    return response.data;
  },

  createCourse: async (
    data: CreateCourseData
  ): Promise<ApiResponse<Course>> => {
    const response = await axios.post("/courses", data);
    return response.data;
  },

  updateCourse: async (
    id: string,
    data: UpdateCourseData
  ): Promise<ApiResponse<Course>> => {
    const response = await axios.put(`/courses/${id}`, data);
    return response.data;
  },

  deleteCourse: async (id: string): Promise<ApiResponse<void>> => {
    const response = await axios.delete(`/courses/${id}`);
    return response.data;
  },
};
