import Link from "next/link";
import { ArrowDown, ArrowUpRight, RotateCcw, Target, Timer, PhoneIncoming, CalendarCheck, Check } from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import HeroHeadline from "@/components/sections/HeroHeadline";
import HeroAtmosphere from "@/components/sections/HeroAtmosphere";
import { content } from "./content";
const icons = [RotateCcw, Target, Timer, PhoneIncoming, CalendarCheck];
export default function Home() {
  return <>
      <section className="revival-hero" aria-labelledby="hero-title">
        <HeroAtmosphere />
        <div className="hero-topline">
          <span className="eyebrow"><span className="live-dot" /> EXCLUSIVELY FOR INVISALIGN PRACTICES</span>
          <span className="hero-edition">EXCELSIS ACQUISITION / 2026</span>
        </div>
        <div className="hero-heading-row">
          <HeroHeadline />
        </div>
        <div className="hero-bottom">
          <div className="hero-conversion">
            <p>We turn the Invisalign leads you’ve already paid for into booked consults, then keep your calendar full with Meta ads built to convert.</p>
            <Link className="button" href="#contact">Get your free Lead Leak Report <ArrowUpRight size={18} /></Link>
          </div>
          <div className="hero-signoff">
            <span>Find. Revive. Fill.</span>
            <a href="#what-we-do" aria-label="Explore what we do">
              <ArrowDown size={22} />
            </a>
          </div>
        </div>
      </section>
      <section className="revival-section" id="what-we-do">
        <div className="section-kicker">
          <span>01 / WHAT WE DO</span>
          <span>FROM FIRST ENQUIRY TO FULL CALENDARS</span>
        </div>
        <h2 className="wide-heading">We fill Invisalign calendars,<br className="desktop" /> starting with leads <span>you already own.</span></h2>
        <div className="revival-card-grid">
          {content.cards.map((card, i) => {
          const Icon = icons[i];
          return <article className="revival-card" key={card.title}>
            <div className="card-top">
              <Icon size={25} strokeWidth={1.4} />
              <span>0{i + 1}</span>
            </div>
            <h3>
              {card.title}
            </h3>
            <p>
              {card.body}
            </p>
          </article>;
        })}
        </div>
      </section>
      <section className="revival-section process-section" id="how-it-works">
        <div className="section-kicker">
          <span>02 / HOW IT WORKS</span>
          <span>A CLEAR PATH TO YOUR NEXT CONSULT</span>
        </div>
        <h2>Find. Revive. <span>Fill.</span></h2>
        <div className="revival-steps">
          {content.steps.map((step, i) => <article key={step.title}>
            <span className="large-number">0{i + 1}</span>
            <h3>
              {step.title}
              <span aria-hidden="true">↗</span>
            </h3>
            <p>
              {step.body}
            </p>
          </article>)}
        </div>
      </section>
      <section className="program-section" id="the-program">
        <div className="revival-section">
          <div className="section-kicker">
            <span>03 / THE INVISALIGN REVIVAL PROGRAM</span>
            <span>ONE CONNECTED SYSTEM</span>
          </div>
          <div className="program-layout">
            <div className="program-intro">
              <h2>Everything between your ad and your chair, <span>handled.</span></h2>
              <p>Most agencies stop at the lead and leave your front desk to chase it. We own every step until the consult is on your calendar, and we only get paid when it is.</p>
              <Link className="text-link" href="#contact">Find your opportunity <ArrowUpRight size={18} /></Link>
              <div className="program-seal" aria-hidden="true">✳<span>FIND. REVIVE. FILL.</span></div>
            </div>
            <div className="program-list">
              {content.program.map((item, i) => <article key={item.title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>
                    {item.title}
                  </h3>
                  <p>
                    {item.body}
                  </p>
                </div>
              </article>)}
            </div>
          </div>
        </div>
      </section>
      <section className="revival-section" id="the-math">
        <div className="section-kicker">
          <span>04 / THE MATH</span>
          <span>YOUR NUMBERS. A CLEARER PICTURE.</span>
        </div>
        <div className="math-layout">
          <div>
            <h2>You only need <span>one case</span> to come out ahead.</h2>
            <p className="section-copy">
              {content.math}
            </p>
            <p className="availability">
              <span className="live-dot" />
              {content.scarcity}
            </p>
          </div>
          <div className="guarantee-card">
            <div className="eyebrow"><Check size={17} /> OUR BOOKING GUARANTEE</div>
            <div className="guarantee-number">6<span> / 30</span></div>
            <h3>6 booked consults in 30 days.</h3>
            <p>
              {content.guarantee}
            </p>
            <div className="guarantee-fine">
              {content.finePrint}
            </div>
          </div>
        </div>
      </section>
      <section className="revival-section team-section" id="team">
        <div className="section-kicker">
          <span>05 / THE TEAM</span>
          <span>THE PEOPLE BEHIND THE CONVERSATIONS</span>
        </div>
        <div className="team-heading">
          <h2>Built by salespeople,<br /><span>not ad buyers.</span></h2>
          <p>Most agencies can get you leads. We know how to turn a lead into a conversation, and a conversation into a booked consult.</p>
        </div>
        <div className="team-grid">
          <article>
            <div className="portrait-placeholder">
              <span>J</span>
              <small>[Kim’s headshot coming]</small>
            </div>
            <div className="team-name">
              <h3>Kim</h3>
              <span>CO-FOUNDER / REVIVAL AND SALES</span>
            </div>
            <p>
              {content.josh}
            </p>
          </article>
          <article>
            <div className="portrait-placeholder carson">
              <span>C</span>
              <small>[Carson’s headshot coming]</small>
            </div>
            <div className="team-name">
              <h3>Carson</h3>
              <span>CO-FOUNDER / [ROLE]</span>
            </div>
            <p className="placeholder-copy">[Bio coming]</p>
          </article>
          <article>
            <div className="portrait-placeholder carson">
              <span>C</span>
              <small>[Gana’s headshot coming]</small>
            </div>
            <div className="team-name">
              <h3>Gana</h3>
              <span>CO-FOUNDER / [ROLE]</span>
            </div>
            <p className="placeholder-copy">[Bio coming]</p>
          </article>
        </div>
      </section>
      <section className="contact-section" id="contact">
        <div className="revival-section">
          <div className="section-kicker">
            <span>06 / FIND. REVIVE. FILL.</span>
            <span>YOUR NEXT CHAPTER STARTS HERE</span>
          </div>
          <div className="report-layout">
            <div>
              <h2>Find out what your <span>old leads are worth.</span></h2>
              <p className="section-copy">
                {content.closing}
              </p>
              <div className="report-includes">
                <span><Check size={17} /> Response speed</span>
                <span><Check size={17} /> Unanswered calls</span>
                <span><Check size={17} /> Unbooked lead value</span>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>;
}
