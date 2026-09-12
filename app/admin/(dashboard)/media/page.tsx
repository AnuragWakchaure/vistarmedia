import { getMediaAction, createMediaAction, deleteMediaAction } from "@/actions/media.actions";
import { Image as ImageIcon, Trash2, Plus, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const mediaList = await getMediaAction();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Media Library</h1>
        <p className="text-xs text-slate-400 mt-1">Manage and store image/video assets used across campaigns and creators.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-[#0F172A] p-6 rounded-2xl border border-white/5 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#0066FF]" /> Add Asset URL
          </h2>
          <form action={createMediaAction} className="space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Asset Name *</label>
              <input name="name" required placeholder="e.g. TVS Commuter Reel Banner" className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Asset URL *</label>
              <input name="url" required placeholder="https://..." className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Type</label>
              <select name="type" className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]">
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
                <option value="LOGO">Logo</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Alt Text</label>
              <input name="altText" placeholder="Brief visual description" className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <button type="submit" className="w-full py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold rounded-lg transition mt-2">
              Save Asset
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-[#0F172A] p-6 rounded-2xl border border-white/5 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#0066FF]" /> Assets Library ({mediaList.length})
          </h2>
          {mediaList.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No assets saved in the library yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mediaList.map((item: any) => (
                <div key={item._id} className="rounded-xl bg-[#080C14] border border-white/5 overflow-hidden group">
                  <div className="h-28 bg-slate-900 relative">
                    <img src={item.url} alt={item.altText || item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 flex items-center justify-between text-xs">
                    <span className="text-white truncate font-medium max-w-[100px]">{item.name}</span>
                    <form action={deleteMediaAction.bind(null, item._id)}>
                      <button type="submit" className="text-red-400 hover:text-red-300">
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