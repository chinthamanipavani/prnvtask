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

// delete


router.delete("/cancel", async (req: Request, res: Response) => {
  try {
    const { serviceName, date, slot, userEmail } = req.body;

    if (!serviceName || !date || !slot || !userEmail) {
      return res.status(400).json({ message: "Missing booking details" });
    }

    // Use nested query for userDetails.email
    const deletedBooking = await Booking.findOneAndDelete({
      serviceName,
      date,
      slot,
      "userDetails.email": userEmail,
    });

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking cancelled successfully" });
  } catch (error: any) {
    console.error("Cancel error:", error);
    res.status(500).json({ error: error.message });
  }
});



export default router;
