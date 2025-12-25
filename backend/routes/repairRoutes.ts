import { Request, Response } from "express";
import HomeRepair from "../models/Repair";
import * as express from "express";

const router = express.Router();

// GET all repair services
router.get("/", async (req: Request, res: Response) => {
  try {
    const services = await HomeRepair.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
});

// POST new repair service
router.post("/", async (req: Request, res: Response) => {
  try {
    const service = new HomeRepair(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: "Failed to add service" });
  }
});

export default router;
