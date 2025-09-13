export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5050/api/v1";
export const BASE_PATH = {
  auth: "/auth",
  player: "/players",
  monster: "/monsters",
  game: "/games",
} as const;

export const MAX_ATTACK_DAMAGE = 10;
export const MAX_ATTACK_BLAST = 30;
export const MAX_HEAL = 20;
export const HEAL_COUNT = 3;
