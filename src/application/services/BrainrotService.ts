import { Brainrot } from "../../domain/entities/Brainrot";
import { BrainrotRepository } from "../../domain/repositories/BrainrotRepository";

export interface BrainrotInput {
  name: string;
  baseHP: number;
  baseAttack: number;
}

export class BrainrotService {
  constructor(private readonly repository: BrainrotRepository) {}

  async getAll(): Promise<Brainrot[]> {
    return this.repository.getAll();
  }

  async getById(id: string): Promise<Brainrot | null> {
    return this.repository.getById(id);
  }

  async create(input: BrainrotInput): Promise<Brainrot> {
    return this.repository.create(input);
  }

  async update(id: string, input: BrainrotInput): Promise<Brainrot | null> {
    return this.repository.update(id, input);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
