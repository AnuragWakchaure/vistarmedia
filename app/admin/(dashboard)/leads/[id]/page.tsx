import { connectDB } from "@/lib/db/client";
import { Lead } from "@/models/Lead";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updateLeadStatusAction, addLeadNoteAction } from "@/actions/lead.actions";
import { ArrowLeft, Mail, Phone, Globe, MessageSquare, CheckCircle2 } from "lucide-react";

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

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D2FF] hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Inquiries
        </Link>
        <div className="text-xs text-slate-400 font-mono font-semibold">ID: {lead._id.toString()}</div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Core Lead Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#0D121D]/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  {lead.brand}
                </h1>
                <p className="text-xs text-slate-300 font-bold mt-0.5">Contact Person: {lead.name}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/30">
                {lead.status.replace("_", " ")}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium">
              <a
                href={`tel:${lead.phone}`}
                className="p-3 rounded-2xl bg-[#07090E]/80 border border-white/10 hover:border-[#00D2FF]/50 flex items-center gap-2.5 text-slate-200 transition"
              >
                <div className="w-8 h-8 rounded-xl bg-[#00D2FF]/10 text-[#00D2FF] flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Phone</div>
                  <div className="font-bold text-white">{lead.phone}</div>
                </div>
              </a>
              <a
                href={`mailto:${lead.email}`}
                className="p-3 rounded-2xl bg-[#07090E]/80 border border-white/10 hover:border-[#00D2FF]/50 flex items-center gap-2.5 text-slate-200 transition"
              >
                <div className="w-8 h-8 rounded-xl bg-[#00D2FF]/10 text-[#00D2FF] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Email</div>
                  <div className="font-bold text-white truncate max-w-[140px]">{lead.email}</div>
                </div>
              </a>
            </div>

            {lead.websiteOrInstagram && (
              <div className="p-3 rounded-2xl bg-[#07090E]/80 border border-white/10 flex items-center gap-2 text-xs text-slate-200 font-medium">
                <Globe className="w-4 h-4 text-[#00D2FF]" />
                <span className="font-bold">Website / Social:</span>
                <a
                  href={lead.websiteOrInstagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#00D2FF] font-bold hover:underline truncate"
                >
                  {lead.websiteOrInstagram}
                </a>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Industry</span>
                <span className="text-white font-bold">{lead.industry}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Campaign Type</span>
                <span className="text-white font-bold">{lead.campaignType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Target Location</span>
                <span className="text-white font-bold">{lead.targetLocation}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Target Budget</span>
                <span className="text-[#00D2FF] font-mono font-bold">{lead.budget}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Submission Date</span>
                <span className="text-slate-300 font-medium">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="text-slate-400 block text-[10px] font-bold uppercase mb-2">
                Campaign Brief & Client Requirements
              </span>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-[#07090E]/80 p-4 rounded-2xl border border-white/10 font-medium">
                {lead.requirements}
              </p>
            </div>
          </div>

          {/* Internal CRM Notes Section */}
          <div className="bg-[#0D121D]/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-4">
            <h2 className="font-anton text-xl text-white uppercase tracking-tight flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#00D2FF]" /> Internal Agency Discussion Notes
            </h2>

            <form action={handleAddNote} className="space-y-3">
              <textarea
                name="note"
                required
                rows={2}
                placeholder="Log a call, meeting notes, creator shortlist discussion, or pricing proposal..."
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#00D2FF] to-[#0A84FF] hover:from-[#38bdf8] hover:to-[#00D2FF] text-black text-xs font-bold uppercase tracking-wider rounded-full transition shadow-[0_0_15px_rgba(0,210,255,0.25)] cursor-pointer hover:scale-[1.02]"
                >
                  Add Note
                </button>
              </div>
            </form>

            <div className="space-y-2 pt-2">
              {!lead.notes || lead.notes.length === 0 ? (
                <div className="text-xs text-slate-500 italic p-3 rounded-xl bg-[#07090E]/60 text-center font-medium border border-white/5">
                  No internal notes recorded yet.
                </div>
              ) : (
                lead.notes
                  .slice()
                  .reverse()
                  .map((note: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#07090E]/80 border border-white/10 rounded-2xl text-xs space-y-1 font-medium"
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-bold text-[#00D2FF] uppercase tracking-wider">{note.author}</span>
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
          <div className="bg-[#0D121D]/90 p-6 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-4">
            <h2 className="font-anton text-lg text-white uppercase tracking-tight">
              Update Deal Stage
            </h2>
            <form action={handleStatusChange} className="space-y-3">
              <select
                name="status"
                defaultValue={lead.status}
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none transition font-bold uppercase [&>option]:bg-[#0D121D] [&>option]:text-white"
              >
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="PROPOSAL_SENT">Proposal Sent</option>
                <option value="NEGOTIATION">Negotiation</option>
                <option value="WON">Won Deal</option>
                <option value="LOST">Lost</option>
              </select>
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#00D2FF] to-[#0A84FF] hover:from-[#38bdf8] hover:to-[#00D2FF] text-black text-xs font-bold uppercase tracking-wider rounded-full transition shadow-[0_0_20px_rgba(0,210,255,0.3)] cursor-pointer hover:scale-[1.02]"
              >
                Update Stage
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}