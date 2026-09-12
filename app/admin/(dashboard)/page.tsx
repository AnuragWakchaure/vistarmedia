import { connectDB } from "@/lib/db/client";
import { Creator } from "@/models/Creator";
import { Campaign } from "@/models/Campaign";
import { Lead } from "@/models/Lead";
import { Users, Film, Inbox, CheckCircle2, ArrowUpRight } from "lucide-react";
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
    Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  const stats = [
    {
      title: "Creators Network",
      value: `${totalCreators > 0 ? totalCreators : "200+"}`,
      subtitle: "Published across Maharashtra",
      icon: Users,
      color: "text-blue-400",
      href: "/admin/creators",
    },
    {
      title: "Active Campaigns",
      value: totalCampaigns.toString(),
      subtitle: "Published case studies",
      icon: Film,
      color: "text-emerald-400",
      href: "/admin/campaigns",
    },
    {
      title: "New Enquiries",
      value: newLeads.toString(),
      subtitle: "Require response/follow-up",
      icon: Inbox,
      color: "text-amber-400",
      href: "/admin/leads",
    },
    {
      title: "Won Deals",
      value: wonCampaigns.toString(),
      subtitle: "Converted agency clients",
      icon: CheckCircle2,
      color: "text-purple-400",
      href: "/admin/leads",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">System Overview</h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor your network reach, campaign performance, and incoming lead inquiries.
        </p>
      </div>

      {/* Numerical Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="p-5 rounded-xl bg-[#0F172A] border border-white/5 hover:border-[#0066FF]/50 transition flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{card.title}</span>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-white group-hover:text-[#0066FF] transition">
                  {card.value}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{card.subtitle}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries Table Preview */}
      <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white">Recent Enquiries</h2>
            <p className="text-xs text-slate-500">Latest brand campaign inquiries submitted from public forms</p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs text-[#0066FF] hover:underline inline-flex items-center gap-1"
          >
            View all leads <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-500 border border-dashed border-white/5 rounded-lg">
            No inquiries recorded yet. Form submissions will appear here automatically.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Brand</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">Industry</th>
                  <th className="pb-3">Budget</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {recentLeads.map((lead: any) => (
                  <tr key={lead._id.toString()} className="hover:bg-white/[0.02]">
                    <td className="py-3 font-semibold text-white">{lead.brand}</td>
                    <td className="py-3">{lead.name} ({lead.phone})</td>
                    <td className="py-3">{lead.industry}</td>
                    <td className="py-3 font-mono">{lead.budget}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-slate-500 font-mono">
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