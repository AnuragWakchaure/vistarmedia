import { connectDB } from "@/lib/db/client";
import { Campaign } from "@/models/Campaign";
import { Brand } from "@/models/Brand";
import { Testimonial } from "@/models/Testimonial";
import { CreatorLocation } from "@/models/CreatorLocation";
import { Statistic } from "@/models/Statistic";
import { DEFAULT_CREATOR_LOCATIONS } from "@/lib/data/maharashtra-geo";
import { getHomepageContentAction } from "@/actions/homepage.actions";
import HeroSection from "@/components/public/HeroSection";
import BrandMarquee from "@/components/public/BrandMarquee";
import BentoWhyUs from "@/components/public/BentoWhyUs";
import HomeServicesSection from "@/components/public/HomeServicesSection";
import CreatorCategoriesSection from "@/components/public/CreatorCategoriesSection";
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
  const [campaigns, brands, testimonials, dbLocations, statistics] = await Promise.all([
    Campaign.find({ status: "PUBLISHED" }).populate("brandId", "name logo").limit(3).lean(),
    Brand.find({ status: "ACTIVE" }).sort({ displayOrder: 1 }).lean(),
    Testimonial.find({ status: "ACTIVE" }).sort({ displayOrder: 1, createdAt: -1 }).lean(),
    CreatorLocation.find({ active: true }).sort({ displayOrder: 1 }).lean(),
    Statistic.find({ status: "ACTIVE" }).sort({ displayOrder: 1 }).lean(),
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
        highlight={homepageContent.heroHighlight}
        primaryCta={homepageContent.primaryCtaText}
        secondaryCta={homepageContent.secondaryCtaText}
        creatorCount="200+"
        campaigns={JSON.parse(JSON.stringify(campaigns))}
      />

      {/* 2. TRUSTED BRANDS (Off White) */}
      <BrandMarquee brands={JSON.parse(JSON.stringify(brands))} />

      {/* 3. WHY VISTAR & METRICS (Off White) */}
      <BentoWhyUs />

      {/* 4. CAPABILITIES & SERVICES (Off White) */}
      <HomeServicesSection />

      {/* 5. CREATOR CATEGORIES & VERTICALS (Light Gray - Alternate Light Section) */}
      <CreatorCategoriesSection
        heading={homepageContent.creatorsHeading}
        description={homepageContent.creatorsDescription}
      />

      {/* 6. MAHARASHTRA PRESENCE (Midnight - Dark Immersive Map Section) */}
      <MaharashtraCoverage
        heading={homepageContent.maharashtraHeading}
        description={homepageContent.maharashtraDescription}
        locations={JSON.parse(JSON.stringify(locations))}
      />

      {/* 7. CAMPAIGN PROCESS (Light Gray - Alternate Light Section) */}
      <CampaignProcess />

      {/* 8. CAMPAIGN CASE STUDIES (Off White) */}
      {campaigns.length > 0 && (
        <section id="campaigns" className="py-20 sm:py-24 px-4 sm:px-6 bg-[#F8FAFC] relative overflow-hidden scroll-mt-28 border-t border-slate-200/80">
          <SectionBackground variant="spotlight" intensity="subtle" />
          <div className="max-w-6xl mx-auto space-y-12 relative z-10">
            <ScrollReveal direction="up" distance={16}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-[#00B8F0]/10 text-[#0088B8] border border-[#00B8F0]/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]" />
                    <span>Case Studies & Proof</span>
                  </div>
                  <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
                    Recent Client Campaigns
                  </h2>
                </div>
                <Link
                  href="/campaigns"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xs hover:border-[#00B8F0]/40 shrink-0"
                >
                  <span>View all case studies</span>
                  <ArrowUpRight className="w-4 h-4 text-[#00B8F0]" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {campaigns.map((camp: any) => (
                <ScrollRevealItem key={camp._id}>
                  <AnimatedCard className="h-full">
                    <div className="rounded-xl bg-white border border-slate-200/90 hover:border-[#00B8F0]/40 overflow-hidden shadow-xs hover:shadow-md transition-all duration-150 flex flex-col justify-between h-full group">
                      <div className="h-60 relative bg-slate-100 overflow-hidden">
                        <img
                          src={camp.coverImage}
                          alt={camp.title}
                          width={600}
                          height={240}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-0.5 rounded bg-white/95 backdrop-blur-md text-[#0088B8] text-[10px] font-semibold uppercase tracking-wider border border-slate-200 shadow-2xs">
                            {camp.brandId?.name || "Client"} &bull; {camp.industry}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="font-anton text-2xl text-[#0B1117] group-hover:text-[#0088B8] transition-colors leading-tight">
                            {camp.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 font-normal line-clamp-2 leading-relaxed">
                            {camp.objective}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#00B8F0]" />
                            {camp.location}
                          </span>
                          <Link
                            href={`/campaigns/${camp.slug}`}
                            className="text-xs text-[#0088B8] font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:underline"
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