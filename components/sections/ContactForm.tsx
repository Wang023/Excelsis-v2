"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const steps = [
  { title: "Tell us about your practice", description: "Let’s start with a quick introduction.", fields: ["name", "practice"] },
  { title: "How can we reach you?", description: "Add your contact details for your audit request.", fields: ["email", "phone"] },
  { title: "A little about your inquiries", description: "One last detail to help us understand your practice.", fields: ["inquiries"] },
] as const;

const fields = {
  name: { label: "Your name", type: "text", autoComplete: "name", maxLength: 100, placeholder: "Your full name" },
  practice: { label: "Practice name", type: "text", autoComplete: "organization", maxLength: 160, placeholder: "Your practice" },
  email: { label: "Email", type: "email", autoComplete: "email", maxLength: 200, placeholder: "you@yourpractice.com" },
  phone: { label: "Phone", type: "tel", autoComplete: "tel", maxLength: 40, placeholder: "Your phone number" },
  inquiries: { label: "Roughly how many Invisalign inquiries do you get a month?", type: "number", min: 0, step: 1, placeholder: "e.g. 30" },
};

export default function ContactForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ name: "", practice: "", email: "", phone: "", inquiries: "" });
  const [draft, setDraft] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const navigated = useRef(false);
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
  const current = steps[step];
  const lastStep = step === steps.length - 1;

  useEffect(() => {
    if (navigated.current) heading.current?.focus();
  }, [step]);

  function goToStep(next: number) {
    navigated.current = true;
    setDraft("");
    setStep(next);
  }

  function downloadDraft() {
    const url = URL.createObjectURL(new Blob([draft], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "excelsis-invisalign-lead-leak-audit-request.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return <form className="form-panel report-form" onSubmit={event => {
    event.preventDefault();
    if (!lastStep) {
      goToStep(step + 1);
      return;
    }
    const body = `Invisalign Lead-Leak Audit request\n\nName: ${values.name}\nPractice: ${values.practice}\nEmail: ${values.email}\nPhone: ${values.phone}\nMonthly Invisalign inquiries: ${values.inquiries}`;
    setDraft(body);
    if (email) window.location.href = `mailto:${email}?subject=${encodeURIComponent("Free Invisalign Lead-Leak Audit request")}&body=${encodeURIComponent(body)}`;
  }}>
    <div className="audit-progress">
      <p className="eyebrow" aria-live="polite" aria-atomic="true">Step {step + 1} of {steps.length}</p>
      <div className="audit-progress-track" role="progressbar" aria-label="Audit request progress" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step + 1}>
        {steps.map((item, index) => <span key={item.title} className={index <= step ? "is-complete" : ""} />)}
      </div>
    </div>
    <div className="audit-step" key={step}>
      <h2 ref={heading} tabIndex={-1}>{current.title}</h2>
      <p className="form-note">{current.description}</p>
      <div className={lastStep ? undefined : "form-row"}>
        {current.fields.map(name => {
          const { label, ...input } = fields[name];
          return <label key={name}>{label}<input {...input} name={name} required value={values[name]} onChange={event => {
            setValues(previous => ({ ...previous, [name]: event.target.value }));
            setDraft("");
          }} /></label>;
        })}
      </div>
    </div>
    <p className="form-note">Please don’t include patient or medical information. <Link href="/privacy">Privacy policy ↗</Link></p>
    <div className="audit-actions">
      {step > 0 && <button className="audit-back" type="button" onClick={() => goToStep(step - 1)}><ArrowLeft size={17} />Back</button>}
      <button className="button" type="submit">{lastStep ? "Get your free audit" : "Continue"}{lastStep ? <ArrowUpRight size={19} /> : <ArrowRight size={19} />}</button>
    </div>
    <p className="report-reassurance">You’ll get real numbers, not a sales pitch.</p>
    {lastStep && <p className="form-note">{email ? "Opens your email app. Review and send your request there." : "[Business email coming] Prepare and download your request. Nothing is sent from this preview."}</p>}
    {draft && <div className="draft-result" role="status"><h3>{email ? "Your request is ready to email." : "Your request draft is ready."}</h3><p className="form-note">{email ? "Send it from your email app to complete your request." : "Nothing has been sent. Download your draft to keep it until our contact details are available."}</p><textarea aria-label="Your Invisalign Lead-Leak Audit request draft" readOnly rows={8} value={draft} /><button type="button" className="button" onClick={downloadDraft}>Download my request</button></div>}
  </form>;
}

