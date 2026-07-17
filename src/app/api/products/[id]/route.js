import { getProducts, saveProducts } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const updates = await req.json();
    const products = getProducts();
    
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
    
    return NextResponse.json({ success: true, product: products[index] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const products = getProducts();
    
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    products.splice(index, 1);
    saveProducts(products);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
