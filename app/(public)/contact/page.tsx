import { getSettingsAction } from "@/actions/settings.actions";
import CampaignEnquiryForm from "@/components/forms/CampaignEnquiryForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
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
    <div className="relative overflow-hidden bg-[#F8FAFC]">
      <SectionBackground variant="grid" intensity="minimal" />
      <div className="pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" distance={20} className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-[#00B8F0]/10 text-[#0088B8] border border-[#00B8F0]/25">
            Get In Touch &bull; 24h Response
          </div>
          <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
            Let&apos;s Build Your Next Campaign.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Planning a regional launch or looking for creator matching in Maharashtra? Reach out to our
            team directly or submit a campaign brief below.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Direct Channels */}
          <ScrollReveal direction="up" distance={16} className="space-y-5">
            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Direct Contact
              </h2>

              <div className="space-y-2.5 text-xs">
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-3 text-slate-800 hover:text-[#0088B8] transition-colors p-3 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-[#00B8F0]/40"
                >
                  <div className="w-8 h-8 rounded-md bg-[#00B8F0]/10 text-[#0088B8] flex items-center justify-center shrink-0 border border-[#00B8F0]/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Phone Support</div>
                    <div className="font-semibold text-xs sm:text-sm text-slate-900">{settings.phone}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${rawPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-slate-800 hover:text-emerald-600 transition-colors p-3 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-emerald-500/40"
                >
                  <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 overflow-hidden">
                    <WhatsAppIcon className="w-4 h-4 rounded-full" size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">WhatsApp Chat</div>
                    <div className="font-semibold text-xs sm:text-sm text-slate-900">{settings.whatsappNumber}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 text-slate-800 hover:text-[#0088B8] transition-colors p-3 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-[#00B8F0]/40"
                >
                  <div className="w-8 h-8 rounded-md bg-[#00B8F0]/10 text-[#0088B8] flex items-center justify-center shrink-0 border border-[#00B8F0]/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Official Inquiries</div>
                    <div className="font-semibold text-xs sm:text-sm text-slate-900 truncate">{settings.email}</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs sm:text-sm">
                <MapPin className="w-4 h-4 text-[#00B8F0]" /> Operations & Head Office
              </div>
              <p className="text-slate-600 font-normal leading-relaxed">{settings.address}</p>
              <div className="flex items-center gap-2 pt-3 text-slate-500 font-medium text-[11px] border-t border-slate-100">
                <Clock className="w-3.5 h-3.5 text-[#00B8F0]" /> Monday – Saturday, 9:30 AM – 7:00 PM IST
              </div>
            </div>
          </ScrollReveal>

          {/* Right Campaign Form */}
          <div className="lg:col-span-2">
            <CampaignEnquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}