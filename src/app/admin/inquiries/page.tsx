'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { obliqueStore } from '@/lib/store';
import { ContactSubmission, ProjectWizardInquiry } from '@/types';
import { 
  Mail, 
  Sparkles, 
  Phone, 
  Building, 
  Calendar, 
  CheckCircle2, 
  RefreshCw, 
  Search, 
  Filter, 
  ExternalLink, 
  MessageSquare, 
  Trash2, 
  Clock, 
  Tag, 
  Layers, 
  X, 
  Copy, 
  Check, 
  AlertCircle,
  MessageCircle,
  ChevronDown
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [wizards, setWizards] = useState<ProjectWizardInquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'wizards' | 'contacts'>('wizards');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedWizard, setSelectedWizard] = useState<ProjectWizardInquiry | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  // Load and subscribe
  const loadData = async (forceRefresh = false) => {
    if (forceRefresh) setRefreshing(true);
    try {
      const [wList, cList] = await Promise.all([
        obliqueStore.fetchProjectWizardInquiries(forceRefresh),
        obliqueStore.fetchContactSubmissions(forceRefresh)
      ]);
      setWizards([...wList]);
      setContacts([...cList]);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
      // Fallback to local memory
      setWizards([...obliqueStore.getProjectWizardInquiries()]);
      setContacts([...obliqueStore.getContactSubmissions()]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    loadData(true);

    const handleUpdate = () => {
      setWizards([...obliqueStore.getProjectWizardInquiries()]);
      setContacts([...obliqueStore.getContactSubmissions()]);
    };

    window.addEventListener('oblique_inquiries_updated', handleUpdate);
    window.addEventListener('oblique_wizards_updated', handleUpdate);
    window.addEventListener('oblique_contacts_updated', handleUpdate);

    return () => {
      window.removeEventListener('oblique_inquiries_updated', handleUpdate);
      window.removeEventListener('oblique_wizards_updated', handleUpdate);
      window.removeEventListener('oblique_contacts_updated', handleUpdate);
    };
  }, []);

  // Filtered Project Wizard Inquiries
  const filteredWizards = useMemo(() => {
    return wizards.filter((w) => {
      const matchesStatus = statusFilter === 'all' || w.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        w.name.toLowerCase().includes(q) ||
        w.email.toLowerCase().includes(q) ||
        (w.phone && w.phone.toLowerCase().includes(q)) ||
        (w.company && w.company.toLowerCase().includes(q)) ||
        w.projectType.toLowerCase().includes(q) ||
        (w.coreObjective && w.coreObjective.toLowerCase().includes(q)) ||
        (w.keyFeatures && w.keyFeatures.toLowerCase().includes(q)) ||
        w.servicesNeeded.some(s => s.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [wizards, statusFilter, searchQuery]);

  // Filtered Direct Contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone && c.phone.toLowerCase().includes(q)) ||
        (c.company && c.company.toLowerCase().includes(q)) ||
        c.service.toLowerCase().includes(q) ||
        c.message.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [contacts, statusFilter, searchQuery]);

  // Status Handlers
  const handleWizardStatusChange = async (id: string, newStatus: 'new' | 'in-review' | 'contacted' | 'closed') => {
    await obliqueStore.updateProjectWizardStatus(id, newStatus);
    setWizards([...obliqueStore.getProjectWizardInquiries()]);
    if (selectedWizard && selectedWizard.id === id) {
      setSelectedWizard({ ...selectedWizard, status: newStatus });
    }
  };

  const handleContactStatusChange = async (id: string, newStatus: 'new' | 'contacted' | 'archived') => {
    await obliqueStore.updateContactStatus(id, newStatus);
    setContacts([...obliqueStore.getContactSubmissions()]);
    if (selectedContact && selectedContact.id === id) {
      setSelectedContact({ ...selectedContact, status: newStatus });
    }
  };

  // Delete Handlers
  const handleDeleteWizard = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete the inquiry from "${name}"?`)) {
      await obliqueStore.deleteProjectWizardInquiry(id);
      setWizards([...obliqueStore.getProjectWizardInquiries()]);
      if (selectedWizard?.id === id) setSelectedWizard(null);
    }
  };

  const handleDeleteContact = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the message from "${name}"?`)) {
      await obliqueStore.deleteContactSubmission(id);
      setContacts([...obliqueStore.getContactSubmissions()]);
      if (selectedContact?.id === id) setSelectedContact(null);
    }
  };

  // Seed sample handler
  const handleSeedSamples = async () => {
    if (confirm('Add realistic sample inquiries to test and populate the dashboard?')) {
      setSeeding(true);
      await obliqueStore.seedSampleInquiries();
      await loadData(true);
      setSeeding(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const cleanPhoneForWhatsApp = (phoneStr: string) => {
    return phoneStr.replace(/[^0-9]/g, '');
  };

  const newWizardsCount = wizards.filter(w => w.status === 'new').length;
  const newContactsCount = contacts.filter(c => c.status === 'new').length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Incoming Inquiries</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {wizards.length + contacts.length} Total
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review detailed scoping from the Project Discovery Wizard and direct contact messages.
          </p>
        </div>

        {/* Global actions: Refresh & Seed */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-white/10 transition-colors disabled:opacity-50 cursor-pointer"
            title="Refresh from cloud database"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{refreshing ? 'Syncing...' : 'Sync Cloud'}</span>
          </button>

          <button
            onClick={handleSeedSamples}
            disabled={seeding}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-medium border border-cyan-500/30 transition-colors disabled:opacity-50 cursor-pointer"
            title="Seed high quality realistic client inquiries for testing"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{seeding ? 'Seeding...' : 'Seed Samples'}</span>
          </button>
        </div>
      </div>

      {/* Tabs & Search Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2 rounded-2xl bg-slate-900/80 border border-white/10">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setActiveTab('wizards'); setStatusFilter('all'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'wizards'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Project Wizard</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
              activeTab === 'wizards' ? 'bg-slate-950 text-cyan-300' : 'bg-white/10 text-slate-300'
            }`}>
              {wizards.length}
            </span>
            {newWizardsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title={`${newWizardsCount} new inquiries`} />
            )}
          </button>

          <button
            onClick={() => { setActiveTab('contacts'); setStatusFilter('all'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'contacts'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Contact</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
              activeTab === 'contacts' ? 'bg-slate-950 text-cyan-300' : 'bg-white/10 text-slate-300'
            }`}>
              {contacts.length}
            </span>
            {newContactsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title={`${newContactsCount} new messages`} />
            )}
          </button>
        </div>

        {/* Search & Status Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, scope..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="new">New / Unread</option>
              {activeTab === 'wizards' ? (
                <>
                  <option value="in-review">In Review</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </>
              ) : (
                <>
                  <option value="contacted">Contacted</option>
                  <option value="archived">Archived</option>
                </>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Loading state indicator */}
      {loading && (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-white/10 space-y-3">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-white">Loading Inquiries from Cloud...</p>
          <p className="text-xs text-slate-400">Syncing live records with Supabase database.</p>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 1: PROJECT DISCOVERY WIZARD INQUIRIES                             */}
      {/* ===================================================================== */}
      {!loading && activeTab === 'wizards' && (
        <div className="space-y-4">
          {filteredWizards.map((wiz) => {
            const statusColors: Record<string, { bg: string; text: string; border: string }> = {
              new: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
              'in-review': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
              contacted: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
              closed: { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30' }
            };
            const currentStyle = statusColors[wiz.status] || statusColors.new;
            const waNumber = wiz.phone ? cleanPhoneForWhatsApp(wiz.phone) : null;

            return (
              <div
                key={wiz.id}
                className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 space-y-4 shadow-lg text-xs hover:border-cyan-500/30 transition-all group"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-md font-mono font-semibold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px]">
                      {wiz.projectType}
                    </span>
                    <span className="font-bold text-sm text-white">{wiz.name}</span>
                    {wiz.company && (
                      <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 text-[11px] border border-white/5">
                        {wiz.company}
                      </span>
                    )}
                    {/* Status badge & selector */}
                    <div className="relative inline-block ml-auto sm:ml-2">
                      <select
                        value={wiz.status || 'new'}
                        onChange={(e) => handleWizardStatusChange(wiz.id, e.target.value as any)}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none appearance-none pr-6 ${currentStyle.bg} ${currentStyle.text} ${currentStyle.border}`}
                      >
                        <option value="new" className="bg-slate-950 text-emerald-400">● NEW</option>
                        <option value="in-review" className="bg-slate-950 text-purple-400">● IN REVIEW</option>
                        <option value="contacted" className="bg-slate-950 text-amber-400">● CONTACTED</option>
                        <option value="closed" className="bg-slate-950 text-slate-400">● CLOSED</option>
                      </select>
                      <ChevronDown className={`w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${currentStyle.text}`} />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {new Date(wiz.submittedAt).toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleDeleteWizard(wiz.id, wiz.name)}
                      className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 3 Columns: Contact, Timeline, Disciplines */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
                  {/* Column 1: Client Contacts */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <strong className="text-slate-400 block text-[11px] uppercase tracking-wider font-mono">
                      Client Contact:
                    </strong>
                    <div className="flex items-center justify-between gap-1">
                      <a 
                        href={`mailto:${wiz.email}?subject=Regarding Your ObliqueTech Project Inquiry (${wiz.projectType})`}
                        className="text-cyan-400 hover:underline truncate"
                      >
                        {wiz.email}
                      </a>
                      <button
                        onClick={() => copyToClipboard(wiz.email, `email-${wiz.id}`)}
                        className="p-1 text-slate-500 hover:text-white"
                        title="Copy email"
                      >
                        {copiedField === `email-${wiz.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-1">
                      <a href={`tel:${wiz.phone}`} className="text-amber-400 hover:underline">
                        {wiz.phone}
                      </a>
                      <div className="flex items-center gap-1">
                        {waNumber && (
                          <a
                            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${wiz.name}, thank you for reaching out to ObliqueTech regarding your ${wiz.projectType} inquiry.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-emerald-400 hover:text-emerald-300"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3 h-3" />
                          </a>
                        )}
                        <button
                          onClick={() => copyToClipboard(wiz.phone, `phone-${wiz.id}`)}
                          className="p-1 text-slate-500 hover:text-white"
                          title="Copy phone"
                        >
                          {copiedField === `phone-${wiz.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Timeline */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <strong className="text-slate-400 block text-[11px] uppercase tracking-wider font-mono">
                      Target Timeline:
                    </strong>
                    <span className="inline-block px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold">
                      {wiz.timeline || 'Not specified'}
                    </span>
                    {wiz.userId && (
                      <p className="text-[10px] text-slate-500 font-mono mt-1">
                        User ID: {wiz.userId.slice(0, 10)}...
                      </p>
                    )}
                  </div>

                  {/* Column 3: Disciplines */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <strong className="text-slate-400 block text-[11px] uppercase tracking-wider font-mono">
                      Selected Disciplines:
                    </strong>
                    <div className="flex flex-wrap gap-1.5">
                      {wiz.servicesNeeded.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Scope Objective & Actions */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div>
                    <strong className="text-slate-300 font-semibold">Core Objective:</strong>
                    <p className="text-slate-300 mt-1 leading-relaxed">
                      {wiz.coreObjective || 'No objective provided.'}
                    </p>
                  </div>

                  {wiz.keyFeatures && (
                    <div className="pt-2 border-t border-white/5">
                      <strong className="text-slate-400 text-[11px]">Key Features & Constraints:</strong>
                      <p className="text-slate-400 mt-0.5">{wiz.keyFeatures}</p>
                    </div>
                  )}

                  {/* Action Row */}
                  <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/5">
                    <button
                      onClick={() => setSelectedWizard(wiz)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
                    >
                      <Layers className="w-3 h-3" />
                      <span>View Full Scoping Details</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${wiz.email}?subject=ObliqueTech Engineering Inquiry: ${wiz.projectType}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-semibold border border-cyan-500/20 transition-colors"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Send Email</span>
                      </a>
                      {waNumber && (
                        <a
                          href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${wiz.name}, contacting you from ObliqueTech regarding your ${wiz.projectType} project requirements.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/20 transition-colors"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredWizards.length === 0 && (
            <div className="text-center py-16 p-6 rounded-2xl bg-slate-900/30 border border-white/10 space-y-3">
              <Sparkles className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-base font-bold text-white">No Wizard Inquiries Found</p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {searchQuery || statusFilter !== 'all' 
                  ? 'No inquiries match the current search filter criteria. Try adjusting your filter.' 
                  : 'Submissions from the 5-step interactive project discovery wizard will appear here.'}
              </p>
              {wizards.length === 0 && (
                <button
                  onClick={handleSeedSamples}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Seed Realistic Test Inquiries</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: DIRECT CONTACT FORM SUBMISSIONS                                */}
      {/* ===================================================================== */}
      {!loading && activeTab === 'contacts' && (
        <div className="space-y-4">
          {filteredContacts.map((c) => {
            const statusColors: Record<string, { bg: string; text: string; border: string }> = {
              new: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
              contacted: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
              archived: { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30' }
            };
            const currentStyle = statusColors[c.status] || statusColors.new;
            const waNumber = c.phone ? cleanPhoneForWhatsApp(c.phone) : null;

            return (
              <div
                key={c.id}
                className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 space-y-4 shadow-lg text-xs hover:border-cyan-500/30 transition-all"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-bold text-sm text-white">{c.name}</span>
                    {c.company && (
                      <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 text-[11px] border border-white/5">
                        {c.company}
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium text-[11px]">
                      {c.service}
                    </span>

                    {/* Status selector */}
                    <div className="relative inline-block ml-auto sm:ml-2">
                      <select
                        value={c.status || 'new'}
                        onChange={(e) => handleContactStatusChange(c.id, e.target.value as any)}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none appearance-none pr-6 ${currentStyle.bg} ${currentStyle.text} ${currentStyle.border}`}
                      >
                        <option value="new" className="bg-slate-950 text-emerald-400">● NEW</option>
                        <option value="contacted" className="bg-slate-950 text-amber-400">● CONTACTED</option>
                        <option value="archived" className="bg-slate-950 text-slate-400">● ARCHIVED</option>
                      </select>
                      <ChevronDown className={`w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${currentStyle.text}`} />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {new Date(c.submittedAt).toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleDeleteContact(c.id, c.name)}
                      className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Contact information details */}
                <div className="flex flex-wrap gap-6 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-medium">Email:</span>
                    <a href={`mailto:${c.email}`} className="text-cyan-400 hover:underline">
                      {c.email}
                    </a>
                    <button
                      onClick={() => copyToClipboard(c.email, `cnt-email-${c.id}`)}
                      className="p-0.5 text-slate-500 hover:text-white"
                      title="Copy email"
                    >
                      {copiedField === `cnt-email-${c.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  {c.phone && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 font-medium">Phone:</span>
                      <a href={`tel:${c.phone}`} className="text-amber-400 hover:underline">
                        {c.phone}
                      </a>
                      {waNumber && (
                        <a
                          href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${c.name}, thank you for contacting ObliqueTech regarding ${c.service}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-0.5 text-emerald-400 hover:text-emerald-300"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-slate-300 leading-relaxed font-normal whitespace-pre-wrap">
                  {c.message}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                  <a
                    href={`mailto:${c.email}?subject=Response from ObliqueTech: ${c.service}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-semibold border border-cyan-500/20 transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Reply via Email</span>
                  </a>
                  {waNumber && (
                    <a
                      href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${c.name}, replying to your message regarding ${c.service}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/20 transition-colors"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}

          {filteredContacts.length === 0 && (
            <div className="text-center py-16 p-6 rounded-2xl bg-slate-900/30 border border-white/10 space-y-2">
              <Mail className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-white">No Direct Contact Messages Found</p>
              <p className="text-xs text-slate-400">
                {searchQuery || statusFilter !== 'all' 
                  ? 'No direct messages match the current search filter.' 
                  : 'Submissions from the general contact form will appear here.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* FULL SCOPE MODAL FOR PROJECT DISCOVERY WIZARD                         */}
      {/* ===================================================================== */}
      {selectedWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-slate-900 border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {selectedWizard.projectType}
                </span>
                <h3 className="text-lg font-bold text-white mt-2">
                  Scoping Details: {selectedWizard.name}
                </h3>
                {selectedWizard.company && (
                  <p className="text-xs text-slate-400">{selectedWizard.company}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedWizard(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Structured Scope Grid */}
            <div className="space-y-4 text-xs">
              {/* Contact Card */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Client Coordinates
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Name:</span>
                    <strong className="text-white">{selectedWizard.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Company:</span>
                    <strong className="text-white">{selectedWizard.company || 'Not specified'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Email:</span>
                    <a href={`mailto:${selectedWizard.email}`} className="text-cyan-400 hover:underline">
                      {selectedWizard.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Phone:</span>
                    <a href={`tel:${selectedWizard.phone}`} className="text-amber-400 hover:underline">
                      {selectedWizard.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Scope Spec */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Discovery Specifications
                </h4>
                <div>
                  <span className="text-slate-500 block mb-1">Target Timeline:</span>
                  <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                    {selectedWizard.timeline}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Disciplines Needed:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedWizard.servicesNeeded.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Core Objective:</span>
                  <p className="text-slate-200 leading-relaxed p-3 rounded-xl bg-slate-950/50 border border-white/5">
                    {selectedWizard.coreObjective || 'No objective provided.'}
                  </p>
                </div>
                {selectedWizard.keyFeatures && (
                  <div>
                    <span className="text-slate-500 block mb-1">Key Features & Constraints:</span>
                    <p className="text-slate-300 leading-relaxed p-3 rounded-xl bg-slate-950/50 border border-white/5">
                      {selectedWizard.keyFeatures}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Status:</span>
                <select
                  value={selectedWizard.status || 'new'}
                  onChange={(e) => handleWizardStatusChange(selectedWizard.id, e.target.value as any)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="new">● New</option>
                  <option value="in-review">● In Review</option>
                  <option value="contacted">● Contacted</option>
                  <option value="closed">● Closed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedWizard.email}?subject=Regarding Your Project Scope: ${selectedWizard.projectType}`}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Response</span>
                </a>
                <button
                  onClick={() => setSelectedWizard(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
