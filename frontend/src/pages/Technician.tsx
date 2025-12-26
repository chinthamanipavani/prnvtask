import React, { useEffect, useState } from "react";
import axios from "axios";

interface Technician {
  _id: string;
  name: string;
  email: string;
  timeSlots: string[];
}

interface BookingData {
  serviceName: string;
  price: number;
  date: string;
  slot: string;
  userName: string;
  userEmail: string;
  userAddress: string;
}

const Technician: React.FC = () => {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);

  const technicianTimeSlots: string[] = JSON.parse(
    localStorage.getItem("technicianTimeSlots") || "[]"
  );

  const bookingData: BookingData | null = JSON.parse(
    localStorage.getItem("bookingData") || "null"
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

  const filteredTechnicians = technicians.filter(
    (tech) =>
      bookingData &&
      tech.timeSlots.includes(bookingData.slot) &&
      technicianTimeSlots.includes(bookingData.slot)
  );

  const handleSendEmail = async (tech: Technician) => {
    const message = `
Hello ${tech.name},

You have a new booking.

Customer: ${bookingData?.userName}
Slot: ${bookingData?.slot}
Date: ${bookingData?.date}

Please check your dashboard.

Thanks,
Booking App
    `;

    try {
      await axios.post("http://localhost:5000/api/send-email", {
        to: tech.email,
        subject: "New Booking Notification",
        message,
      });
      alert(`Email sent to ${tech.name}`);
    } catch (error) {
      alert("Failed to send email");
    }
  };

  if (loading) return <p>Loading technicians...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Matched Booking Details</h1>

      {!bookingData && <p className="text-red-500">No booking data found</p>}

      {filteredTechnicians.length === 0 && (
        <p>No technician matches this booking slot</p>
      )}

      {filteredTechnicians.map((tech) => (
        <div key={tech._id} className="border p-4 rounded mb-4">
          <h2 className="text-xl font-semibold">{tech.name}</h2>
          <p>
            <strong>Email:</strong> {tech.email}
          </p>

          <div className="mt-3 bg-gray-100 p-3 rounded">
            <p>
              <strong>Customer Name:</strong> {bookingData?.userName}
            </p>
            <p>
              <strong>Address:</strong> {bookingData?.userAddress}
            </p>
            <p>
              <strong>Service:</strong> {bookingData?.serviceName}
            </p>
            <p>
              <strong>Date:</strong> {bookingData?.date}
            </p>
            <p>
              <strong>Slot:</strong> {bookingData?.slot}
            </p>
          </div>

          <button
            className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
            onClick={() => handleSendEmail(tech)}
          >
            Send Email
          </button>
        </div>
      ))}
    </div>
  );
};

export default Technician;
