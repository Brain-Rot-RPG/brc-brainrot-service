const express = require("express");
const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 4001;

const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  database: process.env.PGDATABASE || "brc_brainrot",
  user: process.env.PGUSER || "brc_brainrot_user",
  password: process.env.PGPASSWORD || "brc_brainrot_password",
});

const app = express();
app.use(express.json());

app.get("/api/v1/brainrot", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM brainrots");
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/v1/brainrot/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM brainrots WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Brainrot not found" });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/brainrot", async (req, res) => {
  try {
    const { name, baseHP, baseAttack } = req.body;

    if (!name || baseHP === undefined || baseAttack === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const id = uuidv4();
    await pool.query(
      "INSERT INTO brainrots (id, name, base_hp, base_attack) VALUES ($1, $2, $3, $4)",
      [id, name, baseHP, baseAttack]
    );

    return res.status(201).json({ id, name, baseHP, baseAttack });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/v1/brainrot/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, baseHP, baseAttack } = req.body;

    if (!name || baseHP === undefined || baseAttack === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await pool.query(
      "UPDATE brainrots SET name = $2, base_hp = $3, base_attack = $4 WHERE id = $1 RETURNING *",
      [id, name, baseHP, baseAttack]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Brainrot not found" });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/v1/brainrot/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM brainrots WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Brainrot not found" });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Brainrot service listening on port ${PORT}`);
});
