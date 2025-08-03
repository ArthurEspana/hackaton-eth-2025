import { StaticImageData } from "next/image";

// src/types/cause.ts
export type DonationType = "monetary" | "in-kind";

export interface Cause {
  id: number;
  image: string | StaticImageData;
  title: string;
  description: string;
  fullDescription: string;
  raised: number;
  goal: number;
  donationType: DonationType;
  walletAddress: string; // Nuevo campo para la dirección de wallet
  itemsNeeded?: string[];
  impactMetrics?: string[];
}

export interface CauseCardProps extends Cause {
  onDonate: (id: number, amount: number) => void;
}
