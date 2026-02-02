import { Router, Request, Response } from "express";
import { BrainrotService } from "../../application/services/BrainrotService";

export const createBrainrotRouter = (service: BrainrotService): Router => {
  const router = Router();

  router.get("/brainrot", async (_req: Request, res: Response) => {
    try {
      const result = await service.getAll();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.get("/brainrot/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await service.getById(id);

      if (!result) {
        res.status(404).json({ message: "Brainrot not found" });
        return;
      }

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.post("/brainrot", async (req: Request, res: Response) => {
    try {
      const { name, baseHP, baseAttack } = req.body;

      if (!name || baseHP === undefined || baseAttack === undefined) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const result = await service.create({ name, baseHP, baseAttack });
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.put("/brainrot/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, baseHP, baseAttack } = req.body;

      if (!name || baseHP === undefined || baseAttack === undefined) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const result = await service.update(id, { name, baseHP, baseAttack });

      if (!result) {
        res.status(404).json({ message: "Brainrot not found" });
        return;
      }

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.delete("/brainrot/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await service.delete(id);

      if (!deleted) {
        res.status(404).json({ message: "Brainrot not found" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return router;
};
