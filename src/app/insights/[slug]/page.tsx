import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { INITIAL_POSTS, INITIAL_AUTHORS } from '@/lib/store';
import { Clock, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INITIAL_POSTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = INITIAL_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Article Not Found | Oblique Insights' };

  return {
    title: `${post.title} | Oblique Insights`,
    description: post.excerpt,
  };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = INITIAL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const author = INITIAL_AUTHORS.find((a) => a.id === post.authorId) || INITIAL_AUTHORS[0];
  const relatedPosts = INITIAL_POSTS.filter((p) => p.id !== post.id).slice(0, 2);
  const contentSections = post.content.split('\n\n');

  return (
    <div className="flex flex-col">
      {/* 1. Header (Surface: Oblique Black) */}
      <section className="surface-black pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-3xl mx-auto space-y-6">
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/insights" className="hover:text-white">Insights</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#C7A45D] truncate max-w-xs">{post.category}</span>
          </nav>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="text-[#3B82F6] font-semibold">{post.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readingTimeMinutes} min read</span>
              </span>
              <span>•</span>
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Article Content (Surface: Pure White) */}
      <section className="surface-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Author Box */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white font-bold text-sm flex items-center justify-center">
                {author.fullName.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{author.fullName}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{author.title}</div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-400">ObliqueTech Insights</span>
          </div>

          {/* Article Text Content */}
          <div className="space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {contentSections.map((sec, idx) => {
              if (sec.startsWith('# ')) {
                return (
                  <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white pt-6 pb-2 tracking-tight">
                    {sec.replace('# ', '')}
                  </h2>
                );
              }
              if (sec.startsWith('## ')) {
                return (
                  <h3 key={idx} className="text-xl font-bold text-slate-900 dark:text-white pt-4 pb-1 tracking-tight">
                    {sec.replace('## ', '')}
                  </h3>
                );
              }
              if (sec.startsWith('### ')) {
                return (
                  <h4 key={idx} className="text-base font-bold text-slate-900 dark:text-white pt-2">
                    {sec.replace('### ', '')}
                  </h4>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {sec}
                </p>
              );
            })}
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="pt-12 border-t border-slate-200 dark:border-white/10 space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Related Reading</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/insights/${rp.slug}`}
                    className="clean-card p-5 rounded-xl flex flex-col justify-between group"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-[#3B82F6] font-semibold">{rp.category}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#3B82F6] transition-colors line-clamp-2">
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

      {/* 3. CTA (Surface: Charcoal) */}
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
