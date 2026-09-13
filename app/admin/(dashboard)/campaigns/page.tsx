import Link from "next/link";
import { getCampaignsAction } from "@/actions/campaign.actions";
import { Plus, Search, Film, MapPin, Sparkles, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCampaignsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const resolvedParams = await searchParams;
  const campaigns = await getCampaignsAction({
    search: resolvedParams.q,
    status: resolvedParams.status,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.15)]">
            <Film className="w-3.5 h-3.5" />
            <span>Case Studies & Track Record</span>
          </div>
          <h1 className="font-anton text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Campaign Case Studies ({campaigns.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xl">
            Manage client campaigns, verified case studies, and performance statistics across Maharashtra.
          </p>
        </div>

        <Link
          href="/admin/campaigns/new"
          className="px-5 py-2.5 bg-gradient-to-r from-[#00D2FF] to-[#0A84FF] hover:from-[#38bdf8] hover:to-[#00D2FF] text-black text-xs font-bold uppercase tracking-wider rounded-full transition shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:scale-[1.02] inline-flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Campaign</span>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <form method="GET" className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0D121D]/90 p-4 rounded-2xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="relative col-span-1 sm:col-span-2">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            name="q"
            defaultValue={resolvedParams.q || ""}
            placeholder="Search campaigns by title, brand, or objective..."
            className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
          />
        </div>
        <div className="flex gap-2">
          <select
            name="status"
            defaultValue={resolvedParams.status || "ALL"}
            className="flex-1 bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none transition font-bold uppercase [&>option]:bg-[#0D121D] [&>option]:text-white"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <button
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-r from-[#00D2FF] to-[#0A84FF] hover:from-[#38bdf8] hover:to-[#00D2FF] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-[0_0_15px_rgba(0,210,255,0.25)] cursor-pointer"
          >
            Filter
          </button>
        </div>
      </form>

      {/* Campaign Grid */}
      {campaigns.length === 0 ? (
        <div className="text-center py-16 bg-[#0D121D]/90 border border-dashed border-white/10 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] space-y-3 backdrop-blur-md">
          <p className="text-sm font-bold text-slate-300">No campaigns found matching this criteria.</p>
          <Link
            href="/admin/campaigns/new"
            className="inline-flex items-center gap-1 text-xs text-[#00D2FF] font-bold uppercase tracking-wider hover:text-white transition"
          >
            <span>Create your first case study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((camp: any) => (
            <div
              key={camp._id}
              className="bg-[#0D121D]/90 border border-white/10 hover:border-[#00D2FF]/50 rounded-3xl overflow-hidden flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,210,255,0.15)] transition-all group backdrop-blur-md"
            >
              <div>
                <div className="relative h-48 w-full bg-[#07090E] overflow-hidden">
                  <img
                    src={camp.coverImage}
                    alt={camp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-md shadow-sm ${
                        camp.status === "PUBLISHED"
                          ? "bg-[#07090E]/80 text-emerald-400 border border-emerald-500/30"
                          : "bg-[#07090E]/80 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {camp.status}
                    </span>
                    {camp.featured && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/40 shadow-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#00D2FF]" /> Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-[#00D2FF]">{camp.brandId?.name || "Client"}</span>
                    <span>&bull;</span>
                    <span>{camp.industry}</span>
                  </div>

                  <h3 className="font-anton text-xl text-white group-hover:text-[#00D2FF] transition-colors leading-tight line-clamp-1">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium line-clamp-2 leading-relaxed">
                    {camp.objective}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold pt-3 border-t border-white/10">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#00D2FF]" />
                      {camp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Film className="w-3.5 h-3.5 text-[#00D2FF]" />
                      {camp.campaignType}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/admin/campaigns/${camp._id}`}
                  className="block text-center py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-[#00D2FF] border border-white/10 hover:border-[#00D2FF]/40 text-xs font-bold uppercase tracking-wider transition"
                >
                  Edit Case Study
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}