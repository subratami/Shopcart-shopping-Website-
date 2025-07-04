import React from "react";
import { useCart,type CartItem } from "./CartContext";

const Cart: React.FC = () => {
  const { cart, loading, error, removeFromCart, clearCart, checkout } = useCart();

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!cart.length) return <div>Your cart is empty.</div>;

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item: CartItem) => (
          <li key={item._id} style={{ marginBottom: "1em" }}>
            <div>
              <strong>
                {item.Brand ? item.Brand : ""} {item.Model ? item.Model : ""}
              </strong>
              <br />
              Quantity: {item.quantity}
              <button
                style={{ marginLeft: "1em" }}
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={clearCart} style={{ marginRight: "1em" }}>
        Clear Cart
      </button>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
};

export default Cart;


{/*import { useCart } from "../component/CartContext";
import "./cart.css"; // Assuming you have a CSS file for styling
const CartPage = () => {
  const { cart } = useCart();

  return (
    <div className="cartlist">
      <ul>
        {cart.map((item, idx) => (
          <li key={idx}>
            {item.Brand} &nbsp; {item.Model} &nbsp; {item.Color} &nbsp; {item.Memory} &nbsp; {item.Storage}
            {/* Add other fields as needed 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage; */}