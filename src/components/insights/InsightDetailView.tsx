'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost, AuthorProfile } from '@/types';
import { obliqueStore, INITIAL_POSTS, INITIAL_AUTHORS } from '@/lib/store';
import { 
  Clock, 
  ChevronRight, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle, 
  BookOpen,
  Share2,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { LinkedInIcon, TwitterXIcon } from '@/components/ui/Icons';

interface InsightDetailViewProps {
  slug: string;
  initialPost: BlogPost | null;
}

export function InsightDetailView({ slug, initialPost }: InsightDetailViewProps) {
  const isInitialValid = Boolean(initialPost && initialPost.slug?.toLowerCase() === slug?.toLowerCase());
  const [post, setPost] = useState<BlogPost | null>(isInitialValid ? initialPost : null);
  const [isLoading, setIsLoading] = useState(!isInitialValid);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 1. Look for exact match in client store (has all author submissions, updates, edits)
    const clientPost = obliqueStore.getPostBySlug(slug);
    if (clientPost && clientPost.slug.toLowerCase() === slug.toLowerCase()) {
      setPost(clientPost);
      setIsLoading(false);
      return;
    }

    // 2. If initialPost's slug strictly matches the URL slug, use it
    if (initialPost && initialPost.slug.toLowerCase() === slug.toLowerCase()) {
      setPost(initialPost);
      setIsLoading(false);
      return;
    }

    // 3. Not found
    setPost(null);
    setIsLoading(false);
  }, [slug, initialPost]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center surface-black pt-32 pb-20">
        <div className="flex flex-col items-center gap-4 text-slate-400">
          <div className="w-8 h-8 rounded-full border-2 border-[#3B82F6] border-t-transparent animate-spin" />
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Retrieving Article...</span>
        </div>
      </div>
    );
  }

  // 2. Not Found State (Fallback with friendly resolution)
  if (!post) {
    const suggestedPosts = INITIAL_POSTS.slice(0, 3);
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center surface-black pt-32 pb-20 px-4 sm:px-6 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-slate-400">
            <BookOpen className="w-7 h-7 text-[#C7A45D]" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Article Coordinate Not Found
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              We couldn&apos;t find an insight matching <code className="px-2 py-0.5 rounded bg-white/10 text-amber-400 font-mono text-xs">{slug}</code>. It may have been relocated or is currently in draft.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/insights"
              className="px-5 py-2.5 rounded-full bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Explore All Insights</span>
            </Link>
            <Link
              href="/insights/write"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-all"
            >
              <span>Write an Article</span>
            </Link>
          </div>

          {/* Recommended Insights */}
          <div className="pt-12 text-left space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Suggested Reading:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {suggestedPosts.map(sp => (
                <Link
                  key={sp.id}
                  href={`/insights/${sp.slug}`}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group flex flex-col justify-between"
                >
                  <h4 className="text-xs font-bold text-white group-hover:text-[#3B82F6] line-clamp-2 leading-snug">
                    {sp.title}
                  </h4>
                  <span className="text-[10px] text-[#3B82F6] pt-2 font-mono flex items-center gap-1">
                    <span>Read</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Resolve Author
  const author: AuthorProfile = (post.authorProfile as AuthorProfile) || 
    obliqueStore.getAuthorById(post.authorId) || 
    INITIAL_AUTHORS.find(a => a.id === post.authorId) || 
    INITIAL_AUTHORS[0];

  const relatedPosts = INITIAL_POSTS.filter(p => p.id !== post.id).slice(0, 2);
  const contentSections = post.content ? post.content.split('\n\n') : [];

  return (
    <div className="flex flex-col">
      {/* 1. Header (Surface: Oblique Black) */}
      <section className="surface-black pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-3xl mx-auto space-y-6">
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/insights" className="hover:text-white transition-colors">Insights</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#C7A45D] truncate max-w-xs">{post.category || 'Technology'}</span>
          </nav>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
              <span className="text-[#3B82F6] font-semibold px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                {post.category || 'Engineering'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readingTimeMinutes || 4} min read</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
              </span>
              {post.status && post.status !== 'published' && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-mono capitalize">
                  {post.status.replace('_', ' ')}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
                {post.excerpt}
              </p>
            )}

            {/* Share / Action Bar */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Article</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Cover Image */}
      {post.coverImage && (
        <section className="surface-black pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-slate-950 aspect-16/9">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* 3. Article Content (Surface: Pure White / Editorial Layout) */}
      <section className="surface-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-3xl mx-auto space-y-10">
          
          {/* Author Attribution Card */}
          <div className="p-4 rounded-xl border border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
              {author.avatarUrl ? (
                <img
                  src={author.avatarUrl}
                  alt={author.fullName}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center">
                  {author.fullName?.charAt(0) || 'O'}
                </div>
              )}
              <div>
                <div className="text-xs font-bold text-white">{author.fullName}</div>
                <div className="text-[11px] text-slate-400">{author.title || 'Contributing Technology Author'}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {author.linkedInUrl && (
                <a
                  href={author.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Author LinkedIn"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <LinkedInIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {author.twitterUrl && (
                <a
                  href={author.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Author Twitter"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <TwitterXIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Oblique Takeaway Highlight Box */}
          {post.excerpt && (
            <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#3B82F6] font-semibold">
                The Oblique Takeaway
              </span>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed italic">
                &ldquo;{post.excerpt}&rdquo;
              </p>
            </div>
          )}

          {/* Article Text Content & Rich Blocks */}
          <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {post.blocks && post.blocks.length > 0 ? (
              post.blocks.map((block) => {
                if (block.type === 'heading') {
                  if (block.level === 1) return <h2 key={block.id} className="text-2xl sm:text-4xl font-bold text-white pt-6 pb-2 tracking-tight">{block.content}</h2>;
                  if (block.level === 2) return <h3 key={block.id} className="text-xl sm:text-3xl font-bold text-white pt-4 pb-2 tracking-tight">{block.content}</h3>;
                  if (block.level === 3) return <h4 key={block.id} className="text-lg sm:text-2xl font-bold text-white pt-3">{block.content}</h4>;
                  return <h5 key={block.id} className="text-base font-bold text-white">{block.content}</h5>;
                }
                if (block.type === 'key_points') {
                  return (
                    <div key={block.id} className="my-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-l-4 border-l-[#3B82F6] border-y border-r border-white/10 p-6 space-y-3">
                      <div className="flex items-center gap-2 font-bold text-base text-white">
                        <Sparkles className="w-4 h-4 text-[#3B82F6]" />
                        <span>{block.content || 'Key Strategic Takeaways'}</span>
                      </div>
                      <ul className="space-y-2 pt-1">
                        {(block.items || []).map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                if (block.type === 'callout') {
                  return (
                    <div key={block.id} className="my-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 space-y-2 text-white">
                      <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#3B82F6]">
                        <AlertCircle className="w-4 h-4" />
                        <span>{block.quoteAuthor || 'Important Takeaway'}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed italic">
                        {block.content}
                      </p>
                    </div>
                  );
                }
                if (block.type === 'quote') {
                  return (
                    <div key={block.id} className="my-6 border-l-4 border-[#C7A45D] pl-6 py-2 space-y-2 bg-white/[0.02]">
                      <p className="text-lg sm:text-xl font-serif italic text-white leading-relaxed">
                        &ldquo;{block.content}&rdquo;
                      </p>
                      {block.quoteAuthor && (
                        <div className="text-xs text-slate-400 font-medium">
                          — {block.quoteAuthor}
                        </div>
                      )}
                    </div>
                  );
                }
                if (block.type === 'code') {
                  return (
                    <div key={block.id} className="my-6 rounded-2xl bg-[#0B0D11] border border-white/10 overflow-hidden text-white font-mono">
                      <div className="px-4 py-2 bg-white/5 border-b border-white/10 text-xs text-slate-400">
                        {block.codeLanguage || 'typescript'}
                      </div>
                      <pre className="p-4 text-xs sm:text-sm text-cyan-300 overflow-x-auto leading-relaxed">
                        <code>{block.content}</code>
                      </pre>
                    </div>
                  );
                }
                if (block.type === 'image' && block.imageUrl) {
                  return (
                    <div key={block.id} className="my-6 space-y-2">
                      <div className="rounded-2xl overflow-hidden border border-white/10">
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
                        <p className="text-center text-xs text-slate-400 italic">
                          {block.imageCaption}
                        </p>
                      )}
                    </div>
                  );
                }
                if (block.type === 'gallery' && block.galleryImages && block.galleryImages.length > 0) {
                  return (
                    <div key={block.id} className="my-8 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {block.galleryImages.map((gImg, gIdx) => (
                          <figure key={gIdx} className="group/g relative rounded-xl overflow-hidden border border-white/10 bg-slate-900 shadow-md">
                            <div className="aspect-16/10 overflow-hidden">
                              <img
                                src={gImg.url}
                                alt={gImg.alt || gImg.caption || 'Article gallery image'}
                                className="w-full h-full object-cover group-hover/g:scale-105 transition-transform duration-300"
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
                                }}
                              />
                            </div>
                            {gImg.caption && (
                              <figcaption className="p-2.5 bg-black/70 backdrop-blur-xs text-[11px] text-slate-300 text-center italic border-t border-white/5">
                                {gImg.caption}
                              </figcaption>
                            )}
                          </figure>
                        ))}
                      </div>
                    </div>
                  );
                }
                if (block.type === 'table') {
                  return (
                    <div key={block.id} className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-white/5">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-white/10 border-b border-white/10">
                            {(block.tableHeaders || []).map((h, idx) => (
                              <th key={idx} className="p-3 font-bold text-white border-r border-white/10 last:border-r-0">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {(block.tableRows || []).map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-3 text-slate-300 border-r border-white/5 last:border-r-0">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                return (
                  <p key={block.id} className="leading-relaxed">
                    {block.content}
                  </p>
                );
              })
            ) : (
              contentSections.map((sec, idx) => {
                if (sec.startsWith('# ')) {
                  return (
                    <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-white pt-6 pb-2 tracking-tight">
                      {sec.replace('# ', '')}
                    </h2>
                  );
                }
                if (sec.startsWith('## ')) {
                  return (
                    <h3 key={idx} className="text-xl font-bold text-white pt-4 pb-1 tracking-tight">
                      {sec.replace('## ', '')}
                    </h3>
                  );
                }
                if (sec.startsWith('### ')) {
                  return (
                    <h4 key={idx} className="text-base font-bold text-white pt-2">
                      {sec.replace('### ', '')}
                    </h4>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed">
                    {sec}
                  </p>
                );
              })
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400 mr-2">Tags:</span>
              {post.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="pt-12 border-t border-white/10 space-y-6">
              <h3 className="text-base font-bold text-white">Related Reading</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/insights/${rp.slug}`}
                    className="clean-card p-5 rounded-xl flex flex-col justify-between group"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-[#3B82F6] font-semibold">{rp.category}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#3B82F6] transition-colors line-clamp-2">
                        {rp.title}
                      </h4>
                    </div>
                    <div className="pt-3 text-xs font-semibold text-[#3B82F6] flex items-center gap-1">
                      <span>Read article</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Bottom Call to Action */}
      <section className="surface-charcoal py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Ready to explore technology from a different perspective?
          </h2>
          <div className="pt-2 flex items-center justify-center gap-4">
            <Link href="/start-project" className="btn-gold text-xs">
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/schedule" className="btn-secondary text-white border-white/30 text-xs">
              <span>Schedule a Call</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
