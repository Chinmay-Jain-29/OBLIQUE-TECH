'use client';

// =============================================================================
// OBLIQUETECH — "MY OBLIQUE" SETTINGS (Section 41, 53)
// Password management, notification preferences, email status & safe account deletion
// =============================================================================

import React, { useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { 
  Settings, 
  Lock, 
  Bell, 
  ShieldCheck, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  X
} from 'lucide-react';

export default function AccountSettingsPage() {
  const { user, logout, resetPassword } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordNotice, setPasswordNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Notification toggles
  const [projectAlerts, setProjectAlerts] = useState(true);
  const [callReminders, setCallReminders] = useState(true);
  const [editorialUpdates, setEditorialUpdates] = useState(true);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!user) return null;

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordNotice(null);

    if (newPassword.length < 6) {
      setPasswordNotice({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordNotice({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    setIsUpdatingPassword(true);
    const res = await resetPassword(user.email);
    setIsUpdatingPassword(false);

    if (res.success) {
      setPasswordNotice({ type: 'success', text: 'Password update link sent to your verified email address.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordNotice({ type: 'error', text: res.error || 'Failed to request password update.' });
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') return;
    setIsDeleting(true);

    // Simulate account deletion workflow
    setTimeout(async () => {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      await logout();
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Account & Security Settings</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure authentication credentials, notification channels, and privacy preferences.
          </p>
        </div>
      </div>

      {/* Security & Password Card */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-400" />
            <span>Change Password</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Encrypted Session
          </span>
        </div>

        {passwordNotice && (
          <div className={`p-3.5 rounded-xl text-xs flex items-center gap-2 border ${
            passwordNotice.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' 
              : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
          }`}>
            {passwordNotice.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{passwordNotice.text}</span>
          </div>
        )}

        <form onSubmit={handlePasswordUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="sm:col-span-2 flex justify-end pt-1">
            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isUpdatingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences Card */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Bell className="w-4 h-4 text-amber-400" />
          <span>Notification Preferences</span>
        </h3>

        <div className="space-y-3 divide-y divide-white/5">
          {/* Project Alerts */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs font-semibold text-white">Project Milestones & Scoping Updates</p>
              <p className="text-[11px] text-slate-400">Receive alerts when your project review status changes.</p>
            </div>
            <input
              type="checkbox"
              checked={projectAlerts}
              onChange={(e) => setProjectAlerts(e.target.checked)}
              className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
            />
          </div>

          {/* Call Reminders */}
          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="text-xs font-semibold text-white">Consultation Call Reminders</p>
              <p className="text-[11px] text-slate-400">Reminders before scheduled 30-min architecture meetings.</p>
            </div>
            <input
              type="checkbox"
              checked={callReminders}
              onChange={(e) => setCallReminders(e.target.checked)}
              className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
            />
          </div>

          {/* Editorial Updates */}
          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="text-xs font-semibold text-white">Editorial Studio & Insights Feedback</p>
              <p className="text-[11px] text-slate-400">Notifications when editor reviews or publishes your article.</p>
            </div>
            <input
              type="checkbox"
              checked={editorialUpdates}
              onChange={(e) => setEditorialUpdates(e.target.checked)}
              className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Danger Zone: Delete Account */}
      <div className="p-6 rounded-2xl bg-rose-500/[0.02] border border-rose-500/20 space-y-4">
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            <span>Danger Zone</span>
          </h3>
          <p className="text-xs text-slate-400">
            Request permanent deletion of your ObliqueTech profile, activity history, and associated inquiries.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setDeleteModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-semibold transition-colors cursor-pointer"
        >
          Request Account Deletion
        </button>
      </div>

      {/* Account Deletion Confirmation Modal (Section 41) */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#0D0F12] border border-rose-500/30 rounded-2xl p-6 space-y-4 shadow-2xl">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Are you absolutely sure?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                This action is permanent and cannot be undone. To confirm, please type <strong className="text-rose-400 font-mono">DELETE</strong> below.
              </p>
            </div>

            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="Type DELETE"
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />

            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteConfirmText !== 'DELETE' || isDeleting}
                onClick={handleDeleteAccount}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-500 text-white disabled:opacity-40 shadow-md shadow-rose-600/20 transition-all cursor-pointer"
              >
                {isDeleting ? 'Deleting...' : 'Permanently Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
