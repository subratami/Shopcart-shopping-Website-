import React from "react";
import CollapsibleSection from "./mobilefooter";
import './Footer.css'
function Footer() {
   return(
   <> 
<footer className="footer">
      <div className="footer-data">
        <div>
          <h2>Shopcart</h2>
          <p>Customer Supports: 9834297810</p>
          <p>Hilakandi Road, Silchar 788002</p>
          <p>Shopcart@gmail.com</p>
        </div>
        <div>
          <h3>Top Category</h3>
          <ul>
            <li>Computer & Laptop</li>
            <li>SmartPhone</li>
            <li>Headphone</li>
            <li>Accessories</li>
            <li>Cameras & Photo</li>
            <li>TV & Speakers</li>
          </ul>
        </div>
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li>Shop Product</li>
            <li>Shopping Cart</li>
            <li>Wishlist</li>
            <li>Compare</li>
            <li>Track Order</li>
            <li>Customer Help</li>
          </ul>
        </div>
        <div className='download-app'>
          <h3>Download App</h3>
          <button>Get it now on Google Play</button>
          <button>Get it now on App Store</button>
        </div>
     </div>
     <div className="footer2">
      <CollapsibleSection title="Contact Us">
        <ul>
          <li style={{fontSize:"1rem", fontWeight:"bold"}}>Shopcart</li>
          <li>Customer Supports: 9834297810</li>
          <li>Hilakandi Road, Silchar 788002</li>
          <li>Shopcart@gmail.com</li>
          </ul>
    </CollapsibleSection>

      <CollapsibleSection title="Top Category">
        <ul>
          <li>Computer & Laptop</li>
          <li>SmartPhone</li>
          <li>Headphone</li>
          <li>Accessories</li>
          <li>Cameras & Photo</li>
          <li>TV & Speakers</li>
        </ul>
      </CollapsibleSection>

      <CollapsibleSection title="Quick Links">
        <ul>
          <li>Shop Product</li>
          <li>Shopping Cart</li>
          <li>Wishlist</li>
          <li>Compare</li>
          <li>Track Order</li>
          <li>Customer Help</li>
        </ul>
      </CollapsibleSection>
      <div className='download-app'>
          <h3>Download App</h3>
          <button>Get it now on Google Play</button>
          <button>Get it now on App Store</button>
        </div>
    </div>
</footer>
      </>
   );
}
export default Footer;