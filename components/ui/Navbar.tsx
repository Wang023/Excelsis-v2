"use client";

import Link from "next/link";
import BrandMark from "./BrandMark";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";

const links = [["What we do", "what-we-do"], ["How it works", "how-it-works"], ["Why we’re different", "the-program"], ["Team", "team"], ["The math", "the-math"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return <header ref={headerRef} className="revival-header">
    <Link href="/" className="logo" aria-label="Excelsis Acquisition home"><BrandMark /> excelsis<span className="logo-dot">®</span></Link>
    <nav id="main-navigation" aria-label="Main navigation" className={open ? "open" : ""}>
      {links.map(([label, id], index) => <Link key={id} href={"/#" + id} style={{ "--nav-delay": `${index * 35}ms` } as CSSProperties} onClick={() => setOpen(false)}>{label}</Link>)}
    </nav>
    <Link className="button small nav-cta" href="/#contact">Get your Lead Leak Report <ArrowUpRight size={16} /></Link>
    <button ref={toggleRef} className="menu" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
      <span className="menu-icon" aria-hidden="true"><span /><span /><span /></span>
    </button>
  </header>;
}
