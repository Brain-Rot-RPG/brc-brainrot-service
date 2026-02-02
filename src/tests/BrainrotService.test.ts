import { BrainrotService } from "../application/services/BrainrotService";
import { BrainrotRepository } from "../domain/repositories/BrainrotRepository";
import { Brainrot } from "../domain/entities/Brainrot";

class InMemoryBrainrotRepository implements BrainrotRepository {
  private items: Brainrot[] = [];

  async getAll(): Promise<Brainrot[]> {
    return this.items;
  }

  async getById(id: string): Promise<Brainrot | null> {
    return this.items.find((item) => item.id === id) ?? null;
  }

  async create(input: Omit<Brainrot, "id" | "createdAt">): Promise<Brainrot> {
    const created: Brainrot = {
      id: `id-${this.items.length + 1}`,
      createdAt: new Date("2026-01-01T00:00:00Z"),
      ...input,
    };
    this.items.push(created);
    return created;
  }

  async update(
    id: string,
    input: Omit<Brainrot, "id" | "createdAt">
  ): Promise<Brainrot | null> {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }

    const updated: Brainrot = {
      ...this.items[index],
      ...input,
    };
    this.items[index] = updated;
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const before = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    return this.items.length < before;
  }
}

describe("BrainrotService", () => {
  it("creates a brainrot", async () => {
    const repo = new InMemoryBrainrotRepository();
    const service = new BrainrotService(repo);

    const created = await service.create({
      name: "Test",
      baseHP: 100,
      baseAttack: 20,
    });

    expect(created.id).toBeDefined();
    expect(created.name).toBe("Test");
    expect(created.baseHP).toBe(100);
    expect(created.baseAttack).toBe(20);
  });

  it("updates a brainrot", async () => {
    const repo = new InMemoryBrainrotRepository();
    const service = new BrainrotService(repo);

    const created = await service.create({
      name: "Test",
      baseHP: 100,
      baseAttack: 20,
    });

    const updated = await service.update(created.id, {
      name: "Updated",
      baseHP: 150,
      baseAttack: 30,
    });

    expect(updated).not.toBeNull();
    expect(updated?.name).toBe("Updated");
  });

  it("returns null when updating missing brainrot", async () => {
    const repo = new InMemoryBrainrotRepository();
    const service = new BrainrotService(repo);

    const updated = await service.update("missing", {
      name: "Updated",
      baseHP: 150,
      baseAttack: 30,
    });

    expect(updated).toBeNull();
  });
});
