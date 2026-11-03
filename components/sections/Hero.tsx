import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  Sparkles,
  Check,
  Activity,
} from "lucide-react";
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid" />
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" /> THE NEXT GENERATION OF DENTAL
          MARKETING
        </div>
        <h1>
          Your expertise.
          <br />
          Our intelligence.
          <br />
          <em>Extraordinary growth.</em>
        </h1>
        <p>
          You create confident smiles. We connect you with the people who need
          them. AI-powered marketing built for ambitious dental practices.
        </p>
        <div className="hero-actions">
          <Link className="button mint" href="/contact">
            Get your free growth audit <ArrowUpRight size={18} />
          </Link>
          <Link className="text-link" href="/services">
            Explore our services <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="hero-note">
          <span className="tiny-avatars">
            <i>✦</i>
            <i>↗</i>
            <i>✳</i>
          </span>
          <span>
            A smarter partner for your practice.
            <br />
            <strong>Strategy. Creativity. Intelligence.</strong>
          </span>
        </div>
      </div>
      <div
        className="hero-art"
        aria-label="Illustration of connected dental marketing intelligence"
        role="img"
      >
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three" />
        <div className="art-cross cross-one">+</div>
        <div className="art-cross cross-two">+</div>
        <div className="tooth-glow" />
        <svg className="tooth" viewBox="0 0 300 350">
          <defs>
            <linearGradient id="tooth" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#f0fff7" />
              <stop offset=".35" stopColor="#bce9d7" />
              <stop offset=".65" stopColor="#5c9e85" />
              <stop offset="1" stopColor="#173e32" />
            </linearGradient>
            <linearGradient id="shine">
              <stop stopColor="white" stopOpacity=".7" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M150 58C111 43 60 21 35 65C9 109 45 155 57 197C70 245 68 306 95 310C123 315 117 220 151 218C185 216 175 309 203 310C233 311 230 247 245 198C259 151 291 108 264 66C240 27 195 45 150 58Z"
            fill="url(#tooth)"
            stroke="#d2f6e5"
            strokeWidth="1.5"
          />
          <path
            d="M54 76C37 113 71 151 80 194C85 215 88 247 94 259C92 195 90 161 75 129C65 107 65 86 83 67Z"
            fill="url(#shine)"
          />
          <path
            d="M85 62C113 56 143 88 177 77C199 70 223 56 244 72"
            fill="none"
            stroke="#effff6"
            strokeOpacity=".55"
            strokeWidth="4"
          />
        </svg>
        <div className="art-label">
          DENTAL EXPERTISE × ARTIFICIAL INTELLIGENCE
        </div>
        <div className="float-card card-top">
          <span className="icon-box">
            <Sparkles size={18} />
          </span>
          <div>
            <small>INTELLIGENT ACQUISITION</small>
            <strong>Right patients. Right practice.</strong>
          </div>
          <span className="live-dot" />
        </div>
        <div className="float-card card-bottom">
          <span className="icon-box">
            <Activity size={19} />
          </span>
          <div>
            <small>ALWAYS-ON FOLLOW-UP</small>
            <strong>Every opportunity, connected.</strong>
          </div>
          <span className="check-circle">
            <Check size={13} />
          </span>
        </div>
        <div className="art-coordinate">EX / 01 — GROWTH, REIMAGINED</div>
      </div>
      <a href="#possibilities" className="scroll-note">
        <ArrowDown size={14} /> A NEW PERSPECTIVE ON PRACTICE GROWTH
      </a>
      <span className="hero-index">01 / THE POSSIBILITIES</span>
    </section>
  );
}
