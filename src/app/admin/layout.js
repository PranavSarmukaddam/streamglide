import Link from "next/link";
import "../globals.css"; // Ensure admin gets the globals

export const metadata = {
  title: "Admin Panel - MegaStore",
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 style={{ marginBottom: "30px", borderBottom: "1px solid #444", paddingBottom: "10px" }}>Admin Panel</h2>
        <nav>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/products">Manage Products</Link>
          <Link href="/admin/orders">Manage Orders</Link>
          <Link href="/">&larr; Back to Store</Link>
        </nav>
      </aside>
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
