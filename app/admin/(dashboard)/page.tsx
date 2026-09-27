import { connectDB } from "@/lib/db/client";
import { Creator } from "@/models/Creator";
import { Campaign } from "@/models/Campaign";
import { Lead } from "@/models/Lead";
import { Users, Film, Inbox, CheckCircle2, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, PageHeader, EmptyState } from "@/components/ui";

export const dynamic = "force-dynamic";

const STATUS_BADGE_MAP: Record<string, "default" | "info" | "success" | "warning" | "destructive" | "neutral"> = {
  NEW: "info",
  CONTACTED: "warning",
  PROPOSAL_SENT: "default",
  NEGOTIATION: "default",
  WON: "success",
  LOST: "neutral",
};

export default async function AdminDashboardPage() {
  await connectDB();

  // Calculate live database counts
  const [totalCreators, totalCampaigns, newLeads, wonCampaigns, recentLeads] = await Promise.all([
    Creator.countDocuments({ status: "PUBLISHED" }),
    Campaign.countDocuments({ status: "PUBLISHED" }),
    Lead.countDocuments({ status: "NEW" }),
    Lead.countDocuments({ status: "WON" }),
    Lead.find().sort({ createdAt: -1 }).limit(6).lean(),
  ]);

  const stats = [
    {
      title: "Creators Network",
      value: `${totalCreators > 0 ? totalCreators : "200+"}`,
      subtitle: "Verified creators in Maharashtra",
      icon: Users,
      badgeColor: "bg-[#00B8F0]/10 text-[#00B8F0] border-[#00B8F0]/25",
      href: "/admin/creators",
    },
    {
      title: "Active Campaigns",
      value: totalCampaigns.toString(),
      subtitle: "Published client case studies",
      icon: Film,
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/25",
      href: "/admin/campaigns",
    },
    {
      title: "New Inquiries",
      value: newLeads.toString(),
      subtitle: "Pending strategy response",
      icon: Inbox,
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/25",
      href: "/admin/leads",
    },
    {
      title: "Won Brand Deals",
      value: wonCampaigns.toString(),
      subtitle: "Converted agency partnerships",
      icon: CheckCircle2,
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
      href: "/admin/leads",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        badge={
          <Badge variant="default" dot size="sm">
            Live Pulse
          </Badge>
        }
        title="Dashboard Overview"
        description="Monitor real-time creator roster strength, active brand campaigns, and inbound client enquiries."
        actions={
          <Link href="/admin/creators/new">
            <Button size="sm" className="gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Creator</span>
            </Button>
          </Link>
        }
      />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href} className="group block focus-ring rounded-xl">
              <Card className="p-5 h-full flex flex-col justify-between hover:border-[#00B8F0]/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    {card.title}
                  </span>
                  <span className={`p-2 rounded-lg border ${card.badgeColor}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-4 space-y-1">
                  <div className="text-3xl font-bold tracking-tight text-white group-hover:text-[#00B8F0] transition-colors">
                    {card.value}
                  </div>
                  <div className="text-xs text-slate-400 font-normal">{card.subtitle}</div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries Table Preview */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#00B8F0]">
              Inbound Pipeline
            </div>
            <CardTitle className="text-lg mt-0.5">Recent Brand Inquiries</CardTitle>
          </div>
          <Link href="/admin/leads">
            <Button variant="outline" size="xs" className="gap-1.5">
              <span>View All Leads</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-0">
          {recentLeads.length === 0 ? (
            <EmptyState
              icon={<Inbox className="w-6 h-6" />}
              title="No Inquiries Recorded Yet"
              description="Submissions from website campaign forms will appear here automatically."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Received Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLeads.map((lead: any) => (
                  <TableRow key={lead._id.toString()}>
                    <TableCell className="font-semibold text-white">{lead.brand}</TableCell>
                    <TableCell>
                      <div className="text-white font-medium">{lead.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{lead.phone || lead.email}</div>
                    </TableCell>
                    <TableCell>{lead.industry || "—"}</TableCell>
                    <TableCell className="font-mono font-medium text-slate-200">{lead.budget || "Flexible"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={STATUS_BADGE_MAP[lead.status] || "neutral"}
                        size="sm"
                        dot
                      >
                        {lead.status?.replace("_", " ") || "NEW"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-slate-400 font-mono text-[11px]">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}