"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    serviceName: String,
    servicePrice: Number,
    date: String,
    slot: String,
    userDetails: {
        name: String,
        phone: String,
        email: String,
        address: String,
    },
    technicianId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "BOOKED",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Booking", bookingSchema);
