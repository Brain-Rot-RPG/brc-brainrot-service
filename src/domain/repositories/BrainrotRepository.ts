import { Brainrot, BrainrotInput } from "../entities/Brainrot";

export interface BrainrotRepository {
  getAll(): Promise<Brainrot[]>;
  getById(id: string): Promise<Brainrot | null>;
  create(input: BrainrotInput): Promise<Brainrot>;
  update(id: string, input: BrainrotInput): Promise<Brainrot | null>;
  delete(id: string): Promise<boolean>;
}
