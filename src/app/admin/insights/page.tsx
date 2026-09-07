'use client';

import React, { useState, useEffect } from 'react';
import { obliqueStore } from '@/lib/store';
import { BlogPost, ArticleStatus } from '@/types';
import { Plus, Edit2, Trash2, Eye, FileText, CheckCircle2, Clock, X } from 'lucide-react';

export default function AdminInsightsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setPosts(obliqueStore.getPosts());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Delete this article?')) {
      obliqueStore.deletePost(id);
      setPosts(obliqueStore.getPosts());
    }
  };

  const handleStatusChange = (post: BlogPost, newStatus: ArticleStatus) => {
    const updated = { ...post, status: newStatus };
    obliqueStore.savePost(updated);
    setPosts(obliqueStore.getPosts());
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    obliqueStore.savePost(editingPost);
    setPosts(obliqueStore.getPosts());
    setEditingPost(null);
    setIsNew(false);
  };

  const handleOpenNew = () => {
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug: 'new-insight',
      title: 'New Engineering Perspective',
      excerpt: 'Brief overview of the technical insights discussed...',
      content: '## Introduction\nDetailed explanation of the problem...\n\n## Implementation\nPractical steps and architectural choices...',
      category: 'Business Technology',
      authorId: 'auth-1',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft',
      readingTimeMinutes: 5,
      coverImage: '/insights/default.jpg',
      tags: ['Engineering', 'Strategy'],
      featured: false
    };
    setEditingPost(newPost);
    setIsNew(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Oblique Insights (Blog CMS)</h1>
          <p className="text-xs text-slate-400 mt-1">
            Article editorial workflow: Draft → Review → Approved → Published.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all"
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
                    <div>{post.title}</div>
                    <div className="text-[10px] text-slate-500 font-mono">/insights/{post.slug}</div>
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
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-950 border border-white/10 ${
                        post.status === 'published'
                          ? 'text-emerald-400 border-emerald-500/30'
                          : post.status === 'review'
                          ? 'text-amber-400 border-amber-500/30'
                          : 'text-slate-400'
                      }`}
                    >
                      <option value="draft">Draft</option>
                      <option value="review">Under Review</option>
                      <option value="approved">Approved</option>
                      <option value="published">Published</option>
                    </select>
                  </td>
                  <td className="p-4 text-slate-400 font-mono">{post.readingTimeMinutes} mins</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setIsNew(false);
                      }}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
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

      {/* Edit / Create Article Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100">
            <button
              onClick={() => setEditingPost(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
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
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
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
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="approved">Approved</option>
                    <option value="published">Published</option>
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
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
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
