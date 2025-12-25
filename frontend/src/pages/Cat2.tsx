import React, { useState, useEffect } from "react";
import { Service } from "../types/Service";
import { useNavigate } from "react-router-dom";

const Cat2: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cleaning");
        if (!res.ok) throw new Error("Failed to fetch services");
        const data: Service[] = await res.json();
        setServices(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading services...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6">
        Home Cleaning
      </h1>

      <div className="flex flex-wrap justify-center gap-6 p-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white border rounded-xl w-60 p-6 text-center shadow"
          >
            <div className="text-5xl mb-4">{service.emoji}</div>

            <h3 className="text-lg font-semibold mb-2">
              {service.name}
            </h3>

            <p className="text-gray-600 mb-4">
              {service.desc}
            </p>
             <h2 className="font-semibold mb-4">
              <span>price : </span>{service.price}
            </h2>

            {/* ✅ IMPORTANT PART */}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() =>
                navigate("/booking", {
                  state: {
                    serviceName: service.name, // 👈 only clicked service
                    servicePrice: service.price,
                  },
                })
              }
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cat2;
