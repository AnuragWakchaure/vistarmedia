import { getMediaAction, createMediaAction, deleteMediaAction } from "@/actions/media.actions";
import { Image as ImageIcon, Trash2, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const mediaList = await getMediaAction();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Digital Asset Manager</span>
          </div>
          <h1 className="font-anton text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
            Media Library ({mediaList.length})
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-medium max-w-xl">
            Store and manage image and video assets utilized across campaign case studies and creator profiles.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200/90 shadow-nickpat space-y-5">
          <h2 className="font-anton text-xl text-[#111111] uppercase tracking-tight flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#B80F0A]" /> Add Asset URL
          </h2>
          <form action={createMediaAction} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Asset Name *
              </label>
              <input
                name="name"
                required
                placeholder="e.g. TVS Commuter Reel Banner"
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Asset URL *
              </label>
              <input
                name="url"
                required
                placeholder="https://..."
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Asset Type
              </label>
              <select
                name="type"
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none transition font-bold uppercase"
              >
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
                <option value="LOGO">Logo</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Alt Text / Description
              </label>
              <input
                name="altText"
                placeholder="Brief visual description"
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#B80F0A] hover:bg-[#960C08] text-white text-xs font-bold uppercase tracking-wider rounded-full transition shadow-sm hover:scale-[1.01] cursor-pointer"
            >
              Save Media Asset
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200/90 shadow-nickpat space-y-5">
          <h2 className="font-anton text-xl text-[#111111] uppercase tracking-tight flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#B80F0A]" /> Saved Assets ({mediaList.length})
          </h2>
          {mediaList.length === 0 ? (
            <p className="text-xs text-stone-400 py-10 text-center italic">No media assets saved yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mediaList.map((item: any) => (
                <div
                  key={item._id}
                  className="rounded-2xl bg-stone-50 border-2 border-stone-200/90 overflow-hidden shadow-sm hover:border-[#B80F0A] transition group"
                >
                  <div className="h-32 bg-stone-200 relative overflow-hidden">
                    <img
                      src={item.url}
                      alt={item.altText || item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 flex items-center justify-between text-xs">
                    <span className="text-[#111111] truncate font-bold text-[11px] max-w-[120px]">
                      {item.name}
                    </span>
                    <form action={deleteMediaAction.bind(null, item._id)}>
                      <button
                        type="submit"
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}