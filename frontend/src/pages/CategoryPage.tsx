import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Cat1", label: "Beauty & Grooming", path: "/cat1", emoji: "💇‍♀️" },
  { name: "Cat2", label: "Home Cleaning", path: "/cat2", emoji: "🧹" },
  { name: "Cat3", label: "Maintenance & Repair", path: "/cat3", emoji: "🔧" },
];

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-10">
      <h1 className="text-4xl font-bold mb-2 text-center">Technician Booking System</h1>
      <p className="text-gray-600 mb-10 text-center">
        Select a technician category to continue
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(cat.path)}
            className="cursor-pointer bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center hover:scale-105 transform transition duration-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100"
          >
            <div className="text-6xl mb-4">{cat.emoji}</div>
            <h2 className="text-2xl font-semibold mb-2 text-center">{cat.label}</h2>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              Select 
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
