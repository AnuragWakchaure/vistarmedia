import { connectDB } from "@/lib/db/client";
import { Lead } from "@/models/Lead";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updateLeadStatusAction, addLeadNoteAction } from "@/actions/lead.actions";
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, DollarSign, Calendar, Globe } from "lucide-react";

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
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Inquiries
        </Link>
        <div className="text-xs text-slate-500 font-mono">ID: {lead._id.toString()}</div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Core Lead Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#0F172A] p-6 rounded-xl border border-white/5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-bold text-white">{lead.brand}</h1>
                <p className="text-xs text-slate-400 mt-0.5">Contact: {lead.name}</p>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-semibold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {lead.status.replace("_", " ")}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <a
                href={`tel:${lead.phone}`}
                className="p-2.5 rounded-lg bg-[#080C14] border border-white/5 flex items-center gap-2 text-slate-300 hover:text-white"
              >
                <Phone className="w-4 h-4 text-[#0066FF]" />
                {lead.phone}
              </a>
              <a
                href={`mailto:${lead.email}`}
                className="p-2.5 rounded-lg bg-[#080C14] border border-white/5 flex items-center gap-2 text-slate-300 hover:text-white"
              >
                <Mail className="w-4 h-4 text-[#0066FF]" />
                {lead.email}
              </a>
            </div>

            {lead.websiteOrInstagram && (
              <div className="p-2.5 rounded-lg bg-[#080C14] border border-white/5 flex items-center gap-2 text-xs text-slate-300">
                <Globe className="w-4 h-4 text-[#0066FF]" />
                <span>Website / Social:</span>
                <a
                  href={lead.websiteOrInstagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {lead.websiteOrInstagram}
                </a>
              </div>
            )}

            <div className="pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Industry</span>
                <span className="text-white font-medium">{lead.industry}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Type</span>
                <span className="text-white font-medium">{lead.campaignType}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Location</span>
                <span className="text-white font-medium">{lead.targetLocation}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Budget</span>
                <span className="text-white font-mono font-medium">{lead.budget}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Submitted</span>
                <span className="text-slate-300">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <span className="text-slate-500 block text-[10px] uppercase mb-1">
                Campaign Brief & Requirements
              </span>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-[#080C14] p-3 rounded-lg border border-white/5">
                {lead.requirements}
              </p>
            </div>
          </div>

          {/* Internal CRM Notes Section */}
          <div className="bg-[#0F172A] p-6 rounded-xl border border-white/5 space-y-4">
            <h2 className="text-sm font-semibold text-white">Internal Discussion Notes</h2>

            <form action={handleAddNote} className="space-y-2">
              <textarea
                name="note"
                required
                rows={2}
                placeholder="Log a client interaction, call notes, or follow-up status..."
                className="w-full bg-[#080C14] border border-white/10 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF]"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold rounded-lg transition"
                >
                  Add Note
                </button>
              </div>
            </form>

            <div className="space-y-2 pt-2">
              {!lead.notes || lead.notes.length === 0 ? (
                <div className="text-xs text-slate-500 italic">No notes recorded yet.</div>
              ) : (
                lead.notes
                  .slice()
                  .reverse()
                  .map((note: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#080C14] border border-white/5 rounded-lg text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span className="font-semibold text-slate-400">{note.author}</span>
                        <span>{new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-300">{note.body}</p>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Status Control */}
        <div className="space-y-4">
          <div className="bg-[#0F172A] p-5 rounded-xl border border-white/5 space-y-3">
            <h2 className="text-xs font-semibold text-white uppercase tracking-wider">
              Update Status
            </h2>
            <form action={handleStatusChange} className="space-y-3">
              <select
                name="status"
                defaultValue={lead.status}
                className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
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
                className="w-full py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white rounded-lg transition"
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