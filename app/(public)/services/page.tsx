import { connectDB } from "@/lib/db/client";
import { Service } from "@/models/Service";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import CampaignEnquiryForm from "@/components/forms/CampaignEnquiryForm";
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { SectionBackground } from "@/components/motion/SectionBackground";
import {
  DEFAULT_SERVICES,
  SERVICE_IMAGE_MAP,
  SERVICE_TAG_MAP,
  DEFAULT_FALLBACK_IMAGE,
} from "@/lib/data/services-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services — VISTAR Influencer Marketing Agency",
  description:
    "End-to-end influencer marketing, vernacular creator campaigns, UGC production, and regional event activations across Maharashtra.",
};

export default async function ServicesPage() {
  let services: any[] = [];
  try {
    await connectDB();
    services = await Service.find({ status: "ACTIVE" })
      .sort({ displayOrder: 1 })
      .lean();
  } catch (e) {
    console.warn("[ServicesPage] Failed to fetch from DB, using defaults:", e);
  }

  const displayServices = services && services.length > 0 ? services : DEFAULT_SERVICES;

  return (
    <div className="relative overflow-hidden bg-[#F3F6F8]">
      <SectionBackground variant="spotlight" intensity="subtle" />
      <div className="pt-36 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-20 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" distance={20} className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/30 text-[#009DFF] text-xs font-bold uppercase tracking-wider">
            What We Do &bull; Full Agency Capabilities
          </div>
          <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
            Comprehensive Creator Solutions Built For Scale.
          </h1>
          <p className="text-sm sm:text-base text-[#64717C] font-medium leading-relaxed">
            From grassroots vernacular activations in rural heartlands to high-production metro brand
            campaigns, VISTAR manages your entire influencer marketing lifecycle.
          </p>
        </ScrollReveal>

        {/* Dynamic Services Grid with Rich Imagery */}
        <ScrollReveal direction="up" staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayServices.map((srv: any, idx: number) => {
            const imageUrl = srv.image || SERVICE_IMAGE_MAP[srv.slug] || DEFAULT_FALLBACK_IMAGE;
            const tag = SERVICE_TAG_MAP[srv.slug] || "Agency Capability";

            return (
              <ScrollRevealItem key={srv._id?.toString() || idx}>
                <AnimatedCard className="h-full">
                  <div className="rounded-3xl bg-[#FFFFFF] border border-slate-200/90 hover:border-[#00C8FF]/60 shadow-[0_12px_40px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_45px_rgba(0,200,255,0.15)] transition-all duration-300 flex flex-col justify-between h-full group overflow-hidden">
                    {/* Visual Image Header */}
                    <div className="relative h-60 sm:h-64 w-full bg-[#EAF0F3] overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={srv.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Gradient overlay for blending */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Header overlay chips */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                        <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#009DFF] text-[11px] font-extrabold uppercase tracking-wider border border-[#00C8FF]/30 shadow-md">
                          {tag}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[10px] font-bold uppercase border border-white/20">
                          {(idx + 1).toString().padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-7 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <h3 className="font-anton text-2xl sm:text-3xl text-[#0B1117] group-hover:text-[#009DFF] transition-colors leading-tight">
                          {srv.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#64717C] font-medium leading-relaxed">
                          {srv.shortDescription}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs font-bold text-[#64717C]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#00C8FF] shrink-0" />
                          <span className="text-[#0B1117]">Managed end-to-end across Maharashtra</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#64717C] group-hover:text-[#009DFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </ScrollRevealItem>
            );
          })}
        </ScrollReveal>

        {/* Conversion Section */}
        <div className="pt-12 border-t border-slate-200/80 space-y-10">
          <ScrollReveal direction="up" distance={16} className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/30 text-[#009DFF] text-xs font-bold uppercase tracking-wider">
              Custom Proposals
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl text-[#0B1117] uppercase tracking-tight">
              Need A Customized Agency Proposal?
            </h2>
            <p className="text-xs sm:text-sm text-[#64717C] font-medium leading-relaxed">
              Tell us about your brand targets and our strategy team will assemble a tailored creator plan.
            </p>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <CampaignEnquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}