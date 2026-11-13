import Link from "next/link";
import BrandLogo from "./BrandLogo";
export default function Footer() {
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "ganasehaki@gmail.com";
return <footer className="revival-footer"><div className="footer-top"><div><Link href="/" className="logo" aria-label="Excelsis Acquisition home"><BrandLogo /></Link><p>Excelsis Acquisition<br/>Find. Revive. Fill.</p></div><div className="footer-links"><span className="eyebrow">EXPLORE</span>{[["Your first 90 days","how-it-works"],["What we do","what-we-do"],["Your team","the-program"],["Questions","questions"],["Your free audit","contact"]].map(([label,id])=><Link key={id} href={"/#"+id}>{label}</Link>)}</div><div className="footer-contact"><span className="eyebrow">CONTACT</span><a href={`mailto:${email}`}>{email}</a></div></div><div className="footer-bottom"><span>© 2026 Excelsis Acquisition</span><Link href="/privacy">Privacy policy ↗</Link></div><p className="trademark-note">Invisalign is a trademark of Align Technology, Inc. Excelsis Acquisition is not affiliated with Align Technology. Meta is a trademark of Meta Platforms, Inc.</p></footer>;
}

