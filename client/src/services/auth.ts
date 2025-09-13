import { BASE_PATH } from "@/lib/config";
import apiClient from "./api";
import type { AuthUser, LoginPayload, RegisterPayload } from "@/lib/types";

type GetCurrentUserQuery = {
  id: string;
};

const register = async (payload: RegisterPayload) => {
  try {
    const response = await apiClient.post(
      `${BASE_PATH.auth}/register`,
      payload
    );

    if (response.status !== 201) {
      return null;
    }

    const { token, message, data } = response.data;

    return {
      token,
      message,
      user: {
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        avatar: data.avatar,
      },
    };
  } catch (error) {
    console.error("Registration failed:", error);
    return null;
  }
};

const login = async (payload: LoginPayload) => {
  try {
    const response = await apiClient.post(`${BASE_PATH.auth}/login`, payload);

    if (response.status !== 200) {
      return null;
    }

    const { token, message, data } = response.data;

    return {
      token,
      message,
      user: {
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        avatar: data.avatar,
      },
    };
  } catch (error) {
    console.error("Login failed:", error);
    return null;
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
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export { register, login, logout, getCurrentUser };
