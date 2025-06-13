import { useCart } from "../component/CartContext";
import "./cart.css"; // Assuming you have a CSS file for styling
const CartPage = () => {
  const { cart } = useCart();

  return (
    <div className="cartlist">
      <ul>
        {cart.map((item, idx) => (
          <li key={idx}>
            {item.Brand} &nbsp; {item.Model} &nbsp; {item.Color} &nbsp; {item.Memory} &nbsp; {item.Storage}
            {/* Add other fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;