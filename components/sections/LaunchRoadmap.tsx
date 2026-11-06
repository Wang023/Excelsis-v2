"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Zap, RefreshCw, CalendarCheck, Megaphone, Target, ArrowUpRight } from "lucide-react";
import { content } from "@/app/content";

const phases = [
  { icon: Zap, label: "RESPONSE", title: "Always on" },
  { icon: RefreshCw, label: "REACTIVATION", title: "Plans revived" },
  { icon: CalendarCheck, label: "BOOKINGS", title: "Consults confirmed" },
  { icon: Megaphone, label: "DEMAND", title: "Demand online" },
  { icon: Target, label: "ATTENDANCE", title: "The show-up goal" },
];

export default function LaunchRoadmap() {
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = roadmapRef.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(true); observer.disconnect(); }
    }, { threshold: .12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={roadmapRef} className={`launch-roadmap${active ? " is-active" : ""}`}>
    <div className="roadmap-toolbar">
      <span className="roadmap-system"><span aria-hidden="true" /> CASE-START SYSTEM</span>
      <span className="roadmap-sequence">DAY 001 <span aria-hidden="true">→</span> DAY 090</span>
    </div>
    <div className="roadmap-stages">
      <svg className="roadmap-connector" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true">
        <path className="roadmap-track" d="M100 40H900" />
        <path className="roadmap-trace" d="M100 40H900" pathLength="1" />
        <path className="roadmap-signal" d="M100 40H900" pathLength="1" />
      </svg>
      <ol className="roadmap-milestones">
        {content.steps.map((step, index) => {
          const phase = phases[index];
          const Icon = phase.icon;
          return <li key={step.title} style={{ "--milestone-delay": `${index * .45}s` } as CSSProperties}>
            <div className="roadmap-node" aria-hidden="true"><Icon size={25} strokeWidth={1.5} /><span className="roadmap-node-index">0{index + 1}</span></div>
            <div className="roadmap-stage-copy">
              <span className="roadmap-phase">{phase.label}</span>
              <h3><span>{step.title}</span>{phase.title}</h3>
              <p>{step.body}</p>
            </div>
          </li>;
        })}
      </ol>
    </div>
    <div className="roadmap-bottom">
      <figure className="roadmap-chart" aria-labelledby="roadmap-chart-title">
        <figcaption><span id="roadmap-chart-title">One connected journey.</span><span className="roadmap-chart-legend"><i aria-hidden="true" /> PROCESS ILLUSTRATION</span></figcaption>
        <svg viewBox="0 0 600 150" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="roadmap-area" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#FF6B5B" stopOpacity=".25" /><stop offset="1" stopColor="#FF6B5B" stopOpacity="0" /></linearGradient>
          </defs>
          <path className="roadmap-chart-grid" d="M10 32H590M10 77H590M10 122H590M110 12V140M230 12V140M350 12V140M470 12V140" />
          <path fill="url(#roadmap-area)" d="M12 126C70 126 75 110 130 110S210 85 268 85S350 64 410 64S510 23 588 19V145H12Z" />
          <path className="roadmap-curve" pathLength="1" d="M12 126C70 126 75 110 130 110S210 85 268 85S350 64 410 64S510 23 588 19" />
          <circle className="roadmap-chart-end" cx="588" cy="19" r="5" />
        </svg>
        <div className="roadmap-chart-axis"><span>FIRST RESPONSE</span><span>ATTENDED CONSULT</span></div>
        <p className="roadmap-chart-note">Illustrative process path, not measured performance.</p>
      </figure>
      <div className="roadmap-goal">
        <span className="roadmap-goal-eyebrow"><Target size={15} aria-hidden="true" /> THE 90-DAY GOAL</span>
        <div className="roadmap-goal-number">25<span>additional<br />attended consults</span></div>
        <p>On top of what you already get—or we keep working for free until you do.</p>
        <a href="#the-math">Read the guarantee & conditions <ArrowUpRight size={14} aria-hidden="true" /></a>
      </div>
    </div>
  </div>;
}
