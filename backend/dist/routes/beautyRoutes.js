"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Beauty_1 = __importDefault(require("../models/Beauty"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    const services = await Beauty_1.default.find();
    res.json(services);
});
router.post("/", async (req, res) => {
    const service = new Beauty_1.default(req.body);
    await service.save();
    res.status(201).json(service);
});
exports.default = router;
