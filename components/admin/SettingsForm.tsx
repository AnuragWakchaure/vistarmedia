"use client";

import { useState } from "react";
import { updateSettingsAction } from "@/actions/settings.actions";
import { Save, CheckCircle2, MessageSquare, Phone, Mail, Globe, MapPin } from "lucide-react";

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
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save settings.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Global settings updated successfully.
        </div>
      )}

      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-xs">
          {error}
        </div>
      )}

      {/* WhatsApp & Live Messaging */}
      <div className="bg-[#0F172A] p-6 rounded-xl border border-white/5 space-y-4">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          WhatsApp Persistent CTA Configuration
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">WhatsApp Number (with country code) *</label>
            <input
              required
              name="whatsappNumber"
              defaultValue={initialData?.whatsappNumber || "+919876543210"}
              placeholder="+919876543210"
              className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF] font-mono"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Agency Display Name</label>
            <input
              required
              name="companyName"
              defaultValue={initialData?.companyName || "VISTAR"}
              className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Pre-filled Chat Message *</label>
          <textarea
            required
            name="whatsappDefaultMessage"
            rows={2}
            defaultValue={
              initialData?.whatsappDefaultMessage ||
              "Hi VISTAR, I'm interested in an influencer marketing campaign for my brand. I would like to discuss my campaign requirements."
            }
            className="w-full bg-[#080C14] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#0066FF]"
          />
        </div>
      </div>

      {/* Direct Contact Points */}
      <div className="bg-[#0F172A] p-6 rounded-xl border border-white/5 space-y-4">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <Phone className="w-4 h-4 text-[#0066FF]" /> Direct Contact Information
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Primary Agency Phone *</label>
            <input
              required
              name="phone"
              defaultValue={initialData?.phone || "+91 98765 43210"}
              className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF] font-mono"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Inquiry / Contact Email *</label>
            <input
              required
              type="email"
              name="email"
              defaultValue={initialData?.email || "connect@vistar.in"}
              className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Office / Operating Location *</label>
          <input
            required
            name="address"
            defaultValue={initialData?.address || "Pune & Mumbai, Maharashtra, India"}
            className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
          />
        </div>
      </div>

      {/* Social URLs */}
      <div className="bg-[#0F172A] p-6 rounded-xl border border-white/5 space-y-4">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <Globe className="w-4 h-4 text-purple-400" /> Official Channels & Social Handles
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Instagram URL</label>
            <input
              name="instagramUrl"
              defaultValue={initialData?.instagramUrl || ""}
              placeholder="https://instagram.com/vistar_agency"
              className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">LinkedIn URL</label>
            <input
              name="linkedinUrl"
              defaultValue={initialData?.linkedinUrl || ""}
              placeholder="https://linkedin.com/company/vistar"
              className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">YouTube Channel URL</label>
            <input
              name="youtubeUrl"
              defaultValue={initialData?.youtubeUrl || ""}
              placeholder="https://youtube.com/@vistar"
              className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Facebook URL</label>
            <input
              name="facebookUrl"
              defaultValue={initialData?.facebookUrl || ""}
              placeholder="https://facebook.com/vistar"
              className="w-full bg-[#080C14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-6 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition inline-flex items-center justify-center gap-2"
      >
        <Save className="w-4 h-4" />
        {loading ? "Saving Settings..." : "Save Global Settings"}
      </button>
    </form>
  );
}