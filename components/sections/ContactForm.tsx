"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function ContactForm() {
  const [draft, setDraft] = useState("");
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
  function downloadDraft() {
    const url = URL.createObjectURL(new Blob([draft], {type:"text/plain"}));
    const a = document.createElement("a"); a.href=url; a.download="excelsis-lead-leak-report-request.txt"; a.click(); URL.revokeObjectURL(url);
  }
  return <form className="form-panel report-form" onSubmit={event=>{
    event.preventDefault(); const data=new FormData(event.currentTarget);
    const body=`Lead Leak Report request\n\nName: ${data.get("name")}\nPractice: ${data.get("practice")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nMonthly Invisalign inquiries: ${data.get("inquiries")}`;
    setDraft(body);
    if(email) window.location.href=`mailto:${email}?subject=${encodeURIComponent("Free Lead Leak Report request")}&body=${encodeURIComponent(body)}`;
  }}><div className="form-row"><label>Your name<input name="name" autoComplete="name" required maxLength={100} placeholder="Your full name"/></label><label>Practice name<input name="practice" autoComplete="organization" required maxLength={160} placeholder="Your practice"/></label></div><div className="form-row"><label>Email<input name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@yourpractice.com"/></label><label>Phone<input name="phone" type="tel" autoComplete="tel" required maxLength={40} placeholder="Your phone number"/></label></div><label>Roughly how many Invisalign inquiries do you get a month?<input type="number" min="0" step="1" name="inquiries" required placeholder="e.g. 30"/></label><p className="form-note">Please don’t include patient or medical information. <Link href="/privacy">Privacy policy ↗</Link></p><button className="button" type="submit">Get my Lead Leak Report <ArrowUpRight size={19}/></button><p className="report-reassurance">You’ll get real numbers, not a sales pitch.</p><p className="form-note">{email?"Opens your email app. Review and send your request there.":"[Business email coming] Prepare and download your request. Nothing is sent from this preview."}</p>{draft&&<div className="draft-result" role="status"><h3>{email?"Your request is ready to email.":"Your request draft is ready."}</h3><p className="form-note">{email?"Send it from your email app to complete your request.":"Nothing has been sent. Download your draft to keep it until our contact details are available."}</p><textarea aria-label="Your Lead Leak Report request draft" readOnly rows={8} value={draft}/><button type="button" className="button" onClick={downloadDraft}>Download my request</button></div>}</form>;
}
