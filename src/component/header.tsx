import facebookLogo from "./facebook logo.png";
import instagramLogo from "./instagram logo.png";
import twitterXLogo from "./twitterX logo.png";
import navlogolight from "./nav logo2 .png";
import navlogodark from "./nav logo3.png";
import personlight from "./person.png";
import persondark from "./person2.png";
import wishlistlight from "./wishlist.png";
import wishlistdark from "./wishlist2.png";
import { useCart } from "../component/CartContext";
import shoppingBaglight from "./shopping-bag.png";
import shoppingBagdark from "./shopping-bag2.png";
import Electronics from "./pexels-fauxels-3183132.jpg";
import {Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import menubar from "./menu-bar.png";
import close from "./close.png"
import { logoutUser } from "../utils/logout.ts";
import finddark from "./magnifying-glass.png";
import findlight from "./magnifying-glass2.png";
import './header.css';
import { useTheme } from "./themeContext"; 
import { MdDarkMode, MdLightMode } from "react-icons/md";

interface HeaderProps {
    onSearch: (query: string) => void;
}
const debouncedSearch = debounce((query: string, onSearch: (query: string) => void) => {
    onSearch(query);
}, 300); // 300ms delay

function Header({ onSearch }: HeaderProps) {
  const { darkMode, toggleDarkMode } = useTheme();
  const [userName, setUserName] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false); 

  useEffect(() => {
    const name = localStorage.getItem("userName");
    setUserName(name);
  }, []);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { cart } = useCart(); // Access cart from CartContext

   const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
       const value = e.target.value;
  setSearch(value);
  debouncedSearch(value, onSearch);

  if (value.trim().length > 0) {
    try {
      const response = await fetch(`https://new-shopping-api.onrender.com/suggestions?q=${value}`);
      const data: string[] = await response.json(); // 👈 TypeScript expects an array of strings
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  } else {
    setSuggestions([]);
    setShowSuggestions(false);
  }
};
   const handleSuggestionClick = (suggestion: string): void => {
    setSearch(suggestion);
    setShowSuggestions(false);
    navigate("/search");
  };
      const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            navigate("/search"); // Navigate to search results page
        }
    };
    /*  collaspible side menu */
     const [isOpen, setIsOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

    const toogleMenu = () => setIsOpen(!isOpen);
    const toogleSubmenu = (menu: string) => {
      setActiveMenu(activeMenu === menu ? null : menu);
      setActiveSubMenu(null); // Reset sub-menu when main menu is toggled
    };
    const toogleInnerSubmenu = (submenu: string) => {
      setActiveSubMenu(activeSubMenu === submenu ? null : submenu);
    };
    const handleLinkClick = () => {
  setIsOpen(false); // close side menu
  setActiveMenu(null); // optionally close submenu
  setActiveSubMenu(null); // optionally close inner submenu
};
const logo = darkMode ? navlogodark : navlogolight;
const person = darkMode ? persondark : personlight;
const wishlist = darkMode ? wishlistdark : wishlistlight;
const shoppingBag = darkMode ? shoppingBagdark : shoppingBaglight;
const find = darkMode ? findlight: finddark;
    return (
        <>
        <header>
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
  <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
    <Link to='/'><img className="logo" src={logo} alt="Shopcart Logo"/></Link>
    <div className="search-wrapper">
    <div className="input-wrapper">
          <input
            type="text"
            className="searchbar"
            placeholder="Search for products, brands and more"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
          />
         {showSuggestions && (
            <ul className="suggestions-list">
              {suggestions.map((item: string, index: number) => (
                <li key={index} onClick={() => handleSuggestionClick(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )} </div>
          <button className="searchbtn"> <img src={find} alt="not_load" /> </button>
        </div>
    <ul className="list"> 
<li className="person"><div className="dropdown">
   <div className="dropbtn"> <Link to="/dashboard"><img src={person} alt="not_load"/>Account<div className="Account-blank"><div className="Acblack-blank"></div></div></Link>
   </div>
<div className="dropdown-content">
{/*
<p className="para1"><small>Signup/Login for best experience</small></p>
*/}
<span style={{paddingTop: "20px"}}>Welcome, {userName || "User"}!</span>
{localStorage.getItem("isLoggedIn") === "true" ? (
  <div className="button">
    <button
      className="btnlink"
      onClick={async () => {
      logoutUser();
      }}
      style={{ width: "100%", height: "40px", background: "gray", border: "none", color: "purple", cursor: "pointer", fontWeight: "bold", paddingTop: "11px", paddingLeft: "15px" }}>
      LOGOUT
    </button>
  </div>
) : (
  <div className="dropdtn">
    <div className="button">
      <div className="btnlink">
        <Link to="/signup">SIGNUP </Link>
      </div>
    </div>
    <span>Or</span>
    <div className="button">
      <div className="btnlink">
        <Link to="./login">&nbsp;LOGIN</Link>
      </div>
    </div>
  </div>
)}
<div className="droplink">
  <Link className="hlink" to="/cart">Cart &nbsp;<span className="cart-count" style={{ color:"purple", fontWeight:'bold'}}>{cart.length}</span></Link>
  <a className="hlink" href="#">Wishlist</a>
  <a className="hlink" href="#">eGift Cards</a>
  <a className="hlink" href="#">Find A Store</a>
  <a className="hlink" href="#">Help & Contact</a>
  <a className="hlink" href="#">FAQ</a>
</div>
</div>
  </div></li>
<li className="Wishlist"> <Link to="/wishlist"><img src={wishlist} alt="not_load"/> Wishlist </Link> </li>
<li className="Shoppingbag"> <Link to="/cart"> <img src={shoppingBag} alt="not_load"/>Cart<span className="cart-count">{cart.length}</span></Link> </li>
</ul>
<button onClick={toggleDarkMode} className="theme-toggle-btn">
          {darkMode ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
        </button>
</nav>
<div className="second">
 <button className="toogle-btn" onClick={toogleMenu}>
 <img src={menubar} className="menubar" alt="not load"/>
 </button>
 <div className={`side-menu ${isOpen ? "open" : ""}`}>
  <button className="closebtn" onClick={handleLinkClick} style={{padding: '5% 48%', backgroundColor: "rgb(142 122 122)"}}> <img src={close} alt="close icon" style={{width: "1.5rem"}}/> </button>
<ul className="menu-list">
 {/* side Menu */}
 <li className="User" style={{ padding:"1rem", textAlignLast: "end"}}>
  {localStorage.getItem("isLoggedIn") === "true" ? (
  <button
      className="btnlink"
      onClick={async () => {
      logoutUser();
      handleLinkClick();
      }}
      style={{width: "20%", height: "40px", background: "gray", border: "none", color: "purple", cursor: "pointer", fontWeight: "bold", paddingTop: "11px", paddingLeft: "15px" }}>
      LOGOUT
    </button>
): (<button
      className="btnlink"
      onClick={async () => {
      logoutUser();
      }}
      style={{ display: "none" }}>
      LOGOUT
    </button>)}
    <button onClick={toggleDarkMode} className="theme-toggle-btn2">
          {darkMode ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
        </button>
    <Link to="/login" onClick={handleLinkClick} style={{textDecoration:"NONE", color: "black"}}> Your Account <img src={person} alt="not support" style={{width:"1.5rem"}}/></Link></li>
  <li>
   <button className="menu-item" onClick={() => toogleSubmenu("electronics")}>
    Consumer Electronics {activeMenu === "electronics" ? "▲" : "▼"}
    </button>
    {activeMenu === "electronics" && (
  <ul className="submenu">
  <li>
    <button onClick={() => toogleInnerSubmenu("smartphones")}>
     Smartphones {activeSubMenu === "smartphones" ? "▲" : "▼"}
    </button>
    {activeSubMenu === "smartphones" && (
   <ul>
  <li><Link to={`/search?brand=Apple`} onClick={handleLinkClick}>Apple</Link></li>
  <li><Link to={`/search?brand=Samsung`} onClick={handleLinkClick}>Samsung</Link></li>
  <li><Link to={`/search?brand=Xiaomi`} onClick={handleLinkClick}>Xiaomi</Link></li>
  <li><Link to={`/search?brand=Oppo`} onClick={handleLinkClick}>Oppo</Link></li>
  <li><Link to={`/search?brand=Vivo`} onClick={handleLinkClick}>Vivo</Link></li>
  <li><Link to={`/search?brand=Realme`} onClick={handleLinkClick}>Realme</Link></li>
  <li><Link to={`/search?brand=Oneplus`} onClick={handleLinkClick}>Oneplus</Link></li>
  <li><Link to={`/search?brand=Honor`} onClick={handleLinkClick}>Honor</Link></li>
  <li><Link to={`/search?brand=Iqoo`} onClick={handleLinkClick}>Iqoo</Link></li>
</ul>
    )}
    </li>
    <li>
    <button onClick={() => toogleInnerSubmenu("tablets")}>
    Tablets {activeSubMenu === "tablets" ? "▲" : "▼"}
    </button>
    {activeSubMenu === "tablets" && (
    <ul className="inner-submenu">
    <li><a href="#"> Apple Ipad Tablet</a></li>
          <li> <a href="#">Samsung Tablet</a></li>
          <li> <a href="#">Xiaomi Tablet</a></li>
          <li> <a href="#">Oppo Tablet</a></li>
          <li> <a href="#">Realme Tablet</a></li>
          <li> <a href="#">Oneplus Tablet</a></li>
          <li> <a href="#">Honor Tablet</a></li>
    </ul>
   )}
  </li>
   <li>
    <button onClick={() => toogleInnerSubmenu("Headphone")}>
    Headphone & Earbuds {activeSubMenu === "Headphone" ? "▲" : "▼"}
    </button>
    {activeSubMenu === "Headphone" && (
    <ul className="inner-submenu">
    <li><a href="#"> Bose</a></li>
          <li> <a href="#">Sony</a></li>
          <li> <a href="#">Apple</a></li>
          <li> <a href="#">Sennheiser</a></li>
          <li> <a href="#">JBL</a></li>
          <li> <a href="#">Beat</a></li>
          <li> <a href="#">Realme</a></li>
          <li> <a href="#">Oneplus</a></li>
          <li> <a href="#">Mi</a></li>
    </ul>
   )}
  </li>
  <li>
    <button onClick={() => toogleInnerSubmenu("smartwatches")}>
    Smartwatches {activeSubMenu === "smartwatches" ? "▲" : "▼"}
    </button>
    {activeSubMenu === "smartwatches" && (
    <ul className="inner-submenu">
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
    </ul>
   )}
  </li>
  <li>
    <button onClick={() => toogleInnerSubmenu("portable speakers")}>
    Portable Speakers {activeSubMenu === "portable speakers" ? "▲" : "▼"}
    </button>
    {activeSubMenu === "portable speakers" && (
    <ul className="inner-submenu">
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
    </ul>
   )}
  </li>
  <li>
    <button onClick={() => toogleInnerSubmenu("digital camera")}>
   Digital Camera {activeSubMenu === "digital camera" ? "▲" : "▼"}
    </button>
    {activeSubMenu === "digital camera" && (
    <ul className="inner-submenu">
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
    </ul>
   )}
  </li>
  </ul>
)}
  </li>

  <li>
   <button className="menu-item" onClick={() => toogleSubmenu("computers")}>
   Computers & Peripherals {activeMenu === "computers" ? "▲" : "▼"}
  </button>
  {activeMenu === "computers" && (
  <ul className="submenu">
  <li>Laptops</li>
  <li>Monitors</li>
  <li>Keyboards</li>
  <li>Mouse</li>
  <li>Graphic Card</li>
  <li>RAM</li>
  <li>Storage Drive</li>
  </ul>
  )}
 </li>
 <li>
   <button className="menu-item" onClick={() => toogleSubmenu("smarthome")}>
   Smart Home Devices {activeMenu === "smarthome" ? "▲" : "▼"}
  </button>
  {activeMenu === "smarthome" && (
  <ul className="submenu">
  <li>Laptops</li>
  <li>Monitors</li>
  <li>Keyboards</li>
  </ul>
  )}
 </li>
 <li>
   <button className="menu-item" onClick={() => toogleSubmenu("DIY")}>
   DIY Components {activeMenu === "DIY" ? "▲" : "▼"}
  </button>
  {activeMenu === "DIY" && (
  <ul className="submenu">
    <li>Laptops</li>
    <li>Monitors</li>
    <li>Keyboards</li>
  </ul>
  )}
 </li>
 <li>
   <button className="menu-item" onClick={() => toogleSubmenu("home appliance")}>
   Home Appliance {activeMenu === "home appliance" ? "▲" : "▼"}
  </button>
  {activeMenu === "home appliance" && (
  <ul className="submenu">
    <li>Refrigerator</li>
    <li>AC</li>
    <li>Oven</li>
    <li>Kitechen Chimeny</li>
  </ul>
  )}
 </li>
  </ul>
  </div>
  {/*main menu*/}
<ul className="second-list"> 
<li><div className="hyperlist"> <a className="hyperlink" href="#"> Consumer Electronics </a><div className="CONSUMER-ELECTRONICS-blank"><div className="black-blank"></div></div>
<div className="electronicslink">
<div className="electronicshlink">
    <div className="Smartphone"> <a href="#">Smartphones<span className="smartphone"><b>&gt;</b></span></a>
      <div className="smartphonelist"><p> Smartphones Brands</p>
        <ul>
  <li><Link to={`/search?brand=Apple`} onClick={handleLinkClick}>Apple</Link></li>
  <li><Link to={`/search?brand=Samsung`} onClick={handleLinkClick}>Samsung</Link></li>
  <li><Link to={`/search?brand=Xiaomi`} onClick={handleLinkClick}>Xiaomi</Link></li>
  <li><Link to={`/search?brand=Oppo`} onClick={handleLinkClick}>Oppo</Link></li>
  <li><Link to={`/search?brand=Vivo`} onClick={handleLinkClick}>Vivo</Link></li>
  <li><Link to={`/search?brand=Realme`} onClick={handleLinkClick}>Realme</Link></li>
  <li><Link to={`/search?brand=Oneplus`} onClick={handleLinkClick}>Oneplus</Link></li>
  <li><Link to={`/search?brand=Honor`} onClick={handleLinkClick}>Honor</Link></li>
  <li><Link to={`/search?brand=Iqoo`} onClick={handleLinkClick}>Iqoo</Link></li>
</ul></div></div>
    <div className="Tablets"> <a href="#"> Tablets <span className="tablets"><b>&gt;</b></span></a>
      <div className="tabletlist"><p>Tablets</p>
        <ul>
          <Link to={`/search?brand=Apple Ipad`} onClick={handleLinkClick}>Apple Ipad</Link>
          <Link to={`/search?brand=Samsung tab`} onClick={handleLinkClick}>Samsung Tablet</Link>
          <Link to={`/search?brand=Mi tab`} onClick={handleLinkClick}>Xiaomi Tablet</Link>
          <Link to={`/search?brand=Oppo tab`} onClick={handleLinkClick}>Oppo Tablet</Link>
          <Link to={`/search?brand=Realme tab`} onClick={handleLinkClick}>Realme Tablet</Link>
          <Link to={`/search?brand=Oneplus tab`} onClick={handleLinkClick}>Oneplus Tablet</Link>
          <Link to={`/search?brand=Honor tab`} onClick={handleLinkClick}>Honor Tablet</Link>
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
        </ul>
        <div className="movelist-blank"></div></div></div>
  

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