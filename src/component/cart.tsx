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
            <li key={id} style={{ marginBottom: "0.5em" }}>
              <div style={{display: "block", flexDirection: "column"}}>
                <span style={{width:"100px", height: "100px"}}><img src="#" alt="Product" style={{width:"100px", height: "100px"}} /> </span></div>
                <div>
                <strong>
                  {item.Brand ? item.Brand : ""}&nbsp;&nbsp;{item.Model ? item.Model : ""}&nbsp;&nbsp;{item.Color ? item.Color: ""}
                </strong>
                <br />
                {item.Memory ? item.Memory : ""}&nbsp;&nbsp;{item.Storage ? item.Storage : ""}
                <br/>
                 <span style={{padding: '2px 4px 4px 4px', borderRadius: '4px', display: 'flex', flexDirection: 'row'}}> <button
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
                    style={{ width: "30px", padding: '0px 4px', textAlign: 'center' }}
                  />
                  <button
                    onClick={() => handleQuantityChange(id, item.quantity + 1)}
                    style={{ width: 30, backgroundColor:'black', color:'white'}}
                  >
                    +
                  </button><br/>
                
                  <button
                  style={{ marginLeft: "2em" }}
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
      <div style={{ textAlign: "right", fontWeight: "bold", margin: "1em 0" }}>
  Subtotal: ₹
  {cart.reduce(
    (sum, item) =>
      sum + (item["Selling Price"] ? item["Selling Price"] * item.quantity : 0),
    0
  )}
</div>
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
