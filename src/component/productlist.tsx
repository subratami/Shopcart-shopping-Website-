import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../component/CartContext";
import { useWishlist } from "../component/WishlistContext";
import "./productlist.css";

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
const STORAGES = ["32GB", "64GB", "128GB", "256GB"];
const RAMS = ["2GB", "4GB", "6GB", "8GB"];

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
  const [sortBy, setSortBy] = useState<string>("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const params = new URLSearchParams(location.search);
  const brandFromQuery = params.get("brand");

  useEffect(() => {
    const handleResize = () => setIsFilterOpen(window.innerWidth >= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (brandFromQuery) setSelectedBrand(brandFromQuery);
  }, [brandFromQuery]);

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
        params.append("max_price", PRICE_RANGES[selectedPrice].max.toString());
      }
      params.append("page", String(page));
      params.append("limit", "20");

      try {
        const res = await fetch(`/search?${params.toString()}`);
        const data = await res.json();
        let filtered: Product[] = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
          ? data.products
          : [];

        filtered = filtered.filter((p: Product) => {
          const priceMatch =
            selectedPrice === -1 ||
            (p["Selling Price"] >= PRICE_RANGES[selectedPrice]?.min &&
              p["Selling Price"] < PRICE_RANGES[selectedPrice]?.max);
          const storageMatch = !selectedStorage || p.Storage === selectedStorage;
          const ramMatch = !selectedRam || p.Memory === selectedRam;
          return priceMatch && storageMatch && ramMatch;
        });

        if (sortBy === "price") {
          filtered = filtered.sort((a: Product, b: Product) =>
            order === "asc"
              ? a["Selling Price"] - b["Selling Price"]
              : b["Selling Price"] - a["Selling Price"]
          );
        } else if (sortBy === "rating") {
          filtered = filtered.sort((a: Product, b: Product) =>
            order === "asc" ? a.Rating - b.Rating : b.Rating - a.Rating
          );
        }

        setProducts(filtered);
        setTotal(filtered.length);
      } catch (err) {
        console.error("Error loading products:", err);
        setProducts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, selectedBrand, selectedPrice, selectedStorage, selectedRam, page]);

  return (
    <>
      <div className="sort" style={{ display: "flex", gap: 8 }}>
        <label>
          Sort:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </label>
        <label>
          Order:
          <select value={order} onChange={(e) => setOrder(e.target.value as "asc" | "desc")}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <div className="productlist-wrapper" style={{ display: "flex" }}>
        <button className="filter-toggle-btn" onClick={() => setIsFilterOpen((prev) => !prev)}>
          {isFilterOpen ? "Filters" : "Filters"}
        </button>
{isFilterOpen && ( 
  <aside className="filter-panel" style={{ width: 220, padding: 16 }}>
     <h4>Filter By</h4> 
     <div> 
      <strong>Brand</strong> 
      {BRANDS.map((brand) => ( 
        <label key={brand}> 
        <input type="radio" 
        name="brand" 
        checked={selectedBrand === brand}
         onChange={() => { setSelectedBrand(brand); setPage(1);

          }} 
          /> 
          {brand} 
          </label> 
        ))} 
        <label> 
          <input type="radio" name="brand" checked={selectedBrand === ""} 
          onChange={() => { setSelectedBrand(""); setPage(1); }} /> All </label> 
          </div> <div style={{ marginTop: 12 }}> 
            <strong>Price</strong> {PRICE_RANGES.map((range, idx) => ( <label key={range.label}>
               <input type="radio" name="price" checked={selectedPrice === idx} onChange={() => setSelectedPrice(idx)} /> 
               {range.label} </label> 
              ))} 
               <label> 
                <input type="radio" name="price" checked={selectedPrice === -1} onChange={() => setSelectedPrice(-1)} /> All </label>
                 </div> <div style={{ marginTop: 12 }}>
                   <strong>Storage</strong> {STORAGES.map((s) => ( <label key={s}> 
                    <input type="radio" name="storage" checked={selectedStorage === s} onChange={() => setSelectedStorage(s)} /> {s} </label>
                     ))} 
                     <label> 
                      <input type="radio" name="storage" checked={selectedStorage === ""} onChange={() => setSelectedStorage("")} /> All </label> 
                      </div> <div style={{ marginTop: 12 }}> 
                        <strong>RAM</strong> {RAMS.map((r) => ( <label key={r}> <input type="radio" name="ram" checked={selectedRam === r} onChange={() => setSelectedRam(r)} /> {r} </label>
                       ))} 
                       <label> 
                        <input type="radio" name="ram" checked={selectedRam === ""} onChange={() => setSelectedRam("")} /> All </label> 
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
