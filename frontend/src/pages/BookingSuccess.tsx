import React from "react";

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
    </div>
  );
};

export default BookingSuccess;
