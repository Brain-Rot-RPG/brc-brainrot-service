import { Pool } from "pg";
import { PostgresBrainrotRepository } from "./infrastructure/database/PostgresBrainrotRepository";
import { BrainrotService } from "./application/services/BrainrotService";
import { createApp } from "./infrastructure/http/app";

const PORT = process.env.PORT || 4001;

const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  database: process.env.PGDATABASE || "brc_brainrot",
  user: process.env.PGUSER || "brc_brainrot_user",
  password: process.env.PGPASSWORD || "brc_brainrot_password",
});

const repository = new PostgresBrainrotRepository(pool);
const service = new BrainrotService(repository);
const app = createApp(service);

app.listen(PORT, () => {
  console.log(`Brainrot service listening on port ${PORT}`);
});
