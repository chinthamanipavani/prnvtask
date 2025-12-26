import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const slots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "02:00 - 03:00",
  "03:00 - 04:00",
];

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    timeSlots: [] as string[],
  });

  const handleSlotToggle = (slot: string) => {
    setForm((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(slot)
        ? prev.timeSlots.filter((s) => s !== slot)
        : [...prev.timeSlots, slot],
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      // ✅ backend nunchi vachina data
      const user = res.data.user || res.data;

      // ✅ localStorage lo save
      localStorage.setItem("role", user.role);
      // localStorage.setItem("userId", user._id);

      alert("Registered successfully");
      navigate("/login");
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <input
        placeholder="Name"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="customer">Customer</option>
        <option value="technician">Technician</option>
      </select>

      {form.role === "technician" && (
        <div className="mb-4">
          <p className="font-semibold mb-2">Select Time Slot</p>
          {slots.map((slot) => (
            <label key={slot} className="block">
              <input type="checkbox" onChange={() => handleSlotToggle(slot)} />{" "}
              {slot}
            </label>
          ))}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
