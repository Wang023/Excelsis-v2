"use client";
import Link from "next/link";
import BrandMark from "./BrandMark";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [["What we do", "what-we-do"], ["How it works", "how-it-works"], ["Why we’re different", "the-program"], ["Team", "team"], ["The math", "the-math"]];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="revival-header"><Link href="/" className="logo" aria-label="Excelsis Acquisition home"><BrandMark /> excelsis<span className="logo-dot">®</span></Link><nav id="main-navigation" aria-label="Main navigation" className={open ? "open" : ""}>{links.map(([label,id])=><Link key={id} href={"/#"+id} onClick={()=>setOpen(false)}>{label}</Link>)}</nav><Link className="button small nav-cta" href="/#contact">Get your Lead Leak Report <ArrowUpRight size={16}/></Link><button className="menu" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} aria-controls="main-navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></header>;
}
