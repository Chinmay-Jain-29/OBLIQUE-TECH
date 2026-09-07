import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Oblique Decorative Angled Grid */}
      <div className="absolute inset-0 bg-oblique-grid opacity-30 pointer-events-none" />

      <div className="text-center space-y-6 max-w-lg mx-auto relative z-10 p-8 rounded-3xl bg-slate-900/60 border border-white/10 shadow-2xl backdrop-blur-md">
        {/* Angled 404 Display */}
        <div className="inline-block relative">
          <span className="text-7xl sm:text-9xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-violet-500 tracking-tighter">
            404
          </span>
          <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-cyan-400 transform -rotate-3" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Looks like you’ve taken a different angle.
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            The page you are looking for has either evolved into a new architecture or does not exist at this coordinate.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Main Website</span>
          </Link>

          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </div>
  );
}
