import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const user = res.data.user || res.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user._id);

      if (user.role === "technician") {
        localStorage.setItem("technicianId", user._id);
        localStorage.setItem(
          "technicianTimeSlots",
          JSON.stringify(user.timeSlots || [])
        );
      }
      console.log("Role:", user.role);
      alert("Login successful");

      if (user.role === "customer") {
        navigate("/category");
      } else if (user.role === "technician") {
        navigate("/technicians");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 w-full mb-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
