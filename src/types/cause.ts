// src/types/cause.ts
export type DonationType = 'monetary' | 'in-kind';

export interface Cause {
  id: number;
  image: string;
  title: string;
  description: string;
  fullDescription: string;
  raised: number;
  goal: number;
  donationType: DonationType;
  itemsNeeded?: string[];
  impactMetrics?: string[];
}

export interface CauseCardProps extends Cause {
  onDonate: (id: number, amount: number) => void;
}