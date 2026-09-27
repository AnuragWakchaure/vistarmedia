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
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -8 }}
          transition={{ duration: DURATIONS.fast, ease: EASINGS.easeOutQuart }}
          className="bg-white border border-emerald-200 rounded-xl p-8 sm:p-10 text-center space-y-3.5 shadow-sm max-w-xl mx-auto"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Enquiry Submitted Successfully
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Thank you! Your campaign brief has been received. Our Maharashtra influencer strategy team will review your requirements and reach out within 24 hours.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="text-xs text-[#0088B8] hover:underline pt-2 inline-block font-semibold transition-colors cursor-pointer"
          >
            Send another inquiry &rarr;
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="form-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: DURATIONS.fast, ease: EASINGS.easeOutQuart }}
          className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 max-w-2xl mx-auto"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-[#00B8F0]/10 text-[#0088B8] border border-[#00B8F0]/25 mb-2">
              Fast Response &bull; 24h Turnaround
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Get In Touch
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Tell us about your brand goals and we&apos;ll prepare a customized Maharashtra creator proposal.
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 overflow-hidden"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  Your Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    required
                    name="name"
                    placeholder="Rahul Patil"
                    className="w-full bg-white border border-slate-300 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="rahul@company.com"
                    className="w-full bg-white border border-slate-300 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Brand Name & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  Brand / Organization *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    required
                    name="company"
                    placeholder="e.g. Sahyadri AgriTech / Mahindra"
                    className="w-full bg-white border border-slate-300 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  Phone / WhatsApp Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98220 00000"
                    className="w-full bg-white border border-slate-300 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition font-medium font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Select Services Buttons */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-medium text-slate-700">
                Required Capabilities (Select applicable)
              </label>
              <div className="flex flex-wrap items-center gap-1.5">
                {SERVICE_OPTIONS.map((service) => {
                  const isChecked = selectedServices.includes(service);
                  return (
                    <button
                      type="button"
                      key={service}
                      onClick={() => toggleService(service)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all border cursor-pointer ${
                        isChecked
                          ? "bg-[#00B8F0]/15 text-[#007EA6] border-[#00B8F0]"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {service} {isChecked && "✓"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Campaign Brief & Objectives *
              </label>
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Target districts in Maharashtra, campaign timeline, product category, preferred influencer tier..."
                className="w-full bg-white border border-slate-300 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg p-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition resize-none font-medium leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-7 py-2.5 bg-[#00B8F0] hover:bg-[#00A3D9] disabled:opacity-50 text-[#05080D] font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Brief...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Campaign Brief</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}