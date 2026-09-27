import Link from "next/link";
import { getLeadsAction } from "@/actions/lead.actions";
import { Search, ArrowRight, Inbox } from "lucide-react";
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

const STATUS_BADGE_MAP: Record<string, "default" | "info" | "success" | "warning" | "destructive" | "neutral"> = {
  NEW: "info",
  CONTACTED: "warning",
  PROPOSAL_SENT: "default",
  NEGOTIATION: "default",
  WON: "success",
  LOST: "neutral",
};

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; industry?: string }>;
}) {
  const resolvedParams = await searchParams;
  const leads = await getLeadsAction({
    search: resolvedParams.q,
    status: resolvedParams.status,
    industry: resolvedParams.industry,
  });

  const counts = leads.reduce((acc: any, lead: any) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        badge={
          <Badge variant="default" dot size="sm">
            Inbound CRM
          </Badge>
        }
        title="Client Inquiries CRM"
        description="Review, filter, and advance inbound brand campaign leads from website forms across Maharashtra."
      />

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {["NEW", "CONTACTED", "PROPOSAL_SENT", "NEGOTIATION", "WON", "LOST"].map((status) => {
          return (
            <Card key={status} className="p-3.5 flex flex-col justify-between">
              <Badge variant={STATUS_BADGE_MAP[status] || "neutral"} size="sm">
                {status.replace("_", " ")}
              </Badge>
              <span className="text-2xl font-bold tracking-tight text-white mt-3">
                {counts[status] || 0}
              </span>
            </Card>
          );
        })}
      </div>

      {/* Filter Bar */}
      <Card className="p-3.5">
        <form method="GET" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              name="q"
              defaultValue={resolvedParams.q || ""}
              placeholder="Search leads by brand, contact name, email, or phone..."
              className="w-full h-10 bg-[#090D14] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/40 rounded-lg pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
            />
          </div>
          <div className="flex gap-2">
            <select
              name="status"
              defaultValue={resolvedParams.status || "ALL"}
              className="flex-1 h-10 bg-[#090D14] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/40 rounded-lg px-3 text-xs text-white focus:outline-none transition font-medium uppercase [&>option]:bg-[#0E131E] [&>option]:text-white cursor-pointer"
            >
              <option value="ALL">All Stages</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="PROPOSAL_SENT">Proposal Sent</option>
              <option value="NEGOTIATION">Negotiation</option>
              <option value="WON">Won</option>
              <option value="LOST">Lost</option>
            </select>
            <Button type="submit" variant="secondary" size="md">
              Filter
            </Button>
          </div>
        </form>
      </Card>

      {/* Table */}
      {leads.length === 0 ? (
        <EmptyState
          icon={<Inbox className="w-6 h-6" />}
          title="No Inquiries Recorded"
          description="Try clearing your search query or adjusting stage filters to find matching leads."
        />
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand & Contact</TableHead>
                  <TableHead>Campaign Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead: any) => {
                  return (
                    <TableRow key={lead._id}>
                      <TableCell>
                        <div className="font-semibold text-white">{lead.brand}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5 font-normal">
                          <span>{lead.name}</span>
                          <span>&bull;</span>
                          <span className="font-mono">{lead.phone || lead.email}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span className="text-white font-medium">{lead.campaignType}</span>
                        <div className="text-[11px] text-slate-400">{lead.industry || "General"}</div>
                      </TableCell>

                      <TableCell className="text-slate-300 font-medium">
                        {lead.targetLocation || "Maharashtra"}
                      </TableCell>

                      <TableCell className="font-mono font-medium text-slate-200">
                        {lead.budget || "Flexible"}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={STATUS_BADGE_MAP[lead.status] || "neutral"}
                          size="sm"
                          dot
                        >
                          {lead.status.replace("_", " ")}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-slate-400 font-mono text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </TableCell>

                      <TableCell className="text-right">
                        <Link href={`/admin/leads/${lead._id}`}>
                          <Button variant="outline" size="xs" className="gap-1">
                            <span>Details</span>
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}