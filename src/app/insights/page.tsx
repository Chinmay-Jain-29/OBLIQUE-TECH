'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { obliqueStore, INITIAL_POSTS, INITIAL_AUTHORS } from '@/lib/store';
import { BlogPost, AuthorProfile } from '@/types';
import { Lightbulb, Clock, Search, ArrowRight, User, Calendar, Tag } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Business Technology',
  'Artificial Intelligence',
  'Career & Student Technology',
  'Web Development',
  'Software Architecture'
];

export default function InsightsPage() {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [authors, setAuthors] = useState<AuthorProfile[]>(INITIAL_AUTHORS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setPosts(obliqueStore.getPosts());
    setAuthors(obliqueStore.getAuthors());
  }, []);

  const filtered = posts.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featured = posts.find((p) => p.featured) || posts[0];

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Thought Leadership</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Oblique Insights.
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Architectural perspectives, applied artificial intelligence insights, and practical software engineering strategy.
        </p>
      </div>

      {/* Featured Article Banner */}
      {featured && selectedCategory === 'All' && !searchQuery && (
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-900/80 border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Featured Article
              </span>
              <span className="text-xs text-slate-400">
                {featured.category}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              <Link href={`/insights/${featured.slug}`} className="hover:text-cyan-300 transition-colors">
                {featured.title}
              </Link>
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              {featured.excerpt}
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {featured.readingTimeMinutes} min read
              </span>
              <span>
                {new Date(featured.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <div className="pt-4">
              <Link
                href={`/insights/${featured.slug}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/50 border border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search insights or tags..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map((post) => (
          <div
            key={post.id}
            className="group flex flex-col justify-between rounded-3xl bg-slate-900/40 border border-white/10 overflow-hidden hover:border-cyan-400/40 transition-all duration-300 shadow-xl hover:-translate-y-1 p-7"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Clock className="w-3 h-3" />
                  {post.readingTimeMinutes}m read
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                <Link href={`/insights/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-1 pt-2">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] text-slate-500 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <Link
                href={`/insights/${post.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              >
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/30 border border-white/10 space-y-2">
          <p className="text-sm font-semibold text-white">No articles found</p>
          <p className="text-xs text-slate-400">Try adjusting your search criteria or category filter.</p>
        </div>
      )}
    </div>
  );
}
