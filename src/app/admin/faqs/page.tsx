'use client';

import React, { useState, useEffect } from 'react';
import { obliqueStore } from '@/lib/store';
import { FAQItem } from '@/types';
import { Plus, Edit2, Trash2, CheckCircle, Eye, EyeOff, X } from 'lucide-react';

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setFaqs(obliqueStore.getFAQs());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Delete this FAQ?')) {
      obliqueStore.deleteFAQ(id);
      setFaqs(obliqueStore.getFAQs());
    }
  };

  const handleTogglePublish = (faq: FAQItem) => {
    const updated = { ...faq, published: !faq.published };
    obliqueStore.saveFAQ(updated);
    setFaqs(obliqueStore.getFAQs());
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    obliqueStore.saveFAQ(editingFaq);
    setFaqs(obliqueStore.getFAQs());
    setEditingFaq(null);
    setIsNew(false);
  };

  const handleOpenNew = () => {
    const newFaq: FAQItem = {
      id: `faq-${Date.now()}`,
      category: 'General',
      question: 'New Question?',
      answer: 'Clear, concise explanation...',
      order: faqs.length + 1,
      published: true
    };
    setEditingFaq(newFaq);
    setIsNew(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">FAQs Management</h1>
          <p className="text-xs text-slate-400 mt-1">Manage public questions, categories, and published visibility.</p>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add FAQ</span>
        </button>
      </div>

      <div className="rounded-2xl bg-slate-900/60 border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-slate-400 font-semibold border-b border-white/10">
              <tr>
                <th className="p-4">Question & Category</th>
                <th className="p-4">Answer Preview</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {faqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-bold text-white max-w-xs">
                    <div>{faq.question}</div>
                    <span className="text-[10px] text-cyan-400 font-semibold uppercase">{faq.category}</span>
                  </td>
                  <td className="p-4 text-slate-400 max-w-md truncate">{faq.answer}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleTogglePublish(faq)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold transition-colors ${
                        faq.published
                          ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                          : 'bg-slate-800 text-slate-500 border border-white/5'
                      }`}
                    >
                      {faq.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{faq.published ? 'Published' : 'Hidden'}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingFaq(faq);
                        setIsNew(false);
                      }}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create FAQ Modal */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setEditingFaq(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base font-bold text-white mb-4">
              {isNew ? 'New FAQ' : 'Edit FAQ'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Category</label>
                <select
                  value={editingFaq.category}
                  onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                >
                  <option value="General">General</option>
                  <option value="Services">Services</option>
                  <option value="Process">Process</option>
                  <option value="Security & Tech">Security & Tech</option>
                  <option value="Pricing & Engagement">Pricing & Engagement</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
