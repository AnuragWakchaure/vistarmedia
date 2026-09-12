import { connectDB } from "@/lib/db/client";
import { Creator } from "@/models/Creator";
import { Campaign } from "@/models/Campaign";
import { Lead } from "@/models/Lead";
import { Users, Film, Inbox, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

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
      badgeColor: "bg-[#FCECDF] text-[#B80F0A] border-[#B80F0A]/30",
      href: "/admin/creators",
    },
    {
      title: "Active Campaigns",
      value: totalCampaigns.toString(),
      subtitle: "Published client case studies",
      icon: Film,
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      href: "/admin/campaigns",
    },
    {
      title: "New Inquiries",
      value: newLeads.toString(),
      subtitle: "Pending strategy response",
      icon: Inbox,
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
      href: "/admin/leads",
    },
    {
      title: "Won Brand Deals",
      value: wonCampaigns.toString(),
      subtitle: "Converted agency partnerships",
      icon: CheckCircle2,
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      href: "/admin/leads",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live Agency Pulse</span>
          </div>
          <h1 className="font-anton text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-medium max-w-xl">
            Monitor real-time creator roster strength, active brand campaigns, and inbound client enquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/creators/new"
            className="px-5 py-2.5 rounded-full bg-[#B80F0A] hover:bg-[#960C08] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm hover:scale-[1.02] inline-flex items-center gap-1.5"
          >
            <span>Add Creator</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Numerical Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="p-6 rounded-3xl bg-white border-2 border-stone-200/90 hover:border-[#B80F0A] shadow-nickpat hover:shadow-nickpat-lg transition-all flex flex-col justify-between group h-full"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {card.title}
                </span>
                <span className={`p-2 rounded-xl border ${card.badgeColor}`}>
                  <Icon className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-6 space-y-1">
                <div className="font-anton text-4xl text-[#111111] group-hover:text-[#B80F0A] transition-colors">
                  {card.value}
                </div>
                <div className="text-xs text-stone-600 font-medium">{card.subtitle}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries Table Preview */}
      <div className="bg-white border-2 border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-nickpat space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-stone-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#B80F0A] uppercase tracking-wider">
              Inbound Leads Pipeline
            </div>
            <h2 className="font-anton text-2xl sm:text-3xl text-[#111111] uppercase tracking-tight mt-1">
              Recent Brand Enquiries
            </h2>
          </div>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-stone-50 text-[#B80F0A] border-2 border-[#B80F0A] text-xs font-bold uppercase tracking-wider transition shadow-sm hover:scale-[1.02]"
          >
            <span>View All Leads</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="text-center py-12 text-xs text-stone-500 border-2 border-dashed border-stone-200 rounded-2xl bg-[#FCECDF]/30 font-medium">
            No inquiries recorded yet. Submissions from campaign forms will populate here automatically.
          </div>
        ) : (
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full text-left text-xs min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-stone-100 text-stone-500 uppercase tracking-wider text-[10px] font-bold">
                  <th className="pb-3 px-3">Brand Name</th>
                  <th className="pb-3 px-3">Contact</th>
                  <th className="pb-3 px-3">Industry</th>
                  <th className="pb-3 px-3">Budget</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3 text-right">Received Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
                {recentLeads.map((lead: any) => (
                  <tr key={lead._id.toString()} className="hover:bg-[#FCECDF]/20 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-[#111111]">{lead.brand}</td>
                    <td className="py-3.5 px-3">
                      <div className="text-stone-900 font-semibold">{lead.name}</div>
                      <div className="text-[11px] text-stone-500 font-mono">{lead.phone}</div>
                    </td>
                    <td className="py-3.5 px-3">{lead.industry}</td>
                    <td className="py-3.5 px-3 font-mono font-bold text-[#B80F0A]">{lead.budget}</td>
                    <td className="py-3.5 px-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#FCECDF] text-[#B80F0A] border border-[#B80F0A]/30">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right text-stone-500 font-mono text-[11px]">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}