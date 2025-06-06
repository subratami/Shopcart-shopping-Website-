import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Homepage from './component/homepage';
import Layout from "./component/layout";
import Login from "./component/login";
function App() {
  return (
    <> 
    
<Layout 
children={
<Router>
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/login" element={<Login />} />
  </Routes>
</Router>

} />
</>
  );
}

export default App;

