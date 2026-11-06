import Link from "next/link";
import { ArrowUpRight, RotateCcw, Timer, CalendarCheck, MessageCircle, RefreshCw, Target, ChartNoAxesCombined, Check, Plus } from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import HeroHeadline from "@/components/sections/HeroHeadline";
import HeroAtmosphere from "@/components/sections/HeroAtmosphere";
import LeadConsole from "@/components/sections/LeadConsole";
import { content } from "./content";

const icons = [RotateCcw, Timer, CalendarCheck, MessageCircle, RefreshCw, Target, ChartNoAxesCombined];

export default function Home() {
  return <div className="founding-home">
    <section className="revival-hero founding-hero" aria-labelledby="hero-title">
      <HeroAtmosphere />
      <div className="hero-topline">
        <span className="eyebrow"><span className="live-dot" /> EXCLUSIVELY FOR INVISALIGN PRACTICES</span>
        <span className="hero-edition">FOUNDING PRACTICE / 90 DAYS</span>
      </div>
      <div className="hero-split">
        <div className="hero-main">
          <div className="hero-heading-row"><HeroHeadline /></div>
          <div className="hero-conversion">
            <p>{content.hero.subheadline}</p>
            <div className="founding-promise" id="the-math">
              <p>{content.guarantee}</p>
              <small>{content.finePrint}</small>
            </div>
            <Link className="button" href="#contact">{content.hero.cta}<ArrowUpRight size={18} /></Link>
          </div>
        </div>
        <LeadConsole />
      </div>
    </section>

    <section className="revival-section process-section" id="how-it-works" aria-labelledby="timeline-title">
      <div className="section-kicker"><span>01 / YOUR FIRST 90 DAYS</span></div>
      <h2 id="timeline-title">Your first <span>90 days.</span></h2>
      <ol className="founding-timeline">
        {content.steps.map((step) => <li key={step.title}><span className="timeline-day">{step.title}</span><p>{step.body}</p></li>)}
      </ol>
    </section>

    <section className="revival-section" id="what-we-do" aria-labelledby="services-title">
      <div className="section-kicker"><span>02 / WHAT WE DO</span></div>
      <h2 id="services-title">What <span>we do.</span></h2>
      <div className="revival-card-grid founding-services">
        {content.cards.map((card, index) => {
          const Icon = icons[index];
          return <article className="revival-card" key={card.title}>
            <div className="card-top"><Icon size={25} strokeWidth={1.4} /><span>0{index + 1}</span></div>
            <h3>{card.title}</h3><p>{card.body}</p>
          </article>;
        })}
      </div>
    </section>

    <section className="program-section" id="the-program" aria-labelledby="team-duties-title">
      <div className="revival-section">
        <div className="section-kicker"><span>03 / WHAT YOUR TEAM DOES</span></div>
        <div className="founding-duties">
          <div><h2 id="team-duties-title">What your <span>team does.</span></h2><p className="founding-ownership">Everything else is ours.</p></div>
          <ul>{content.teamDuties.map((duty) => <li key={duty}><Check size={21} aria-hidden="true" /><span>{duty}</span></li>)}</ul>
        </div>
      </div>
    </section>

    <section className="revival-section founding-fit" id="who-this-is-for" aria-labelledby="fit-title">
      <div className="section-kicker"><span>04 / WHO THIS IS FOR</span></div>
      <div className="founding-editorial"><h2 id="fit-title">Who this <span>is for.</span></h2><p>{content.audience}</p></div>
    </section>

    <section className="revival-section" id="team" aria-labelledby="why-title">
      <div className="section-kicker"><span>05 / WHY WE START AFTER THE INQUIRY</span></div>
      <div className="founding-editorial">
        <h2 id="why-title">Why we start <span>after the inquiry.</span></h2>
        <div><p className="founding-placeholder">{content.josh}</p><p>{content.why}</p></div>
      </div>
    </section>

    <section className="revival-section founding-questions" id="questions" aria-labelledby="questions-title">
      <div className="section-kicker"><span>06 / QUESTIONS</span></div>
      <h2 id="questions-title">Questions<span>?</span></h2>
      <div className="founding-faq-list">{content.questions.map(({ question, answer }) => <details key={question}>
        <summary>{question}<Plus size={20} aria-hidden="true" /></summary><p>{answer}</p>
      </details>)}</div>
    </section>

    <section className="contact-section" id="contact" aria-labelledby="audit-title">
      <HeroAtmosphere />
      <div className="revival-section">
        <div className="section-kicker"><span>07 / YOUR FREE AUDIT</span></div>
        <div className="report-layout">
          <div><h2 id="audit-title">Get your <span>free audit.</span></h2><p className="section-copy">{content.closing}</p></div>
          <ContactForm />
        </div>
      </div>
    </section>
  </div>;
}
