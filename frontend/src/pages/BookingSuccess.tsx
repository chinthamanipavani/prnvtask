import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface BookingData {
  serviceName: string;
  price: number;
  date: string;
  slot: string;
  userName: string;
  userEmail: string;
  userAddress: string;
}

const BookingSuccess: React.FC = () => {
  const navigate=useNavigate()
  const storedData = localStorage.getItem("bookingData");

  let booking: BookingData | null = null;

  try {
    booking = storedData ? JSON.parse(storedData) : null;
  } catch {
    booking = null;
  }

  if (!booking) {
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        No booking data found.
      </p>
    );
  }




const handleCancel = async () => {
  if (!booking) return;

  const confirmCancel = window.confirm(
    "Are you sure you want to cancel your booking?"
  );
  if (!confirmCancel) return;

  try {
    await axios.delete(`http://localhost:5000/api/bookings/cancel`, {
      data: {
        serviceName: booking.serviceName,
        date: booking.date,
        slot: booking.slot,
        userEmail: booking.userEmail,
      },
    });

    alert("Booking cancelled successfully.");
    localStorage.removeItem("bookingData");
 navigate("/category")
  } catch (error: any) {
    alert("Failed to cancel booking: " + error.message);
  }
};



  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">
        Booking Successful ✅
      </h1>

      <p className="text-center text-gray-600 mb-6">
        Thank you <strong>{booking.userName}</strong>, your booking has been
        confirmed!
      </p>

      <div className="space-y-3">
        <p>
          <strong>Service:</strong> {booking.serviceName}
        </p>
        <p>
          <strong>Price:</strong> ₹{booking.price}
        </p>
        <p>
          <strong>Date:</strong> {booking.date}
        </p>
        <p>
          <strong>Time Slot:</strong> {booking.slot}
        </p>
        <p>
          <strong>Address:</strong> {booking.userAddress}
        </p>
      </div>
   
    {/* Cancel Button */}
      <button
        onClick={handleCancel}
        className="w-full mt-6 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
      >
        Cancel Booking
      </button>
    </div>
  );
};

export default BookingSuccess;