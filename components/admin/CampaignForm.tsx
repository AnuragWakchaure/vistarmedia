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
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B80F0A] hover:underline transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#B80F0A] hover:bg-[#960C08] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-full transition shadow-sm hover:scale-[1.02] cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {loading ? "Saving..." : initialData ? "Update Case Study" : "Publish Case Study"}
        </button>
      </div>

      {error && (
        <div className="p-3.5 bg-rose-50 border-2 border-rose-200 text-rose-700 rounded-2xl text-xs font-bold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Info */}
        <div className="md:col-span-2 space-y-5 bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200/90 shadow-nickpat">
          <h2 className="font-anton text-xl text-[#111111] uppercase tracking-tight">Case Study Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Associated Brand *
              </label>
              <select
                name="brandId"
                required
                defaultValue={
                  initialData?.brandId?._id || initialData?.brandId || (brands[0]?._id ?? "")
                }
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none transition font-bold uppercase"
              >
                {brands.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Industry Vertical *
              </label>
              <select
                name="industry"
                required
                defaultValue={initialData?.industry || "Automobile"}
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none transition font-bold"
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
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Campaign Title *
              </label>
              <input
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Mahindra Tractors Kharif Season Launch"
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Slug (URL Identifier) *
              </label>
              <input
                required
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] font-mono focus:outline-none transition font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Campaign Deliverable Type *
              </label>
              <select
                name="campaignType"
                required
                defaultValue={initialData?.campaignType || "Influencer Reels"}
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none transition font-bold"
              >
                {CAMPAIGN_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Geographic Scope
              </label>
              <input
                name="location"
                defaultValue={initialData?.location || "Maharashtra"}
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Cover Image URL *
            </label>
            <input
              required
              name="coverImage"
              defaultValue={initialData?.coverImage || ""}
              placeholder="https://images.unsplash.com/... or media URL"
              className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Campaign Objective *
            </label>
            <textarea
              required
              name="objective"
              rows={2}
              defaultValue={initialData?.objective || ""}
              placeholder="Primary goals, audience targeting, and brand message..."
              className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl p-3 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Detailed Execution Strategy *
            </label>
            <textarea
              required
              name="description"
              rows={4}
              defaultValue={initialData?.description || ""}
              placeholder="Execution strategy, regional influencer collaboration, and event activations..."
              className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl p-3 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
            />
          </div>

          {/* Results Section */}
          <div className="pt-4 border-t-2 border-stone-100 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-anton text-base text-[#111111] uppercase tracking-tight">Verified Campaign Results</h3>
              <button
                type="button"
                onClick={addResult}
                className="inline-flex items-center gap-1 text-xs text-[#B80F0A] font-bold uppercase tracking-wider hover:underline"
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
                  className="w-1/3 bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3 py-2 text-xs text-[#111111] font-bold"
                />
                <input
                  placeholder="Value (e.g. 2.4M)"
                  value={res.value}
                  onChange={(e) => updateResult(idx, "value", e.target.value)}
                  className="w-1/4 bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3 py-2 text-xs text-[#B80F0A] font-mono font-bold"
                />
                <input
                  placeholder="Label (e.g. Total reach)"
                  value={res.label}
                  onChange={(e) => updateResult(idx, "label", e.target.value)}
                  className="flex-1 bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3 py-2 text-xs text-[#111111]"
                />
                <button
                  type="button"
                  onClick={() => removeResult(idx)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border-2 border-stone-200/90 shadow-nickpat space-y-4">
            <h2 className="font-anton text-lg text-[#111111] uppercase tracking-tight">Status & Visibility</h2>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Publishing Status
              </label>
              <select
                name="status"
                defaultValue={initialData?.status || "PUBLISHED"}
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none transition font-bold uppercase"
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
                className="w-4 h-4 accent-[#B80F0A] rounded"
              />
              <label htmlFor="featured" className="text-xs text-stone-800 font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                <Sparkles className="w-3.5 h-3.5 text-[#EE6A43]" /> Featured Case Study
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-stone-200/90 shadow-nickpat space-y-3">
            <h2 className="font-anton text-lg text-[#111111] uppercase tracking-tight">Assign Creators</h2>
            <p className="text-[11px] text-stone-500 font-medium">Select creators from your roster participating in this campaign</p>

            <div className="max-h-64 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {creators.length === 0 ? (
                <div className="text-xs text-stone-400 italic">No published creators available.</div>
              ) : (
                creators.map((c) => {
                  const isChecked = selectedCreators.includes(c._id);
                  return (
                    <div
                      key={c._id}
                      onClick={() => toggleCreator(c._id)}
                      className={`p-3 rounded-2xl text-xs cursor-pointer border-2 flex items-center justify-between transition font-medium ${
                        isChecked
                          ? "bg-[#FCECDF] border-[#B80F0A] text-[#B80F0A] font-bold"
                          : "bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400"
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[10px] font-mono text-stone-500">{c.location}</span>
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