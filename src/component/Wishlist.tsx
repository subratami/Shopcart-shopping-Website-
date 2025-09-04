import { useWishlist } from "./WishlistContext";
import "./wishlist.css";

const Wishlist = () => {
  const {
    wishlist,
    loading,
    error,
    removeFromWishlist,
    clearWishlist,
    moveToCart,
  } = useWishlist();

  if (loading) return <div className="wishlist-error">⏳ Loading wishlist...</div>;
  if (error) return <div className="wishlist-error">{error}</div>;

  return (
    <div className="wishlist-container">
      <h2>My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      ) : (
        <>
          <ul className="wishlist-list">
            {wishlist.map((item) => (
              <li key={item._id} className="wishlist-item">
                <div className="wishlist-info">
                  <h3>
                    {item.Brand} {item.Model} {item.Color}
                  </h3>
                  <p>
                    {item.Memory} | {item.Storage}
                  </p>
                  <strong>₹{item["Selling Price"]}</strong>
                </div>

                <div className="wishlist-actions">
                  <button
                    className="move-to-cart-btn"
                    onClick={() => moveToCart(item._id)}
                  >
                    Move to Cart 🛒
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(item._id)}
                  >
                    Remove ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="wishlist-footer">
            <button
              className="clear-wishlist-btn"
              onClick={clearWishlist}
            >
              Clear Wishlist
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
