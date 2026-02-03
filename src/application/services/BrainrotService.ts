import { Brainrot, BrainrotInput } from "../../domain/entities/Brainrot";
import { BrainrotRepository } from "../../domain/repositories/BrainrotRepository";

export class BrainrotService {
  constructor(private readonly repository: BrainrotRepository) {}

  async getAll(): Promise<Brainrot[]> {
    return this.repository.getAll();
  }

  async getById(id: number): Promise<Brainrot | null> {
    return this.repository.getById(id);
  }

  async create(input: BrainrotInput): Promise<Brainrot> {
    // Default isBoss to false if not provided
    const normalizedInput: BrainrotInput = {
      ...input,
      isBoss: input.isBoss ?? false,
    };
    return this.repository.create(normalizedInput);
  }

  async update(id: number, input: BrainrotInput): Promise<Brainrot | null> {
    // Default isBoss to false if not provided
    const normalizedInput: BrainrotInput = {
      ...input,
      isBoss: input.isBoss ?? false,
    };
    return this.repository.update(id, normalizedInput);
  }

  async delete(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
