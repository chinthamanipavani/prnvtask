import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const timeSlots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "02:00 - 03:00",
  "03:00 - 04:00",
];

interface BookingState {
  serviceName: string;
  servicePrice: number;
}

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as BookingState | null;

  if (!state) {
    return (
      <p className="text-center mt-10 text-red-500">No service selected</p>
    );
  }

  const { serviceName, servicePrice } = state;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");

  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select date & time slot");
      return;
    }

    if (!userName || !userEmail || !userAddress) {
      alert("Please fill all details");
      return;
    }

    const bookingPayload = {
      serviceName,
      servicePrice, // ✅ dynamic price
      date: selectedDate,
      slot: selectedSlot,

      technicianId: "TECH_001", // ✅ required

      userDetails: {
        name: userName,
        email: userEmail,
        address: userAddress,
        phone: "9999999999",
      },
    };

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      if (!res.ok) {
        throw new Error("Booking failed");
      }

      navigate("/booking-success");
    } catch (error) {
      console.error(error);
      alert("Booking failed. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Book {serviceName}
      </h1>

      {/* DATE */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* TIME SLOT */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select Time Slot</label>
        <div className="grid grid-cols-2 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`border p-2 rounded ${
                selectedSlot === slot ? "bg-green-600 text-white" : "bg-white"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* USER DETAILS */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Address</label>
        <textarea
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* PRICE */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Price</label>
        <input
          type="text"
          value={`₹${servicePrice}`}
          readOnly
          className="w-full border p-2 rounded bg-gray-100 text-green-600 font-semibold"
        />
      </div>

      <button
        onClick={handleBooking}
        className="w-full bg-blue-600 text-white p-2 rounded font-bold"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;
