"use client";

import { useCart } from "@/components/CartProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, isClient } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    zip: ""
  });
  const [loading, setLoading] = useState(false);

  if (!isClient) return null;

  if (cart.length === 0) {
    return (
      <div className="container main-content">
        <h1>Checkout</h1>
        <p style={{ marginTop: "20px" }}>Cart is empty. <Link href="/">Go shop</Link>.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      customer: formData,
      items: cart,
      total: cartTotal,
      date: new Date().toISOString(),
      status: "Processing"
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData)
    });

    if (res.ok) {
      clearCart();
      router.push("/checkout/success");
    } else {
      alert("Error placing order.");
      setLoading(false);
    }
  };

  return (
    <div className="container main-content">
      <h1>Checkout</h1>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
        
        <div style={{ flex: "2", minWidth: "300px" }}>
          <div className="card">
            <h2>Shipping Address</h2>
            <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
              <div className="form-group">
                <label>Full Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>City</label>
                  <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>ZIP Code</label>
                  <input required value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
                </div>
              </div>
              
              <h2 style={{ marginTop: "20px", marginBottom: "16px" }}>Payment Method</h2>
              <p style={{ color: "#555", fontStyle: "italic", marginBottom: "20px" }}>Payment is simulated for this demo.</p>

              <button type="submit" disabled={loading} style={{ width: "100%" }}>
                {loading ? "Processing..." : "Place Your Order"}
              </button>
            </form>
          </div>
        </div>
        
        <div style={{ flex: "1", minWidth: "250px" }}>
          <div className="card">
            <h2>Order Summary</h2>
            <div style={{ marginTop: "16px", marginBottom: "16px", borderBottom: "1px solid #eee", paddingBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Items:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Shipping:</span>
                <span>$0.00</span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "20px", fontWeight: "bold", color: "#B12704" }}>
              <span>Order Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
