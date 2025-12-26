
import * as dotenv from "dotenv";
dotenv.config();


import * as express from "express";
import * as cors from "cors";
import connectDB from "./config/db";


import cleaningRoutes from "./routes/cleaningRoutes";
import beautyRoutes from "./routes/beautyRoutes";
import homeRepairRoutes from "./routes/repairRoutes";
import bookingRoutes from "./routes/bookingRoutes"
import authRoutes from "./routes/auth";
import technicianRoutes from "./routes/technicianRoutes";
import sendEmailRoutes from "./routes/email"


import Cleaning from "./models/Cleaning"; 
import Beauty from "./models/Beauty";
import HomeRepair from "./models/Repair"; 

const app = express();


console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
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

app.use(cors());

app.use(express.json());

app.use("/api/cleaning", cleaningRoutes);
app.use("/api/beauty", beautyRoutes);
app.use("/api/repair", homeRepairRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/technicians", technicianRoutes);
app.use("/api/send-email", sendEmailRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
