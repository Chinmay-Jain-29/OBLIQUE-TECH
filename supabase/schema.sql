-- =============================================================================
-- OBLIQUETECH COMPLETE DATABASE SCHEMA & SEED SCRIPT
-- Run this script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/dazicvghalnwfryokeyi/sql/new
-- =============================================================================

-- 1. DROP EXISTING TABLES (CLEAN SLATE)
DROP TABLE IF EXISTS blog_media CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS portfolio_projects CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS call_requests CASCADE;
DROP TABLE IF EXISTS project_wizard_inquiries CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- 2. CREATE TABLES WITH TEXT PRIMARY KEYS
CREATE TABLE services (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  badge TEXT NOT NULL,
  accent TEXT NOT NULL DEFAULT 'gold',
  business_value TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  what_we_provide JSONB NOT NULL DEFAULT '[]'::jsonb,
  capabilities JSONB NOT NULL DEFAULT '[]'::jsonb,
  typical_use_cases JSONB NOT NULL DEFAULT '[]'::jsonb,
  technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
  deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
  process JSONB NOT NULL DEFAULT '[]'::jsonb,
  faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE portfolio_projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  client_industry TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('completed', 'ongoing')),
  category TEXT NOT NULL CHECK (category IN ('Web', 'Mobile', 'AI/ML', 'SaaS', 'UI/UX', 'Software')),
  problem TEXT NOT NULL,
  approach TEXT NOT NULL,
  solution TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
  metrics_or_highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
  live_url TEXT,
  github_url TEXT,
  cover_image TEXT NOT NULL,
  gallery_images JSONB NOT NULL DEFAULT '[]'::jsonb,
  published BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE authors (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  expertise JSONB NOT NULL DEFAULT '[]'::jsonb,
  avatar_url TEXT NOT NULL,
  linkedin_url TEXT,
  twitter_url TEXT,
  github_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE blog_posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author_id TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'changes_requested', 'approved', 'published', 'archived')),
  reading_time_minutes INT DEFAULT 5,
  cover_image TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT FALSE,
  seo_title TEXT,
  seo_description TEXT,
  blocks JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE blog_media (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  article_id TEXT NOT NULL,
  author_id TEXT,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size INT NOT NULL,
  width INT,
  height INT,
  alt_text TEXT,
  caption TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('cover', 'content', 'gallery')),
  status TEXT NOT NULL DEFAULT 'uploaded' CHECK (status IN ('uploaded', 'used', 'unused', 'deleted')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE faqs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL,
  display_order INT DEFAULT 0,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  client_name TEXT NOT NULL,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  project TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  testimonial TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  featured BOOLEAN DEFAULT FALSE
);

CREATE TABLE contact_submissions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'archived'))
);

CREATE TABLE call_requests (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT,
  reason TEXT NOT NULL,
  service_required TEXT NOT NULL,
  project_type TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 30,
  requirements TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

CREATE TABLE project_wizard_inquiries (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_type TEXT NOT NULL,
  services_needed JSONB NOT NULL DEFAULT '[]'::jsonb,
  core_objective TEXT NOT NULL,
  key_features TEXT NOT NULL,
  timeline TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in-review', 'contacted', 'closed'))
);

CREATE TABLE site_settings (
  id TEXT PRIMARY KEY DEFAULT 'current_settings',
  company_name TEXT NOT NULL DEFAULT 'ObliqueTech',
  tagline TEXT NOT NULL DEFAULT 'Solutions & Innovation',
  tagline_sub TEXT NOT NULL DEFAULT 'Technology solutions designed around your goals, built for the future, and delivered with clarity, quality, and commitment.',
  email TEXT NOT NULL DEFAULT 'contact@obliquetech.com',
  phone TEXT NOT NULL DEFAULT '+91 9225260237',
  whatsapp_number TEXT NOT NULL DEFAULT '+919225260237',
  office_address TEXT NOT NULL DEFAULT 'Global Technology Hub & Operations',
  google_maps_url TEXT,
  linkedin_url TEXT DEFAULT 'https://linkedin.com/company/obliquetech',
  twitter_url TEXT DEFAULT 'https://twitter.com/obliquetech',
  github_url TEXT DEFAULT 'https://github.com/obliquetech',
  mission_statement TEXT NOT NULL,
  vision_statement TEXT NOT NULL,
  trust_strip_statements JSONB NOT NULL DEFAULT '["Client-Centric Approach", "Quality-Driven Development", "Transparent Communication", "Scalable Technology", "Global Collaboration"]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PERMISSIVE ROW LEVEL SECURITY POLICIES (ENABLES CLIENT & API FULL ACCESS)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public full access services" ON services FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public full access portfolio" ON portfolio_projects FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public full access authors" ON authors FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public full access blog_posts" ON blog_posts FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE blog_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public full access blog_media" ON blog_media FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public full access faqs" ON faqs FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public full access testimonials" ON testimonials FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public full access contact_submissions" ON contact_submissions FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE call_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public full access call_requests" ON call_requests FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE project_wizard_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public full access project_wizard_inquiries" ON project_wizard_inquiries FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public full access site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- 2.1 USER PLATFORM TABLES & EXTENSIONS
ALTER TABLE project_wizard_inquiries ADD COLUMN IF NOT EXISTS user_id TEXT;
ALTER TABLE project_wizard_inquiries ADD COLUMN IF NOT EXISTS project_status TEXT DEFAULT 'submitted';

ALTER TABLE call_requests ADD COLUMN IF NOT EXISTS user_id TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS user_id TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS user_id TEXT;

CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  auth_user_id TEXT NOT NULL,
  full_name TEXT NOT NULL,
  profile_photo TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  country_code TEXT DEFAULT '+91',
  company_name TEXT,
  job_title TEXT,
  bio TEXT,
  country TEXT,
  city TEXT,
  linkedin TEXT,
  website TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'author', 'editor', 'admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public select profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (true);

CREATE TABLE IF NOT EXISTS user_activities (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public access user_activities" ON user_activities FOR ALL USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS user_notifications (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'action')),
  read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public access user_notifications" ON user_notifications FOR ALL USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS user_feedback (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  category TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewing', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public access user_feedback" ON user_feedback FOR ALL USING (true) WITH CHECK (true);

-- 3.1 STORAGE BUCKETS & OPEN OBJECT POLICIES (FOR BLOG MEDIA & USER AVATARS)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-media', 'blog-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('user-avatars', 'user-avatars', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public storage select blog-media" ON storage.objects;
CREATE POLICY "Public storage select blog-media" ON storage.objects FOR SELECT USING (bucket_id IN ('blog-media', 'user-avatars'));

DROP POLICY IF EXISTS "Public storage insert blog-media" ON storage.objects;
CREATE POLICY "Public storage insert blog-media" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('blog-media', 'user-avatars'));

DROP POLICY IF EXISTS "Public storage update blog-media" ON storage.objects;
CREATE POLICY "Public storage update blog-media" ON storage.objects FOR UPDATE USING (bucket_id IN ('blog-media', 'user-avatars'));

DROP POLICY IF EXISTS "Public storage delete blog-media" ON storage.objects;
CREATE POLICY "Public storage delete blog-media" ON storage.objects FOR DELETE USING (bucket_id IN ('blog-media', 'user-avatars'));


-- =============================================================================
-- 4. DIRECT DATA SEEDING (POPULATES ALL TABLES IMMEDIATELY)
-- =============================================================================

-- Seed Author
INSERT INTO authors (id, slug, full_name, title, bio, expertise, avatar_url, linkedin_url, github_url)
VALUES (
  'auth-1',
  'obliquetech-architecture-team',
  'ObliqueTech Engineering Team',
  'Core Architecture & Systems Group',
  'The engineering team at ObliqueTech focuses on scalable systems architecture, applied artificial intelligence, type-safe full-stack development, and pragmatically solving real business bottlenecks.',
  '["Distributed Systems", "Applied AI/ML", "Next.js & TypeScript", "PostgreSQL", "Cloud Infrastructure"]'::jsonb,
  '/avatars/team.png',
  'https://linkedin.com/company/obliquetech',
  'https://github.com/obliquetech'
) ON CONFLICT (id) DO NOTHING;

-- Seed Blog Posts
INSERT INTO blog_posts (id, slug, title, excerpt, content, category, author_id, published_at, updated_at, status, reading_time_minutes, cover_image, tags, featured, seo_title, seo_description)
VALUES
(
  'post-1',
  'why-growing-businesses-need-digital-strategy',
  'Why Every Growing Business Needs a Pragmatic Digital Strategy',
  'Adopting technology without a coherent strategy often introduces unmanageable complexity. Here is how modern businesses align tech investments directly with operational efficiency.',
  'Technology should be a force multiplier, not an operational burden. Yet, many organizations invest in software, subscriptions, and tools without an overarching architectural strategy.

## The Pitfall of Hype-Driven Adoption
In today''s fast-moving market, it is easy to succumb to the latest trends—whether jumping into premature microservices, over-engineered cloud setups, or adopting AI tools without a clear use case. 

When technology choices are made reactively:
* **Tool proliferation** leads to fragmented data silos.
* **Maintenance overhead** drains valuable engineering and operational bandwidth.
* **User experience suffers**, as employees spend more time working around tools rather than serving customers.

## The Oblique Perspective: Clarity First
At ObliqueTech, we believe in approaching technology from a different angle. A pragmatic digital strategy begins with three core questions:

1. **What is the exact friction point?** Is it customer onboarding, order fulfillment, internal communication, or inventory visibility?
2. **What is the simplest reliable architecture that solves it?** Clean monoliths, well-structured relational databases, and focused interfaces often outperform complex distributed setups for 90% of business challenges.
3. **Can the system evolve gracefully?** Systems should be built modularly, allowing features to scale as transaction volume grows without requiring a ground-up rewrite.

## Actionable Steps for Leadership
* **Audit your current stack:** Identify duplicate tools and unintegrated spreadsheets.
* **Prioritize high-impact bottlenecks:** Focus engineering capital on the top 2 workflows that directly impact customer satisfaction or revenue.
* **Insist on type safety and documentation:** A codebase that is clean and documented is an asset; an opaque system is technical debt.

By focusing on clarity, trust, and measurable outcomes, businesses can build technology that stands the test of time.',
  'Business Technology',
  'auth-1',
  '2026-08-20T10:00:00Z',
  '2026-08-20T10:00:00Z',
  'published',
  5,
  '/insights/strategy.jpg',
  '["Digital Transformation", "Architecture", "Strategy", "Scalability"]'::jsonb,
  true,
  'Why Growing Businesses Need a Pragmatic Digital Strategy | ObliqueTech',
  'Learn how to align technology investments with operational outcomes, avoiding expensive technical debt and hype-driven architectural choices.'
),
(
  'post-2',
  'ai-in-business-where-automation-creates-value',
  'AI in Business: Where Automation Actually Creates Measurable Value',
  'Moving past the marketing noise: how practical organizations deploy domain-specific AI, document extraction, and semantic search to cut cycle times without compromising accuracy.',
  'Artificial intelligence has captivated public attention, but in commercial applications, the true measure of AI is simple: **does it reliably reduce operational cycle times or unlock actionable intelligence?**

## The Difference Between Demos and Production Systems
A prototype that answers a question 80% of the time is exciting in a lab, but unacceptable in business workflows like legal compliance, medical record analysis, or financial accounting.

Production-grade AI requires:
* **Strict Evidence Retrieval (RAG):** Grounding responses in verified company documentation rather than general model knowledge.
* **Deterministic Guardrails:** Ensuring the system gracefully declines to answer when supporting context is ambiguous or absent.
* **Data Sovereignty:** Protecting customer and proprietary data so that confidential information never leaks to public training sets.

## High-Value Commercial AI Applications Today
1. **Intelligent Document Parsing:** Transforming unstructured invoices, contracts, and inspection PDFs into clean, validated JSON schemas.
2. **Internal Knowledge Systems:** Giving support and operational teams instant, cited access to decades of standard operating procedures and technical manuals.
3. **Predictive Anomaly Detection:** Monitoring industrial sensors or transactional ledgers to flag deviations hours before system failure.

At ObliqueTech, we approach AI with engineering rigor: validating data quality first, establishing strict evaluation benchmarks, and delivering systems that earn user trust through accuracy and reliability.',
  'Artificial Intelligence',
  'auth-1',
  '2026-08-28T14:30:00Z',
  '2026-08-28T14:30:00Z',
  'published',
  6,
  '/insights/ai-value.jpg',
  '["AI/ML", "Automation", "RAG", "Enterprise"]'::jsonb,
  false,
  'AI in Business: Where Automation Creates Value | ObliqueTech',
  'Explore pragmatic business applications of AI, RAG, and intelligent document processing with strict data privacy and verified citations.'
),
(
  'post-3',
  'what-engineering-students-should-learn-beyond-classroom',
  'What Engineering Students Should Learn Beyond the Classroom',
  'The experience gap is real: companies expect production familiarity while schools focus on theory. Here are the practical skills that bridge the gap.',
  'One of the founding observations behind ObliqueTech was the stark disparity between traditional academic curricula and the day-to-day realities of production software engineering.

Students are frequently asked to demonstrate experience before they have been afforded the opportunity to gain it.

## The Missing Pieces in Traditional Education
While computer science degree programs excel at teaching algorithmic theory and foundational logic, they often omit critical aspects of collaborative engineering:

1. **Version Control in Teams:** Branching strategies, pull request reviews, handling merge conflicts, and writing descriptive commit histories.
2. **Architecture and Maintainability:** Designing systems that someone else will have to read, debug, and maintain five years down the road.
3. **Observability & Debugging:** Reading production logs, understanding latency profiles, monitoring database connection pools, and tracing distributed failures.
4. **Product Empathy:** Understanding that the finest algorithm is useless if the user cannot navigate the interface or if the solution does not solve the core business problem.

## How to Build Genuine Experience
* **Contribute to Open Source or Team Projects:** Building in isolation teaches syntax; building with others teaches communication, code reviews, and API contracts.
* **Deploy to Production:** Do not stop at `localhost`. Deploy your project to a cloud provider, configure a custom domain, set up SSL, and connect continuous integration (CI/CD).
* **Participate in Mentorship & Hackathons:** Engaging with experienced practitioners exposes you to how real technical trade-offs are decided.

At ObliqueTech, practical hands-on experience and mentorship remain a fundamental part of our DNA. We believe the future belongs to engineers who can think critically, build intelligently, and bridge the gap between concept and production.',
  'Career & Student Technology',
  'auth-1',
  '2026-09-02T09:00:00Z',
  '2026-09-02T09:00:00Z',
  'published',
  5,
  '/insights/education.jpg',
  '["Education", "Engineering", "Mentorship", "Careers"]'::jsonb,
  false,
  'What Engineering Students Should Learn Beyond the Classroom | ObliqueTech',
  'Bridging the experience gap: essential practical software engineering skills, version control, and production architectures that matter in the real world.'
) ON CONFLICT (id) DO NOTHING;

-- Seed Services
INSERT INTO services (id, slug, title, short_description, full_description, icon_name, badge, accent, business_value, problem_statement, what_we_provide, capabilities, typical_use_cases, technologies, deliverables, process, faqs)
VALUES
(
  'srv-1',
  'web-development',
  'Web Development',
  'Scalable, modern, high-performance web applications and enterprise platforms built with clean architecture.',
  'We engineer robust web applications designed for reliability, speed, and long-term maintainability. From complex SaaS dashboards to responsive customer-facing portals, our solutions are architected to scale with your organization.',
  'Globe',
  'Core Service',
  'blue',
  'Accelerates time-to-market, ensures 99.9% availability, and delivers high-converting digital customer experiences.',
  'Modern businesses struggle with bloated legacy architectures, slow load times, fragile codebases, and poor cross-device responsiveness that directly hurt user conversion and operational efficiency.',
  '["Custom Full-Stack Web Application Engineering", "Modern Next.js / React Architecture & Micro-Frontends", "High-Performance Headless CMS & E-Commerce Implementations", "Cloud Integration, API Gateway & Microservices Design", "Progressive Web Apps (PWA) with Offline Capability", "Comprehensive Automated Testing & CI/CD Pipelines"]'::jsonb,
  '["Server-Side Rendering (SSR) & Static Optimization", "Type-Safe Full Stack TypeScript Development", "Real-Time WebSockets & Event-Driven Workflows", "Granular Performance Optimization (Core Web Vitals)", "Enterprise Accessibility (WCAG 2.1 AA Compliance)", "Zero-Trust Security & End-to-End Encryption"]'::jsonb,
  '[{"title": "SaaS Platforms", "desc": "Multi-tenant applications with billing, authentication, role-based controls, and analytics dashboards."}, {"title": "Customer Portals", "desc": "Secure self-service client portals for financial, healthcare, and enterprise services."}]'::jsonb,
  '["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Docker", "Redis"]'::jsonb,
  '["Production-Ready Source Codebase with CI/CD", "Interactive Component Design System & Documentation", "Security Audit & Performance Scorecard"]'::jsonb,
  '[{"step": "01", "title": "Architecture Discovery", "description": "Deep-dive into business workflows, domain model, scale requirements, and technical constraints."}, {"step": "02", "title": "System Blueprint", "description": "Designing data model, API contracts, security perimeter, and modular component hierarchy."}]'::jsonb,
  '[{"question": "What tech stack do you recommend?", "answer": "Next.js/TypeScript with Node.js/PostgreSQL for stellar performance and SEO."}]'::jsonb
),
(
  'srv-2',
  'it-consulting',
  'IT Consulting & Strategy',
  'Technology strategy, systems architecture, digital transformation, and technical advisory for growing businesses.',
  'Navigate complex technology decisions with clarity. We help founders and enterprise leaders make pragmatic architectural choices, avoid expensive technical debt, and align engineering execution directly with commercial goals.',
  'Compass',
  'Advisory',
  'gold',
  'Eliminates costly engineering missteps, reduces infrastructure overhead, and establishes a future-proof technology roadmap.',
  'Businesses often spend months and capital building the wrong tech stack, choosing hype-driven tools over pragmatic solutions, or drowning in unmaintainable legacy code without clear architectural oversight.',
  '["Technology Stack Selection & Due Diligence", "System Architecture & Cloud Infrastructure Audits", "Digital Transformation & Modernization Blueprints", "Engineering Best Practices & Codebase Quality Reviews"]'::jsonb,
  '["Distributed Systems Architecture Design", "Cloud Migration & Cost Optimization (AWS, GCP, Azure)", "Database Schema Optimization & Query Refactoring"]'::jsonb,
  '[{"title": "Pre-Build Architectural Planning", "desc": "Validating technical feasibility and architectural blueprints before committing major development capital."}]'::jsonb,
  '["AWS", "Google Cloud", "Docker", "Kubernetes", "PostgreSQL", "Terraform"]'::jsonb,
  '["Comprehensive Technical Architecture Blueprint", "Infrastructure Cost Optimization Plan"]'::jsonb,
  '[{"step": "01", "title": "Technical Discovery", "description": "Reviewing repositories, environments, and workflows."}]'::jsonb,
  '[{"question": "When is the best time to engage technical consulting?", "answer": "Ideally before making major technology or hiring commitments."}]'::jsonb
),
(
  'srv-3',
  'ai-ml-solutions',
  'AI & Machine Learning Solutions',
  'Pragmatic, domain-specific AI integrations, predictive modeling, document intelligence, and automated intelligent workflows.',
  'Bring actionable intelligence into your operations without the hype. We design domain-grounded artificial intelligence systems—from private document retrieval (RAG) to predictive analytics models—that automate repetitive tasks and deliver verified accuracy.',
  'Cpu',
  'Applied Intelligence',
  'blue',
  'Reduces manual processing time by up to 80%, unlocks deep semantic insights from unstructured data, and improves decision velocity.',
  'Off-the-shelf AI models frequently hallucinate, lack domain context, and pose data privacy risks when exposed to sensitive commercial information.',
  '["Private Enterprise Retrieval-Augmented Generation (RAG)", "Intelligent Document Processing (PDFs, Invoices, Contracts)", "Predictive Maintenance & Telemetry Anomaly Detection Models"]'::jsonb,
  '["Vector Database Engineering (pgvector, Pinecone)", "Strict Citation & Source-Attribution Verification", "Deterministic Output Schema Enforcement"]'::jsonb,
  '[{"title": "Internal Knowledge Retrieval", "desc": "Enabling support and ops teams to query SOPs with verified citations."}]'::jsonb,
  '["Python", "PyTorch", "FastAPI", "LangChain", "OpenAI", "PostgreSQL pgvector"]'::jsonb,
  '["Production-Ready AI Microservice & API Endpoints", "Document Ingestion & Chunking Pipeline"]'::jsonb,
  '[{"step": "01", "title": "Data Feasibility Audit", "description": "Evaluating documentation and data quality."}]'::jsonb,
  '[{"question": "Will our proprietary data be used to train models?", "answer": "Never. We enforce zero-retention enterprise privacy."}]'::jsonb
),
(
  'srv-4',
  'ui-ux-design',
  'UI/UX Design & Product Strategy',
  'Conversion-focused, human-centered product interfaces engineered for clarity, usability, and visual distinction.',
  'Design is not just decoration—it is how your product works. We craft thoughtful user journeys, wireframes, high-fidelity interfaces, and design systems that reduce user cognitive load and drive tangible business conversion.',
  'Layout',
  'Product Design',
  'gold',
  'Increases product adoption, decreases customer support inquiries, and establishes high brand credibility from day one.',
  'Cluttered, unintuitive software frustrates users, leading to high drop-off rates, poor user retention, and expensive developer churn.',
  '["User Research, Persona Mapping & Journey Architecture", "Interactive Wireframing & Rapid Prototyping", "High-Fidelity Interface Design (Figma)", "Comprehensive Design Systems & Component Tokens"]'::jsonb,
  '["Multi-Platform Design (Web, iOS, Android)", "WCAG 2.1 Contrast & Accessibility Engineering", "Micro-Interactions & State Transitions"]'::jsonb,
  '[{"title": "New Product MVP Design", "desc": "Taking concepts to investor-ready high-converting prototypes."}]'::jsonb,
  '["Figma", "Framer", "Tailwind CSS", "Storybook"]'::jsonb,
  '["Full Figma Component Design System", "Interactive Clickable Prototype"]'::jsonb,
  '[{"step": "01", "title": "User Research", "description": "Investigating user workflows and friction points."}]'::jsonb,
  '[{"question": "Do you provide developer-ready Figma files?", "answer": "Yes, built with auto-layout, tokens, and state variants."}]'::jsonb
),
(
  'srv-5',
  'mobile-app-development',
  'Mobile App Development',
  'High-performance cross-platform and native mobile applications for iOS and Android with fluid interactions.',
  'Deliver seamless mobile experiences your users carry everywhere. We build cross-platform apps using React Native and Flutter with native performance, offline support, push notifications, and frictionless onboarding.',
  'Smartphone',
  'Mobile Systems',
  'blue',
  'Deepens customer retention through native device capabilities, instant push notifications, and 60fps smooth touch interaction.',
  'Many mobile apps suffer from battery drain, sluggish animations, poor offline handling, and fragmentation across varying Android and iOS screen dimensions.',
  '["Cross-Platform iOS and Android Development", "Offline-First Architecture & Background Synchronization", "Biometric Authentication (FaceID / TouchID)", "Push Notification Infrastructure & Deep Linking"]'::jsonb,
  '["Single Codebase Multi-Platform Deployment", "Local Encrypted SQLite Storage", "In-App Purchases & Subscription Billing"]'::jsonb,
  '[{"title": "Field Operations App", "desc": "Offline-resilient mobile tools for technicians and inspectors."}]'::jsonb,
  '["React Native", "Expo", "TypeScript", "Flutter", "SQLite"]'::jsonb,
  '["Complete Mobile App Source Code", "iOS (.ipa) and Android (.aab) Release Builds"]'::jsonb,
  '[{"step": "01", "title": "Device & UX Strategy", "description": "Designing platform-specific touch paradigms and offline states."}]'::jsonb,
  '[{"question": "Do we need separate codebases for iOS and Android?", "answer": "No, React Native delivers near-native performance for both from one codebase."}]'::jsonb
),
(
  'srv-6',
  'custom-software-engineering',
  'Custom Software Engineering',
  'Bespoke enterprise platforms, workflow automations, and domain-specific software systems engineered to solve unique bottlenecks.',
  'When off-the-shelf software fails to fit your unique operational workflows, custom engineering delivers decisive competitive advantages. We build custom software tailored precisely to your operational requirements.',
  'Terminal',
  'Enterprise',
  'gold',
  'Completely eliminates third-party subscription bloat, automates bespoke internal processes, and gives your business 100% intellectual property ownership.',
  'Businesses frequently find themselves trapped paying thousands monthly for bloated generic SaaS tools that only fulfill 60% of their operational needs.',
  '["Bespoke Enterprise Resource Platforms", "Complex Workflow & Approval Automation Engines", "Third-Party API Integrations & Webhook Hubs", "High-Throughput ETL & Data Synchronization"]'::jsonb,
  '["Event-Driven Microservices Architecture", "Distributed Task Queues (BullMQ, Celery)", "Multi-Tenant SaaS Architecture"]'::jsonb,
  '[{"title": "Custom Logistics Engine", "desc": "Replacing spreadsheets with a real-time warehouse sync platform."}]'::jsonb,
  '["Node.js", "TypeScript", "Go", "Python", "PostgreSQL", "Redis", "Docker"]'::jsonb,
  '["Full Source Code Repository & Documentation", "Database Schema & Migration Scripts"]'::jsonb,
  '[{"step": "01", "title": "Workflow Dissection", "description": "Mapping every manual step and calculation in your operation."}]'::jsonb,
  '[{"question": "How do you ensure data integrity during migrations?", "answer": "We run shadow verification scripts to verify 100% consistency."}]'::jsonb
),
(
  'srv-7',
  'technical-digital-marketing',
  'Technical Digital Marketing & SEO',
  'Data-driven performance marketing, technical SEO audits, conversion rate optimization, and search visibility engineering.',
  'Marketing without technical precision is guesswork. We combine technical SEO, Core Web Vitals optimization, programmatic landing page architecture, and high-intent analytics tracking to drive sustainable, qualified inbound customer traffic.',
  'TrendingUp',
  'Growth Systems',
  'blue',
  'Lowers customer acquisition cost (CAC), boosts organic search ranking, and converts website visitors into verified sales inquiries.',
  'Companies waste extensive marketing spend driving traffic to slow, poorly structured websites with bad technical SEO and high bounce rates.',
  '["Comprehensive Technical SEO Architecture Audits", "Core Web Vitals & PageSpeed Performance Engineering", "Programmatic SEO & Scalable Content Infrastructure", "Structured Schema Markup (JSON-LD)"]'::jsonb,
  '["Google Search Console Optimization", "JSON-LD Structured Data Engineering", "Server-Side Event Tracking", "Semantic Keyword Architecture"]'::jsonb,
  '[{"title": "Organic Search Growth Engine", "desc": "Restructuring site hierarchy to rank for high-intent B2B search terms."}]'::jsonb,
  '["Google Analytics 4", "PostHog", "Ahrefs", "Next.js SEO", "Schema.org", "Lighthouse"]'::jsonb,
  '["Full Technical SEO & Performance Audit Scorecard", "Structured Schema Implementation Report"]'::jsonb,
  '[{"step": "01", "title": "Crawl & Performance Audit", "description": "Scanning every URL for indexing, speed, and schema issues."}]'::jsonb,
  '[{"question": "How is technical SEO different from standard SEO?", "answer": "Technical SEO ensures search bots crawl and index pages without render blockers or errors."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Seed Portfolio Projects
INSERT INTO portfolio_projects (id, slug, title, short_description, client_industry, status, category, problem, approach, solution, features, technologies, metrics_or_highlights, live_url, github_url, cover_image, gallery_images, published, featured, display_order)
VALUES
(
  'proj-1',
  'cloud-inventory-platform',
  'Multi-Warehouse Cloud Inventory Engine',
  'Real-time stock synchronization, predictive stockout alerts, and automated supplier purchase order routing.',
  'Logistics & Supply Chain',
  'completed',
  'Web',
  'The client struggled with stock reconciliation across 4 regional warehouses, resulting in over $120,000 in annual delayed order cancellations.',
  'We designed a high-throughput event-driven inventory architecture using Next.js, Node.js, and PostgreSQL with atomic database transactions.',
  'Engineered a centralized real-time dashboard featuring automated barcode ingestion, low-stock threshold triggers, and sub-100ms sync.',
  '["Real-Time Multi-Warehouse Stock Ledger", "Automated Low-Stock Email & Webhook Alerts", "Integrated Supplier Purchase Order Generator", "Mobile Barcode Scanning"]'::jsonb,
  '["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Docker", "Redis"]'::jsonb,
  '["Zero Discrepancy Multi-Warehouse Sync", "Sub-100ms Query Latency on 500k+ SKUs", "Offline-Resilient Local Queue"]'::jsonb,
  '#',
  '#',
  '/projects/inventory.jpg',
  '["/projects/inventory-1.jpg", "/projects/inventory-2.jpg"]'::jsonb,
  true,
  true,
  1
),
(
  'proj-2',
  'predictive-analytics-engine',
  'Applied Predictive Analytics Engine',
  'Machine learning pipeline for predictive maintenance, anomaly detection, and real-time sensor metrics.',
  'Industrial & Manufacturing',
  'completed',
  'AI/ML',
  'Industrial equipment downtime was causing unexpected operational delays. Maintenance teams lacked advance warning systems.',
  'Implemented an edge-compatible anomaly detection model trained on historical sensor telemetry, interfaced with a time-series database.',
  'Delivered an end-to-end telemetry dashboard with automated anomaly alerts, predictive failure probability scores, and dispatch hooks.',
  '["Time-Series Sensor Telemetry Ingestion", "Machine Learning Anomaly Detection Pipeline", "Automated Early-Warning Alert Dispatch"]'::jsonb,
  '["Python", "FastAPI", "PyTorch", "PostgreSQL", "React", "TimescaleDB", "Docker"]'::jsonb,
  '["94% Anomaly Detection Accuracy in Pilot Trials", "Predictive Alerts Triggered Up to 48 Hours in Advance", "Scalable Ingestion Handling 10,000 Events/Sec"]'::jsonb,
  '#',
  '#',
  '/projects/analytics.jpg',
  '["/projects/analytics-1.jpg", "/projects/analytics-2.jpg"]'::jsonb,
  true,
  true,
  2
),
(
  'proj-3',
  'healthcare-patient-portal',
  'Secure Patient Care & Appointment Hub',
  'HIPAA-conscious appointment booking, encrypted telemetry messaging, and digital health records access.',
  'Healthcare & Wellness',
  'completed',
  'SaaS',
  'Patients faced fragmented scheduling experiences and delayed lab report delivery due to uncoordinated third-party booking plugins.',
  'We architected a zero-trust, accessible patient portal adhering strictly to modern healthcare privacy standards.',
  'Built a patient-centric application with calendar synchronization, automated SMS reminders, secure PDF lab document vault, and messaging.',
  '["Intuitive Doctor Availability Booking", "Secure Encrypted Messaging", "Lab Results & Document Vault", "WCAG 2.1 AA Accessible Interface"]'::jsonb,
  '["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"]'::jsonb,
  '["Full WCAG 2.1 AA Accessibility Compliance", "Zero-Knowledge Encrypted Document Storage", "Sub-Second Availability Lookups"]'::jsonb,
  '#',
  '#',
  '/projects/healthcare.jpg',
  '["/projects/healthcare-1.jpg", "/projects/healthcare-2.jpg"]'::jsonb,
  true,
  true,
  3
),
(
  'proj-4',
  'knowledge-graph-assistant',
  'Enterprise Semantic Knowledge Graph (Ongoing)',
  'Domain-specific retrieval and graph-augmented intelligence system for complex corporate documents.',
  'Legal & Corporate Technology',
  'ongoing',
  'AI/ML',
  'Organizations struggle to cross-reference multi-thousand page regulatory filings using traditional keyword search.',
  'Combining graph database relationships with dense vector embeddings to form a hybrid Graph-RAG retrieval system.',
  'Active development of a visual query interface allowing analysts to search via natural language and view verified citations.',
  '["Hybrid Vector & Knowledge Graph Hybrid Retrieval", "Entity Extraction & Relationship Mapping Across Documents", "Strict Evidence Citation"]'::jsonb,
  '["Python", "LangChain", "Neo4j", "PostgreSQL pgvector", "Next.js", "TypeScript"]'::jsonb,
  '["Active Development Milestone 3 of 5 Completed", "Pilot Testing with Over 250,000 Regulatory Pages"]'::jsonb,
  '#',
  '#',
  '/projects/graph.jpg',
  '["/projects/graph-1.jpg"]'::jsonb,
  true,
  false,
  4
),
(
  'proj-5',
  'cross-platform-field-suite',
  'Cross-Platform Field Operations Suite (Ongoing)',
  'Mobile companion application for on-site inspection teams with offline synchronization and photo tagging.',
  'Infrastructure & Field Services',
  'ongoing',
  'Mobile',
  'Field technicians working in remote or subterranean zones operate without cellular reception, making cloud entry impossible.',
  'Building an offline-first mobile architecture utilizing local SQLite storage, automatic conflict resolution, and background sync queues.',
  'Developing an intuitive mobile application for iOS and Android that lets technicians complete comprehensive checklists and annotate photos.',
  '["Offline-First Local SQLite Database with Auto-Sync", "On-Device Image Annotation & GPS Geotagging", "Dynamic Checklist Engine"]'::jsonb,
  '["React Native", "Expo", "TypeScript", "SQLite", "Node.js", "PostgreSQL"]'::jsonb,
  '["Zero Data Loss Across Simulated Offline Drops", "Sub-50ms Local Form Interaction Response Times"]'::jsonb,
  '#',
  '#',
  '/projects/mobile-field.jpg',
  '["/projects/mobile-field-1.jpg"]'::jsonb,
  true,
  false,
  5
) ON CONFLICT (id) DO NOTHING;

-- Seed FAQs
INSERT INTO faqs (id, category, question, answer, display_order, published)
VALUES
('faq-1', 'General', 'What services does ObliqueTech provide?', 'ObliqueTech is a full-service technology company offering Web Development, IT Consulting & Strategy, AI / Machine Learning solutions, UI/UX Design, Mobile App Development, Custom Software Engineering, and Technical Digital Marketing.', 1, true),
('faq-2', 'General', 'What does the name "Oblique" signify in your brand philosophy?', 'The word "Oblique" means approaching something from a different perspective. We believe businesses should not merely copy conventional, bloated paths. We help organizations look at their technical and commercial bottlenecks from a fresh angle: thinking differently, building intelligently, and moving faster.', 2, true),
('faq-3', 'Process', 'How do I start a project with ObliqueTech?', 'You can begin by using our interactive "Start a Project" discovery wizard or scheduling a direct 30–45 minute introductory consultation via our "Schedule a Call" page. We will discuss your goals, assess technical requirements, and deliver a transparent project roadmap.', 3, true),
('faq-4', 'Process', 'How long does a typical development project take?', 'Timelines vary according to project scope. A focused MVP or tailored web platform typically takes 4 to 8 weeks. Larger enterprise architectures, complex AI workflows, or comprehensive multi-platform suites generally span 2 to 4 months with continuous sprint releases.', 4, true),
('faq-5', 'General', 'Do you work with international clients and startups?', 'Yes. We collaborate with startups, established SMEs, and international clients globally. We maintain transparent asynchronous workflows, clear milestone tracking, and regular video syncs tailored to your timezone.', 5, true),
('faq-6', 'Services', 'Can you modernize our existing legacy system without a total rewrite?', 'Yes. We specialize in incremental modernization. Using proven architectural patterns like the strangler fig or microservices, we can replace critical legacy bottlenecks step-by-step while keeping your existing business operations live and stable.', 6, true),
('faq-7', 'Services', 'Can you integrate AI or LLMs into our existing applications?', 'Yes. We engineer secure API endpoints and private Retrieval-Augmented Generation (RAG) pipelines that connect directly into your existing databases and software, enabling smart search, automated document processing, and conversational agents with strict privacy.', 7, true),
('faq-8', 'Process', 'Who owns the intellectual property and code created during the project?', 'You retain 100% full ownership of all intellectual property, source code, designs, and digital assets upon completion and milestone settlement. We provide complete repositories and technical documentation.', 8, true),
('faq-9', 'Security & Tech', 'How do you handle security and data protection?', 'Security is baked into our engineering from day one. We enforce OWASP security practices, HTTPS encryption in transit and at rest, role-based access control (RBAC), environment variable isolation, and automated dependency vulnerability scanning.', 9, true),
('faq-10', 'General', 'Can students or early-career engineers approach ObliqueTech for project opportunities?', 'Yes! Oblique originated from observing the real-world experience gap faced by engineering students. We regularly support mentorship, hackathon participation, practical project collaboration, and tech speaker sessions.', 10, true),
('faq-11', 'Pricing & Engagement', 'What is your pricing and engagement model?', 'We provide transparent, milestone-based fixed scopes for well-defined projects, as well as dedicated sprint-based retained engineering teams for evolving products. We never surprise clients with hidden fees or inflated complexity.', 11, true),
('faq-12', 'Services', 'Do you provide post-launch maintenance and continuous support?', 'Yes. Every project includes post-launch monitoring and warranty support. We also provide ongoing SLA-backed maintenance agreements covering server uptime, security patching, library upgrades, and continuous feature expansion.', 12, true)
ON CONFLICT (id) DO NOTHING;

-- Seed Testimonials
INSERT INTO testimonials (id, client_name, company, position, project, rating, testimonial, status, submitted_at, featured)
VALUES
('test-1', 'David Vance', 'Apex Logistics Global', 'VP of Technology', 'Cloud Inventory Platform', 5, 'ObliqueTech redesigned our logistics engine with incredible precision. Real-time fleet synchronization slashed our warehouse latency by 68%.', 'approved', '2026-01-15T10:00:00.000Z', true),
('test-2', 'Elena Rostova', 'MedData Health Systems', 'Chief Information Officer', 'Healthcare Patient Portal', 5, 'The engineering standards and clean HIPAA-compliant architectural discipline ObliqueTech brought to our platform exceeded all expectations.', 'approved', '2026-02-10T14:30:00.000Z', true)
ON CONFLICT (id) DO NOTHING;

-- Seed Site Settings
INSERT INTO site_settings (id, company_name, tagline, tagline_sub, email, phone, whatsapp_number, office_address, google_maps_url, linkedin_url, twitter_url, github_url, mission_statement, vision_statement, trust_strip_statements)
VALUES (
  'current_settings',
  'ObliqueTech',
  'Solutions & Innovation',
  'Technology solutions designed around your goals, built for the future, and delivered with clarity, quality, and commitment.',
  'contact@obliquetech.com',
  '+91 9225260237',
  '+919225260237',
  'Global Technology Hub & Operations',
  '',
  'https://linkedin.com/company/obliquetech',
  'https://twitter.com/obliquetech',
  'https://github.com/obliquetech',
  'To build meaningful technology solutions that solve real problems, create opportunities, and help people and businesses move confidently into the future.',
  'To build products and technology businesses that solve problems at scale, compete globally, and create lasting impact.',
  '["Client-Centric Approach", "Quality-Driven Development", "Transparent Communication", "Scalable Technology", "Global Collaboration"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  company_name = EXCLUDED.company_name,
  tagline = EXCLUDED.tagline,
  tagline_sub = EXCLUDED.tagline_sub,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  whatsapp_number = EXCLUDED.whatsapp_number,
  office_address = EXCLUDED.office_address,
  linkedin_url = EXCLUDED.linkedin_url,
  twitter_url = EXCLUDED.twitter_url,
  github_url = EXCLUDED.github_url,
  mission_statement = EXCLUDED.mission_statement,
  vision_statement = EXCLUDED.vision_statement,
  trust_strip_statements = EXCLUDED.trust_strip_statements;
