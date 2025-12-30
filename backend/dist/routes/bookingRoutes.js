"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Booking_1 = __importDefault(require("../models/Booking"));
const router = express_1.default.Router();
// CREATE BOOKING
router.post("/", async (req, res) => {
    try {
        const booking = new Booking_1.default(req.body);
        await booking.save();
        res.status(201).json({ message: "Booking successful", booking });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// GET BOOKINGS FOR TECHNICIAN
router.get("/technician/:techId", async (req, res) => {
    try {
        const bookings = await Booking_1.default.find({
            technicianId: req.params.techId,
        });
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// get all 
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking_1.default.find();
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// delete
router.delete("/cancel", async (req, res) => {
    try {
        const { serviceName, date, slot, userEmail } = req.body;
        if (!serviceName || !date || !slot || !userEmail) {
            return res.status(400).json({ message: "Missing booking details" });
        }
        const deletedBooking = await Booking_1.default.findOneAndDelete({
            serviceName,
            date,
            slot,
            "userDetails.email": userEmail,
        });
        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.json({ message: "Booking cancelled successfully" });
    }
    catch (error) {
        console.error("Cancel error:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
