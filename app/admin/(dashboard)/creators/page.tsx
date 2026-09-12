import Link from "next/link";
import { getCreatorsAction, toggleCreatorStatusAction, deleteCreatorAction } from "@/actions/creator.actions";
import { Plus, Search, ExternalLink, MapPin } from "lucide-react";
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Creator Network</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage influencers, regional content creators, and profile metadata.
          </p>
        </div>
        <Link
          href="/admin/creators/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold rounded-lg transition"
        >
          <Plus className="w-4 h-4" />
          Add Creator
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <form method="GET" className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0F172A] p-3 rounded-xl border border-white/5">
        <div className="relative col-span-1 sm:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            name="q"
            defaultValue={resolvedParams.q || ""}
            placeholder="Search creator by name or bio..."
            className="w-full bg-[#080C14] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF]"
          />
        </div>
        <select
          name="status"
          defaultValue={resolvedParams.status || "ALL"}
          className="bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#0066FF]"
        >
          <option value="ALL">All Statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </form>

      {/* Creator Grid / Table */}
      {creators.length === 0 ? (
        <div className="text-center py-16 bg-[#0F172A] border border-white/5 rounded-xl">
          <p className="text-sm text-slate-400">No creators found matching this criteria.</p>
          <Link
            href="/admin/creators/new"
            className="mt-3 inline-block text-xs text-[#0066FF] hover:underline"
          >
            Create your first creator profile &rarr;
          </Link>
        </div>
      ) : (
        <div className="bg-[#0F172A] border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 uppercase tracking-wider text-[10px] bg-white/[0.01]">
                  <th className="py-3 px-4">Creator</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Categories</th>
                  <th className="py-3 px-4">Reach</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {creators.map((c: any) => (
                  <tr key={c._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={c.profileImage || "/placeholder-avatar.png"}
                        alt={c.name}
                        className="w-10 h-10 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <div className="font-semibold text-white flex items-center gap-1.5">
                          {c.name}
                          {c.featured && (
                            <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">/{c.slug}</div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3 h-3 text-[#0066FF]" />
                        {c.location}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {c.categories.slice(0, 3).map((cat: string) => (
                          <span
                            key={cat}
                            className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-slate-300"
                          >
                            {cat}
                          </span>
                        ))}
                        {c.categories.length > 3 && (
                          <span className="text-[10px] text-slate-500 self-center">
                            +{c.categories.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono font-medium text-white">
                      {formatFollowers(c.totalFollowers || 0)}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          c.status === "PUBLISHED"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : c.status === "DRAFT"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/creators/${c._id}`}
                          className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
                        >
                          Edit
                        </Link>
                      </div>
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