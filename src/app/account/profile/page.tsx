'use client';

// =============================================================================
// OBLIQUETECH — "MY OBLIQUE" PROFILE MANAGEMENT (Section 8, 9, 10, 15, 47, 48)
// Photo uploader, personal & professional details, completion metrics & RLS
// =============================================================================

import React, { useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { obliqueStore } from '@/lib/store';
import { uploadArticleMedia } from '@/lib/mediaService';
import { LinkedInIcon } from '@/components/ui/Icons';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Briefcase, 
  Globe, 
  MapPin, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function AccountProfilePage() {
  const { user, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [countryCode, setCountryCode] = useState(user?.countryCode || '+91');
  const [companyName, setCompanyName] = useState(user?.companyName || '');
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [country, setCountry] = useState(user?.country || '');
  const [city, setCity] = useState(user?.city || '');
  const [linkedin, setLinkedin] = useState(user?.linkedin || '');
  const [website, setWebsite] = useState(user?.website || '');
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || '');

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!user) return null;

  const completion = obliqueStore.calculateProfileCompletion({
    ...user,
    fullName,
    phone,
    companyName,
    jobTitle,
    bio,
    profilePhoto,
    linkedin,
    website
  });

  // Handle Photo Upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    setMessage(null);

    try {
      const res = await uploadArticleMedia(file, {
        articleId: 'profile-avatar',
        authorId: user.id,
        mediaType: 'cover',
        altText: `${fullName} Profile Avatar`
      });

      if (res.success && res.permanentUrl) {
        setProfilePhoto(res.permanentUrl);
        await updateProfile({ profilePhoto: res.permanentUrl });
        setMessage({ type: 'success', text: 'Profile photo updated successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to upload photo.' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message || 'Error uploading photo.' });
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = async () => {
    setProfilePhoto('');
    await updateProfile({ profilePhoto: '' });
    setMessage({ type: 'success', text: 'Profile photo removed.' });
  };

  // Handle Save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const res = await updateProfile({
      fullName,
      phone,
      countryCode,
      companyName,
      jobTitle,
      bio,
      country,
      city,
      linkedin,
      website,
      profilePhoto
    });

    setIsSaving(false);
    if (res.success) {
      setMessage({ type: 'success', text: 'Profile details saved successfully!' });
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to update profile.' });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Personal & Professional Profile</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your digital identity across project requests, consultations, and editorial contributions.
          </p>
        </div>

        {/* Completion Pill */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs self-start">
          <span className="text-slate-300 font-medium">Completion:</span>
          <span className="font-mono font-bold text-blue-400">{completion}%</span>
        </div>
      </div>

      {/* Status Messages */}
      {message && (
        <div className={`p-4 rounded-xl text-xs flex items-center gap-2.5 border ${
          message.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' 
            : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Avatar Management Card (Section 10) */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group shrink-0">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl overflow-hidden border-2 border-white/20">
            {profilePhoto ? (
              <img src={profilePhoto} alt={fullName} className="w-full h-full object-cover" />
            ) : (
              fullName.charAt(0).toUpperCase()
            )}
          </div>
          {isUploadingPhoto && (
            <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center text-white">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          )}
        </div>

        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-sm font-bold text-white">Profile Photo</h3>
          <p className="text-xs text-slate-400 max-w-sm">
            Upload your professional headshot. Stored securely in our cloud CDN and displayed across your workspace.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
            <label className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>{profilePhoto ? 'Change Photo' : 'Upload Photo'}</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handlePhotoUpload} 
                className="hidden" 
              />
            </label>

            {profilePhoto && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section A: Personal Information */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            <span>Personal Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Chen"
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Email (Read Only) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-300">Email Address</label>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-3.5 py-2.5 bg-white/[0.02] border border-white/5 rounded-xl text-xs text-slate-400 cursor-not-allowed"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Phone Number</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-20 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white text-center focus:outline-none focus:border-blue-500"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  className="flex-1 px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* City & Country */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Location (City, Country)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section B: Professional Information */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <span>Professional Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Job Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Professional Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. VP of Product / Lead Architect"
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Company Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Company / Organization</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Innovations"
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* LinkedIn */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">LinkedIn Profile</label>
              <div className="relative">
                <LinkedInIcon className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Website */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Personal Website / GitHub</label>
              <div className="relative">
                <Globe className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Biography */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Professional Biography</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Briefly describe your domain focus, engineering perspective, and background..."
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <span>Save Profile Details</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
