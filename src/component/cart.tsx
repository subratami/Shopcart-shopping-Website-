import { useCart } from "../component/CartContext";

const CartPage = () => {
  const { cart } = useCart();

  return (
    <div>
      <h2>Your Cart</h2>
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