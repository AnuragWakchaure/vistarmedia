import Link from "next/link";
import { getLeadsAction } from "@/actions/lead.actions";
import { Search, Mail, Phone, Clock, ArrowRight, CheckCircle } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_BADGES: Record<string, { bg: string; text: string; border: string }> = {
  NEW: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  CONTACTED: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20" },
  PROPOSAL_SENT: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  NEGOTIATION: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  WON: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  LOST: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Campaign Inquiries CRM</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review, filter, and advance brand campaign leads from website forms.
        </p>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {["NEW", "CONTACTED", "PROPOSAL_SENT", "NEGOTIATION", "WON", "LOST"].map((status) => {
          const cfg = STATUS_BADGES[status];
          return (
            <div
              key={status}
              className={`p-3 rounded-xl bg-[#0F172A] border ${cfg.border} flex flex-col justify-between`}
            >
              <span className={`text-[10px] font-semibold tracking-wider ${cfg.text}`}>
                {status.replace("_", " ")}
              </span>
              <span className="text-xl font-bold text-white mt-1">
                {counts[status] || 0}
              </span>
            </div>
          );
        })}
      </div>

      {/* Filter Bar */}
      <form
        method="GET"
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0F172A] p-3 rounded-xl border border-white/5"
      >
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            name="q"
            defaultValue={resolvedParams.q || ""}
            placeholder="Search leads by brand, contact name, email, or phone..."
            className="w-full bg-[#080C14] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF]"
          />
        </div>
        <select
          name="status"
          defaultValue={resolvedParams.status || "ALL"}
          className="bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#0066FF]"
        >
          <option value="ALL">All Stages</option>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="PROPOSAL_SENT">Proposal Sent</option>
          <option value="NEGOTIATION">Negotiation</option>
          <option value="WON">Won</option>
          <option value="LOST">Lost</option>
        </select>
      </form>

      {/* Table */}
      {leads.length === 0 ? (
        <div className="text-center py-16 bg-[#0F172A] border border-white/5 rounded-xl">
          <p className="text-sm text-slate-400">No inquiries matching current criteria.</p>
        </div>
      ) : (
        <div className="bg-[#0F172A] border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 uppercase tracking-wider text-[10px] bg-white/[0.01]">
                  <th className="py-3 px-4">Brand & Contact</th>
                  <th className="py-3 px-4">Campaign Type</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Received</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {leads.map((lead: any) => {
                  const cfg = STATUS_BADGES[lead.status] || STATUS_BADGES.NEW;
                  return (
                    <tr key={lead._id} className="hover:bg-white/[0.02] transition">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{lead.brand}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{lead.name}</span>
                          <span>&bull;</span>
                          <span className="font-mono text-slate-500">{lead.phone}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-white">{lead.campaignType}</span>
                        <div className="text-[10px] text-slate-500">{lead.industry}</div>
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-300">
                        {lead.targetLocation}
                      </td>

                      <td className="py-3 px-4 font-mono text-white font-medium">
                        {lead.budget}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase border ${cfg.bg} ${cfg.text} ${cfg.border}`}
                        >
                          {lead.status.replace("_", " ")}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/admin/leads/${lead._id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
                        >
                          Details <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}