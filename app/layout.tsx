import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import "./globals.css";
import "./revival.css";
export const metadata: Metadata = {
  title: {
    default: "Excelsis Acquisition — Consults, not clicks.",
    template: "%s | Excelsis",
  },
  description:
    "We turn your unbooked Invisalign leads into booked consults, then keep your calendar full with Meta ads. Find. Revive. Fill.",
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
        <Footer />
      </body>
    </html>
  );
}
