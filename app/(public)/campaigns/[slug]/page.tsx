import { connectDB } from "@/lib/db/client";
import { Campaign } from "@/models/Campaign";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Film } from "lucide-react";
import CampaignEnquiryForm from "@/components/forms/CampaignEnquiryForm";
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { Counter } from "@/components/animations/Counter";

export const dynamic = "force-dynamic";

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();

  const campaign = await Campaign.findOne({ slug, status: "PUBLISHED" })
    .populate("brandId", "name logo website description")
    .populate("creatorIds", "name profileImage location totalFollowers")
    .lean();

  if (!campaign) return notFound();

  return (
    <div className="bg-[#F3F6F8] min-h-screen">
      <div className="pt-36 pb-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-16">
        {/* Back Link */}
        <Link
          href="/campaigns"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#009DFF] hover:underline transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies
        </Link>

        {/* Hero Header */}
        <ScrollReveal direction="up" distance={20} className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#64717C] font-bold uppercase tracking-wider">
            <span className="px-3.5 py-1 rounded-full bg-[#00C8FF]/10 text-[#009DFF] border border-[#00C8FF]/30 font-bold shadow-sm text-[11px]">
              {(campaign.brandId as any)?.name || "Client"}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Film className="w-3.5 h-3.5 text-[#00C8FF]" />
              {campaign.campaignType}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#00C8FF]" />
              {campaign.location}
            </span>
          </div>

          <h1 className="font-anton text-4xl sm:text-6xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
            {campaign.title}
          </h1>

          <p className="text-base sm:text-lg text-[#64717C] font-medium leading-relaxed max-w-3xl">
            {campaign.objective}
          </p>
        </ScrollReveal>

        {/* Hero Image */}
        <ScrollReveal direction="up" distance={20}>
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-[#EAF0F3] border border-slate-200/90 shadow-xl shadow-slate-900/5">
            <img
              src={campaign.coverImage}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
          </div>
        </ScrollReveal>

        {/* Case Study Results Grid */}
        {campaign.results && campaign.results.length > 0 && (
          <ScrollReveal direction="up" distance={16}>
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-slate-200/90 shadow-[0_12px_40px_rgba(15,23,42,0.06)] space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/30 text-[#009DFF] text-xs font-bold uppercase tracking-wider">
                  Verified Results
                </div>
                <span className="text-[11px] font-mono text-[#64717C] font-semibold uppercase">100% Audit Verified</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                {campaign.results.map((res: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#EAF0F3] border border-slate-200/80 space-y-0.5">
                    <div className="font-anton text-3xl sm:text-4xl text-[#009DFF]">
                      <Counter value={res.value} />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0B1117] truncate">{res.metric}</div>
                    {res.label && <div className="text-[11px] text-[#64717C] font-medium truncate">{res.label}</div>}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Detailed Strategy */}
        <ScrollReveal direction="up" distance={16}>
          <div className="space-y-6 text-[#0B1117] leading-relaxed text-sm sm:text-base bg-[#FFFFFF] p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-[0_12px_40px_rgba(15,23,42,0.06)] font-medium">
            <h2 className="font-anton text-2xl sm:text-3xl text-[#0B1117] uppercase tracking-tight">Execution Strategy</h2>
            <div className="whitespace-pre-line space-y-4 text-[#64717C]">
              {campaign.description}
            </div>
          </div>
        </ScrollReveal>

        {/* Creators Attached */}
        {campaign.creatorIds && campaign.creatorIds.length > 0 && (
          <div className="space-y-6">
            <ScrollReveal direction="up" distance={16}>
              <h2 className="font-anton text-2xl sm:text-3xl text-[#0B1117] uppercase tracking-tight">Featured Campaign Creators</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" staggerChildren={0.06} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {campaign.creatorIds.map((c: any) => (
                <ScrollRevealItem key={c._id}>
                  <AnimatedCard>
                    <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-slate-200/90 hover:border-[#00C8FF]/50 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex items-center gap-3.5 transition-all duration-200">
                      <img
                        src={c.profileImage}
                        alt={c.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#00C8FF]/40 shrink-0"
                      />
                      <div>
                        <h4 className="font-anton text-lg text-[#0B1117]">{c.name}</h4>
                        <span className="text-xs text-[#64717C] font-semibold flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#00C8FF]" />
                          {c.location}
                        </span>
                      </div>
                    </div>
                  </AnimatedCard>
                </ScrollRevealItem>
              ))}
            </ScrollReveal>
          </div>
        )}

        {/* Bottom Campaign Conversion Form */}
        <div className="pt-10 border-t border-slate-200/80 space-y-8">
          <ScrollReveal direction="up" distance={16} className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/30 text-[#009DFF] text-xs font-bold uppercase tracking-wider">
              Replicate Success
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl text-[#0B1117] uppercase tracking-tight">
              Ready For Similar Results For Your Brand?
            </h2>
            <p className="text-xs sm:text-sm text-[#64717C] font-medium leading-relaxed">
              Submit your campaign goals and get custom creator suggestions tailored to your budget.
            </p>
          </ScrollReveal>
          <CampaignEnquiryForm />
        </div>
      </div>
    </div>
  );
}