import { getOrders, saveOrders } from "@/lib/db";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    const order = await req.json();
    const orders = getOrders();
    
    order.id = crypto.randomUUID();
    orders.unshift(order);
    
    saveOrders(orders);
    
    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}

export async function GET() {
  const orders = getOrders();
  return NextResponse.json(orders);
}
