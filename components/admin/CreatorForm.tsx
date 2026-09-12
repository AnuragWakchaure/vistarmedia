"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";
import { createCreatorAction, updateCreatorAction } from "@/actions/creator.actions";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
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
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Creators
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066FF] hover:bg-[#0052CC] disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition"
        >
          <Save className="w-4 h-4" />
          {loading ? "Saving..." : initialData ? "Update Creator" : "Publish / Save Creator"}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Core Info */}
        <div className="md:col-span-2 space-y-4 bg-[#0F172A] p-6 rounded-xl border border-white/5">
          <h2 className="text-sm font-semibold text-white">Creator Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Full Name *</label>
              <input
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Ramesh Patil"
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

          <div>
            <label className="block text-xs text-slate-400 mb-1">Profile Image URL *</label>
            <input
              required
              name="profileImage"
              defaultValue={initialData?.profileImage || ""}
              placeholder="https://images.unsplash.com/... or media URL"
              className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Short Bio</label>
            <textarea
              name="bio"
              rows={3}
              defaultValue={initialData?.bio || ""}
              placeholder="Authentic Marathi lifestyle and agriculture creator based in..."
              className="w-full bg-[#080C14] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-2">Categories (Select applicable)</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const active = selectedCategories.includes(cat);
                return (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition ${
                      active
                        ? "bg-[#0066FF]/20 border-[#0066FF] text-white"
                        : "bg-[#080C14] border-white/10 text-slate-400 hover:text-white"
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
        <div className="space-y-4">
          <div className="bg-[#0F172A] p-5 rounded-xl border border-white/5 space-y-4">
            <h2 className="text-sm font-semibold text-white">Publishing</h2>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Status</label>
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
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Featured on Homepage
              </label>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Display Order</label>
              <input
                type="number"
                name="displayOrder"
                defaultValue={initialData?.displayOrder || 0}
                className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>

          <div className="bg-[#0F172A] p-5 rounded-xl border border-white/5 space-y-4">
            <h2 className="text-sm font-semibold text-white">Location & Reach</h2>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Location *</label>
              <select
                name="location"
                defaultValue={initialData?.location || "Pune"}
                className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
              >
                {MAHARASHTRA_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Total Followers / Reach</label>
              <input
                type="number"
                name="totalFollowers"
                defaultValue={initialData?.totalFollowers || 50000}
                placeholder="50000"
                className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Instagram Handle</label>
              <input
                name="instaHandle"
                defaultValue={initialData?.platforms?.[0]?.handle || ""}
                placeholder="@username"
                className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Instagram Profile Link</label>
              <input
                name="instaUrl"
                defaultValue={initialData?.platforms?.[0]?.profileUrl || ""}
                placeholder="https://instagram.com/..."
                className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}