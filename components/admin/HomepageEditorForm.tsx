"use client";

import { useState } from "react";
import { updateHomepageContentAction } from "@/actions/homepage.actions";
import { Save, CheckCircle2, AlertCircle, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {success && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Homepage copy updated and successfully published to live website.</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-[#0E131E] p-6 rounded-xl border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-white">
          <Home className="w-4 h-4 text-[#00B8F0]" />
          <h2 className="text-base font-semibold">Hero Banner Copy</h2>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Highlight Badge (Top Pill) *
          </label>
          <input
            name="heroHighlight"
            required
            value={formData.heroHighlight}
            onChange={handleChange}
            placeholder="e.g. 200+ Regional Creators Across Maharashtra"
            className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Primary H1 Heading *
          </label>
          <input
            name="heroHeading"
            required
            value={formData.heroHeading}
            onChange={handleChange}
            placeholder="Influencer Marketing That Makes Brands Stand Out."
            className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Subheading Paragraph *
          </label>
          <textarea
            name="heroSubheading"
            required
            rows={3}
            value={formData.heroSubheading}
            onChange={handleChange}
            placeholder="Connect your brand with verified regional creators..."
            className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Primary CTA Button Text
            </label>
            <input
              name="primaryCtaText"
              value={formData.primaryCtaText}
              onChange={handleChange}
              className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white font-medium focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Secondary CTA Button Text
            </label>
            <input
              name="secondaryCtaText"
              value={formData.secondaryCtaText}
              onChange={handleChange}
              className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white font-medium focus:outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Section Headings */}
      <div className="bg-[#0E131E] p-6 rounded-xl border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="w-4 h-4 text-[#00B8F0]" />
          <h2 className="text-base font-semibold">Section Headings & Copy</h2>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Why Choose VISTAR Heading
          </label>
          <input
            name="whyUsHeading"
            value={formData.whyUsHeading}
            onChange={handleChange}
            className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Creators Section Heading
          </label>
          <input
            name="creatorsHeading"
            value={formData.creatorsHeading}
            onChange={handleChange}
            className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Maharashtra Regional Heading
          </label>
          <input
            name="maharashtraHeading"
            value={formData.maharashtraHeading}
            onChange={handleChange}
            className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition font-medium"
          />
        </div>
      </div>

      <div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={loading}
        >
          <Save className="w-4 h-4 mr-2" />
          Publish Content Updates
        </Button>
      </div>
    </form>
  );
}