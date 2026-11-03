import Link from "next/link";
export const metadata = { title: "Insights" };
const posts = [
  [
    "patient-journey",
    "STRATEGY",
    "Your next growth opportunity may already be in your inbox.",
    "Why enquiry follow-up deserves as much attention as your ad spend.",
  ],
  [
    "responsible-ai",
    "AI & AUTOMATION",
    "A more human way to use artificial intelligence.",
    "Where automation helps a dental team, and where people should lead.",
  ],
  [
    "measure-what-matters",
    "GROWTH INTELLIGENCE",
    "Clicks are a signal. Conversations are a starting point.",
    "How to build a clearer picture of your marketing performance.",
  ],
];
export default function Page() {
  return (
    <>
      <section className="page-intro">
        <div className="eyebrow muted">THE EXCELSIS JOURNAL</div>
        <h1>
          A fresh perspective.
          <br />
          <em>A smarter next move.</em>
        </h1>
        <p>
          Practical thinking at the intersection of dentistry, marketing, and
          artificial intelligence.
        </p>
      </section>
      <section className="section insights-grid">
        {posts.map(([slug, tag, title, desc], i) => (
          <Link className="insight-card" href={"/insights/" + slug} key={slug}>
            <div className={"insight-art art-" + i}>
              <span>{["↗", "✳", "◉"][i]}</span>
              <small>EXCELSIS / FIELD NOTES 0{i + 1}</small>
            </div>
            <div className="eyebrow muted">{tag} · 3 MIN READ</div>
            <h2>{title}</h2>
            <p>{desc}</p>
            <span className="text-link dark">Read the insight ↗</span>
          </Link>
        ))}
      </section>
    </>
  );
}
