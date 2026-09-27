"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loginAdminAction } from "@/actions/auth.actions";
import { ShieldAlert, ArrowRight, Lock, Mail, Shield, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

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
    <div className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Admin Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vistarmedia.com"
              className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#080B11] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/30 rounded-lg pl-9 pr-9 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full mt-2"
          isLoading={loading}
        >
          <span>Sign In to Admin Console</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#080B11] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-sm bg-[#0E131E] border border-white/10 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#00B8F0]/10 border border-[#00B8F0]/20 text-[#00B8F0] text-xs font-medium">
            <Shield className="w-3 h-3 text-[#00B8F0]" />
            <span>Admin Portal</span>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-white">
            VISTAR Control Center
          </h1>
          <p className="text-xs text-slate-400">
            Authorized administrator access for campaigns, creators, and agency operations.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-6 text-slate-500 text-xs">Loading login form...</div>}>
          <LoginForm />
        </Suspense>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition">
            &larr; Back to Website
          </Link>
          <span className="text-[11px] font-mono text-slate-500">v1.0 &bull; Secure</span>
        </div>
      </div>
    </div>
  );
}