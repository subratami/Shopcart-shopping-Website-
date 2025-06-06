import banner from "./pexels-fauxels-3183132.jpg";
import Advertisment from "./w69uo7lk.png";
import './homepage.css'
function homepage() {
  return (
  <>
  <div className="banner">
  <img className="banner-img" src={banner} alt="Banner Text"/> 
  <img className="banner-Adv" src={Advertisment} alt="banner Add"/>
</div>
    
      </>
  );
  
}
export default homepage;