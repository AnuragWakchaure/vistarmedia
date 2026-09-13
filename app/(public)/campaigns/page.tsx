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
    <div className="relative overflow-hidden bg-[#F3F6F8]">
      <SectionBackground variant="spotlight" intensity="subtle" />
      <div className="pt-36 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12 relative z-10">
        <ScrollReveal direction="up" distance={20} className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/30 text-[#009DFF] text-xs font-bold uppercase tracking-wider">
            Proven Agency Track Record &bull; Verified Impact
          </div>
          <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
            Client Campaigns & Case Studies
          </h1>
          <p className="text-sm sm:text-base text-[#64717C] font-medium leading-relaxed">
            Explore how VISTAR executes creator-led regional marketing for enterprise and high-growth brands in Maharashtra.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {campaigns.map((camp: any) => (
            <ScrollRevealItem key={camp._id}>
              <AnimatedCard className="h-full">
                <div className="rounded-3xl bg-[#FFFFFF] border border-slate-200/90 hover:border-[#00C8FF]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between h-full group shadow-[0_12px_40px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_45px_rgba(0,200,255,0.15)]">
                  <div className="h-64 relative bg-[#EAF0F3] overflow-hidden">
                    <img
                      src={camp.coverImage}
                      alt={camp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1 rounded-full bg-[#FFFFFF]/95 backdrop-blur-sm text-[#009DFF] text-[11px] font-extrabold uppercase tracking-wider border border-[#00C8FF]/30 shadow-sm">
                        {camp.brandId?.name || "Client"} &bull; {camp.industry}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h3 className="font-anton text-2xl text-[#0B1117] group-hover:text-[#009DFF] transition-colors leading-tight">
                        {camp.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#64717C] font-medium leading-relaxed line-clamp-3">
                        {camp.objective}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#64717C] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#00C8FF]" />
                        {camp.location}
                      </span>
                      <Link
                        href={`/campaigns/${camp.slug}`}
                        className="text-xs text-[#009DFF] font-extrabold uppercase tracking-wider inline-flex items-center gap-1 hover:underline"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-4 h-4 text-[#009DFF]" />
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