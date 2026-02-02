import { Pool, QueryResult } from "pg";
import { Brainrot, BrainrotInput } from "../../domain/entities/Brainrot";
import { BrainrotRepository } from "../../domain/repositories/BrainrotRepository";
import { v4 as uuidv4 } from "uuid";

interface BrainrotRow {
  id: string;
  name: string;
  base_hp: number;
  base_attack: number;
  is_boss: boolean;
  created_at: Date;
}

export class PostgresBrainrotRepository implements BrainrotRepository {
  constructor(private readonly pool: Pool) {}

  async getAll(): Promise<Brainrot[]> {
    const result: QueryResult<BrainrotRow> = await this.pool.query(
      "SELECT * FROM brainrots ORDER BY created_at DESC"
    );
    return result.rows.map(this.mapRow);
  }

  async getById(id: string): Promise<Brainrot | null> {
    const result: QueryResult<BrainrotRow> = await this.pool.query(
      "SELECT * FROM brainrots WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return null;
    }

    return this.mapRow(result.rows[0]);
  }

  async create(input: BrainrotInput): Promise<Brainrot> {
    const id = uuidv4();
    const isBoss = input.isBoss ?? false;
    const result: QueryResult<BrainrotRow> = await this.pool.query(
      "INSERT INTO brainrots (id, name, base_hp, base_attack, is_boss) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id, input.name, input.baseHP, input.baseAttack, isBoss]
    );

    return this.mapRow(result.rows[0]);
  }

  async update(
    id: string,
    input: BrainrotInput
  ): Promise<Brainrot | null> {
    const isBoss = input.isBoss ?? false;
    const result: QueryResult<BrainrotRow> = await this.pool.query(
      "UPDATE brainrots SET name = $2, base_hp = $3, base_attack = $4, is_boss = $5 WHERE id = $1 RETURNING *",
      [id, input.name, input.baseHP, input.baseAttack, isBoss]
    );

    if (result.rowCount === 0) {
      return null;
    }

    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.pool.query("DELETE FROM brainrots WHERE id = $1", [
      id,
    ]);
    return (result.rowCount ?? 0) > 0;
  }

  private mapRow(row: BrainrotRow): Brainrot {
    return {
      id: row.id,
      name: row.name,
      baseHP: row.base_hp,
      baseAttack: row.base_attack,
      isBoss: row.is_boss,
      createdAt: row.created_at,
    };
  }
}
