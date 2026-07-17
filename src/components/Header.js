"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Header() {
  const { cartCount, isClient } = useCart();

  return (
    <header className="header">
      <div className="container header-nav">
        <Link href="/" className="header-logo">
          MegaStore
        </Link>
        <div className="header-links">
          <Link href="/">Home</Link>
          <Link href="/cart">Cart {isClient && cartCount > 0 ? `(${cartCount})` : ""}</Link>
          <Link href="/admin">Admin Panel</Link>
        </div>
      </div>
    </header>
  );
}
