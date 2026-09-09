'use client';

import React, { useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  title: string;
}

export function PortfolioGalleryLightbox({ images, title }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Grid of gallery images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#15171B] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-16/10 overflow-hidden bg-slate-950">
              <img
                src={img}
                alt={`${title} view ${idx + 1}`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
              />
            </div>
            
            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-[#0B0B0D]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium flex items-center gap-2 border border-white/30">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>View Full Resolution</span>
              </div>
            </div>

            {/* Caption bar */}
            <div className="p-3 bg-white/5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>View 0{idx + 1}</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#C7A45D]">Interactive View</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveIdx(null)}
        >
          {/* Top Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
            <span className="text-xs font-mono text-slate-300">
              {title} — Image {activeIdx + 1} of {images.length}
            </span>
            <button
              onClick={() => setActiveIdx(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image Container */}
          <div
            className="relative max-w-6xl max-h-[85vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeIdx]}
              alt={`${title} full size`}
              className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
            />

            {/* Navigation buttons if multiple images */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIdx((activeIdx - 1 + images.length) % images.length);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIdx((activeIdx + 1) % images.length);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
