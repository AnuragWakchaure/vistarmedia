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
    <div className="relative overflow-hidden">
      <SectionBackground variant="spotlight" intensity="subtle" />
      <div className="pt-36 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12 relative z-10">
      <ScrollReveal direction="up" distance={20} className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
          Proven Agency Track Record &bull; Verified Impact
        </div>
        <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-[#111111] uppercase tracking-tight leading-[0.98]">
          Client Campaigns & Case Studies
        </h1>
        <p className="text-sm sm:text-base text-stone-700 font-medium leading-relaxed">
          Explore how VISTAR executes creator-led regional marketing for enterprise and high-growth brands in Maharashtra.
        </p>
      </ScrollReveal>

      <ScrollReveal direction="up" staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {campaigns.map((camp: any) => (
          <ScrollRevealItem key={camp._id}>
            <AnimatedCard className="h-full">
              <div className="rounded-3xl bg-white border-2 border-stone-200/90 hover:border-[#B80F0A] transition-colors duration-300 overflow-hidden flex flex-col justify-between h-full group shadow-nickpat hover:shadow-nickpat-lg">
                <div className="h-64 relative bg-stone-100 overflow-hidden">
                  <img
                    src={camp.coverImage}
                    alt={camp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#B80F0A] text-[11px] font-bold uppercase tracking-wider border border-stone-200 shadow-sm">
                      {camp.brandId?.name || "Client"} &bull; {camp.industry}
                    </span>
                  </div>
                </div>
                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-anton text-2xl text-[#111111] group-hover:text-[#B80F0A] transition-colors leading-tight">
                      {camp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed line-clamp-3">
                      {camp.objective}
                    </p>
                  </div>

                  <div className="pt-4 border-t-2 border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#B80F0A]" />
                      {camp.location}
                    </span>
                    <Link
                      href={`/campaigns/${camp.slug}`}
                      className="text-xs text-[#B80F0A] font-extrabold uppercase tracking-wider inline-flex items-center gap-1 hover:underline"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
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
