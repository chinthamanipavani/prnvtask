import express, { Request, Response } from "express";
import Beauty from "../models/Beauty";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const services = await Beauty.find();
  res.json(services);
});

router.post("/", async (req: Request, res: Response) => {
  const service = new Beauty(req.body);
  await service.save();
  res.status(201).json(service);
});

export default router;
