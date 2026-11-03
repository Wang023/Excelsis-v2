import Link from "next/link";
export default function NotFound() {
  return (
    <section className="page-intro">
      <div className="eyebrow muted">404 / A DIFFERENT DIRECTION</div>
      <h1>
        Let’s get you
        <br />
        <em>back on track.</em>
      </h1>
      <p>That page doesn’t exist.</p>
      <Link href="/" className="button">
        Back to home ↗
      </Link>
    </section>
  );
}
