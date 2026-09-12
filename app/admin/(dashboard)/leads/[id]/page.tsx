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
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B80F0A] hover:underline transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Inquiries
        </Link>
        <div className="text-xs text-stone-500 font-mono font-semibold">ID: {lead._id.toString()}</div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Core Lead Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200/90 shadow-nickpat space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-anton text-2xl sm:text-3xl text-[#111111] uppercase tracking-tight">
                  {lead.brand}
                </h1>
                <p className="text-xs text-stone-600 font-bold mt-0.5">Contact Person: {lead.name}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#FCECDF] text-[#B80F0A] border-2 border-dashed border-[#B80F0A]">
                {lead.status.replace("_", " ")}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium">
              <a
                href={`tel:${lead.phone}`}
                className="p-3 rounded-2xl bg-[#FCECDF]/30 border-2 border-stone-200 hover:border-[#B80F0A] flex items-center gap-2.5 text-stone-800 transition"
              >
                <div className="w-8 h-8 rounded-xl bg-[#B80F0A]/10 text-[#B80F0A] flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-stone-500 font-bold uppercase">Phone</div>
                  <div className="font-bold text-[#111111]">{lead.phone}</div>
                </div>
              </a>
              <a
                href={`mailto:${lead.email}`}
                className="p-3 rounded-2xl bg-[#FCECDF]/30 border-2 border-stone-200 hover:border-[#B80F0A] flex items-center gap-2.5 text-stone-800 transition"
              >
                <div className="w-8 h-8 rounded-xl bg-[#B80F0A]/10 text-[#B80F0A] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-stone-500 font-bold uppercase">Email</div>
                  <div className="font-bold text-[#111111] truncate max-w-[140px]">{lead.email}</div>
                </div>
              </a>
            </div>

            {lead.websiteOrInstagram && (
              <div className="p-3 rounded-2xl bg-[#FCECDF]/30 border-2 border-stone-200 flex items-center gap-2 text-xs text-stone-800 font-medium">
                <Globe className="w-4 h-4 text-[#B80F0A]" />
                <span className="font-bold">Website / Social:</span>
                <a
                  href={lead.websiteOrInstagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#B80F0A] font-bold hover:underline truncate"
                >
                  {lead.websiteOrInstagram}
                </a>
              </div>
            )}

            <div className="pt-4 border-t-2 border-stone-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-stone-400 block text-[10px] font-bold uppercase">Industry</span>
                <span className="text-[#111111] font-bold">{lead.industry}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] font-bold uppercase">Campaign Type</span>
                <span className="text-[#111111] font-bold">{lead.campaignType}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] font-bold uppercase">Target Location</span>
                <span className="text-[#111111] font-bold">{lead.targetLocation}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] font-bold uppercase">Target Budget</span>
                <span className="text-[#B80F0A] font-mono font-bold">{lead.budget}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] font-bold uppercase">Submission Date</span>
                <span className="text-stone-700 font-medium">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-stone-100">
              <span className="text-stone-500 block text-[10px] font-bold uppercase mb-2">
                Campaign Brief & Client Requirements
              </span>
              <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-line bg-[#FCECDF]/30 p-4 rounded-2xl border border-stone-200 font-medium">
                {lead.requirements}
              </p>
            </div>
          </div>

          {/* Internal CRM Notes Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200/90 shadow-nickpat space-y-4">
            <h2 className="font-anton text-xl text-[#111111] uppercase tracking-tight flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#B80F0A]" /> Internal Agency Discussion Notes
            </h2>

            <form action={handleAddNote} className="space-y-3">
              <textarea
                name="note"
                required
                rows={2}
                placeholder="Log a call, meeting notes, creator shortlist discussion, or pricing proposal..."
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-2xl p-3 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B80F0A] hover:bg-[#960C08] text-white text-xs font-bold uppercase tracking-wider rounded-full transition shadow-sm cursor-pointer hover:scale-[1.02]"
                >
                  Add Note
                </button>
              </div>
            </form>

            <div className="space-y-2 pt-2">
              {!lead.notes || lead.notes.length === 0 ? (
                <div className="text-xs text-stone-400 italic p-3 rounded-xl bg-stone-50 text-center font-medium">
                  No internal notes recorded yet.
                </div>
              ) : (
                lead.notes
                  .slice()
                  .reverse()
                  .map((note: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#FCECDF]/20 border border-stone-200 rounded-2xl text-xs space-y-1 font-medium"
                    >
                      <div className="flex items-center justify-between text-[10px] text-stone-500">
                        <span className="font-bold text-[#B80F0A] uppercase tracking-wider">{note.author}</span>
                        <span className="font-mono">{new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-stone-800">{note.body}</p>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Status Control */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border-2 border-stone-200/90 shadow-nickpat space-y-4">
            <h2 className="font-anton text-lg text-[#111111] uppercase tracking-tight">
              Update Deal Stage
            </h2>
            <form action={handleStatusChange} className="space-y-3">
              <select
                name="status"
                defaultValue={lead.status}
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3 py-2.5 text-xs text-[#111111] focus:outline-none transition font-bold uppercase"
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
                className="w-full py-2.5 bg-[#B80F0A] hover:bg-[#960C08] text-white text-xs font-bold uppercase tracking-wider rounded-full transition shadow-sm cursor-pointer hover:scale-[1.02]"
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