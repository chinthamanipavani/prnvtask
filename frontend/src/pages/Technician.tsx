import React, { useEffect, useState } from "react";

interface Technician {
  _id: string;
  name: string;
  email: string;
  timeSlots: string[];
}

const Technician: React.FC = () => {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Logged-in technician's slots
  const technicianTimeSlots: string[] = JSON.parse(
    localStorage.getItem("technicianTimeSlots") || "[]"
  );

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/technicians");
        const data = await res.json();
        setTechnicians(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  if (loading) return <p>Loading technicians...</p>;
  if (!technicians.length) return <p>No technicians found</p>;

  // ✅ Filter technicians to only show overlapping slots
  const filteredTechnicians = technicians.map((tech) => {
    const commonSlots = tech.timeSlots.filter((slot) =>
      technicianTimeSlots.includes(slot)
    );
    return { ...tech, timeSlots: commonSlots };
  }).filter((tech) => tech.timeSlots.length > 0); // only show if there is at least 1 common slot

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Technicians with Matching Slots</h1>
      <ul className="space-y-3">
        {filteredTechnicians.length === 0 && <p>No matching time slots found.</p>}

        {filteredTechnicians.map((tech) => (
          <li key={tech._id} className="border p-3 rounded">
            <p>
              <strong>Name:</strong> {tech.name}
            </p>
            <p>
              <strong>Email:</strong> {tech.email}
            </p>
            <p>
              <strong>Matching Time Slots:</strong> {tech.timeSlots.join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Technician;
