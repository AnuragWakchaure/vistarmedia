"use client";

import { useState } from "react";
import { updateSettingsAction } from "@/actions/settings.actions";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  MapPin,
  Sparkles,
  Loader2,
  Share2,
  Video,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      companyName: formData.get("companyName") as string,
      whatsappNumber: formData.get("whatsappNumber") as string,
      whatsappDefaultMessage: formData.get("whatsappDefaultMessage") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
      instagramUrl: (formData.get("instagramUrl") as string) || "",
      linkedinUrl: (formData.get("linkedinUrl") as string) || "",
      youtubeUrl: (formData.get("youtubeUrl") as string) || "",
      facebookUrl: (formData.get("facebookUrl") as string) || "",
    };

    try {
      await updateSettingsAction(payload);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to save settings.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-emerald-50 border-2 border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-3 shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold">Settings Successfully Published</div>
              <div className="text-xs text-emerald-700 font-medium">All live contact endpoints, WhatsApp routing, and footer links are now synchronized.</div>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-rose-50 border-2 border-rose-200 text-rose-800 rounded-2xl text-xs font-bold flex items-center gap-3 shadow-sm"
          >
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. WhatsApp Live Chat Routing */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-stone-200/90 shadow-nickpat space-y-6">
        <div className="flex items-center justify-between border-b-2 border-stone-100 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider border border-emerald-200">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Floating Live CTA</span>
            </div>
            <h2 className="font-anton text-2xl sm:text-3xl text-[#111111] uppercase tracking-tight">
              WhatsApp Chat Integration
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
              WhatsApp Number (with country code) *
            </label>
            <div className="relative">
              <input
                required
                name="whatsappNumber"
                defaultValue={initialData?.whatsappNumber || "+919876543210"}
                placeholder="+919876543210"
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#111111] font-mono font-bold focus:outline-none transition shadow-inner-sm"
              />
            </div>
            <p className="text-[11px] text-stone-500 font-medium">Used in the persistent floating badge and direct chat buttons.</p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
              Agency Display Name *
            </label>
            <input
              required
              name="companyName"
              defaultValue={initialData?.companyName || "VISTAR"}
              placeholder="VISTAR"
              className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#111111] font-bold focus:outline-none transition shadow-inner-sm"
            />
            <p className="text-[11px] text-stone-500 font-medium">Shown on header watermark, chat cards, and copyright tags.</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
            Pre-Filled Customer Greeting Message *
          </label>
          <textarea
            required
            name="whatsappDefaultMessage"
            rows={3}
            defaultValue={
              initialData?.whatsappDefaultMessage ||
              "Hi VISTAR, I'm interested in an influencer marketing campaign for my brand. I would like to discuss my campaign requirements."
            }
            className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-2xl p-4 text-xs sm:text-sm text-[#111111] placeholder-stone-400 focus:outline-none transition resize-none font-medium shadow-inner-sm leading-relaxed"
          />
          <p className="text-[11px] text-stone-500 font-medium">Automatically pre-fills the message box when a brand taps the WhatsApp button.</p>
        </div>
      </div>

      {/* 2. Direct Agency Contact Details */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-stone-200/90 shadow-nickpat space-y-6">
        <div className="flex items-center justify-between border-b-2 border-stone-100 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCECDF] text-[#B80F0A] text-[11px] font-bold uppercase tracking-wider border border-[#B80F0A]/20">
              <Phone className="w-3.5 h-3.5 text-[#B80F0A]" />
              <span>Direct Channels</span>
            </div>
            <h2 className="font-anton text-2xl sm:text-3xl text-[#111111] uppercase tracking-tight">
              Official Agency Contact Data
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
              Primary Phone Support *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
              <input
                required
                name="phone"
                defaultValue={initialData?.phone || "+91 98765 43210"}
                placeholder="+91 98765 43210"
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-[#111111] font-mono font-bold focus:outline-none transition shadow-inner-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
              Official Inquiry Email *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
              <input
                required
                type="email"
                name="email"
                defaultValue={initialData?.email || "connect@vistar.in"}
                placeholder="connect@vistar.in"
                className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-[#111111] font-bold focus:outline-none transition shadow-inner-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
            Office & Regional Operations Address *
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
            <input
              required
              name="address"
              defaultValue={initialData?.address || "Pune & Mumbai, Maharashtra, India"}
              placeholder="Pune & Mumbai, Maharashtra, India"
              className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-[#111111] font-medium focus:outline-none transition shadow-inner-sm"
            />
          </div>
        </div>
      </div>

      {/* 3. Social Media Channels */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-stone-200/90 shadow-nickpat space-y-6">
        <div className="flex items-center justify-between border-b-2 border-stone-100 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold uppercase tracking-wider border border-amber-200">
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span>Online Presence</span>
            </div>
            <h2 className="font-anton text-2xl sm:text-3xl text-[#111111] uppercase tracking-tight">
              Official Social Profiles
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-[#EE6A43]" /> Instagram Profile Link
            </label>
            <input
              name="instagramUrl"
              defaultValue={initialData?.instagramUrl || ""}
              placeholder="https://instagram.com/vistar_agency"
              className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#111111] focus:outline-none transition font-medium shadow-inner-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" /> LinkedIn Company URL
            </label>
            <input
              name="linkedinUrl"
              defaultValue={initialData?.linkedinUrl || ""}
              placeholder="https://linkedin.com/company/vistar"
              className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#111111] focus:outline-none transition font-medium shadow-inner-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-red-600" /> YouTube Channel Link
            </label>
            <input
              name="youtubeUrl"
              defaultValue={initialData?.youtubeUrl || ""}
              placeholder="https://youtube.com/@vistar"
              className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#111111] focus:outline-none transition font-medium shadow-inner-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-blue-800" /> Facebook Page Link
            </label>
            <input
              name="facebookUrl"
              defaultValue={initialData?.facebookUrl || ""}
              placeholder="https://facebook.com/vistar"
              className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#111111] focus:outline-none transition font-medium shadow-inner-sm"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-10 py-4 bg-[#B80F0A] hover:bg-[#960C08] disabled:opacity-50 text-white font-anton text-sm uppercase tracking-wider rounded-full transition-all shadow-nickpat hover:scale-[1.01] inline-flex items-center justify-center gap-2.5 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Publishing Settings...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save & Publish Agency Settings</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}