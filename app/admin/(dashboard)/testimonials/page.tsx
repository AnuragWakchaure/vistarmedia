import { getTestimonialsAction, createTestimonialAction, deleteTestimonialAction } from "@/actions/testimonial.actions";
import { Sparkles, Trash2, Plus, Quote } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonialsAction();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Client Testimonials</h1>
        <p className="text-xs text-slate-400 mt-1">Manage verified brand endorsements and reviews.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-[#0F172A] p-6 rounded-2xl border border-white/5 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#0066FF]" /> Add Testimonial
          </h2>
          <form action={createTestimonialAction} className="space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Person Name *</label>
              <input name="personName" required placeholder="e.g. Anand Mahindra" className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Designation *</label>
              <input name="designation" required placeholder="e.g. Marketing VP" className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Company *</label>
              <input name="company" required placeholder="e.g. Mahindra Tractors" className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Photo URL</label>
              <input name="photo" placeholder="https://..." className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Testimonial Quote *</label>
              <textarea name="testimonial" required rows={3} placeholder="Working with VISTAR unlocked..." className="w-full bg-[#080C14] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#0066FF]" />
            </div>
            <button type="submit" className="w-full py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold rounded-lg transition mt-2">
              Save Testimonial
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-[#0F172A] p-6 rounded-2xl border border-white/5 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0066FF]" /> Published Testimonials ({testimonials.length})
          </h2>
          {testimonials.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No testimonials added yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {testimonials.map((t: any) => (
                <div key={t._id} className="p-4 rounded-xl bg-[#080C14] border border-white/5 flex flex-col justify-between gap-3">
                  <div className="space-y-2">
                    <Quote className="w-4 h-4 text-[#0066FF]" />
                    <p className="text-xs text-slate-300 italic">"{t.testimonial}"</p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{t.personName}</div>
                      <div className="text-[10px] text-slate-400">{t.designation}, {t.company}</div>
                    </div>
                    <form action={deleteTestimonialAction.bind(null, t._id)}>
                      <button type="submit" className="p-1.5 text-red-400 hover:bg-red-500/10 rounded transition">
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