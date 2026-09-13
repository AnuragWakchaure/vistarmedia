"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";
import { createCampaignAction, updateCampaignAction } from "@/actions/campaign.actions";
import { ArrowLeft, Save, Sparkles, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

const INDUSTRIES = [
  "Agriculture", "Automobile", "FMCG", "Food", "Fashion",
  "Beauty", "Real Estate", "Education", "Finance", "Tourism", "Technology", "Other"
];

const CAMPAIGN_TYPES = [
  "Influencer Reels", "UGC", "Product Promotion", "Event Campaign",
  "Brand Awareness", "Product Launch", "Lead Generation", "Other"
];

export default function CampaignForm({
  initialData,
  brands,
  creators,
}: {
  initialData?: any;
  brands: { _id: string; name: string }[];
  creators: { _id: string; name: string; location: string }[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [selectedCreators, setSelectedCreators] = useState<string[]>(
    initialData?.creatorIds?.map((c: any) => (typeof c === "string" ? c : c._id)) || []
  );

  const [results, setResults] = useState<any[]>(
    initialData?.results || [
      { metric: "Total Reach", value: "1.2M+", label: "Organic views", isDemo: false },
    ]
  );

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!initialData) {
      setSlug(slugify(val));
    }
  }

  function toggleCreator(id: string) {
    setSelectedCreators((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function addResult() {
    setResults([...results, { metric: "", value: "", label: "", isDemo: false }]);
  }

  function updateResult(index: number, field: string, val: any) {
    const updated = [...results];
    updated[index][field] = val;
    setResults(updated);
  }

  function removeResult(index: number) {
    setResults(results.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      brandId: formData.get("brandId") as string,
      title,
      slug,
      industry: formData.get("industry") as string,
      campaignType: formData.get("campaignType") as string,
      location: (formData.get("location") as string) || "Maharashtra",
      objective: formData.get("objective") as string,
      description: formData.get("description") as string,
      coverImage: formData.get("coverImage") as string,
      gallery: [],
      videos: [],
      creatorIds: selectedCreators,
      results: results.filter((r) => r.metric && r.value),
      featured: formData.get("featured") === "on",
      status: formData.get("status") as string,
    };

    try {
      if (initialData?._id) {
        await updateCampaignAction(initialData._id, payload);
      } else {
        await createCampaignAction(payload);
      }
      router.push("/admin/campaigns");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save campaign.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/campaigns"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D2FF] hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#00D2FF] to-[#0A84FF] hover:from-[#38bdf8] hover:to-[#00D2FF] disabled:opacity-50 text-black text-xs font-bold uppercase tracking-wider rounded-full transition shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:scale-[1.02] cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {loading ? "Saving..." : initialData ? "Update Case Study" : "Publish Case Study"}
        </button>
      </div>

      {error && (
        <div className="p-3.5 bg-rose-950/40 border border-rose-500/30 text-rose-300 rounded-2xl text-xs font-bold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Info */}
        <div className="md:col-span-2 space-y-5 bg-[#0D121D]/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <h2 className="font-anton text-xl text-white uppercase tracking-tight">Case Study Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Associated Brand *
              </label>
              <select
                name="brandId"
                required
                defaultValue={
                  initialData?.brandId?._id || initialData?.brandId || (brands[0]?._id ?? "")
                }
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition font-bold uppercase [&>option]:bg-[#0D121D] [&>option]:text-white"
              >
                {brands.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Industry Vertical *
              </label>
              <select
                name="industry"
                required
                defaultValue={initialData?.industry || "Automobile"}
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition font-bold [&>option]:bg-[#0D121D] [&>option]:text-white"
              >
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Campaign Title *
              </label>
              <input
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Mahindra Tractors Kharif Season Launch"
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Slug (URL Identifier) *
              </label>
              <input
                required
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none transition font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Campaign Deliverable Type *
              </label>
              <select
                name="campaignType"
                required
                defaultValue={initialData?.campaignType || "Influencer Reels"}
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition font-bold [&>option]:bg-[#0D121D] [&>option]:text-white"
              >
                {CAMPAIGN_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Geographic Scope
              </label>
              <input
                name="location"
                defaultValue={initialData?.location || "Maharashtra"}
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Cover Image URL *
            </label>
            <input
              required
              name="coverImage"
              defaultValue={initialData?.coverImage || ""}
              placeholder="https://images.unsplash.com/... or media URL"
              className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Campaign Objective *
            </label>
            <textarea
              required
              name="objective"
              rows={2}
              defaultValue={initialData?.objective || ""}
              placeholder="Primary goals, audience targeting, and brand message..."
              className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Detailed Execution Strategy *
            </label>
            <textarea
              required
              name="description"
              rows={4}
              defaultValue={initialData?.description || ""}
              placeholder="Execution strategy, regional influencer collaboration, and event activations..."
              className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
            />
          </div>

          {/* Results Section */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-anton text-base text-white uppercase tracking-tight">Verified Campaign Results</h3>
              <button
                type="button"
                onClick={addResult}
                className="inline-flex items-center gap-1 text-xs text-[#00D2FF] font-bold uppercase tracking-wider hover:text-white transition"
              >
                <Plus className="w-3.5 h-3.5" /> Add Metric
              </button>
            </div>

            {results.map((res, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  placeholder="Metric (e.g. Views)"
                  value={res.metric}
                  onChange={(e) => updateResult(idx, "metric", e.target.value)}
                  className="w-1/3 bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
                <input
                  placeholder="Value (e.g. 2.4M)"
                  value={res.value}
                  onChange={(e) => updateResult(idx, "value", e.target.value)}
                  className="w-1/4 bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3 py-2 text-xs text-[#00D2FF] font-mono font-bold"
                />
                <input
                  placeholder="Label (e.g. Total reach)"
                  value={res.label}
                  onChange={(e) => updateResult(idx, "label", e.target.value)}
                  className="flex-1 bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3 py-2 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => removeResult(idx)}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition cursor-pointer border border-transparent hover:border-rose-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="bg-[#0D121D]/90 p-6 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-4">
            <h2 className="font-anton text-lg text-white uppercase tracking-tight">Status & Visibility</h2>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Publishing Status
              </label>
              <select
                name="status"
                defaultValue={initialData?.status || "PUBLISHED"}
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition font-bold uppercase [&>option]:bg-[#0D121D] [&>option]:text-white"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                defaultChecked={initialData?.featured || false}
                className="w-4 h-4 accent-[#00D2FF] rounded bg-[#07090E] border-white/10"
              />
              <label htmlFor="featured" className="text-xs text-slate-200 font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" /> Featured Case Study
              </label>
            </div>
          </div>

          <div className="bg-[#0D121D]/90 p-6 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-3">
            <h2 className="font-anton text-lg text-white uppercase tracking-tight">Assign Creators</h2>
            <p className="text-[11px] text-slate-400 font-medium">Select creators from your roster participating in this campaign</p>

            <div className="max-h-64 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {creators.length === 0 ? (
                <div className="text-xs text-slate-500 italic">No published creators available.</div>
              ) : (
                creators.map((c) => {
                  const isChecked = selectedCreators.includes(c._id);
                  return (
                    <div
                      key={c._id}
                      onClick={() => toggleCreator(c._id)}
                      className={`p-3 rounded-2xl text-xs cursor-pointer border flex items-center justify-between transition font-medium ${
                        isChecked
                          ? "bg-[#00D2FF]/10 border-[#00D2FF] text-[#00D2FF] font-bold shadow-[0_0_10px_rgba(0,210,255,0.2)]"
                          : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20"
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">{c.location}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}