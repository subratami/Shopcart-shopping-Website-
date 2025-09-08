// components/BrowsingHistory.tsx
import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";

interface Product {
  _id: string;
  Brand: string;
  Model: string;
  price: number;
  image: string;
  rating: number;
}

const BrowsingHistory = () => {
  const [history, setHistory] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await authFetch("https://new-shopping-api.onrender.com/history", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setHistory(data.history || []);
      } catch (error) {
        console.error("Failed to fetch browsing history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Browsing History</h2>
      {loading ? (
        <p>Loading history...</p>
      ) : history.length === 0 ? (
        <p className="text-gray-500">No browsing history found</p>
      ) : (
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400">
          {history.map((product) => (
            <div
              key={product._id}
              className="min-w-[180px] bg-white rounded-lg shadow p-4 hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.Model}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="font-semibold text-sm mt-2">
                {product.Brand} {product.Model}
              </h3>
              <p className="text-blue-600 font-bold">₹{product.price}</p>
              <p className="text-yellow-500 text-sm">⭐ {product.rating}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowsingHistory;
