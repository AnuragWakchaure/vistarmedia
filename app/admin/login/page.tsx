"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loginAdminAction } from "@/actions/auth.actions";
import { ShieldAlert, ArrowRight, Lock, Mail, Sparkles, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
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
      } else if (res?.success) {
        window.location.href = res.redirectUrl || callbackUrl || "/admin";
      }
    } catch {
      window.location.href = callbackUrl || "/admin";
    }
  }

  return (
    <div className="space-y-5">
      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold leading-relaxed flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Admin Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter administrator email"
              className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:bg-[#07090E] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium focus:ring-1 focus:ring-[#00D2FF]/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:bg-[#07090E] rounded-2xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium focus:ring-1 focus:ring-[#00D2FF]/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-2.5 text-slate-500 hover:text-slate-300 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-3 bg-gradient-to-r from-[#00D2FF] to-[#0A84FF] hover:from-[#00E5FF] hover:to-[#0070E0] disabled:opacity-50 text-black font-bold py-3.5 px-4 rounded-full flex items-center justify-center gap-2 transition uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(0,210,255,0.3)] cursor-pointer hover:scale-[1.01] border border-cyan-300/40"
        >
          <span>{loading ? "Authenticating..." : "Sign In to Admin Console"}</span>
          <ArrowRight className="w-4 h-4 text-black" />
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#07090E] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="w-full max-w-md bg-[#0D121D]/90 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10 space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
            <span>Admin Portal</span>
          </div>

          <h1 className="font-anton text-3xl sm:text-4xl tracking-tight text-white uppercase">
            VISTAR Control Center
          </h1>
          <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto">
            Authorized administrator access for managing creators, campaigns, and agency configuration.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-6 text-slate-500 text-xs">Loading login form...</div>}>
          <LoginForm />
        </Suspense>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
          <Link href="/" className="text-slate-400 hover:text-[#00D2FF] transition">
            &larr; Back to Website
          </Link>
          <span className="text-[11px] text-[#00D2FF] font-mono">VISTAR &bull; Security</span>
        </div>
      </div>
    </div>
  );
}