import * as express from "express";
import * as cors from "cors";
import connectDB from "./config/db";

import cleaningRoutes from "./routes/cleaningRoutes";
import beautyRoutes from "./routes/beautyRoutes";
import homeRepairRoutes from "./routes/repairRoutes";
import bookingRoutes from "./routes/bookingRoutes"
import authRoutes from "./routes/auth";
import technicianRoutes from "./routes/technicianRoutes";


import Cleaning from "./models/Cleaning"; // ✅ Import Cleaning
import Beauty from "./models/Beauty";
import HomeRepair from "./models/Repair"; 

const app = express();

// Connect to MongoDB
connectDB().then(async () => {
  console.log("MongoDB connected!");

  // Fetch all beauty services and log to console
  try {
    // const cleaningServices = await Cleaning.find();
    // console.log("Cleaning (Home) collection data:");
    // console.log(cleaningServices);

    // const homeRepairServices = await HomeRepair.find();
    // console.log("Home Repair collection data:");
    // console.log(homeRepairServices); 

  } catch (err) {
    console.error("Error fetching Beauty services:", err);
  }
});

// Enable CORS for all origins
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Routes
app.use("/api/cleaning", cleaningRoutes);
app.use("/api/beauty", beautyRoutes);
app.use("/api/repair", homeRepairRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/technicians", technicianRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
