import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { INITIAL_POSTS, INITIAL_AUTHORS } from '@/lib/store';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  User, 
  Calendar, 
  Share2, 
  ChevronRight,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { LinkedInIcon, TwitterXIcon } from '@/components/ui/Icons';

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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
    }
  };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = INITIAL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const author = INITIAL_AUTHORS.find((a) => a.id === post.authorId) || INITIAL_AUTHORS[0];

  // Related posts
  const relatedPosts = INITIAL_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  // Render markdown-like sections simply
  const contentSections = post.content.split('\n\n');

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-300">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/insights" className="hover:text-slate-300">Insights</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-cyan-400 font-medium truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            {post.readingTimeMinutes} min read
          </span>
          <span className="text-xs text-slate-500">•</span>
          <span className="text-xs text-slate-400">
            Published {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-medium">
          {post.excerpt}
        </p>

        {/* Author Byline Box */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-sm">
              OT
            </div>
            <div>
              <div className="text-xs font-bold text-white">{author.fullName}</div>
              <div className="text-[11px] text-slate-400">{author.title}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 hidden sm:inline">Share:</span>
            <button
              aria-label="Share insight on LinkedIn"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
            </button>
            <button
              aria-label="Share insight on Twitter"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <TwitterXIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <article className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed pt-4 border-t border-white/10">
        {contentSections.map((section, idx) => {
          if (section.startsWith('## ')) {
            return (
              <h2 key={idx} className="text-2xl font-bold text-white pt-6 tracking-tight">
                {section.replace('## ', '')}
              </h2>
            );
          }
          if (section.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-lg font-bold text-cyan-300 pt-4">
                {section.replace('### ', '')}
              </h3>
            );
          }
          if (section.startsWith('* ')) {
            const items = section.split('\n');
            return (
              <ul key={idx} className="space-y-2 pl-4 list-disc list-outside text-slate-300">
                {items.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item.replace('* ', '')}
                  </li>
                ))}
              </ul>
            );
          }
          if (section.startsWith('1. ')) {
            const items = section.split('\n');
            return (
              <ol key={idx} className="space-y-2 pl-4 list-decimal list-outside text-slate-300">
                {items.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item.replace(/^\d+\.\s/, '')}
                  </li>
                ))}
              </ol>
            );
          }
          return (
            <p key={idx} className="leading-relaxed">
              {section}
            </p>
          );
        })}
      </article>

      {/* Author Profile Bio Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-white/10 space-y-4 mt-12">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
            OT
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{author.fullName}</h3>
            <p className="text-xs text-cyan-400">{author.title}</p>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {author.bio}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {author.expertise.map((exp, idx) => (
            <span key={idx} className="px-2.5 py-0.5 rounded text-[10px] bg-white/5 text-slate-400 border border-white/5">
              {exp}
            </span>
          ))}
        </div>
      </div>

      {/* Related Insights */}
      {relatedPosts.length > 0 && (
        <div className="pt-12 border-t border-white/10 space-y-6">
          <h2 className="text-xl font-bold text-white">Related Insights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((p) => (
              <div key={p.id} className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 space-y-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300">
                  {p.category}
                </span>
                <h3 className="text-base font-bold text-white line-clamp-2">{p.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{p.excerpt}</p>
                <Link
                  href={`/insights/${p.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:underline pt-2"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back to Insights */}
      <div className="text-center pt-8">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Insights</span>
        </Link>
      </div>
    </div>
  );
}
