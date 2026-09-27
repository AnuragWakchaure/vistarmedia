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
  Share2,
  Video,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Button,
} from "@/components/ui";

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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-semibold flex items-center gap-3"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <div>
              <div className="font-bold text-white">Settings Published Successfully</div>
              <div className="text-[11px] text-emerald-400/90 font-normal">All contact channels and WhatsApp routing are now updated.</div>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-lg text-xs font-medium flex items-center gap-2.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. WhatsApp Live Chat Routing */}
      <Card>
        <CardHeader className="border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <CardTitle className="text-base">WhatsApp Chat Integration</CardTitle>
          </div>
          <CardDescription>Controls the floating WhatsApp widget and customer direct message routing.</CardDescription>
        </CardHeader>

        <CardContent className="pt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="WhatsApp Number (with country code)"
              required
              name="whatsappNumber"
              defaultValue={initialData?.whatsappNumber || "+91 83088 68478"}
              placeholder="+91 83088 68478"
              helperText="Used in the floating WhatsApp widget and quick chat links."
            />

            <Input
              label="Agency Display Name"
              required
              name="companyName"
              defaultValue={initialData?.companyName || "VISTAR"}
              placeholder="VISTAR"
              helperText="Shown on page footers, chat popups, and attribution."
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-semibold text-slate-300">
              Pre-Filled Customer Greeting Message <span className="text-rose-400 ml-0.5">*</span>
            </label>
            <textarea
              required
              name="whatsappDefaultMessage"
              rows={3}
              defaultValue={
                initialData?.whatsappDefaultMessage ||
                "Hi VISTAR, I'm interested in an influencer marketing campaign for my brand. I would like to discuss my campaign requirements."
              }
              className="w-full bg-[#0E131E] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/40 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition resize-none font-medium leading-relaxed"
            />
            <p className="text-[11px] text-slate-400">Pre-populates the customer message field when WhatsApp opens.</p>
          </div>
        </CardContent>
      </Card>

      {/* 2. Direct Agency Contact Details */}
      <Card>
        <CardHeader className="border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-[#00B8F0]" />
            <CardTitle className="text-base">Official Agency Contact Data</CardTitle>
          </div>
          <CardDescription>Public communication channels displayed in the footer and contact page.</CardDescription>
        </CardHeader>

        <CardContent className="pt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Primary Phone Support"
              required
              name="phone"
              defaultValue={initialData?.phone || "+91 83088 68478"}
              placeholder="+91 83088 68478"
              leftIcon={<Phone className="w-4 h-4" />}
            />

            <Input
              label="Official Inquiry Email"
              required
              type="email"
              name="email"
              defaultValue={initialData?.email || "connect@vistar.in"}
              placeholder="connect@vistar.in"
              leftIcon={<Mail className="w-4 h-4" />}
            />
          </div>

          <Input
            label="Office & Operations Address"
            required
            name="address"
            defaultValue={initialData?.address || "Pune & Mumbai, Maharashtra, India"}
            placeholder="Pune & Mumbai, Maharashtra, India"
            leftIcon={<MapPin className="w-4 h-4" />}
          />
        </CardContent>
      </Card>

      {/* 3. Social Media Channels */}
      <Card>
        <CardHeader className="border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-[#00B8F0]" />
            <CardTitle className="text-base">Official Social Profiles</CardTitle>
          </div>
          <CardDescription>External social channel URLs linked in website footers.</CardDescription>
        </CardHeader>

        <CardContent className="pt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Instagram Profile Link"
              name="instagramUrl"
              defaultValue={initialData?.instagramUrl || ""}
              placeholder="https://instagram.com/vistar_agency"
              leftIcon={<Share2 className="w-4 h-4" />}
            />

            <Input
              label="LinkedIn Company URL"
              name="linkedinUrl"
              defaultValue={initialData?.linkedinUrl || ""}
              placeholder="https://linkedin.com/company/vistar"
              leftIcon={<Globe className="w-4 h-4" />}
            />

            <Input
              label="YouTube Channel Link"
              name="youtubeUrl"
              defaultValue={initialData?.youtubeUrl || ""}
              placeholder="https://youtube.com/@vistar"
              leftIcon={<Video className="w-4 h-4" />}
            />

            <Input
              label="Facebook Page Link"
              name="facebookUrl"
              defaultValue={initialData?.facebookUrl || ""}
              placeholder="https://facebook.com/vistar"
              leftIcon={<Share2 className="w-4 h-4" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="pt-2">
        <Button
          type="submit"
          loading={loading}
          size="md"
          className="w-full sm:w-auto px-6 gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save & Publish Settings</span>
        </Button>
      </div>
    </form>
  );
}