"use client";

import { useState, useEffect } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Manage Orders</h1>
      <div className="card" style={{ marginTop: "20px" }}>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ddd" }}>
                <th style={{ padding: "8px" }}>Order ID</th>
                <th style={{ padding: "8px" }}>Customer</th>
                <th style={{ padding: "8px" }}>City/ZIP</th>
                <th style={{ padding: "8px" }}>Items</th>
                <th style={{ padding: "8px" }}>Total</th>
                <th style={{ padding: "8px" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "8px" }}>{order.id}</td>
                  <td style={{ padding: "8px" }}>{order.customer.name}<br/><small>{order.customer.address}</small></td>
                  <td style={{ padding: "8px" }}>{order.customer.city}, {order.customer.zip}</td>
                  <td style={{ padding: "8px" }}>{order.items.length} items</td>
                  <td style={{ padding: "8px", fontWeight: "bold" }}>${order.total.toFixed(2)}</td>
                  <td style={{ padding: "8px" }}>{new Date(order.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
