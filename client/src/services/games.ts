import { BASE_PATH } from "@/lib/config";
import apiClient from "./api";
import type { ApiResponse, Game, GameV2, Monster } from "@/lib/types";

export const getBattleHistory = async (playerId: string) => {
  console.log(playerId);
  try {
    const response = await apiClient(
      `${BASE_PATH.game}/${playerId}/battle-history`
    );
    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.log("Failed to fetch battle history");
    return null;
  }
};

export const getMonster = async (): Promise<ApiResponse<{
  monster: Monster;
}> | null> => {
  try {
    const response = await apiClient(`${BASE_PATH.monster}/random`);
    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.log("Failed to fetch battle history");
    return null;
  }
};

export const startGame = async (
  playerId: string,
  monsterId: string,
  duration?: number
): Promise<ApiResponse<{ game: Game }> | null> => {
  const payload = {
    playerId,
    monsterId,
    duration: duration ?? 60,
  };
  try {
    const response = await apiClient.post(`${BASE_PATH.game}/start`, payload);
    if (response.status !== 201) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.log("Failed to fetch battle history");
    return null;
  }
};

export const playerAttack = async (
  gameId: string,
  damage: number
): Promise<ApiResponse<{ game: Game }> | null> => {
  try {
    const response = await apiClient.post(
      `${BASE_PATH.game}/${gameId}/player-attack`,
      { damage }
    );
    if (response.status !== 200) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.log("Failed to attack monster");
    return null;
  }
};

export const monsterAttack = async (
  gameId: string,
  damage: number
): Promise<ApiResponse<{ game: Game }> | null> => {
  try {
    const response = await apiClient.post(
      `${BASE_PATH.game}/${gameId}/monster-attack`,
      { damage }
    );
    if (response.status !== 200) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.log("Failed to attack player");
    return null;
  }
};

export const healEntity = async (
  gameId: string,
  entity: "player" | "monster",
  heal: number
): Promise<ApiResponse<{ game: Game }> | null> => {
  try {
    const response = await apiClient.post(`${BASE_PATH.game}/${gameId}/heal`, {
      entity,
      heal,
    });
    if (response.status !== 200) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.log("Failed to heal");
    return null;
  }
};
