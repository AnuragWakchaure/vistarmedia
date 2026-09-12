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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Social Proof & Endorsements</span>
          </div>
          <h1 className="font-anton text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
            Client Testimonials ({testimonials.length})
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-medium max-w-xl">
            Manage verified brand endorsements and creator reviews shown in the homepage marquee track.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200/90 shadow-nickpat space-y-5">
          <h2 className="font-anton text-xl text-[#111111] uppercase tracking-tight flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#B80F0A]" /> Add Testimonial
          </h2>
          <form action={createTestimonialAction} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Client / Executive Name *
              </label>
              <input
                name="personName"
                required
                placeholder="e.g. Anand Mahindra"
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Designation / Title *
              </label>
              <input
                name="designation"
                required
                placeholder="e.g. Head of Marketing"
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Company / Brand *
              </label>
              <input
                name="company"
                required
                placeholder="e.g. Mahindra Tractors"
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Photo URL
              </label>
              <input
                name="photo"
                placeholder="https://..."
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Testimonial Quote *
              </label>
              <textarea
                name="testimonial"
                required
                rows={3}
                placeholder="Working with VISTAR unlocked massive regional engagement..."
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl p-3 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#B80F0A] hover:bg-[#960C08] text-white text-xs font-bold uppercase tracking-wider rounded-full transition shadow-sm hover:scale-[1.01] cursor-pointer"
            >
              Save Testimonial
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200/90 shadow-nickpat space-y-5">
          <h2 className="font-anton text-xl text-[#111111] uppercase tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B80F0A]" /> Published Testimonials ({testimonials.length})
          </h2>
          {testimonials.length === 0 ? (
            <p className="text-xs text-stone-400 py-10 text-center italic">No testimonials added yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {testimonials.map((t: any) => (
                <div
                  key={t._id}
                  className="p-5 rounded-2xl bg-stone-50 border-2 border-stone-200/90 hover:border-[#B80F0A] flex flex-col justify-between gap-4 transition"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-[#EE6A43]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-stone-700 italic leading-relaxed font-medium">"{t.testimonial}"</p>
                  </div>
                  <div className="pt-3 border-t-2 border-stone-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#111111]">{t.personName}</div>
                      <div className="text-[11px] text-stone-500 font-medium">{t.designation}, {t.company}</div>
                    </div>
                    <form action={deleteTestimonialAction.bind(null, t._id)}>
                      <button
                        type="submit"
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition cursor-pointer"
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