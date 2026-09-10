'use client';

// =============================================================================
// OBLIQUETECH — "MY OBLIQUE" FEEDBACK & REVIEWS (Section 29, 30, 31)
// Authenticated review submission, star rating, project feedback & status
// =============================================================================

import React, { useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { obliqueStore } from '@/lib/store';
import { UserFeedbackItem } from '@/types';
import { 
  MessageSquarePlus, 
  Star, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Clock, 
  Calendar,
  Sparkles
} from 'lucide-react';

export default function AccountFeedbackPage() {
  const { user } = useAuth();
  const [category, setCategory] = useState<'general' | 'project' | 'service' | 'feature_request' | 'bug_report'>('general');
  const [rating, setRating] = useState<number>(5);
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  if (!user) return null;

  const userFeedback = obliqueStore.getUserFeedback(user.id, user.email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setSuccessNotice(null);

    await obliqueStore.submitUserFeedback({
      userId: user.id,
      userName: user.fullName,
      userEmail: user.email,
      category,
      rating,
      message: message.trim()
    });

    setIsSubmitting(false);
    setMessage('');
    setSuccessNotice('Thank you! Your feedback has been securely submitted to our engineering leadership.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">My Feedback & Reviews</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Submit reviews, feature recommendations, and project feedback to our team.
          </p>
        </div>
      </div>

      {successNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Submission Form */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <MessageSquarePlus className="w-4 h-4 text-cyan-400" />
          <span>Submit New Review or Feedback</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Feedback Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-[#0D0F12] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="general">General Feedback</option>
                <option value="project">Project Experience</option>
                <option value="service">Service & Architecture Review</option>
                <option value="feature_request">Feature / Capability Request</option>
                <option value="bug_report">Issue / Bug Report</option>
              </select>
            </div>

            {/* Star Rating */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Rating</label>
              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono text-slate-400 ml-2">{rating} / 5 Stars</span>
              </div>
            </div>
          </div>

          {/* Feedback Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Your Perspective or Review</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Describe your experience working with ObliqueTech, feedback on system engineering, or ideas for innovation..."
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Send Feedback'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Past Feedback History */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Previous Submissions ({userFeedback.length})
        </h3>

        {userFeedback.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-slate-500">
            No feedback entries logged yet.
          </div>
        ) : (
          <div className="space-y-3">
            {userFeedback.map((fb) => (
              <div
                key={fb.id}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-mono capitalize">
                      {fb.category.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: fb.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {fb.message}
                </p>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Status: <strong className="text-emerald-400 capitalize">{fb.status}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
