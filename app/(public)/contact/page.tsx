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
    <div className="relative overflow-hidden bg-[#F3F6F8]">
      <SectionBackground variant="spotlight" intensity="subtle" />
      <div className="pt-36 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" distance={20} className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/30 text-[#009DFF] text-xs font-bold uppercase tracking-wider">
            Get In Touch &bull; 24h Response Time
          </div>
          <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
            Let's Build Your Next Campaign.
          </h1>
          <p className="text-sm sm:text-base text-[#64717C] font-medium leading-relaxed">
            Have an upcoming launch or looking for creator matching in Maharashtra? Reach out to our
            team directly or submit a campaign brief below.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Direct Channels */}
          <ScrollReveal direction="up" distance={16} className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-slate-200/90 shadow-[0_12px_40px_rgba(15,23,42,0.06)] space-y-6">
              <h2 className="font-anton text-xl text-[#0B1117] uppercase tracking-wider">
                Direct Contact
              </h2>

              <div className="space-y-3 text-xs">
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-3.5 text-[#0B1117] hover:text-[#009DFF] transition-colors p-3.5 rounded-2xl bg-[#EAF0F3] border border-slate-200 hover:border-[#00C8FF]"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#00C8FF]/10 text-[#009DFF] flex items-center justify-center shrink-0 border border-[#00C8FF]/30">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#64717C] font-bold uppercase tracking-wider">Phone Support</div>
                    <div className="font-bold text-sm text-[#0B1117]">{settings.phone}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${rawPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 text-[#0B1117] hover:text-emerald-600 transition-colors p-3.5 rounded-2xl bg-[#EAF0F3] border border-slate-200 hover:border-emerald-500"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/30 overflow-hidden">
                    <WhatsAppIcon className="w-5 h-5 rounded-full" size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#64717C] font-bold uppercase tracking-wider">WhatsApp Chat</div>
                    <div className="font-bold text-sm text-[#0B1117]">{settings.whatsappNumber}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3.5 text-[#0B1117] hover:text-[#009DFF] transition-colors p-3.5 rounded-2xl bg-[#EAF0F3] border border-slate-200 hover:border-[#00C8FF]"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#00C8FF]/10 text-[#009DFF] flex items-center justify-center shrink-0 border border-[#00C8FF]/30">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#64717C] font-bold uppercase tracking-wider">Official Inquiries</div>
                    <div className="font-bold text-sm text-[#0B1117] truncate">{settings.email}</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-slate-200/90 shadow-[0_12px_40px_rgba(15,23,42,0.06)] space-y-3 text-xs">
              <div className="flex items-center gap-2 text-[#0B1117] font-bold text-sm">
                <MapPin className="w-4 h-4 text-[#00C8FF]" /> Operations & Head Office
              </div>
              <p className="text-[#64717C] font-medium leading-relaxed">{settings.address}</p>
              <div className="flex items-center gap-2 pt-3 text-[#64717C] font-medium text-[11px] border-t border-slate-100">
                <Clock className="w-3.5 h-3.5 text-[#00C8FF]" /> Monday – Saturday, 9:30 AM – 7:00 PM IST
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