'use client';

// =============================================================================
// OBLIQUETECH — ADMIN PANEL: REGISTERED USERS MANAGEMENT
// Displays full live registry of registered clients, authors, and admins
// =============================================================================

import React, { useState, useEffect, useMemo } from 'react';
import { obliqueStore } from '@/lib/store';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { UserProfile, UserRole } from '@/types';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  Briefcase, 
  BookOpen, 
  User, 
  Phone, 
  Mail, 
  Globe, 
  Calendar, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  FolderKanban, 
  PhoneCall, 
  ArrowUpRight, 
  RefreshCw, 
  Download,
  AlertCircle,
  X,
  ExternalLink
} from 'lucide-react';
import { LinkedInIcon } from '@/components/ui/Icons';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedCompletion, setSelectedCompletion] = useState<string>('all');
  const [inspectUser, setInspectUser] = useState<UserProfile | null>(null);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<UserProfile | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Load users from Supabase Cloud + Local Store
  const loadUsers = async () => {
    setLoading(true);
    let allProfiles: UserProfile[] = [];

    // 1. Fetch from Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          allProfiles = data.map((row: any) => ({
            id: String(row.id),
            authUserId: row.auth_user_id || String(row.id),
            fullName: row.full_name || 'User',
            email: row.email || '',
            phone: row.phone || '',
            countryCode: row.country_code || '+91',
            companyName: row.company_name || '',
            jobTitle: row.job_title || '',
            bio: row.bio || '',
            country: row.country || '',
            city: row.city || '',
            profilePhoto: row.profile_photo || '',
            linkedin: row.linkedin || '',
            website: row.website || '',
            role: (row.role as UserRole) || 'user',
            createdAt: row.created_at || new Date().toISOString(),
            updatedAt: row.updated_at || new Date().toISOString()
          }));
        }
      } catch (err) {
        console.warn('Supabase profiles fetch error:', err);
      }
    }

    // 2. Merge with local store profiles
    const localProfiles = obliqueStore.getUserProfiles();
    const map = new Map<string, UserProfile>();

    // Supabase cloud profiles take priority, fallback to local
    localProfiles.forEach(p => {
      if (p.id || p.email) map.set((p.email || p.id).toLowerCase(), p);
    });
    allProfiles.forEach(p => {
      if (p.id || p.email) map.set((p.email || p.id).toLowerCase(), p);
    });

    const merged = Array.from(map.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setUsers(merged);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();

    const handleUpdate = () => loadUsers();
    window.addEventListener('oblique_profiles_updated', handleUpdate);
    return () => window.removeEventListener('oblique_profiles_updated', handleUpdate);
  }, []);

  // Filtered & Searched list
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        u.fullName?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.companyName?.toLowerCase().includes(q) ||
        u.jobTitle?.toLowerCase().includes(q) ||
        u.phone?.includes(q)
      );

      const matchesRole = selectedRole === 'all' || u.role === selectedRole;

      const completion = obliqueStore.calculateProfileCompletion(u);
      let matchesCompletion = true;
      if (selectedCompletion === 'complete') matchesCompletion = completion >= 80;
      if (selectedCompletion === 'incomplete') matchesCompletion = completion < 80;

      return matchesSearch && matchesRole && matchesCompletion;
    });
  }, [users, searchQuery, selectedRole, selectedCompletion]);

  // Metric counts
  const totalCount = users.length;
  const clientCount = users.filter(u => u.role === 'user' || !u.role).length;
  const authorCount = users.filter(u => u.role === 'author' || u.role === 'editor').length;
  const adminCount = users.filter(u => u.role === 'admin' || u.role === 'super_admin').length;

  // Handle Role Change
  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    await obliqueStore.updateUserRole(userId, newRole);
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    if (inspectUser?.id === userId) {
      setInspectUser(prev => prev ? { ...prev, role: newRole } : null);
    }
    showToast(`User role updated to ${newRole}.`);
  };

  // Handle Delete User
  const handleDeleteUser = async () => {
    if (!deleteConfirmUser) return;
    await obliqueStore.deleteUserProfile(deleteConfirmUser.id);
    setUsers(prev => prev.filter(u => u.id !== deleteConfirmUser.id));
    if (inspectUser?.id === deleteConfirmUser.id) {
      setInspectUser(null);
    }
    setDeleteConfirmUser(null);
    showToast('User profile deleted successfully.');
  };

  // Export CSV
  const handleExportCSV = () => {
    if (users.length === 0) return;
    const headers = ['Full Name', 'Email', 'Role', 'Company', 'Job Title', 'Phone', 'City', 'Country', 'Completion %', 'Joined Date'];
    const rows = users.map(u => [
      `"${u.fullName || ''}"`,
      `"${u.email || ''}"`,
      `"${u.role || 'user'}"`,
      `"${u.companyName || ''}"`,
      `"${u.jobTitle || ''}"`,
      `"${(u.countryCode || '') + ' ' + (u.phone || '')}"`,
      `"${u.city || ''}"`,
      `"${u.country || ''}"`,
      `"${obliqueStore.calculateProfileCompletion(u)}%"`,
      `"${new Date(u.createdAt).toLocaleDateString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `obliquetech-users-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const showToast = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {statusMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono uppercase tracking-wider">
              Directory & Access
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Registered Users
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Live database registry of client accounts, editorial authors, and administrative staff.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadUsers}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
            title="Refresh database records"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Users</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{totalCount}</p>
          <p className="text-[11px] text-slate-500 font-mono">Platform Accounts</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Clients / Members</span>
            <Briefcase className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">{clientCount}</p>
          <p className="text-[11px] text-slate-500 font-mono">Service Clients</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Authors & Editors</span>
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-purple-400 tracking-tight">{authorCount}</p>
          <p className="text-[11px] text-slate-500 font-mono">Perspective Writers</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Staff & Admins</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-amber-400 tracking-tight">{adminCount}</p>
          <p className="text-[11px] text-slate-500 font-mono">CMS Administrators</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, company, job title, phone..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="user">Client / User</option>
            <option value="author">Author</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>

          {/* Completion Filter */}
          <select
            value={selectedCompletion}
            onChange={(e) => setSelectedCompletion(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Profiles</option>
            <option value="complete">Completed (80%+)</option>
            <option value="incomplete">Incomplete (&lt;80%)</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/30 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                <th className="py-3.5 px-4 font-semibold">User</th>
                <th className="py-3.5 px-4 font-semibold">Role</th>
                <th className="py-3.5 px-4 font-semibold">Organization / Title</th>
                <th className="py-3.5 px-4 font-semibold">Location</th>
                <th className="py-3.5 px-4 font-semibold">Profile Health</th>
                <th className="py-3.5 px-4 font-semibold">Activity</th>
                <th className="py-3.5 px-4 font-semibold">Registered</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                      <span>Loading registered profiles...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 space-y-2">
                    <Users className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="font-medium text-white">No registered users found</p>
                    <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                      {searchQuery ? 'Try clearing or changing your search criteria.' : 'When users sign up on the live website, their profile records appear here in real-time.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const completion = obliqueStore.calculateProfileCompletion(u);
                  const inquiries = obliqueStore.getUserProjectInquiries(u.id);
                  const calls = obliqueStore.getUserCallRequests(u.id);
                  const articles = obliqueStore.getUserArticles(u.id);
                  const totalSubmissions = inquiries.length + calls.length + articles.length;

                  return (
                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                      {/* User Column */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-xs overflow-hidden shrink-0">
                            {u.profilePhoto ? (
                              <img src={u.profilePhoto} alt={u.fullName} className="w-full h-full object-cover" />
                            ) : (
                              (u.fullName || 'U').charAt(0).toUpperCase()
                            )}
                          </div>
                          <div className="overflow-hidden">
                            <p className="font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                              {u.fullName || 'Unnamed User'}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate">{u.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3.5 px-4">
                        <select
                          value={u.role || 'user'}
                          onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border focus:outline-none cursor-pointer ${
                            u.role === 'admin'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              : u.role === 'author' || u.role === 'editor'
                              ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                              : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          }`}
                        >
                          <option value="user" className="bg-slate-900 text-white">Client / User</option>
                          <option value="author" className="bg-slate-900 text-white">Author</option>
                          <option value="editor" className="bg-slate-900 text-white">Editor</option>
                          <option value="admin" className="bg-slate-900 text-white">Admin</option>
                        </select>
                      </td>

                      {/* Organization & Title */}
                      <td className="py-3.5 px-4">
                        <p className="text-white font-medium truncate max-w-[150px]">
                          {u.companyName || <span className="text-slate-500 italic">No company</span>}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate max-w-[150px]">
                          {u.jobTitle || <span className="text-slate-600">—</span>}
                        </p>
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4 text-slate-300">
                        {u.city || u.country ? (
                          <span>{[u.city, u.country].filter(Boolean).join(', ')}</span>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>

                      {/* Profile Health Bar */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1 w-24">
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className={completion >= 80 ? 'text-emerald-400' : 'text-amber-400'}>
                              {completion}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                completion >= 80 ? 'bg-emerald-500' : completion >= 50 ? 'bg-blue-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${completion}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Submissions / Activity */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-300 font-mono">
                          {totalSubmissions} records
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="py-3.5 px-4 text-slate-400 text-[11px] font-mono whitespace-nowrap">
                        {new Date(u.createdAt).toLocaleDateString(undefined, { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => setInspectUser(u)}
                            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Inspect
                          </button>
                          <button
                            onClick={() => setDeleteConfirmUser(u)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            title="Delete profile"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Inspection Modal */}
      {inspectUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-md overflow-hidden">
                  {inspectUser.profilePhoto ? (
                    <img src={inspectUser.profilePhoto} alt={inspectUser.fullName} className="w-full h-full object-cover" />
                  ) : (
                    (inspectUser.fullName || 'U').charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <span>{inspectUser.fullName}</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono uppercase">
                      {inspectUser.role || 'user'}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">{inspectUser.email}</p>
                </div>
              </div>

              <button
                onClick={() => setInspectUser(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Detail Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <p className="text-[10px] font-mono uppercase text-slate-500">Phone</p>
                <p className="text-white font-medium">
                  {inspectUser.phone ? `${inspectUser.countryCode || '+91'} ${inspectUser.phone}` : 'Not provided'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <p className="text-[10px] font-mono uppercase text-slate-500">Company & Title</p>
                <p className="text-white font-medium">
                  {[inspectUser.jobTitle, inspectUser.companyName].filter(Boolean).join(' at ') || 'Not specified'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <p className="text-[10px] font-mono uppercase text-slate-500">Location</p>
                <p className="text-white font-medium">
                  {[inspectUser.city, inspectUser.country].filter(Boolean).join(', ') || 'Not specified'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <p className="text-[10px] font-mono uppercase text-slate-500">Registered On</p>
                <p className="text-white font-medium font-mono">
                  {new Date(inspectUser.createdAt).toLocaleString()}
                </p>
              </div>

              {inspectUser.bio && (
                <div className="sm:col-span-2 p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <p className="text-[10px] font-mono uppercase text-slate-500">Biography</p>
                  <p className="text-slate-300 leading-relaxed">{inspectUser.bio}</p>
                </div>
              )}

              {/* Social Links */}
              <div className="sm:col-span-2 flex items-center gap-3 pt-1">
                {inspectUser.linkedin && (
                  <a
                    href={inspectUser.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors text-xs font-semibold"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5 text-blue-400" />
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                )}
                {inspectUser.website && (
                  <a
                    href={inspectUser.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors text-xs font-semibold"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Personal Website</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                )}
              </div>
            </div>

            {/* Linked Activities & Records */}
            <div className="pt-2 border-t border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                User Activity & Submissions
              </h4>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                  <p className="text-lg font-bold text-emerald-400 font-mono">
                    {obliqueStore.getUserProjectInquiries(inspectUser.id).length}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">Project Inquiries</p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                  <p className="text-lg font-bold text-amber-400 font-mono">
                    {obliqueStore.getUserCallRequests(inspectUser.id).length}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">Calls Booked</p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                  <p className="text-lg font-bold text-purple-400 font-mono">
                    {obliqueStore.getUserArticles(inspectUser.id).length}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">Articles Written</p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setDeleteConfirmUser(inspectUser);
                  setInspectUser(null);
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                Delete Profile
              </button>

              <button
                onClick={() => setInspectUser(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Delete User Profile?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Are you sure you want to remove profile records for <strong className="text-white">{deleteConfirmUser.fullName}</strong> ({deleteConfirmUser.email})? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmUser(null)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
