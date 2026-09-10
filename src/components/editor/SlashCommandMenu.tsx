'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BlockType } from '@/types';
import { 
  Heading1, 
  Heading2, 
  Sparkles, 
  AlertCircle, 
  Quote, 
  Code, 
  Image as ImageIcon, 
  Table as TableIcon, 
  Minus, 
  List, 
  ListOrdered, 
  CheckSquare, 
  Film,
  Search,
  X
} from 'lucide-react';

interface SlashCommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: BlockType) => void;
  position?: { top: number; left: number };
}

interface CommandItem {
  type: BlockType;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'Text' | 'Callout' | 'Media' | 'Structure';
}

const COMMAND_ITEMS: CommandItem[] = [
  {
    type: 'heading',
    title: 'Heading',
    description: 'Large section heading (H1 - H4)',
    icon: <Heading2 className="w-4 h-4 text-[#3B82F6]" />,
    category: 'Text'
  },
  {
    type: 'key_points',
    title: 'Key Points',
    description: 'Distinctive ObliqueTech accent takeaway card',
    icon: <Sparkles className="w-4 h-4 text-[#C7A45D]" />,
    category: 'Callout'
  },
  {
    type: 'callout',
    title: 'Callout / Note',
    description: 'Important tip, warning, or emphasized note',
    icon: <AlertCircle className="w-4 h-4 text-[#8B5CF6]" />,
    category: 'Callout'
  },
  {
    type: 'quote',
    title: 'Quote',
    description: 'Editorial blockquote with quotation mark styling',
    icon: <Quote className="w-4 h-4 text-slate-300" />,
    category: 'Text'
  },
  {
    type: 'code',
    title: 'Code Block',
    description: 'Syntax-highlighted code with language selection',
    icon: <Code className="w-4 h-4 text-cyan-400" />,
    category: 'Structure'
  },
  {
    type: 'image',
    title: 'Image',
    description: 'Single image with caption, alt text & alignment',
    icon: <ImageIcon className="w-4 h-4 text-emerald-400" />,
    category: 'Media'
  },
  {
    type: 'gallery',
    title: 'Image Gallery',
    description: 'Grid of multiple related article images',
    icon: <ImageIcon className="w-4 h-4 text-teal-400" />,
    category: 'Media'
  },
  {
    type: 'table',
    title: 'Table',
    description: 'Responsive comparison & data table',
    icon: <TableIcon className="w-4 h-4 text-[#3B82F6]" />,
    category: 'Structure'
  },
  {
    type: 'video',
    title: 'Video Embed',
    description: 'Safe YouTube or Vimeo video embed player',
    icon: <Film className="w-4 h-4 text-rose-400" />,
    category: 'Media'
  },
  {
    type: 'bullet_list',
    title: 'Bullet List',
    description: 'Unordered bulleted points list',
    icon: <List className="w-4 h-4 text-slate-300" />,
    category: 'Text'
  },
  {
    type: 'numbered_list',
    title: 'Numbered List',
    description: 'Sequential ordered steps',
    icon: <ListOrdered className="w-4 h-4 text-slate-300" />,
    category: 'Text'
  },
  {
    type: 'checklist',
    title: 'Checklist',
    description: 'Action items with interactive checkboxes',
    icon: <CheckSquare className="w-4 h-4 text-emerald-400" />,
    category: 'Text'
  },
  {
    type: 'divider',
    title: 'Divider',
    description: 'Visual separation line between sections',
    icon: <Minus className="w-4 h-4 text-slate-400" />,
    category: 'Structure'
  }
];

export function SlashCommandMenu({
  isOpen,
  onClose,
  onSelect
}: SlashCommandMenuProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = COMMAND_ITEMS.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        onSelect(filtered[selectedIndex].type);
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs" onClick={onClose}>
      <div 
        className="w-full max-w-sm rounded-2xl bg-[#14171E] border border-white/15 shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="p-3 border-b border-white/10 flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setSelectedIndex(0); }}
            placeholder="Type to filter blocks... (or Esc to close)"
            className="w-full bg-transparent border-0 text-xs text-white placeholder:text-slate-500 focus:outline-none"
          />
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Commands List */}
        <div className="max-h-72 overflow-y-auto p-1.5 divide-y divide-white/5 no-scrollbar">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">
              No matching blocks found for &ldquo;{search}&rdquo;
            </div>
          ) : (
            filtered.map((cmd, idx) => (
              <button
                key={cmd.type + idx}
                type="button"
                onClick={() => { onSelect(cmd.type); onClose(); }}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  selectedIndex === idx
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  {cmd.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold leading-tight truncate">{cmd.title}</div>
                  <div className="text-[11px] text-slate-400 truncate">{cmd.description}</div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
