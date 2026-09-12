import Link from "next/link";
import { getCampaignsAction } from "@/actions/campaign.actions";
import { Plus, Search, Film, MapPin, Sparkles } from "lucide-react";

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Campaign Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage agency case studies, client campaigns, and public metrics.
          </p>
        </div>
        <Link
          href="/admin/campaigns/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold rounded-lg transition"
        >
          <Plus className="w-4 h-4" />
          Add Campaign
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <form method="GET" className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0F172A] p-3 rounded-xl border border-white/5">
        <div className="relative col-span-1 sm:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            name="q"
            defaultValue={resolvedParams.q || ""}
            placeholder="Search campaigns by title or description..."
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

      {/* Campaign List */}
      {campaigns.length === 0 ? (
        <div className="text-center py-16 bg-[#0F172A] border border-white/5 rounded-xl">
          <p className="text-sm text-slate-400">No campaigns found.</p>
          <Link
            href="/admin/campaigns/new"
            className="mt-3 inline-block text-xs text-[#0066FF] hover:underline"
          >
            Create your first campaign &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {campaigns.map((camp: any) => (
            <div
              key={camp._id}
              className="bg-[#0F172A] border border-white/5 rounded-xl overflow-hidden flex flex-col justify-between hover:border-white/10 transition"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-900">
                  <img
                    src={camp.coverImage}
                    alt={camp.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase backdrop-blur-md ${
                        camp.status === "PUBLISHED"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {camp.status}
                    </span>
                    {camp.featured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" /> Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <span>{camp.brandId?.name || "Brand"}</span>
                    <span>&bull;</span>
                    <span>{camp.industry}</span>
                  </div>

                  <h3 className="font-bold text-sm text-white line-clamp-1">{camp.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{camp.objective}</p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#0066FF]" />
                      {camp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Film className="w-3 h-3" />
                      {camp.campaignType}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link
                  href={`/admin/campaigns/${camp._id}`}
                  className="block text-center py-2 bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white rounded-lg transition"
                >
                  Edit Campaign
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}