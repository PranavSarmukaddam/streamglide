"use client";

import { useCart } from "@/components/CartProvider";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isClient } = useCart();

  if (!isClient) return null;

  return (
    <div className="container main-content">
      <h1>Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <p style={{ marginTop: "20px" }}>
          Your cart is empty. <Link href="/">Continue shopping</Link>.
        </p>
      ) : (
        <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: "2", minWidth: "300px" }}>
            {cart.map((item, index) => (
              <div key={`${item.id}-${item.size}-${index}`} style={{ display: "flex", borderBottom: "1px solid #ddd", padding: "16px 0", gap: "16px" }}>
                <img src={item.imageUrl} alt={item.name} style={{ width: "100px", height: "100px", objectFit: "contain", border: "1px solid #ddd" }} />
                <div style={{ flex: "1" }}>
                  <h3 style={{ fontSize: "18px", marginBottom: "4px" }}>
                    <Link href={`/products/${item.id}`}>{item.name}</Link>
                  </h3>
                  <p style={{ color: "#007185", fontWeight: "bold", marginBottom: "8px" }}>${item.price.toFixed(2)}</p>
                  <p style={{ fontSize: "14px", color: "#565959", marginBottom: "8px" }}>Size: {item.size}</p>
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <select 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.id, item.size, e.target.value)}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(q => <option key={q} value={q}>Qty: {q}</option>)}
                    </select>
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      style={{ background: "transparent", color: "#007185", border: "none", boxShadow: "none", padding: "0" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ flex: "1", minWidth: "250px" }}>
            <div className="card">
              <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>
                Subtotal ({cart.reduce((a,c) => a + c.quantity, 0)} items): <span style={{ color: "#B12704", fontWeight: "bold" }}>${cartTotal.toFixed(2)}</span>
              </h2>
              <Link href="/checkout">
                <button style={{ width: "100%" }}>Proceed to checkout</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
