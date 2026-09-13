import { getTestimonialsAction, createTestimonialAction, deleteTestimonialAction } from "@/actions/testimonial.actions";
import { Sparkles, Trash2, Plus, Quote, Star } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonialsAction();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Social Proof & Endorsements</span>
          </div>
          <h1 className="font-anton text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Client Testimonials ({testimonials.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xl">
            Manage verified brand endorsements and creator reviews shown in the homepage marquee track.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-[#0D121D]/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-5">
          <h2 className="font-anton text-xl text-white uppercase tracking-tight flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#00D2FF]" /> Add Testimonial
          </h2>
          <form action={createTestimonialAction} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Client / Executive Name *
              </label>
              <input
                name="personName"
                required
                placeholder="e.g. Anand Mahindra"
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Designation / Title *
              </label>
              <input
                name="designation"
                required
                placeholder="e.g. Head of Marketing"
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Company / Brand *
              </label>
              <input
                name="company"
                required
                placeholder="e.g. Mahindra Tractors"
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Photo URL
              </label>
              <input
                name="photo"
                placeholder="https://..."
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Testimonial Quote *
              </label>
              <textarea
                name="testimonial"
                required
                rows={3}
                placeholder="Working with VISTAR unlocked massive regional engagement..."
                className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#00D2FF] to-[#0A84FF] hover:from-[#38bdf8] hover:to-[#00D2FF] text-black text-xs font-bold uppercase tracking-wider rounded-full transition shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:scale-[1.01] cursor-pointer"
            >
              Save Testimonial
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-[#0D121D]/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-5">
          <h2 className="font-anton text-xl text-white uppercase tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00D2FF]" /> Published Testimonials ({testimonials.length})
          </h2>
          {testimonials.length === 0 ? (
            <p className="text-xs text-slate-500 py-10 text-center italic">No testimonials added yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {testimonials.map((t: any) => (
                <div
                  key={t._id}
                  className="p-5 rounded-2xl bg-[#07090E]/80 border border-white/10 hover:border-[#00D2FF]/50 flex flex-col justify-between gap-4 transition"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-[#00D2FF]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-300 italic leading-relaxed font-medium">"{t.testimonial}"</p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{t.personName}</div>
                      <div className="text-[11px] text-slate-400 font-medium">{t.designation}, {t.company}</div>
                    </div>
                    <form action={deleteTestimonialAction.bind(null, t._id)}>
                      <button
                        type="submit"
                        className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition cursor-pointer border border-transparent hover:border-rose-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
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