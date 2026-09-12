import { getServicesAction, createServiceAction, deleteServiceAction } from "@/actions/service.actions";
import { Layers, Trash2, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await getServicesAction();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Agency Services</h1>
        <p className="text-xs text-slate-400 mt-1">Manage agency marketing offerings, descriptions, and catalog items.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-[#0F172A] p-6 rounded-2xl border border-white/5 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#0066FF]" /> Add Service
          </h2>
          <form action={createServiceAction} className="space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Service Title *</label>
              <input name="title" required placeholder="e.g. Influencer Marketing" className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Short Description *</label>
              <textarea name="shortDescription" required rows={3} placeholder="Brief summary of deliverables..." className="w-full bg-[#080C14] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Display Order</label>
              <input type="number" name="displayOrder" defaultValue={0} className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <button type="submit" className="w-full py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold rounded-lg transition mt-2">
              Save Service
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-[#0F172A] p-6 rounded-2xl border border-white/5 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#0066FF]" /> Active Services ({services.length})
          </h2>
          {services.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No custom services added yet.</p>
          ) : (
            <div className="space-y-3">
              {services.map((srv: any) => (
                <div key={srv._id} className="p-4 rounded-xl bg-[#080C14] border border-white/5 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-white">{srv.title}</div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{srv.shortDescription}</p>
                  </div>
                  <form action={deleteServiceAction.bind(null, srv._id)}>
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