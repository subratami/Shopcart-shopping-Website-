import "./App.css";
import {BrowserRouter as Router ,Routes, Route} from "react-router-dom";
import Homepage from './component/homepage';
import Login from "./component/login";
import Header from "./component/header";
import Footer from "./component/footer";
import Signup from "./component/signup";
import Dashboard from './component/dashboard';
import ProtectedRoute from './component/ProtectedRoute';
import { useState } from 'react'
import ProductList from './component/productlist';
import   { CartProvider } from "./component/CartContext";
import CartPage from './component/cart'
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <> 
<CartProvider>
    <Router basename="/Shopcart-shopping-Website-">
    <Header onSearch={setSearchQuery}/>
     <Routes>    
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/search" element={<ProductList searchQuery={searchQuery} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
    <Footer />
    </Router>
</CartProvider>
</>
  );
}

export default App;

