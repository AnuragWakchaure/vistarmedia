"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loginAdminAction } from "@/actions/auth.actions";
import { ShieldAlert, ArrowRight, Lock, Mail, Sparkles } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("admin@vistar.in");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
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
    <div className="space-y-4">
      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-700 text-xs font-semibold leading-relaxed flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {info && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-800 text-xs font-medium leading-relaxed">
          {info}
        </div>
      )}

      {/* Quick Credentials Info Box */}
      <div className="p-3 bg-[#FCECDF]/60 border border-stone-300 rounded-2xl text-[11px] text-stone-700 flex items-center justify-between">
        <div>
          <span className="font-bold text-[#B80F0A]">Default Access: </span>
          <span className="font-mono font-medium">admin@vistar.in / admin123</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setEmail("admin@vistar.in");
            setPassword("admin123");
          }}
          className="text-[10px] font-bold uppercase tracking-wider bg-stone-900 hover:bg-[#B80F0A] text-white px-2.5 py-1 rounded-full transition cursor-pointer"
        >
          Auto-Fill
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Admin Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vistar.in"
              className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#FCECDF]/30 border-2 border-stone-200 focus:border-[#B80F0A] focus:bg-white rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#111111] placeholder-stone-400 focus:outline-none transition font-medium"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-[#B80F0A] hover:bg-[#960C08] disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-full flex items-center justify-center gap-2 transition uppercase tracking-wider text-xs shadow-md cursor-pointer hover:scale-[1.01]"
        >
          <span>{loading ? "Authenticating..." : "Sign In to Admin Console"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#FCECDF] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="w-full max-w-md bg-white border-2 border-stone-200/90 rounded-3xl p-8 sm:p-10 shadow-nickpat-lg relative z-10 space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCECDF] border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#B80F0A]" />
            <span>Admin Portal</span>
          </div>

          <h1 className="font-anton text-3xl sm:text-4xl tracking-tight text-[#111111] uppercase">
            VISTAR Control Center
          </h1>
          <p className="text-xs text-stone-600 font-medium max-w-xs mx-auto">
            Authorized administrator access for managing creators, campaigns, and enquiries.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-6 text-stone-400 text-xs">Loading login form...</div>}>
          <LoginForm />
        </Suspense>

        <div className="pt-4 border-t-2 border-stone-100 flex items-center justify-between text-xs font-semibold">
          <Link href="/" className="text-stone-500 hover:text-[#B80F0A] transition">
            &larr; Back to Website
          </Link>
          <span className="text-[11px] text-stone-400 font-mono">VISTAR &bull; CMS</span>
        </div>
      </div>
    </div>
  );
}