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
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="pt-32 pb-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-14">
        {/* Back Link */}
        <Link
          href="/campaigns"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0088B8] hover:underline transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies
        </Link>

        {/* Hero Header */}
        <ScrollReveal direction="up" distance={20} className="space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-semibold uppercase tracking-wider">
            <span className="px-2.5 py-0.5 rounded bg-white text-[#0088B8] border border-slate-200 text-[10px] font-semibold uppercase tracking-wider shadow-2xs">
              {(campaign.brandId as any)?.name || "Client"}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Film className="w-3.5 h-3.5 text-[#00B8F0]" />
              {campaign.campaignType}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#00B8F0]" />
              {campaign.location}
            </span>
          </div>

          <h1 className="font-anton text-4xl sm:text-6xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
            {campaign.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl">
            {campaign.objective}
          </p>
        </ScrollReveal>

        {/* Hero Image */}
        <ScrollReveal direction="up" distance={20}>
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-sm">
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
            <div className="p-6 sm:p-7 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-[#00B8F0]/10 text-[#0088B8] border border-[#00B8F0]/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]" />
                  <span>Verified Results</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 font-semibold uppercase">100% Audit Verified</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {campaign.results.map((res: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="font-anton text-3xl sm:text-4xl text-[#0088B8]">
                      <Counter value={res.value} />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0B1117] truncate">{res.metric}</div>
                    {res.label && <div className="text-[11px] text-slate-500 font-medium truncate">{res.label}</div>}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Detailed Strategy */}
        <ScrollReveal direction="up" distance={16}>
          <div className="space-y-5 text-[#0B1117] leading-relaxed text-sm sm:text-base bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-xs font-normal">
            <h2 className="font-anton text-2xl sm:text-3xl text-[#0B1117] uppercase tracking-tight">Execution Strategy</h2>
            <div className="whitespace-pre-line space-y-4 text-slate-600">
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
                    <div className="p-4 rounded-lg bg-white border border-slate-200/90 hover:border-[#00B8F0]/40 shadow-2xs hover:shadow-xs flex items-center gap-3.5 transition-all duration-150">
                      <img
                        src={c.profileImage}
                        alt={c.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#00B8F0]/30 shrink-0"
                      />
                      <div>
                        <h4 className="font-anton text-lg text-[#0B1117]">{c.name}</h4>
                        <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#00B8F0]" />
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
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-[#00B8F0]/10 text-[#0088B8] border border-[#00B8F0]/25">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]" />
              <span>Replicate Success</span>
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl text-[#0B1117] uppercase tracking-tight">
              Ready For Similar Results For Your Brand?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Submit your campaign goals and get custom creator suggestions tailored to your budget.
            </p>
          </ScrollReveal>
          <CampaignEnquiryForm />
        </div>
      </div>
    </div>
  );
}