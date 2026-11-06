const services = [
  { title: "7-Day Unstarted Plan Sprint", body: "We call and email every patient who was shown an Invisalign plan and never started, and book them back into your schedule." },
  { title: "60-Second Response System", body: "Every inquiry answered in under a minute, including nights and weekends, so no patient waits long enough to call someone else." },
  { title: "72-Hour Show-Up System", body: "Consults booked within 72 hours, confirmed, and prepared with a short video and financing pre-qualification before they arrive." },
  { title: "Questions-Not-Pressure Consult Playbook", body: "A one-page consult script, objection card and recorded trainings for your treatment coordinator, so more consults start treatment." },
  { title: '"Think-About-It" Follow-Up Engine', body: "Same-day recaps, follow-up matched to each patient’s concern, financing backup and e-sign, so undecided patients don’t go cold." },
  { title: "Invisalign Demand Engine", body: "Invisalign Meta ads on your current budget, feeding straight into the systems above." },
  { title: "Daily Owner Scoreboard", body: "A text every time a consult is booked, a live dashboard from inquiry to started case, and a weekly report." },
] as const;

export const content = {
  hero: {
    headline: "Start more Invisalign cases from the inquiries you're already paying for.",
    subheadline: "Founding Practice: The 90-Day Invisalign Case-Start System. We revive your unstarted Invisalign plans and old inquiries so you see confirmed consults in 7 days, answer every new inquiry in under 60 seconds day or night, follow up until they book, make sure they show up, run your Invisalign Meta ads, and rebuild how your team runs consults so more of them start treatment.",
    cta: "Get your free Invisalign Lead-Leak Audit",
  },
  steps: [
    { title: "Day 1", body: "Every new inquiry starts getting a reply in under 60 seconds." },
    { title: "Day 3", body: "We’re calling and emailing patients who were shown an Invisalign plan and never started." },
    { title: "Day 7", body: "Confirmed plan-review consults on your calendar, plus your first report." },
    { title: "Day 30", body: "Your Invisalign ads are running into a follow-up system that books and confirms." },
    { title: "Day 90", body: "25 more attended Invisalign consults than you were getting before, or we keep working for free." },
  ],
  cards: services,
  program: services,
  teamDuties: [
    "Keep Invisalign consult slots open.",
    "Use the one-page consult script.",
    "Share how many cases start each week.",
    "Approve the message templates once.",
  ],
  audience: "General dental practices that already offer Invisalign, already run some marketing, and have chair time for more cases. If your schedule is already full, we’re not the right fit yet.",
  josh: "[Josh: 1 to 2 sentences with verified sales credentials, e.g. calls made, deals closed, reps trained.]",
  why: "Marketing that stops at the booked appointment leaves cases on the table. We stay through the consult.",
  guarantee: "25 more Invisalign consults that actually show up in 90 days, on top of what you already get, tracked on a live scoreboard and without adding work to your front desk, or we keep working for free until you do.",
  finePrint: "[Conditions apply; attorney review pending.]",
  questions: [
    { question: "Do we have to fire our current marketing agency?", answer: "No. We start with the patients and inquiries you already have, and work alongside whoever runs your marketing today." },
    { question: "How much work is this for my front desk?", answer: "Less than now. Follow-up, confirmations and after-hours replies run automatically. Your team keeps slots open and uses the script." },
    { question: "Is this HIPAA compliant?", answer: "We sign a business associate agreement before we touch any patient data, and every vendor that handles it does the same." },
    { question: "Will this annoy our patients?", answer: "You approve every message, messages are capped, and anyone who asks us to stop is removed from every channel immediately." },
    { question: "Do you run our ads?", answer: "Yes. The Invisalign Demand Engine starts once follow-up is converting, so new ad leads aren’t wasted." },
  ],
  closing: "We’re taking on [X] founding practices. Book your free Invisalign Lead-Leak Audit and we’ll show you, using your own last 90 days, how many Invisalign patients are slipping through and how fast we can bring them back.",
} as const;
