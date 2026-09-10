'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { obliqueStore } from '@/lib/store';
import { BlogPost, ArticleStatus, ReviewFeedback } from '@/types';
import { Plus, Edit2, Trash2, Eye, X, AlertTriangle, CheckCircle2, MessageSquare } from 'lucide-react';

export default function AdminInsightsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  
  // Custom Modals State
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const [feedbackModalPost, setFeedbackModalPost] = useState<BlogPost | null>(null);
  const [feedbackComment, setFeedbackComment] = useState('');
  
  // Real-time Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadPosts = () => {
    setPosts(obliqueStore.getPosts());
  };

  useEffect(() => {
    loadPosts();

    const handleUpdate = () => loadPosts();
    window.addEventListener('oblique_posts_updated', handleUpdate);
    return () => window.removeEventListener('oblique_posts_updated', handleUpdate);
  }, []);

  // In-App Modal Confirmed Delete
  const confirmDelete = () => {
    if (!postToDelete) return;
    const deletedTitle = postToDelete.title;
    obliqueStore.deletePost(postToDelete.id);
    setPosts(prev => prev.filter(p => p.id !== postToDelete.id));
    setPostToDelete(null);
    showToast(`Deleted "${deletedTitle.substring(0, 30)}..."`);
  };

  const handleStatusChange = (post: BlogPost, newStatus: ArticleStatus) => {
    if (newStatus === 'changes_requested') {
      setFeedbackModalPost(post);
      setFeedbackComment('');
      return;
    }

    const updated: BlogPost = { ...post, status: newStatus, updatedAt: new Date().toISOString() };
    obliqueStore.savePost(updated);
    setPosts(prev => prev.map(p => p.id === post.id ? updated : p));
    showToast(`Status updated to "${newStatus.replace('_', ' ').toUpperCase()}"`);
  };

  const handleSaveFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackModalPost) return;

    const newFeedback: ReviewFeedback = {
      id: `rev-${Date.now()}`,
      reviewerName: 'Editorial Board',
      reviewerRole: 'Senior Technical Editor',
      date: new Date().toISOString(),
      comment: feedbackComment.trim() || 'Please revise formatting and code sample citations.',
      status: 'changes_requested'
    };

    const updated: BlogPost = {
      ...feedbackModalPost,
      status: 'changes_requested',
      updatedAt: new Date().toISOString(),
      reviewFeedback: [...(feedbackModalPost.reviewFeedback || []), newFeedback]
    };

    obliqueStore.savePost(updated);
    setPosts(prev => prev.map(p => p.id === feedbackModalPost.id ? updated : p));
    setFeedbackModalPost(null);
    setFeedbackComment('');
    showToast('Editorial feedback sent to author & status set to Changes Requested');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    obliqueStore.savePost(editingPost);
    if (isNew) {
      setPosts(prev => [editingPost, ...prev]);
    } else {
      setPosts(prev => prev.map(p => p.id === editingPost.id ? editingPost : p));
    }
    setEditingPost(null);
    setIsNew(false);
    showToast('Article saved successfully');
  };

  const handleOpenNew = () => {
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug: `insight-${Date.now()}`,
      title: 'New Engineering Perspective',
      excerpt: 'Brief overview of the technical insights discussed...',
      content: '## Introduction\nDetailed explanation of the problem...\n\n## Implementation\nPractical steps and architectural choices...',
      category: 'Business Technology',
      authorId: 'auth-1',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft',
      readingTimeMinutes: 5,
      coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      tags: ['Engineering', 'Strategy'],
      featured: false
    };
    setEditingPost(newPost);
    setIsNew(true);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-white shadow-2xl text-xs font-semibold animate-fade-in backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Oblique Insights (Blog CMS)</h1>
          <p className="text-xs text-slate-400 mt-1">
            Article editorial workflow: Draft → Review → Approved → Published.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Article</span>
        </button>
      </div>

      <div className="rounded-2xl bg-slate-900/60 border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-slate-400 font-semibold border-b border-white/10">
              <tr>
                <th className="p-4">Title & Slug</th>
                <th className="p-4">Category</th>
                <th className="p-4">Workflow Status</th>
                <th className="p-4">Reading Time</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-bold text-white">
                    <Link
                      href={`/insights/${post.slug}`}
                      target="_blank"
                      className="hover:text-cyan-400 transition-colors line-clamp-1"
                      title="Open article in reader"
                    >
                      {post.title}
                    </Link>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      <Link
                        href={`/insights/${post.slug}`}
                        target="_blank"
                        className="hover:text-slate-300 transition-colors"
                      >
                        /insights/{post.slug}
                      </Link>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-medium">
                      {post.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={post.status}
                      onChange={(e) => handleStatusChange(post, e.target.value as ArticleStatus)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-950 border transition-all cursor-pointer ${
                        post.status === 'published'
                          ? 'text-emerald-400 border-emerald-500/30'
                          : post.status === 'review'
                          ? 'text-amber-400 border-amber-500/30'
                          : post.status === 'changes_requested'
                          ? 'text-orange-400 border-orange-500/30'
                          : post.status === 'approved'
                          ? 'text-cyan-400 border-cyan-500/30'
                          : post.status === 'archived'
                          ? 'text-rose-400 border-rose-500/30'
                          : 'text-slate-400 border-white/10'
                      }`}
                    >
                      <option value="draft">Draft</option>
                      <option value="review">In Review</option>
                      <option value="changes_requested">Changes Requested</option>
                      <option value="approved">Approved</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td className="p-4 text-slate-400 font-mono">{post.readingTimeMinutes} mins</td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      href={`/insights/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Article"
                      className="inline-flex p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setIsNew(false);
                      }}
                      title="Edit Article"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setPostToDelete(post)}
                      title="Delete Article"
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
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

      {/* Delete Confirmation Modal (Replaces flaky window.confirm) */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-white/15 p-6 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Delete Article?</h3>
                <p className="text-xs text-slate-400">This action is permanent and cannot be undone.</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
              <span className="font-semibold text-white">Title: </span>
              {postToDelete.title}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPostToDelete(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 cursor-pointer transition-colors"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editorial Feedback Modal (for Changes Requested) */}
      {feedbackModalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-white/15 p-6 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-orange-400">
                <MessageSquare className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">Request Changes from Author</h3>
              </div>
              <button
                type="button"
                onClick={() => setFeedbackModalPost(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-300">
              Article: <span className="font-bold text-white">{feedbackModalPost.title}</span>
            </div>

            <form onSubmit={handleSaveFeedback} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Editorial Feedback & Instructions *
                </label>
                <textarea
                  required
                  rows={4}
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  placeholder="Explain what needs adjustment (e.g. Please clarify paragraph 3, add real-world benchmark metrics, or verify citation sources)..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setFeedbackModalPost(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-bold cursor-pointer transition-colors"
                >
                  Submit Changes Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit / Create Article Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100">
            <button
              onClick={() => setEditingPost(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-white mb-4">
              {isNew ? 'New Article Draft' : `Edit: ${editingPost.title}`}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Workflow Status</label>
                  <select
                    value={editingPost.status}
                    onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as ArticleStatus })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer"
                  >
                    <option value="draft">Draft</option>
                    <option value="review">In Review</option>
                    <option value="changes_requested">Changes Requested</option>
                    <option value="approved">Approved</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Read Time (mins)</label>
                  <input
                    type="number"
                    value={editingPost.readingTimeMinutes}
                    onChange={(e) => setEditingPost({ ...editingPost, readingTimeMinutes: parseInt(e.target.value) || 5 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Excerpt / Subtitle *</label>
                <textarea
                  rows={2}
                  required
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Article Content (Markdown) *</label>
                <textarea
                  rows={8}
                  required
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold cursor-pointer"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
