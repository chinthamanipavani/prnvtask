import { Request, Response } from "express";
import * as express from "express";
import Cleaning from "../models/Cleaning";


const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const services = await Cleaning.find();
  res.json(services);
});

router.post("/", async (req: Request, res: Response) => {
  const service = new Cleaning(req.body);
  await service.save();
  res.status(201).json(service);
});

export default router;
