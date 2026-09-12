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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Agency Capabilities</span>
          </div>
          <h1 className="font-anton text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
            Agency Services ({services.length})
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-medium max-w-xl">
            Manage agency marketing offerings, descriptions, and catalog items displayed on the public services page.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200/90 shadow-nickpat space-y-5">
          <h2 className="font-anton text-xl text-[#111111] uppercase tracking-tight flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#B80F0A]" /> Add Service
          </h2>
          <form action={createServiceAction} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Service Title *
              </label>
              <input
                name="title"
                required
                placeholder="e.g. Regional Influencer Marketing"
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Short Description *
              </label>
              <textarea
                name="shortDescription"
                required
                rows={3}
                placeholder="Brief summary of deliverables..."
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl p-3 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Display Order Priority
              </label>
              <input
                type="number"
                name="displayOrder"
                defaultValue={0}
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] font-mono focus:outline-none transition font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#B80F0A] hover:bg-[#960C08] text-white text-xs font-bold uppercase tracking-wider rounded-full transition shadow-sm hover:scale-[1.01] cursor-pointer"
            >
              Save Service Offering
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200/90 shadow-nickpat space-y-5">
          <h2 className="font-anton text-xl text-[#111111] uppercase tracking-tight flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#B80F0A]" /> Active Services ({services.length})
          </h2>
          {services.length === 0 ? (
            <p className="text-xs text-stone-400 py-10 text-center italic">No custom services configured yet.</p>
          ) : (
            <div className="space-y-3">
              {services.map((srv: any) => (
                <div
                  key={srv._id}
                  className="p-5 rounded-2xl bg-stone-50 border-2 border-stone-200/90 hover:border-[#B80F0A] flex items-start justify-between gap-4 transition"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-[#111111]">{srv.title}</div>
                    <p className="text-xs text-stone-600 leading-relaxed font-medium">{srv.shortDescription}</p>
                  </div>
                  <form action={deleteServiceAction.bind(null, srv._id)}>
                    <button
                      type="submit"
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition cursor-pointer"
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