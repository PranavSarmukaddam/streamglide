import { getProducts } from "@/lib/db";
import AddToCartForm from "@/components/AddToCartForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const products = getProducts();
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container main-content">
      <Link href="/">&larr; Back to shopping</Link>
      <div style={{ display: "flex", gap: "40px", marginTop: "20px", flexWrap: "wrap" }}>
        <div style={{ flex: "1", minWidth: "300px" }}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            style={{ width: "100%", border: "1px solid #ddd", borderRadius: "4px" }} 
          />
        </div>
        <div style={{ flex: "1", minWidth: "300px" }}>
          <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>{product.name}</h1>
          <p className="product-price" style={{ fontSize: "24px" }}>${product.price.toFixed(2)}</p>
          <p style={{ color: "green", marginBottom: "20px" }}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
          </p>
          <p style={{ marginBottom: "20px", lineHeight: "1.6" }}>{product.description}</p>
          
          <div className="card">
            <AddToCartForm product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
