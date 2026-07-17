"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    sizes: "S, M, L",
    imageUrl: "https://placehold.co/600x800/eeeeee/333333?text=New+Product"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      sizes: formData.sizes.split(",").map(s => s.trim())
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData)
    });

    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      alert("Error adding product");
      setLoading(false);
    }
  };

  return (
    <div>
      <Link href="/admin/products" style={{ marginBottom: "20px", display: "inline-block" }}>&larr; Back to Products</Link>
      <h1>Add New Product</h1>
      
      <div className="card" style={{ maxWidth: "600px", marginTop: "20px" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Price ($)</label>
              <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Stock</label>
              <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
            </div>
          </div>
          <div className="form-group">
            <label>Sizes (comma separated)</label>
            <input required value={formData.sizes} onChange={e => setFormData({...formData, sizes: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input required value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
          </div>
          <button type="submit" disabled={loading} style={{ marginTop: "20px" }}>
            {loading ? "Saving..." : "Save Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
