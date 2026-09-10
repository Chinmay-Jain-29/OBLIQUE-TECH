'use client';

import React, { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Heading1, 
  Heading2, 
  Heading3, 
  Heading4, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  List, 
  ListOrdered, 
  CheckSquare, 
  Quote, 
  Code, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  RotateCcw, 
  RotateCw, 
  Table as TableIcon, 
  Minus, 
  Sparkles, 
  AlertCircle, 
  Film, 
  Palette, 
  Highlighter, 
  Plus,
  X
} from 'lucide-react';
import { BlockType } from '@/types';

interface EditorToolbarProps {
  onAddBlock: (type: BlockType) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onApplyFormat?: (format: string, value?: string) => void;
}

export function EditorToolbar({
  onAddBlock,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onApplyFormat
}: EditorToolbarProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkNewTab, setLinkNewTab] = useState(true);

  const TEXT_COLORS = [
    { label: 'Default', value: 'inherit', colorClass: 'bg-white' },
    { label: 'Blue', value: '#3B82F6', colorClass: 'bg-blue-500' },
    { label: 'Gold', value: '#D4AF5A', colorClass: 'bg-amber-400' },
    { label: 'Violet', value: '#8B5CF6', colorClass: 'bg-purple-500' },
    { label: 'Emerald', value: '#10B981', colorClass: 'bg-emerald-500' },
    { label: 'Slate', value: '#94A3B8', colorClass: 'bg-slate-400' }
  ];

  const HIGHLIGHT_COLORS = [
    { label: 'None', value: 'transparent', colorClass: 'border border-white/20' },
    { label: 'Yellow', value: 'rgba(234, 179, 8, 0.25)', colorClass: 'bg-yellow-400/40' },
    { label: 'Blue', value: 'rgba(59, 130, 246, 0.25)', colorClass: 'bg-blue-500/40' },
    { label: 'Purple', value: 'rgba(139, 92, 246, 0.25)', colorClass: 'bg-purple-500/40' },
    { label: 'Green', value: 'rgba(16, 185, 129, 0.25)', colorClass: 'bg-emerald-500/40' }
  ];

  const handleInsertLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkUrl.trim()) {
      if (onApplyFormat) {
        onApplyFormat('link', JSON.stringify({ url: linkUrl.trim(), text: linkText.trim() || linkUrl.trim(), newTab: linkNewTab }));
      }
      setShowLinkModal(false);
      setLinkUrl('');
      setLinkText('');
    }
  };

  return (
    <div className="sticky top-0 z-30 w-full bg-[#111317]/95 backdrop-blur-md border-b border-white/10 px-3 py-2 text-white">
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        
        {/* GROUP 1: History */}
        <div className="flex items-center gap-1 shrink-0 border-r border-white/10 pr-2">
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onRedo}
            disabled={!canRedo}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            title="Redo (Ctrl+Shift+Z)"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* GROUP 2: Text Styling */}
        <div className="flex items-center gap-1 shrink-0 border-r border-white/10 pr-2">
          <button
            type="button"
            onClick={() => onApplyFormat?.('bold')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer font-bold"
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onApplyFormat?.('italic')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer italic"
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onApplyFormat?.('underline')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer underline"
            title="Underline (Ctrl+U)"
          >
            <Underline className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onApplyFormat?.('strikethrough')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer line-through"
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </button>

          {/* Text Color Picker Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setShowColorPicker(!showColorPicker); setShowHighlightPicker(false); }}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-0.5"
              title="Text Color"
            >
              <Palette className="w-4 h-4 text-[#3B82F6]" />
            </button>
            {showColorPicker && (
              <div className="absolute top-full left-0 mt-1.5 p-2 rounded-xl bg-[#1A1D24] border border-white/15 shadow-2xl flex items-center gap-1.5 z-40">
                {TEXT_COLORS.map(c => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => { onApplyFormat?.('color', c.value); setShowColorPicker(false); }}
                    className={`w-5 h-5 rounded-full ${c.colorClass} border border-white/20 hover:scale-125 transition-transform cursor-pointer`}
                    title={c.label}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Highlight Color Picker Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setShowHighlightPicker(!showHighlightPicker); setShowColorPicker(false); }}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-0.5"
              title="Highlight Color"
            >
              <Highlighter className="w-4 h-4 text-amber-400" />
            </button>
            {showHighlightPicker && (
              <div className="absolute top-full left-0 mt-1.5 p-2 rounded-xl bg-[#1A1D24] border border-white/15 shadow-2xl flex items-center gap-1.5 z-40">
                {HIGHLIGHT_COLORS.map(c => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => { onApplyFormat?.('highlight', c.value); setShowHighlightPicker(false); }}
                    className={`w-5 h-5 rounded-md ${c.colorClass} hover:scale-125 transition-transform cursor-pointer`}
                    title={c.label}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Link Insertion Trigger */}
          <button
            type="button"
            onClick={() => setShowLinkModal(true)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Insert Link (Ctrl+K)"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* GROUP 3: Quick Block Inserters */}
        <div className="flex items-center gap-1 shrink-0 border-r border-white/10 pr-2">
          <button
            type="button"
            onClick={() => onAddBlock('heading')}
            className="px-2 py-1 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1"
            title="Insert Heading"
          >
            <Heading2 className="w-4 h-4 text-[#3B82F6]" />
            <span>Heading</span>
          </button>
          
          <button
            type="button"
            onClick={() => onAddBlock('key_points')}
            className="px-2 py-1 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1"
            title="Insert Key Points"
          >
            <Sparkles className="w-4 h-4 text-[#C7A45D]" />
            <span>Key Points</span>
          </button>

          <button
            type="button"
            onClick={() => onAddBlock('callout')}
            className="px-2 py-1 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1"
            title="Insert Callout Note"
          >
            <AlertCircle className="w-4 h-4 text-[#8B5CF6]" />
            <span>Callout</span>
          </button>

          <button
            type="button"
            onClick={() => onAddBlock('quote')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Insert Blockquote"
          >
            <Quote className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onAddBlock('code')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Insert Code Block"
          >
            <Code className="w-4 h-4 text-cyan-400" />
          </button>

          <button
            type="button"
            onClick={() => onAddBlock('image')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Insert Image"
          >
            <ImageIcon className="w-4 h-4 text-emerald-400" />
          </button>

          <button
            type="button"
            onClick={() => onAddBlock('table')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Insert Table"
          >
            <TableIcon className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onAddBlock('divider')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Insert Section Divider"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* GROUP 4: Alignment & Lists */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => onApplyFormat?.('align', 'left')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onApplyFormat?.('align', 'center')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onApplyFormat?.('align', 'right')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onAddBlock('bullet_list')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onAddBlock('numbered_list')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onAddBlock('checklist')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Checklist"
          >
            <CheckSquare className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Link Insertion Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-xl bg-[#1A1D24] border border-white/15 p-5 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Insert Hyperlink</span>
              </span>
              <button 
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInsertLink} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-300">Target URL</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6]"
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-300">Display Text (optional)</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Link label"
                  className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={linkNewTab}
                  onChange={(e) => setLinkNewTab(e.target.checked)}
                  className="rounded border-white/20 text-[#3B82F6] focus:ring-0"
                />
                <span>Open link in new browser tab</span>
              </label>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#3B82F6] hover:bg-blue-600 text-xs font-semibold text-white shadow-xs cursor-pointer"
                >
                  Insert Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
