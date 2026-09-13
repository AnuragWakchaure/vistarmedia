"use client";

import React, { useState } from "react";
import {
  changePasswordAction,
  createAdminAction,
  toggleAdminStatusAction,
  deleteAdminAction,
} from "@/actions/auth.actions";
import {
  KeyRound,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Trash2,
  Power,
  Shield,
  Clock,
  Mail,
  User as UserIcon,
} from "lucide-react";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "CONTENT_MANAGER";
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export default function AdminSecuritySection({
  admins = [],
  currentUserEmail,
}: {
  admins: AdminUser[];
  currentUserEmail?: string;
}) {
  // Change Password state
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMessage, setPwMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  // Create Admin state
  const [createLoading, setCreateLoading] = useState(false);
  const [createMessage, setCreateMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showCreatePw, setShowCreatePw] = useState(false);

  // Action status state
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  async function handlePasswordChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPwMessage(null);
    setPwLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await changePasswordAction(formData);
      if (res?.error) {
        setPwMessage({ type: "error", text: res.error });
      } else if (res?.success) {
        setPwMessage({ type: "success", text: res.message || "Password changed successfully!" });
        form.reset();
      }
    } catch (err: any) {
      setPwMessage({ type: "error", text: err?.message || "Failed to update password." });
    } finally {
      setPwLoading(false);
    }
  }

  async function handleCreateAdmin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCreateMessage(null);
    setCreateLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await createAdminAction(formData);
      if (res?.error) {
        setCreateMessage({ type: "error", text: res.error });
      } else if (res?.success) {
        setCreateMessage({ type: "success", text: res.message || "New administrator created!" });
        form.reset();
      }
    } catch (err: any) {
      setCreateMessage({ type: "error", text: err?.message || "Failed to create administrator." });
    } finally {
      setCreateLoading(false);
    }
  }

  async function handleToggleStatus(id: string) {
    setActionLoadingId(id);
    try {
      const res = await toggleAdminStatusAction(id);
      if (res?.error) {
        alert(res.error);
      }
    } catch (err: any) {
      alert(err?.message || "Failed to toggle status.");
    } finally {
      setActionLoadingId(null);
    }
  }

  async function handleDeleteAdmin(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete administrator "${name}"? This action cannot be undone.`)) {
      return;
    }

    setActionLoadingId(id);
    try {
      const res = await deleteAdminAction(id);
      if (res?.error) {
        alert(res.error);
      }
    } catch (err: any) {
      alert(err?.message || "Failed to delete administrator.");
    } finally {
      setActionLoadingId(null);
    }
  }

  return (
    <div className="space-y-10">
      {/* 2-Column Grid: Change Password & Add Admin */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ========================================================================= */}
        {/* CARD 1: CHANGE PASSWORD */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D121D]/90 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/20">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-sans">Change Your Password</h3>
                <p className="text-xs text-slate-400 font-normal">Update security credentials for your current account.</p>
              </div>
            </div>

            {pwMessage && (
              <div
                className={`p-3.5 rounded-2xl text-xs font-semibold flex items-start gap-2.5 ${
                  pwMessage.type === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                    : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                }`}
              >
                {pwMessage.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                )}
                <span>{pwMessage.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    name="currentPassword"
                    type={showCurrentPw ? "text" : "password"}
                    required
                    placeholder="Enter current password"
                    className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:bg-[#07090E] rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium focus:ring-1 focus:ring-[#00D2FF]/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="absolute right-3.5 top-2.5 text-slate-500 hover:text-slate-300 transition"
                  >
                    {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  New Password (min 6 characters)
                </label>
                <div className="relative">
                  <input
                    name="newPassword"
                    type={showNewPw ? "text" : "password"}
                    required
                    minLength={6}
                    placeholder="Enter new password"
                    className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:bg-[#07090E] rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium focus:ring-1 focus:ring-[#00D2FF]/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="absolute right-3.5 top-2.5 text-slate-500 hover:text-slate-300 transition"
                  >
                    {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirmPw ? "text" : "password"}
                    required
                    minLength={6}
                    placeholder="Repeat new password"
                    className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:bg-[#07090E] rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium focus:ring-1 focus:ring-[#00D2FF]/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw(!showConfirmPw)}
                    className="absolute right-3.5 top-2.5 text-slate-500 hover:text-slate-300 transition"
                  >
                    {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={pwLoading}
                className="w-full mt-2 bg-gradient-to-r from-[#00D2FF] to-[#0A84FF] hover:from-[#00E5FF] hover:to-[#0070E0] disabled:opacity-50 text-black font-bold py-3 px-4 rounded-full flex items-center justify-center gap-2 transition uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(0,210,255,0.25)] cursor-pointer"
              >
                <span>{pwLoading ? "Updating Password..." : "Save New Password"}</span>
              </button>
            </form>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 2: ADD NEW ADMINISTRATOR */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D121D]/90 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <UserPlus className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-sans">Add New Administrator</h3>
                <p className="text-xs text-slate-400 font-normal">Provision access for team members or campaign managers.</p>
              </div>
            </div>

            {createMessage && (
              <div
                className={`p-3.5 rounded-2xl text-xs font-semibold flex items-start gap-2.5 ${
                  createMessage.type === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                    : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                }`}
              >
                {createMessage.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                )}
                <span>{createMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleCreateAdmin} className="space-y-4 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:bg-[#07090E] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium focus:ring-1 focus:ring-[#00D2FF]/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="rahul@vistar.in"
                    className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:bg-[#07090E] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium focus:ring-1 focus:ring-[#00D2FF]/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Initial Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showCreatePw ? "text" : "password"}
                      required
                      minLength={6}
                      placeholder="••••••••"
                      className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] focus:bg-[#07090E] rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium focus:ring-1 focus:ring-[#00D2FF]/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCreatePw(!showCreatePw)}
                      className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 transition"
                    >
                      {showCreatePw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Role & Permissions
                  </label>
                  <select
                    name="role"
                    defaultValue="ADMIN"
                    className="w-full bg-[#07090E]/80 border border-white/10 focus:border-[#00D2FF] rounded-2xl px-3 py-2.5 text-xs text-white focus:outline-none transition font-semibold [&>option]:bg-[#0D121D] [&>option]:text-white"
                  >
                    <option value="ADMIN">Administrator (Full Access)</option>
                    <option value="CONTENT_MANAGER">Content Manager</option>
                    <option value="SUPER_ADMIN">Super Administrator</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={createLoading}
                className="w-full mt-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-full flex items-center justify-center gap-2 transition uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(168,85,247,0.25)] cursor-pointer"
              >
                <span>{createLoading ? "Creating Account..." : "Create Administrator"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: ADMINISTRATOR ROSTER TABLE */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00D2FF]" />
            <h3 className="font-anton text-xl sm:text-2xl text-white uppercase tracking-tight">
              Active Administrators ({admins.length})
            </h3>
          </div>
        </div>

        <div className="bg-[#0D121D]/90 border border-white/10 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[650px]">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px] font-bold bg-white/[0.02]">
                  <th className="py-3.5 px-4">Administrator</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Last Login</th>
                  <th className="py-3.5 px-4">Created</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                {admins.map((adm) => {
                  const isSelf = adm.email.toLowerCase() === currentUserEmail?.toLowerCase();
                  const isPrimary = adm.email === "admin@vistar.in";

                  return (
                    <tr key={adm._id} className="hover:bg-white/[0.02] transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00D2FF]/20 to-purple-500/20 text-[#00D2FF] font-anton text-xs flex items-center justify-center border border-white/10 shrink-0">
                            {adm.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-white flex items-center gap-2">
                              <span>{adm.name}</span>
                              {isSelf && (
                                <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-[#00D2FF]/20 text-[#00D2FF] px-1.5 py-0.5 rounded border border-[#00D2FF]/30">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400">{adm.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            adm.role === "SUPER_ADMIN"
                              ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                              : adm.role === "ADMIN"
                              ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
                              : "bg-slate-500/10 text-slate-400 border-slate-500/30"
                          }`}
                        >
                          <Shield className="w-2.5 h-2.5" />
                          <span>{adm.role.replace("_", " ")}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            adm.isActive
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              adm.isActive ? "bg-emerald-400" : "bg-rose-400"
                            }`}
                          />
                          <span>{adm.isActive ? "Active" : "Deactivated"}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {adm.lastLoginAt ? new Date(adm.lastLoginAt).toLocaleDateString() : "Never"}
                      </td>

                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {new Date(adm.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        {!isSelf && !isPrimary ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleToggleStatus(adm._id)}
                              disabled={actionLoadingId === adm._id}
                              title={adm.isActive ? "Deactivate account" : "Activate account"}
                              className={`p-1.5 rounded-lg border text-xs transition cursor-pointer ${
                                adm.isActive
                                  ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30"
                                  : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                              }`}
                            >
                              <Power className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteAdmin(adm._id, adm.name)}
                              disabled={actionLoadingId === adm._id}
                              title="Delete administrator"
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs transition cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                            {isPrimary ? "Primary Root" : "Current Session"}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
