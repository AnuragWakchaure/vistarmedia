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
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B80F0A] hover:underline transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Creator Roster
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#B80F0A] hover:bg-[#960C08] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-full transition shadow-sm hover:scale-[1.02] cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {loading ? "Saving..." : initialData ? "Update Profile" : "Publish Creator"}
        </button>
      </div>

      {error && (
        <div className="p-3.5 bg-rose-50 border-2 border-rose-200 text-rose-700 rounded-2xl text-xs font-bold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Core Info */}
        <div className="md:col-span-2 space-y-5 bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200/90 shadow-nickpat">
          <h2 className="font-anton text-xl text-[#111111] uppercase tracking-tight">Creator Profile Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Ramesh Patil"
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

          <div>
            <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Profile Image URL *
            </label>
            <input
              required
              name="profileImage"
              defaultValue={initialData?.profileImage || ""}
              placeholder="https://images.unsplash.com/... or media URL"
              className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Bio / Creator Summary
            </label>
            <textarea
              name="bio"
              rows={3}
              defaultValue={initialData?.bio || ""}
              placeholder="Authentic Marathi lifestyle and agriculture creator based in..."
              className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl p-3 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-2">
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
                        ? "bg-[#B80F0A] text-white border-2 border-[#960C08] shadow-sm scale-[1.02]"
                        : "bg-[#FCECDF] text-stone-800 hover:text-[#B80F0A] hover:bg-white border border-stone-300"
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
          <div className="bg-white p-6 rounded-3xl border-2 border-stone-200/90 shadow-nickpat space-y-4">
            <h2 className="font-anton text-lg text-[#111111] uppercase tracking-tight">Publishing Controls</h2>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Status
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
                <Sparkles className="w-3.5 h-3.5 text-[#EE6A43]" /> Featured on Homepage
              </label>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Display Order Priority
              </label>
              <input
                type="number"
                name="displayOrder"
                defaultValue={initialData?.displayOrder || 0}
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none transition font-mono font-bold"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-stone-200/90 shadow-nickpat space-y-4">
            <h2 className="font-anton text-lg text-[#111111] uppercase tracking-tight">Location & Reach</h2>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Primary District / Hub *
              </label>
              <select
                name="location"
                defaultValue={initialData?.location || "Pune"}
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none transition font-bold"
              >
                {MAHARASHTRA_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Total Follower Reach
              </label>
              <input
                type="number"
                name="totalFollowers"
                defaultValue={initialData?.totalFollowers || 50000}
                placeholder="50000"
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] font-mono font-bold focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Instagram Handle
              </label>
              <input
                name="instaHandle"
                defaultValue={initialData?.platforms?.[0]?.handle || ""}
                placeholder="@username"
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Instagram Profile Link
              </label>
              <input
                name="instaUrl"
                defaultValue={initialData?.platforms?.[0]?.profileUrl || ""}
                placeholder="https://instagram.com/..."
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}