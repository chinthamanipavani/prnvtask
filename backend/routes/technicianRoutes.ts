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

export default router;
