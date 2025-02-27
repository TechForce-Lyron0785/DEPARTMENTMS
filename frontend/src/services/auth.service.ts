import axios from "../lib/axios";
import { LoginCredentials, RegisterData, AuthResponse } from "../types/user";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>("/auth/signup", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await axios.post("/auth/logout");
    } finally {
      localStorage.removeItem("token");
    }
  },
};
