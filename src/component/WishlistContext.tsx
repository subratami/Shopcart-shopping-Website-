import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { authFetch } from "../utils/authFetch";
import { useCart } from "./CartContext";

export interface WishlistItem {
  _id: string;
  Brand?: string;
  Model?: string;
  Color?: string;
  Memory?: string;
  Storage?: string;
  "Selling Price"?: number;
  [key: string]: any;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  loading: boolean;
  error: string | null;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  clearWishlist: () => Promise<void>;
  refreshWishlist: () => Promise<void>;
  moveToCart: (productId: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = "https://new-shopping-api.onrender.com";
  const { addToCart } = useCart();

  // --- Fetch Wishlist ---
  const refreshWishlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch(`${API_BASE}/wishlist`);
      if (res.ok) {
        const data: WishlistItem[] = await res.json();
        setWishlist(data);
      } else if (res.status === 401) {
        setWishlist([]);
        setError("Please log in to view your wishlist.");
      } else {
        setError("Failed to load wishlist.");
      }
    } catch {
      setError("Network error while loading wishlist.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      refreshWishlist();
    } else {
      setLoading(false);
    }
  }, []);

  // --- Add to Wishlist ---
  const addToWishlist = async (productId: string) => {
    setError(null);
    const res = await authFetch(`${API_BASE}/wishlist/add`, {
      method: "POST",
      body: JSON.stringify({ product_id: productId }),
    });

    if (res.ok) {
      await refreshWishlist();
    } else if (res.status === 401) {
      setError("Please log in to add items to your wishlist.");
    } else {
      setError("Failed to add item to wishlist.");
    }
  };

  // --- Remove from Wishlist ---
  const removeFromWishlist = async (productId: string) => {
    setError(null);
    const res = await authFetch(`${API_BASE}/wishlist/remove`, {
      method: "POST",
      body: JSON.stringify({ product_id: productId }),
    });

    if (res.ok) {
      await refreshWishlist();
    } else if (res.status === 401) {
      setError("Please log in to remove items from your wishlist.");
    } else {
      setError("Failed to remove item.");
    }
  };

  // --- Clear Wishlist ---
  const clearWishlist = async () => {
    setError(null);
    const res = await authFetch(`${API_BASE}/wishlist/clear`, {
      method: "POST",
    });

    if (res.ok) {
      setWishlist([]);
    } else {
      setError("Failed to clear wishlist.");
    }
  };

  // --- Move Product to Cart ---
  const moveToCart = async (productId: string) => {
    await addToCart(productId, 1);
    await removeFromWishlist(productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        error,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        refreshWishlist,
        moveToCart,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
