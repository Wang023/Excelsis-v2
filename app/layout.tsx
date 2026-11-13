import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BackToTop from "@/components/ui/BackToTop";
import "./globals.css";
import "./revival.css";
import "./palette.css";
import "./hero-console.css";
import "./founding.css";
import "./roadmap.css";
import "./audit-form.css";
export const metadata: Metadata = {
  title: {
    default: "Excelsis Acquisition — Start more Invisalign cases.",
    template: "%s | Excelsis",
  },
  description:
    "The 90-Day Invisalign Case-Start System. Revive unstarted plans, respond to inquiries, and turn more consults into started treatment. Get your free Invisalign Lead-Leak Audit.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <ScrollReveal />
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
