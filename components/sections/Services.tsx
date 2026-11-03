import Link from "next/link";
import { ArrowUpRight, Target, Bot, Layers, BarChart3 } from "lucide-react";
export const services = [
  {
    id: "acquisition",
    icon: Target,
    title: "Be found. Be chosen.",
    tag: "PATIENT ACQUISITION",
    body: "Search, paid media, and local visibility that put your practice in front of patients actively looking for care.",
    detail:
      "We connect Google Ads, local SEO, and focused landing pages around your priority treatments. Clear targeting and conversion tracking help you understand where enquiries come from.",
  },
  {
    id: "automation",
    icon: Bot,
    title: "Never miss a moment.",
    tag: "AI & AUTOMATION",
    body: "Intelligent lead follow-up and patient reactivation that keep conversations moving, even after hours.",
    detail:
      "Build timely enquiry responses, appointment reminders, and reactivation journeys around your team’s workflow. AI supports administrative conversations, with a clear hand-off to your team for clinical questions.",
  },
  {
    id: "brand",
    icon: Layers,
    title: "Make your difference felt.",
    tag: "BRAND & EXPERIENCE",
    body: "Distinctive identities, conversion-focused websites, and content that turn first impressions into lasting trust.",
    detail:
      "Bring your practice’s strengths into a cohesive identity and fast, accessible website. Treatment pages, thoughtful messaging, and a simple enquiry journey make taking the next step easier.",
  },
  {
    id: "intelligence",
    icon: BarChart3,
    title: "Clarity at every step.",
    tag: "GROWTH INTELLIGENCE",
    body: "Connect your marketing to real outcomes. Understand what’s working, what isn’t, and where to go next.",
    detail:
      "Define meaningful measures from first enquiry to booked consultation. A shared reporting rhythm helps your team make decisions with context rather than chase clicks alone.",
  },
];
export default function Services() {
  return (
    <section className="section" id="possibilities">
      <div className="section-heading">
        <div>
          <div className="eyebrow muted">01 / BUILT FOR YOUR NEXT CHAPTER</div>
          <h2>
            A complete ecosystem.
            <br />
            <em>One growth partner.</em>
          </h2>
        </div>
        <p>
          Great dentistry deserves to be discovered.
          <br />
          We bring the strategy, systems, and creativity
          <br className="desktop" /> to make that happen.
        </p>
      </div>
      <div className="service-grid">
        {services.map((s, i) => (
          <Link href={"/services#" + s.id} className="service-card" key={s.id}>
            <div className="service-card-top">
              <s.icon size={25} strokeWidth={1.3} />
              <span>0{i + 1}</span>
            </div>
            <div className="eyebrow muted">{s.tag}</div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <span className="circle-arrow">
              <ArrowUpRight size={19} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
