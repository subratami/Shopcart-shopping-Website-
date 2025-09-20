import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../component/CartContext";
import { useWishlist } from "../component/WishlistContext";
import "./productlist.css";
import { Range } from "react-range";
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
  "Product Photo": string
}

const BRANDS = ["Apple", "Samsung", "Realme", "Xiaomi"];
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
  const [maxPages, setMaxPages] = useState<number>(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(window.innerWidth >= 900);
  const [sortBy, setSortBy] = useState<"" | "price" | "rating">("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([0, 100000]);


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
  }, [searchQuery, selectedBrand, selectedStorage, selectedRam]);

    const fetchProducts = async ( 
      pageNumber: number = page,
      overridePriceRange?: [number, number]
      ) => {
      setLoading(true);
      const params = new URLSearchParams();

      if (searchQuery) params.append("brand", searchQuery);
      if (selectedBrand) params.append("brand", selectedBrand);
      if (selectedStorage) params.append("storage", selectedStorage);
      if (selectedRam) params.append("memory", selectedRam);
      
      const appliedRange = overridePriceRange || priceRange;
      if (appliedRange[0] > 0) params.append("min_price", String(appliedRange[0]));
      if (appliedRange[1] < 100000) params.append("max_price", String(appliedRange[1]));
      
      if (sortBy) params.append("sort_by", sortBy);
      params.append("order", order);


      params.append("page", String(pageNumber));
      params.append("limit", "20");

      try {
        const res = await fetch(`https://new-shopping-api.onrender.com/search?${params.toString()}`);
        const data = await res.json();
        setProducts(data.products || []);
        setTotal(data.total || 0);
        setMaxPages(data.max_pages);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
        setTotal(0);
         setMaxPages(1);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchProducts();
  }, [searchQuery, selectedBrand, selectedStorage, selectedRam, page, order, sortBy, priceRange]);
    
   const clearFilters = () => {
    setSelectedBrand("");
    setPriceRange([0, 100000]);
    setTempPriceRange([0, 100000]);
    setSelectedStorage("");
    setSelectedRam("");
    setSortBy("");
    setOrder("asc");
    setPage(1);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="rating">
        {'★'.repeat(fullStars)}
        {hasHalfStar && '☆'}
        <span className="rating-number">{rating}</span>
      </div>
    );
  };

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
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
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
         &nbsp;  {brand} 
          </label> 
        ))} 
        <div className="mt-4">
              <strong className="block mb-2">Price Range</strong>
              <Range
  step={500}
  min={0}
  max={100000}
  values={tempPriceRange}
  onChange={(values) => setTempPriceRange(values as [number, number])}
  renderTrack={({ props, children }) => (
    <div {...props} className="range-track">
      {children}
    </div>
  )}
  renderThumb={({ props }) => (
    <div {...props} className="range-thumb" />
  )}
/>

<div className="price-labels">
  <span>₹{tempPriceRange[0]}</span>
  <span>₹{tempPriceRange[1]}</span>
</div>

<button
  style={{
    marginTop: "8px",
    padding: "5px 12px",
    borderRadius: "6px",
    background: "#0073e6",
    color: "white",
    cursor: "pointer",
    border: "none"
  }}
    onClick={() => {
    setPriceRange(tempPriceRange); 
    setPage(1);
    fetchProducts(1, tempPriceRange);
  }}
    >
      Go
      </button>
          </div>
                 </div> <div style={{ marginTop: 12 }}>
                   <strong>Storage</strong> {STORAGES.map((s) => ( <label key={s}> 
                    <input type="checkbox" name="storage" checked={selectedStorage === s} onChange={() => setSelectedStorage(prev => prev === s ? "" : s)} />&nbsp;  {s} </label>
                     ))} 
                      </div> <div style={{ marginTop: 12 }}> 
                        <strong>RAM</strong> {RAMS.map((r) => ( <label key={r}> <input type="checkbox" name="ram" checked={selectedRam === r} onChange={() => setSelectedRam(prev => prev === r ? "" : r)} />&nbsp;  {r} </label>
                       ))} 
                        </div> 
                        <button className="clear-filters" style={{ marginTop: 16 }} onClick={clearFilters}>
              Clear Filters
            </button>
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
                      <img className="product-image" src={product["Product Photo"][1]} alt={product.Model} />
                      {product.Brand} {product.Model} {product.Color} <br />
                      {product.Memory} {product.Storage} <br />
                      ₹{product["Selling Price"]}{" "}
                      <del>₹{product["Original Price"]}</del> <br />
                      {renderStars(product.Rating)}
                    </div>
                    <div className="product-actions" style={{ display: "flex", justifyContent: "space-evenly"}}>
                    <button className="add-to-cart" onClick={() => addToCart(product._id, 1)}>
                      Add to Cart
                    </button>

                    <button
                      className={`add-to-wishlist ${isInWishlist ? "disabled" : ""}`}
                      onClick={() => addToWishlist(product._id)}
                      disabled={isInWishlist}
                    >
                      {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                    </button>  
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
 
          {products.length > 0 && (
             <div style={{ marginTop: "1.5rem", textAlign: "center" 
        }}> 
         <button
      disabled={page === 1}
      onClick={() => setPage(1)}
      style={{padding: "5px", marginRight: "10px", borderRadius: "8px", cursor: "pointer"}}
    >
      ⏮ First
    </button>
        <button style={{padding: "5px", borderRadius: "8px", cursor: "pointer"}} disabled={page <= 1} onClick={() => 
          setPage(page - 1)}> 
          ⬅️ Prev 
          </button>
           <span style={{ margin: "0 1rem" }}>Page {page}
            </span>
             <button style={{padding: "5px", borderRadius: "8px", cursor: "pointer"}} onClick={() => setPage(page + 1)}>Next ➡️</button> 
             <button onClick={() => {
        //const lastPage = Math.ceil(maxPages / 8); 
        setPage(maxPages);
      }} 
      style={{padding: "5px", marginLeft: "10px", borderRadius: "8px", cursor: "pointer"}}
                >
                Last ⏭
              </button>
             </div>
             )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
