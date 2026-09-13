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
    <div className="min-h-screen bg-[#F4F7F9] flex flex-col text-[#07111A]">
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
