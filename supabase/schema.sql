-- OBLIQUETECH DATABASE SCHEMA (PostgreSQL / Supabase)
-- Full relational architecture with Row Level Security (RLS) policies

-- 1. Services & Service Categories
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- 2. Portfolio Projects
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- 3. Authors
CREATE TABLE IF NOT EXISTS authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- 4. Blog Posts (Oblique Insights)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'published')),
  reading_time_minutes INT DEFAULT 5,
  cover_image TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT FALSE,
  seo_title TEXT,
  seo_description TEXT
);

-- 5. FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL,
  display_order INT DEFAULT 0,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Testimonials / Reviews (Submit -> Pending -> Approved -> Published)
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- 7. Contact Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'archived'))
);

-- 8. Call Scheduling Requests
CREATE TABLE IF NOT EXISTS call_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- 9. Interactive Project Wizard Inquiries
CREATE TABLE IF NOT EXISTS project_wizard_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- 10. Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'current_settings',
  company_name TEXT NOT NULL DEFAULT 'ObliqueTech',
  tagline TEXT NOT NULL DEFAULT 'See Business Differently.',
  tagline_sub TEXT NOT NULL DEFAULT 'Technology solutions designed around your goals, built for the future, and delivered with clarity, quality, and commitment.',
  email TEXT NOT NULL DEFAULT 'contact@obliquetech.com',
  phone TEXT NOT NULL DEFAULT '+1 (555) 019-2834',
  whatsapp_number TEXT NOT NULL DEFAULT '+15550192834',
  office_address TEXT NOT NULL DEFAULT 'Global Technology Operations & Digital Hub',
  google_maps_url TEXT,
  linkedin_url TEXT DEFAULT 'https://linkedin.com/company/obliquetech',
  twitter_url TEXT DEFAULT 'https://twitter.com/obliquetech',
  github_url TEXT DEFAULT 'https://github.com/obliquetech',
  mission_statement TEXT NOT NULL,
  vision_statement TEXT NOT NULL,
  trust_strip_statements JSONB NOT NULL DEFAULT '["Client-Centric Approach", "Quality-Driven Development", "Transparent Communication", "Scalable Technology", "Global Collaboration"]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Setup
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_wizard_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Allow public read on published services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read on published portfolio" ON portfolio_projects FOR SELECT USING (published = true);
CREATE POLICY "Allow public read on authors" ON authors FOR SELECT USING (true);
CREATE POLICY "Allow public read on published posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Allow public read on published faqs" ON faqs FOR SELECT USING (published = true);
CREATE POLICY "Allow public read on approved testimonials" ON testimonials FOR SELECT USING (status = 'approved');
CREATE POLICY "Allow public read on site settings" ON site_settings FOR SELECT USING (true);

-- Public Insert Policies (Inquiries & Form Submissions)
CREATE POLICY "Allow public insert contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert call_requests" ON call_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert project_wizard_inquiries" ON project_wizard_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert testimonials" ON testimonials FOR INSERT WITH CHECK (status = 'pending');
