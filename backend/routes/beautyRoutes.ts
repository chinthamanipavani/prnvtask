import { Request, Response } from "express";
import Beauty from "../models/Beauty";
import * as express from "express";

const router = express.Router();

// GET all beauty services
router.get("/", async (req: Request, res: Response) => {
  const services = await Beauty.find();
  res.json(services);
});

// POST new beauty service
router.post("/", async (req: Request, res: Response) => {
  const service = new Beauty(req.body);
  await service.save();
  res.status(201).json(service);
});

export default router;
