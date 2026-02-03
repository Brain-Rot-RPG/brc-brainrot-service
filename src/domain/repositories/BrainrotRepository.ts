import { Brainrot, BrainrotInput } from "../entities/Brainrot";

export interface BrainrotRepository {
  getAll(): Promise<Brainrot[]>;
  getById(id: number): Promise<Brainrot | null>;
  create(input: BrainrotInput): Promise<Brainrot>;
  update(id: number, input: BrainrotInput): Promise<Brainrot | null>;
  delete(id: number): Promise<boolean>;
}
