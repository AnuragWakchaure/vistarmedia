"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";
import { createCampaignAction, updateCampaignAction } from "@/actions/campaign.actions";
import { ArrowLeft, Save, Sparkles, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

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
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies
        </Link>
        <Button
          type="submit"
          variant="primary"
          size="sm"
          isLoading={loading}
        >
          <Save className="w-3.5 h-3.5 mr-1.5" />
          {initialData ? "Update Case Study" : "Publish Case Study"}
        </Button>
      </div>

      {error && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Info */}
        <div className="md:col-span-2 space-y-5 bg-[#0E131E] p-6 rounded-xl border border-white/10">
          <div>
            <h2 className="text-base font-semibold text-white">Case Study Details</h2>
            <p className="text-xs text-slate-400 mt-0.5">Campaign overview, objectives, and verified performance.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Associated Brand *
              </label>
              <select
                name="brandId"
                required
                defaultValue={
                  initialData?.brandId?._id || initialData?.brandId || (brands[0]?._id ?? "")
                }
                className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition font-medium [&>option]:bg-[#0E131E] [&>option]:text-white"
              >
                {brands.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Industry Vertical *
              </label>
              <select
                name="industry"
                required
                defaultValue={initialData?.industry || "Automobile"}
                className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition font-medium [&>option]:bg-[#0E131E] [&>option]:text-white"
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
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Campaign Title *
              </label>
              <input
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Mahindra Tractors Kharif Launch"
                className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Slug (URL Identifier) *
              </label>
              <input
                required
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Campaign Type *
              </label>
              <select
                name="campaignType"
                required
                defaultValue={initialData?.campaignType || "Influencer Reels"}
                className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition font-medium [&>option]:bg-[#0E131E] [&>option]:text-white"
              >
                {CAMPAIGN_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Geographic Scope
              </label>
              <input
                name="location"
                defaultValue={initialData?.location || "Maharashtra"}
                className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Cover Image URL *
            </label>
            <input
              required
              name="coverImage"
              defaultValue={initialData?.coverImage || ""}
              placeholder="https://images.unsplash.com/... or media asset URL"
              className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Campaign Objective *
            </label>
            <textarea
              required
              name="objective"
              rows={2}
              defaultValue={initialData?.objective || ""}
              placeholder="Primary goals, audience targeting, and brand message..."
              className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Execution Strategy & Highlights *
            </label>
            <textarea
              required
              name="description"
              rows={4}
              defaultValue={initialData?.description || ""}
              placeholder="Execution strategy, regional influencer collaboration, and event activations..."
              className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
            />
          </div>

          {/* Results Section */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-semibold text-white">Verified Campaign Metrics</h3>
                <p className="text-[11px] text-slate-400">Measurable impact delivered during the campaign.</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={addResult}
              >
                <Plus className="w-3 h-3 mr-1" /> Add Metric
              </Button>
            </div>

            {results.map((res, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  placeholder="Metric (e.g. Views)"
                  value={res.metric}
                  onChange={(e) => updateResult(idx, "metric", e.target.value)}
                  className="w-1/3 bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white font-medium"
                />
                <input
                  placeholder="Value (e.g. 2.4M)"
                  value={res.value}
                  onChange={(e) => updateResult(idx, "value", e.target.value)}
                  className="w-1/4 bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-[#00B8F0] font-mono font-medium"
                />
                <input
                  placeholder="Label (e.g. Total reach)"
                  value={res.label}
                  onChange={(e) => updateResult(idx, "label", e.target.value)}
                  className="flex-1 bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => removeResult(idx)}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="bg-[#0E131E] p-5 rounded-xl border border-white/10 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Status & Visibility</h2>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Publishing Status
              </label>
              <select
                name="status"
                defaultValue={initialData?.status || "PUBLISHED"}
                className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition font-medium [&>option]:bg-[#0E131E] [&>option]:text-white"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                defaultChecked={initialData?.featured || false}
                className="w-4 h-4 accent-[#00B8F0] rounded bg-[#080B11] border-white/10"
              />
              <label htmlFor="featured" className="text-xs text-slate-300 font-medium flex items-center gap-1.5 cursor-pointer">
                <Sparkles className="w-3.5 h-3.5 text-[#00B8F0]" /> Feature on Case Studies
              </label>
            </div>
          </div>

          <div className="bg-[#0E131E] p-5 rounded-xl border border-white/10 space-y-3">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Assign Creators</h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Select creators participating in this campaign.</p>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
              {creators.length === 0 ? (
                <div className="text-xs text-slate-500 italic py-2">No creators available.</div>
              ) : (
                creators.map((c) => {
                  const isChecked = selectedCreators.includes(c._id);
                  return (
                    <div
                      key={c._id}
                      onClick={() => toggleCreator(c._id)}
                      className={`p-2.5 rounded-lg text-xs cursor-pointer border flex items-center justify-between transition font-medium ${
                        isChecked
                          ? "bg-[#00B8F0]/10 border-[#00B8F0]/40 text-[#00B8F0]"
                          : "bg-[#080B11] border-white/5 text-slate-300 hover:border-white/15"
                      }`}
                    >
                      <span className="truncate">{c.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">{c.location}</span>
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