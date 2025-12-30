"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Repair_1 = __importDefault(require("../models/Repair"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET all repair services
router.get("/", async (req, res) => {
    try {
        const services = await Repair_1.default.find();
        res.json(services);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch services" });
    }
});
// POST new repair service
router.post("/", async (req, res) => {
    try {
        const service = new Repair_1.default(req.body);
        await service.save();
        res.status(201).json(service);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to add service" });
    }
});
exports.default = router;
