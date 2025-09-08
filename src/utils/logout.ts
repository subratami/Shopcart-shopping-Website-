import { authFetch } from "./authFetch";
import { toast } from "react-toastify";

export const logoutUser = async (): Promise<void> => {
  const token = localStorage.getItem("access_token");

  try {
    if (token) {
      await authFetch("https://new-shopping-api.onrender.com/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      }
    toast.success("Logged out successfully!");
  } catch (err) {
    console.error("Logout request failed:", err);
    toast.error("Logged out reduest failed!");
    // Silently fail if server is down or token is bad—client will still log out
  }

  // Remove session-related local data
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userName");
  localStorage.removeItem("email");
  
  // Optional: reload or redirect
  window.location.href="/";
};

