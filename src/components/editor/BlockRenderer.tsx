'use client';

import React, { useState } from 'react';
import { 
  EditorBlock, 
  BlockType 
} from '@/types';
import { 
  ChevronUp, 
  ChevronDown, 
  Copy, 
  Trash2, 
  Plus, 
  GripVertical, 
  Sparkles, 
  AlertCircle, 
  Quote, 
  Code, 
  Image as ImageIcon, 
  Table as TableIcon, 
  Minus, 
  Film, 
  Check, 
  CheckSquare, 
  Square, 
  X,
  Upload,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  Loader2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { uploadArticleMedia } from '@/lib/mediaService';

interface BlockRendererProps {
  block: EditorBlock;
  index: number;
  totalBlocks: number;
  onUpdate: (updated: EditorBlock) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onInsertAfter: (index: number) => void;
  onTriggerSlash?: (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>, blockIndex: number) => void;
  articleId?: string;
  authorId?: string;
}

const CODE_LANGUAGES = [
  'typescript',
  'javascript',
  'python',
  'html',
  'css',
  'sql',
  'bash',
  'json',
  'java',
  'cpp',
  'go',
  'rust'
];

export function BlockRenderer({
  block,
  index,
  totalBlocks,
  onUpdate,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  onInsertAfter,
  onTriggerSlash,
  articleId,
  authorId
}: BlockRendererProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (block.content) {
      navigator.clipboard.writeText(block.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so author can re-select same file if desired
    e.target.value = '';

    // 1. Immediate local preview (fast feedback, zero lag)
    const localPreview = URL.createObjectURL(file);
    onUpdate({
      ...block,
      previewUrl: localPreview,
      uploadStatus: 'uploading',
      uploadProgress: 15,
      errorMessage: undefined,
    });

    try {
      // 2. Upload with image optimization and dual-layer persistence
      const result = await uploadArticleMedia(
        file,
        {
          articleId: articleId || 'temp-draft',
          authorId: authorId || 'anonymous-author',
          mediaType: 'content',
          altText: block.imageAlt || 'Article illustration',
          caption: block.imageCaption || '',
        },
        (progress: number) => {
          onUpdate({
            ...block,
            previewUrl: localPreview,
            uploadStatus: 'uploading',
            uploadProgress: Math.max(15, progress),
          });
        }
      );

      if (!result.success || !result.permanentUrl) {
        onUpdate({
          ...block,
          uploadStatus: 'failed',
          errorMessage: result.error || 'Unable to store image.',
        });
        return;
      }

      // 3. Set permanent storage URL and metadata
      onUpdate({
        ...block,
        imageUrl: result.permanentUrl,
        previewUrl: result.permanentUrl,
        uploadStatus: 'uploaded',
        uploadProgress: 100,
        mediaId: result.id,
        storagePath: result.storagePath,
        errorMessage: undefined,
      });
    } catch (err: any) {
      onUpdate({
        ...block,
        uploadStatus: 'failed',
        errorMessage: err?.message || 'Failed to process image.',
      });
    }
  };

  return (
    <div className="group/block relative my-3 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/[0.015] p-3 transition-all duration-200">
      
      {/* Floating Block Controls (Reorder, Duplicate, Delete) */}
      <div className="opacity-0 group-hover/block:opacity-100 transition-opacity absolute -top-3.5 right-4 z-20 flex items-center gap-1 rounded-lg bg-[#181B22] border border-white/15 px-2 py-1 shadow-xl text-slate-400">
        <span className="text-[10px] font-mono text-slate-500 uppercase pr-1.5 border-r border-white/10">
          {block.type.replace('_', ' ')}
        </span>

        <button
          type="button"
          onClick={() => onMoveUp(index)}
          disabled={index === 0}
          className="p-1 hover:text-white disabled:opacity-20 transition-colors"
          title="Move Up"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onMoveDown(index)}
          disabled={index === totalBlocks - 1}
          className="p-1 hover:text-white disabled:opacity-20 transition-colors"
          title="Move Down"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onDuplicate(block.id)}
          className="p-1 hover:text-white transition-colors"
          title="Duplicate Block"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onDelete(block.id)}
          className="p-1 hover:text-rose-400 transition-colors"
          title="Delete Block"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* =========================================================================
          BLOCK 1: PARAGRAPH
          ========================================================================= */}
      {block.type === 'paragraph' && (
        <div className="relative">
          <textarea
            value={block.content}
            onChange={(e) => onUpdate({ ...block, content: e.target.value })}
            onKeyDown={(e) => onTriggerSlash?.(e, index)}
            placeholder="Write your perspective here... (Type '/' for blocks)"
            rows={Math.max(2, Math.min(10, Math.ceil(block.content.length / 70) || 2))}
            style={{ 
              color: block.textColor || '#1E293B',
              backgroundColor: block.highlightColor || 'transparent',
              textAlign: block.align || 'left'
            }}
            className="w-full bg-transparent border-0 resize-none text-base sm:text-lg leading-relaxed focus:outline-none placeholder:text-slate-400 font-normal font-sans"
          />
        </div>
      )}

      {/* =========================================================================
          BLOCK 2: HEADING (H1 - H4)
          ========================================================================= */}
      {block.type === 'heading' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => onUpdate({ ...block, level: lvl as 1 | 2 | 3 | 4 })}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all ${
                  (block.level || 2) === lvl
                    ? 'bg-[#3B82F6] text-white'
                    : 'bg-black/5 text-slate-500 hover:text-slate-900'
                }`}
              >
                H{lvl}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={block.content}
            onChange={(e) => onUpdate({ ...block, content: e.target.value })}
            onKeyDown={(e) => onTriggerSlash?.(e, index)}
            placeholder={`Enter Heading ${block.level || 2}...`}
            className={`w-full bg-transparent border-0 focus:outline-none font-bold text-slate-900 tracking-tight ${
              (block.level || 2) === 1 
                ? 'text-3xl sm:text-4xl' 
                : (block.level || 2) === 2 
                ? 'text-2xl sm:text-3xl' 
                : (block.level || 2) === 3 
                ? 'text-xl sm:text-2xl' 
                : 'text-lg sm:text-xl'
            }`}
          />
        </div>
      )}

      {/* =========================================================================
          BLOCK 3: KEY POINTS (Section 20)
          Distinctive ObliqueTech design with accent cards and bullet points
          ========================================================================= */}
      {block.type === 'key_points' && (
        <div className="rounded-2xl bg-gradient-to-br from-[#1E2530]/5 via-blue-500/[0.03] to-purple-500/[0.03] border-l-4 border-l-[#3B82F6] border-y border-r border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-blue-500/10 text-[#3B82F6]">
                <Sparkles className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={block.content || 'Key Takeaways & Strategic Insights'}
                onChange={(e) => onUpdate({ ...block, content: e.target.value })}
                className="font-bold text-sm sm:text-base text-slate-900 bg-transparent border-0 focus:outline-none"
                placeholder="Key Points Title"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                const updatedItems = [...(block.items || []), 'New key takeaway point...'];
                onUpdate({ ...block, items: updatedItems });
              }}
              className="px-2.5 py-1 rounded-lg bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add Point</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {(block.items || [
              'AI transforms high-volume operational workflows by reducing cycle time.',
              'Data sovereignty and private RAG prevent proprietary intellectual property leaks.',
              'Sustainable software architectures align engineering investment directly with business ROI.'
            ]).map((item, ptIdx) => (
              <div key={ptIdx} className="flex items-start gap-3 group/pt">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6] mt-2 shrink-0 shadow-xs" />
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...(block.items || [])];
                    newItems[ptIdx] = e.target.value;
                    onUpdate({ ...block, items: newItems });
                  }}
                  className="flex-1 bg-transparent border-0 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed focus:outline-none focus:border-b focus:border-blue-500"
                  placeholder="Describe key point..."
                />
                <button
                  type="button"
                  onClick={() => {
                    const newItems = (block.items || []).filter((_, i) => i !== ptIdx);
                    onUpdate({ ...block, items: newItems });
                  }}
                  className="opacity-0 group-hover/pt:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          BLOCK 4: CALLOUT / HIGHLIGHT NOTE (Section 21)
          ========================================================================= */}
      {block.type === 'callout' && (
        <div className={`rounded-2xl border p-5 shadow-sm space-y-3 ${
          block.calloutTone === 'tip'
            ? 'bg-emerald-500/[0.06] border-emerald-500/30 text-emerald-950'
            : block.calloutTone === 'warning'
            ? 'bg-amber-500/[0.06] border-amber-500/30 text-amber-950'
            : block.calloutTone === 'accent'
            ? 'bg-purple-500/[0.06] border-purple-500/30 text-purple-950'
            : 'bg-blue-500/[0.06] border-blue-500/30 text-blue-950'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className={`w-4 h-4 ${
                block.calloutTone === 'tip' ? 'text-emerald-600' :
                block.calloutTone === 'warning' ? 'text-amber-600' :
                block.calloutTone === 'accent' ? 'text-purple-600' :
                'text-[#3B82F6]'
              }`} />
              <input
                type="text"
                value={block.quoteAuthor || 'Important Note'}
                onChange={(e) => onUpdate({ ...block, quoteAuthor: e.target.value })}
                className="font-bold text-xs uppercase tracking-wider bg-transparent border-0 focus:outline-none"
                placeholder="Callout Label"
              />
            </div>

            {/* Tone Selector */}
            <div className="flex items-center gap-1 text-[11px] font-mono">
              {(['info', 'tip', 'warning', 'accent'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => onUpdate({ ...block, calloutTone: t })}
                  className={`px-2 py-0.5 rounded capitalize ${
                    (block.calloutTone || 'info') === t
                      ? 'bg-white shadow-xs font-bold text-slate-950'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={block.content}
            onChange={(e) => onUpdate({ ...block, content: e.target.value })}
            placeholder="Important: Always validate AI-generated architectural assumptions against real-world production constraints."
            rows={2}
            className="w-full bg-transparent border-0 resize-none text-xs sm:text-sm font-medium leading-relaxed focus:outline-none"
          />
        </div>
      )}

      {/* =========================================================================
          BLOCK 5: BLOCKQUOTE (Section 22)
          ========================================================================= */}
      {block.type === 'quote' && (
        <div className="my-2 border-l-4 border-[#C7A45D] pl-5 py-2 space-y-2">
          <div className="relative">
            <Quote className="w-8 h-8 text-[#C7A45D]/20 absolute -top-4 -left-3 pointer-events-none" />
            <textarea
              value={block.content}
              onChange={(e) => onUpdate({ ...block, content: e.target.value })}
              placeholder="Technology should simplify the problem, not complicate it."
              rows={2}
              className="w-full bg-transparent border-0 resize-none text-lg sm:text-xl font-serif italic text-slate-800 leading-relaxed focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>—</span>
            <input
              type="text"
              value={block.quoteAuthor || ''}
              onChange={(e) => onUpdate({ ...block, quoteAuthor: e.target.value })}
              placeholder="Attribution / Author name"
              className="bg-transparent border-0 text-xs font-medium text-slate-600 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          BLOCK 6: IMAGE BLOCK (Sections 23, 24, 25)
          ========================================================================= */}
      {block.type === 'image' && (
        <div className="space-y-3 rounded-2xl border border-slate-200/80 p-4 bg-slate-50/50">
          {/* Controls Bar: Alignment & Size */}
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-2">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-500" />
              <span>Article Image</span>
            </span>

            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-lg bg-slate-200/60 p-0.5">
                {(['left', 'center', 'right', 'full'] as const).map(align => (
                  <button
                    key={align}
                    type="button"
                    onClick={() => onUpdate({ ...block, imageAlignment: align })}
                    className={`px-2 py-0.5 rounded text-[10px] capitalize font-medium ${
                      (block.imageAlignment || 'center') === align
                        ? 'bg-white text-slate-950 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {align}
                  </button>
                ))}
              </div>

              <div className="flex items-center rounded-lg bg-slate-200/60 p-0.5">
                {(['sm', 'md', 'lg', 'full'] as const).map(sz => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => onUpdate({ ...block, imageSize: sz })}
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                      (block.imageSize || 'lg') === sz
                        ? 'bg-white text-slate-950 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Image Canvas / Uploader */}
          {block.imageUrl || block.previewUrl ? (
            <div className={`relative group/img overflow-hidden rounded-xl bg-slate-900 border border-slate-200 ${
              block.imageSize === 'sm' ? 'max-w-xs' :
              block.imageSize === 'md' ? 'max-w-md' :
              block.imageSize === 'full' ? 'w-full' : 'max-w-2xl'
            } ${
              block.imageAlignment === 'center' ? 'mx-auto' :
              block.imageAlignment === 'right' ? 'ml-auto' : 'mr-auto'
            }`}>
              {/* Image element (uses permanent URL or local preview) */}
              <img
                src={block.imageUrl || block.previewUrl}
                alt={block.imageAlt || 'Article illustration'}
                className="w-full h-auto object-cover max-h-96"
              />

              {/* Uploading Overlay */}
              {block.uploadStatus === 'uploading' && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-white space-y-3 z-10">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Optimizing & storing image...</span>
                  </div>
                  <div className="w-48 bg-white/20 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-cyan-400 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${block.uploadProgress || 20}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-300">
                    {block.uploadProgress || 20}% complete
                  </span>
                </div>
              )}

              {/* Failed Overlay */}
              {block.uploadStatus === 'failed' && (
                <div className="absolute inset-0 bg-black/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-white space-y-3 z-10 text-center">
                  <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 max-w-xs">
                    <p className="text-xs font-bold text-rose-300">Upload failed</p>
                    <p className="text-[11px] text-slate-300 line-clamp-2">
                      {block.errorMessage || 'Unable to store file to storage bucket.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <label className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retry</span>
                      <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                    </label>
                    <button
                      type="button"
                      onClick={() => onUpdate({
                        ...block,
                        imageUrl: undefined,
                        previewUrl: undefined,
                        uploadStatus: undefined,
                        errorMessage: undefined
                      })}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              {/* Action Bar when Uploaded / Idle */}
              {block.uploadStatus !== 'uploading' && block.uploadStatus !== 'failed' && (
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity z-10">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-medium flex items-center gap-1 backdrop-blur-xs">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Stored</span>
                  </span>

                  <label className="px-2 py-1 rounded-md bg-black/70 hover:bg-black/90 text-white text-[11px] font-medium cursor-pointer backdrop-blur-xs transition-colors flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>Replace</span>
                    <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                  </label>

                  <button
                    type="button"
                    onClick={() => onUpdate({
                      ...block,
                      imageUrl: undefined,
                      previewUrl: undefined,
                      uploadStatus: undefined,
                      uploadProgress: undefined,
                      mediaId: undefined,
                      storagePath: undefined,
                      errorMessage: undefined
                    })}
                    className="p-1 rounded-md bg-rose-950/80 hover:bg-rose-900 border border-rose-500/30 text-rose-300 text-[11px] backdrop-blur-xs transition-colors"
                    title="Remove Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-slate-300 p-6 text-center space-y-3 bg-white/40">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-800">Add an image to this section</div>
                <div className="text-[11px] text-slate-500">
                  Upload high-res JPG, PNG, WebP (up to 10MB, auto-optimized) or link a URL
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <label className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer shadow-md transition-all flex items-center gap-2">
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Choose Image File</span>
                  <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                </label>
              </div>
            </div>
          )}

          {/* Image URL input & Alt text */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <input
              type="url"
              value={block.imageUrl || ''}
              onChange={(e) => onUpdate({ ...block, imageUrl: e.target.value, previewUrl: e.target.value })}
              placeholder="Or paste external image URL..."
              className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              value={block.imageAlt || ''}
              onChange={(e) => onUpdate({ ...block, imageAlt: e.target.value })}
              placeholder="Alt text (e.g. Workflow telemetry graph)..."
              className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Caption */}
          <input
            type="text"
            value={block.imageCaption || ''}
            onChange={(e) => onUpdate({ ...block, imageCaption: e.target.value })}
            placeholder="Image caption (e.g. Dashboard showing project workflow orchestration)..."
            className="w-full px-3 py-1 rounded bg-transparent border-0 text-center text-xs italic text-slate-500 focus:outline-none"
          />
        </div>
      )}

      {/* =========================================================================
          BLOCK 7: IMAGE GALLERY (Section 26)
          ========================================================================= */}
      {block.type === 'gallery' && (
        <div className="space-y-3 rounded-2xl border border-slate-200 p-4 bg-slate-50/60">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-xs font-semibold text-slate-700">Image Gallery</span>
            <button
              type="button"
              onClick={() => {
                const currentGallery = block.galleryImages || [];
                onUpdate({
                  ...block,
                  galleryImages: [
                    ...currentGallery,
                    { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80', caption: 'Gallery photo', alt: 'Telemetry' }
                  ]
                });
              }}
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add Image</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(block.galleryImages || [
              { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80', caption: 'Dashboard Overview', alt: 'Analytics view' },
              { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80', caption: 'Node Architecture', alt: 'Server topology' }
            ]).map((img, gIdx) => (
              <div key={gIdx} className="relative group/g rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-16/10">
                <img src={img.url} alt={img.alt || ''} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    const nextGallery = (block.galleryImages || []).filter((_, i) => i !== gIdx);
                    onUpdate({ ...block, galleryImages: nextGallery });
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-rose-500 opacity-0 group-hover/g:opacity-100 transition-opacity"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          BLOCK 8: CODE BLOCK (Section 28)
          Language switcher, syntax styling, copy button
          ========================================================================= */}
      {block.type === 'code' && (
        <div className="rounded-2xl bg-[#0C0E12] border border-white/10 shadow-xl overflow-hidden text-white font-mono">
          <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <select
                value={block.codeLanguage || 'typescript'}
                onChange={(e) => onUpdate({ ...block, codeLanguage: e.target.value })}
                className="ml-2 px-2 py-0.5 rounded bg-black/40 border border-white/10 text-slate-300 text-xs focus:outline-none cursor-pointer"
              >
                {CODE_LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 text-slate-300 text-[11px] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <textarea
            value={block.content}
            onChange={(e) => onUpdate({ ...block, content: e.target.value })}
            placeholder="// Enter source code here..."
            rows={Math.max(4, Math.min(15, (block.content.match(/\n/g) || []).length + 2))}
            className="w-full p-4 bg-transparent border-0 resize-y text-xs sm:text-sm text-cyan-300 font-mono focus:outline-none leading-relaxed"
          />
        </div>
      )}

      {/* =========================================================================
          BLOCK 9: TABLE BLOCK (Section 29)
          Dynamic columns & rows, responsive
          ========================================================================= */}
      {block.type === 'table' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <TableIcon className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Data & Comparison Table</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const currentHeaders = block.tableHeaders || ['Feature', 'Legacy System', 'Oblique Architecture'];
                  const currentRows = block.tableRows || [
                    ['Deployment Cadence', 'Monthly batch', 'Continuous automated CI/CD'],
                    ['Query Latency', '850ms', '42ms (Edge RAG)']
                  ];
                  onUpdate({
                    ...block,
                    tableHeaders: currentHeaders,
                    tableRows: [...currentRows, new Array(currentHeaders.length).fill('New data')]
                  });
                }}
                className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium cursor-pointer"
              >
                + Add Row
              </button>
              <button
                type="button"
                onClick={() => {
                  const currentHeaders = block.tableHeaders || ['Feature', 'Option A'];
                  const currentRows = block.tableRows || [['Speed', 'Fast']];
                  const newHeaders = [...currentHeaders, `Column ${currentHeaders.length + 1}`];
                  const newRows = currentRows.map(r => [...r, 'Value']);
                  onUpdate({ ...block, tableHeaders: newHeaders, tableRows: newRows });
                }}
                className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium cursor-pointer"
              >
                + Add Col
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {(block.tableHeaders || ['Feature', 'Legacy Approach', 'Modern Architecture']).map((hdr, hIdx) => (
                    <th key={hIdx} className="p-2.5 font-bold text-slate-900 border-r border-slate-200 last:border-r-0">
                      <input
                        type="text"
                        value={hdr}
                        onChange={(e) => {
                          const newH = [...(block.tableHeaders || ['Feature', 'Legacy Approach', 'Modern Architecture'])];
                          newH[hIdx] = e.target.value;
                          onUpdate({ ...block, tableHeaders: newH });
                        }}
                        className="w-full bg-transparent border-0 font-bold text-slate-900 focus:outline-none"
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(block.tableRows || [
                  ['Deployment Cadence', 'Bi-weekly release gates', 'Automated edge preview per commit'],
                  ['Inference Latency', '1,200ms cold start', '65ms warm cache (Semantic Vector)']
                ]).map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/50">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2 border-r border-slate-100 last:border-r-0">
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => {
                            const newR = (block.tableRows || []).map(r => [...r]);
                            if (newR[rIdx]) {
                              newR[rIdx][cIdx] = e.target.value;
                              onUpdate({ ...block, tableRows: newR });
                            }
                          }}
                          className="w-full bg-transparent border-0 text-slate-700 focus:outline-none"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          BLOCK 10: VIDEO / SAFE EMBED (Section 27)
          ========================================================================= */}
      {block.type === 'video' && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Film className="w-4 h-4 text-purple-600" />
            <span>Video Embed (YouTube or Vimeo)</span>
          </div>

          <input
            type="url"
            value={block.videoUrl || ''}
            onChange={(e) => onUpdate({ ...block, videoUrl: e.target.value })}
            placeholder="Paste YouTube or Vimeo URL (e.g. https://www.youtube.com/watch?v=...)"
            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
          />

          {block.videoUrl && (
            <div className="aspect-16/9 rounded-xl overflow-hidden bg-slate-900 border border-slate-300">
              <iframe
                src={
                  block.videoUrl.includes('youtube.com/watch?v=')
                    ? block.videoUrl.replace('watch?v=', 'embed/')
                    : block.videoUrl.includes('youtu.be/')
                    ? block.videoUrl.replace('youtu.be/', 'www.youtube.com/embed/')
                    : block.videoUrl
                }
                title="Embedded video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          BLOCK 11: SECTION DIVIDER (Section 30)
          ========================================================================= */}
      {block.type === 'divider' && (
        <div className="py-4 flex items-center justify-center gap-3 text-slate-300">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-slate-300" />
          <span className="w-2 h-2 rounded-full bg-[#C7A45D]" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-slate-300" />
        </div>
      )}

      {/* =========================================================================
          BLOCK 12: BULLET & NUMBERED LIST & CHECKLIST (Section 18)
          ========================================================================= */}
      {(block.type === 'bullet_list' || block.type === 'numbered_list') && (
        <div className="space-y-2 py-1 pl-2">
          {(block.items || ['First item in list...', 'Second item...']).map((item, lIdx) => (
            <div key={lIdx} className="flex items-start gap-2.5 group/li">
              <span className="text-xs font-mono font-bold text-slate-500 mt-1 shrink-0">
                {block.type === 'bullet_list' ? '•' : `${lIdx + 1}.`}
              </span>
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newItems = [...(block.items || [])];
                  newItems[lIdx] = e.target.value;
                  onUpdate({ ...block, items: newItems });
                }}
                className="flex-1 bg-transparent border-0 text-sm text-slate-800 focus:outline-none"
                placeholder="List item..."
              />
              <button
                type="button"
                onClick={() => {
                  const newItems = (block.items || []).filter((_, i) => i !== lIdx);
                  onUpdate({ ...block, items: newItems });
                }}
                className="opacity-0 group-hover/li:opacity-100 text-slate-400 hover:text-rose-500 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onUpdate({ ...block, items: [...(block.items || []), 'Next point...'] })}
            className="text-xs text-[#3B82F6] hover:underline font-medium pl-5"
          >
            + Add item
          </button>
        </div>
      )}

      {block.type === 'checklist' && (
        <div className="space-y-2 py-1 pl-2">
          {(block.checkItems || [
            { text: 'Architecture design verified', checked: true },
            { text: 'Penetration audit complete', checked: false }
          ]).map((cItem, cIdx) => (
            <div key={cIdx} className="flex items-center gap-2.5 group/chk">
              <button
                type="button"
                onClick={() => {
                  const newChecks = [...(block.checkItems || [])];
                  newChecks[cIdx] = { ...newChecks[cIdx], checked: !newChecks[cIdx].checked };
                  onUpdate({ ...block, checkItems: newChecks });
                }}
                className="text-[#3B82F6] cursor-pointer"
              >
                {cItem.checked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
              </button>
              <input
                type="text"
                value={cItem.text}
                onChange={(e) => {
                  const newChecks = [...(block.checkItems || [])];
                  newChecks[cIdx] = { ...newChecks[cIdx], text: e.target.value };
                  onUpdate({ ...block, checkItems: newChecks });
                }}
                className={`flex-1 bg-transparent border-0 text-sm focus:outline-none ${
                  cItem.checked ? 'line-through text-slate-400' : 'text-slate-800'
                }`}
                placeholder="Checklist task..."
              />
              <button
                type="button"
                onClick={() => {
                  const newChecks = (block.checkItems || []).filter((_, i) => i !== cIdx);
                  onUpdate({ ...block, checkItems: newChecks });
                }}
                className="opacity-0 group-hover/chk:opacity-100 text-slate-400 hover:text-rose-500 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onUpdate({
              ...block,
              checkItems: [...(block.checkItems || []), { text: 'New item...', checked: false }]
            })}
            className="text-xs text-[#3B82F6] hover:underline font-medium pl-6"
          >
            + Add checklist task
          </button>
        </div>
      )}

      {/* Quick Insert Block (+) below current block on hover */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity z-10">
        <button
          type="button"
          onClick={() => onInsertAfter(index)}
          className="p-1 rounded-full bg-[#181B22] border border-white/20 text-slate-300 hover:text-white hover:scale-110 shadow-lg transition-transform cursor-pointer"
          title="Insert Block Below"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
