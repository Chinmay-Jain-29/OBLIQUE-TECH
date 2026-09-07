'use client';

import React, { useState } from 'react';
import { X, Star, CheckCircle, MessageSquarePlus } from 'lucide-react';
import { obliqueStore } from '@/lib/store';

export function FeedbackModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [clientName, setClientName] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [project, setProject] = useState('');
  const [rating, setRating] = useState(5);
  const [testimonial, setTestimonial] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !company || !testimonial) return;

    setLoading(true);
    obliqueStore.submitTestimonial({
      clientName,
      company,
      position: position || 'Client',
      project: project || 'Technology Solution',
      rating,
      testimonial
    });

    setLoading(false);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setClientName('');
    setCompany('');
    setPosition('');
    setProject('');
    setRating(5);
    setTestimonial('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl text-slate-100">
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Thank You for Your Feedback!</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
              Your feedback has been submitted successfully. In accordance with our verification process, it will be reviewed by our team before publication.
            </p>
            <button
              onClick={handleResetAndClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <MessageSquarePlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Submit Client Feedback</h3>
                <p className="text-xs text-slate-400">Share your experience working with ObliqueTech</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Logistics"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Your Role / Position</label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g. Operations Director"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Project Name / Solution</label>
                  <input
                    type="text"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    placeholder="e.g. Warehouse Cloud Platform"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-slate-500 hover:text-amber-400 transition-colors focus:outline-none"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-slate-400 ml-2 font-medium">{rating} / 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Your Testimonial / Feedback *</label>
                <textarea
                  required
                  rows={4}
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  placeholder="Share details regarding your technical collaboration, delivery clarity, and outcomes..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !clientName || !company || !testimonial}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold shadow-lg shadow-amber-500/20 disabled:opacity-40 transition-all"
                >
                  {loading ? 'Submitting...' : 'Submit For Review'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
