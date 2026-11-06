import Link from "next/link";
import { content } from "../content";

export const metadata = { title: "The team" };

export default function Page() {
  return (
    <section className="revival-section legacy-editorial">
      <div className="eyebrow">THE TEAM</div>

      <h1>
        Built by salespeople,
        <br />
        not ad buyers.
      </h1>

      <p className="section-copy">
        Most agencies can get you leads. We know how to turn a lead
        into a conversation, and a conversation into a booked consult.
      </p>

      <h2>Josh</h2>
      <p>{content.josh}</p>

      <h2>Carson</h2>
      <p>Co-founder / Revival and Sales</p>
      <p>[Bio coming]</p>

      <h2>Gana</h2>
      <p>Co-founder | UI/UX Designer and Developer</p>
      <p>[Bio coming]</p>

      <Link className="button" href="/#contact">
        Get your free Invisalign Lead-Leak Audit ↗
      </Link>
    </section>
  );
}