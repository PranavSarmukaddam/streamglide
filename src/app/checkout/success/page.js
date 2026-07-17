import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="container main-content" style={{ textAlign: "center", padding: "60px 0" }}>
      <h1 style={{ color: "green", marginBottom: "20px" }}>Order Placed Successfully!</h1>
      <p style={{ fontSize: "18px", marginBottom: "30px" }}>Thank you for shopping with MegaStore. Your order is being processed.</p>
      <Link href="/">
        <button>Continue Shopping</button>
      </Link>
    </div>
  );
}
