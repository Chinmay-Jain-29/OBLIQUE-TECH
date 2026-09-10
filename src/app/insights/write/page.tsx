'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { obliqueStore } from '@/lib/store';
import { useAuth } from '@/lib/authContext';
import { BlogPost, EditorBlock, BlockType, AuthorProfile, AuthorUser } from '@/types';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { BlockRenderer } from '@/components/editor/BlockRenderer';
import { SlashCommandMenu } from '@/components/editor/SlashCommandMenu';
import { ArticleSettingsPanel } from '@/components/editor/ArticleSettingsPanel';
import { ArticlePreviewModal } from '@/components/editor/ArticlePreviewModal';
import { DraftRecoveryBanner } from '@/components/editor/DraftRecoveryBanner';
import { 
  ArrowLeft, 
  Eye, 
  Save, 
  Send, 
  Sparkles, 
  Clock, 
  FileText, 
  SlidersHorizontal, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  RotateCw, 
  Plus, 
  Upload, 
  ImageIcon, 
  X,
  Layers,
  Sun,
  Moon,
  Loader2
} from 'lucide-react';
import { uploadArticleMedia } from '@/lib/mediaService';

const INITIAL_BLOCKS: EditorBlock[] = [
  {
    id: 'block-1',
    type: 'paragraph',
    content: 'Start writing your perspectives and architectural insights here. Highlight key trade-offs, practical benchmarks, and operational takeaways...'
  },
  {
    id: 'block-2',
    type: 'key_points',
    content: 'Key Strategic Takeaways',
    items: [
      'Modern systems require modular isolation to prevent failure cascades.',
      'Edge inference reduces transactional roundtrips from seconds to milliseconds.',
      'Pragmatic engineering investments prioritize business outcomes over speculative tooling.'
    ]
  },
  {
    id: 'block-3',
    type: 'callout',
    content: 'Important: Always validate architectural assumptions against real-world production constraints before committing to a system overhaul.',
    calloutTone: 'info',
    quoteAuthor: 'Architectural Principle'
  },
  {
    id: 'block-4',
    type: 'code',
    codeLanguage: 'typescript',
    content: `// Example: Edge stream processor with backpressure handling
export async function processTelemetryBatch(stream: ReadableStream): Promise<void> {
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    await ingestVector(value);
  }
}`
  }
];

export default function EditorialWritingPage() {
  const router = useRouter();

  const { user: authUser } = useAuth();

  // Authentication & Author State
  const [currentUser, setCurrentUser] = useState<AuthorUser | null>(null);
  const [authorProfile, setAuthorProfile] = useState<AuthorProfile | undefined>(undefined);

  // Article State
  const [article, setArticle] = useState<BlogPost>({
    id: `post-${Date.now()}`,
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    blocks: INITIAL_BLOCKS,
    category: '',
    authorId: '',
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',
    readingTimeMinutes: 3,
    wordCount: 140,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Architecture', 'Engineering'],
    featured: false
  });

  // History Stacks for Undo / Redo
  const [history, setHistory] = useState<BlogPost[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isHistoryAction = useRef(false);

  // UI States
  const [autosaveStatus, setAutosaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [lastSavedTime, setLastSavedTime] = useState<string>('just now');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);
  const [coverModalOpen, setCoverModalOpen] = useState(false);
  const [coverInputUrl, setCoverInputUrl] = useState('');
  const [coverUploadStatus, setCoverUploadStatus] = useState<'idle' | 'uploading' | 'failed'>('idle');
  const [coverUploadProgress, setCoverUploadProgress] = useState(0);
  const [coverUploadError, setCoverUploadError] = useState<string | null>(null);
  const [slashMenuOpen, setSlashMenuOpen] = useState(false);
  const [targetSlashBlockIndex, setTargetSlashBlockIndex] = useState<number>(0);
  const [recoveredDate, setRecoveredDate] = useState<string | null>(null);
  const [canvasTheme, setCanvasTheme] = useState<'paper' | 'dark'>('paper');
  const [submitSuccessModal, setSubmitSuccessModal] = useState(false);

  // Title input ref for autofocus / slug auto-generation
  const titleInputRef = useRef<HTMLInputElement>(null);

  // 1. Initialize Author User & Profile, or Redirect
  useEffect(() => {
    if (authUser) {
      const activeUser: AuthorUser = {
        id: authUser.id,
        email: authUser.email,
        name: authUser.fullName || authUser.email.split('@')[0],
        avatarUrl: authUser.profilePhoto || authUser.avatarUrl || '/avatars/author-default.png',
        role: 'author',
        createdAt: authUser.createdAt,
        profileCompleted: true
      };
      setCurrentUser(activeUser);
      setArticle(prev => ({ ...prev, authorId: activeUser.id }));

      let profile = obliqueStore.getAuthorProfile(authUser.id);
      if (!profile) {
        const newProfile: AuthorProfile = {
          id: authUser.id,
          fullName: authUser.fullName,
          slug: authUser.fullName ? authUser.fullName.toLowerCase().replace(/[^a-z0-9]/g, '-') : authUser.email.split('@')[0],
          title: authUser.jobTitle || 'Technical Contributor',
          bio: authUser.bio || 'Technology & engineering contributor at ObliqueTech.',
          avatarUrl: authUser.profilePhoto || authUser.avatarUrl || '/avatars/author-default.png',
          expertise: ['Engineering', 'Architecture'],
          linkedInUrl: authUser.linkedin || authUser.linkedinUrl || 'https://linkedin.com'
        };
        obliqueStore.saveAuthorProfile(newProfile);
        profile = newProfile;
      }
      setAuthorProfile(profile);
    } else {
      const user = obliqueStore.getCurrentAuthorUser();
      if (!user) {
        const demoUser = obliqueStore.loginAuthor('guest.writer@obliquetech.com');
        setCurrentUser(demoUser);
        setArticle(prev => ({ ...prev, authorId: demoUser.id }));
      } else {
        setCurrentUser(user);
        setArticle(prev => ({ ...prev, authorId: user.id }));

        const profile = obliqueStore.getAuthorProfile(user.id);
        setAuthorProfile(profile);

        if (!obliqueStore.isAuthorProfileComplete(user.id)) {
          router.push('/author/profile?redirect=/insights/write');
          return;
        }
      }
    }

    const effectiveId = authUser?.id || obliqueStore.getCurrentAuthorUser()?.id;
    const savedDraft = obliqueStore.getDraftArticle(effectiveId);
    if (savedDraft && savedDraft.title) {
      setRecoveredDate(new Date(savedDraft.updatedAt).toLocaleTimeString());
      setArticle(savedDraft);
    }
  }, [router, authUser]);

  // 3. Dynamic Word Count and Reading Time (Section 34)
  let text = `${article.title || ''} ${article.excerpt || ''} `;
  (article.blocks || []).forEach(b => {
    text += `${b.content || ''} `;
    if (b.items) text += b.items.join(' ') + ' ';
  });
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // 4. Autosave Mechanism (Section 35)
  useEffect(() => {
    if (!hasUnsavedChanges) return;

    setAutosaveStatus('saving');
    const timer = setTimeout(() => {
      obliqueStore.saveDraftArticle({
        ...article,
        wordCount,
        readingTimeMinutes
      }, currentUser?.id);
      setAutosaveStatus('saved');
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setHasUnsavedChanges(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [article, hasUnsavedChanges, currentUser, wordCount, readingTimeMinutes]);

  // 5. Unsaved Changes Protection (Section 62)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes.';
        return 'You have unsaved changes.';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // 6. Push to Undo History
  const pushHistory = useCallback((newArticleState: BlogPost) => {
    if (isHistoryAction.current) {
      isHistoryAction.current = false;
      return;
    }
    setHistory(prev => {
      const next = prev.slice(0, historyIndex + 1);
      return [...next, newArticleState];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const handleUpdateArticle = (updatedFields: Partial<BlogPost>) => {
    setArticle(prev => {
      const updated = { ...prev, ...updatedFields };
      // Auto-suggest slug if title is updated and slug wasn't manually set (Section 42)
      if (updatedFields.title !== undefined && (!prev.slug || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))) {
        updated.slug = updatedFields.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      pushHistory(updated);
      return updated;
    });
    setHasUnsavedChanges(true);
  };

  // Undo & Redo (Section 32)
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      isHistoryAction.current = true;
      const prevArticle = history[historyIndex - 1];
      setHistoryIndex(prev => prev - 1);
      setArticle(prevArticle);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isHistoryAction.current = true;
      const nextArticle = history[historyIndex + 1];
      setHistoryIndex(prev => prev + 1);
      setArticle(nextArticle);
    }
  }, [history, historyIndex]);

  // Save Draft Action (Section 36)
  const handleSaveDraft = useCallback(() => {
    obliqueStore.saveDraftArticle({
      ...article,
      wordCount,
      readingTimeMinutes
    }, currentUser?.id);
    setAutosaveStatus('saved');
    setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setHasUnsavedChanges(false);
  }, [article, wordCount, readingTimeMinutes, currentUser]);

  // Keyboard Shortcuts (Section 56)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
        e.preventDefault();
        handleRedo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveDraft();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, handleSaveDraft]);

  // Block Manipulations
  const handleAddBlock = (type: BlockType, insertIndex?: number) => {
    const newBlock: EditorBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      content: type === 'heading' ? 'New Section Heading' : '',
      level: type === 'heading' ? 2 : undefined,
      items: type === 'key_points' ? ['First key point', 'Second key point'] : type === 'bullet_list' || type === 'numbered_list' ? ['List item'] : undefined,
      checkItems: type === 'checklist' ? [{ text: 'Actionable item', checked: false }] : undefined,
      calloutTone: type === 'callout' ? 'info' : undefined,
      quoteAuthor: type === 'callout' ? 'Important Note' : undefined
    };

    const currentBlocks = [...(article.blocks || [])];
    if (insertIndex !== undefined && insertIndex >= 0) {
      currentBlocks.splice(insertIndex + 1, 0, newBlock);
    } else {
      currentBlocks.push(newBlock);
    }

    handleUpdateArticle({ blocks: currentBlocks });
  };

  const handleUpdateBlock = (updatedBlock: EditorBlock) => {
    const nextBlocks = (article.blocks || []).map(b => b.id === updatedBlock.id ? updatedBlock : b);
    handleUpdateArticle({ blocks: nextBlocks });

    // Immediate persistence when an image finishes uploading to prevent loss on reload
    if (updatedBlock.type === 'image' && updatedBlock.uploadStatus === 'uploaded' && updatedBlock.imageUrl) {
      obliqueStore.saveDraftArticle({
        ...article,
        blocks: nextBlocks,
        wordCount,
        readingTimeMinutes
      }, currentUser?.id);
      setAutosaveStatus('saved');
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setHasUnsavedChanges(false);
    }
  };

  const handleCoverFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    setCoverUploadStatus('uploading');
    setCoverUploadProgress(20);
    setCoverUploadError(null);

    try {
      const res = await uploadArticleMedia(
        file,
        {
          articleId: article.id,
          authorId: currentUser?.id || 'anonymous-author',
          mediaType: 'cover',
          altText: `${article.title || 'Article'} Cover Image`,
        },
        (progress: number) => setCoverUploadProgress(Math.max(20, progress))
      );

      if (!res.success || !res.permanentUrl) {
        setCoverUploadStatus('failed');
        setCoverUploadError(res.error || 'Unable to store cover image.');
        return;
      }

      handleUpdateArticle({
        coverImage: res.permanentUrl,
        coverMediaId: res.id,
        coverStoragePath: res.storagePath,
      });

      // Instantly persist draft with new cover image
      obliqueStore.saveDraftArticle({
        ...article,
        coverImage: res.permanentUrl,
        coverMediaId: res.id,
        coverStoragePath: res.storagePath,
        wordCount,
        readingTimeMinutes
      }, currentUser?.id);
      setAutosaveStatus('saved');
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setHasUnsavedChanges(false);

      setCoverUploadStatus('idle');
      setCoverModalOpen(false);
    } catch (err: any) {
      setCoverUploadStatus('failed');
      setCoverUploadError(err?.message || 'Failed to upload cover image.');
    }
  };

  const handleDeleteBlock = (id: string) => {
    const nextBlocks = (article.blocks || []).filter(b => b.id !== id);
    handleUpdateArticle({ blocks: nextBlocks });
  };

  const handleDuplicateBlock = (id: string) => {
    const idx = (article.blocks || []).findIndex(b => b.id === id);
    if (idx >= 0) {
      const original = (article.blocks || [])[idx];
      const clone: EditorBlock = {
        ...original,
        id: `block-${Date.now()}`
      };
      const nextBlocks = [...(article.blocks || [])];
      nextBlocks.splice(idx + 1, 0, clone);
      handleUpdateArticle({ blocks: nextBlocks });
    }
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const nextBlocks = [...(article.blocks || [])];
    const temp = nextBlocks[index - 1];
    nextBlocks[index - 1] = nextBlocks[index];
    nextBlocks[index] = temp;
    handleUpdateArticle({ blocks: nextBlocks });
  };

  const handleMoveDown = (index: number) => {
    const currentBlocks = article.blocks || [];
    if (index >= currentBlocks.length - 1) return;
    const nextBlocks = [...currentBlocks];
    const temp = nextBlocks[index + 1];
    nextBlocks[index + 1] = nextBlocks[index];
    nextBlocks[index] = temp;
    handleUpdateArticle({ blocks: nextBlocks });
  };

  // Slash Command Trigger (Section 64 & 65)
  const handleTriggerSlash = (e: React.KeyboardEvent, blockIndex: number) => {
    if (e.key === '/') {
      setTargetSlashBlockIndex(blockIndex);
      setSlashMenuOpen(true);
    }
  };


  // Submit for Review Action (Section 43 & 46)
  const handleSubmitForReview = () => {
    // Validate required fields (Section 46)
    if (!article.title?.trim() || article.title.trim().length < 4) {
      alert('Please enter a clear article title before submitting for review.');
      titleInputRef.current?.focus();
      return;
    }
    if (!article.excerpt?.trim() || article.excerpt.trim().length < 10) {
      alert('Please add a short excerpt/summary of what your article is about.');
      return;
    }
    if (!article.coverImage?.trim()) {
      alert('Please upload or select a cover image for the article.');
      setCoverModalOpen(true);
      return;
    }
    if (!article.category?.trim()) {
      alert('Please choose an article category in the settings panel.');
      setSettingsDrawerOpen(true);
      return;
    }
    if (!article.blocks || article.blocks.length === 0) {
      alert('Please write article content before submitting.');
      return;
    }

    // Submit to store
    const submitted = obliqueStore.submitArticleForReview(article);
    setArticle(submitted);
    setHasUnsavedChanges(false);

    if (authUser) {
      obliqueStore.logUserActivity(
        authUser.id,
        'article_submitted',
        'Submitted Article for Review',
        `Article "${article.title}" submitted to editorial review.`
      );
    }

    setSubmitSuccessModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0C10] text-white selection:bg-[#3B82F6] selection:text-white">
      
      {/* 1. Recovered Draft Banner (Section 63) */}
      {recoveredDate && (
        <DraftRecoveryBanner
          savedDate={recoveredDate}
          onContinue={() => setRecoveredDate(null)}
          onDiscard={() => {
            obliqueStore.clearDraftArticle(currentUser?.id);
            setRecoveredDate(null);
            setArticle(prev => ({
              ...prev,
              title: '',
              excerpt: '',
              blocks: INITIAL_BLOCKS
            }));
          }}
        />
      )}

      {/* 2. Top Header Bar (Section 10 Layout) */}
      <header className="sticky top-0 z-40 bg-[#0E1015]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Back & Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href="/insights"
            onClick={(e) => {
              if (hasUnsavedChanges && !confirm('You have unsaved changes. Leave anyway?')) {
                e.preventDefault();
              }
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 text-xs font-medium"
            title="Return to Insights"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Insights</span>
          </Link>

          <span className="text-slate-600">/</span>

          <span className="text-xs font-bold text-white truncate max-w-[140px] sm:max-w-xs">
            {article.title || 'Untitled Perspective'}
          </span>

          {/* Autosave Status Indicator (Section 35) */}
          <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 text-[11px] font-mono text-slate-400 border border-white/5">
            {autosaveStatus === 'saving' ? (
              <span className="text-amber-400">Saving...</span>
            ) : (
              <span className="text-slate-400">Saved {lastSavedTime}</span>
            )}
          </span>
        </div>

        {/* Center: Dynamic Words & Read Time (Section 34) */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
          <span>{article.wordCount} words</span>
          <span>·</span>
          <span>{article.readingTimeMinutes} min read</span>
        </div>

        {/* Right: Actions (Theme, Preview, Save Draft, Submit) */}
        <div className="flex items-center gap-2">
          {/* Canvas Theme Toggle (Light Paper vs Dark Studio) */}
          <button
            type="button"
            onClick={() => setCanvasTheme(canvasTheme === 'paper' ? 'dark' : 'paper')}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title={canvasTheme === 'paper' ? 'Switch to Sleek Dark Canvas' : 'Switch to Calm Paper Canvas'}
          >
            {canvasTheme === 'paper' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Preview Button (Section 37) */}
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
            title="Preview Article"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          {/* Save Draft (Section 36) */}
          <button
            type="button"
            onClick={handleSaveDraft}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/5 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Save as Draft"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save Draft</span>
          </button>

          {/* Submit for Review (Section 43) */}
          <button
            type="button"
            onClick={handleSubmitForReview}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#7C5CFF] hover:from-blue-600 hover:to-purple-600 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
            title="Submit for Review"
          >
            <span>Submit for Review</span>
            <Send className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Settings Drawer Toggle */}
          <button
            type="button"
            onClick={() => setSettingsDrawerOpen(!settingsDrawerOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-white/10"
            title="Article Settings"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 3. Three-Pane Studio Layout (Desktop) / Canvas First (Mobile) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANE: Outline, Stats & History Tools (Section 10) */}
        <aside className="hidden xl:flex flex-col w-64 border-r border-white/10 bg-[#0C0E13] p-4 shrink-0 overflow-y-auto space-y-6">
          
          {/* Document Telemetry Card */}
          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
              Article Statistics
            </span>
            <div className="grid grid-cols-2 gap-2 text-left">
              <div>
                <div className="text-base font-bold text-white">{article.wordCount}</div>
                <div className="text-[10px] text-slate-500">Words</div>
              </div>
              <div>
                <div className="text-base font-bold text-white">{article.readingTimeMinutes} min</div>
                <div className="text-[10px] text-slate-500">Read Time</div>
              </div>
              <div>
                <div className="text-base font-bold text-white">{(article.blocks || []).length}</div>
                <div className="text-[10px] text-slate-500">Blocks</div>
              </div>
              <div>
                <div className="text-base font-bold text-[#3B82F6]">
                  {article.category ? '100%' : '50%'}
                </div>
                <div className="text-[10px] text-slate-500">Metadata</div>
              </div>
            </div>
          </div>

          {/* Document Outline / Navigator */}
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
              <Layers className="w-3 h-3" />
              <span>Document Outline</span>
            </span>
            <div className="space-y-1">
              <div className="text-xs font-semibold text-white truncate py-1 px-2 rounded bg-white/5">
                {article.title || 'Untitled Title'}
              </div>
              {(article.blocks || []).filter(b => b.type === 'heading').map((hb, hIdx) => (
                <div 
                  key={hIdx}
                  className="text-[11px] text-slate-400 hover:text-white py-1 px-2 rounded hover:bg-white/5 truncate cursor-pointer transition-colors pl-4"
                >
                  {hb.content || `Heading ${hIdx + 1}`}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Insert Shortcuts */}
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
              Quick Blocks
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => handleAddBlock('paragraph')}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 hover:text-white text-left font-medium transition-colors"
              >
                + Paragraph
              </button>
              <button
                type="button"
                onClick={() => handleAddBlock('heading')}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 hover:text-white text-left font-medium transition-colors"
              >
                + Heading
              </button>
              <button
                type="button"
                onClick={() => handleAddBlock('key_points')}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-[#C7A45D] hover:text-white text-left font-medium transition-colors"
              >
                + Key Points
              </button>
              <button
                type="button"
                onClick={() => handleAddBlock('callout')}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-[#8B5CF6] hover:text-white text-left font-medium transition-colors"
              >
                + Callout
              </button>
              <button
                type="button"
                onClick={() => handleAddBlock('code')}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-cyan-400 hover:text-white text-left font-medium transition-colors"
              >
                + Code Block
              </button>
              <button
                type="button"
                onClick={() => handleAddBlock('table')}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-[#3B82F6] hover:text-white text-left font-medium transition-colors"
              >
                + Table
              </button>
            </div>
          </div>
        </aside>

        {/* CENTER PANE: Writing Canvas (Writing first - Section 9 & 47) */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 flex flex-col items-center bg-[#090B0E]">
          
          {/* Dedicated Canvas Card with Calm Environment (Section 58) */}
          <div className={`w-full max-w-3xl rounded-3xl shadow-2xl transition-colors duration-300 ${
            canvasTheme === 'paper'
              ? 'bg-[#FCFCFA] text-slate-900 border border-slate-200/90'
              : 'bg-[#11141A] text-slate-100 border border-white/10'
          }`}>
            
            {/* Formatting Toolbar */}
            <EditorToolbar
              onAddBlock={handleAddBlock}
              onUndo={handleUndo}
              onRedo={handleRedo}
              canUndo={historyIndex > 0}
              canRedo={historyIndex < history.length - 1}
            />

            <div className="p-6 sm:p-12 space-y-8 text-left">
              
              {/* Cover Image Banner (Section 13) */}
              {article.coverImage ? (
                <div className="relative group/cover rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-16/9 bg-slate-950">
                  <img
                    src={article.coverImage}
                    alt="Article cover visual"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover/cover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => setCoverModalOpen(true)}
                      className="px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black text-white text-xs font-semibold backdrop-blur-xs transition-colors"
                    >
                      Change Cover
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateArticle({ coverImage: '' })}
                      className="p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-white text-xs backdrop-blur-xs transition-colors"
                      title="Remove Cover"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setCoverModalOpen(true)}
                  className="w-full p-8 rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#3B82F6] hover:bg-blue-500/[0.03] transition-all flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <Upload className="w-6 h-6 text-[#3B82F6]" />
                  <span className="text-xs font-semibold">Add Article Cover Image</span>
                  <span className="text-[11px] text-slate-400">Used for Insights cards, header preview, and social sharing</span>
                </button>
              )}

              {/* Large Editable Article Title (Section 11) */}
              <div className="space-y-3">
                <input
                  ref={titleInputRef}
                  type="text"
                  value={article.title}
                  onChange={(e) => handleUpdateArticle({ title: e.target.value })}
                  placeholder="Enter your article title..."
                  className={`w-full bg-transparent border-0 font-bold tracking-tight focus:outline-none placeholder:text-slate-400 text-3xl sm:text-5xl leading-tight ${
                    canvasTheme === 'paper' ? 'text-slate-900' : 'text-white'
                  }`}
                />

                {/* Subtitle / Excerpt (Section 12) */}
                <textarea
                  value={article.excerpt}
                  onChange={(e) => handleUpdateArticle({ excerpt: e.target.value })}
                  placeholder="Briefly describe what this article is about (used for Insights preview and SEO cards)..."
                  rows={2}
                  className={`w-full bg-transparent border-0 resize-none font-normal text-base sm:text-xl leading-relaxed focus:outline-none placeholder:text-slate-400 ${
                    canvasTheme === 'paper' ? 'text-slate-600' : 'text-slate-300'
                  }`}
                />
              </div>

              {/* Blocks Canvas Container */}
              <div className="space-y-4 pt-4 border-t border-slate-200/60">
                {(article.blocks || []).map((block, index) => (
                  <BlockRenderer
                    key={block.id}
                    block={block}
                    index={index}
                    totalBlocks={(article.blocks || []).length}
                    onUpdate={handleUpdateBlock}
                    onDelete={handleDeleteBlock}
                    onDuplicate={handleDuplicateBlock}
                    onMoveUp={handleMoveUp}
                    onMoveDown={handleMoveDown}
                    onInsertAfter={(idx) => handleAddBlock('paragraph', idx)}
                    onTriggerSlash={handleTriggerSlash}
                    articleId={article.id}
                    authorId={currentUser?.id}
                  />
                ))}
              </div>

              {/* End of Canvas '+ Add Block' Button (Section 50) */}
              <div className="pt-6 border-t border-slate-200/60 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setSlashMenuOpen(true)}
                  className="px-5 py-2.5 rounded-full border border-slate-300 hover:border-[#3B82F6] bg-slate-50 hover:bg-white text-xs font-semibold text-slate-700 hover:text-[#3B82F6] shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Content Block (or press &lsquo;/&rsquo;)</span>
                </button>
              </div>

            </div>
          </div>
        </main>

        {/* RIGHT PANE: Article Settings Panel (Desktop) / Drawer (Section 10 & 38-46) */}
        <aside className="hidden lg:block w-80 border-l border-white/10 bg-[#0C0E13] p-5 shrink-0 overflow-y-auto">
          <ArticleSettingsPanel
            article={article}
            authorProfile={authorProfile}
            onUpdate={handleUpdateArticle}
            onOpenCoverUpload={() => setCoverModalOpen(true)}
          />
        </aside>

      </div>

      {/* Mobile Settings Drawer */}
      {settingsDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm h-full bg-[#0C0E13] border-l border-white/10 p-5 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="font-bold text-white text-sm">Article Settings</span>
              <button 
                type="button"
                onClick={() => setSettingsDrawerOpen(false)}
                className="p-1.5 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ArticleSettingsPanel
              article={article}
              authorProfile={authorProfile}
              onUpdate={handleUpdateArticle}
              onOpenCoverUpload={() => { setSettingsDrawerOpen(false); setCoverModalOpen(true); }}
            />
          </div>
        </div>
      )}

      {/* Cover Image Upload / Selection Modal */}
      {coverModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl bg-[#14171E] border border-white/15 p-6 shadow-2xl space-y-4 text-left text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold text-sm text-white flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#3B82F6]" />
                <span>Select Cover Image</span>
              </span>
              <button type="button" onClick={() => setCoverModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Option 1: File Upload */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Option 1: Upload Image File (Survives reload & permanently stored)
                </label>
                <div className="rounded-xl border-2 border-dashed border-white/15 hover:border-cyan-500/50 p-4 text-center transition-colors bg-white/[0.02]">
                  {coverUploadStatus === 'uploading' ? (
                    <div className="py-2 space-y-2">
                      <div className="flex items-center justify-center gap-2 text-cyan-400 text-xs font-medium">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Optimizing & uploading cover image...</span>
                      </div>
                      <div className="w-48 mx-auto bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-cyan-400 h-full transition-all duration-300 rounded-full"
                          style={{ width: `${coverUploadProgress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{coverUploadProgress}%</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-[11px] text-slate-400">
                        Select a JPG, PNG, or WebP (up to 10MB)
                      </p>
                      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Browse Image</span>
                        <input type="file" accept="image/*" onChange={handleCoverFileUpload} className="hidden" />
                      </label>
                    </div>
                  )}

                  {coverUploadError && (
                    <p className="text-xs text-rose-400 font-medium mt-2">{coverUploadError}</p>
                  )}
                </div>
              </div>

              {/* Option 2: Curated Presets */}
              <div className="space-y-2 pt-1 border-t border-white/10">
                <label className="block text-xs font-semibold text-slate-300">
                  Option 2: Choose a curated tech header
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
                  ].map((presetUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => { handleUpdateArticle({ coverImage: presetUrl }); setCoverModalOpen(false); }}
                      className="aspect-16/10 rounded-xl overflow-hidden border border-white/10 hover:border-[#3B82F6] cursor-pointer transition-all hover:scale-103"
                    >
                      <img src={presetUrl} alt="Preset visual" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Option 3: Custom Image URL */}
              <div className="pt-2 border-t border-white/10 space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Option 3: Custom Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={coverInputUrl}
                    onChange={(e) => setCoverInputUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (coverInputUrl.trim()) {
                        handleUpdateArticle({ coverImage: coverInputUrl.trim() });
                        setCoverModalOpen(false);
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-semibold cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slash Commands Popup (Section 64 & 65) */}
      <SlashCommandMenu
        isOpen={slashMenuOpen}
        onClose={() => setSlashMenuOpen(false)}
        onSelect={(type) => handleAddBlock(type, targetSlashBlockIndex)}
      />

      {/* Live Article Preview Modal (Section 37, 53, 54, 66) */}
      <ArticlePreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        article={article}
        authorProfile={authorProfile}
      />

      {/* Submit for Review Confirmation Modal (Section 43) */}
      {submitSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-[#11141A] border border-white/15 p-6 sm:p-8 text-center space-y-5 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Submitted for Review</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Your article has been submitted to the ObliqueTech editorial board. Our editors will review technical accuracy and formatting before publication.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left text-xs text-slate-400 space-y-1">
              <div><strong className="text-white">Title:</strong> {article.title}</div>
              <div><strong className="text-white">Category:</strong> {article.category}</div>
              <div><strong className="text-white">Status:</strong> <span className="text-amber-400 font-mono">In Review</span></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.push('/account/articles')}
                className="w-full sm:flex-1 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Track in My Oblique →
              </button>
              <button
                type="button"
                onClick={() => router.push('/insights')}
                className="w-full sm:flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                Return to Insights
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
