'use client';

// =============================================================================
// OBLIQUETECH — "MY OBLIQUE" ACTIVITY TIMELINE (Section 13, 14, 44)
// Chronologically grouped, human-readable actions with accent icons & timestamps
// =============================================================================

import React from 'react';
import { useAuth } from '@/lib/authContext';
import { obliqueStore } from '@/lib/store';
import { UserActivity, UserActivityType } from '@/types';
import { 
  Activity, 
  Clock, 
  LogIn, 
  LogOut, 
  UserCheck, 
  FolderKanban, 
  PhoneCall, 
  MessageSquarePlus, 
  BookOpen, 
  Lock,
  Sparkles,
  Calendar,
  Mail
} from 'lucide-react';

const ACTIVITY_ICONS: Record<UserActivityType, React.ElementType> = {
  login: LogIn,
  logout: LogOut,
  profile_update: UserCheck,
  project_inquiry: FolderKanban,
  inquiry_sent: Mail,
  call_scheduled: PhoneCall,
  feedback_submitted: MessageSquarePlus,
  review_submitted: Sparkles,
  article_draft: BookOpen,
  article_submitted: BookOpen,
  article_published: BookOpen,
  password_changed: Lock
};

const ACTIVITY_COLORS: Record<UserActivityType, { bg: string; text: string; ring: string }> = {
  login: { bg: 'bg-blue-500/10', text: 'text-blue-400', ring: 'ring-blue-500/20' },
  logout: { bg: 'bg-slate-500/10', text: 'text-slate-400', ring: 'ring-slate-500/20' },
  profile_update: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', ring: 'ring-indigo-500/20' },
  project_inquiry: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', ring: 'ring-emerald-500/20' },
  inquiry_sent: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', ring: 'ring-emerald-500/20' },
  call_scheduled: { bg: 'bg-amber-500/10', text: 'text-amber-400', ring: 'ring-amber-500/20' },
  feedback_submitted: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', ring: 'ring-cyan-500/20' },
  review_submitted: { bg: 'bg-purple-500/10', text: 'text-purple-400', ring: 'ring-purple-500/20' },
  article_draft: { bg: 'bg-purple-500/10', text: 'text-purple-400', ring: 'ring-purple-500/20' },
  article_submitted: { bg: 'bg-blue-500/10', text: 'text-blue-400', ring: 'ring-blue-500/20' },
  article_published: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', ring: 'ring-emerald-500/20' },
  password_changed: { bg: 'bg-rose-500/10', text: 'text-rose-400', ring: 'ring-rose-500/20' }
};

// Helper to group activities by friendly relative dates
function groupActivities(activities: UserActivity[]) {
  const groups: Record<string, UserActivity[]> = {};
  const today = new Date().toDateString();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toDateString();

  activities.forEach(act => {
    const actDate = new Date(act.timestamp).toDateString();
    let label = actDate;
    if (actDate === today) label = 'Today';
    else if (actDate === yesterday) label = 'Yesterday';
    else {
      label = new Date(act.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    if (!groups[label]) groups[label] = [];
    groups[label].push(act);
  });

  return groups;
}

export default function AccountActivityPage() {
  const { user } = useAuth();

  if (!user) return null;

  const activities = obliqueStore.getUserActivities(user.id);
  const grouped = groupActivities(activities);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Activity Timeline</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            A secure, chronological record of your project submissions, consultations, and editorial actions.
          </p>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
          <Clock className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No activity logged yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            As you interact with ObliqueTech — starting projects, booking calls, or drafting articles — every milestone will be recorded here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([groupLabel, items]) => (
            <div key={groupLabel} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  {groupLabel}
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <div className="space-y-2.5 pl-2 border-l border-white/10 ml-3">
                {items.map((item) => {
                  const Icon = ACTIVITY_ICONS[item.type] || Activity;
                  const colors = ACTIVITY_COLORS[item.type] || { bg: 'bg-white/5', text: 'text-slate-400', ring: 'ring-white/10' };

                  return (
                    <div 
                      key={item.id}
                      className="relative flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 transition-all -ml-3"
                    >
                      {/* Left Icon Pill */}
                      <span className={`p-2.5 rounded-xl ${colors.bg} ${colors.text} ring-1 ${colors.ring} shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </span>

                      {/* Content */}
                      <div className="flex-1 overflow-hidden space-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-white tracking-tight">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        {item.description && (
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
