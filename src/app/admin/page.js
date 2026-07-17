import { getOrders, getProducts } from "@/lib/db";

export default function AdminDashboard() {
  const orders = getOrders();
  const products = getProducts();
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  return (
    <div>
      <h1>Dashboard Overview</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", marginTop: "20px" }}>
        <div className="card">
          <h3 style={{ color: "#555", fontSize: "14px" }}>Total Revenue</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold", color: "#B12704" }}>${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3 style={{ color: "#555", fontSize: "14px" }}>Total Orders</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold" }}>{totalOrders}</p>
        </div>
        <div className="card">
          <h3 style={{ color: "#555", fontSize: "14px" }}>Active Products</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold" }}>{totalProducts}</p>
        </div>
        <div className="card" style={{ borderColor: outOfStock > 0 ? "red" : "#ddd" }}>
          <h3 style={{ color: "#555", fontSize: "14px" }}>Out of Stock</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold", color: outOfStock > 0 ? "red" : "black" }}>{outOfStock}</p>
        </div>
      </div>
      
      <h2 style={{ marginTop: "40px" }}>Recent Orders</h2>
      <div className="card" style={{ marginTop: "20px" }}>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ddd" }}>
                <th style={{ padding: "8px" }}>Order ID</th>
                <th style={{ padding: "8px" }}>Customer</th>
                <th style={{ padding: "8px" }}>Date</th>
                <th style={{ padding: "8px" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "8px" }}>{order.id.slice(0, 8)}...</td>
                  <td style={{ padding: "8px" }}>{order.customer.name}</td>
                  <td style={{ padding: "8px" }}>{new Date(order.date).toLocaleDateString()}</td>
                  <td style={{ padding: "8px" }}>${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
