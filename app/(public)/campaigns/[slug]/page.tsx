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
    <div className="pt-36 pb-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-16">
      {/* Back Link */}
      <Link
        href="/campaigns"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B80F0A] hover:underline transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Case Studies
      </Link>

      {/* Hero Header */}
      <ScrollReveal direction="up" distance={20} className="space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 font-bold uppercase tracking-wider">
          <span className="px-3.5 py-1 rounded-full bg-white text-[#B80F0A] border-2 border-[#B80F0A]/30 font-bold shadow-sm text-[11px]">
            {(campaign.brandId as any)?.name || "Client"}
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <Film className="w-3.5 h-3.5 text-[#B80F0A]" />
            {campaign.campaignType}
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#B80F0A]" />
            {campaign.location}
          </span>
        </div>

        <h1 className="font-anton text-4xl sm:text-6xl text-[#111111] uppercase tracking-tight leading-[0.98]">
          {campaign.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-700 font-medium leading-relaxed max-w-3xl">
          {campaign.objective}
        </p>
      </ScrollReveal>

      {/* Hero Image */}
      <ScrollReveal direction="up" distance={20}>
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-stone-100 border-2 border-stone-200/90 shadow-nickpat-lg">
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
          <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-stone-200/90 shadow-nickpat space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCECDF] border border-[#B80F0A]/30 text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
              Verified Campaign Deliverables
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {campaign.results.map((res: any, idx: number) => (
                <div key={idx} className="space-y-1 p-4 rounded-2xl bg-[#FCECDF]/30 border border-stone-200">
                  <div className="font-anton text-3xl sm:text-4xl text-[#B80F0A]">
                    <Counter value={res.value} />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#111111]">{res.metric}</div>
                  <div className="text-[11px] text-stone-500 font-medium">{res.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Detailed Strategy */}
      <ScrollReveal direction="up" distance={16}>
        <div className="space-y-6 text-stone-700 leading-relaxed text-sm sm:text-base bg-white p-8 sm:p-10 rounded-3xl border-2 border-stone-200/90 shadow-nickpat font-medium">
          <h2 className="font-anton text-2xl sm:text-3xl text-[#111111] uppercase tracking-tight">Execution Strategy</h2>
          <div className="whitespace-pre-line space-y-4">
            {campaign.description}
          </div>
        </div>
      </ScrollReveal>

      {/* Creators Attached */}
      {campaign.creatorIds && campaign.creatorIds.length > 0 && (
        <div className="space-y-6">
          <ScrollReveal direction="up" distance={16}>
            <h2 className="font-anton text-2xl sm:text-3xl text-[#111111] uppercase tracking-tight">Featured Campaign Creators</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" staggerChildren={0.06} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {campaign.creatorIds.map((c: any) => (
              <ScrollRevealItem key={c._id}>
                <AnimatedCard>
                  <div className="p-4 rounded-2xl bg-white border-2 border-stone-200/90 hover:border-[#B80F0A] shadow-nickpat flex items-center gap-3.5 transition-colors">
                    <img
                      src={c.profileImage}
                      alt={c.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#B80F0A] shrink-0"
                    />
                    <div>
                      <h4 className="font-anton text-lg text-[#111111]">{c.name}</h4>
                      <span className="text-xs text-stone-600 font-semibold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#B80F0A]" />
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
      <div className="pt-10 border-t-2 border-stone-200/60 space-y-8">
        <ScrollReveal direction="up" distance={16} className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
            Replicate Success
          </div>
          <h2 className="font-anton text-3xl sm:text-4xl text-[#111111] uppercase tracking-tight">
            Ready For Similar Results For Your Brand?
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
            Submit your campaign goals and get custom creator suggestions tailored to your budget.
          </p>
        </ScrollReveal>
        <CampaignEnquiryForm />
      </div>
    </div>
  );
}
