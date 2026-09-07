export type ProjectStatus = 'completed' | 'ongoing';

export type ServiceSlug = 
  | 'web-development'
  | 'it-consulting'
  | 'ai-ml'
  | 'ui-ux-design'
  | 'mobile-app-development'
  | 'software-development'
  | 'digital-marketing';

export interface ServiceItem {
  id: string;
  slug: ServiceSlug;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  badge: string;
  accent: 'gold' | 'blue' | 'violet' | 'cyan';
  businessValue: string;
  problemStatement: string;
  whatWeProvide: string[];
  capabilities: string[];
  typicalUseCases: { title: string; desc: string }[];
  technologies: string[];
  deliverables: string[];
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  clientIndustry: string;
  status: ProjectStatus;
  category: 'Web' | 'Mobile' | 'AI/ML' | 'SaaS' | 'UI/UX' | 'Software';
  problem: string;
  approach: string;
  solution: string;
  features: string[];
  technologies: string[];
  metricsOrHighlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  coverImage: string;
  galleryImages: string[];
  published: boolean;
  featured: boolean;
  order: number;
}

export interface AuthorProfile {
  id: string;
  slug: string;
  fullName: string;
  title: string;
  bio: string;
  expertise: string[];
  avatarUrl: string;
  linkedInUrl?: string;
  twitterUrl?: string;
  githubUrl?: string;
}

export type ArticleStatus = 'draft' | 'review' | 'approved' | 'published';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or rich text
  category: string;
  authorId: string;
  publishedAt: string;
  updatedAt: string;
  status: ArticleStatus;
  readingTimeMinutes: number;
  coverImage: string;
  tags: string[];
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Services' | 'Process' | 'Security & Tech' | 'Pricing & Engagement';
  order: number;
  published: boolean;
}

export interface TestimonialSubmission {
  id: string;
  clientName: string;
  company: string;
  position: string;
  project: string;
  rating: number;
  testimonial: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  featured?: boolean;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'archived';
}

export interface CallRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  reason: string;
  serviceRequired: string;
  projectType: string;
  preferredDate: string;
  preferredTime: string;
  durationMinutes: number;
  requirements: string;
  submittedAt: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface ProjectWizardInquiry {
  id: string;
  projectType: string;
  servicesNeeded: string[];
  coreObjective: string;
  keyFeatures: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  submittedAt: string;
  status: 'new' | 'in-review' | 'contacted' | 'closed';
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  taglineSub: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  officeAddress: string;
  googleMapsUrl?: string;
  linkedInUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
  missionStatement: string;
  visionStatement: string;
  trustStripStatements: string[];
}
