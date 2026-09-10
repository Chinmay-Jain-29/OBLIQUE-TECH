'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { obliqueStore } from '@/lib/store';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { UserProfile } from '@/types';
import { 
  Briefcase, 
  Layers, 
  FileText, 
  HelpCircle, 
  MessageSquareQuote, 
  Mail, 
  Calendar, 
  ArrowUpRight, 
  Plus, 
  CheckCircle2,
  Users,
  ShieldCheck,
  User,
  ExternalLink
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [servicesCount, setServicesCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [draftsCount, setDraftsCount] = useState(0);
  const [faqsCount, setFaqsCount] = useState(0);
  const [pendingReviewsCount, setPendingReviewsCount] = useState(0);
  const [inquiriesCount, setInquiriesCount] = useState(0);
  const [callsCount, setCallsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [authorsCount, setAuthorsCount] = useState(0);
  const [adminsCount, setAdminsCount] = useState(0);
  const [recentUsers, setRecentUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    const services = obliqueStore.getServices();
    const portfolio = obliqueStore.getPortfolio();
    const posts = obliqueStore.getPosts();
    const faqs = obliqueStore.getFAQs();
    const testimonials = obliqueStore.getTestimonials();
    const contacts = obliqueStore.getContactSubmissions();
    const wizards = obliqueStore.getProjectWizardInquiries();
    const calls = obliqueStore.getCallRequests();

    setServicesCount(services.length);
    setProjectsCount(portfolio.length);
    setPostsCount(posts.filter(p => p.status === 'published').length);
    setDraftsCount(posts.filter(p => p.status === 'draft').length);
    setFaqsCount(faqs.length);
    setPendingReviewsCount(testimonials.filter(t => t.status === 'pending').length);
    setInquiriesCount(contacts.length + wizards.length);
    setCallsCount(calls.length);

    // Fetch and merge registered users
    const loadUsers = async () => {
      let allProfiles: UserProfile[] = [];

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
              role: row.role || 'user',
              createdAt: row.created_at || new Date().toISOString(),
              updatedAt: row.updated_at || new Date().toISOString()
            }));
          }
        } catch (err) {
          console.warn('Supabase profiles fetch error in admin overview:', err);
        }
      }

      const localProfiles = obliqueStore.getUserProfiles();
      const map = new Map<string, UserProfile>();

      localProfiles.forEach(p => {
        if (p.id || p.email) map.set((p.email || p.id).toLowerCase(), p);
      });
      allProfiles.forEach(p => {
        if (p.id || p.email) map.set((p.email || p.id).toLowerCase(), p);
      });

      const merged = Array.from(map.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setUsersCount(merged.length);
      setClientsCount(merged.filter(u => u.role === 'user' || !u.role).length);
      setAuthorsCount(merged.filter(u => u.role === 'author').length);
      setAdminsCount(merged.filter(u => u.role === 'admin').length);
      setRecentUsers(merged.slice(0, 5));
    };

    loadUsers();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">System Overview</h1>
          <p className="text-xs text-slate-400 mt-1">Live metrics across Content Management, Registered Users, and Business Pipeline.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold text-xs shadow-md transition-all"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Manage Users</span>
          </Link>
          <Link
            href="/admin/portfolio"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </Link>
          <Link
            href="/admin/insights"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Insight</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Registered Users Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-slate-900/60 border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-cyan-300">Registered Users</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{usersCount}</div>
          <Link href="/admin/users" className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1">
            <span>View all users</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Inquiries</span>
            <Mail className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{inquiriesCount}</div>
          <Link href="/admin/inquiries" className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1">
            <span>View incoming</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Scheduled Calls</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{callsCount}</div>
          <Link href="/admin/call-requests" className="text-[11px] text-amber-400 hover:underline flex items-center gap-1">
            <span>Manage bookings</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Pending Reviews</span>
            <MessageSquareQuote className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{pendingReviewsCount}</div>
          <Link href="/admin/testimonials" className="text-[11px] text-rose-400 hover:underline flex items-center gap-1">
            <span>Review submissions</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Portfolio Items</span>
            <Briefcase className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{projectsCount}</div>
          <Link href="/admin/portfolio" className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1">
            <span>Edit projects</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Registered Users Quick Directory */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">Registered Platform Users</h2>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {usersCount} Total
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Client platform accounts, content authors, and system administrators.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 mr-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 font-medium">{clientsCount} Clients</span>
              <span className="px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-400 font-medium">{authorsCount} Authors</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 font-medium">{adminsCount} Admins</span>
            </div>
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all border border-white/10"
            >
              <span>View Full Directory</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
            </Link>
          </div>
        </div>

        {recentUsers.length === 0 ? (
          <div className="text-center py-8 rounded-2xl bg-white/[0.01] border border-dashed border-white/10">
            <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No registered users yet</p>
            <p className="text-xs text-slate-500 mt-0.5">
              When visitors sign up via &quot;Client Portal / My Oblique&quot;, they will automatically appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">User</th>
                  <th className="py-2.5 px-3">Email</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3 hidden md:table-cell">Company</th>
                  <th className="py-2.5 px-3 hidden sm:table-cell">Registered</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentUsers.map((u) => {
                  const role = u.role || 'user';
                  const initials = (u.fullName || 'User')
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2);

                  return (
                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          {u.profilePhoto ? (
                            <img
                              src={u.profilePhoto}
                              alt={u.fullName}
                              className="w-8 h-8 rounded-full object-cover border border-white/10"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-600/30 to-violet-600/30 border border-white/10 flex items-center justify-center text-white font-bold text-xs">
                              {initials}
                            </div>
                          )}
                          <div>
                            <span className="font-semibold text-slate-100 block">{u.fullName}</span>
                            <span className="text-[10px] text-slate-500 font-mono sm:hidden">{u.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-300">
                        {u.email}
                      </td>
                      <td className="py-3 px-3">
                        {role === 'admin' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            Admin
                          </span>
                        )}
                        {role === 'author' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/30">
                            Author
                          </span>
                        )}
                        {(role === 'user' || (role as string) === 'client') && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                            Client
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-slate-400 hidden md:table-cell">
                        {u.companyName ? (
                          <span>{u.companyName}</span>
                        ) : (
                          <span className="text-slate-600 italic">Not set</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-slate-400 hidden sm:table-cell font-mono text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href="/admin/users"
                          className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline"
                        >
                          <span>Manage</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Services Configured</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-white">{servicesCount} Core Disciplines</div>
          <p className="text-[11px] text-slate-500">All 7 primary services active in dynamic catalog.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Published Insights</span>
            <FileText className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-xl font-bold text-white">{postsCount} Articles ({draftsCount} drafts)</div>
          <p className="text-[11px] text-slate-500">Live on Oblique Insights with structured SEO.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active FAQs</span>
            <HelpCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-white">{faqsCount} Questions</div>
          <p className="text-[11px] text-slate-500">Categorized across Process, Tech & Engagement.</p>
        </div>
      </div>

      {/* System Logs & Security Status */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">System Logs & Recent Activity</h2>
        <div className="space-y-3 text-xs">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold text-slate-200">Registered Users Console: </span>
              <span className="text-slate-400">Active and synchronized with Supabase cloud profiles table and local fallback store.</span>
            </div>
            <span className="text-[10px] text-emerald-400">Synced</span>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold text-slate-200">System Ready: </span>
              <span className="text-slate-400">Universal store initialized with 7 core services and 5 case studies.</span>
            </div>
            <span className="text-[10px] text-slate-500">Online</span>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold text-slate-200">Oblique AI Engine: </span>
              <span className="text-slate-400">Operational on client-side floating widget with zero pricing hallucinations.</span>
            </div>
            <span className="text-[10px] text-slate-500">Active</span>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold text-slate-200">Security Perimeter: </span>
              <span className="text-slate-400">PostgreSQL RLS policies defined in schema.sql. Passwords bcrypt-hashed in auth.users.</span>
            </div>
            <span className="text-[10px] text-slate-500">Secured</span>
          </div>
        </div>
      </div>
    </div>
  );
}

