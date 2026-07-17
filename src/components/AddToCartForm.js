"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { useRouter } from "next/navigation";

export default function AddToCartForm({ product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    router.push("/cart");
  };

  return (
    <div>
      <div className="form-group" style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold" }}>Size:</label>
        <select 
          value={selectedSize} 
          onChange={(e) => setSelectedSize(e.target.value)}
          style={{ width: "100px" }}
        >
          {product.sizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      <button 
        onClick={handleAddToCart} 
        disabled={product.stock === 0}
        style={{ padding: "12px 24px", fontSize: "16px" }}
      >
        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
