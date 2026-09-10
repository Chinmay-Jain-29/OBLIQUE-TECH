'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { obliqueStore, INITIAL_POSTS } from '@/lib/store';
import { useAuth } from '@/lib/authContext';
import { BlogPost } from '@/types';
import { Clock, Search, ArrowRight, PenTool, Sparkles } from 'lucide-react';
import { AuthorAuthModal } from '@/components/auth/AuthorAuthModal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const router = useRouter();
  const { user, openAuthModal } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const load = () => setPosts(obliqueStore.getPosts());
    load();
    window.addEventListener('oblique_posts_updated', load);
    return () => window.removeEventListener('oblique_posts_updated', load);
  }, []);

  const handleStartWriting = () => {
    if (user) {
      router.push('/insights/write');
      return;
    }
    const currentUser = obliqueStore.getCurrentAuthorUser();
    if (!currentUser) {
      openAuthModal({
        title: 'Sign in to write perspectives',
        message: 'Create or sign into your ObliqueTech profile to write, submit, and track engineering articles in your dashboard.'
      });
      return;
    }
    if (!obliqueStore.isAuthorProfileComplete(currentUser.id)) {
      router.push('/author/profile?redirect=/insights/write');
    } else {
      router.push('/insights/write');
    }
  };

  // Reversible GSAP ScrollTrigger Animations (matching portfolio)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.insights-title-inner, .insights-hero-sub', {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // Title mask reveal (reversible on scroll up)
      if (heroRef.current) {
        const titleTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        titleTl
          .fromTo('.insights-title-inner',
            { y: '105%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.75, ease: 'power3.out' }
          )
          .fromTo('.insights-hero-sub',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
            '-=0.25'
          );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Only published articles are shown on the public Insights feed
  const publishedPosts = posts.filter((p) => p.status === 'published');

  const filtered = publishedPosts.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = publishedPosts.find((p) => p.featured) || publishedPosts[0];

  return (
    <div ref={containerRef} className="flex flex-col">
      {/* Header (Surface: Oblique Black) */}
      <section 
        ref={heroRef}
        className="surface-black pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-xs font-mono uppercase tracking-wider text-[#C7A45D]">Articles & Commentary</span>
          
          <div className="text-mask-wrap">
            <h1 className="insights-title-inner text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Oblique Insights.
            </h1>
          </div>

          <p className="insights-hero-sub text-base sm:text-xl text-slate-300 max-w-xl leading-relaxed">
            Ideas, technology, and practical thinking.
          </p>
        </div>
      </section>

      {/* Main Content (Surface: Pure White) */}
      <section className="surface-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-white text-[#0B0B0D] font-semibold'
                      : 'bg-white/5 text-slate-400 hover:text-white'
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
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
          </div>

          {/* Featured Article Banner if 'All' and no search */}
          {featured && selectedCategory === 'All' && !searchQuery && (
            <div className="clean-card rounded-2xl overflow-hidden border border-white/10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0 group">
              <div className="lg:col-span-7 aspect-16/10 lg:aspect-auto overflow-hidden bg-slate-950">
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="px-2.5 py-0.5 rounded bg-blue-500/10 text-[#3B82F6] font-semibold border border-blue-500/20">
                      Featured • {featured.category}
                    </span>
                    <span>•</span>
                    <span>{featured.readingTimeMinutes} min read</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#3B82F6] transition-colors leading-tight">
                    <Link href={`/insights/${featured.slug}`}>
                      {featured.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    {new Date(featured.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <Link
                    href={`/insights/${featured.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Articles Grid (Visual Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => {
              const catColor = post.category.includes('AI')
                ? 'text-purple-400 bg-purple-500/10 border-purple-500/20'
                : post.category.includes('Business')
                ? 'text-amber-500 bg-amber-500/10 border-amber-500/20'
                : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';

              return (
                <Link
                  key={post.id}
                  href={`/insights/${post.slug}`}
                  className="clean-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-white/10 shadow-2xs hover:shadow-lg transition-all"
                >
                  {/* Article Visual Cover Image */}
                  <div className="aspect-16/10 w-full overflow-hidden bg-slate-950">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className={`px-2 py-0.5 rounded border ${catColor}`}>
                          {post.category}
                        </span>
                        <span>{post.readingTimeMinutes}m read</span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-[#3B82F6] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                      <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="text-[#3B82F6] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Write for ObliqueTech Primary Editorial CTA */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#13161C] via-[#0E1014] to-[#08090B] p-8 sm:p-12 shadow-2xl group">
            {/* Angled Oblique visual element backdrop */}
            <div className="absolute top-0 right-0 w-[420px] h-full bg-gradient-to-l from-[#3B82F6]/15 via-[#7C5CFF]/10 to-transparent pointer-events-none transform -skew-x-12 translate-x-20 transition-all duration-700 group-hover:translate-x-10" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#C7A45D]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#3B82F6] text-xs font-mono font-medium">
                  <PenTool className="w-3.5 h-3.5" />
                  <span>ObliqueTech Publishing Platform</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Write for ObliqueTech
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Have an idea worth sharing? Publish your technology insights with the Oblique community.
                </p>
              </div>

              <div className="shrink-0 w-full sm:w-auto">
                <button
                  onClick={handleStartWriting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#7C5CFF] hover:from-blue-600 hover:to-purple-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-300 group/btn cursor-pointer"
                >
                  <span>Start Writing</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1.5 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Authentication Modal */}
      <AuthorAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        redirectUrl="/insights/write"
      />
    </div>
  );
}
