import { getStatisticsAction, createStatisticAction, deleteStatisticAction } from "@/actions/stat.actions";
import { BarChart3, Trash2, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminStatisticsPage() {
  const stats = await getStatisticsAction();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Live Agency Statistics</h1>
        <p className="text-xs text-slate-400 mt-1">Manage numerical proof points and statistics shown across the website.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-[#0F172A] p-6 rounded-2xl border border-white/5 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#0066FF]" /> Add Metric
          </h2>
          <form action={createStatisticAction} className="space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Metric Label *</label>
              <input name="label" required placeholder="e.g. Creators Connected" className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Value *</label>
                <input name="value" required placeholder="200" className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF] font-mono" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Suffix</label>
                <input name="suffix" placeholder="+" className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF] font-mono" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Description</label>
              <input name="description" placeholder="Active creators across Maharashtra" className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Display Order</label>
              <input type="number" name="displayOrder" defaultValue={0} className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <button type="submit" className="w-full py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold rounded-lg transition mt-2">
              Save Metric
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-[#0F172A] p-6 rounded-2xl border border-white/5 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#0066FF]" /> Active Statistics ({stats.length})
          </h2>
          {stats.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No statistics configured yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((item: any) => (
                <div key={item._id} className="p-4 rounded-xl bg-[#080C14] border border-white/5 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-2xl font-black text-white font-mono">
                      {item.value}{item.suffix}
                    </div>
                    <div className="text-xs font-bold text-slate-300">{item.label}</div>
                    <div className="text-[10px] text-slate-500">{item.description}</div>
                  </div>
                  <form action={deleteStatisticAction.bind(null, item._id)}>
                    <button type="submit" className="p-2 text-red-400 hover:bg-red-500/10 rounded transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}