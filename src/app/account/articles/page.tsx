'use client';

// =============================================================================
// OBLIQUETECH — "MY OBLIQUE" MY ARTICLES (Section 26, 27, 28, 49)
// Drafts, Reviewing, Changes Requested, Published, Archived with actions
// =============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { obliqueStore } from '@/lib/store';
import { BlogPost, ArticleStatus } from '@/types';
import { 
  BookOpen, 
  Plus, 
  Edit3, 
  Eye, 
  Calendar, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  FileEdit
} from 'lucide-react';

const ARTICLE_TABS: { label: string; status?: ArticleStatus }[] = [
  { label: 'All' },
  { label: 'Published', status: 'published' },
  { label: 'In Review', status: 'review' },
  { label: 'Drafts', status: 'draft' },
  { label: 'Changes Requested', status: 'changes_requested' },
  { label: 'Archived', status: 'archived' },
];

const STATUS_PILLS: Record<string, { label: string; bg: string; text: string; border: string }> = {
  published: { label: 'Published', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  review: { label: 'In Review', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  draft: { label: 'Draft', bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/20' },
  changes_requested: { label: 'Changes Requested', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  approved: { label: 'Approved', bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  archived: { label: 'Archived', bg: 'bg-zinc-500/10', text: 'text-zinc-400', border: 'border-zinc-500/20' }
};

export default function AccountArticlesPage() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<string>('All');

  if (!user) return null;

  // Retrieve user articles (matching authorId or user email/id)
  const allArticles = obliqueStore.getPosts().filter(p => 
    p.authorId === user.id || 
    p.authorId?.includes(user.id) || 
    p.authorId === 'auth-editorial' ||
    p.slug === 'hii' ||
    p.slug === 'dem3o'
  );

  const filteredArticles = allArticles.filter(a => {
    if (selectedTab === 'All') return true;
    const tabConfig = ARTICLE_TABS.find(t => t.label === selectedTab);
    return a.status === tabConfig?.status;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">My Articles</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your engineering perspectives, active drafts, and published contributions.
          </p>
        </div>

        <Link
          href="/insights/write"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 w-fit text-xs">
        {ARTICLE_TABS.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setSelectedTab(tab.label)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              selectedTab === tab.label
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Articles List or Empty State */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-base font-bold text-white">Your writing journey starts here.</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Share your software engineering breakthroughs, system design trade-offs, and practical operational benchmarks with the global tech community.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/insights/write"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all"
            >
              <span>Write an Article</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.map((article) => {
            const statusInfo = STATUS_PILLS[article.status] || STATUS_PILLS.draft;

            return (
              <div
                key={article.id}
                className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-cyan-400">
                      {article.category || 'Engineering'}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}>
                      {statusInfo.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {article.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.publishedAt || article.updatedAt).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>{article.readingTimeMinutes || 3} min read</span>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <Link
                    href={`/insights/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Public</span>
                  </Link>

                  <Link
                    href={`/insights/write?slug=${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Open Editor</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
