import "./App.css";
import {Router ,Routes, Route} from "react-router-dom";
import Homepage from './component/homepage';
//import Layout from "./component/layout";
import Login from "./component/login";
import Header from "./component/header";
import Footer from "./component/footer";
function App() {
  return (
    <> 
    <Header />
     <Routes>    
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
    </Routes>
    <Footer />
</>
  );
}

export default App;

