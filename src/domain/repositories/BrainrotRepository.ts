import { Brainrot } from "../entities/Brainrot";

export interface BrainrotRepository {
  getAll(): Promise<Brainrot[]>;
  getById(id: string): Promise<Brainrot | null>;
  create(input: Omit<Brainrot, "id" | "createdAt">): Promise<Brainrot>;
  update(id: string, input: Omit<Brainrot, "id" | "createdAt">): Promise<Brainrot | null>;
  delete(id: string): Promise<boolean>;
}
