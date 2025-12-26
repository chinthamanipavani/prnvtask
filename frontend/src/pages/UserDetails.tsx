import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const UserDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const confirmBooking = async () => {
    await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...state,
        userDetails: form,
      }),
    });

    navigate("/booking-success");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Details</h2>

      {["name", "phone", "email", "address"].map((field) => (
        <input
          key={field}
          placeholder={field}
          className="border p-2 w-full mb-3"
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        />
      ))}

      <button
        onClick={confirmBooking}
        className="bg-blue-600 text-white w-full py-2 rounded"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default UserDetails;
