import React from "react";
import { useCart, type CartItem } from "./CartContext";
import "./cart.css"

const Cart: React.FC = () => {
  const { cart, loading, error, removeFromCart, updateCartItem, clearCart, checkout } = useCart();

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!cart.length) return <div>Your cart is empty.</div>;
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItem(id, newQuantity);
  };

  return (
    <div className="cart-container">
    <div className="cartlist">
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item: CartItem) => {
          const id = item.product_id || item._id; // <-- Add this line
          return (
            <li key={id} style={{ marginBottom: "1em" }}>
              <div>
                <strong>
                  {item.Brand ? item.Brand : ""}&nbsp;&nbsp;{item.Model ? item.Model : ""}&nbsp;&nbsp;{item.Color ? item.Color: ""}
                </strong>
                <br />
                {item.Memory ? item.Memory : ""}&nbsp;&nbsp;{item.Storage ? item.Storage : ""}
                
                </div>
                <div>
                 <span style={{backgroundColor: 'gray', padding: '2px 4px 4px 4px', borderRadius: '4px'}}> <button
                    onClick={() => handleQuantityChange(id, item.quantity - 1)}
                    /*disabled={item.quantity <= 1} */
                    style={{ width: 30, backgroundColor:'black', color:'white' }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateCartItem(id, parseInt(e.target.value)) 
                    }
                    style={{ width: "30px", padding: '1px 4px', textAlign: 'center' }}
                  />
                  <button
                    onClick={() => handleQuantityChange(id, item.quantity + 1)}
                    style={{ width: 30, backgroundColor:'black', color:'white'}}
                  >
                    +
                  </button><br/>
                  </span>
                  <span >
                  <button
                  style={{ marginLeft: "2em", marginTop: "1em" }}
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
      <div className="cart-bottom">
      <button onClick={clearCart} style={{ marginRight: "1em" }}>
        Clear Cart
      </button>
      <button onClick={checkout}>Checkout</button>
      </div>
    </div>
    </div>
  );
};

export default Cart;
{/*import React from "react";
import { useCart,type CartItem } from "./CartContext";
import "./cart.css"

const Cart: React.FC = () => {
  const { cart, loading, error, removeFromCart, updateCartItem, clearCart, checkout } = useCart();

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!cart.length) return <div>Your cart is empty.</div>;
  
  const handleQuantityChange = (_id: string, quantity: number) => {
    if (quantity < 1) return;
    updateCartItem(_id, quantity);
  };

  return (
    <div className="cartlist">
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item: CartItem) => (
          <li key={item._id} style={{ marginBottom: "1em" }}>
            <div>
              <strong>
                {item.Brand ? item.Brand : ""} {item.Model ? item.Model : ""}
              </strong>
              <br />
              <div style={{backgroundColor: 'gray', padding: '4px 8px', borderRadius: '4px'}}>
            <button
             onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
      style={{ width: 30, backgroundColor:'#f4a7a7' }}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item._id, parseInt(e.target.value))
              }
              style={{ width: "30px", padding: '1px 4px', textAlign: 'center' }}
            />
    
            <button
      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
      style={{ width: 30, backgroundColor: '#87df87'}}
    >
      +
    </button>
            </div>
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