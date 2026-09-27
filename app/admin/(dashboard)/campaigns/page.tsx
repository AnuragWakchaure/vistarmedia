import Link from "next/link";
import { getCampaignsAction } from "@/actions/campaign.actions";
import { Plus, Search, Film, MapPin } from "lucide-react";
import {
  PageHeader,
  Button,
  Card,
  Badge,
  EmptyState,
} from "@/components/ui";

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
      <PageHeader
        badge={
          <Badge variant="default" dot size="sm">
            Case Studies & Track Record
          </Badge>
        }
        title={`Campaign Case Studies (${campaigns.length})`}
        description="Manage client campaigns, verified case studies, and performance statistics across Maharashtra."
        actions={
          <Link href="/admin/campaigns/new">
            <Button size="sm" className="gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Campaign</span>
            </Button>
          </Link>
        }
      />

      {/* Filter / Search Bar */}
      <Card className="p-3.5">
        <form method="GET" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative col-span-1 sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              name="q"
              defaultValue={resolvedParams.q || ""}
              placeholder="Search campaigns by title, brand, or objective..."
              className="w-full h-10 bg-[#090D14] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/40 rounded-lg pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
            />
          </div>
          <div className="flex gap-2">
            <select
              name="status"
              defaultValue={resolvedParams.status || "ALL"}
              className="flex-1 h-10 bg-[#090D14] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/40 rounded-lg px-3 text-xs text-white focus:outline-none transition font-medium uppercase [&>option]:bg-[#0E131E] [&>option]:text-white cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
              <option value="ARCHIVED">Archived</option>
            </select>
            <Button type="submit" variant="secondary" size="md">
              Filter
            </Button>
          </div>
        </form>
      </Card>

      {/* Campaign Grid */}
      {campaigns.length === 0 ? (
        <EmptyState
          icon={<Film className="w-6 h-6" />}
          title="No Campaigns Found"
          description="Try adjusting your search criteria or create your first case study."
          action={
            <Link href="/admin/campaigns/new">
              <Button size="sm" className="gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Create Case Study</span>
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {campaigns.map((camp: any) => (
            <Card
              key={camp._id}
              className="overflow-hidden flex flex-col justify-between hover:border-[#00B8F0]/40 transition-colors group"
            >
              <div>
                <div className="relative h-44 w-full bg-[#080B11] overflow-hidden">
                  <img
                    src={camp.coverImage}
                    alt={camp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <Badge
                      variant={camp.status === "PUBLISHED" ? "success" : "warning"}
                      size="sm"
                      dot
                    >
                      {camp.status}
                    </Badge>
                    {camp.featured && (
                      <Badge variant="default" size="sm">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                    <span className="text-[#00B8F0] font-semibold">{camp.brandId?.name || "Client"}</span>
                    <span>&bull;</span>
                    <span>{camp.industry}</span>
                  </div>

                  <h3 className="font-semibold text-base text-white group-hover:text-[#00B8F0] transition-colors leading-snug line-clamp-1">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-normal line-clamp-2 leading-relaxed">
                    {camp.objective}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-3 border-t border-white/[0.08]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#00B8F0]" />
                      {camp.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-slate-400" />
                      {camp.campaignType}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link href={`/admin/campaigns/${camp._id}`} className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    Edit Case Study
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}