import { getBrandsAction, createBrandAction, deleteBrandAction } from "@/actions/brand.actions";
import { Award, Trash2, Plus, Globe, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminBrandsPage() {
  const brands = await getBrandsAction();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.15)]">
            <Award className="w-3.5 h-3.5" />
            <span>Brand Partnerships</span>
          </div>
          <h1 className="font-anton text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Brand Partners ({brands.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xl">
            Manage enterprise brand logos, partners, and display order shown on the homepage ticker strip.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Brand Creation Form */}
        <div className="bg-[#0D121D]/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-5">
          <h2 className="font-anton text-xl text-white uppercase tracking-tight flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#00D2FF]" /> Add Brand Partner
          </h2>
          <form action={createBrandAction} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Brand Name *
              </label>
              <input
                name="name"
                required
                placeholder="e.g. Mahindra Tractors"
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Logo URL / Path *
              </label>
              <input
                name="logo"
                required
                placeholder="/images/brands/... or https://..."
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Website URL
              </label>
              <input
                name="website"
                placeholder="https://brand.com"
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
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                defaultChecked
                className="w-4 h-4 accent-[#00D2FF] rounded bg-[#07090E] border-white/10"
              />
              <label htmlFor="featured" className="text-xs text-slate-200 font-bold uppercase tracking-wider cursor-pointer">
                Featured on Homepage Marquee
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#00D2FF] to-[#0A84FF] hover:from-[#38bdf8] hover:to-[#00D2FF] text-black text-xs font-bold uppercase tracking-wider rounded-full transition shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:scale-[1.01] cursor-pointer"
            >
              Save Brand Partner
            </button>
          </form>
        </div>

        {/* Brands List */}
        <div className="lg:col-span-2 bg-[#0D121D]/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-5">
          <h2 className="font-anton text-xl text-white uppercase tracking-tight flex items-center gap-2">
            <Award className="w-4 h-4 text-[#00D2FF]" /> Configured Brands ({brands.length})
          </h2>
          {brands.length === 0 ? (
            <p className="text-xs text-slate-500 py-10 text-center italic">No brands configured yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {brands.map((brand: any) => (
                <div
                  key={brand._id}
                  className="p-4 rounded-2xl bg-[#07090E]/80 border border-white/10 hover:border-[#00D2FF]/50 flex items-center justify-between gap-3 shadow-sm transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/5 rounded-xl p-2 border border-white/10 flex items-center justify-center shrink-0">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-w-full max-h-full object-contain brightness-0 invert"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{brand.name}</div>
                      {brand.website && (
                        <a
                          href={brand.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-[#00D2FF] font-bold hover:underline flex items-center gap-1 uppercase"
                        >
                          <Globe className="w-2.5 h-2.5" /> website
                        </a>
                      )}
                    </div>
                  </div>
                  <form action={deleteBrandAction.bind(null, brand._id)}>
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