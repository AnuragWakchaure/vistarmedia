"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";
import { createCreatorAction, updateCreatorAction } from "@/actions/creator.actions";
import { ArrowLeft, Save, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const MAHARASHTRA_LOCATIONS = [
  "Pune", "Mumbai", "Nashik", "Ahilyanagar", "Nagpur",
  "Kolhapur", "Chhatrapati Sambhajinagar", "Satara", "Sangli",
  "Solapur", "Latur", "Jalgaon", "Amravati"
];

const CATEGORIES = [
  "Agriculture", "Marathi Content", "Lifestyle", "Food",
  "Fashion", "Beauty", "Travel", "Automobile",
  "Technology", "Fitness", "Comedy", "YouTube", "Instagram"
];

export default function CreatorForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialData?.categories || ["Marathi Content"]
  );

  function handleNameChange(val: string) {
    setName(val);
    if (!initialData) {
      setSlug(slugify(val));
    }
  }

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name,
      slug,
      profileImage: formData.get("profileImage") as string,
      bio: formData.get("bio") as string,
      location: formData.get("location") as string,
      categories: selectedCategories,
      totalFollowers: Number(formData.get("totalFollowers") || 0),
      featured: formData.get("featured") === "on",
      status: formData.get("status") as string,
      displayOrder: Number(formData.get("displayOrder") || 0),
      platforms: [
        {
          platform: "Instagram",
          handle: (formData.get("instaHandle") as string) || "",
          profileUrl: (formData.get("instaUrl") as string) || "https://instagram.com",
          followerCount: Number(formData.get("totalFollowers") || 0),
        },
      ],
    };

    try {
      if (initialData?._id) {
        await updateCreatorAction(initialData._id, payload);
      } else {
        await createCreatorAction(payload);
      }
      router.push("/admin/creators");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong saving the creator.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/creators"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D2FF] hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Creator Roster
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#00D2FF] to-[#0A84FF] hover:from-[#38bdf8] hover:to-[#00D2FF] disabled:opacity-50 text-black text-xs font-bold uppercase tracking-wider rounded-full transition shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:scale-[1.02] cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {loading ? "Saving..." : initialData ? "Update Profile" : "Publish Creator"}
        </button>
      </div>

      {error && (
        <div className="p-3.5 bg-rose-950/40 border border-rose-500/30 text-rose-300 rounded-2xl text-xs font-bold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Core Info */}
        <div className="md:col-span-2 space-y-5 bg-[#0D121D]/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <h2 className="font-anton text-xl text-white uppercase tracking-tight">Creator Profile Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Ramesh Patil"
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

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Profile Image URL *
            </label>
            <input
              required
              name="profileImage"
              defaultValue={initialData?.profileImage || ""}
              placeholder="https://images.unsplash.com/... or media URL"
              className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Bio / Creator Summary
            </label>
            <textarea
              name="bio"
              rows={3}
              defaultValue={initialData?.bio || ""}
              placeholder="Authentic Marathi lifestyle and agriculture creator based in..."
              className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
              Categories (Select all applicable)
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const active = selectedCategories.includes(cat);
                return (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                      active
                        ? "bg-[#00D2FF] text-black border border-[#00D2FF] shadow-[0_0_12px_rgba(0,210,255,0.4)] scale-[1.02]"
                        : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Status, Location & Metrics */}
        <div className="space-y-6">
          <div className="bg-[#0D121D]/90 p-6 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-4">
            <h2 className="font-anton text-lg text-white uppercase tracking-tight">Publishing Controls</h2>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Status
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
                <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" /> Featured on Homepage
              </label>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Display Order Priority
              </label>
              <input
                type="number"
                name="displayOrder"
                defaultValue={initialData?.displayOrder || 0}
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition font-mono font-bold"
              />
            </div>
          </div>

          <div className="bg-[#0D121D]/90 p-6 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-4">
            <h2 className="font-anton text-lg text-white uppercase tracking-tight">Location & Reach</h2>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Primary District / Hub *
              </label>
              <select
                name="location"
                defaultValue={initialData?.location || "Pune"}
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition font-bold [&>option]:bg-[#0D121D] [&>option]:text-white"
              >
                {MAHARASHTRA_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Total Follower Reach
              </label>
              <input
                type="number"
                name="totalFollowers"
                defaultValue={initialData?.totalFollowers || 50000}
                placeholder="50000"
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono font-bold focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Instagram Handle
              </label>
              <input
                name="instaHandle"
                defaultValue={initialData?.platforms?.[0]?.handle || ""}
                placeholder="@username"
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Instagram Profile Link
              </label>
              <input
                name="instaUrl"
                defaultValue={initialData?.platforms?.[0]?.profileUrl || ""}
                placeholder="https://instagram.com/..."
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}