'use client';

import React, { useState } from 'react';
import { BlogPost, ArticleStatus, AuthorProfile } from '@/types';
import { 
  Folder, 
  Tag as TagIcon, 
  Image as ImageIcon, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Plus, 
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Upload
} from 'lucide-react';

interface ArticleSettingsPanelProps {
  article: BlogPost;
  authorProfile?: AuthorProfile;
  onUpdate: (updated: Partial<BlogPost>) => void;
  onOpenCoverUpload: () => void;
}

const CATEGORIES = [
  'AI & ML',
  'Web Development',
  'Software',
  'UI/UX',
  'Business Technology',
  'Startups',
  'SaaS',
  'Digital Transformation',
  'Emerging Technology',
  'Student & Career',
  'Technology Trends'
];

const SUGGESTED_TAGS = [
  'AI',
  'Machine Learning',
  'Automation',
  'Architecture',
  'TypeScript',
  'Next.js',
  'Cloud Systems',
  'Cybersecurity',
  'Data Sovereignty',
  'Product Strategy'
];

export function ArticleSettingsPanel({
  article,
  authorProfile,
  onUpdate,
  onOpenCoverUpload
}: ArticleSettingsPanelProps) {
  const [seoOpen, setSeoOpen] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  const handleAddTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !article.tags.includes(trimmed)) {
      onUpdate({ tags: [...article.tags, trimmed] });
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onUpdate({ tags: article.tags.filter(t => t !== tagToRemove) });
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(newTagInput);
    }
  };

  // Status Badge Colors (Section 45)
  const getStatusBadge = (status: ArticleStatus) => {
    switch (status) {
      case 'draft':
        return { label: 'Draft', color: 'bg-slate-500/15 text-slate-400 border-slate-500/30' };
      case 'review':
        return { label: 'In Review', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' };
      case 'changes_requested':
        return { label: 'Changes Requested', color: 'bg-rose-500/15 text-rose-400 border-rose-500/30' };
      case 'approved':
        return { label: 'Approved', color: 'bg-teal-500/15 text-teal-400 border-teal-500/30' };
      case 'published':
        return { label: 'Published', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' };
      case 'archived':
        return { label: 'Archived', color: 'bg-purple-500/15 text-purple-400 border-purple-500/30' };
      default:
        return { label: 'Draft', color: 'bg-slate-500/15 text-slate-400 border-slate-500/30' };
    }
  };

  const statusBadge = getStatusBadge(article.status);

  // Pre-submission requirements check (Section 46)
  const hasTitle = Boolean(article.title?.trim().length > 3);
  const hasExcerpt = Boolean(article.excerpt?.trim().length > 10);
  const hasCover = Boolean(article.coverImage?.trim().length > 0);
  const hasCategory = Boolean(article.category?.trim().length > 0);
  const hasBody = Boolean((article.blocks && article.blocks.length > 0) || article.content?.trim().length > 30);
  const hasAuthor = Boolean(authorProfile?.isComplete);
  const allReady = hasTitle && hasExcerpt && hasCover && hasCategory && hasBody && hasAuthor;

  return (
    <div className="w-full space-y-6 text-left text-white text-xs">
      
      {/* 1. Article Status & Workflow Notice */}
      <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-300">Article Status</span>
          <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-semibold ${statusBadge.color}`}>
            {statusBadge.label}
          </span>
        </div>

        {article.status === 'changes_requested' && article.reviewFeedback && article.reviewFeedback.length > 0 && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-xs text-rose-400">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Editorial Feedback</span>
            </div>
            {article.reviewFeedback.slice(-1).map((fb, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-[11px] text-slate-300 leading-relaxed italic">
                  &ldquo;{fb.comment}&rdquo;
                </p>
                <div className="text-[10px] text-slate-400 font-mono">
                  — {fb.reviewerName} • {new Date(fb.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-[11px] text-slate-400 leading-relaxed">
          Standard workflow: <strong>Draft → Submit for Review → Approved → Published</strong>.
        </p>
      </div>

      {/* 2. Category Selector (Section 38 - Required) */}
      <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Folder className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Category <span className="text-rose-400">*</span></span>
          </label>
        </div>

        <select
          value={article.category || ''}
          onChange={(e) => onUpdate({ category: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#3B82F6] cursor-pointer"
        >
          <option value="" disabled>Select category (required)...</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* 3. Tags (Section 39) */}
      <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
        <label className="font-semibold text-slate-300 flex items-center gap-1.5">
          <TagIcon className="w-3.5 h-3.5 text-[#C7A45D]" />
          <span>Article Tags</span>
        </label>

        {/* Selected Tags Chips */}
        <div className="flex flex-wrap gap-1.5">
          {article.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#3B82F6] text-[11px] font-medium"
            >
              <span>{tag}</span>
              <X 
                className="w-3 h-3 cursor-pointer hover:text-white" 
                onClick={() => handleRemoveTag(tag)}
              />
            </span>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Add tag (press Enter)..."
            className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6]"
          />
          <button
            type="button"
            onClick={() => handleAddTag(newTagInput)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Suggestions */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400">Suggested:</span>
          <div className="flex flex-wrap gap-1">
            {SUGGESTED_TAGS.filter(t => !article.tags.includes(t)).slice(0, 5).map(sug => (
              <button
                key={sug}
                type="button"
                onClick={() => handleAddTag(sug)}
                className="text-[10px] px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-white/5 transition-colors cursor-pointer"
              >
                + {sug}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Cover Image Settings (Section 40) */}
      <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
        <label className="font-semibold text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cover Image <span className="text-rose-400">*</span></span>
          </span>
          {article.coverImage && (
            <button
              type="button"
              onClick={() => onUpdate({ coverImage: '' })}
              className="text-[10px] text-rose-400 hover:underline"
            >
              Remove
            </button>
          )}
        </label>

        {article.coverImage ? (
          <div className="space-y-2">
            <div className="aspect-16/9 rounded-lg overflow-hidden border border-white/10 bg-slate-950">
              <img src={article.coverImage} alt="Cover preview" className="w-full h-full object-cover" />
            </div>
            <button
              type="button"
              onClick={onOpenCoverUpload}
              className="w-full py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-medium text-slate-300 hover:text-white transition-colors"
            >
              Change Cover Image
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenCoverUpload}
            className="w-full p-4 rounded-lg border-2 border-dashed border-white/15 hover:border-blue-500/50 text-center space-y-1.5 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <Upload className="w-5 h-5 mx-auto text-slate-500" />
            <div className="text-xs font-semibold">Select or Upload Cover</div>
            <div className="text-[10px] text-slate-500">Required for article headers and card previews</div>
          </button>
        )}
      </div>

      {/* 5. SEO Settings (Section 41 & 42 - Expandable) */}
      <div className="rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden">
        <button
          type="button"
          onClick={() => setSeoOpen(!seoOpen)}
          className="w-full p-4 flex items-center justify-between font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Search & Social Metadata</span>
          </span>
          {seoOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {seoOpen && (
          <div className="p-4 pt-0 space-y-3 border-t border-white/5">
            {/* Slug */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-300">URL Slug</label>
              <input
                type="text"
                value={article.slug}
                onChange={(e) => onUpdate({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                placeholder="article-url-slug"
                className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-300 font-mono focus:outline-none focus:border-[#3B82F6]"
              />
              <div className="text-[10px] text-slate-500 font-mono">
                /insights/{article.slug || 'slug'}
              </div>
            </div>

            {/* SEO Title */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <label className="font-medium text-slate-300">SEO Meta Title</label>
                <span className="text-[10px] font-mono text-slate-400">
                  {(article.seoTitle || article.title || '').length}/60
                </span>
              </div>
              <input
                type="text"
                value={article.seoTitle || ''}
                onChange={(e) => onUpdate({ seoTitle: e.target.value })}
                placeholder={article.title || 'Enter custom search title...'}
                maxLength={70}
                className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            {/* SEO Meta Description */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <label className="font-medium text-slate-300">Meta Description</label>
                <span className="text-[10px] font-mono text-slate-400">
                  {(article.seoDescription || article.excerpt || '').length}/160
                </span>
              </div>
              <textarea
                value={article.seoDescription || ''}
                onChange={(e) => onUpdate({ seoDescription: e.target.value })}
                placeholder={article.excerpt || 'Brief description for Google & Twitter search snippets...'}
                rows={2}
                maxLength={170}
                className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6] resize-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* 6. Pre-submission Checklist (Section 46) */}
      <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-300">Ready to Submit?</span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
            allReady ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
          }`}>
            {allReady ? '100% Complete' : 'Missing items'}
          </span>
        </div>

        <div className="space-y-2 text-[11px]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-3.5 h-3.5 ${hasTitle ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span className={hasTitle ? 'text-slate-300' : 'text-slate-500'}>Article Title defined</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-3.5 h-3.5 ${hasExcerpt ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span className={hasExcerpt ? 'text-slate-300' : 'text-slate-500'}>Subtitle / Excerpt summary</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-3.5 h-3.5 ${hasCover ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span className={hasCover ? 'text-slate-300' : 'text-slate-500'}>Cover Image provided</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-3.5 h-3.5 ${hasCategory ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span className={hasCategory ? 'text-slate-300' : 'text-slate-500'}>Category selected</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-3.5 h-3.5 ${hasBody ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span className={hasBody ? 'text-slate-300' : 'text-slate-500'}>Content blocks written</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-3.5 h-3.5 ${hasAuthor ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span className={hasAuthor ? 'text-slate-300' : 'text-slate-500'}>Author profile complete</span>
          </div>
        </div>
      </div>

    </div>
  );
}
