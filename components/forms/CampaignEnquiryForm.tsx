"use client";

import { useState } from "react";
import { submitCampaignEnquiryAction } from "@/actions/lead.actions";
import { CheckCircle2, AlertCircle, Send, Loader2, Phone, Mail, User, Building2 } from "lucide-react";
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
      name: (formData.get("name") as string)?.trim() || "",
      email: (formData.get("email") as string)?.trim() || "",
      phone: (formData.get("phone") as string)?.trim() || "",
      brand: (formData.get("company") as string)?.trim() || "",
      services: selectedServices,
      requirements: (formData.get("message") as string)?.trim() || "",
      campaignType: selectedServices.join(", ") || "General Influencer Enquiry",
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
          className="bg-white border border-emerald-300 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={EASINGS.bouncySpring}
            className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200"
          >
            <CheckCircle2 className="w-7 h-7" />
          </motion.div>
          <h3 className="font-anton text-3xl sm:text-4xl text-[#07111A] uppercase tracking-tight">
            Enquiry Submitted!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
            Thank you! Your campaign brief has been received. Our Maharashtra influencer strategy team will review your requirements and get in touch with you shortly.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="text-xs text-[#009DFF] hover:underline pt-2 inline-block font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Send another inquiry &rarr;
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="form-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: DURATIONS.fast, ease: EASINGS.easeOutQuart }}
          className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-[0_12px_40px_rgba(15,23,42,0.06)] space-y-8 max-w-3xl mx-auto"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#009DFF] text-[11px] font-bold uppercase tracking-wider mb-2">
              Fast Response Guaranteed &bull; 24h Turnaround
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl text-[#07111A] uppercase tracking-tight">
              Get In Touch
            </h2>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-2.5 overflow-hidden"
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
                <label className="block text-xs font-bold uppercase tracking-wider text-[#07111A]">
                  Your Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#64717C] absolute left-3.5 top-3.5" />
                  <input
                    required
                    name="name"
                    placeholder="e.g. Rahul Patil"
                    className="w-full bg-[#EAF0F3] border border-slate-200 focus:border-[#00C8FF] focus:bg-[#FFFFFF] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-[#0B1117] placeholder-[#64717C]/70 focus:outline-none transition font-medium focus:ring-2 focus:ring-[#00C8FF]/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1117]">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#64717C] absolute left-3.5 top-3.5" />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="rahul@company.com"
                    className="w-full bg-[#EAF0F3] border border-slate-200 focus:border-[#00C8FF] focus:bg-[#FFFFFF] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-[#0B1117] placeholder-[#64717C]/70 focus:outline-none transition font-medium focus:ring-2 focus:ring-[#00C8FF]/20"
                  />
                </div>
              </div>
            </div>

            {/* Brand Name & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1117]">
                  Brand / Company *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[#64717C] absolute left-3.5 top-3.5" />
                  <input
                    required
                    name="company"
                    placeholder="e.g. Sahyadri AgriTech / Tata"
                    className="w-full bg-[#EAF0F3] border border-slate-200 focus:border-[#00C8FF] focus:bg-[#FFFFFF] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-[#0B1117] placeholder-[#64717C]/70 focus:outline-none transition font-medium focus:ring-2 focus:ring-[#00C8FF]/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1117]">
                  Phone / WhatsApp Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#64717C] absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#EAF0F3] border border-slate-200 focus:border-[#00C8FF] focus:bg-[#FFFFFF] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-[#0B1117] placeholder-[#64717C]/70 focus:outline-none transition font-medium font-mono focus:ring-2 focus:ring-[#00C8FF]/20"
                  />
                </div>
              </div>
            </div>

            {/* Select Services Buttons */}
            <div className="space-y-2.5 pt-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1117]">
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
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all select-none border cursor-pointer ${isChecked
                          ? "bg-[#00C8FF] text-[#05080D] border-[#00C8FF] shadow-[0_2px_12px_rgba(0,200,255,0.3)]"
                          : "bg-[#EAF0F3] hover:bg-[#FFFFFF] text-[#0B1117] border-slate-200 hover:border-[#00C8FF]"
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
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1117]">
                Campaign Requirements / Message *
              </label>
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Tell us about your campaign goals, target districts in Maharashtra, preferred creator categories, budget..."
                className="w-full bg-[#EAF0F3] border border-slate-200 focus:border-[#00C8FF] focus:bg-[#FFFFFF] rounded-2xl p-4 text-xs sm:text-sm text-[#0B1117] placeholder-[#64717C]/70 focus:outline-none transition resize-none font-medium leading-relaxed focus:ring-2 focus:ring-[#00C8FF]/20"
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
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#00C8FF] to-[#009DFF] hover:from-[#009DFF] hover:to-[#00C8FF] disabled:opacity-50 text-[#05080D] font-anton text-sm rounded-full transition-all uppercase tracking-wider shadow-[0_4px_25px_rgba(0,200,255,0.35)] border border-cyan-300/40 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Brief...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Campaign Brief</span>
                    <Send className="w-4 h-4" />
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