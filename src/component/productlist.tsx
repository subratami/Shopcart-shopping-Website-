import { useState, useEffect } from "react";
import "./productlist.css";
import { useCart } from "../component/CartContext"
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

const ProductList = ({ searchQuery }: ProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart(); // Access addToCart from CartContext
    useEffect(() => {
            // Clear previous products before fetching new ones
    setProducts([]);
         console.log("Fetching for query:", searchQuery);
        fetch(`/search/?brand=${searchQuery}`)
            .then(response => response.json())
            .then(data => {console.log("API returned:", data);setProducts(data)});
    }, [searchQuery]); // Fetch new results when search changes

    return (
       <div className="productlist-container">
         <ul className="product-list">
            {products.map(product => (
                <li key={`${product._id}`}>
                  <div className="product-item">
                    {product.Brand} {product.Model} {product.Color} <br />
                    {product.Memory} {product.Storage}
                    <br /> ₹{product["Selling Price"]}
                    <br /> <span><del>₹{product["Original Price"]}</del></span>
                  </div>
                  <br />Rating- {product.Rating} <br />
                  <button
                    type="button"
                    className="add-to-cart"
                    onClick={() => addToCart(product._id, 1)} // <-- Pass product._id
                  >
                    Add to Cart
                  </button>
                  <br />
                </li>
                
            ))}
        </ul>
         </div>
    );
};

export default ProductList;
