'use client';

import React, { useState } from 'react';
import { BlogPost, AuthorProfile } from '@/types';
import { 
  X, 
  Monitor, 
  Smartphone, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  AlertCircle, 
  Quote, 
  Code, 
  Check, 
  Copy, 
  Globe,
  Tag as TagIcon
} from 'lucide-react';
import { LinkedInIcon, TwitterXIcon, GitHubIcon } from '@/components/ui/Icons';

interface ArticlePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: BlogPost;
  authorProfile?: AuthorProfile;
}

export function ArticlePreviewModal({
  isOpen,
  onClose,
  article,
  authorProfile
}: ArticlePreviewModalProps) {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const author = authorProfile || {
    id: 'auth-default',
    slug: 'author',
    fullName: 'ObliqueTech Contributor',
    title: 'Technology Researcher & Practitioner',
    bio: 'Writing on systems design, engineering trade-offs, and modern computing.',
    expertise: ['Systems Architecture'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    linkedInUrl: 'https://linkedin.com'
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-md text-white animate-fade-in">
      
      {/* Top Preview Bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 bg-[#0A0C10] border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-[#C7A45D] uppercase tracking-wider">
            Live Publication Preview
          </span>
          <span className="hidden sm:inline-block text-xs text-slate-500">•</span>
          <span className="hidden sm:inline-block text-xs text-slate-400 font-mono">
            {article.readingTimeMinutes} min read · {article.wordCount || 0} words
          </span>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center rounded-lg bg-white/5 border border-white/10 p-0.5">
          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              deviceMode === 'desktop'
                ? 'bg-white text-slate-950 shadow-xs font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              deviceMode === 'mobile'
                ? 'bg-white text-slate-950 shadow-xs font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Close Preview"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Preview Viewport */}
      <div className="flex-1 overflow-y-auto py-8 px-4 flex justify-center bg-[#08090B]">
        <div className={`transition-all duration-300 ${
          deviceMode === 'mobile'
            ? 'w-full max-w-[420px] rounded-3xl border-8 border-[#1A1D24] shadow-2xl overflow-hidden bg-[#08090B]'
            : 'w-full max-w-4xl'
        }`}>
          
          {/* Article Header (Surface: Oblique Black - Section 53) */}
          <div className="surface-black pt-8 pb-10 px-4 sm:px-8 border-b border-white/10 space-y-5 text-left">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Insights</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#C7A45D] font-medium">{article.category || 'Technology'}</span>
            </div>

            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-0.5 rounded bg-blue-500/10 text-[#3B82F6] font-semibold border border-blue-500/20">
                {article.category || 'Technology'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readingTimeMinutes} min read</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {article.title || 'Untitled Article'}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
                {article.excerpt}
              </p>
            )}
          </div>

          {/* Featured Cover Image */}
          {article.coverImage && (
            <div className="surface-black px-4 sm:px-8 py-6">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-slate-950 aspect-16/9">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Article Body Content (Surface: Pure White / Paper Editorial) */}
          <div className="surface-white py-12 px-4 sm:px-8 space-y-8 text-slate-900 text-left">
            
            {/* Top Author Attribution Box (Section 54) */}
            <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-slate-900">
                  <img src={author.avatarUrl} alt={author.fullName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{author.fullName}</div>
                  <div className="text-[11px] text-slate-500">{author.title}</div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400">ObliqueTech Editorial</span>
            </div>

            {/* Content Blocks Rendering */}
            <div className="space-y-6">
              {article.blocks && article.blocks.length > 0 ? (
                article.blocks.map((block) => {
                  switch (block.type) {
                    case 'heading':
                      if (block.level === 1) return <h2 key={block.id} className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight pt-4 pb-1">{block.content}</h2>;
                      if (block.level === 2) return <h3 key={block.id} className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight pt-3 pb-1">{block.content}</h3>;
                      if (block.level === 3) return <h4 key={block.id} className="text-xl sm:text-2xl font-bold text-slate-900 pt-2">{block.content}</h4>;
                      return <h5 key={block.id} className="text-lg font-bold text-slate-900">{block.content}</h5>;

                    case 'paragraph':
                      return (
                        <p 
                          key={block.id} 
                          className="text-base sm:text-lg leading-relaxed text-slate-800"
                          style={{ textAlign: block.align || 'left' }}
                        >
                          {block.content}
                        </p>
                      );

                    case 'key_points':
                      return (
                        <div key={block.id} className="my-6 rounded-2xl bg-gradient-to-br from-blue-50/60 to-purple-50/60 border-l-4 border-l-[#3B82F6] border-y border-r border-blue-200/60 p-6 shadow-sm space-y-3">
                          <div className="flex items-center gap-2 font-bold text-base text-slate-900">
                            <Sparkles className="w-4 h-4 text-[#3B82F6]" />
                            <span>{block.content || 'Key Strategic Takeaways'}</span>
                          </div>
                          <ul className="space-y-2 pt-1">
                            {(block.items || []).map((pt, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2 shrink-0" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );

                    case 'callout':
                      return (
                        <div key={block.id} className={`my-6 rounded-2xl border p-5 shadow-xs space-y-2 ${
                          block.calloutTone === 'tip' ? 'bg-emerald-50 border-emerald-300 text-emerald-950' :
                          block.calloutTone === 'warning' ? 'bg-amber-50 border-amber-300 text-amber-950' :
                          block.calloutTone === 'accent' ? 'bg-purple-50 border-purple-300 text-purple-950' :
                          'bg-blue-50 border-blue-300 text-blue-950'
                        }`}>
                          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                            <AlertCircle className="w-4 h-4" />
                            <span>{block.quoteAuthor || 'Important Takeaway'}</span>
                          </div>
                          <p className="text-xs sm:text-sm font-medium leading-relaxed italic">
                            {block.content}
                          </p>
                        </div>
                      );

                    case 'quote':
                      return (
                        <div key={block.id} className="my-6 border-l-4 border-[#C7A45D] pl-6 py-2 space-y-2 bg-amber-50/20">
                          <p className="text-xl sm:text-2xl font-serif italic text-slate-900 leading-relaxed">
                            &ldquo;{block.content}&rdquo;
                          </p>
                          {block.quoteAuthor && (
                            <div className="text-xs text-slate-500 font-medium">
                              — {block.quoteAuthor}
                            </div>
                          )}
                        </div>
                      );

                    case 'code':
                      return (
                        <div key={block.id} className="my-6 rounded-2xl bg-[#0B0D11] border border-white/10 overflow-hidden shadow-xl text-white">
                          <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 text-xs font-mono text-slate-400">
                            <span>{block.codeLanguage || 'typescript'}</span>
                            <button
                              type="button"
                              onClick={() => handleCopyCode(block.id, block.content)}
                              className="flex items-center gap-1 hover:text-white"
                            >
                              {copiedCodeId === block.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedCodeId === block.id ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                          <pre className="p-4 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                            <code>{block.content}</code>
                          </pre>
                        </div>
                      );

                    case 'image':
                      if (!block.imageUrl) return null;
                      return (
                        <div key={block.id} className={`my-6 space-y-2 ${
                          block.imageAlignment === 'center' ? 'mx-auto' :
                          block.imageAlignment === 'right' ? 'ml-auto' : 'mr-auto'
                        } ${
                          block.imageSize === 'sm' ? 'max-w-xs' :
                          block.imageSize === 'md' ? 'max-w-md' : 'max-w-2xl'
                        }`}>
                          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                            <img 
                              src={block.imageUrl} 
                              alt={block.imageAlt || ''} 
                              className="w-full h-auto object-cover"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
                              }}
                            />
                          </div>
                          {block.imageCaption && (
                            <p className="text-center text-xs text-slate-500 italic">
                              {block.imageCaption}
                            </p>
                          )}
                        </div>
                      );

                    case 'gallery':
                      return (
                        <div key={block.id} className="my-6 space-y-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {(block.galleryImages || []).map((img, idx) => (
                              <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 shadow-xs flex flex-col bg-slate-50">
                                <div className="aspect-16/10 overflow-hidden bg-slate-900">
                                  <img 
                                    src={img.url} 
                                    alt={img.alt || ''} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.onerror = null;
                                      e.currentTarget.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
                                    }}
                                  />
                                </div>
                                {img.caption && (
                                  <div className="p-2 text-center text-[11px] text-slate-600 italic bg-white border-t border-slate-100">
                                    {img.caption}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );

                    case 'table':
                      return (
                        <div key={block.id} className="my-6 overflow-x-auto rounded-xl border border-slate-200">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-100 border-b border-slate-200">
                                {(block.tableHeaders || []).map((h, idx) => (
                                  <th key={idx} className="p-3 font-bold text-slate-900 border-r border-slate-200 last:border-r-0">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {(block.tableRows || []).map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-slate-50">
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="p-3 text-slate-700 border-r border-slate-100 last:border-r-0">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );

                    case 'video':
                      if (!block.videoUrl) return null;
                      return (
                        <div key={block.id} className="my-6 aspect-16/9 rounded-2xl overflow-hidden border border-slate-300 shadow-md">
                          <iframe
                            src={
                              block.videoUrl.includes('youtube.com/watch?v=')
                                ? block.videoUrl.replace('watch?v=', 'embed/')
                                : block.videoUrl.includes('youtu.be/')
                                ? block.videoUrl.replace('youtu.be/', 'www.youtube.com/embed/')
                                : block.videoUrl
                            }
                            title="Embedded Video"
                            className="w-full h-full"
                            allowFullScreen
                          />
                        </div>
                      );

                    case 'divider':
                      return (
                        <div key={block.id} className="py-6 flex items-center justify-center gap-3 text-slate-300">
                          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-slate-200" />
                          <span className="w-2 h-2 rounded-full bg-[#C7A45D]" />
                          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-slate-200" />
                        </div>
                      );

                    case 'bullet_list':
                      return (
                        <ul key={block.id} className="space-y-2 pl-4 list-disc text-slate-800 text-sm sm:text-base leading-relaxed">
                          {(block.items || []).map((it, idx) => (
                            <li key={idx}>{it}</li>
                          ))}
                        </ul>
                      );

                    case 'numbered_list':
                      return (
                        <ol key={block.id} className="space-y-2 pl-4 list-decimal text-slate-800 text-sm sm:text-base leading-relaxed font-mono">
                          {(block.items || []).map((it, idx) => (
                            <li key={idx} className="font-sans">{it}</li>
                          ))}
                        </ol>
                      );

                    default:
                      return null;
                  }
                })
              ) : (
                /* Fallback text rendering */
                <p className="text-base text-slate-800 leading-relaxed whitespace-pre-line">
                  {article.content}
                </p>
              )}
            </div>

            {/* Article Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center gap-2">
                <TagIcon className="w-3.5 h-3.5 text-slate-400" />
                {article.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom Full Author Bio Card (Section 54) */}
            <div className="mt-12 p-6 rounded-2xl bg-slate-100 border border-slate-200 space-y-4">
              <div className="text-[11px] font-mono uppercase text-[#3B82F6] font-bold">
                About the Author
              </div>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-300 shrink-0 bg-slate-900">
                  <img src={author.avatarUrl} alt={author.fullName} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">{author.fullName}</h4>
                  <div className="text-xs text-[#C7A45D] font-medium">{author.title}</div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">{author.bio}</p>
                  
                  {author.linkedInUrl && (
                    <div className="pt-2 flex items-center gap-3 text-xs text-[#3B82F6]">
                      <a href={author.linkedInUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                        <LinkedInIcon className="w-3.5 h-3.5" />
                        <span>Connect on LinkedIn</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
