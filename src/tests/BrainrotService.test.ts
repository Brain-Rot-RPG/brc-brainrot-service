import { BrainrotService } from "../application/services/BrainrotService";
import { BrainrotRepository } from "../domain/repositories/BrainrotRepository";
import { Brainrot, BrainrotInput } from "../domain/entities/Brainrot";

class InMemoryBrainrotRepository implements BrainrotRepository {
  private items: Brainrot[] = [];

  async getAll(): Promise<Brainrot[]> {
    return this.items;
  }

  async getById(id: string): Promise<Brainrot | null> {
    return this.items.find((item) => item.id === id) ?? null;
  }

  async create(input: BrainrotInput): Promise<Brainrot> {
    const created: Brainrot = {
      id: `id-${this.items.length + 1}`,
      createdAt: new Date("2026-01-01T00:00:00Z"),
      ...input,
      isBoss: input.isBoss ?? false,
    };
    this.items.push(created);
    return created;
  }

  async update(
    id: string,
    input: BrainrotInput
  ): Promise<Brainrot | null> {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }

    const updated: Brainrot = {
      ...this.items[index],
      ...input,
      isBoss: input.isBoss ?? this.items[index].isBoss,
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
  let repo: InMemoryBrainrotRepository;
  let service: BrainrotService;

  beforeEach(() => {
    repo = new InMemoryBrainrotRepository();
    service = new BrainrotService(repo);
  });

  describe("create", () => {
    it("creates a brainrot with all fields", async () => {
      const created = await service.create({
        name: "Test",
        baseHP: 100,
        baseAttack: 20,
        isBoss: false,
      });

      expect(created.id).toBeDefined();
      expect(created.name).toBe("Test");
      expect(created.baseHP).toBe(100);
      expect(created.baseAttack).toBe(20);
      expect(created.isBoss).toBe(false);
      expect(created.createdAt).toBeDefined();
    });

    it("creates multiple brainrots with unique ids", async () => {
      const first = await service.create({
        name: "First",
        baseHP: 100,
        baseAttack: 20,
        isBoss: false,
      });

      const second = await service.create({
        name: "Second",
        baseHP: 150,
        baseAttack: 30,
        isBoss: false,
      });

      expect(first.id).not.toBe(second.id);
    });

    it("creates brainrot with high stats", async () => {
      const created = await service.create({
        name: "Boss",
        baseHP: 9999,
        baseAttack: 999,
        isBoss: true,
      });

      expect(created.baseHP).toBe(9999);
      expect(created.baseAttack).toBe(999);
      expect(created.isBoss).toBe(true);
    });
  });

  describe("getAll", () => {
    it("returns empty array when no brainrots exist", async () => {
      const all = await service.getAll();
      expect(all).toEqual([]);
    });

    it("returns all created brainrots", async () => {
      await service.create({ name: "First", baseHP: 100, baseAttack: 20, isBoss: false });
      await service.create({ name: "Second", baseHP: 150, baseAttack: 30, isBoss: false });
      await service.create({ name: "Third", baseHP: 200, baseAttack: 40, isBoss: true });

      const all = await service.getAll();
      expect(all).toHaveLength(3);
      expect(all.map((b) => b.name)).toEqual(["First", "Second", "Third"]);
    });
  });

  describe("getById", () => {
    it("returns brainrot when it exists", async () => {
      const created = await service.create({
        name: "Test",
        baseHP: 100,
        baseAttack: 20,
        isBoss: false,
      });

      const found = await service.getById(created.id);
      expect(found).not.toBeNull();
      expect(found?.id).toBe(created.id);
      expect(found?.name).toBe("Test");
    });

    it("returns null when brainrot does not exist", async () => {
      const found = await service.getById("non-existent-id");
      expect(found).toBeNull();
    });
  });

  describe("update", () => {
    it("updates a brainrot successfully", async () => {
      const created = await service.create({
        name: "Test",
        baseHP: 100,
        baseAttack: 20,
        isBoss: false,
      });

      const updated = await service.update(created.id, {
        name: "Updated",
        baseHP: 150,
        baseAttack: 30,
        isBoss: true,
      });

      expect(updated).not.toBeNull();
      expect(updated?.name).toBe("Updated");
      expect(updated?.baseHP).toBe(150);
      expect(updated?.baseAttack).toBe(30);
      expect(updated?.isBoss).toBe(true);
    });

    it("updates only specific fields", async () => {
      const created = await service.create({
        name: "Test",
        baseHP: 100,
        baseAttack: 20,
        isBoss: false,
      });

      const updated = await service.update(created.id, {
        name: "Test",
        baseHP: 200,
        baseAttack: 20,
        isBoss: false,
      });

      expect(updated?.baseHP).toBe(200);
      expect(updated?.name).toBe("Test");
      expect(updated?.baseAttack).toBe(20);
    });

    it("returns null when updating missing brainrot", async () => {
      const updated = await service.update("missing", {
        name: "Updated",
        baseHP: 150,
        baseAttack: 30,
        isBoss: false,
      });

      expect(updated).toBeNull();
    });

    it("preserves id and createdAt when updating", async () => {
      const created = await service.create({
        name: "Test",
        baseHP: 100,
        baseAttack: 20,
        isBoss: false,
      });

      const updated = await service.update(created.id, {
        name: "Updated",
        baseHP: 150,
        baseAttack: 30,
        isBoss: true,
      });

      expect(updated?.id).toBe(created.id);
      expect(updated?.createdAt).toEqual(created.createdAt);
    });
  });

  describe("delete", () => {
    it("deletes an existing brainrot", async () => {
      const created = await service.create({
        name: "Test",
        baseHP: 100,
        baseAttack: 20,
        isBoss: false,
      });

      const deleted = await service.delete(created.id);
      expect(deleted).toBe(true);

      const found = await service.getById(created.id);
      expect(found).toBeNull();
    });

    it("returns false when deleting non-existent brainrot", async () => {
      const deleted = await service.delete("non-existent-id");
      expect(deleted).toBe(false);
    });

    it("removes brainrot from getAll results", async () => {
      const first = await service.create({
        name: "First",
        baseHP: 100,
        baseAttack: 20,
        isBoss: false,
      });
      const second = await service.create({
        name: "Second",
        baseHP: 150,
        baseAttack: 30,
        isBoss: false,
      });

      await service.delete(first.id);

      const all = await service.getAll();
      expect(all).toHaveLength(1);
      expect(all[0].id).toBe(second.id);
    });
  });
});
