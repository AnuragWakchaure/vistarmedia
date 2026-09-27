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
  Mail,
  User as UserIcon,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Select,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
} from "@/components/ui";

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
    <div className="space-y-8">
      {/* 2-Column Grid: Change Password & Add Admin */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* CARD 1: CHANGE PASSWORD */}
        <Card>
          <CardHeader className="border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#00B8F0]/10 text-[#00B8F0] border border-[#00B8F0]/20">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-base">Change Password</CardTitle>
                <CardDescription>Update security credentials for your current account.</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-4">
            {pwMessage && (
              <div
                className={`p-3 rounded-lg text-xs font-medium flex items-start gap-2.5 ${
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

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <Input
                label="Current Password"
                name="currentPassword"
                type={showCurrentPw ? "text" : "password"}
                required
                placeholder="Enter current password"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />

              <Input
                label="New Password (min 6 characters)"
                name="newPassword"
                type={showNewPw ? "text" : "password"}
                required
                minLength={6}
                placeholder="Enter new password"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />

              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type={showConfirmPw ? "text" : "password"}
                required
                minLength={6}
                placeholder="Repeat new password"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw(!showConfirmPw)}
                    className="text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />

              <Button
                type="submit"
                loading={pwLoading}
                className="w-full mt-2"
              >
                Save New Password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* CARD 2: ADD NEW ADMINISTRATOR */}
        <Card>
          <CardHeader className="border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <UserPlus className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-base">Add Administrator</CardTitle>
                <CardDescription>Provision access for team members or campaign managers.</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-4">
            {createMessage && (
              <div
                className={`p-3 rounded-lg text-xs font-medium flex items-start gap-2.5 ${
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

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                type="text"
                required
                placeholder="e.g. Rahul Patil"
                leftIcon={<UserIcon className="w-4 h-4" />}
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                required
                placeholder="rahul@vistar.agency"
                leftIcon={<Mail className="w-4 h-4" />}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Initial Password"
                  name="password"
                  type={showCreatePw ? "text" : "password"}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowCreatePw(!showCreatePw)}
                      className="text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      {showCreatePw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />

                <Select label="Role & Permissions" name="role" defaultValue="ADMIN">
                  <option value="ADMIN">Administrator (Standard)</option>
                  <option value="CONTENT_MANAGER">Content Manager</option>
                  <option value="SUPER_ADMIN">Super Administrator</option>
                </Select>
              </div>

              <Button
                type="submit"
                variant="secondary"
                loading={createLoading}
                className="w-full mt-2"
              >
                Create Administrator
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* SECTION 3: ADMINISTRATOR ROSTER TABLE */}
      <Card>
        <CardHeader className="border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#00B8F0]" />
            <CardTitle className="text-base">Active Administrators ({admins.length})</CardTitle>
          </div>
          <CardDescription>
            System users with authorized login access to this administration console.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Administrator</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((adm) => {
                const isSelf = adm.email.toLowerCase() === currentUserEmail?.toLowerCase();
                const isPrimary = adm.email === "admin@vistar.in";

                return (
                  <TableRow key={adm._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/[0.08] text-[#00B8F0] font-bold text-xs flex items-center justify-center border border-white/10 shrink-0">
                          {adm.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-white flex items-center gap-2">
                            <span>{adm.name}</span>
                            {isSelf && (
                              <Badge variant="default" size="sm">
                                You
                              </Badge>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal">{adm.email}</div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={adm.role === "SUPER_ADMIN" ? "default" : adm.role === "ADMIN" ? "info" : "neutral"}
                        size="sm"
                      >
                        <Shield className="w-2.5 h-2.5 mr-1 inline" />
                        {adm.role.replace("_", " ")}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={adm.isActive ? "success" : "destructive"}
                        size="sm"
                        dot
                      >
                        {adm.isActive ? "Active" : "Deactivated"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-slate-400 text-[11px] font-mono">
                      {adm.lastLoginAt ? new Date(adm.lastLoginAt).toLocaleDateString() : "Never"}
                    </TableCell>

                    <TableCell className="text-slate-400 text-[11px] font-mono">
                      {new Date(adm.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-right">
                      {!isSelf && !isPrimary ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleToggleStatus(adm._id)}
                            disabled={actionLoadingId === adm._id}
                            title={adm.isActive ? "Deactivate account" : "Activate account"}
                            className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                              adm.isActive
                                ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/25"
                                : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/25"
                            }`}
                          >
                            <Power className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteAdmin(adm._id, adm.name)}
                            disabled={actionLoadingId === adm._id}
                            title="Delete administrator"
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 text-xs transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-500">
                          {isPrimary ? "Primary Root" : "Current Session"}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
