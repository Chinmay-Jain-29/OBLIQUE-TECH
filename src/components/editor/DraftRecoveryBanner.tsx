'use client';

import React from 'react';
import { History, Check, Trash2, X } from 'lucide-react';

interface DraftRecoveryBannerProps {
  savedDate: string;
  onContinue: () => void;
  onDiscard: () => void;
}

export function DraftRecoveryBanner({
  savedDate,
  onContinue,
  onDiscard
}: DraftRecoveryBannerProps) {
  return (
    <div className="w-full bg-gradient-to-r from-blue-500/15 via-purple-500/10 to-amber-500/10 border-b border-blue-500/30 px-4 py-2.5 flex items-center justify-between text-xs text-white animate-fade-in">
      <div className="flex items-center gap-2">
        <span className="p-1 rounded-md bg-blue-500/20 text-[#3B82F6]">
          <History className="w-3.5 h-3.5" />
        </span>
        <span>
          <strong className="text-white">Recovered draft:</strong> We restored your previously autosaved work from{' '}
          <span className="font-mono text-slate-300">{savedDate}</span>.
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onContinue}
          className="px-3 py-1 rounded-lg bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
        >
          <Check className="w-3 h-3" />
          <span>Keep Draft</span>
        </button>
        <button
          type="button"
          onClick={onDiscard}
          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-rose-500/20 hover:text-rose-300 text-slate-400 font-medium flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          <span>Discard</span>
        </button>
      </div>
    </div>
  );
}
