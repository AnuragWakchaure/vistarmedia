import { connectDB } from "@/lib/db/client";
import { Lead } from "@/models/Lead";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updateLeadStatusAction, addLeadNoteAction } from "@/actions/lead.actions";
import { ArrowLeft, Mail, Phone, Globe, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();

  const lead = await Lead.findById(id).lean();
  if (!lead) return notFound();

  async function handleStatusChange(formData: FormData) {
    "use server";
    const status = formData.get("status") as string;
    await updateLeadStatusAction(id, status);
  }

  async function handleAddNote(formData: FormData) {
    "use server";
    const note = formData.get("note") as string;
    if (note?.trim()) {
      await addLeadNoteAction(id, note.trim());
    }
  }

  const statusVariantMap: Record<string, "info" | "warning" | "success" | "neutral" | "destructive"> = {
    NEW: "info",
    CONTACTED: "warning",
    PROPOSAL_SENT: "info",
    NEGOTIATION: "warning",
    WON: "success",
    LOST: "destructive",
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Inquiries
        </Link>
        <span className="text-xs text-slate-400 font-mono">ID: {lead._id.toString()}</span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Core Lead Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#0E131E] p-6 rounded-xl border border-white/10 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  {lead.brand}
                </h1>
                <p className="text-xs text-slate-400 mt-1">Contact Person: <span className="text-slate-200 font-medium">{lead.name}</span></p>
              </div>
              <Badge variant={statusVariantMap[lead.status] || "neutral"}>
                {lead.status.replace("_", " ")}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <a
                href={`tel:${lead.phone}`}
                className="p-3 rounded-lg bg-[#080B11] border border-white/10 hover:border-[#00B8F0]/40 flex items-center gap-3 text-slate-200 transition"
              >
                <div className="w-8 h-8 rounded-md bg-[#00B8F0]/10 text-[#00B8F0] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Phone</div>
                  <div className="font-medium text-white">{lead.phone}</div>
                </div>
              </a>
              <a
                href={`mailto:${lead.email}`}
                className="p-3 rounded-lg bg-[#080B11] border border-white/10 hover:border-[#00B8F0]/40 flex items-center gap-3 text-slate-200 transition"
              >
                <div className="w-8 h-8 rounded-md bg-[#00B8F0]/10 text-[#00B8F0] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Email</div>
                  <div className="font-medium text-white truncate">{lead.email}</div>
                </div>
              </a>
            </div>

            {lead.websiteOrInstagram && (
              <div className="p-3 rounded-lg bg-[#080B11] border border-white/10 flex items-center gap-2 text-xs text-slate-300">
                <Globe className="w-4 h-4 text-[#00B8F0] shrink-0" />
                <span className="font-medium text-slate-400">Website / Social:</span>
                <a
                  href={lead.websiteOrInstagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#00B8F0] hover:underline truncate"
                >
                  {lead.websiteOrInstagram}
                </a>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Industry</span>
                <span className="text-white font-medium">{lead.industry}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Campaign Type</span>
                <span className="text-white font-medium">{lead.campaignType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Target Location</span>
                <span className="text-white font-medium">{lead.targetLocation}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Budget Band</span>
                <span className="text-[#00B8F0] font-mono font-medium">{lead.budget}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Submission Date</span>
                <span className="text-slate-300 font-medium">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold mb-2">
                Campaign Brief & Requirements
              </span>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-[#080B11] p-4 rounded-lg border border-white/10">
                {lead.requirements}
              </p>
            </div>
          </div>

          {/* Internal CRM Notes Section */}
          <div className="bg-[#0E131E] p-6 rounded-xl border border-white/10 space-y-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#00B8F0]" /> Internal Team Notes
            </h2>

            <form action={handleAddNote} className="space-y-3">
              <textarea
                name="note"
                required
                rows={2}
                placeholder="Log a call, meeting notes, creator shortlist discussion, or pricing proposal..."
                className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
              <div className="flex justify-end">
                <Button type="submit" variant="primary" size="sm">
                  Add Note
                </Button>
              </div>
            </form>

            <div className="space-y-2 pt-2">
              {!lead.notes || lead.notes.length === 0 ? (
                <div className="text-xs text-slate-500 italic p-3 rounded-lg bg-[#080B11] text-center border border-white/5">
                  No internal notes recorded yet.
                </div>
              ) : (
                lead.notes
                  .slice()
                  .reverse()
                  .map((note: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#080B11] border border-white/10 rounded-lg text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-semibold text-[#00B8F0]">{note.author}</span>
                        <span className="font-mono">{new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-200">{note.body}</p>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Status Control */}
        <div className="space-y-4">
          <div className="bg-[#0E131E] p-5 rounded-xl border border-white/10 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Update Deal Stage
            </h2>
            <form action={handleStatusChange} className="space-y-3">
              <select
                name="status"
                defaultValue={lead.status}
                className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition font-medium [&>option]:bg-[#0E131E] [&>option]:text-white"
              >
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="PROPOSAL_SENT">Proposal Sent</option>
                <option value="NEGOTIATION">Negotiation</option>
                <option value="WON">Won Deal</option>
                <option value="LOST">Lost</option>
              </select>
              <Button type="submit" variant="primary" size="sm" className="w-full">
                Update Stage
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}