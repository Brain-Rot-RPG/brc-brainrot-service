import express, { Express, Request, Response } from "express";
import { Pool, QueryResult } from "pg";
import { v4 as uuidv4 } from "uuid";

const PORT = process.env.PORT || 4001;

interface Brainrot {
  id: string;
  name: string;
  base_hp: number;
  base_attack: number;
  created_at: Date;
}

interface BrainrotInput {
  name: string;
  baseHP: number;
  baseAttack: number;
}

const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  database: process.env.PGDATABASE || "brc_brainrot",
  user: process.env.PGUSER || "brc_brainrot_user",
  password: process.env.PGPASSWORD || "brc_brainrot_password",
});

const app: Express = express();
app.use(express.json());

app.get("/api/v1/brainrot", async (req: Request, res: Response): Promise<void> => {
  try {
    const result: QueryResult<Brainrot> = await pool.query(
      "SELECT * FROM brainrots"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get(
  "/api/v1/brainrot/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result: QueryResult<Brainrot> = await pool.query(
        "SELECT * FROM brainrots WHERE id = $1",
        [id]
      );

      if (result.rowCount === 0) {
        res.status(404).json({ message: "Brainrot not found" });
        return;
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.post("/api/v1/brainrot", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, baseHP, baseAttack } = req.body as BrainrotInput;

    if (!name || baseHP === undefined || baseAttack === undefined) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const id = uuidv4();
    await pool.query(
      "INSERT INTO brainrots (id, name, base_hp, base_attack) VALUES ($1, $2, $3, $4)",
      [id, name, baseHP, baseAttack]
    );

    res.status(201).json({ id, name, baseHP, baseAttack });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put(
  "/api/v1/brainrot/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, baseHP, baseAttack } = req.body as BrainrotInput;

      if (!name || baseHP === undefined || baseAttack === undefined) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const result: QueryResult<Brainrot> = await pool.query(
        "UPDATE brainrots SET name = $2, base_hp = $3, base_attack = $4 WHERE id = $1 RETURNING *",
        [id, name, baseHP, baseAttack]
      );

      if (result.rowCount === 0) {
        res.status(404).json({ message: "Brainrot not found" });
        return;
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.delete(
  "/api/v1/brainrot/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result: QueryResult<Brainrot> = await pool.query(
        "DELETE FROM brainrots WHERE id = $1",
        [id]
      );

      if (result.rowCount === 0) {
        res.status(404).json({ message: "Brainrot not found" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Brainrot service listening on port ${PORT}`);
});
