"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role, timeSlots } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (role === "technician" && (!timeSlots || timeSlots.length === 0)) {
            return res
                .status(400)
                .json({ message: "Technician must select time slots" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({
            name,
            email,
            password: hashedPassword,
            role,
            timeSlots: role === "technician" ? timeSlots : [],
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Return user data only (no token)
        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                timeSlots: user.timeSlots,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/* ================= GET ALL USERS ================= */
router.get("/users", async (req, res) => {
    try {
        const users = await User_1.default.find().select("-password");
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// PUT /api/auth/users/:id/role
router.put("/users/:id/role", async (req, res) => {
    try {
        const userId = req.params.id;
        const { role } = req.body;
        if (!role) {
            return res.status(400).json({ message: "Role is required" });
        }
        const updatedUser = await User_1.default.findByIdAndUpdate(userId, { role }, { new: true, runValidators: true }).select("-password");
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Role updated successfully", user: updatedUser });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
