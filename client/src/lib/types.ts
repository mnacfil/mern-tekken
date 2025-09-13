import type { login, register } from "@/services/auth";

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginPayload = Pick<RegisterPayload, "email" | "password">;

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
};

export type LoginResponse = Awaited<ReturnType<typeof login>>;
export type RegisterResponse = Awaited<ReturnType<typeof register>>;
