import { getProducts, saveProducts } from "@/lib/db";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function POST(req) {
  try {
    const product = await req.json();
    const products = getProducts();
    
    product.id = crypto.randomUUID();
    
    // Simple validation
    if (!product.name || !product.price) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
    }
    
    products.push(product);
    saveProducts(products);
    
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
