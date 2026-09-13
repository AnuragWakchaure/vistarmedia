import Link from "next/link";
import { getLeadsAction } from "@/actions/lead.actions";
import { Search, ArrowRight, Inbox, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_BADGES: Record<string, { bg: string; text: string; border: string }> = {
  NEW: { bg: "bg-[#00D2FF]/10", text: "text-[#00D2FF]", border: "border border-[#00D2FF]/30" },
  CONTACTED: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border border-amber-500/30" },
  PROPOSAL_SENT: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border border-blue-500/30" },
  NEGOTIATION: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border border-purple-500/30" },
  WON: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border border-emerald-500/30" },
  LOST: { bg: "bg-slate-500/10", text: "text-slate-400", border: "border border-slate-500/30" },
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.15)]">
            <Inbox className="w-3.5 h-3.5" />
            <span>Campaign Leads & Inquiries</span>
          </div>
          <h1 className="font-anton text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Client Inquiries CRM
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xl">
            Review, filter, and advance inbound brand campaign leads from website forms across Maharashtra.
          </p>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {["NEW", "CONTACTED", "PROPOSAL_SENT", "NEGOTIATION", "WON", "LOST"].map((status) => {
          const cfg = STATUS_BADGES[status];
          return (
            <div
              key={status}
              className={`p-4 rounded-2xl bg-[#0D121D]/90 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col justify-between`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block w-fit ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                {status.replace("_", " ")}
              </span>
              <span className="font-anton text-3xl text-white mt-3">
                {counts[status] || 0}
              </span>
            </div>
          );
        })}
      </div>

      {/* Filter Bar */}
      <form
        method="GET"
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0D121D]/90 p-4 rounded-2xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
      >
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            name="q"
            defaultValue={resolvedParams.q || ""}
            placeholder="Search leads by brand, contact name, email, or phone..."
            className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
          />
        </div>
        <div className="flex gap-2">
          <select
            name="status"
            defaultValue={resolvedParams.status || "ALL"}
            className="flex-1 bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none transition font-bold uppercase [&>option]:bg-[#0D121D] [&>option]:text-white"
          >
            <option value="ALL">All Stages</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="PROPOSAL_SENT">Proposal Sent</option>
            <option value="NEGOTIATION">Negotiation</option>
            <option value="WON">Won</option>
            <option value="LOST">Lost</option>
          </select>
          <button
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-r from-[#00D2FF] to-[#0A84FF] hover:from-[#38bdf8] hover:to-[#00D2FF] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-[0_0_15px_rgba(0,210,255,0.25)] cursor-pointer"
          >
            Filter
          </button>
        </div>
      </form>

      {/* Table */}
      {leads.length === 0 ? (
        <div className="text-center py-16 bg-[#0D121D]/90 border border-dashed border-white/10 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] space-y-2 backdrop-blur-md">
          <p className="text-sm font-bold text-slate-300">No inquiries matching current criteria.</p>
          <p className="text-xs text-slate-500">Try clearing the search query or changing filter stages.</p>
        </div>
      ) : (
        <div className="bg-[#0D121D]/90 border border-white/10 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[650px]">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px] font-bold bg-white/[0.02]">
                  <th className="py-3.5 px-4">Brand & Contact</th>
                  <th className="py-3.5 px-4">Campaign Type</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Budget</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Received</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                {leads.map((lead: any) => {
                  const cfg = STATUS_BADGES[lead.status] || STATUS_BADGES.NEW;
                  return (
                    <tr key={lead._id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{lead.brand}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{lead.name}</span>
                          <span>&bull;</span>
                          <span className="font-mono">{lead.phone}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-white font-semibold">{lead.campaignType}</span>
                        <div className="text-[11px] text-slate-400">{lead.industry}</div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {lead.targetLocation}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-[#00D2FF]">
                        {lead.budget}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${cfg.bg} ${cfg.text} ${cfg.border}`}
                        >
                          {lead.status.replace("_", " ")}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/admin/leads/${lead._id}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-[#00D2FF] border border-white/10 hover:border-[#00D2FF]/40 text-xs font-bold uppercase tracking-wider transition"
                        >
                          <span>Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
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