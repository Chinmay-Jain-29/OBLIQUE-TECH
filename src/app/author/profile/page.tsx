'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/navigation';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { obliqueStore } from '@/lib/store';
import { AuthorProfile, AuthorUser } from '@/types';
import { 
  User, 
  Briefcase, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Camera, 
  Globe, 
  AlertCircle,
  Plus,
  X,
  ShieldCheck
} from 'lucide-react';
import { LinkedInIcon, TwitterXIcon, GitHubIcon } from '@/components/ui/Icons';

const SUGGESTED_EXPERTISE = [
  'Applied AI & LLMs',
  'Distributed Systems',
  'Next.js & React Architecture',
  'Cloud Infrastructure',
  'Software Engineering',
  'UI/UX & Design Systems',
  'SaaS & Product Strategy',
  'Cybersecurity & Zero-Trust',
  'Data Engineering & PostgreSQL',
  'Developer Experience'
];

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
];

function AuthorProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/insights/write';

  const { user: authUser } = useAuth();
  const [currentUser, setCurrentUser] = useState<AuthorUser | null>(null);
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [expertise, setExpertise] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(PRESET_AVATARS[0]);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  const [isCompleted, setIsCompleted] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let activeUser: AuthorUser | null = null;

    if (authUser) {
      activeUser = {
        id: authUser.id,
        email: authUser.email,
        name: authUser.fullName || authUser.email.split('@')[0],
        avatarUrl: authUser.profilePhoto || '/avatars/author-default.png',
        role: 'author',
        createdAt: authUser.createdAt,
        profileCompleted: false
      };
    } else {
      activeUser = obliqueStore.getCurrentAuthorUser();
      if (!activeUser) {
        activeUser = obliqueStore.loginAuthor('guest.contributor@obliquetech.com');
      }
    }

    setCurrentUser(activeUser);

    if (activeUser) {
      const existing = obliqueStore.getAuthorProfile(activeUser.id);
      if (existing) {
        if (existing.fullName) setFullName(existing.fullName);
        if (existing.title) setTitle(existing.title);
        if (existing.bio) setBio(existing.bio);
        if (existing.expertise && existing.expertise.length > 0) setExpertise(existing.expertise);
        if (existing.avatarUrl) setAvatarUrl(existing.avatarUrl);
        if (existing.linkedInUrl) setLinkedInUrl(existing.linkedInUrl);
        if (existing.twitterUrl) setTwitterUrl(existing.twitterUrl);
        if (existing.githubUrl) setGithubUrl(existing.githubUrl);
        if (existing.websiteUrl) setWebsiteUrl(existing.websiteUrl);

        if (obliqueStore.isAuthorProfileComplete(activeUser.id)) {
          setIsCompleted(true);
        }
      } else {
        if (activeUser.name) setFullName(activeUser.name);
        if (authUser?.jobTitle) setTitle(authUser.jobTitle);
        if (authUser?.bio) setBio(authUser.bio);
        if (authUser?.profilePhoto) setAvatarUrl(authUser.profilePhoto);
        if (authUser?.linkedin) setLinkedInUrl(authUser.linkedin);
        if (authUser?.website) setWebsiteUrl(authUser.website);
      }
    }
  }, [authUser]);

  const toggleExpertise = (tag: string) => {
    if (expertise.includes(tag)) {
      setExpertise(expertise.filter(t => t !== tag));
    } else {
      setExpertise([...expertise, tag]);
    }
  };

  const handleAddCustomTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (customTag.trim() && !expertise.includes(customTag.trim())) {
      setExpertise([...expertise, customTag.trim()]);
      setCustomTag('');
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation checks for required fields
    if (!fullName.trim()) {
      setError('Full Name is required.');
      return;
    }
    if (!title.trim()) {
      setError('Professional Title is required (e.g. Senior Systems Architect).');
      return;
    }
    if (!bio.trim() || bio.trim().length < 20) {
      setError('Please provide a short bio of at least 20 characters.');
      return;
    }
    if (expertise.length === 0) {
      setError('Please select or add at least one area of expertise.');
      return;
    }
    if (!linkedInUrl.trim()) {
      setError('LinkedIn or professional profile link is required.');
      return;
    }
    if (!linkedInUrl.startsWith('http://') && !linkedInUrl.startsWith('https://')) {
      setError('Please enter a valid URL starting with https://');
      return;
    }

    setIsSubmitting(true);

    const authorId = currentUser?.id || `auth-${Date.now()}`;
    const slug = fullName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const profile: AuthorProfile = {
      id: authorId,
      slug,
      fullName: fullName.trim(),
      title: title.trim(),
      bio: bio.trim(),
      expertise,
      avatarUrl: avatarUrl || PRESET_AVATARS[0],
      linkedInUrl: linkedInUrl.trim(),
      twitterUrl: twitterUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      websiteUrl: websiteUrl.trim() || undefined,
      isComplete: true
    };

    obliqueStore.saveAuthorProfile(profile);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      setShowSuccessBanner(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  const handleStartWriting = () => {
    router.push(redirectUrl);
  };

  return (
    <div className="min-h-screen surface-black pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Breadcrumb & Status */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-[#3B82F6] font-semibold">Editorial Studio</span>
            <span>/</span>
            <span>Author Verification</span>
          </div>
          {isCompleted && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Author</span>
            </div>
          )}
        </div>

        {/* Success Completion Banner (Section 7) */}
        {showSuccessBanner && (
          <div className="rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-blue-500/10 border border-emerald-500/30 p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base sm:text-lg">
                <CheckCircle2 className="w-5 h-5" />
                <span>Author profile complete.</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Your author credentials are ready. Readers will see your bio on all published insights.
              </p>
            </div>
            <button
              onClick={handleStartWriting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
            >
              <span>Start Writing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#C7A45D]">
            Author Profile Onboarding
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Tell readers about yourself.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            ObliqueTech Insights is a platform for practitioner-grade engineering, AI, and architecture thinking. Authors must complete their profile before contributing articles.
          </p>
        </div>

        {/* Main Grid: Form Left (7 cols) + Live Preview Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            
            {/* Error Notification */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2.5 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Profile Photo Selector */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <label className="block text-xs font-semibold text-white tracking-wide">
                Profile Photo <span className="text-rose-400">*</span>
              </label>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-md shrink-0 bg-slate-900">
                  <img
                    src={avatarUrl}
                    alt={fullName || 'Author Avatar'}
                    className="w-full h-full object-cover"
                  />
                  <label 
                    htmlFor="avatar-upload"
                    className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
                    title="Upload Custom Photo"
                  >
                    <Camera className="w-5 h-5" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="text-xs text-slate-300 font-medium">
                    Pick a curated avatar or upload your own photo:
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    {PRESET_AVATARS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAvatarUrl(preset)}
                        className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                          avatarUrl === preset ? 'border-[#3B82F6] scale-110 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={preset} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                  <label 
                    htmlFor="avatar-upload"
                    className="inline-block text-[11px] text-[#3B82F6] hover:underline cursor-pointer"
                  >
                    Upload from device...
                  </label>
                </div>
              </div>
            </div>

            {/* Full Name & Professional Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-white">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Chen"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6] transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-white">
                  Professional Title <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Principal Cloud Architect"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6] transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Short Bio */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-white">
                  Short Bio <span className="text-rose-400">*</span>
                </label>
                <span className="text-[11px] font-mono text-slate-400">
                  {bio.length}/280 chars
                </span>
              </div>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={280}
                rows={3}
                placeholder="Briefly describe your technical background, domain focus, and engineering perspective..."
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6] transition-colors leading-relaxed"
                required
              />
            </div>

            {/* Area of Expertise */}
            <div className="space-y-2.5">
              <label className="block text-xs font-semibold text-white">
                Area of Expertise <span className="text-rose-400">*</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_EXPERTISE.map((tag) => {
                  const isSelected = expertise.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleExpertise(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#3B82F6] text-white shadow-xs'
                          : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              {/* Custom Tag Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  onKeyDown={handleAddCustomTag}
                  placeholder="Add custom topic (press Enter)..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6]"
                />
                <button
                  type="button"
                  onClick={handleAddCustomTag}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {expertise.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-[11px] font-mono text-slate-400">Selected:</span>
                  {expertise.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[#3B82F6] text-[11px] font-medium"
                    >
                      <span>{tag}</span>
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-white" 
                        onClick={() => toggleExpertise(tag)} 
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* LinkedIn & Professional Profile */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-white">
                LinkedIn / Professional Profile <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <LinkedInIcon className="w-4 h-4" />
                </span>
                <input
                  type="url"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Optional Social Links */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-slate-300">
                Optional Links & Portfolios
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <TwitterXIcon className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="url"
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    placeholder="X / Twitter"
                    className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <GitHubIcon className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="GitHub"
                    className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>

                <div className="relative">
                  <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="Website"
                    className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#7C5CFF] hover:from-blue-600 hover:to-purple-600 text-white font-semibold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Saving Profile...' : isCompleted ? 'Update Profile' : 'Complete Profile & Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {isCompleted && (
                <button
                  type="button"
                  onClick={handleStartWriting}
                  className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Start Writing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>

          {/* Right Column: Live Author Card Preview (Section 54) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A45D]" />
              <span>Live Article Attribution Preview</span>
            </div>

            {/* Article Author Box Card */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 shadow-lg space-y-5 text-left">
              <div className="text-[11px] font-mono uppercase text-[#3B82F6] font-semibold">
                Written by
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-white/20 shrink-0 bg-slate-900">
                  <img
                    src={avatarUrl}
                    alt={fullName || 'Author'}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1 flex-1">
                  <h3 className="text-base font-bold text-white leading-tight">
                    {fullName || 'Your Full Name'}
                  </h3>
                  <div className="text-xs text-[#C7A45D] font-medium">
                    {title || 'Your Professional Title'}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic">
                &ldquo;{bio || 'Your short biography will be displayed here for readers to learn about your background and technical perspective.'}&rdquo;
              </p>

              {/* Topics */}
              {expertise.length > 0 && (
                <div className="pt-2 border-t border-white/5 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Areas of focus:</div>
                  <div className="flex flex-wrap gap-1">
                    {expertise.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div className="pt-3 border-t border-white/5 flex items-center gap-3 text-xs text-slate-400">
                {linkedInUrl && (
                  <span className="text-[#3B82F6] flex items-center gap-1">
                    <LinkedInIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </span>
                )}
                {twitterUrl && (
                  <span className="flex items-center gap-1 hover:text-white">
                    <TwitterXIcon className="w-3.5 h-3.5" />
                    <span>X</span>
                  </span>
                )}
                {githubUrl && (
                  <span className="flex items-center gap-1 hover:text-white">
                    <GitHubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </span>
                )}
              </div>
            </div>

            {/* Editorial Standard Card */}
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/15 text-xs text-slate-300 space-y-1.5 text-left">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
                <span>ObliqueTech Publishing Standards</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Articles submitted to ObliqueTech Insights undergo review by our senior editorial staff to ensure technical accuracy, architectural relevance, and reader value.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function AuthorProfilePage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen surface-black pt-36 text-center text-slate-400 font-mono text-xs">
        Loading Author Studio Credentials...
      </div>
    }>
      <AuthorProfileContent />
    </React.Suspense>
  );
}
