import { useState, useEffect } from "react";
import "./productlist.css";
interface ProductListProps {
    searchQuery: string;
}

interface Product {
    Brand: string | number;
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

    useEffect(() => {
         console.log("Fetching for query:", searchQuery);
        fetch(`/search/?query=${searchQuery}`)
            .then(response => response.json())
            .then(data => {console.log("API returned:", data);setProducts(data)});
    }, [searchQuery]); // Fetch new results when search changes

    return (
        <ul className="product-list">
            {products.map(product => (
                <li key={`${product.Brand}-${product.Model}-${product.Color}`}>
                  <div className="product-item">{ product.Brand}&nbsp;{product.Model}&nbsp;{product.Color} <br /> {product.Memory}&nbsp; &nbsp;{product.Storage} 
                  <br /> ₹{product["Selling Price"]} <br /> <span> <del>₹{product["Original Price"]} </del></span></div> <br /> {product.Rating} <br />
                    <button type="button" className="add-to-cart">Add to Cart</button>
                </li>
                
            ))}
        </ul>
    );
};

export default ProductList;
