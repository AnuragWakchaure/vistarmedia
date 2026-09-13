import Link from "next/link";
import { getSettingsAction } from "@/actions/settings.actions";
import { Phone, Mail, ArrowUpRight } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default async function Footer() {
  const settings = await getSettingsAction();
  const rawPhone = settings.whatsappNumber ? settings.whatsappNumber.replace(/[^0-9]/g, "") : "";

  return (
    <footer className="bg-gradient-to-b from-[#05080D] via-[#07111A] to-[#04060A] border-t border-cyan-500/15 pt-16 pb-8 px-4 sm:px-6 relative overflow-hidden select-none">
      {/* Soft Ambient Background Glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/5 blur-[120px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Top Minimalist Brand & Action Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 border-b border-white/10">
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-3 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="VISTAR"
                width={140}
                height={36}
                loading="lazy"
                decoding="async"
                className="h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,200,255,0.3)]"
              />
            </Link>
            <p className="text-xs text-slate-400 font-normal max-w-md leading-relaxed">
              Your Brand. Our Creators. Bigger Reach. Maharashtra&apos;s regional influencer marketing agency.
            </p>
          </div>

          {/* Quick CTA Button */}
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={`https://wa.me/${rawPhone}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 hover:bg-[#00C8FF] text-[#00C8FF] hover:text-[#05080D] border border-cyan-500/30 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(0,200,255,0.12)]"
            >
              <WhatsAppIcon className="w-4 h-4 rounded-full shrink-0" size={16} />
              <span>Chat on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#00C8FF]" />
            </Link>
          </div>
        </div>

        {/* Middle Navigation & Direct Channels Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-xs font-semibold text-slate-400">
          {/* Minimalist Horizontal Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 uppercase tracking-wider">
            <Link href="/" className="hover:text-[#00C8FF] transition-colors">
              Home
            </Link>
            <Link href="/services" className="hover:text-[#00C8FF] transition-colors">
              Services
            </Link>
            <Link href="/#creators" className="hover:text-[#00C8FF] transition-colors">
              Categories
            </Link>
            <Link href="/campaigns" className="hover:text-[#00C8FF] transition-colors">
              Case Studies
            </Link>
            <Link href="/about" className="hover:text-[#00C8FF] transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-[#00C8FF] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Contact Details */}
          <div className="flex flex-wrap items-center gap-5 text-slate-400 text-xs">
            {settings.phone && (
              <a href={`tel:${settings.phone}`} className="flex items-center gap-1.5 hover:text-[#00C8FF] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#00C8FF]" />
                <span className="font-bold text-slate-200">{settings.phone}</span>
              </a>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 hover:text-[#00C8FF] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#00C8FF]" />
                <span className="text-slate-300">{settings.email}</span>
              </a>
            )}
            <span className="text-[11px] font-bold text-[#00C8FF] bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
              Pune &bull; Mumbai &bull; Maharashtra
            </span>
          </div>
        </div>

        {/* Giant Watermark Agency Typography */}
        <div className="pt-8 text-center pointer-events-none overflow-hidden">
          <span className="font-anton text-[70px] sm:text-[120px] md:text-[160px] text-white/[0.02] tracking-tight leading-none uppercase block select-none">
            VISTAR MEDIA
          </span>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-medium gap-3">
          <div>&copy; 2026 VISTAR MEDIA. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}