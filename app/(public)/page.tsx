import { connectDB } from "@/lib/db/client";
import { Creator } from "@/models/Creator";
import { Campaign } from "@/models/Campaign";
import { Brand } from "@/models/Brand";
import { Testimonial } from "@/models/Testimonial";
import { CreatorLocation } from "@/models/CreatorLocation";
import { DEFAULT_CREATOR_LOCATIONS } from "@/lib/data/maharashtra-geo";
import { getHomepageContentAction } from "@/actions/homepage.actions";
import HeroSection from "@/components/public/HeroSection";
import BentoWhyUs from "@/components/public/BentoWhyUs";
import MaharashtraCoverage from "@/components/public/MaharashtraCoverage";
import CampaignEnquiryForm from "@/components/forms/CampaignEnquiryForm";
import Link from "next/link";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { formatFollowers } from "@/lib/utils";
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { SectionBackground } from "@/components/motion/SectionBackground";
import BrandMarquee from "@/components/public/BrandMarquee";
import CreatorMarqueeGrid from "@/components/public/CreatorMarqueeGrid";
import TestimonialsSection from "@/components/public/TestimonialsSection";
import FaqSection from "@/components/public/FaqSection";

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
      {/* 1. Cinematic Hero */}
      <HeroSection
        heading={homepageContent.heroHeading}
        subheading={homepageContent.heroSubheading}
        primaryCta={homepageContent.primaryCtaText}
        secondaryCta={homepageContent.secondaryCtaText}
        creatorCount="200+"
      />

      {/* 2. Brand Logos Marquee Ticker Strip with Real Logos */}
      <BrandMarquee brands={JSON.parse(JSON.stringify(brands))} />

      {/* 3. Why VISTAR Bento Grid */}
      <BentoWhyUs />

      {/* 4. Creator Network Showcase */}
      <section className="py-24 px-4 sm:px-6 bg-[#FCECDF] border-t-2 border-stone-200/60 relative overflow-hidden">
        <SectionBackground variant="dots" />
        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <ScrollReveal direction="up" distance={16}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
                  Exclusive Marathi Creators
                </div>
                <h2 className="font-anton text-4xl sm:text-5xl text-[#111111] uppercase tracking-tight">
                  Featured Influencers & Voices
                </h2>
              </div>
              <Link
                href="/creators"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white hover:bg-stone-50 text-[#B80F0A] border-2 border-[#B80F0A] text-xs font-bold uppercase tracking-wider transition shadow-sm hover:scale-[1.02]"
              >
                <span>Explore all 200+ creators</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <CreatorMarqueeGrid creators={JSON.parse(JSON.stringify(creators))} />
        </div>
      </section>

      {/* 5. Geographic Network Coverage with Real Maharashtra Map */}
      <MaharashtraCoverage locations={JSON.parse(JSON.stringify(locations))} />

      {/* 6. Campaigns Showcase */}
      {campaigns.length > 0 && (
        <section className="py-24 px-4 sm:px-6 bg-[#FCECDF] border-t-2 border-stone-200/60 relative overflow-hidden">
          <SectionBackground variant="spotlight" intensity="subtle" />
          <div className="max-w-6xl mx-auto space-y-12 relative z-10">
            <ScrollReveal direction="up" distance={16}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
                    Case Studies & Proof
                  </div>
                  <h2 className="font-anton text-4xl sm:text-5xl text-[#111111] uppercase tracking-tight">
                    Recent Client Campaigns
                  </h2>
                </div>
                <Link
                  href="/campaigns"
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white hover:bg-stone-50 text-[#B80F0A] border-2 border-[#B80F0A] text-xs font-bold uppercase tracking-wider transition shadow-sm hover:scale-[1.02]"
                >
                  <span>View all case studies</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {campaigns.map((camp: any) => (
                <ScrollRevealItem key={camp._id}>
                  <AnimatedCard className="h-full">
                    <div className="rounded-3xl bg-white border-2 border-stone-200/90 hover:border-[#B80F0A] overflow-hidden shadow-nickpat hover:shadow-nickpat-lg transition-colors duration-300 flex flex-col justify-between h-full group">
                      <div className="h-60 relative bg-stone-100 overflow-hidden">
                        <img
                          src={camp.coverImage}
                          alt={camp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#B80F0A] text-[11px] font-bold uppercase tracking-wider border border-stone-200 shadow-sm">
                            {camp.brandId?.name || "Client"} &bull; {camp.industry}
                          </span>
                        </div>
                      </div>
                      <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="font-anton text-2xl text-[#111111] group-hover:text-[#B80F0A] transition-colors leading-tight">
                            {camp.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-stone-600 font-medium line-clamp-2 leading-relaxed">
                            {camp.objective}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-600 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#B80F0A]" />
                            {camp.location}
                          </span>
                          <Link
                            href={`/campaigns/${camp.slug}`}
                            className="text-xs text-[#B80F0A] font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:underline"
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

      {/* 7. People Loves Us (Testimonials) */}
      <TestimonialsSection testimonials={JSON.parse(JSON.stringify(testimonials))} />

      {/* 8. FAQ's Section */}
      <FaqSection />

      {/* 9. Campaign Conversion Form Section */}
      <section id="campaign-enquiry" className="py-24 px-4 sm:px-6 bg-[#FCECDF] border-t-2 border-stone-200/60 scroll-mt-20 relative overflow-hidden">
        <SectionBackground variant="spotlight" intensity="focus" />
        <div className="max-w-4xl mx-auto space-y-10 relative z-10">
          <ScrollReveal direction="up" distance={16}>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
                Start Your Campaign
              </div>
              <h2 className="font-anton text-4xl sm:text-5xl text-[#111111] uppercase tracking-tight">
                Let's Build Your Next Influencer Campaign
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 font-medium max-w-lg mx-auto leading-relaxed">
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
