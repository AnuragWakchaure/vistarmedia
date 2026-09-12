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
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Campaigns
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066FF] hover:bg-[#0052CC] disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition"
        >
          <Save className="w-4 h-4" />
          {loading ? "Saving..." : initialData ? "Update Campaign" : "Publish / Save Campaign"}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Info */}
        <div className="md:col-span-2 space-y-5 bg-[#0F172A] p-6 rounded-xl border border-white/5">
          <h2 className="text-sm font-semibold text-white">Campaign Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Associated Brand *</label>
              <select
                name="brandId"
                required
                defaultValue={
                  initialData?.brandId?._id || initialData?.brandId || (brands[0]?._id ?? "")
                }
                className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
              >
                {brands.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Industry *</label>
              <select
                name="industry"
                required
                defaultValue={initialData?.industry || "Automobile"}
                className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
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
              <label className="block text-xs text-slate-400 mb-1">Campaign Title *</label>
              <input
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Mahindra Tractors Kharif Season Launch"
                className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Slug (URL identifier) *</label>
              <input
                required
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF] font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Campaign Type *</label>
              <select
                name="campaignType"
                required
                defaultValue={initialData?.campaignType || "Influencer Reels"}
                className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
              >
                {CAMPAIGN_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Location Scope</label>
              <input
                name="location"
                defaultValue={initialData?.location || "Maharashtra"}
                className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Cover Image URL *</label>
            <input
              required
              name="coverImage"
              defaultValue={initialData?.coverImage || ""}
              placeholder="https://images.unsplash.com/... or media URL"
              className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Campaign Objective *</label>
            <textarea
              required
              name="objective"
              rows={2}
              defaultValue={initialData?.objective || ""}
              placeholder="Primary goals, audience targeting, and brand message..."
              className="w-full bg-[#080C14] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Detailed Description *</label>
            <textarea
              required
              name="description"
              rows={4}
              defaultValue={initialData?.description || ""}
              placeholder="Execution strategy, regional influencer collaboration, and event activations..."
              className="w-full bg-[#080C14] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          {/* Results Section */}
          <div className="pt-4 border-t border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-white">Campaign Results & Metrics</h3>
              <button
                type="button"
                onClick={addResult}
                className="inline-flex items-center gap-1 text-[11px] text-[#0066FF] hover:underline"
              >
                <Plus className="w-3 h-3" /> Add Metric
              </button>
            </div>

            {results.map((res, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  placeholder="Metric (e.g. Views)"
                  value={res.metric}
                  onChange={(e) => updateResult(idx, "metric", e.target.value)}
                  className="w-1/3 bg-[#080C14] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
                <input
                  placeholder="Value (e.g. 2.4M)"
                  value={res.value}
                  onChange={(e) => updateResult(idx, "value", e.target.value)}
                  className="w-1/4 bg-[#080C14] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
                <input
                  placeholder="Label (e.g. Total reach)"
                  value={res.label}
                  onChange={(e) => updateResult(idx, "label", e.target.value)}
                  className="flex-1 bg-[#080C14] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => removeResult(idx)}
                  className="p-1.5 text-red-400 hover:bg-red-500/10 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-5">
          <div className="bg-[#0F172A] p-5 rounded-xl border border-white/5 space-y-4">
            <h2 className="text-sm font-semibold text-white">Status & Visibility</h2>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Publishing Status</label>
              <select
                name="status"
                defaultValue={initialData?.status || "PUBLISHED"}
                className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
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
                className="w-4 h-4 accent-[#0066FF] rounded bg-[#080C14] border-white/10"
              />
              <label htmlFor="featured" className="text-xs text-slate-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Featured Case Study
              </label>
            </div>
          </div>

          <div className="bg-[#0F172A] p-5 rounded-xl border border-white/5 space-y-3">
            <h2 className="text-sm font-semibold text-white">Assign Creators</h2>
            <p className="text-[11px] text-slate-400">Select participating creators from network</p>

            <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
              {creators.length === 0 ? (
                <div className="text-[11px] text-slate-500">No published creators available.</div>
              ) : (
                creators.map((c) => {
                  const isChecked = selectedCreators.includes(c._id);
                  return (
                    <div
                      key={c._id}
                      onClick={() => toggleCreator(c._id)}
                      className={`p-2 rounded-lg text-xs cursor-pointer border flex items-center justify-between transition ${
                        isChecked
                          ? "bg-[#0066FF]/15 border-[#0066FF] text-white"
                          : "bg-[#080C14] border-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{c.location}</span>
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