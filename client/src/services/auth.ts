import { BASE_PATH } from "@/lib/config";
import apiClient from "./api";
import type {
  ApiResponse,
  AuthUser,
  LoginPayload,
  Player,
  RegisterPayload,
} from "@/lib/types";

type GetCurrentUserQuery = {
  id: string;
};

const register = async (
  payload: RegisterPayload
): Promise<ApiResponse<{ player: Player }> | null> => {
  try {
    const response = await apiClient.post(
      `${BASE_PATH.auth}/register`,
      payload
    );

    if (response.status !== 201) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    return null;
  }
};

const login = async (
  payload: LoginPayload
): Promise<ApiResponse<{ player: Player }> | null> => {
  try {
    const response = await apiClient.post(`${BASE_PATH.auth}/login`, payload);

    if (response.status !== 200) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

const getCurrentUser = async (
  query: GetCurrentUserQuery
): Promise<ApiResponse<{ player: Player }> | null> => {
  try {
    const response = await apiClient(
      `${BASE_PATH.auth}/current-user?id=${query.id}`
    );
    if (response.status !== 200) {
      return null;
    }
    return response.data;
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
