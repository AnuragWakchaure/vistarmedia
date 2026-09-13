import { getStatisticsAction, createStatisticAction, deleteStatisticAction } from "@/actions/stat.actions";
import { BarChart3, Trash2, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminStatisticsPage() {
  const stats = await getStatisticsAction();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.15)]">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Impact Metrics</span>
          </div>
          <h1 className="font-anton text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Agency Statistics ({stats.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xl">
            Manage numerical proof points and dynamic key performance statistics shown across the agency website.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-[#0D121D]/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-5">
          <h2 className="font-anton text-xl text-white uppercase tracking-tight flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#00D2FF]" /> Add Metric
          </h2>
          <form action={createStatisticAction} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Metric Label *
              </label>
              <input
                name="label"
                required
                placeholder="e.g. Creators Connected"
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Value *
                </label>
                <input
                  name="value"
                  required
                  placeholder="200"
                  className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono font-bold focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Suffix
                </label>
                <input
                  name="suffix"
                  placeholder="+"
                  className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono font-bold focus:outline-none transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Description / Context
              </label>
              <input
                name="description"
                placeholder="Active creators across Maharashtra"
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Display Order Priority
              </label>
              <input
                type="number"
                name="displayOrder"
                defaultValue={0}
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none transition font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#00D2FF] to-[#0A84FF] hover:from-[#38bdf8] hover:to-[#00D2FF] text-black text-xs font-bold uppercase tracking-wider rounded-full transition shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:scale-[1.01] cursor-pointer"
            >
              Save Metric
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-[#0D121D]/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-5">
          <h2 className="font-anton text-xl text-white uppercase tracking-tight flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#00D2FF]" /> Active Statistics ({stats.length})
          </h2>
          {stats.length === 0 ? (
            <p className="text-xs text-slate-500 py-10 text-center italic">No statistics configured yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((item: any) => (
                <div
                  key={item._id}
                  className="p-5 rounded-2xl bg-[#07090E]/80 border border-white/10 hover:border-[#00D2FF]/50 flex items-center justify-between gap-3 transition"
                >
                  <div className="space-y-1">
                    <div className="font-anton text-3xl text-[#00D2FF]">
                      {item.value}{item.suffix}
                    </div>
                    <div className="text-xs font-bold uppercase text-white">{item.label}</div>
                    <div className="text-[11px] text-slate-400 font-medium">{item.description}</div>
                  </div>
                  <form action={deleteStatisticAction.bind(null, item._id)}>
                    <button
                      type="submit"
                      className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition cursor-pointer border border-transparent hover:border-rose-500/20"
                    >
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