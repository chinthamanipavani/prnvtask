import * as express from "express";
import User from "../models/User";
import Booking from "../models/Booking";

const router = express.Router();

// ✅ GET ALL TECHNICIANS (Customer page)
router.get("/", async (req, res) => {
  try {
    const technicians = await User.find(
      { role: "technician" },
      { password: 0 }
    );
    res.json(technicians);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ TECHNICIAN DASHBOARD
router.get("/:techId/dashboard", async (req, res) => {
  try {
    const technician = await User.findById(req.params.techId);

    if (!technician || technician.role !== "technician") {
      return res.status(404).json({ message: "Technician not found" });
    }

    const bookings = await Booking.find({
      slot: { $in: technician.timeSlots },
    });

    res.json({ bookings });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ADD THIS API BELOW EXISTING ROUTES

// ✅ GET AVAILABLE TECHNICIANS BY SLOT
router.get("/available", async (req, res) => {
  try {
    const { slot } = req.query;

    if (!slot) {
      return res.status(400).json({ message: "Slot is required" });
    }

    // find booked technicians for that slot
    const bookedTechIds = await Booking.find({ slot })
      .distinct("technicianId");

    // available technicians
    const technicians = await User.find({
      role: "technician",
      timeSlots: slot,
      _id: { $nin: bookedTechIds },
    }).select("-password");

    res.json(technicians);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
