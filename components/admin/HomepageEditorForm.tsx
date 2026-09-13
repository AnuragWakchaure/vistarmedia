"use client";

import { useState } from "react";
import { updateHomepageContentAction } from "@/actions/homepage.actions";
import { Save, CheckCircle2, AlertCircle, Home, Sparkles } from "lucide-react";

export default function HomepageEditorForm({ initialData }: { initialData: any }) {
  const [formData, setFormData] = useState({
    heroHeading: initialData?.heroHeading || "",
    heroSubheading: initialData?.heroSubheading || "",
    heroHighlight: initialData?.heroHighlight || "",
    primaryCtaText: initialData?.primaryCtaText || "GET IN TOUCH",
    secondaryCtaText: initialData?.secondaryCtaText || "VIEW OUR CAMPAIGNS",
    whyUsHeading: initialData?.whyUsHeading || "",
    whyUsDescription: initialData?.whyUsDescription || "",
    creatorsHeading: initialData?.creatorsHeading || "",
    creatorsDescription: initialData?.creatorsDescription || "",
    maharashtraHeading: initialData?.maharashtraHeading || "",
    maharashtraDescription: initialData?.maharashtraDescription || "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, val);
      });

      await updateHomepageContentAction(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to update homepage content.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Homepage copy updated and successfully published to live website.</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-[#0D121D]/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-5">
        <div className="flex items-center gap-2 text-white">
          <Home className="w-4 h-4 text-[#00D2FF]" />
          <h2 className="font-anton text-xl uppercase tracking-tight">Hero Banner Copy</h2>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Highlight Badge (Top Sticker Pill) *
          </label>
          <input
            name="heroHighlight"
            required
            value={formData.heroHighlight}
            onChange={handleChange}
            placeholder="e.g. 200+ Creators Connected Across Maharashtra"
            className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:bg-[#07090E] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium focus:ring-1 focus:ring-[#00D2FF]/50"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Primary H1 Heading *
          </label>
          <input
            name="heroHeading"
            required
            value={formData.heroHeading}
            onChange={handleChange}
            placeholder="Influencer Marketing That Makes Brands Stand Out."
            className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:bg-[#07090E] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium focus:ring-1 focus:ring-[#00D2FF]/50"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Subheading Paragraph *
          </label>
          <textarea
            name="heroSubheading"
            required
            rows={3}
            value={formData.heroSubheading}
            onChange={handleChange}
            placeholder="Connect your brand with verified regional creators..."
            className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:bg-[#07090E] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium focus:ring-1 focus:ring-[#00D2FF]/50"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Primary CTA Button Text
            </label>
            <input
              name="primaryCtaText"
              value={formData.primaryCtaText}
              onChange={handleChange}
              className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:bg-[#07090E] rounded-xl px-3.5 py-2.5 text-xs text-white font-bold uppercase focus:outline-none transition focus:ring-1 focus:ring-[#00D2FF]/50"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Secondary CTA Button Text
            </label>
            <input
              name="secondaryCtaText"
              value={formData.secondaryCtaText}
              onChange={handleChange}
              className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:bg-[#07090E] rounded-xl px-3.5 py-2.5 text-xs text-white font-bold uppercase focus:outline-none transition focus:ring-1 focus:ring-[#00D2FF]/50"
            />
          </div>
        </div>
      </div>

      {/* Section Headings */}
      <div className="bg-[#0D121D]/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-5">
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="w-4 h-4 text-[#00D2FF]" />
          <h2 className="font-anton text-xl uppercase tracking-tight">Section Headings & Copy</h2>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Why Choose VISTAR Heading
          </label>
          <input
            name="whyUsHeading"
            value={formData.whyUsHeading}
            onChange={handleChange}
            className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:bg-[#07090E] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition font-medium focus:ring-1 focus:ring-[#00D2FF]/50"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Creators Section Heading
          </label>
          <input
            name="creatorsHeading"
            value={formData.creatorsHeading}
            onChange={handleChange}
            className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:bg-[#07090E] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition font-medium focus:ring-1 focus:ring-[#00D2FF]/50"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Maharashtra Regional Heading
          </label>
          <input
            name="maharashtraHeading"
            value={formData.maharashtraHeading}
            onChange={handleChange}
            className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:bg-[#07090E] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition font-medium focus:ring-1 focus:ring-[#00D2FF]/50"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-8 py-3.5 bg-gradient-to-r from-[#00D2FF] to-[#0A84FF] hover:from-[#00E5FF] hover:to-[#0070E0] disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider rounded-full transition shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:scale-[1.02] inline-flex items-center gap-2 cursor-pointer border border-cyan-300/40"
      >
        <Save className="w-4 h-4 text-black" />
        <span>{loading ? "Saving Changes..." : "Publish Content Updates"}</span>
      </button>
    </form>
  );
}