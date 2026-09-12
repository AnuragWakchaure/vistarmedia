import Link from "next/link";
import { getLeadsAction } from "@/actions/lead.actions";
import { Search, ArrowRight, Inbox, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_BADGES: Record<string, { bg: string; text: string; border: string }> = {
  NEW: { bg: "bg-[#FCECDF]", text: "text-[#B80F0A]", border: "border-2 border-dashed border-[#B80F0A]" },
  CONTACTED: { bg: "bg-amber-50", text: "text-amber-800", border: "border border-amber-300" },
  PROPOSAL_SENT: { bg: "bg-blue-50", text: "text-blue-800", border: "border border-blue-300" },
  NEGOTIATION: { bg: "bg-purple-50", text: "text-purple-800", border: "border border-purple-300" },
  WON: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border border-emerald-300" },
  LOST: { bg: "bg-stone-100", text: "text-stone-600", border: "border border-stone-300" },
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
            <Inbox className="w-3.5 h-3.5" />
            <span>Campaign Leads & Inquiries</span>
          </div>
          <h1 className="font-anton text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
            Client Inquiries CRM
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-medium max-w-xl">
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
              className={`p-4 rounded-2xl bg-white border-2 border-stone-200/90 shadow-nickpat flex flex-col justify-between`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block w-fit ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                {status.replace("_", " ")}
              </span>
              <span className="font-anton text-3xl text-[#111111] mt-3">
                {counts[status] || 0}
              </span>
            </div>
          );
        })}
      </div>

      {/* Filter Bar */}
      <form
        method="GET"
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border-2 border-stone-200/90 shadow-nickpat"
      >
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            name="q"
            defaultValue={resolvedParams.q || ""}
            placeholder="Search leads by brand, contact name, email, or phone..."
            className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
          />
        </div>
        <div className="flex gap-2">
          <select
            name="status"
            defaultValue={resolvedParams.status || "ALL"}
            className="flex-1 bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3 py-2.5 text-xs text-[#111111] focus:outline-none transition font-bold uppercase"
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
            className="px-5 py-2.5 bg-[#B80F0A] hover:bg-[#960C08] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-sm cursor-pointer"
          >
            Filter
          </button>
        </div>
      </form>

      {/* Table */}
      {leads.length === 0 ? (
        <div className="text-center py-16 bg-white border-2 border-dashed border-stone-200 rounded-3xl shadow-nickpat space-y-2">
          <p className="text-sm font-bold text-stone-700">No inquiries matching current criteria.</p>
          <p className="text-xs text-stone-500">Try clearing the search query or changing filter stages.</p>
        </div>
      ) : (
        <div className="bg-white border-2 border-stone-200/90 rounded-3xl shadow-nickpat overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[650px]">
              <thead>
                <tr className="border-b-2 border-stone-100 text-stone-500 uppercase tracking-wider text-[10px] font-bold bg-stone-50/50">
                  <th className="py-3.5 px-4">Brand & Contact</th>
                  <th className="py-3.5 px-4">Campaign Type</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Budget</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Received</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
                {leads.map((lead: any) => {
                  const cfg = STATUS_BADGES[lead.status] || STATUS_BADGES.NEW;
                  return (
                    <tr key={lead._id} className="hover:bg-[#FCECDF]/20 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#111111]">{lead.brand}</div>
                        <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                          <span>{lead.name}</span>
                          <span>&bull;</span>
                          <span className="font-mono">{lead.phone}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-[#111111] font-semibold">{lead.campaignType}</span>
                        <div className="text-[11px] text-stone-500">{lead.industry}</div>
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        {lead.targetLocation}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-[#B80F0A]">
                        {lead.budget}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${cfg.bg} ${cfg.text} ${cfg.border}`}
                        >
                          {lead.status.replace("_", " ")}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-stone-500 font-mono text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/admin/leads/${lead._id}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-[#FCECDF] text-stone-800 hover:text-[#B80F0A] border border-stone-200 text-xs font-bold uppercase tracking-wider transition"
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