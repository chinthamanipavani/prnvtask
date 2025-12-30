"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const cleaningRoutes_1 = __importDefault(require("./routes/cleaningRoutes"));
const beautyRoutes_1 = __importDefault(require("./routes/beautyRoutes"));
const repairRoutes_1 = __importDefault(require("./routes/repairRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const auth_1 = __importDefault(require("./routes/auth"));
const technicianRoutes_1 = __importDefault(require("./routes/technicianRoutes"));
const email_1 = __importDefault(require("./routes/email"));
const app = (0, express_1.default)();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
// Connect to MongoDB
(0, db_1.default)().then(async () => {
    console.log("MongoDB connected!");
    // Fetch all beauty services and log to console
    try {
        // const cleaningServices = await Cleaning.find();
        // console.log("Cleaning (Home) collection data:");
        // console.log(cleaningServices);
        // const homeRepairServices = await HomeRepair.find();
        // console.log("Home Repair collection data:");
        // console.log(homeRepairServices); 
    }
    catch (err) {
        console.error("Error fetching Beauty services:", err);
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/cleaning", cleaningRoutes_1.default);
app.use("/api/beauty", beautyRoutes_1.default);
app.use("/api/repair", repairRoutes_1.default);
app.use("/api/bookings", bookingRoutes_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/technicians", technicianRoutes_1.default);
app.use("/api/send-email", email_1.default);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
