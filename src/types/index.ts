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
  websiteUrl?: string;
  isComplete?: boolean;
}

export interface AuthorUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'author' | 'editor' | 'admin';
  createdAt: string;
  profileCompleted: boolean;
}

export type ArticleStatus = 'draft' | 'review' | 'changes_requested' | 'approved' | 'published' | 'archived';

export interface ReviewFeedback {
  id: string;
  reviewerName: string;
  reviewerRole: string;
  date: string;
  comment: string;
  status: 'changes_requested' | 'approved';
}

export type BlockType = 
  | 'paragraph'
  | 'heading'
  | 'key_points'
  | 'callout'
  | 'quote'
  | 'image'
  | 'gallery'
  | 'video'
  | 'code'
  | 'table'
  | 'divider'
  | 'bullet_list'
  | 'numbered_list'
  | 'checklist';

export interface MediaRecord {
  id: string;
  articleId: string;
  authorId: string;
  storagePath: string;
  publicUrl: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  width?: number;
  height?: number;
  altText?: string;
  caption?: string;
  mediaType: 'cover' | 'content' | 'gallery';
  status: 'uploaded' | 'used' | 'unused' | 'deleted';
  createdAt: string;
  updatedAt: string;
}

export interface EditorBlock {
  id: string;
  type: BlockType;
  content: string; // text content, or primary markdown string
  level?: 1 | 2 | 3 | 4; // for headings
  align?: 'left' | 'center' | 'right' | 'justify';
  textColor?: string;
  highlightColor?: string;
  items?: string[]; // for lists and key points
  checkItems?: { text: string; checked: boolean }[]; // for checklists
  calloutTone?: 'info' | 'tip' | 'warning' | 'accent';
  quoteAuthor?: string;
  imageUrl?: string;
  previewUrl?: string; // transient preview during active upload
  uploadStatus?: 'idle' | 'uploading' | 'uploaded' | 'failed';
  uploadProgress?: number;
  mediaId?: string;
  storagePath?: string;
  errorMessage?: string;
  imageCaption?: string;
  imageAlt?: string;
  imageAlignment?: 'left' | 'center' | 'right' | 'full';
  imageSize?: 'sm' | 'md' | 'lg' | 'full';
  galleryImages?: { url: string; caption?: string; alt?: string; mediaId?: string; storagePath?: string }[];
  videoUrl?: string;
  codeLanguage?: string;
  tableHeaders?: string[];
  tableRows?: string[][];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or compiled text
  blocks?: EditorBlock[]; // Rich block-based content
  category: string;
  authorId: string;
  authorProfile?: AuthorProfile;
  publishedAt: string;
  updatedAt: string;
  status: ArticleStatus;
  readingTimeMinutes: number;
  wordCount?: number;
  coverImage: string;
  coverMediaId?: string;
  coverStoragePath?: string;
  tags: string[];
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  reviewFeedback?: ReviewFeedback[];
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
  userId?: string;
}

export interface ContactSubmission {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'archived';
}

export type DetailedCallStatus = 'requested' | 'confirmed' | 'completed' | 'cancelled';

export interface CallRequest {
  id: string;
  userId?: string;
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

export type DetailedProjectStatus = 
  | 'draft' 
  | 'submitted' 
  | 'reviewing' 
  | 'discussion' 
  | 'approved' 
  | 'in_progress' 
  | 'completed' 
  | 'on_hold' 
  | 'cancelled';

export interface ProjectWizardInquiry {
  id: string;
  userId?: string;
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
  projectStatus?: DetailedProjectStatus;
}

export type UserRole = 'user' | 'author' | 'editor' | 'admin' | 'super_admin';

export interface UserProfile {
  id: string;
  authUserId: string;
  fullName: string;
  email: string;
  phone?: string;
  countryCode?: string;
  companyName?: string;
  jobTitle?: string;
  bio?: string;
  country?: string;
  city?: string;
  profilePhoto?: string;
  avatarUrl?: string;
  linkedin?: string;
  linkedinUrl?: string;
  website?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type UserActivityType = 
  | 'login' 
  | 'logout' 
  | 'profile_update' 
  | 'project_inquiry' 
  | 'inquiry_sent'
  | 'call_scheduled' 
  | 'feedback_submitted' 
  | 'review_submitted' 
  | 'article_draft' 
  | 'article_submitted' 
  | 'article_published' 
  | 'password_changed';

export interface UserActivity {
  id: string;
  userId: string;
  type: UserActivityType;
  title: string;
  description?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface UserNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'action';
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface UserFeedbackItem {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  category: 'general' | 'project' | 'service' | 'feature_request' | 'bug_report';
  rating: number;
  message: string;
  status: 'submitted' | 'reviewing' | 'resolved';
  createdAt: string;
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
