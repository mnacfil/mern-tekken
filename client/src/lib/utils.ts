import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MAX_ATTACK_BLAST, MAX_ATTACK_DAMAGE } from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomValue = (range: number) => {
  return Math.ceil(Math.random() * range);
};

export const getBlastDamage = () => {
  return (
    Math.ceil(Math.random() * (MAX_ATTACK_BLAST - MAX_ATTACK_DAMAGE)) +
    MAX_ATTACK_DAMAGE
  );
};
