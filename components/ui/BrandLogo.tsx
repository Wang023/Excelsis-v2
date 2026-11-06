import Image from "next/image";
import logo from "@/public/branding/excelsis-logo.png";

export default function BrandLogo() {
  return <Image src={logo} alt="Excelsis" className="brand-logo" sizes="(max-width: 540px) 174px, 216px" priority />;
}
