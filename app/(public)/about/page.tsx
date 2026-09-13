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
    <div className="relative overflow-hidden bg-[#F3F6F8]">
      <SectionBackground variant="spotlight" intensity="subtle" />
      <div className="pt-36 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-20 relative z-10">
        {/* Hero */}
        <ScrollReveal direction="up" distance={20} className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-slate-200 text-[#0B1117] text-xs font-bold uppercase tracking-wider shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#00C8FF]" />
            <span>The VISTAR Story</span>
          </div>
          <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
            Redefining Regional Influencer Marketing Across Maharashtra.
          </h1>
          <p className="text-base sm:text-lg text-[#64717C] font-medium leading-relaxed">
            VISTAR was founded to bridge a fundamental market gap: while national agencies treat
            regional markets as an afterthought, Maharashtra's vibrant vernacular ecosystem drives
            massive purchasing power in agriculture, automotive, lifestyle, and consumer goods.
          </p>
        </ScrollReveal>

        {/* Core Values with Rich Imagery */}
        <ScrollReveal direction="up" staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CORE_VALUES.map((val) => (
            <ScrollRevealItem key={val.step}>
              <AnimatedCard className="h-full">
                <div className="rounded-3xl bg-[#FFFFFF] border border-slate-200/90 hover:border-[#00C8FF]/60 shadow-[0_12px_40px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_36px_rgba(0,200,255,0.12)] transition-all duration-300 flex flex-col justify-between h-full group overflow-hidden">
                  {/* Visual Header Image */}
                  <div className="relative h-56 sm:h-60 w-full bg-[#EAF0F3] overflow-hidden">
                    <img
                      src={val.image}
                      alt={val.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badges on image */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#009DFF] text-[11px] font-bold uppercase tracking-wider border border-slate-200 shadow-xs">
                        {val.tag}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#0B1117] font-mono text-[10px] font-bold uppercase border border-slate-200">
                        {val.step}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <h3 className="font-anton text-2xl text-[#0B1117] group-hover:text-[#009DFF] transition-colors leading-tight">
                        {val.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#64717C] font-medium leading-relaxed">
                        {val.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#64717C]">
                      <CheckCircle2 className="w-4 h-4 text-[#00C8FF] shrink-0" />
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
          <div className="p-10 rounded-3xl bg-gradient-to-r from-[#05080D] via-[#07111A] to-[#05080D] text-white border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-[#00C8FF] border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" /> Our Mission
              </div>
              <h3 className="font-anton text-3xl sm:text-4xl text-white uppercase tracking-tight">
                Your Brand. Our Creators. Bigger Reach.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Whether you are launching an agritech innovation in western Maharashtra or rolling out an FMCG product
                statewide, VISTAR has the creative network and operational horsepower to deliver results.
              </p>
            </div>
            <Link
              href="/#campaign-enquiry"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00C8FF] to-[#009DFF] hover:from-[#009DFF] hover:to-[#00C8FF] text-[#05080D] text-xs font-extrabold uppercase tracking-wider transition-all shadow-[0_4px_25px_rgba(0,200,255,0.35)] shrink-0 inline-flex items-center gap-2 hover:scale-[1.02]"
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
