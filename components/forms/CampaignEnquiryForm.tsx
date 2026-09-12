"use client";

import { useState } from "react";
import { submitCampaignEnquiryAction } from "@/actions/lead.actions";
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";

const SERVICE_OPTIONS = [
  "Influencer Marketing",
  "Creator Campaigns",
  "Reels & Short-Form",
  "UGC Content",
  "Regional Marketing",
  "Others",
];

export default function CampaignEnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  function toggleService(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      brand: formData.get("company") as string,
      services: selectedServices,
      requirements: formData.get("message") as string,
      campaignType: selectedServices.join(", ") || "General Enquiry",
    };

    try {
      await submitCampaignEnquiryAction(payload);
      setSuccess(true);
      setSelectedServices([]);
      form.reset();
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {success ? (
        <motion.div
          key="success-card"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: DURATIONS.fast, ease: EASINGS.easeOutQuart }}
          className="bg-white border-2 border-[#B80F0A]/30 rounded-3xl p-10 text-center space-y-4 shadow-nickpat-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={EASINGS.bouncySpring}
            className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-200"
          >
            <CheckCircle2 className="w-7 h-7" />
          </motion.div>
          <h3 className="font-anton text-3xl text-[#111111] uppercase tracking-tight">Thank You!</h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed font-medium">
            Your enquiry has been received. Our Maharashtra influencer strategy team will review your requirements and reach out promptly.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="text-xs text-[#B80F0A] hover:underline pt-2 inline-block font-bold uppercase tracking-wider transition-colors"
          >
            Send another message &rarr;
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="form-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: DURATIONS.fast, ease: EASINGS.easeOutQuart }}
          className="bg-white border-2 border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-nickpat-lg space-y-8 max-w-3xl mx-auto"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCECDF] border border-[#B80F0A]/30 text-[#B80F0A] text-[11px] font-bold uppercase tracking-wider mb-2">
              Fast Response Guaranteed
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl text-[#111111] uppercase tracking-tight">
              Get In Touch
            </h2>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3.5 rounded-xl bg-rose-50 border-2 border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 overflow-hidden"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">Your Name *</label>
                <input
                  required
                  name="name"
                  placeholder="e.g. Rahul Patil"
                  className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-4 py-3 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">Email Address *</label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="rahul@company.com"
                  className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-4 py-3 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">Brand / Company *</label>
              <input
                required
                name="company"
                placeholder="e.g. Sahyadri AgriTech / Pune Lifestyle Brand"
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl px-4 py-3 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
              />
            </div>

            {/* Select Services Buttons */}
            <div className="space-y-2.5 pt-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Select Services You Need
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {SERVICE_OPTIONS.map((service) => {
                  const isChecked = selectedServices.includes(service);
                  return (
                    <motion.button
                      type="button"
                      key={service}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      transition={EASINGS.spring}
                      onClick={() => toggleService(service)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-colors select-none border-2 ${
                        isChecked
                          ? "bg-[#B80F0A] text-white border-[#960C08] shadow-sm"
                          : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                      }`}
                    >
                      {service} {isChecked && "✓"}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">Campaign Requirements *</label>
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Tell us about your brand targets, preferred districts, creator niche, budget range..."
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-xl p-4 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition resize-none font-medium"
              />
            </div>

            {/* Submit Button */}
            <div>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : undefined}
                whileTap={!loading ? { scale: 0.98 } : undefined}
                transition={EASINGS.spring}
                className="w-full sm:w-auto px-10 py-4 bg-[#B80F0A] hover:bg-[#960C08] disabled:opacity-50 text-white font-extrabold text-xs rounded-full transition-colors uppercase tracking-wider shadow-lg border-2 border-[#960C08] flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Campaign Brief</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
