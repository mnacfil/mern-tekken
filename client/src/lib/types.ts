import type { login, register } from "@/services/auth";

export interface ApiResponse<T> {
  status: "success" | "error";
  data: T;
}

export interface Game {
  gameData: GameData;
  _id: string;
  player: Player;
  monster: Monster;
  status: "in-progress" | "completed" | "pending" | "abandoned";
  winner: string | null;
  duration: number;
  moves: Move[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  durationInMinutes: number;
  id: string;
}

export interface GameV2 {
  gameData: GameData;
  _id: string;
  player: Pick<Player, "id" | "fullName" | "_id">;
  monster: Pick<Monster, "id" | "_id" | "name">;
  status: "in-progress" | "completed" | "pending" | "abandoned";
  winner: string | null;
  duration: number;
  moves: Move[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  durationInMinutes: number;
  id: string;
}

export interface GameData {
  playerHealth: number;
  monsterHealth: number;
}

export interface Player {
  _id: string;
  fullName: string;
  email?: string;
  avatar?: string | null;
  id: string;
}

export interface Monster {
  _id: string;
  name: string;
  avatar?: string | null;
  id: string;
  health?: number;
  attack?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface Move {
  entity: "player" | "monster";
  action: string;
  damage?: number;
  _id?: string;
  id?: string;
}

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
