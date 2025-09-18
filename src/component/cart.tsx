import React from "react";
import { useCart, type CartItem } from "./CartContext";
import "./cart.css"

const Cart: React.FC = () => {
  const { cart, loading, error, removeFromCart, updateCartItem, clearCart, checkout } = useCart();

  if (loading) return <div className='carterror'><span>⏳ Loading cart...</span></div>;
  if (error) return <div className='carterror' style={{ color: "red" }}>{error}</div>;
  if (!cart.length) return <div className="carterror">😕 Your cart is empty.<br/> &nbsp;Refresh or Add 😕</div>
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItem(id, newQuantity);
  };

  return (
    <div className="cart-container">
    <div className="cartlist">
      <h2>Your Cart 🛒</h2>
      <ul className="cart-ul-reset">
        {cart.map((item: CartItem) => {
          const id = item._id; // <-- Add this line
          return (
            <li key={id} className="cart-li-reset">{/*style={{ marginBottom: "0.5em" }} */}
              <div className="product-photo"> {/* style={{display: "block", flexDirection: "column"}} */}
                <img src={item["Product Photo"][1]} alt="Product" /> </div>
                <div className="cart-description">
                  <div className="cart-item-name">
                <strong>
                  {item.Brand ? item.Brand : ""}&nbsp;&nbsp;{item.Model ? item.Model : ""}&nbsp;&nbsp;{item.Color ? item.Color: ""}
                </strong>
                <br />
                {item.Memory ? item.Memory : ""}&nbsp;&nbsp;{item.Storage ? item.Storage : ""}
                <br/>
                </div>
                 <span className="cart-qty-btn"> 
                  <button className="cart-qty-btn-minus"
                    onClick={() => handleQuantityChange(id, item.quantity - 1)}>
                    -
                  </button>
                  <input className="cart-qty-input"
                    type="text"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateCartItem(id, parseInt(e.target.value)) 
                    } />
                  <button className="cart-qty-btn-plus"
                    onClick={() => handleQuantityChange(id, item.quantity + 1)}>
                    +
                  </button><br/>
                
                  <button className="cart-delete-btn"
                  onClick={() => removeFromCart(id)}
                >
                  Delete
                </button>
                </span>
                </div>
                <div>
                <strong>
                {item["Selling Price"] ? <>₹{item["Selling Price"]}</> : null}
               </strong>
              </div>
            </li>
          );
        })}
      </ul>
      <div  className="subtotal">
  Subtotal: ₹
  {cart.reduce(
    (sum, item) =>
      sum + (item["Selling Price"] ? item["Selling Price"] * item.quantity : 0),
    0
  )}
</div>
      <div className="cart-bottom">
      <button className="cart-clear-btn" onClick={clearCart} style={{ marginRight: "1em" }}>
        Clear Cart
      </button>
      <button className="cart-checkout-btn" onClick={checkout}>Checkout</button>
      </div>
    </div>
    </div>
  );
};

export default Cart;
