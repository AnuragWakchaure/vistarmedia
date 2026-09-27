import Link from "next/link";
import { getCreatorsAction } from "@/actions/creator.actions";
import { Plus, Search, MapPin } from "lucide-react";
import { formatFollowers } from "@/lib/utils";
import {
  PageHeader,
  Button,
  Card,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  EmptyState,
} from "@/components/ui";

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
      <PageHeader
        badge={
          <Badge variant="default" dot size="sm">
            Talent Management
          </Badge>
        }
        title={`Creator Network (${creators.length})`}
        description="Manage vernacular creators, agricultural influencers, and regional storytellers across Maharashtra."
        actions={
          <Link href="/admin/creators/new">
            <Button size="sm" className="gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Creator</span>
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
              placeholder="Search creator by name, bio, or district..."
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

      {/* Creator Grid / Table */}
      {creators.length === 0 ? (
        <EmptyState
          title="No Creators Found"
          description="Try adjusting your search query or status filter to find matching creator profiles."
          action={
            <Link href="/admin/creators/new">
              <Button size="sm" className="gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Create Creator Profile</span>
              </Button>
            </Link>
          }
        />
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Creator</TableHead>
                  <TableHead>District / Hub</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>Total Reach</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creators.map((c: any) => (
                  <TableRow key={c._id}>
                    <TableCell className="flex items-center gap-3">
                      <img
                        src={c.profileImage || "/placeholder-avatar.png"}
                        alt={c.name}
                        className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0 bg-white/[0.05]"
                      />
                      <div>
                        <div className="font-semibold text-xs text-white flex items-center gap-1.5">
                          <span>{c.name}</span>
                          {c.featured && (
                            <Badge variant="default" size="sm">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">/{c.slug}</div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-slate-300 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#00B8F0]" />
                        {c.location}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {c.categories.slice(0, 3).map((cat: string) => (
                          <Badge key={cat} variant="neutral" size="sm">
                            {cat}
                          </Badge>
                        ))}
                        {c.categories.length > 3 && (
                          <span className="text-[10px] text-slate-500 font-medium self-center pl-1">
                            +{c.categories.length - 3}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="font-mono font-semibold text-white">
                      {formatFollowers(c.totalFollowers || 0)}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          c.status === "PUBLISHED"
                            ? "success"
                            : c.status === "DRAFT"
                            ? "warning"
                            : "neutral"
                        }
                        size="sm"
                        dot
                      >
                        {c.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <Link href={`/admin/creators/${c._id}`}>
                        <Button variant="outline" size="xs">
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}