import { Pool } from "pg";
import { PostgresBrainrotRepository } from "../infrastructure/database/PostgresBrainrotRepository";

// Mock pg Pool
jest.mock("pg", () => {
  const mockQuery = jest.fn();
  return {
    Pool: jest.fn(() => ({
      query: mockQuery,
    })),
  };
});

describe("PostgresBrainrotRepository", () => {
  let pool: Pool;
  let repository: PostgresBrainrotRepository;
  let mockQuery: jest.Mock;

  beforeEach(() => {
    pool = new Pool();
    mockQuery = pool.query as jest.Mock;
    mockQuery.mockReset();
    repository = new PostgresBrainrotRepository(pool);
  });

  describe("getAll", () => {
    it("returns all brainrots from database", async () => {
      const mockRows = [
        {
          id: "uuid-1",
          name: "Test1",
          base_hp: 100,
          base_attack: 20,
          created_at: new Date("2026-01-01"),
        },
        {
          id: "uuid-2",
          name: "Test2",
          base_hp: 150,
          base_attack: 30,
          created_at: new Date("2026-01-02"),
        },
      ];

      mockQuery.mockResolvedValueOnce({ rows: mockRows });

      const result = await repository.getAll();

      expect(mockQuery).toHaveBeenCalledWith(
        "SELECT * FROM brainrots ORDER BY created_at DESC"
      );
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: "uuid-1",
        name: "Test1",
        baseHP: 100,
        baseAttack: 20,
        createdAt: new Date("2026-01-01"),
      });
    });

    it("returns empty array when no brainrots exist", async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const result = await repository.getAll();

      expect(result).toEqual([]);
    });
  });

  describe("getById", () => {
    it("returns brainrot when found", async () => {
      const mockRow = {
        id: "uuid-1",
        name: "Test",
        base_hp: 100,
        base_attack: 20,
        created_at: new Date("2026-01-01"),
      };

      mockQuery.mockResolvedValueOnce({ rows: [mockRow], rowCount: 1 });

      const result = await repository.getById("uuid-1");

      expect(mockQuery).toHaveBeenCalledWith(
        "SELECT * FROM brainrots WHERE id = $1",
        ["uuid-1"]
      );
      expect(result).toEqual({
        id: "uuid-1",
        name: "Test",
        baseHP: 100,
        baseAttack: 20,
        createdAt: new Date("2026-01-01"),
      });
    });

    it("returns null when brainrot not found", async () => {
      mockQuery.mockResolvedValueOnce({ rows: [], rowCount: 0 });

      const result = await repository.getById("non-existent");

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("creates a brainrot and returns it", async () => {
      const mockRow = {
        id: "generated-uuid",
        name: "New Brainrot",
        base_hp: 100,
        base_attack: 20,
        created_at: new Date("2026-01-01"),
      };

      mockQuery.mockResolvedValueOnce({ rows: [mockRow] });

      const result = await repository.create({
        name: "New Brainrot",
        baseHP: 100,
        baseAttack: 20,
      });

      expect(mockQuery).toHaveBeenCalledWith(
        "INSERT INTO brainrots (id, name, base_hp, base_attack) VALUES ($1, $2, $3, $4) RETURNING *",
        expect.arrayContaining([
          expect.any(String),
          "New Brainrot",
          100,
          20,
        ])
      );
      expect(result.name).toBe("New Brainrot");
      expect(result.baseHP).toBe(100);
    });
  });

  describe("update", () => {
    it("updates a brainrot and returns it", async () => {
      const mockRow = {
        id: "uuid-1",
        name: "Updated",
        base_hp: 200,
        base_attack: 40,
        created_at: new Date("2026-01-01"),
      };

      mockQuery.mockResolvedValueOnce({ rows: [mockRow], rowCount: 1 });

      const result = await repository.update("uuid-1", {
        name: "Updated",
        baseHP: 200,
        baseAttack: 40,
      });

      expect(mockQuery).toHaveBeenCalledWith(
        "UPDATE brainrots SET name = $2, base_hp = $3, base_attack = $4 WHERE id = $1 RETURNING *",
        ["uuid-1", "Updated", 200, 40]
      );
      expect(result).not.toBeNull();
      expect(result?.name).toBe("Updated");
    });

    it("returns null when brainrot not found", async () => {
      mockQuery.mockResolvedValueOnce({ rows: [], rowCount: 0 });

      const result = await repository.update("non-existent", {
        name: "Updated",
        baseHP: 200,
        baseAttack: 40,
      });

      expect(result).toBeNull();
    });
  });

  describe("delete", () => {
    it("returns true when brainrot is deleted", async () => {
      mockQuery.mockResolvedValueOnce({ rowCount: 1 });

      const result = await repository.delete("uuid-1");

      expect(mockQuery).toHaveBeenCalledWith(
        "DELETE FROM brainrots WHERE id = $1",
        ["uuid-1"]
      );
      expect(result).toBe(true);
    });

    it("returns false when brainrot not found", async () => {
      mockQuery.mockResolvedValueOnce({ rowCount: 0 });

      const result = await repository.delete("non-existent");

      expect(result).toBe(false);
    });

    it("handles null rowCount", async () => {
      mockQuery.mockResolvedValueOnce({ rowCount: null });

      const result = await repository.delete("uuid-1");

      expect(result).toBe(false);
    });
  });
});
