import "./App.css";
import {BrowserRouter as Router ,Routes, Route} from "react-router-dom";
import Homepage from './component/homepage';
import Login from "./component/login";
import Header from "./component/header";
import Footer from "./component/footer";
import Signup from "./component/signup";
import Dashboard from './component/Dashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import PublicRoute from './utils/PublicRoute';
import { useState,useEffect } from 'react'
import ProductList from './component/productlist';
import   { CartProvider } from "./component/CartContext";
import CartPage from './component/cart';
import { WishlistProvider } from "./component/WishlistContext";
import Wishlist from "./component/Wishlist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./component/themeContext";
import { CheckoutPage } from "./component/CheckoutPage";
function App() {
  const [searchQuery, setSearchQuery] = useState("");
   const [toastPosition, setToastPosition] = useState<"top-right" | "bottom-center">("top-right");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setToastPosition("bottom-center");
      } else {
        setToastPosition("top-right");
      }
    };
    handleResize(); // Set on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <> 
    <ThemeProvider>
<CartProvider>
  <WishlistProvider>
    <Router basename="/Shopcart-shopping-Website-">
    <Header onSearch={setSearchQuery}/>
     <Routes>    
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/search" element={<ProductList searchQuery={searchQuery} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/*<Route path="/orders/:orderId" element={<OrderTrackingPage />} /> */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
    <Footer />
    </Router>
    </WishlistProvider>
</CartProvider>
</ThemeProvider>
<ToastContainer position={toastPosition} autoClose={5000} />
</>
  );
}

export default App;

