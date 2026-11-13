"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, Check, Download, Mail, Phone, TrendingUp, UserRound } from "lucide-react";

const questions = [
  { name: "name", label: "What’s your name?", helper: "Let’s start with you.", placeholder: "Your full name", type: "text", autoComplete: "name", maxLength: 100, icon: UserRound },
  { name: "practice", label: "What’s your practice called?", helper: "The dental practice you’d like us to look at.", placeholder: "Your practice name", type: "text", autoComplete: "organization", maxLength: 160, icon: Building2 },
  { name: "email", label: "What’s your email address?", helper: "Use the best email for your audit request.", placeholder: "you@yourpractice.com", type: "email", autoComplete: "email", maxLength: 200, icon: Mail },
  { name: "phone", label: "What’s the best phone number?", helper: "Your practice or direct contact number.", placeholder: "Your phone number", type: "tel", autoComplete: "tel", maxLength: 40, icon: Phone },
  { name: "inquiries", label: "How many Invisalign inquiries do you get a month?", helper: "A rough estimate is fine. Enter 0 if you’re just getting started.", placeholder: "e.g. 30", type: "number", autoComplete: "off", icon: TrendingUp },
] as const;

type Answers = Record<(typeof questions)[number]["name"], string>;

export default function ContactForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ name: "", practice: "", email: "", phone: "", inquiries: "" });
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const fieldRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const focusRequested = useRef(false);
  const id = useId();
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
  const question = questions[step];
  const Icon = question.icon;
  const isLast = step === questions.length - 1;

  useEffect(() => {
    if (focusRequested.current) {
      if (draft) resultRef.current?.focus({ preventScroll: true });
      else fieldRef.current?.focus({ preventScroll: true });
      focusRequested.current = false;
    }
  }, [step, draft]);

  function moveTo(next: number) {
    setError("");
    focusRequested.current = true;
    setStep(next);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = fieldRef.current;
    if (!input) return;
    if (!input.checkValidity() || !answers[question.name].trim()) {
      setError(input.validationMessage || "Please enter an answer before continuing.");
      input.focus({ preventScroll: true });
      return;
    }
    if (!isLast) { moveTo(step + 1); return; }

    const body = `Invisalign Lead-Leak Audit request\n\nName: ${answers.name.trim()}\nPractice: ${answers.practice.trim()}\nEmail: ${answers.email.trim()}\nPhone: ${answers.phone.trim()}\nMonthly Invisalign inquiries: ${answers.inquiries}`;
    focusRequested.current = true;
    setDraft(body);
    if (email) window.location.href = `mailto:${email}?subject=${encodeURIComponent("Free Invisalign Lead-Leak Audit request")}&body=${encodeURIComponent(body)}`;
  }

  function downloadDraft() {
    const url = URL.createObjectURL(new Blob([draft], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "excelsis-invisalign-lead-leak-audit-request.txt";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <form className="form-panel report-form audit-wizard" onSubmit={submit} noValidate>
    <div className="audit-wizard-header">
      <span className="audit-eyebrow">YOUR FREE AUDIT</span>
      <span className="audit-step-count" aria-live="polite">{draft ? "Details complete" : `Question ${step + 1} of ${questions.length}`}</span>
    </div>
    <progress className="audit-progress" aria-label="Audit request progress" max={questions.length} value={draft ? questions.length : step + 1} />

    {draft ? <div className="audit-success">
      <span className="audit-question-icon" aria-hidden="true"><Check size={28} /></span>
      <h3 ref={resultRef} tabIndex={-1}>{email ? "Your request is ready to email." : "Your request draft is ready."}</h3>
      <p>{email ? "Review and send it from your email app to complete your request." : "Nothing has been sent. Download your request to keep it until our contact details are available."}</p>
      <button type="button" className="button" onClick={downloadDraft}>Download my request <Download size={18} aria-hidden="true" /></button>
      <details className="audit-review"><summary>Review your request</summary><textarea aria-label="Your Invisalign Lead-Leak Audit request draft" readOnly rows={8} value={draft} /></details>
      <button type="button" className="audit-text-button" onClick={() => {
        focusRequested.current = true;
        setDraft("");
        setStep(0);
      }}><ArrowLeft size={15} aria-hidden="true" /> Edit my answers</button>
    </div> : <>
      <div className="audit-question" key={question.name}>
        <span className="audit-question-icon" aria-hidden="true"><Icon size={26} strokeWidth={1.5} /></span>
        <label htmlFor={`${id}-answer`}>{question.label}</label>
        <p id={`${id}-hint`} className="audit-question-hint">{question.helper}</p>
        <input
          ref={fieldRef}
          id={`${id}-answer`}
          name={question.name}
          type={question.type}
          autoComplete={question.autoComplete}
          maxLength={"maxLength" in question ? question.maxLength : undefined}
          min={question.type === "number" ? 0 : undefined}
          step={question.type === "number" ? 1 : undefined}
          inputMode={question.type === "number" ? "numeric" : undefined}
          enterKeyHint={isLast ? "done" : "next"}
          placeholder={question.placeholder}
          required
          value={answers[question.name]}
          aria-describedby={`${id}-hint${error ? ` ${id}-error` : ""}`}
          aria-invalid={!!error}
          onChange={(event) => {
            setAnswers((previous) => ({ ...previous, [question.name]: event.target.value }));
            if (error) setError("");
          }}
        />
        <div className="audit-error-space">{error && <p id={`${id}-error`} role="alert" className="audit-error">{error}</p>}</div>
      </div>
      <div className="audit-actions">
        {step > 0 && <button type="button" className="audit-back" onClick={() => moveTo(step - 1)}><ArrowLeft size={17} aria-hidden="true" /> Back</button>}
        <button className="button audit-next" type="submit">{isLast ? "Get your free audit" : "Continue"}{isLast ? <ArrowUpRight size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}</button>
      </div>
      <p className="audit-enter-hint">{isLast ? "Your details are ready to prepare." : "You can also press Enter to continue."}</p>
      <p className="report-reassurance">You’ll get real numbers, not a sales pitch.</p>
      <p className="form-note audit-delivery-note">{email ? "The final step opens your email app. Review and send your request there." : "[Business email coming] The final step prepares a downloadable request. Nothing is sent from this preview."}</p>
    </>}
    <p className="form-note audit-privacy">Please don’t include patient or medical information. <Link href="/privacy">Privacy policy ↗</Link></p>
  </form>;
}
