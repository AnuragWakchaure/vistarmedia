import Link from "next/link";
import { Users, Target, MapPin, ArrowUpRight, Award } from "lucide-react";
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

export const metadata = {
  title: "About Us — VISTAR Influencer Marketing Agency",
  description:
    "Connecting brands with verified creators across Maharashtra with deep regional expertise and end-to-end execution.",
};

export default function AboutPage() {
  return (
    <div className="pt-36 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-20">
      {/* Hero */}
      <ScrollReveal direction="up" distance={20} className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
          The VISTAR Story
        </div>
        <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-[#111111] uppercase tracking-tight leading-[0.98]">
          Redefining Regional Influencer Marketing Across Maharashtra.
        </h1>
        <p className="text-base sm:text-lg text-stone-700 font-medium leading-relaxed">
          VISTAR was founded to bridge a fundamental market gap: while national agencies treat
          regional markets as an afterthought, Maharashtra's vibrant vernacular ecosystem drives
          massive purchasing power in agriculture, automotive, lifestyle, and consumer goods.
        </p>
      </ScrollReveal>

      {/* Core Values */}
      <ScrollReveal direction="up" staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScrollRevealItem>
          <AnimatedCard className="h-full">
            <div className="p-8 rounded-3xl bg-white border-2 border-stone-200/90 shadow-nickpat hover:border-[#B80F0A] hover:shadow-nickpat-lg transition-colors duration-300 space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#B80F0A]/10 border-2 border-[#B80F0A]/20 text-[#B80F0A] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-anton text-2xl text-[#111111] uppercase tracking-wide">
                Authentic Creators First
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
                We do not work with superficial engagement pods. Every creator in our 200+ network is
                manually vetted for genuine community trust, active audience retention, and consistent delivery.
              </p>
            </div>
          </AnimatedCard>
        </ScrollRevealItem>

        <ScrollRevealItem>
          <AnimatedCard className="h-full">
            <div className="p-8 rounded-3xl bg-white border-2 border-stone-200/90 shadow-nickpat hover:border-[#B80F0A] hover:shadow-nickpat-lg transition-colors duration-300 space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#B80F0A]/10 border-2 border-[#B80F0A]/20 text-[#B80F0A] flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-anton text-2xl text-[#111111] uppercase tracking-wide">
                100% Grounded In Maharashtra
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
                From urban youth in Pune and Mumbai to farmers and agro-entrepreneurs in Nashik,
                Ahilyanagar, Satara, and Kolhapur, we understand the nuances of native dialects and local culture.
              </p>
            </div>
          </AnimatedCard>
        </ScrollRevealItem>

        <ScrollRevealItem>
          <AnimatedCard className="h-full">
            <div className="p-8 rounded-3xl bg-white border-2 border-stone-200/90 shadow-nickpat hover:border-[#B80F0A] hover:shadow-nickpat-lg transition-colors duration-300 space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#B80F0A]/10 border-2 border-[#B80F0A]/20 text-[#B80F0A] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-anton text-2xl text-[#111111] uppercase tracking-wide">
                Data & Integrity
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
                No inflated vanity metrics. We provide transparent campaign audits, verifiable view counts,
                and honest performance data to ensure every rupee invested generates measurable business equity.
              </p>
            </div>
          </AnimatedCard>
        </ScrollRevealItem>
      </ScrollReveal>

      {/* Agency Credo Callout */}
      <ScrollReveal direction="up" distance={20}>
        <div className="p-10 rounded-3xl bg-[#B80F0A] text-white border-2 border-[#960C08] shadow-nickpat-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#FBCB77] border border-white/20 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Our Mission
            </div>
            <h3 className="font-anton text-3xl sm:text-4xl text-white uppercase tracking-tight">
              Your Brand. Our Creators. Bigger Reach.
            </h3>
            <p className="text-xs sm:text-sm text-stone-100 font-medium leading-relaxed">
              Whether you are launching an agritech innovation in western Maharashtra or rolling out an FMCG product
              statewide, VISTAR has the creative network and operational horsepower to deliver results.
            </p>
          </div>
          <Link
            href="/#campaign-enquiry"
            className="px-8 py-4 rounded-full bg-white hover:bg-stone-100 text-[#B80F0A] text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shrink-0 inline-flex items-center gap-2 hover:scale-[1.02]"
          >
            <span>Start Your Campaign</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
