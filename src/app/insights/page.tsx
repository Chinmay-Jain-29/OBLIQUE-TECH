'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { obliqueStore, INITIAL_POSTS } from '@/lib/store';
import { BlogPost } from '@/types';
import { Clock, Search, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  'All',
  'AI & ML',
  'Web Development',
  'Software',
  'UI/UX',
  'Business Technology',
  'Startups',
  'Student & Career'
];

export default function InsightsPage() {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setPosts(obliqueStore.getPosts());
  }, []);

  const filtered = posts.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = posts.find((p) => p.featured) || posts[0];

  return (
    <div className="flex flex-col">
      {/* Header (Surface: Oblique Black) */}
      <section className="surface-black pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#C7A45D]">Articles & Commentary</span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Oblique Insights.
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-xl leading-relaxed">
            Ideas, technology, and practical thinking.
          </p>
        </div>
      </section>

      {/* Main Content (Surface: Pure White) */}
      <section className="surface-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#0B0B0D] dark:bg-white text-white dark:text-[#0B0B0D] font-semibold'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search insights..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
          </div>

          {/* Featured Article Banner if 'All' and no search */}
          {featured && selectedCategory === 'All' && !searchQuery && (
            <div className="clean-card p-8 sm:p-10 rounded-2xl">
              <div className="max-w-3xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <span className="px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-500/10 text-[#3B82F6] font-semibold">
                    Featured
                  </span>
                  <span>{featured.category}</span>
                  <span>•</span>
                  <span>{featured.readingTimeMinutes} min read</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white hover:text-[#3B82F6] transition-colors">
                  <Link href={`/insights/${featured.slug}`}>
                    {featured.title}
                  </Link>
                </h2>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {featured.excerpt}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/insights/${featured.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <Link
                key={post.id}
                href={`/insights/${post.slug}`}
                className="clean-card p-6 rounded-xl flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="text-[#3B82F6] font-semibold">{post.category}</span>
                    <span>{post.readingTimeMinutes}m read</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#3B82F6] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="text-[#3B82F6] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
