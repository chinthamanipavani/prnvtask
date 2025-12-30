"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const Booking_1 = __importDefault(require("../models/Booking"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const technicians = await User_1.default.find({ role: "technician" }, { password: 0 });
        res.json(technicians);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/:techId/dashboard", async (req, res) => {
    try {
        const technician = await User_1.default.findById(req.params.techId);
        if (!technician || technician.role !== "technician") {
            return res.status(404).json({ message: "Technician not found" });
        }
        const bookings = await Booking_1.default.find({
            slot: { $in: technician.timeSlots },
        });
        res.json({ bookings });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// ADD THIS API BELOW EXISTING ROUTES
router.get("/available", async (req, res) => {
    try {
        const { slot } = req.query;
        if (!slot) {
            return res.status(400).json({ message: "Slot is required" });
        }
        // find booked technicians for that slot
        const bookedTechIds = await Booking_1.default.find({ slot })
            .distinct("technicianId");
        // available technicians
        const technicians = await User_1.default.find({
            role: "technician",
            timeSlots: slot,
            _id: { $nin: bookedTechIds },
        }).select("-password");
        res.json(technicians);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
