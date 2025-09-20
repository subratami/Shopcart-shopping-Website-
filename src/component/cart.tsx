import React, { useState } from "react";
import { useCart, type CartItem } from "./CartContext";
import "./cart.css";
import { CheckoutPage } from "../component/CheckoutPage";
import  type { Product } from "../component/checkout.types"; // You'll need this type

const Cart: React.FC = () => {
  const { cart, loading, error, removeFromCart, updateCartItem, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (loading) return <div className='carterror'><span>⏳ Loading cart...</span></div>;
  if (error) return <div className='carterror' style={{ color: "red" }}>{error}</div>;
  if (!cart.length) return <div className="carterror">😕 Your cart is empty.<br/> &nbsp;Refresh or Add 😕</div>
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItem(id, newQuantity);
  };

  // Transform your cart data to match checkout format
  const transformCartToCheckoutFormat = (): Product[] => {
    return cart.map((item: CartItem) => ({
      id: item._id,
      name: item.Model || 'Product',
      brand: item.Brand || 'Unknown',
      variant: `${item.Color || ''}, ${item.Memory || ''}, ${item.Storage || ''}`.replace(/^,\s*|,\s*$/g, '').trim(),
      price: item["Selling Price"] || 0,
      quantity: item.quantity,
      image: item["Product Photo"] && item["Product Photo"][1] ? item["Product Photo"][1] : ''
    }));
  };

  const handleProceedToCheckout = () => {
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  const handleContinueShopping = () => {
    setShowCheckout(false);
    // Navigate back to shopping or close modal
  };

  // Show checkout page if user clicked checkout
  if (showCheckout) {
    return (
      <CheckoutPage
        cartItems={transformCartToCheckoutFormat()}
        onClose={handleCloseCheckout}
        onContinueShopping={handleContinueShopping}
      />
    );
  }

  // Regular cart display
  return (
    <div className="cart-container">
      <div className="cartlist">
        <h2>Your Cart 🛒</h2>
        <ul className="cart-ul-reset">
          {cart.map((item: CartItem) => {
            const id = item._id;
            return (
              <li key={id} className="cart-li-reset">
                <div className="product-photo">
                  <img src={item["Product Photo"][1]} alt="Product" />
                </div>
                <div className="cart-description">
                  <div className="cart-item-name">
                    <strong>
                      {item.Brand ? item.Brand : ""}&nbsp;&nbsp;
                      {item.Model ? item.Model : ""}&nbsp;&nbsp;
                      {item.Color ? item.Color: ""}
                    </strong>
                    <br />
                    {item.Memory ? item.Memory : ""}&nbsp;&nbsp;
                    {item.Storage ? item.Storage : ""}
                    <br/>
                  </div>
                  <span className="cart-qty-btn"> 
                    <button 
                      className="cart-qty-btn-minus"
                      onClick={() => handleQuantityChange(id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input 
                      className="cart-qty-input"
                      type="text"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartItem(id, parseInt(e.target.value) || 1) 
                      } 
                    />
                    <button 
                      className="cart-qty-btn-plus"
                      onClick={() => handleQuantityChange(id, item.quantity + 1)}
                    >
                      +
                    </button><br/>
                  
                    <button 
                      className="cart-delete-btn"
                      onClick={() => removeFromCart(id)}
                    >
                      Delete
                    </button>
                  </span>
                </div>
                <div>
                  <strong>
                    {item["Selling Price"] ? <>₹{item["Selling Price"].toLocaleString('en-IN')}</> : null}
                  </strong>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="subtotal">
          Subtotal: ₹
          {cart.reduce(
            (sum, item) =>
              sum + (item["Selling Price"] ? item["Selling Price"] * item.quantity : 0),
            0
          ).toLocaleString('en-IN')}
        </div>
        <div className="cart-bottom">
          <button 
            className="cart-clear-btn" 
            onClick={clearCart} 
            style={{ marginRight: "1em" }}
          >
            Clear Cart
          </button>
          <button 
            className="cart-checkout-btn" 
            onClick={handleProceedToCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
