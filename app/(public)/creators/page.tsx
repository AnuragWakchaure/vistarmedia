import { connectDB } from "@/lib/db/client";
import { Creator } from "@/models/Creator";
import Link from "next/link";
import { Search, MapPin, Sparkles, ArrowUpRight } from "lucide-react";
import { formatFollowers } from "@/lib/utils";
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { SectionBackground } from "@/components/motion/SectionBackground";

export const dynamic = "force-dynamic";

const CATEGORIES = [
  "ALL",
  "Agriculture",
  "Marathi Content",
  "Lifestyle",
  "Food",
  "Automobile",
  "Fashion",
  "Travel",
  "Technology",
];

export default async function CreatorsDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; location?: string }>;
}) {
  const resolvedParams = await searchParams;
  await connectDB();

  const query: any = { status: "PUBLISHED" };

  if (resolvedParams.q) {
    query.$or = [
      { name: { $regex: resolvedParams.q, $options: "i" } },
      { bio: { $regex: resolvedParams.q, $options: "i" } },
      { location: { $regex: resolvedParams.q, $options: "i" } },
    ];
  }

  if (resolvedParams.category && resolvedParams.category !== "ALL") {
    query.categories = resolvedParams.category;
  }

  const creators = await Creator.find(query)
    .sort({ featured: -1, totalFollowers: -1 })
    .lean();

  return (
    <div className="relative overflow-hidden bg-[#EAF0F3]">
      <SectionBackground variant="grid" intensity="minimal" />
      <div className="pt-36 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Directory Header */}
        <ScrollReveal direction="up" distance={20} className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/30 text-[#009DFF] text-xs font-bold uppercase tracking-wider">
            Maharashtra Influencer Roster
          </div>
          <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
            200+ Regional Creators. One Powerful Ecosystem.
          </h1>
          <p className="text-sm sm:text-base text-[#64717C] font-medium leading-relaxed">
            Filter our verified roster of regional vernacular storytellers, rural agricultural influencers,
            and urban lifestyle icons across Maharashtra.
          </p>
        </ScrollReveal>

        {/* Filter / Search Bar */}
        <ScrollReveal direction="up" distance={16}>
          <div className="space-y-4 bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
            <form method="GET" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative sm:col-span-2">
                <Search className="w-4 h-4 text-[#64717C] absolute left-3.5 top-3.5" />
                <input
                  name="q"
                  defaultValue={resolvedParams.q || ""}
                  placeholder="Search creator by name, bio, or district..."
                  className="w-full bg-[#EAF0F3] border border-slate-200 focus:border-[#00C8FF] focus:bg-[#FFFFFF] rounded-full pl-10 pr-4 py-2.5 text-xs text-[#0B1117] placeholder-[#64717C]/70 focus:outline-none transition font-medium focus:ring-2 focus:ring-[#00C8FF]/20"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-[#00C8FF] to-[#009DFF] hover:from-[#009DFF] hover:to-[#00C8FF] text-[#05080D] text-xs font-extrabold rounded-full transition tracking-wider uppercase shadow-[0_4px_16px_rgba(0,200,255,0.35)] cursor-pointer"
              >
                Filter Roster
              </button>
            </form>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
              {CATEGORIES.map((cat) => {
                const isSelected =
                  (resolvedParams.category || "ALL") === cat;
                return (
                  <Link
                    key={cat}
                    href={`/creators?category=${cat}${resolvedParams.q ? `&q=${resolvedParams.q}` : ""}`}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all select-none ${
                      isSelected
                        ? "bg-gradient-to-r from-[#00C8FF] to-[#009DFF] text-[#05080D] border border-[#00C8FF] shadow-[0_2px_10px_rgba(0,200,255,0.3)] scale-[1.02]"
                        : "bg-[#EAF0F3] text-[#0B1117] hover:text-[#009DFF] hover:bg-[#FFFFFF] border border-slate-200"
                    }`}
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Grid */}
        {creators.length === 0 ? (
          <div className="text-center py-20 bg-[#FFFFFF] rounded-3xl border border-slate-200/90 space-y-3 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
            <p className="text-[#64717C] text-sm font-medium">No creators found matching these filters.</p>
            <Link
              href="/creators"
              className="text-xs text-[#009DFF] hover:underline inline-block font-bold uppercase tracking-wider"
            >
              Clear all filters &rarr;
            </Link>
          </div>
        ) : (
          <ScrollReveal direction="up" staggerChildren={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((c: any) => (
              <ScrollRevealItem key={c._id}>
                <AnimatedCard className="h-full" hoverEffect={false}>
                  <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-slate-200/90 hover:border-[#00C8FF]/60 shadow-[0_12px_40px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_30px_rgba(0,200,255,0.15)] transition-all duration-200 flex flex-col justify-between h-full group space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={c.profileImage}
                          alt={c.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-[#00C8FF]/40 shadow-sm shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-anton text-xl text-[#0B1117] truncate group-hover:text-[#009DFF] transition-colors">{c.name}</h3>
                            {c.featured && (
                              <Sparkles className="w-4 h-4 text-[#00C8FF] shrink-0" />
                            )}
                          </div>
                          <div className="text-xs text-[#64717C] font-semibold flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-[#00C8FF]" />
                            {c.location}
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-[#64717C] font-medium line-clamp-2 leading-relaxed">
                        {c.bio || "Vernacular storyteller reaching active communities across Maharashtra."}
                      </p>

                      {/* Categories */}
                      <div className="flex flex-wrap gap-1.5">
                        {c.categories.map((cat: string) => (
                          <span
                            key={cat}
                            className="px-2.5 py-0.5 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/30 text-[10px] font-bold text-[#009DFF]"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#64717C] block leading-none">Total Reach</span>
                        <span className="font-anton text-lg text-[#009DFF]">
                          {formatFollowers(c.totalFollowers || 0)}
                        </span>
                      </div>

                      <Link
                        href="/#campaign-enquiry"
                        className="px-4 py-2 rounded-full bg-[#EAF0F3] hover:bg-[#00C8FF] text-[#0B1117] hover:text-[#05080D] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm flex items-center gap-1 hover:scale-[1.02] border border-slate-200 hover:border-[#00C8FF]"
                      >
                        <span>Book</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </AnimatedCard>
              </ScrollRevealItem>
            ))}
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}