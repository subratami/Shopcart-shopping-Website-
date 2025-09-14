import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../component/CartContext";
import { useWishlist } from "../component/WishlistContext";
import "./productlist.css";
/*import { param } from "framer-motion/client";
import { set } from "lodash";*/

interface ProductListProps {
  searchQuery: string;
}

interface Product {
  _id: string;
  Brand: string;
  Model: string;
  "Selling Price": number;
  "Original Price": number;
  Color: string;
  Memory: string;
  Storage: string;
  Rating: number;
}

const BRANDS = ["Apple", "Samsung", "Realme", "Xiaomi"];
const PRICE_RANGES = [
  { label: "Below ₹10,000", min: 0, max: 10000 },
  { label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
  { label: "₹20,000 - ₹40,000", min: 20000, max: 40000 },
  { label: "Above ₹40,000", min: 40000, max: Infinity },
];
const STORAGES = ["32 GB", "64 GB", "128 GB", "256 GB"];
const RAMS = ["2 GB", "4 GB", "6 GB", "8 GB"];

const ProductList = ({ searchQuery }: ProductListProps) => {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState<Product[]>([]);
  const [, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(-1);
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(window.innerWidth >= 900);
  const [sortBy, setSortBy] = useState<"" | "price" | "rating">("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");



  useEffect(() => {
    const handleResize = () => setIsFilterOpen(window.innerWidth >= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
  const brandFromQuery = params.get("brand");
    setSelectedBrand(brandFromQuery || "");
  }, [location.search]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedBrand, selectedPrice, selectedStorage, selectedRam]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append("brand", searchQuery);
      if (selectedBrand) params.append("brand", selectedBrand);
      if (selectedStorage) params.append("storage", selectedStorage);
      if (selectedRam) params.append("memory", selectedRam);
     
      if (selectedPrice !== -1) {
        params.append("min_price", PRICE_RANGES[selectedPrice].min.toString());
        if (PRICE_RANGES[selectedPrice].max !== Infinity){
        params.append("max_price", PRICE_RANGES[selectedPrice].max.toString());
      }
    }
      if (sortBy) params.append("sort_by", sortBy);
      params.append("order", order);


      params.append("page", String(page));
      params.append("limit", "20");

      try {
        const res = await fetch(`https://new-shopping-api.onrender.com/search?${params.toString()}`);
        const data = await res.json();
        setProducts(data.products || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, selectedBrand, selectedPrice, selectedStorage, selectedRam, page, order, sortBy]);
         
  return (
    <>
      <div className="sort" style={{ display: "flex", gap: 8 }}>
        <label>
          sort:
          <select value={sortBy} onChange={e => setSortBy(e.target.value as "" | "price" | "rating" | "")}>
            <option value="">None</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </label>
        <label>
          order:
          <select value={order} onChange={e => setOrder(e.target.value as "asc" | "desc")}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <div className="productlist-wrapper" style={{ display: "flex" }}>
        <button className="filter-toggle-btn" onClick={() => setIsFilterOpen((prev) => !prev)}>
        </button>
{isFilterOpen && ( 
  <aside className="filter-panel" style={{ width: 220, padding: 16 }}>
     <h4>Filter By</h4> 
     <div> 
      <strong>Brand</strong> 
      {BRANDS.map((brand) => ( 
        <label key={brand}> 
        <input type="checkbox" 
        name="brand" 
        checked={selectedBrand === brand}
         onChange={() => { setSelectedBrand(prev => prev === brand ? "" : brand); setPage(1);

          }} 
          /> 
          {brand} 
          </label> 
        ))} 
          </div> <div style={{ marginTop: 12 }}> 
            <strong>Price</strong> {PRICE_RANGES.map((range, idx) => ( <label key={range.label}>
               <input type="checkbox" name="price" checked={selectedPrice === idx} onChange={() => setSelectedPrice(prev => prev === idx ? -1 : idx)} /> 
               {range.label} </label> 
              ))} 
                 </div> <div style={{ marginTop: 12 }}>
                   <strong>Storage</strong> {STORAGES.map((s) => ( <label key={s}> 
                    <input type="checkbox" name="storage" checked={selectedStorage === s} onChange={() => setSelectedStorage(prev => prev === s ? "" : s)} /> {s} </label>
                     ))} 
                      </div> <div style={{ marginTop: 12 }}> 
                        <strong>RAM</strong> {RAMS.map((r) => ( <label key={r}> <input type="checkbox" name="ram" checked={selectedRam === r} onChange={() => setSelectedRam(prev => prev === r ? "" : r)} /> {r} </label>
                       ))} 
                        </div> 
                        </aside> 
                      )}
        <div className="productlist-container" style={{ flex: 1 }}>
          {loading ? (
            <div className="producterror">
              <span>⏳ Loading Products...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="producterror">
              <span>😕 No products found.</span>
            </div>
          ) : (
            <ul className="product-list">
              {products.map((product) => {
               const isInWishlist = wishlist.some((item) => item._id === product._id);
                return (
                  <li key={product._id}>
                    <div
                      className="product-item"
                      onClick={() => navigate(`/product/${product._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {product.Brand} {product.Model} {product.Color} <br />
                      {product.Memory} {product.Storage} <br />
                      ₹{product["Selling Price"]}{" "}
                      <del>₹{product["Original Price"]}</del> <br />
                      Rating: {product.Rating}
                    </div>

                    {/* Add to Cart */}
                    <button className="add-to-cart" onClick={() => addToCart(product._id, 1)}>
                      Add to Cart
                    </button>

                    {/* Add to Wishlist */}
                    <button
                      className={`add-to-wishlist ${isInWishlist ? "disabled" : ""}`}
                      onClick={() => addToWishlist(product._id)}
                      disabled={isInWishlist}
                    >
                      {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                    </button>  
                  </li>
                );
              })}
            </ul>
          )}
          {/* Pagination */} 
          {products.length > 0 && (
             <div style={{ marginTop: "1.5rem", textAlign: "center" 
        }}> 
        <button style={{padding: "5px"}} disabled={page <= 1} onClick={() => 
          setPage(page - 1)}> 
          ⬅️ Prev 
          </button>
           <span style={{ margin: "0 1rem" }}>Page {page}
            </span>
             <button style={{padding: "5px"}} onClick={() => setPage(page + 1)}>Next ➡️</button> 
             </div>
             )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
