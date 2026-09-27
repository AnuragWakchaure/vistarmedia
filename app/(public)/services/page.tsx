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
    <div className="relative overflow-hidden bg-[#F8FAFC]">
      <SectionBackground variant="spotlight" intensity="subtle" />
      <div className="pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" distance={20} className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-[#00B8F0]/10 text-[#0088B8] border border-[#00B8F0]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]" />
            <span>Full Agency Capabilities</span>
          </div>
          <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
            Comprehensive Creator Solutions Built For Scale.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
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
                  <div className="rounded-xl bg-white border border-slate-200/90 hover:border-[#00B8F0]/40 shadow-xs hover:shadow-md transition-all duration-150 flex flex-col justify-between h-full group overflow-hidden">
                    {/* Visual Image Header */}
                    <div className="relative h-56 sm:h-60 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={srv.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Gradient overlay for blending */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                      {/* Header overlay chips */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-0.5 rounded bg-white/95 backdrop-blur-md text-[#0088B8] text-[10px] font-semibold uppercase tracking-wider border border-slate-200 shadow-2xs">
                          {tag}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/90 backdrop-blur-md text-slate-900 font-mono text-[10px] font-bold uppercase border border-slate-200">
                          {(idx + 1).toString().padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="font-anton text-2xl text-[#0B1117] group-hover:text-[#0088B8] transition-colors leading-tight">
                          {srv.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                          {srv.shortDescription}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs font-semibold text-slate-600">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#00B8F0] shrink-0" />
                          <span className="text-[#0B1117]">Managed end-to-end across Maharashtra</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#0088B8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
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
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-[#00B8F0]/10 text-[#0088B8] border border-[#00B8F0]/25">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]" />
              <span>Custom Proposals</span>
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl text-[#0B1117] uppercase tracking-tight">
              Need A Customized Agency Proposal?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
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