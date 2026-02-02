import { Brainrot, BrainrotInput } from "../../domain/entities/Brainrot";
import { BrainrotRepository } from "../../domain/repositories/BrainrotRepository";

export class BrainrotService {
  constructor(private readonly repository: BrainrotRepository) {}

  async getAll(): Promise<Brainrot[]> {
    return this.repository.getAll();
  }

  async getById(id: string): Promise<Brainrot | null> {
    return this.repository.getById(id);
  }

  async create(input: BrainrotInput): Promise<Brainrot> {
    // Default isBoss to false if not provided
    const normalizedInput: any = {
      ...input,
      isBoss: input.isBoss ?? false,
    };
    return this.repository.create(normalizedInput);
  }

  async update(id: string, input: BrainrotInput): Promise<Brainrot | null> {
    // Default isBoss to false if not provided
    const normalizedInput: any = {
      ...input,
      isBoss: input.isBoss ?? false,
    };
    return this.repository.update(id, normalizedInput);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
