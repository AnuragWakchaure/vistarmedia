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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Maharashtra Talent Management</span>
          </div>
          <h1 className="font-anton text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
            Creator Network ({creators.length})
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-medium max-w-xl">
            Manage vernacular creators, agricultural influencers, and regional storytellers across Maharashtra.
          </p>
        </div>

        <Link
          href="/admin/creators/new"
          className="px-5 py-2.5 bg-[#B80F0A] hover:bg-[#960C08] text-white text-xs font-bold uppercase tracking-wider rounded-full transition shadow-sm hover:scale-[1.02] inline-flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Creator</span>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <form method="GET" className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border-2 border-stone-200/90 shadow-nickpat">
        <div className="relative col-span-1 sm:col-span-2">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            name="q"
            defaultValue={resolvedParams.q || ""}
            placeholder="Search creator by name, bio, or district..."
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

      {/* Creator Grid / Table */}
      {creators.length === 0 ? (
        <div className="text-center py-16 bg-white border-2 border-dashed border-stone-200 rounded-3xl shadow-nickpat space-y-3">
          <p className="text-sm font-bold text-stone-700">No creators found matching this criteria.</p>
          <Link
            href="/admin/creators/new"
            className="inline-flex items-center gap-1 text-xs text-[#B80F0A] font-bold uppercase tracking-wider hover:underline"
          >
            <span>Create your first creator profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="bg-white border-2 border-stone-200/90 rounded-3xl shadow-nickpat overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[650px]">
              <thead>
                <tr className="border-b-2 border-stone-100 text-stone-500 uppercase tracking-wider text-[10px] font-bold bg-stone-50/50">
                  <th className="py-3.5 px-4">Creator</th>
                  <th className="py-3.5 px-4">District / Hub</th>
                  <th className="py-3.5 px-4">Categories</th>
                  <th className="py-3.5 px-4">Total Reach</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
                {creators.map((c: any) => (
                  <tr key={c._id} className="hover:bg-[#FCECDF]/20 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <img
                        src={c.profileImage || "/placeholder-avatar.png"}
                        alt={c.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#B80F0A] shadow-sm"
                      />
                      <div>
                        <div className="font-bold text-sm text-[#111111] flex items-center gap-1.5">
                          {c.name}
                          {c.featured && (
                            <span className="text-[10px] px-2 py-0.5 bg-[#FBCB77] text-[#111111] font-bold rounded-full border border-stone-300">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-500 font-mono">/{c.slug}</div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-semibold text-stone-800">
                        <MapPin className="w-3.5 h-3.5 text-[#B80F0A]" />
                        {c.location}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {c.categories.slice(0, 3).map((cat: string) => (
                          <span
                            key={cat}
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FCECDF] text-stone-800 border border-stone-200"
                          >
                            {cat}
                          </span>
                        ))}
                        {c.categories.length > 3 && (
                          <span className="text-[10px] text-stone-500 font-bold self-center">
                            +{c.categories.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-anton text-base text-[#B80F0A]">
                      {formatFollowers(c.totalFollowers || 0)}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          c.status === "PUBLISHED"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                            : c.status === "DRAFT"
                            ? "bg-amber-50 text-amber-800 border border-amber-300"
                            : "bg-stone-100 text-stone-600 border border-stone-300"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/creators/${c._id}`}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-[#FCECDF] text-stone-800 hover:text-[#B80F0A] border border-stone-200 text-xs font-bold uppercase tracking-wider transition"
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