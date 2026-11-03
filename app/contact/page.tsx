import ContactForm from "@/components/sections/ContactForm";
import { content } from "../content";
export const metadata = { title: "Your free Lead Leak Report" };
export default function Page() {return <section className="revival-section report-layout standalone-report"><div><div className="eyebrow">FIND. REVIVE. FILL.</div><h1>Find out what your old leads are worth.</h1><p className="section-copy">{content.closing}</p></div><ContactForm/></section>}
