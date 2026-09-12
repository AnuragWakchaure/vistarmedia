"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loginAdminAction } from "@/actions/auth.actions";
import { ShieldAlert, ArrowRight, Lock, Mail } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("callbackUrl", callbackUrl);

    try {
      const res = await loginAdminAction(formData);
      if (res?.error) {
        setError(res.error);
        setLoading(false);
      }
    } catch {
      // Handled by Next.js redirect
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
          <input
            name="email"
            type="email"
            required
            defaultValue="admin@vistar.in"
            placeholder="admin@vistar.in"
            className="w-full bg-[#080C14] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#B80F0A] transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••••••"
            className="w-full bg-[#080C14] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#B80F0A] transition"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 bg-[#B80F0A] hover:bg-[#960C08] disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition uppercase tracking-wider text-xs shadow-md"
      >
        {loading ? "Authenticating..." : "Sign In to Admin"}
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#18181B] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#B80F0A]/10 text-[#B80F0A] mb-3 border border-[#B80F0A]/20">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-anton text-2xl tracking-wide text-white uppercase">VISTAR Control Center</h1>
          <p className="text-xs text-stone-400 mt-1 font-medium">Authenticated admin access only</p>
        </div>

        <Suspense fallback={<div className="text-center py-6 text-stone-400 text-xs">Loading...</div>}>
          <LoginForm />
        </Suspense>

        <div className="mt-6 text-center text-xs text-stone-500 font-medium">
          VISTAR CMS &bull; Maharashtra Creator Ecosystem
        </div>
      </div>
    </div>
  );
}