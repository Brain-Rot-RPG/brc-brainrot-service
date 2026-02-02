import express, { Express } from "express";
import { BrainrotService } from "../../application/services/BrainrotService";
import { createBrainrotRouter } from "./brainrotRoutes";

export const createApp = (service: BrainrotService): Express => {
  const app = express();
  app.use(express.json());
  app.use("/api/v1", createBrainrotRouter(service));
  return app;
};
