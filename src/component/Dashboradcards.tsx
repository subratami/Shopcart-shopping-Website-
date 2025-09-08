// components/DashboardCards.tsx
import { FaShoppingBag, FaClock, FaCheckCircle } from "react-icons/fa";

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
        <FaShoppingBag className="text-blue-500 text-3xl" />
        <div>
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold">154</p>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
        <FaClock className="text-yellow-500 text-3xl" />
        <div>
          <h2 className="text-lg font-semibold">Pending Orders</h2>
          <p className="text-2xl font-bold">05</p>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
        <FaCheckCircle className="text-green-500 text-3xl" />
        <div>
          <h2 className="text-lg font-semibold">Completed Orders</h2>
          <p className="text-2xl font-bold">149</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
