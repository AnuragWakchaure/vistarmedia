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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
            <Film className="w-3.5 h-3.5" />
            <span>Case Studies & Track Record</span>
          </div>
          <h1 className="font-anton text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
            Campaign Case Studies ({campaigns.length})
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-medium max-w-xl">
            Manage client campaigns, verified case studies, and performance statistics across Maharashtra.
          </p>
        </div>

        <Link
          href="/admin/campaigns/new"
          className="px-5 py-2.5 bg-[#B80F0A] hover:bg-[#960C08] text-white text-xs font-bold uppercase tracking-wider rounded-full transition shadow-sm hover:scale-[1.02] inline-flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Campaign</span>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <form method="GET" className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border-2 border-stone-200/90 shadow-nickpat">
        <div className="relative col-span-1 sm:col-span-2">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            name="q"
            defaultValue={resolvedParams.q || ""}
            placeholder="Search campaigns by title, brand, or objective..."
            className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
          />
        </div>
        <div className="flex gap-2">
          <select
            name="status"
            defaultValue={resolvedParams.status || "ALL"}
            className="flex-1 bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3 py-2.5 text-xs text-[#111111] focus:outline-none transition font-bold uppercase"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#B80F0A] hover:bg-[#960C08] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-sm cursor-pointer"
          >
            Filter
          </button>
        </div>
      </form>

      {/* Campaign Grid */}
      {campaigns.length === 0 ? (
        <div className="text-center py-16 bg-white border-2 border-dashed border-stone-200 rounded-3xl shadow-nickpat space-y-3">
          <p className="text-sm font-bold text-stone-700">No campaigns found matching this criteria.</p>
          <Link
            href="/admin/campaigns/new"
            className="inline-flex items-center gap-1 text-xs text-[#B80F0A] font-bold uppercase tracking-wider hover:underline"
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
              className="bg-white border-2 border-stone-200/90 hover:border-[#B80F0A] rounded-3xl overflow-hidden flex flex-col justify-between shadow-nickpat hover:shadow-nickpat-lg transition-all group"
            >
              <div>
                <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={camp.coverImage}
                    alt={camp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-md shadow-sm ${
                        camp.status === "PUBLISHED"
                          ? "bg-white/95 text-emerald-800 border border-emerald-300"
                          : "bg-white/95 text-amber-800 border border-amber-300"
                      }`}
                    >
                      {camp.status}
                    </span>
                    {camp.featured && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#FBCB77] text-[#111111] border border-stone-400 shadow-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#B80F0A]" /> Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-stone-500 text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-[#B80F0A]">{camp.brandId?.name || "Client"}</span>
                    <span>&bull;</span>
                    <span>{camp.industry}</span>
                  </div>

                  <h3 className="font-anton text-xl text-[#111111] group-hover:text-[#B80F0A] transition-colors leading-tight line-clamp-1">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-medium line-clamp-2 leading-relaxed">
                    {camp.objective}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 font-bold pt-3 border-t-2 border-stone-100">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#B80F0A]" />
                      {camp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Film className="w-3.5 h-3.5 text-[#B80F0A]" />
                      {camp.campaignType}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/admin/campaigns/${camp._id}`}
                  className="block text-center py-2.5 rounded-full bg-stone-100 hover:bg-[#FCECDF] text-stone-800 hover:text-[#B80F0A] border border-stone-200 text-xs font-bold uppercase tracking-wider transition"
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