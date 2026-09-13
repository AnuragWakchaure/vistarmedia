import { connectDB } from "@/lib/db/client";
import { Creator } from "@/models/Creator";
import { Campaign } from "@/models/Campaign";
import { Brand } from "@/models/Brand";
import { Testimonial } from "@/models/Testimonial";
import { CreatorLocation } from "@/models/CreatorLocation";
import { DEFAULT_CREATOR_LOCATIONS } from "@/lib/data/maharashtra-geo";
import { getHomepageContentAction } from "@/actions/homepage.actions";
import HeroSection from "@/components/public/HeroSection";
import BrandMarquee from "@/components/public/BrandMarquee";
import BentoWhyUs from "@/components/public/BentoWhyUs";
import HomeServicesSection from "@/components/public/HomeServicesSection";
import CreatorMarqueeGrid from "@/components/public/CreatorMarqueeGrid";
import MaharashtraCoverage from "@/components/public/MaharashtraCoverage";
import CampaignProcess from "@/components/public/CampaignProcess";
import TestimonialsSection from "@/components/public/TestimonialsSection";
import FaqSection from "@/components/public/FaqSection";
import CampaignEnquiryForm from "@/components/forms/CampaignEnquiryForm";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { SectionBackground } from "@/components/motion/SectionBackground";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await connectDB();
  const homepageContent = await getHomepageContentAction();
  const [creators, campaigns, brands, testimonials, dbLocations] = await Promise.all([
    Creator.find({ status: "PUBLISHED" }).sort({ totalFollowers: -1 }).limit(16).lean(),
    Campaign.find({ status: "PUBLISHED" }).populate("brandId", "name logo").limit(3).lean(),
    Brand.find({ status: "ACTIVE" }).sort({ displayOrder: 1 }).lean(),
    Testimonial.find({ status: "ACTIVE" }).sort({ displayOrder: 1, createdAt: -1 }).lean(),
    CreatorLocation.find({ active: true }).sort({ displayOrder: 1 }).lean(),
  ]);

  const locations =
    dbLocations && dbLocations.length > 0
      ? dbLocations.map((loc: any) => ({
          _id: loc._id.toString(),
          name: loc.name,
          lat: loc.latitude,
          lon: loc.longitude,
          creatorCount: loc.creatorCount,
          countDisplay: loc.countDisplay || `${loc.creatorCount}+`,
          category: loc.category,
          description: loc.description,
          active: loc.active,
          displayOrder: loc.displayOrder,
        }))
      : DEFAULT_CREATOR_LOCATIONS;

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION (Midnight) */}
      <HeroSection
        heading={homepageContent.heroHeading}
        subheading={homepageContent.heroSubheading}
        primaryCta={homepageContent.primaryCtaText}
        secondaryCta={homepageContent.secondaryCtaText}
        creatorCount="200+"
        campaigns={JSON.parse(JSON.stringify(campaigns))}
        creators={JSON.parse(JSON.stringify(creators))}
      />

      {/* 2. TRUSTED BRANDS (Off White) */}
      <BrandMarquee brands={JSON.parse(JSON.stringify(brands))} />

      {/* 3. WHY VISTAR & METRICS (Off White) */}
      <BentoWhyUs />

      {/* 4. CAPABILITIES & SERVICES (Off White) */}
      <HomeServicesSection />

      {/* 5. CREATOR NETWORK (Light Gray - Alternate Light Section) */}
      <section id="creators" className="py-20 sm:py-24 px-4 sm:px-6 bg-[#EAF0F3] relative overflow-hidden scroll-mt-28">
        <SectionBackground variant="dots" />
        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <ScrollReveal direction="up" distance={16}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-[#0B1117] text-xs font-bold uppercase tracking-wider shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#00C8FF]" />
                  <span>Exclusive Marathi Creators</span>
                </div>
                <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
                  Featured Influencers & Voices
                </h2>
              </div>
              <Link
                href="/creators"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-[#0B1117] border border-slate-200 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs hover:border-[#00C8FF]/60 hover:shadow-md shrink-0"
              >
                <span>Explore all 200+ creators</span>
                <ArrowUpRight className="w-4 h-4 text-[#009DFF]" />
              </Link>
            </div>
          </ScrollReveal>

          <CreatorMarqueeGrid creators={JSON.parse(JSON.stringify(creators))} />
        </div>
      </section>

      {/* 6. MAHARASHTRA PRESENCE (Midnight - Dark Immersive Map Section) */}
      <MaharashtraCoverage locations={JSON.parse(JSON.stringify(locations))} />

      {/* 7. CAMPAIGN PROCESS (Light Gray - Alternate Light Section) */}
      <CampaignProcess />

      {/* 8. CAMPAIGN CASE STUDIES (Off White) */}
      {campaigns.length > 0 && (
        <section id="campaigns" className="py-20 sm:py-24 px-4 sm:px-6 bg-[#F3F6F8] relative overflow-hidden scroll-mt-28 border-t border-slate-200/60">
          <SectionBackground variant="spotlight" intensity="subtle" />
          <div className="max-w-6xl mx-auto space-y-12 relative z-10">
            <ScrollReveal direction="up" distance={16}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-[#0B1117] text-xs font-bold uppercase tracking-wider shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#00C8FF]" />
                    <span>Case Studies & Proof</span>
                  </div>
                  <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
                    Recent Client Campaigns
                  </h2>
                </div>
                <Link
                  href="/campaigns"
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white hover:bg-[#EAF0F3] text-[#0B1117] border border-slate-200 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs hover:border-[#00C8FF]/60 hover:shadow-md shrink-0"
                >
                  <span>View all case studies</span>
                  <ArrowUpRight className="w-4 h-4 text-[#009DFF]" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {campaigns.map((camp: any) => (
                <ScrollRevealItem key={camp._id}>
                  <AnimatedCard className="h-full">
                    <div className="rounded-3xl bg-white border border-slate-200/90 hover:border-cyan-400 overflow-hidden shadow-[0_4px_24px_rgba(11,17,23,0.03)] hover:shadow-[0_16px_36px_rgba(0,200,255,0.12)] transition-all duration-300 flex flex-col justify-between h-full group">
                      <div className="h-60 relative bg-slate-100 overflow-hidden">
                        <img
                          src={camp.coverImage}
                          alt={camp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#009DFF] text-[11px] font-bold uppercase tracking-wider border border-slate-200 shadow-xs">
                            {camp.brandId?.name || "Client"} &bull; {camp.industry}
                          </span>
                        </div>
                      </div>
                      <div className="p-7 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="font-anton text-2xl sm:text-3xl text-[#0B1117] group-hover:text-[#009DFF] transition-colors leading-tight">
                            {camp.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#64717C] font-normal line-clamp-2 leading-relaxed">
                            {camp.objective}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#64717C] flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#009DFF]" />
                            {camp.location}
                          </span>
                          <Link
                            href={`/campaigns/${camp.slug}`}
                            className="text-xs text-[#009DFF] font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:underline"
                          >
                            Read Strategy <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </AnimatedCard>
                </ScrollRevealItem>
              ))}
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 9. TESTIMONIALS (Off White) */}
      <TestimonialsSection testimonials={JSON.parse(JSON.stringify(testimonials))} />

      {/* 10. FAQ (Off White) */}
      <FaqSection />

      {/* 11. CAMPAIGN CONVERSION FORM (Off White with Pure White Card) */}
      <section id="campaign-enquiry" className="py-20 sm:py-24 px-4 sm:px-6 bg-[#F3F6F8] scroll-mt-28 sm:scroll-mt-32 relative overflow-hidden border-t border-slate-200/60">
        <SectionBackground variant="spotlight" intensity="focus" />
        <div className="max-w-4xl mx-auto space-y-10 relative z-10">
          <ScrollReveal direction="up" distance={16}>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-[#0B1117] text-xs font-bold uppercase tracking-wider shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#00C8FF]" />
                <span>Get In Touch</span>
              </div>
              <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
                Let&apos;s Build Your Next Influencer Campaign
              </h2>
              <p className="text-xs sm:text-sm text-[#64717C] font-normal max-w-lg mx-auto leading-relaxed">
                Submit your campaign requirements below. Our Maharashtra influencer strategy team will deliver custom creator matching and transparent pricing.
              </p>
            </div>
          </ScrollReveal>

          <CampaignEnquiryForm />
        </div>
      </section>
    </div>
  );
}