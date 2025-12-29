import React, { useEffect, useState } from "react";

const roles = ["customer", "technician"];

const All: React.FC = () => {
  const [role, setRole] = useState<string>("");

  // Load role only
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setRole(user.role);
    }
  }, []);

  const updateRole = async (newRole: string) => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please login again");
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user._id;

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/users/${userId}/role`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update role");

      // update state + storage
      setRole(newRole);
      user.role = newRole;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", newRole);

      // redirect
      if (newRole === "technician") {
        window.location.href = "/technicians";
      } else {
        window.location.href = "/category";
      }
    } catch (err: any) {
      alert(err.message || "Error updating role");
    }
  };

  if (!role) return null; // prevents early render

  return (
    <select
      className="bg-blue-500 p-2 text-white"
      value={role}
      onChange={(e) => updateRole(e.target.value)}
    >
      {roles.map((r) => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </select>
  );
};

export default All;
