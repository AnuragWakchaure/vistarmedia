import { getServicesAction, createServiceAction, deleteServiceAction } from "@/actions/service.actions";
import { Layers, Trash2, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await getServicesAction();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.15)]">
            <Layers className="w-3.5 h-3.5" />
            <span>Agency Capabilities</span>
          </div>
          <h1 className="font-anton text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Agency Services ({services.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xl">
            Manage agency marketing offerings, descriptions, and catalog items displayed on the public services page.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-[#0D121D]/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-5">
          <h2 className="font-anton text-xl text-white uppercase tracking-tight flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#00D2FF]" /> Add Service
          </h2>
          <form action={createServiceAction} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Service Title *
              </label>
              <input
                name="title"
                required
                placeholder="e.g. Regional Influencer Marketing"
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Short Description *
              </label>
              <textarea
                name="shortDescription"
                required
                rows={3}
                placeholder="Brief summary of deliverables..."
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Cover Image URL (Optional)
              </label>
              <input
                name="image"
                type="url"
                placeholder="https://images.unsplash.com/..."
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
              Save Service Offering
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-[#0D121D]/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-5">
          <h2 className="font-anton text-xl text-white uppercase tracking-tight flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#00D2FF]" /> Active Services ({services.length})
          </h2>
          {services.length === 0 ? (
            <p className="text-xs text-slate-500 py-10 text-center italic">No custom services configured yet.</p>
          ) : (
            <div className="space-y-3">
              {services.map((srv: any) => (
                <div
                  key={srv._id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#07090E]/80 border border-white/10 hover:border-[#00D2FF]/50 flex items-center justify-between gap-4 transition"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {srv.image ? (
                      <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-white/10">
                        <img
                          src={srv.image}
                          alt={srv.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-12 rounded-xl bg-[#00D2FF]/10 border border-[#00D2FF]/30 flex items-center justify-center text-[#00D2FF] shrink-0 font-anton text-xs">
                        VISTAR
                      </div>
                    )}
                    <div className="space-y-1 min-w-0">
                      <div className="text-sm font-bold text-white truncate">{srv.title}</div>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium line-clamp-1">{srv.shortDescription}</p>
                    </div>
                  </div>
                  <form action={deleteServiceAction.bind(null, srv._id)} className="shrink-0">
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