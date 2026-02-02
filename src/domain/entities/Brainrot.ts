export interface Brainrot {
  id: string;
  name: string;
  baseHP: number;
  baseAttack: number;
  isBoss: boolean;
  createdAt: Date;
}

export interface BrainrotInput {
  name: string;
  baseHP: number;
  baseAttack: number;
  isBoss?: boolean;
}
