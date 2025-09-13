export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5050/api/v1";
export const BASE_PATH = {
  auth: "/auth",
  player: "/player",
  monster: "/monster",
  game: "/game",
} as const;
