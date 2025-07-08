import { createContext, useContext, useState, useEffect,type ReactNode } from "react";
import { authFetch } from "../utils/authFetch";

// --- Types ---
export interface CartItem {
  _id: string;
  Brand?: string;
  Model?: string;
  Color?: string;
  Memory?: string;
  Storage?: string;
  "Selling Price"?:number;
  quantity: number;
  [key: string]: any; // For additional product fields
}

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

// --- Context ---
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};

// --- Provider ---
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Adjust this if your backend is hosted elsewhere
  const API_BASE = "https://shopping-site-api-z8gg.onrender.com"; 

  // --- Fetch Cart ---
  const refreshCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch(`${API_BASE}/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (res.ok) {
        const data: CartItem[] = await res.json();
        setCart(data);
      } else if (res.status === 401) {
        setError("Please log in to view your cart.");
        setCart([]);
      } else {
        setError("Failed to load cart.");
      }
    } catch (err) {
      setError("Network error while loading cart.");
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshCart();
    // Optionally, add a dependency for access_token changes
  }, []);

  // --- Add to Cart ---
  const addToCart = async (productId: string, quantity: number = 1) => {
    setError(null);
    const res = await authFetch(`${API_BASE}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",},
      body: JSON.stringify({ product_id: productId, quantity }),
    });
    if (res.ok) {
      await refreshCart();
    } else if (res.status === 401) {
      setError("Please log in to add items to your cart.");
    } else if (res.status === 404) {
      setError("Product not found.");
    } else {
      setError("Failed to add item to cart.");
    }
  };

  // --- Update Cart Item ---
  const updateCartItem = async (productId: string, quantity: number) => {
    setError(null);
    if (quantity < 1){
      setError("Quantity must be at least 1.");
      return;
    }
    const res = await authFetch(`${API_BASE}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ product_id: productId, quantity }),
    });
    if (res.ok) {
      await refreshCart();
    } else if (res.status === 401) {
      setError("Please log in to update your cart.");
    }else if (res.status === 404) {
    setError("Product not found.");
    } else {
      setError("Failed to update cart item.");
    }
  };

  // --- Remove from Cart ---
  const removeFromCart = async (productId: string) => {
    setError(null);
    const res = await authFetch(`${API_BASE}/cart/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ product_id: productId }),
    });
    if (res.ok) {
      await refreshCart();
    } else if (res.status === 401) {
      setError("Please log in to remove items.");
    } else {
      setError("Failed to remove item from cart.");
    }
  };

  // --- Clear Cart ---
  const clearCart = async () => {
    setError(null);
    const res = await fetch(`${API_BASE}/cart/clear`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    if (res.ok) {
      setCart([]);
    } else if (res.status === 401) {
      setError("Please log in to clear your cart.");
    } else {
      setError("Failed to clear cart.");
    }
  };

  // --- Checkout ---
  const checkout = async () => {
    setError(null);
    const res = await fetch(`${API_BASE}/cart/checkout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    if (res.ok) {
      setCart([]);
    } else if (res.status === 401) {
      setError("Please log in to checkout.");
    } else if (res.status === 400) {
      setError("Your cart is empty.");
    } else {
      setError("Checkout failed.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        checkout,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
