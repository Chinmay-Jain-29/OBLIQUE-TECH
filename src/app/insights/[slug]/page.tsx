import React from 'react';
import { Metadata } from 'next';
import { INITIAL_POSTS } from '@/lib/store';
import { InsightDetailView } from '@/components/insights/InsightDetailView';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return INITIAL_POSTS.map((p) => ({
    slug: p.slug,
  }));
}

function findServerPost(slug: string) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();
  // ONLY match exact slug on the server so other dynamic client articles are not hijacked
  return INITIAL_POSTS.find((p) => p.slug.toLowerCase() === cleanSlug) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = findServerPost(slug);

  if (!post) {
    return {
      title: 'Oblique Insights | Technology & Engineering Perspectives',
      description: 'Explore technology from a different perspective with ObliqueTech insights.',
    };
  }

  return {
    title: `${post.title} | Oblique Insights`,
    description: post.excerpt,
  };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const serverPost = findServerPost(slug);

  return (
    <InsightDetailView
      slug={slug}
      initialPost={serverPost}
    />
  );
}
