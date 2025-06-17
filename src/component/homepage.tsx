import banner from "./pexels-fauxels-3183132.jpg";
import Advertisment from "./w69uo7lk.png";
import './homepage.css';
import ShopByCatgories from '../component/ShopByCategories';
function homepage() {
  return (
  <>
  <div className="banner">
  <img className="banner-img" src={banner} alt="Banner Text"/> 
  <img className="banner-Adv" src={Advertisment} alt="banner Add"/>
  <ShopByCatgories />
</div>
    
  </>
  );
  
}
export default homepage;