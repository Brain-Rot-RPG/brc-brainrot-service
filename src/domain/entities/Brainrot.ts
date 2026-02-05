export interface Brainrot {
  id: number;
  name: string;
  image?: string | null;
  baseHP: number;
  baseAttack: number;
  isBoss: boolean;
  createdAt: Date;
}

export interface BrainrotInput {
  name: string;
  image?: string | null;
  baseHP: number;
  baseAttack: number;
  isBoss?: boolean;
}
