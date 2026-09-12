import { getSettingsAction } from "@/actions/settings.actions";
import CampaignEnquiryForm from "@/components/forms/CampaignEnquiryForm";
import { Phone, Mail, MapPin, MessageSquare, Clock } from "lucide-react";
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal";
import { SectionBackground } from "@/components/motion/SectionBackground";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Us — VISTAR Influencer Marketing Agency",
  description:
    "Get in touch with the VISTAR team for brand partnerships, creator collaborations, and campaign proposals across Maharashtra.",
};

export default async function ContactPage() {
  const settings = await getSettingsAction();
  const rawPhone = settings.whatsappNumber ? settings.whatsappNumber.replace(/[^0-9]/g, "") : "";

  return (
    <div className="relative overflow-hidden">
      <SectionBackground variant="spotlight" intensity="subtle" />
      <div className="pt-36 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-16 relative z-10">
      {/* Header */}
      <ScrollReveal direction="up" distance={20} className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
          Get In Touch &bull; 24h Response Time
        </div>
        <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-[#111111] uppercase tracking-tight leading-[0.98]">
          Let's Build Your Next Campaign.
        </h1>
        <p className="text-sm sm:text-base text-stone-700 font-medium leading-relaxed">
          Have an upcoming launch or looking for creator matching in Maharashtra? Reach out to our
          team directly or submit a campaign brief below.
        </p>
      </ScrollReveal>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Direct Channels */}
        <ScrollReveal direction="up" distance={16} className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-stone-200/90 shadow-nickpat space-y-6">
            <h2 className="font-anton text-xl text-[#111111] uppercase tracking-wider">
              Direct Contact
            </h2>

            <div className="space-y-3 text-xs">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-3.5 text-stone-800 hover:text-[#B80F0A] transition-colors p-3.5 rounded-2xl bg-[#FCECDF]/30 border border-stone-200 hover:border-[#B80F0A]"
              >
                <div className="w-9 h-9 rounded-xl bg-[#B80F0A]/10 text-[#B80F0A] flex items-center justify-center shrink-0 border border-[#B80F0A]/20">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Phone Support</div>
                  <div className="font-bold text-sm text-[#111111]">{settings.phone}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${rawPhone}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 text-stone-800 hover:text-emerald-700 transition-colors p-3.5 rounded-2xl bg-[#FCECDF]/30 border border-stone-200 hover:border-emerald-500"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">WhatsApp Chat</div>
                  <div className="font-bold text-sm text-[#111111]">{settings.whatsappNumber}</div>
                </div>
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3.5 text-stone-800 hover:text-[#B80F0A] transition-colors p-3.5 rounded-2xl bg-[#FCECDF]/30 border border-stone-200 hover:border-[#B80F0A]"
              >
                <div className="w-9 h-9 rounded-xl bg-[#B80F0A]/10 text-[#B80F0A] flex items-center justify-center shrink-0 border border-[#B80F0A]/20">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Official Inquiries</div>
                  <div className="font-bold text-sm text-[#111111] truncate">{settings.email}</div>
                </div>
              </a>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-stone-200/90 shadow-nickpat space-y-3 text-xs">
            <div className="flex items-center gap-2 text-[#111111] font-bold text-sm">
              <MapPin className="w-4 h-4 text-[#B80F0A]" /> Operations & Head Office
            </div>
            <p className="text-stone-600 font-medium leading-relaxed">{settings.address}</p>
            <div className="flex items-center gap-2 pt-3 text-stone-500 font-medium text-[11px] border-t-2 border-stone-100">
              <Clock className="w-3.5 h-3.5 text-[#B80F0A]" /> Monday – Saturday, 9:30 AM – 7:00 PM IST
            </div>
          </div>
        </ScrollReveal>

        {/* Right Form */}
        <ScrollReveal direction="up" distance={16} delay={0.1} className="lg:col-span-2">
          <CampaignEnquiryForm />
        </ScrollReveal>
      </div>
      </div>
    </div>
  );
}