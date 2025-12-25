import React, { useEffect, useState } from "react";
import { Service } from "../types/Service";
import { useNavigate } from "react-router-dom";

const Cat1: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/beauty")
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Beauty & Grooming
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service._id} className="bg-white p-6 rounded shadow text-center">
            <div className="text-5xl">{service.emoji}</div>
            <h2 className="font-semibold mt-2">{service.name}</h2>
            <p className="text-gray-500">{service.desc}</p>
            <p className="font-bold text-green-600 mt-2">
              ₹{service.price}
            </p>

            <button
              className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
              onClick={() =>
                navigate("/booking", {
                  state: {
                    serviceName: service.name,
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
    </div>
  );
};

export default Cat1;
