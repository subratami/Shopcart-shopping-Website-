//import * as React from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
// Make sure the file exists as Homepage.tsx or Homepage.jsx in the same folder, or update the path accordingly.
import Homepage from './component/homepage';
import './homepage.css';
import Footer from './/component/footer'
function App() {
  return (
    <>
    
<Homepage />
  <Footer />
</>
  );
}

export default App;

