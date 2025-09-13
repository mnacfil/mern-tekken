import { BASE_PATH } from "@/lib/config";
import apiClient from "./api";
import type { AuthUser } from "@/lib/types";

type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginPayload = Pick<RegisterPayload, "email" | "password">;

type GetCurrentUserQuery = {
  id: string;
};

const register = async (payload: RegisterPayload) => {
  try {
    const response = await apiClient.post(
      `${BASE_PATH.auth}/register`,
      payload
    );
    //   const response = await fetch('http://localhost:5050/api/v1/auth/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify({
    //       fullName: 'John Doe',
    //       email: 'john@example.com',
    //       password: 'password123',
    //       confirmPassword: 'password123',
    //       avatar: 'https://example.com/avatar.jpg'
    //     })
    //   });
    //   const data = await response.json();
    console.log("Registration successful:");
    return response.data;
    // Cookie is automatically set by browser
  } catch (error) {
    console.error("Registration failed:", error);
  }
};

const login = async (payload: LoginPayload) => {
  try {
    const response = await apiClient.post(`${BASE_PATH.auth}/login`, payload);
    // const response = await fetch("http://localhost:5050/api/v1/auth/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include",
    //   body: JSON.stringify({
    //     email: "john@example.com",
    //     password: "password123",
    //   }),
    // });

    // const data = await response.json();
    console.log("Login successful:");
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
  }
};

const getCurrentUser = async (
  query: GetCurrentUserQuery
): Promise<AuthUser | null> => {
  try {
    const response = await apiClient(
      `${BASE_PATH.auth}/current-user?id=${query.id}`
    );
    if (response.status !== 200) {
      return null;
    }
    const { id, fullName, email, avatar } = response.data?.data?.player;
    return {
      id,
      fullName,
      email,
      avatar,
    };
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
};

const logout = async () => {
  try {
    await apiClient.post(`${BASE_PATH.auth}/logout`);
    // const response = await fetch("http://localhost:5050/api/v1/auth/logout", {
    //   method: "POST",
    //   credentials: "include",
    // });

    // const data = await response.json();
    console.log("Logout successful:");
    // Cookie is automatically cleared
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export { register, login, logout, getCurrentUser };
