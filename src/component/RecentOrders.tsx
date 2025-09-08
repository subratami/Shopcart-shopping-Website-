// components/RecentOrders.tsx
import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";

interface Order {
  _id: string;
  status: string;
  date: string;
  total: number;
}

const RecentOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await authFetch("https://new-shopping-api.onrender.com/orders/recent", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setOrders(data.recent_orders || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No recent orders found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold">
                <th className="p-3">Order ID</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{order._id}</td>
                  <td
                    className={`p-3 font-medium ${
                      order.status === "Completed"
                        ? "text-green-600"
                        : order.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="p-3">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="p-3">₹{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
