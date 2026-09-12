import Link from "next/link";
import { getSettingsAction } from "@/actions/settings.actions";
import { Phone, Mail, MessageSquare, ArrowUpRight, MapPin } from "lucide-react";

export default async function Footer() {
  const settings = await getSettingsAction();
  const rawPhone = settings.whatsappNumber ? settings.whatsappNumber.replace(/[^0-9]/g, "") : "";

  return (
    <footer className="bg-white border-t-2 border-stone-200/90 pt-16 pb-8 px-4 sm:px-6 relative overflow-hidden select-none">
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Top Minimalist Brand & Action Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 border-b border-stone-100">
          <div className="space-y-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-[#B80F0A] border-2 border-[#960C08] flex items-center justify-center font-black text-white text-sm shadow-xs">
                V
              </div>
              <span className="font-anton text-2xl tracking-wider text-[#111111]">
                VISTAR
              </span>
            </Link>
            <p className="text-xs text-stone-600 font-medium max-w-md leading-relaxed">
              Your Brand. Our Creators. Bigger Reach. Maharashtra's regional influencer marketing agency.
            </p>
          </div>

          {/* Quick CTA Button */}
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={`https://wa.me/${rawPhone}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#B80F0A] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#FBCB77]" />
              <span>Chat on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 text-[#111111] border-2 border-stone-200 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Start Campaign</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Middle Navigation & Direct Channels Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-xs font-semibold text-stone-700">
          {/* Minimalist Horizontal Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 uppercase tracking-wider">
            <Link href="/" className="hover:text-[#B80F0A] transition-colors">
              Home
            </Link>
            <Link href="/services" className="hover:text-[#B80F0A] transition-colors">
              Services
            </Link>
            <Link href="/creators" className="hover:text-[#B80F0A] transition-colors">
              Our Creators
            </Link>
            <Link href="/campaigns" className="hover:text-[#B80F0A] transition-colors">
              Case Studies
            </Link>
            <Link href="/about" className="hover:text-[#B80F0A] transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-[#B80F0A] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Contact Details */}
          <div className="flex flex-wrap items-center gap-5 text-stone-600 text-xs">
            {settings.phone && (
              <a href={`tel:${settings.phone}`} className="flex items-center gap-1.5 hover:text-[#B80F0A] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#B80F0A]" />
                <span className="font-bold">{settings.phone}</span>
              </a>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 hover:text-[#B80F0A] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#B80F0A]" />
                <span>{settings.email}</span>
              </a>
            )}
            <span className="text-[11px] font-bold text-[#B80F0A] bg-[#FCECDF] px-2.5 py-0.5 rounded-full border border-stone-200">
              Pune &bull; Mumbai &bull; Maharashtra
            </span>
          </div>
        </div>

        {/* Giant Watermark Agency Typography */}
        <div className="pt-8 text-center pointer-events-none overflow-hidden">
          <span className="font-anton text-[70px] sm:text-[120px] md:text-[160px] text-stone-900/[0.04] tracking-tight leading-none uppercase block select-none">
            VISTAR MEDIA
          </span>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-medium gap-3">
          <div>&copy; 2026 VISTAR MEDIA. All Rights Reserved.</div>
          <div className="flex items-center gap-6">
            <Link href="/admin/login" className="hover:text-[#B80F0A] transition-colors uppercase tracking-wider font-bold">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}