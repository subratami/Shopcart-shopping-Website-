import "./App.css";
import {BrowserRouter as Router ,Routes, Route} from "react-router-dom";
import Homepage from './component/homepage';
//import Layout from "./component/layout";
import Login from "./component/login";
import Header from "./component/header";
import Footer from "./component/footer";
import Signup from "./component/signup";
import { useState } from 'react'
import ProductList from './component/productlist';
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <> 
    <Router basename="/Shopcart-shopping-Website-">
    <Header onSearch={setSearchQuery}/>
     <Routes>    
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<ProductList searchQuery={searchQuery} />} />
    </Routes>
    <Footer />
    </Router>
</>
  );
}

export default App;

