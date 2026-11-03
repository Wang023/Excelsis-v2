export const dynamicParams = false;
import { notFound } from "next/navigation";
import Link from "next/link";
const articles: Record<
  string,
  { title: string; sections: [string, string][] }
> = {
  "patient-journey": {
    title: "Your next growth opportunity may already be in your inbox.",
    sections: [
      [
        "Start with the journey",
        "Before investing in more traffic, look at what happens after someone enquires. Is there a clear owner for each conversation? Does your team know which treatment interested the person? A missed hand-off can turn a promising enquiry into a dead end.",
      ],
      [
        "Make follow-up useful",
        "A helpful response acknowledges the question, explains the next step, and offers a simple way to speak with the team. Automation can support that response outside office hours, but it should never imply that a person has reviewed a case when they have not.",
      ],
      [
        "Measure the gaps",
        "Review response times, unanswered enquiries, and booked consultations together. Respect patient preferences and obtain appropriate consent for ongoing messages. Start by fixing one friction point, then check whether the experience improves.",
      ],
    ],
  },
  "responsible-ai": {
    title: "A more human way to use artificial intelligence.",
    sections: [
      [
        "Give technology a clear job",
        "AI is most useful when its role is specific. Routing enquiries, drafting administrative replies, and summarising campaign performance can free people to focus on conversations that need judgment.",
      ],
      [
        "Keep clinical decisions with clinicians",
        "A marketing assistant should not diagnose symptoms, recommend treatment, or create expectations about clinical outcomes. Make it clear when someone is speaking with automation and provide a simple route to a member of the practice team.",
      ],
      [
        "Build trust into the workflow",
        "Collect only the information needed for the task. Review the tools that receive personal information, agree on retention periods, and test hand-offs before launch. A thoughtful system makes people feel supported rather than processed.",
      ],
    ],
  },
  "measure-what-matters": {
    title: "Clicks are a signal. Conversations are a starting point.",
    sections: [
      [
        "Define the outcome first",
        "A campaign can attract attention without creating useful enquiries. Before launch, agree on the treatment focus, available capacity, and the action you want a prospective patient to take.",
      ],
      [
        "Connect the stages",
        "Track visits, enquiries, qualified conversations, and booked consultations as distinct stages. Record the source where possible and acknowledge attribution gaps. A dashboard should help your team ask better questions, not create false certainty.",
      ],
      [
        "Learn before you scale",
        "Compare patterns over a meaningful period, taking budget and seasonality into account. If enquiries are strong but bookings are weak, improve the journey before increasing spend. Measure consistently, then make one deliberate change at a time.",
      ],
    ],
  },
};
export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles[slug];
  if (!a) notFound();
  return (
    <article>
      <section className="page-intro article-intro">
        <Link className="text-link dark" href="/insights">
          ← All insights
        </Link>
        <div className="eyebrow muted">EXCELSIS / FIELD NOTES</div>
        <h1>{a.title}</h1>
      </section>
      <div className="article-body">
        {a.sections.map(([t, p]) => (
          <section key={t}>
            <h2>{t}</h2>
            <p>{p}</p>
          </section>
        ))}
        <Link href="/contact" className="button">
          Discuss your practice’s growth ↗
        </Link>
      </div>
    </article>
  );
}
