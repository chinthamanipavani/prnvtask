import React, { useState, useEffect } from "react";
import { Service } from "../types/Service";
import { useNavigate } from "react-router-dom";

const Cat3: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate=useNavigate()

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/repair"); // matches backend route
        if (!res.ok) throw new Error("Failed to fetch services");
        const data: Service[] = await res.json();
        setServices(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading services...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  if (services.length === 0)
    return <p className="text-center mt-10">No services available.</p>;

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6">
        Maintenance & Repair
      </h1>
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {services.map((service) => (
          <div
            key={service._id || service.name}
            className="bg-white border border-gray-200 rounded-xl w-60 p-6 text-center shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
          >
            <div className="text-5xl mb-4">{service.emoji}</div>
            <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.desc}</p>
            <h2 className="font-semibold mb-4">
              <span>price : </span>
              {service.price}
            </h2>
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

export default Cat3;
