import facebookLogo from "./facebook logo.png";
import instagramLogo from "./instagram logo.png";
import twitterXLogo from "./twitterX logo.png";
import navLogo from "./nav logo.png";
import person from "./person.png";
import wishlist from "./wishlist.png";
import shoppingBag from "./shopping-bag.png";
import Electronics from "./pexels-fauxels-3183132.jpg";
import {Link} from "react-router-dom";
//import Homepage from './homepage';
//import Login from "./login";
import './header.css';

const Header = () =>  {
    return (
        <><header>
       <span className="topleft">*Free Shipping Across India</span>
       <ul className="topright">
        <li>Follow us:</li>
         <li><img className="facebook" src={facebookLogo} alt="not support"/></li> 
             <li><img className="instagram" src={instagramLogo}alt="not support"/></li>
             <li><img className="twitterX" src={twitterXLogo} alt="not support"/></li>
            <li>Email: Shopcart@gmail.com &nbsp; &nbsp;</li>
            <li>Call: +91 1234567890 &nbsp; &nbsp;</li>
            <li>Location: India</li>
         
       </ul>
    </header>
  <nav>
    <Link to='/'><img className="logo" src={navLogo} alt="Shopcart Logo"/></Link>
    <input type="text" placeholder="Search for products, brands and more" className="searchbar"/>
    <ul className="list"> 
<li><div className="dropdown">
   <div className="dropbtn"> <a href="#"><img src={person} alt="not_load"/>Account<div className="Account-blank"><div className="Acblack-blank"></div></div></a>
   </div>
    <div className="dropdown-content">
<p className="para1"><small>Signup/Login for best experience</small></p>
<div className="dropdtn"><div className="button"><div className="btnlink"><a href="#">SIGNUP </a></div></div> <span>Or</span> <div className="button"><div className="btnlink"> <Link to="./Login">&nbsp;LOGIN</Link></div></div></div>
      <div className="droplink">
    <a className="hlink" href="#">Wishlist</a>
      <a className="hlink" href="#">eGift Cards</a>
      <a className="hlink" href="#">Find A Store</a>
    <a className="hlink" href="#">Help & Contact</a>
    <a className="hlink" href="#">FAQ</a></div> 
    </div>
  </div></li>
<li> <a href="#"><img src={wishlist} alt="not_load"/> Wishlist </a> </li>
<li> <a href="#"> <img src={shoppingBag} alt="not_load"/>Cart </a> </li>
</ul>
</nav>
<div className="second">
<ul> 
<li><div className="hyperlist"> <a className="hyperlink" href="#"> Consumer Electronics </a><div className="CONSUMER-ELECTRONICS-blank"><div className="black-blank"></div></div>
<div className="electronicslink">
<div className="electronicshlink">
   
    <div className="Smartphone"> <a href="#">Smartphones<span className="smartphone"><b>&gt;</b></span></a>
      <div className="smartphonelist"><p> Smartphones Brands</p>
        <ul>
          <li><a href="#"> Apple</a></li>
        <li> <a href="#">Samsung</a></li>
        <li> <a href="#">Xiaomi</a></li>
        <li> <a href="#">Oppo</a></li>
        <li> <a href="#">Vivo</a></li>
        <li> <a href="#">Oppo</a></li>
        <li> <a href="#">Realme</a></li>
        <li> <a href="#">Oneplus</a></li>
        <li> <a href="#">Honor</a></li>
        <li> <a href="#">Iqoo</a></li>
        </ul></div></div>
    <div className="Tablets"> <a href="#"> Tablets <span className="tablets"><b>&gt;</b></span></a>
      <div className="tabletlist"><p>Tablets</p>
        <ul>
          <li><a href="#"> Apple Tablet</a></li>
          <li> <a href="#">Samsung Tablet</a></li>
          <li> <a href="#">Xiaomi Tablet</a></li>
          <li> <a href="#">Oppo Tablet</a></li>
          <li> <a href="#">Realme Tablet</a></li>
          <li> <a href="#">Oneplus Tablet</a></li>
          <li> <a href="#">Honor Tablet</a></li>
        </ul></div></div>
    <div className="Headphone"> <a href="#">Headphone & Earbuds <span className="headphone"><b>&gt;</b></span></a>
      <div className="headphonelist"><p> Headphone & Earbuds</p>
        <ul>
          <li><a href="#"> Bose</a></li>
          <li> <a href="#">Sony</a></li>
          <li> <a href="#">Apple</a></li>
          <li> <a href="#">Sennheiser</a></li>
          <li> <a href="#">JBL</a></li>
          <li> <a href="#">Beat</a></li>
          <li> <a href="#">Realme</a></li>
          <li> <a href="#">Oneplus</a></li>
          <li> <a href="#">Mi</a></li>
        </ul></div></div>
    <div className="Smartwatch"> <a href="#">Smartwatches <span className="smartwatch"><b>&gt;</b></span></a>
      <div className="Smartwatchlist"><p>Smartwatches Brand</p>
        <ul>
          <li><a href="#">Samsung Galaxy watch</a></li>
          <li> <a href="#">Apple Watch</a></li>
          <li> <a href="#">Huawei Smartwatch</a></li>
          <li> <a href="#">Amazfit Smartwatch</a></li>
          <li> <a href="#">Oneplus watch</a></li>
          <li> <a href="#">Xiaomi watch</a></li>
          <li> <a href="#">Noise Smartwatch</a></li>
          <li> <a href="#">FireBoltt Smartwatch</a></li>
          <li> <a href="#">Boat Smartwatch</a></li>
          <li> <a href="#">FireBoltt Smartwatch</a></li>
          <li> <a href="#">Hammer Smartwatch</a></li>
        </ul></div></div>
    <div className="Portablespeaker"> <a href="#">Portable Speakers <span className="portablespeaker"><b>&gt;</b></span></a>
      <div className="Portablespeakerlist"><p>Portable Speakers</p>
        <ul>
          <li><a href="#">Tribit Speaker</a></li>
          <li> <a href="#">Marshall Speaker</a></li>
          <li> <a href="#">Anker Soundcore Speaker</a></li>
          <li> <a href="#">JBL Speaker</a></li>
          <li> <a href="#">Harman Kardon Speaker</a></li>
          <li> <a href="#">Bose Speaker</a></li>
          <li> <a href="#">Noise Speaker</a></li>
          <li> <a href="#">Boat Speaker</a></li>
          <li> <a href="#">Boult Speaker</a></li>
          <li> <a href="#">Mivi Speaker</a></li>
          <li> <a href="#">pTron Speaker</a></li>
        </ul></div></div>
    <div className="Camera"> <a href="#">Digital Camera <span className="camera"><b>&gt;</b></span></a>
      <div className="Cameralist"><p>Digital Camera </p>
        <ul>
          <li><a href="#">Canon</a></li>
        <li> <a href="#">Nikion</a></li>
        <li> <a href="#">Sony</a></li>
        <li> <a href="#">Fujifilm</a></li>
        <li> <a href="#">Panasonic Lumix</a></li>
        <li> <a href="#">Olympus</a></li>
        <li> <a href="#">GoPro</a></li>
        <li> <a href="#">DJI</a></li>
        <li> <a href="#">Insta360</a></li>
        <li> <a href="#">Kodak</a></li>
        <li> <a href="#">Leica</a></li>
        </ul><div className="movelist-blank"></div></div></div>
  

</div>
 <a href="#"><img src={Electronics} alt="not_load"/></a> 
</div>
</div></li>
<li className="Nlist"><div className="hyperlist"> <a className="hyperlink" href="#"> Computers & Peripherals</a><div className="computerlist-blank"><div className="black-blank1"></div></div></div></li>
<li className="Nlist"> <div className="hyperlist"> <a className="hyperlink" href="#"> Smart Home Devices </a><div className="smarthomelist-blank"><div className="black-blank2"></div></div></div></li>
<li className="Nlist"><div className="hyperlist"> <a className="hyperlink" href="#"> DIY Components </a><div className="DIYcomponentlist-blank"><div className="black-blank3"></div></div></div></li>
<li className="Nlist"> <div className="hyperlist"> <a className="hyperlink" href="#"> Home Appliances </a><div className="homeappliancelist-blank"><div className="black-blank4"></div></div></div></li>
</ul>
</div>
</>
    );
};
export default Header;