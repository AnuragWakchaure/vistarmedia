import { connectDB } from "@/lib/db/client";
import { Service } from "@/models/Service";
import {
  Users,
  Video,
  Sparkles,
  Camera,
  Calendar,
  Compass,
  Layers,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import CampaignEnquiryForm from "@/components/forms/CampaignEnquiryForm";
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services — VISTAR Influencer Marketing Agency",
  description:
    "End-to-end influencer marketing, vernacular creator campaigns, UGC production, and regional event activations across Maharashtra.",
};

const ICON_MAP: Record<string, any> = {
  "influencer-marketing": Users,
  "creator-campaigns": Video,
  "reels-short-form-content": Sparkles,
  "ugc-content-creation": Camera,
  "event-influencer-campaigns": Calendar,
  "regional-influencer-marketing": Compass,
  "campaign-management": Layers,
  "performance-reporting": BarChart3,
};

export default async function ServicesPage() {
  await connectDB();
  const services = await Service.find({ status: "ACTIVE" })
    .sort({ displayOrder: 1 })
    .lean();

  return (
    <div className="pt-36 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-20">
      {/* Header */}
      <ScrollReveal direction="up" distance={20} className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
          What We Do &bull; Full Agency Capabilities
        </div>
        <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-[#111111] uppercase tracking-tight leading-[0.98]">
          Comprehensive Creator Solutions Built For Scale.
        </h1>
        <p className="text-sm sm:text-base text-stone-700 font-medium leading-relaxed">
          From grassroots vernacular activations in rural heartlands to high-production metro brand
          campaigns, VISTAR manages your entire influencer marketing lifecycle.
        </p>
      </ScrollReveal>

      {/* Dynamic Services Grid */}
      <ScrollReveal direction="up" staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((srv: any) => {
          const Icon = ICON_MAP[srv.slug] || Layers;
          return (
            <ScrollRevealItem key={srv._id.toString()}>
              <AnimatedCard className="h-full">
                <div className="p-8 rounded-3xl bg-white border-2 border-stone-200/90 hover:border-[#B80F0A] shadow-nickpat hover:shadow-nickpat-lg transition-colors duration-300 flex flex-col justify-between space-y-6 h-full group">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#B80F0A]/10 border-2 border-[#B80F0A]/20 flex items-center justify-center text-[#B80F0A] group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-anton text-2xl sm:text-3xl text-[#111111] group-hover:text-[#B80F0A] transition-colors">
                        {srv.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
                      {srv.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t-2 border-stone-100 flex items-center gap-2 text-xs font-bold text-stone-600">
                    <CheckCircle2 className="w-4 h-4 text-[#B80F0A] shrink-0" />
                    <span>Managed end-to-end across Maharashtra</span>
                  </div>
                </div>
              </AnimatedCard>
            </ScrollRevealItem>
          );
        })}
      </ScrollReveal>

      {/* Conversion Section */}
      <div className="pt-12 border-t-2 border-stone-200/60 space-y-10">
        <ScrollReveal direction="up" distance={16} className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
            Custom Proposals
          </div>
          <h2 className="font-anton text-3xl sm:text-4xl text-[#111111] uppercase tracking-tight">
            Need A Customized Agency Proposal?
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
            Tell us about your brand targets and our strategy team will assemble a tailored creator plan.
          </p>
        </ScrollReveal>
        <div className="max-w-3xl mx-auto">
          <CampaignEnquiryForm />
        </div>
      </div>
    </div>
  );
}
