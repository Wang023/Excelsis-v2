"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Sparkles, MessageCircle } from "lucide-react";

const stepTimes = [600, 1900, 3400, 4900, 6300];

/** An illustrative booking conversation, never a live patient feed. */
export default function LeadConsole() {
  const [step, setStep] = useState(5);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timers: ReturnType<typeof setTimeout>[] = [];
    let loop: ReturnType<typeof setInterval> | undefined;
    let inView = true;
    const clear = () => {
      timers.forEach(clearTimeout);
      timers = [];
      clearInterval(loop);
    };
    const run = () => {
      timers.forEach(clearTimeout);
      setStep(0);
      timers = stepTimes.map((time, index) => setTimeout(() => setStep(index + 1), time));
    };
    const start = () => {
      clear();
      if (motion.matches) { setStep(5); return; }
      if (!inView || document.hidden) return;
      run();
      loop = setInterval(run, 10500);
    };
    const initial = requestAnimationFrame(start);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting !== inView) { inView = entry.isIntersecting; start(); }
    });
    if (consoleRef.current) observer.observe(consoleRef.current);
    motion.addEventListener("change", start);
    document.addEventListener("visibilitychange", start);
    return () => {
      cancelAnimationFrame(initial);
      clear();
      observer.disconnect();
      motion.removeEventListener("change", start);
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  const show = (n: number) => step >= n ? " is-in" : "";
  return <div ref={consoleRef} className="lead-console" role="img" aria-label="Illustrative demo: an after-hours Invisalign inquiry gets an AI reply, then a consultation is booked. This is not live patient activity.">
    <div aria-hidden="true">
      <div className="lc-glow" />
      <div className="lc-head">
        <span className="lc-title"><span className="live-dot" /> AI LEAD DESK</span>
        <span className="lc-chip">ILLUSTRATIVE DEMO</span>
      </div>
      <div className="lc-feed">
        <div className={"lc-event" + show(1)}>
          <span className="lc-tag">9:47 PM · NEW INQUIRY · META AD</span>
          <div className="lc-bubble patient">Hi, how much is Invisalign? Do you do payment plans?</div>
        </div>
        <div className={"lc-event right" + show(2)}>
          <span className="lc-tag"><Sparkles size={12} /> AI REPLY · 0:42</span>
          <div className="lc-bubble ai">Hi Sarah! Yes, we offer monthly plans. Want to grab a free consult this week?</div>
        </div>
        <div className={"lc-event" + show(3)}><div className="lc-bubble patient">Thursday after work?</div></div>
        <div className={"lc-event right" + show(4)}><div className="lc-bubble ai">Done. You’re set for Thursday at 4:30 PM. Reminder coming the day before.</div></div>
        <div className={`lc-typing${step > 0 && step < 4 ? " is-active" : ""}`}><i /><i /><i /></div>
      </div>
      <div className={"lc-booked" + show(5)}>
        <span className="lc-booked-icon"><CalendarCheck size={18} /></span>
        <div><small>CONSULT BOOKED</small><strong>Thu · 4:30 PM · Invisalign</strong></div>
      </div>
      <div className="lc-stats">
        <div><small>Reply time</small><strong>0:42</strong></div>
        <div><small>Front desk</small><strong>Closed</strong></div>
        <div><small>Status</small><strong className="ok"><MessageCircle size={13} /> {step >= 5 ? "Booked" : "Pending"}</strong></div>
      </div>
      <p className="lc-demo-note">Illustrative example, not live patient activity.</p>
    </div>
  </div>;
}
