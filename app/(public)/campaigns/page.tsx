import { connectDB } from "@/lib/db/client";
import { Campaign } from "@/models/Campaign";
import "@/models/Brand";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { SectionBackground } from "@/components/motion/SectionBackground";

export const dynamic = "force-dynamic";

export default async function CampaignsDirectoryPage() {
  await connectDB();

  const campaigns = await Campaign.find({ status: "PUBLISHED" })
    .populate("brandId", "name logo")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="relative overflow-hidden bg-[#F8FAFC]">
      <SectionBackground variant="spotlight" intensity="subtle" />
      <div className="pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12 relative z-10">
        <ScrollReveal direction="up" distance={20} className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-[#00B8F0]/10 text-[#0088B8] border border-[#00B8F0]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]" />
            <span>Verified Impact &bull; Case Studies</span>
          </div>
          <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
            Client Campaigns & Case Studies
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Explore how VISTAR executes creator-led regional marketing for enterprise and high-growth brands in Maharashtra.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {campaigns.map((camp: any) => (
            <ScrollRevealItem key={camp._id}>
              <AnimatedCard className="h-full">
                <div className="rounded-xl bg-white border border-slate-200/90 hover:border-[#00B8F0]/40 overflow-hidden shadow-xs hover:shadow-md transition-all duration-150 flex flex-col justify-between h-full group">
                  <div className="h-60 relative bg-slate-100 overflow-hidden">
                    <img
                      src={camp.coverImage}
                      alt={camp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded bg-white/95 backdrop-blur-md text-[#0088B8] text-[10px] font-semibold uppercase tracking-wider border border-slate-200 shadow-2xs">
                        {camp.brandId?.name || "Client"} &bull; {camp.industry}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-anton text-2xl text-[#0B1117] group-hover:text-[#0088B8] transition-colors leading-tight">
                        {camp.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed line-clamp-3">
                        {camp.objective}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#00B8F0]" />
                        {camp.location}
                      </span>
                      <Link
                        href={`/campaigns/${camp.slug}`}
                        className="text-xs text-[#0088B8] font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:underline"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-4 h-4 text-[#00B8F0]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </ScrollRevealItem>
          ))}
        </ScrollReveal>
      </div>
    </div>
  );
}