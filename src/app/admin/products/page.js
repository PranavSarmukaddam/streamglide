"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProducts();
      } else {
        alert("Failed to delete");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Manage Products</h1>
        <Link href="/admin/products/new">
          <button>+ Add New Product</button>
        </Link>
      </div>

      <div className="card">
        <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ddd" }}>
              <th style={{ padding: "8px" }}>Image</th>
              <th style={{ padding: "8px" }}>Name</th>
              <th style={{ padding: "8px" }}>Price</th>
              <th style={{ padding: "8px" }}>Stock</th>
              <th style={{ padding: "8px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>
                  <img src={product.imageUrl} alt={product.name} style={{ width: "50px", height: "50px", objectFit: "contain" }} />
                </td>
                <td style={{ padding: "8px" }}>{product.name}</td>
                <td style={{ padding: "8px" }}>${product.price.toFixed(2)}</td>
                <td style={{ padding: "8px", color: product.stock === 0 ? "red" : "black" }}>{product.stock}</td>
                <td style={{ padding: "8px" }}>
                  <button onClick={() => handleDelete(product.id)} style={{ backgroundColor: "#ffcccc", color: "#cc0000", border: "1px solid #cc0000" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
