import Link from "next/link";
import { ArrowUpRight, Award, CheckCircle2 } from "lucide-react";
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { SectionBackground } from "@/components/motion/SectionBackground";

export const metadata = {
  title: "About Us — VISTAR Influencer Marketing Agency",
  description:
    "Connecting brands with verified creators across Maharashtra with deep regional expertise and end-to-end execution.",
};

const CORE_VALUES = [
  {
    step: "01",
    tag: "200+ Verified Network",
    title: "Authentic Creators First",
    description:
      "We do not work with superficial engagement pods. Every creator in our 200+ network is manually vetted for genuine community trust, active audience retention, and consistent delivery.",
    image: "/images/about/about-creators.webp",
    highlight: "100% Engagement Vetted",
  },
  {
    step: "02",
    tag: "35+ Districts Coverage",
    title: "100% Grounded In Maharashtra",
    description:
      "From urban youth in Pune and Mumbai to farmers and agro-entrepreneurs in Nashik, Ahilyanagar, Satara, and Kolhapur, we understand the nuances of native dialects and local culture.",
    image: "/images/about/about-maharashtra.webp",
    highlight: "Dialect & Cultural Nuance",
  },
  {
    step: "03",
    tag: "Zero-Bot Transparency",
    title: "Data & Integrity",
    description:
      "No inflated vanity metrics. We provide transparent campaign audits, verifiable view counts, and honest performance data to ensure every rupee invested generates measurable business equity.",
    image: "/images/about/about-analytics.webp",
    highlight: "Real-Time UTM Telemetry",
  },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-[#F8FAFC]">
      <SectionBackground variant="grid" intensity="minimal" />
      <div className="pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Hero */}
        <ScrollReveal direction="up" distance={20} className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-[#00B8F0]/10 text-[#0088B8] border border-[#00B8F0]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]" />
            <span>The VISTAR Story</span>
          </div>
          <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
            Redefining Regional Influencer Marketing Across Maharashtra.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            VISTAR was founded to bridge a fundamental market gap: while national agencies treat
            regional markets as an afterthought, Maharashtra&apos;s vibrant vernacular ecosystem drives
            massive purchasing power in agriculture, automotive, lifestyle, and consumer goods.
          </p>
        </ScrollReveal>

        {/* Core Values with Rich Imagery */}
        <ScrollReveal direction="up" staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CORE_VALUES.map((val) => (
            <ScrollRevealItem key={val.step}>
              <AnimatedCard className="h-full">
                <div className="rounded-xl bg-white border border-slate-200/90 hover:border-[#00B8F0]/40 shadow-xs hover:shadow-md transition-all duration-150 flex flex-col justify-between h-full group overflow-hidden">
                  {/* Visual Header Image */}
                  <div className="relative h-52 sm:h-56 w-full bg-slate-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={val.image}
                      alt={val.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badges on image */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-0.5 rounded bg-white/95 backdrop-blur-md text-[#0088B8] text-[10px] font-semibold uppercase tracking-wider border border-slate-200 shadow-2xs">
                        {val.tag}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/90 backdrop-blur-md text-slate-900 font-mono text-[10px] font-bold uppercase border border-slate-200">
                        {val.step}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-anton text-2xl text-[#0B1117] group-hover:text-[#0088B8] transition-colors leading-tight">
                        {val.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                        {val.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#00B8F0] shrink-0" />
                      <span>{val.highlight}</span>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </ScrollRevealItem>
          ))}
        </ScrollReveal>

        {/* Agency Credo Callout */}
        <ScrollReveal direction="up" distance={20}>
          <div className="p-8 sm:p-10 rounded-xl bg-[#090D14] text-white border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#00B8F0]/10 text-[#00B8F0] border border-[#00B8F0]/25 text-[11px] font-semibold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" /> Our Mission
              </div>
              <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Your Brand. Our Creators. Bigger Reach.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                Whether you are launching an agritech innovation in western Maharashtra or rolling out an FMCG product
                statewide, VISTAR has the creative network and operational horsepower to deliver results.
              </p>
            </div>
            <Link
              href="/#campaign-enquiry"
              className="px-6 py-3 rounded-lg bg-[#00B8F0] hover:bg-[#00A3D9] text-[#05080D] text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xs shrink-0 inline-flex items-center gap-2 active:scale-[0.99]"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4 text-[#05080D]" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}