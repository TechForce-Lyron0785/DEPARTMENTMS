"use client";

import React, { createContext, useContext, useState } from "react";

interface User {
  fullName: string;
  email: string;
  role: "student" | "lecturer";
  department?: string;
  bio?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  updateProfile: (data: Partial<User>) => Promise<void>;
  register: (data: User) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const updateProfile = async (data: Partial<User>) => {
    // Simulate API call
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentUser((prev) => ({ ...prev, ...data } as User));
    setLoading(false);
  };

  const register = async (data: User) => {
    // Simulate registration
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentUser(data);
    setLoading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (email: string, password: string) => {
    // Simulate login
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentUser({ fullName: "John Doe", email, role: "student" });
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, updateProfile, register, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
