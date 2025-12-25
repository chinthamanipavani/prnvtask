import { Request, Response } from "express";
import * as express from "express";
import Booking from "../models/Booking";

const router = express.Router();

// CREATE BOOKING
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking successful", booking });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET BOOKINGS FOR TECHNICIAN
router.get("/technician/:techId", async (req, res) => {
  try {
    const bookings = await Booking.find({
      technicianId: req.params.techId,
    });
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
