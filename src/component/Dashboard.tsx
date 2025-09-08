// pages/Dashboard.tsx
import Sidebar from "../component/Sidebar";
import DashboardCards from "../component/Dashboradcards";
import PaymentCards from "../component/PaymentCards";
import RecentOrders from "../component/RecentOrders";
import BrowsingHistory from "../component/BrowsingHistory";
import { useEffect } from "react";
import { authFetch } from "../utils/authFetch";

const Dashboard = () => {
  useEffect(() => {
    const fetchProtectedData = async () => {
      const res = await authFetch('https://new-shopping-api.onrender.com/auth/protected');
      const data = await res.json();
      console.log("Protected response:", data);
      // You can also store this in state to show in the UI
    };

    fetchProtectedData();
  }, []);
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Top Heading */}
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        {/* Dashboard Cards */}
        <DashboardCards />

        {/* Payment Cards */}
        <PaymentCards />

        {/* Recent Orders */}
        <RecentOrders />

        {/* Browsing History */}
        <BrowsingHistory />
      </div>
    </div>
  );
};

export default Dashboard;
