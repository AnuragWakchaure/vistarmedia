import Link from "next/link";
import { getCreatorsAction } from "@/actions/creator.actions";
import { Plus, Search, MapPin, Sparkles, ArrowUpRight } from "lucide-react";
import { formatFollowers } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminCreatorsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; status?: string }>;
}) {
  const resolvedParams = await searchParams;
  const creators = await getCreatorsAction({
    search: resolvedParams.q,
    category: resolvedParams.category,
    status: resolvedParams.status,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Maharashtra Talent Management</span>
          </div>
          <h1 className="font-anton text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Creator Network ({creators.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xl">
            Manage vernacular creators, agricultural influencers, and regional storytellers across Maharashtra.
          </p>
        </div>

        <Link
          href="/admin/creators/new"
          className="px-5 py-2.5 bg-gradient-to-r from-[#00D2FF] to-[#0A84FF] hover:from-[#38bdf8] hover:to-[#00D2FF] text-black text-xs font-bold uppercase tracking-wider rounded-full transition shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:scale-[1.02] inline-flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Creator</span>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <form method="GET" className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0D121D]/90 p-4 rounded-2xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="relative col-span-1 sm:col-span-2">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            name="q"
            defaultValue={resolvedParams.q || ""}
            placeholder="Search creator by name, bio, or district..."
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

      {/* Creator Grid / Table */}
      {creators.length === 0 ? (
        <div className="text-center py-16 bg-[#0D121D]/90 border border-dashed border-white/10 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] space-y-3 backdrop-blur-md">
          <p className="text-sm font-bold text-slate-300">No creators found matching this criteria.</p>
          <Link
            href="/admin/creators/new"
            className="inline-flex items-center gap-1 text-xs text-[#00D2FF] font-bold uppercase tracking-wider hover:text-white transition"
          >
            <span>Create your first creator profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="bg-[#0D121D]/90 border border-white/10 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[650px]">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px] font-bold bg-white/[0.02]">
                  <th className="py-3.5 px-4">Creator</th>
                  <th className="py-3.5 px-4">District / Hub</th>
                  <th className="py-3.5 px-4">Categories</th>
                  <th className="py-3.5 px-4">Total Reach</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                {creators.map((c: any) => (
                  <tr key={c._id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <img
                        src={c.profileImage || "/placeholder-avatar.png"}
                        alt={c.name}
                        className="w-11 h-11 rounded-full object-cover border border-[#00D2FF]/50 shadow-[0_0_10px_rgba(0,210,255,0.2)]"
                      />
                      <div>
                        <div className="font-bold text-sm text-white flex items-center gap-1.5">
                          {c.name}
                          {c.featured && (
                            <span className="text-[10px] px-2 py-0.5 bg-[#00D2FF]/20 text-[#00D2FF] font-bold rounded-full border border-[#00D2FF]/40">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">/{c.slug}</div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-200">
                        <MapPin className="w-3.5 h-3.5 text-[#00D2FF]" />
                        {c.location}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {c.categories.slice(0, 3).map((cat: string) => (
                          <span
                            key={cat}
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/5 text-slate-300 border border-white/10"
                          >
                            {cat}
                          </span>
                        ))}
                        {c.categories.length > 3 && (
                          <span className="text-[10px] text-slate-500 font-bold self-center">
                            +{c.categories.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-anton text-base text-[#00D2FF]">
                      {formatFollowers(c.totalFollowers || 0)}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          c.status === "PUBLISHED"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : c.status === "DRAFT"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                            : "bg-slate-500/10 text-slate-400 border border-slate-500/30"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/creators/${c._id}`}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-[#00D2FF] border border-white/10 hover:border-[#00D2FF]/40 text-xs font-bold uppercase tracking-wider transition"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}