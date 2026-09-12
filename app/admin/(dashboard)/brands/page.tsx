import { getBrandsAction, createBrandAction, deleteBrandAction } from "@/actions/brand.actions";
import { Award, Trash2, Plus, Globe } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminBrandsPage() {
  const brands = await getBrandsAction();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Brand Partners</h1>
        <p className="text-xs text-slate-400 mt-1">Manage client logos and verified partners shown across the agency website.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Brand Creation Form */}
        <div className="bg-[#0F172A] p-6 rounded-2xl border border-white/5 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#0066FF]" /> Add Brand Partner
          </h2>
          <form action={createBrandAction} className="space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Brand Name *</label>
              <input name="name" required placeholder="e.g. Mahindra Tractors" className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Logo URL *</label>
              <input name="logo" required placeholder="https://..." className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Website</label>
              <input name="website" placeholder="https://brand.com" className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Display Order</label>
              <input type="number" name="displayOrder" defaultValue={0} className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input type="checkbox" name="featured" id="featured" defaultChecked className="w-4 h-4 accent-[#0066FF]" />
              <label htmlFor="featured" className="text-xs text-slate-300">Featured on Homepage</label>
            </div>
            <button type="submit" className="w-full py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold rounded-lg transition mt-2">
              Save Brand
            </button>
          </form>
        </div>

        {/* Brands List */}
        <div className="lg:col-span-2 bg-[#0F172A] p-6 rounded-2xl border border-white/5 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-[#0066FF]" /> Existing Brands ({brands.length})
          </h2>
          {brands.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No brands added yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {brands.map((brand: any) => (
                <div key={brand._id} className="p-4 rounded-xl bg-[#080C14] border border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={brand.logo} alt={brand.name} className="w-10 h-10 object-contain rounded bg-white/5 p-1 border border-white/10" />
                    <div>
                      <div className="text-xs font-bold text-white">{brand.name}</div>
                      {brand.website && (
                        <a href={brand.website} target="_blank" rel="noreferrer" className="text-[10px] text-blue-400 hover:underline flex items-center gap-1">
                          <Globe className="w-2.5 h-2.5" /> website
                        </a>
                      )}
                    </div>
                  </div>
                  <form action={deleteBrandAction.bind(null, brand._id)}>
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