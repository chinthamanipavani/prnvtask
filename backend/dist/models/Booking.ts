import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
