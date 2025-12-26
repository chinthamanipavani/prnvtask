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

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Technicians</h1>
      <ul className="space-y-3">
        {technicians.map((tech) => (
          <li key={tech._id} className="border p-3 rounded">
            <p>
              <strong>Name:</strong> {tech.name}
            </p>
            <p>
              <strong>Email:</strong> {tech.email}
            </p>
            <p>
              <strong>Time Slots:</strong> {tech.timeSlots.join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Technician;
