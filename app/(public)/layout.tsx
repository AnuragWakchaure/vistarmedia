import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import FloatingWhatsApp from "@/components/public/FloatingWhatsApp";
import { PageTransition } from "@/components/animations/PageTransition";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FCECDF] flex flex-col text-[#111111]">
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
