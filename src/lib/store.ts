import { 
  ServiceItem, 
  PortfolioProject, 
  BlogPost, 
  AuthorProfile, 
  AuthorUser,
  ReviewFeedback,
  FAQItem, 
  TestimonialSubmission, 
  ContactSubmission, 
  CallRequest, 
  ProjectWizardInquiry, 
  SiteSettings,
  MediaRecord,
  UserProfile,
  UserRole,
  UserActivity,
  UserNotification,
  UserFeedbackItem,
  UserActivityType
} from '@/types';
import { supabase, isSupabaseConfigured } from './supabaseClient';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'web-development',
    title: 'Web Development',
    shortDescription: 'Scalable, modern, high-performance web applications and enterprise platforms built with clean architecture.',
    fullDescription: 'We engineer robust web applications designed for reliability, speed, and long-term maintainability. From complex SaaS dashboards to responsive customer-facing portals, our solutions are architected to scale with your organization.',
    iconName: 'Globe',
    badge: 'Core Service',
    accent: 'blue',
    businessValue: 'Accelerates time-to-market, ensures 99.9% availability, and delivers high-converting digital customer experiences.',
    problemStatement: 'Modern businesses struggle with bloated legacy architectures, slow load times, fragile codebases, and poor cross-device responsiveness that directly hurt user conversion and operational efficiency.',
    whatWeProvide: [
      'Custom Full-Stack Web Application Engineering',
      'Modern Next.js / React Architecture & Micro-Frontends',
      'High-Performance Headless CMS & E-Commerce Implementations',
      'Cloud Integration, API Gateway & Microservices Design',
      'Progressive Web Apps (PWA) with Offline Capability',
      'Comprehensive Automated Testing & CI/CD Pipelines'
    ],
    capabilities: [
      'Server-Side Rendering (SSR) & Static Optimization',
      'Type-Safe Full Stack TypeScript Development',
      'Real-Time WebSockets & Event-Driven Workflows',
      'Granular Performance Optimization (Core Web Vitals)',
      'Enterprise Accessibility (WCAG 2.1 AA Compliance)',
      'Zero-Trust Security & End-to-End Encryption'
    ],
    typicalUseCases: [
      { title: 'SaaS Platforms', desc: 'Multi-tenant applications with billing, authentication, role-based controls, and analytics dashboards.' },
      { title: 'Customer Portals', desc: 'Secure self-service client portals for financial, healthcare, and enterprise services.' },
      { title: 'Enterprise Digital Systems', desc: 'Internal operations platforms replacing fragmented spreadsheets and legacy desktop tools.' }
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Redis'],
    deliverables: [
      'Production-Ready Source Codebase with CI/CD',
      'Interactive Component Design System & Documentation',
      'Security Audit & Performance Scorecard',
      'Deployment Scripts & Cloud Infrastructure As Code',
      'Comprehensive Technical Handover & Maintenance Guide'
    ],
    process: [
      { step: '01', title: 'Architecture Discovery', description: 'Deep-dive into your business workflows, domain model, scale requirements, and technical constraints.' },
      { step: '02', title: 'System Blueprint', description: 'Designing the data model, API contracts, security perimeter, and modular component hierarchy.' },
      { step: '03', title: 'Iterative Engineering', description: 'Sprint-based agile development with weekly preview deployments and transparent sprint reviews.' },
      { step: '04', title: 'Hardening & QA', description: 'Automated unit, integration, end-to-end, and penetration testing across simulated real-world loads.' },
      { step: '05', title: 'Production Launch', description: 'Zero-downtime deployment, DNS provisioning, monitoring setup, and post-launch stability support.' }
    ],
    faqs: [
      { question: 'What tech stack do you recommend for our web application?', answer: 'We typically recommend Next.js/TypeScript with Node.js/PostgreSQL for modern web platforms due to its stellar performance, SEO capabilities, strong typing, and rich ecosystem.' },
      { question: 'Can you modernize our existing legacy web application without a complete rewrite?', answer: 'Yes. We frequently implement strangler fig patterns or modular micro-frontends to progressively migrate critical workflows with zero operational downtime.' },
      { question: 'Do you provide post-launch maintenance and feature scaling?', answer: 'Absolutely. We offer dedicated SLA-backed support, security patching, cloud monitoring, and continuous feature development sprints.' }
    ]
  },
  {
    id: 'srv-2',
    slug: 'it-consulting',
    title: 'IT Consulting & Strategy',
    shortDescription: 'Technology strategy, systems architecture, digital transformation, and technical advisory for growing businesses.',
    fullDescription: 'Navigate complex technology decisions with clarity. We help founders and enterprise leaders make pragmatic architectural choices, avoid expensive technical debt, and align engineering execution directly with commercial goals.',
    iconName: 'Compass',
    badge: 'Advisory',
    accent: 'gold',
    businessValue: 'Eliminates costly engineering missteps, reduces infrastructure overhead, and establishes a future-proof technology roadmap.',
    problemStatement: 'Businesses often spend months and capital building the wrong tech stack, choosing hype-driven tools over pragmatic solutions, or drowning in unmaintainable legacy code without clear architectural oversight.',
    whatWeProvide: [
      'Technology Stack Selection & Due Diligence',
      'System Architecture & Cloud Infrastructure Audits',
      'Digital Transformation & Modernization Blueprints',
      'Engineering Best Practices & Codebase Quality Reviews',
      'Security Posture & Compliance Assessment (SOC2 / GDPR prep)',
      'CTO-as-a-Service & Technical Advisory for Founders'
    ],
    capabilities: [
      'Distributed Systems Architecture Design',
      'Cloud Migration & Cost Optimization (AWS, GCP, Azure)',
      'Database Schema Optimization & Query Refactoring',
      'DevOps, Containerization & GitOps Pipeline Setup',
      'Technical Feasibility Studies & MVP Scoping',
      'Disaster Recovery & High Availability Planning'
    ],
    typicalUseCases: [
      { title: 'Pre-Build Architectural Planning', desc: 'Validating technical feasibility and architectural blueprints before committing major development capital.' },
      { title: 'Tech Debt Remediation', desc: 'Diagnosing performance bottlenecks, database locking issues, and unscalable monoliths.' },
      { title: 'Infrastructure Cost Reduction', desc: 'Auditing bloated cloud spend and optimizing compute, storage, and networking resources.' }
    ],
    technologies: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'PostgreSQL', 'Datadog', 'GitHub Actions'],
    deliverables: [
      'Formal Architectural Assessment Report',
      'Target-State Architecture Blueprint & Diagrams',
      'Infrastructure Cost Optimization Matrix',
      'Prioritized Technical Debt Remediation Backlog',
      'Executive Technology Strategy Deck'
    ],
    process: [
      { step: '01', title: 'Audit & Analysis', description: 'Reviewing current codebases, infrastructure configs, system logs, and business requirements.' },
      { step: '02', title: 'Gap Identification', description: 'Pinpointing architectural bottlenecks, security vulnerabilities, and cost inefficiencies.' },
      { step: '03', title: 'Target Roadmap', description: 'Formulating a pragmatic, step-by-step roadmap with clear milestones, risks, and ROI.' },
      { step: '04', title: 'Implementation Guidance', description: 'Hands-on pair programming, architectural oversight, and team mentoring through execution.' }
    ],
    faqs: [
      { question: 'When should a company engage an IT consultant?', answer: 'The best time is before significant technical capital is committed—such as prior to building a new platform, before a major cloud migration, or when existing systems begin showing scale limits.' },
      { question: 'Do you provide actionable code fixes or just strategic reports?', answer: 'We are engineering-grounded. Our advisory includes both strategic executive guidance and concrete, actionable code examples, configuration templates, and architectural diagrams.' }
    ]
  },
  {
    id: 'srv-3',
    slug: 'ai-ml',
    title: 'AI / ML & Intelligent Systems',
    shortDescription: 'Applied artificial intelligence, workflow automation, predictive modeling, and domain-specific LLM integrations.',
    fullDescription: 'Move beyond AI hype to practical, measurable business outcomes. We engineer domain-tuned AI systems, document intelligence pipelines, conversational assistants, and machine learning models that solve genuine operational bottlenecks.',
    iconName: 'Brain',
    badge: 'High Impact',
    accent: 'violet',
    businessValue: 'Automates manual knowledge work, reduces operational cycle times by up to 70%, and extracts actionable intelligence from unstructured data.',
    problemStatement: 'Most organizations struggle to bridge the gap between AI demos and reliable production systems, struggling with hallucination risks, data privacy compliance, latency, and high inference costs.',
    whatWeProvide: [
      'Custom LLM Integration & Domain Retrieval-Augmented Generation (RAG)',
      'Intelligent Document Processing & Semantic Search Engines',
      'Operational Workflow Automation & AI Agents',
      'Predictive Analytics & Supervised Machine Learning Models',
      'Enterprise Knowledge Assistants with Strict Access Controls',
      'AI Safety, Guardrails, and Hallucination Mitigations'
    ],
    capabilities: [
      'Vector Databases & High-Precision Semantic Indexing',
      'Fine-Tuning & Prompt Engineering Frameworks',
      'Local / Private Model Deployment for Data Sovereignty',
      'Automated Evaluation Benchmarks & Accuracy Tracking',
      'Computer Vision & OCR Data Extraction Pipelines',
      'Cost-Optimized Multi-Model Routing (Claude, GPT, Mistral, Llama)'
    ],
    typicalUseCases: [
      { title: 'Document Intelligence', desc: 'Extracting structured data from contracts, invoices, medical records, and legal briefs automatically.' },
      { title: 'Internal Knowledge Engine', desc: 'Enabling teams to query decades of proprietary company documentation with cited source verification.' },
      { title: 'Predictive Demand Modeling', desc: 'Forecasting customer churn, inventory demands, or equipment maintenance intervals.' }
    ],
    technologies: ['Python', 'PyTorch', 'LangChain', 'LlamaIndex', 'PostgreSQL pgvector', 'Hugging Face', 'FastAPI', 'OpenAI / Claude API'],
    deliverables: [
      'Production-Grade AI Pipeline & API Services',
      'Private Vector Database & Ingestion Workers',
      'Interactive Testing & Evaluation Suite',
      'Security & Data Privacy Audit Compliance Report',
      'Model Monitoring & Cost-Control Dashboard'
    ],
    process: [
      { step: '01', title: 'Use Case Validation', description: 'Evaluating business viability, ROI, data readiness, and defining quantifiable accuracy metrics.' },
      { step: '02', title: 'Data Prep & Pipeline', description: 'Sanitizing, chunking, embedding, and validating client datasets in isolated secure environments.' },
      { step: '03', title: 'Model & RAG Tuning', description: 'Architecting retrieval pipelines, guardrails, prompt templates, and evaluation loops.' },
      { step: '04', title: 'Integration & Testing', description: 'Embedding AI endpoints cleanly into your existing applications with fallback redundancy.' },
      { step: '05', title: 'Continuous Monitoring', description: 'Tracking latency, token consumption, accuracy drift, and user feedback signals.' }
    ],
    faqs: [
      { question: 'Will our proprietary business data be used to train public models?', answer: 'Never. We enforce strict enterprise privacy boundaries. We use zero-retention APIs or host dedicated open-weights models inside your private virtual private cloud (VPC).' },
      { question: 'How do you prevent hallucinations in business-critical workflows?', answer: 'We implement deterministic Retrieval-Augmented Generation (RAG) with strict source citation, semantic guardrails, and validation steps that refuse to answer if evidence is insufficient.' }
    ]
  },
  {
    id: 'srv-4',
    slug: 'ui-ux-design',
    title: 'UI/UX Design & Product Strategy',
    shortDescription: 'Conversion-focused, human-centered product interfaces engineered for clarity, usability, and visual distinction.',
    fullDescription: 'Design is not just decoration—it is how your product works. We craft thoughtful user journeys, wireframes, high-fidelity interfaces, and design systems that reduce user cognitive load and drive tangible business conversion.',
    iconName: 'Layout',
    badge: 'Product Design',
    accent: 'gold',
    businessValue: 'Increases product adoption, decreases customer support inquiries, and establishes high brand credibility from day one.',
    problemStatement: 'Cluttered, unintuitive software frustrates users, leading to high drop-off rates, poor user retention, and expensive developer churn building features nobody understands how to use.',
    whatWeProvide: [
      'User Research, Persona Mapping & Journey Architecture',
      'Interactive Wireframing & Rapid Prototyping',
      'High-Fidelity Interface Design (Figma)',
      'Comprehensive Design Systems & Component Tokens',
      'Usability Testing & Conversion Rate Optimization (CRO)',
      'Developer-Ready Handoff with Motion & State Specifications'
    ],
    capabilities: [
      'Multi-Platform Design (Web, iOS, Android, Tablet)',
      'WCAG 2.1 Contrast & Accessibility Engineering',
      'Micro-Interactions & State Transition Design',
      'Complex Data Visualization & Dashboard Hierarchy',
      'Design Token Synchronisation with Codebases',
      'Continuous Usability Testing Cycles'
    ],
    typicalUseCases: [
      { title: 'New Product MVP Design', desc: 'Taking an early product concept from sketches to an investor-ready, high-converting prototype.' },
      { title: 'Enterprise Dashboard Redesign', desc: 'Simplifying dense, overwhelming operational data into clear, intuitive decision workspaces.' },
      { title: 'Conversion Rate Redesign', desc: 'Revamping onboarding and checkout flows to measurably boost funnel completion.' }
    ],
    technologies: ['Figma', 'Framer', 'Tailwind CSS', 'Storybook', 'FigJam', 'Hotjar'],
    deliverables: [
      'Full Figma Component Design System & Variables',
      'Interactive High-Fidelity Clickable Prototype',
      'User Journey Maps & Information Architecture Blueprints',
      'WCAG Accessibility Compliance Audit',
      'Design Token Export Spec for Engineering'
    ],
    process: [
      { step: '01', title: 'User & Market Research', description: 'Investigating real user workflows, mental models, friction points, and competitor solutions.' },
      { step: '02', title: 'Wireframing & Flow', description: 'Mapping information architecture and low-fidelity prototypes to validate logic before aesthetics.' },
      { step: '03', title: 'Visual Systems & UI', description: 'Applying typography scales, color tokens, visual hierarchy, and component states.' },
      { step: '04', title: 'Prototyping & Testing', description: 'Validating usability through interactive prototypes with stakeholders and real users.' },
      { step: '05', title: 'Engineering Handoff', description: 'Providing exact spacing, token variables, responsive layouts, and motion specs to developers.' }
    ],
    faqs: [
      { question: 'Do you provide developer-ready Figma files?', answer: 'Yes. Our Figma files are built using auto-layout, modern design tokens, interactive components, and clear state variants (hover, active, focus, disabled) for seamless engineering implementation.' },
      { question: 'Can you work with our existing brand guidelines?', answer: 'Absolutely. We can adhere precisely to existing brand guidelines or help you modernize them into a cohesive digital design system.' }
    ]
  },
  {
    id: 'srv-5',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortDescription: 'High-performance cross-platform and native mobile applications for iOS and Android with fluid interactions.',
    fullDescription: 'Deliver seamless mobile experiences your users carry everywhere. We build cross-platform apps using React Native and Flutter with native performance, offline support, push notifications, and frictionless onboarding.',
    iconName: 'Smartphone',
    badge: 'Mobile Systems',
    accent: 'blue',
    businessValue: 'Deepens customer retention through native device capabilities, instant push notifications, and 60fps smooth touch interaction.',
    problemStatement: 'Many mobile apps suffer from battery drain, sluggish animations, poor offline handling, and fragmentation across varying Android and iOS screen dimensions.',
    whatWeProvide: [
      'Cross-Platform iOS and Android Development',
      'Offline-First Architecture & Background Synchronization',
      'Biometric Authentication (FaceID / TouchID)',
      'Push Notification Infrastructure & Deep Linking',
      'App Store & Google Play Store Submission Management',
      'Native Device Hardware Integration (Camera, GPS, Bluetooth)'
    ],
    capabilities: [
      'Single Codebase Multi-Platform Deployment',
      'Native Swift / Kotlin Modules Integration',
      'Local Encrypted SQLite / Realm Database Storage',
      'In-App Purchases & Subscription Billing Setup',
      'Real-Time Location Tracking & Geo-Fencing',
      'Automated Mobile Testing (Appium / Maestro)'
    ],
    typicalUseCases: [
      { title: 'On-Demand Field Service Apps', desc: 'Offline-capable apps for field technicians, inspectors, and delivery teams.' },
      { title: 'Consumer Mobile Platforms', desc: 'Community, e-commerce, and fitness applications with real-time feeds and alerts.' },
      { title: 'B2B Companion Apps', desc: 'Secure mobile extensions of existing enterprise web platforms for executives on the move.' }
    ],
    technologies: ['React Native', 'Expo', 'TypeScript', 'Swift', 'Kotlin', 'SQLite', 'Firebase', 'Fastlane'],
    deliverables: [
      'Complete Mobile Source Repository',
      'iOS IPA & Android APK/AAB Builds',
      'App Store & Google Play Store Listings & Assets',
      'Backend Mobile API Gateway & Push Services',
      'Post-Launch OS Compatibility Maintenance'
    ],
    process: [
      { step: '01', title: 'Mobile Blueprint', description: 'Scoping navigation paradigms, offline states, touch targets, and device capabilities.' },
      { step: '02', title: 'Core App Shell', description: 'Building the foundational navigation, theme tokens, authentication, and state management.' },
      { step: '03', title: 'Feature Sprints', description: 'Developing features with continuous TestFlight and Internal Play Store builds for client review.' },
      { step: '04', title: 'Device Lab Testing', description: 'Verifying on diverse physical devices for battery consumption, thermal throttling, and screen ratios.' },
      { step: '05', title: 'Store Publishing', description: 'Managing store submission policies, privacy declarations, screenshots, and release approval.' }
    ],
    faqs: [
      { question: 'Should we build cross-platform or separate native apps?', answer: 'For 95% of modern business use cases, React Native or Flutter delivers identical 60fps performance and native look while saving up to 45% in development and ongoing maintenance costs.' },
      { question: 'Do you help with Apple App Store and Google Play approval?', answer: 'Yes. We guide the complete submission process, ensuring compliance with Apple App Review and Google Play guidelines.' }
    ]
  },
  {
    id: 'srv-6',
    slug: 'software-development',
    title: 'Custom Software Development',
    shortDescription: 'Tailored backend systems, microservices, secure APIs, and custom enterprise tools built to exact business specs.',
    fullDescription: 'When off-the-shelf software falls short of your unique operational workflows, we architect custom software solutions. We specialize in high-throughput data processing, secure integrations, and resilient internal platforms.',
    iconName: 'Code',
    badge: 'Enterprise',
    accent: 'violet',
    businessValue: 'Provides a proprietary competitive advantage, eliminates recurring SaaS licensing taxes, and automates unique operational logic.',
    problemStatement: 'Off-the-shelf SaaS forces businesses into rigid constraints, forcing teams to rely on duct-taped manual workarounds, risky spreadsheets, and unscalable third-party subscription stacks.',
    whatWeProvide: [
      'Bespoke Business Logic & Enterprise Workflows',
      'REST & GraphQL API Architecture and Integration',
      'High-Throughput ETL & Background Data Pipelines',
      'Legacy System Modernization & Data Migration',
      'Role-Based Multi-Tenant Architecture',
      'Comprehensive Automated Test Suites & Documentation'
    ],
    capabilities: [
      'Concurrency & Distributed Task Queues (Celery, BullMQ)',
      'Relational & Document Database Optimization',
      'Enterprise SSO (SAML, OAuth2, Okta, Azure AD)',
      'Auditing, Event Sourcing & Compliance Logging',
      'Webhook Ingestion & Resilient Retry Mechanism',
      'Microservice & Monolith-First Architecture'
    ],
    typicalUseCases: [
      { title: 'ERP & Workflow Automation', desc: 'Custom resource management platforms replacing disjointed legacy accounting and inventory software.' },
      { title: 'Financial & Ledger Engines', desc: 'Double-entry transaction processing engines requiring mathematical accuracy and audit trails.' },
      { title: 'Data Ingestion Hubs', desc: 'Aggregating hundreds of third-party supplier feeds into normalized operational schemas.' }
    ],
    technologies: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis', 'Docker', 'GraphQL', 'RabbitMQ'],
    deliverables: [
      'Full Source Code Repository with Git History',
      'Interactive OpenAPI / Swagger Documentation',
      'Database Migration Scripts & Seed Data',
      'Docker Compose & Kubernetes Deployment Manifests',
      'Comprehensive Disaster Recovery Plan'
    ],
    process: [
      { step: '01', title: 'Domain Modeling', description: 'Clarifying business entities, state machines, permission models, and data lifecycles.' },
      { step: '02', title: 'API & Data Contract', description: 'Defining strict schemas, data contracts, validation rules, and error handling standards.' },
      { step: '03', title: 'Test-Driven Build', description: 'Developing core engines with automated test suites verifying edge cases and high concurrency.' },
      { step: '04', title: 'Load & Security Validation', description: 'Executing load tests, memory leak checks, and automated vulnerability scans.' },
      { step: '05', title: 'Staging & Production Rollout', description: 'Deploying to staging environments, user acceptance testing (UAT), and monitored production rollout.' }
    ],
    faqs: [
      { question: 'How do you ensure the software remains maintainable long-term?', answer: 'We follow clean architecture, strict TypeScript/Python typing, modular separation of concerns, and maintain comprehensive test suites and OpenAPI documentation.' },
      { question: 'Who owns the intellectual property (IP) of the software?', answer: 'You own 100% of the intellectual property, source code, data, and deliverables upon project completion.' }
    ]
  },
  {
    id: 'srv-7',
    slug: 'digital-marketing',
    title: 'Technical Digital Marketing & SEO',
    shortDescription: 'Data-driven search engine optimization, technical performance audits, conversion tracking, and growth systems.',
    fullDescription: 'Great technology needs great discoverability. We bridge the gap between engineering and growth by implementing technical SEO, semantic structured data, high-converting landing pages, and rigorous analytics instrumentation.',
    iconName: 'TrendingUp',
    badge: 'Growth',
    accent: 'cyan',
    businessValue: 'Drives sustainable inbound customer acquisition, boosts search visibility, and optimizes marketing spend with clear attribution.',
    problemStatement: 'Most digital marketing fails because websites have slow load times, broken technical SEO tags, poor mobile usability, and zero accurate conversion tracking attribution.',
    whatWeProvide: [
      'Technical SEO Audits & Core Web Vitals Optimization',
      'Semantic Schema Markup (JSON-LD) & Content Strategy',
      'High-Converting Landing Page Engineering',
      'Advanced Analytics & Conversion Tracking (GA4, PostHog)',
      'Search Engine Visibility & Keyword Ranking Strategy',
      'Conversion Rate Optimization (A/B Testing)'
    ],
    capabilities: [
      'Automated XML Sitemaps & Dynamic Canonical Routing',
      'Zero-JS Fast Static Page Generation for Search Crawlers',
      'Server-Side Event Tracking to Bypass Ad-Blockers',
      'Competitor Keyword Gap & Intent Mapping',
      'Internationalization (Hreflang) & Local SEO Structure',
      'Social Share (OpenGraph / Twitter Card) Automation'
    ],
    typicalUseCases: [
      { title: 'Technical SEO Overhaul', desc: 'Fixing indexing issues, crawl errors, and Core Web Vitals to regain lost organic search rankings.' },
      { title: 'New Product Launch Campaign', desc: 'Building high-speed landing pages with end-to-end attribution for paid and organic campaigns.' },
      { title: 'Content Engine SEO', desc: 'Structuring blog and knowledge hubs to consistently rank for high-intent business search queries.' }
    ],
    technologies: ['Google Analytics 4', 'Google Search Console', 'PostHog', 'Ahrefs', 'Next.js SEO', 'Schema.org'],
    deliverables: [
      'Comprehensive Technical SEO Health Audit',
      'On-Page Schema & Metadata Implementation',
      'Attribution & Conversion Tracking Setup',
      'Keyword Strategy & Content Architecture Plan',
      'Monthly Performance & Keyword Ranking Reports'
    ],
    process: [
      { step: '01', title: 'Audit & Baseline', description: 'Benchmarking current site speed, indexing status, backlink profile, and competitor positioning.' },
      { step: '02', title: 'Technical Fixes', description: 'Remediating crawl errors, optimizing Core Web Vitals, and implementing rich JSON-LD schemas.' },
      { step: '03', title: 'Conversion Funnels', description: 'Instrumenting clean event funnels and optimizing landing page UX for user action.' },
      { step: '04', title: 'Growth & Iteration', description: 'Analyzing real user analytics, refining copy, and launching targeted authority content.' }
    ],
    faqs: [
      { question: 'What makes technical SEO different from standard SEO?', answer: 'Technical SEO focuses on the underlying codebase, architecture, server response times, schema markup, and crawlability that search engine bots require to properly index and rank your pages.' },
      { question: 'How quickly can we expect to see improvements from technical SEO?', answer: 'Technical fixes like Core Web Vitals, sitemap corrections, and schema additions are re-crawled within 2 to 6 weeks, with ranking and traffic improvements compounding over 3 to 6 months.' }
    ]
  }
];

export const INITIAL_PORTFOLIO: PortfolioProject[] = [
  {
    id: 'proj-1',
    slug: 'cloud-inventory-platform',
    title: 'Cloud-Native Enterprise Inventory Platform',
    shortDescription: 'Modern multi-location stock tracking, automated supplier re-ordering, and real-time ledger management.',
    clientIndustry: 'Logistics & Supply Chain',
    status: 'completed',
    category: 'Web',
    problem: 'The client struggled with fragmented legacy desktop software that required manual spreadsheet syncing across 4 regional warehouses, resulting in frequent stockouts and delayed shipping times.',
    approach: 'We designed a cloud-native, responsive web architecture centered on optimistic UI updates, real-time WebSockets synchronization, and a PostgreSQL transactional ledger.',
    solution: 'Engineered a unified inventory hub featuring barcode scanning integration, automated re-order thresholds, granular user roles, and real-time audit trails across all warehouses.',
    features: [
      'Multi-Warehouse Inventory Ledger with Audit Trails',
      'Automated Low-Stock Trigger & Supplier Purchase Orders',
      'Real-Time WebSocket Synchronization Across Locations',
      'Role-Based Permissions (Warehouse Staff, Managers, Executive)',
      'Mobile Barcode & QR Code Scanning Capability'
    ],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Redis'],
    metricsOrHighlights: [
      'Zero Discrepancy Multi-Warehouse Sync',
      'Sub-100ms Query Latency on 500k+ SKUs',
      'Offline-Resilient Local Barcode Queue',
      'Fully Responsive Desktop and Tablet UI'
    ],
    liveUrl: '#',
    githubUrl: '#',
    coverImage: '/projects/inventory.jpg',
    galleryImages: ['/projects/inventory-1.jpg', '/projects/inventory-2.jpg'],
    published: true,
    featured: true,
    order: 1
  },
  {
    id: 'proj-2',
    slug: 'predictive-analytics-engine',
    title: 'Applied Predictive Analytics Engine',
    shortDescription: 'Machine learning pipeline for predictive maintenance, anomaly detection, and real-time sensor metrics.',
    clientIndustry: 'Industrial & Manufacturing',
    status: 'completed',
    category: 'AI/ML',
    problem: 'Industrial equipment downtime was causing unexpected operational delays. Maintenance teams lacked advance warning systems for motor and vibration anomalies.',
    approach: 'Implemented an edge-compatible anomaly detection model trained on historical vibration and temperature sensor telemetry, interfaced with a high-throughput time-series database.',
    solution: 'Delivered an end-to-end telemetry dashboard with automated anomaly alerts, predictive failure probability scores, and proactive work-order dispatch hooks.',
    features: [
      'Time-Series Sensor Telemetry Ingestion (MQTT & REST)',
      'Machine Learning Anomaly Detection Pipeline',
      'Automated Early-Warning Alert Dispatch (SMS & Email)',
      'Predictive Component Lifetime Degradation Curves',
      'Interactive Historical Trend Comparison Views'
    ],
    technologies: ['Python', 'FastAPI', 'PyTorch', 'PostgreSQL', 'React', 'TimescaleDB', 'Docker'],
    metricsOrHighlights: [
      '94% Anomaly Detection Accuracy in Pilot Trials',
      'Predictive Alerts Triggered Up to 48 Hours in Advance',
      'Scalable Ingestion Handling 10,000 Events / Sec',
      'Clear Visual Explanations for Maintenance Engineers'
    ],
    liveUrl: '#',
    githubUrl: '#',
    coverImage: '/projects/analytics.jpg',
    galleryImages: ['/projects/analytics-1.jpg', '/projects/analytics-2.jpg'],
    published: true,
    featured: true,
    order: 2
  },
  {
    id: 'proj-3',
    slug: 'healthcare-patient-portal',
    title: 'Secure Patient Care & Appointment Hub',
    shortDescription: 'HIPAA-conscious appointment booking, encrypted telemetry messaging, and digital health records access.',
    clientIndustry: 'Healthcare & Wellness',
    status: 'completed',
    category: 'SaaS',
    problem: 'Patients faced fragmented scheduling experiences and delayed lab report delivery due to uncoordinated third-party booking plugins and manual phone triage.',
    approach: 'We architected a zero-trust, accessible patient portal adhering strictly to modern healthcare privacy standards, complete with end-to-end appointment workflow.',
    solution: 'Built a patient-centric application with calendar synchronization, automated SMS reminders, secure PDF lab document access, and integrated doctor triage messaging.',
    features: [
      'Intuitive Doctor Availability & Slot Booking Engine',
      'Secure Encrypted Patient-Provider Direct Messaging',
      'Lab Results & Medical History Document Vault',
      'Automated Appointment Reminders & Calendar Sync',
      'WCAG 2.1 AA Compliant High-Contrast Accessible Interface'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    metricsOrHighlights: [
      'Full WCAG 2.1 AA Accessibility Compliance',
      'Zero-Knowledge Encrypted Document Storage',
      'Sub-Second Calendar Availability Lookups',
      '100% Mobile & Screen-Reader Tested'
    ],
    liveUrl: '#',
    githubUrl: '#',
    coverImage: '/projects/healthcare.jpg',
    galleryImages: ['/projects/healthcare-1.jpg', '/projects/healthcare-2.jpg'],
    published: true,
    featured: true,
    order: 3
  },
  {
    id: 'proj-4',
    slug: 'knowledge-graph-assistant',
    title: 'Enterprise Semantic Knowledge Graph (Ongoing)',
    shortDescription: 'Domain-specific retrieval and graph-augmented intelligence system for complex corporate documents.',
    clientIndustry: 'Legal & Corporate Technology',
    status: 'ongoing',
    category: 'AI/ML',
    problem: 'Organizations struggle to cross-reference multi-thousand page regulatory filings, internal policy manuals, and past contracts using traditional keyword search.',
    approach: 'Combining graph database relationships (Neo4j) with dense vector embeddings to form a hybrid Graph-RAG retrieval system that traces entity linkages across documents.',
    solution: 'Active development of a visual query interface allowing analysts to search via natural language and view verified citations with visualized relationship nodes.',
    features: [
      'Hybrid Vector & Knowledge Graph Hybrid Retrieval',
      'Entity Extraction & Relationship Mapping Across Documents',
      'Strict Evidence Citation & Highlighted PDF Source Links',
      'Fine-Grained Document Permission & Compartmentalization',
      'Interactive Graph Node Exploration Canvas'
    ],
    technologies: ['Python', 'LangChain', 'Neo4j', 'PostgreSQL pgvector', 'Next.js', 'TypeScript'],
    metricsOrHighlights: [
      'Active Development Milestone 3 of 5 Completed',
      'Pilot Testing with Over 250,000 Regulatory Pages',
      'Entity Linkage Disambiguation Framework Implemented',
      'Targeted for Q3 Full Beta Deployment'
    ],
    liveUrl: '#',
    githubUrl: '#',
    coverImage: '/projects/graph.jpg',
    galleryImages: ['/projects/graph-1.jpg'],
    published: true,
    featured: false,
    order: 4
  },
  {
    id: 'proj-5',
    slug: 'cross-platform-field-suite',
    title: 'Cross-Platform Field Operations Suite (Ongoing)',
    shortDescription: 'Mobile companion application for on-site inspection teams with offline synchronization and photo tagging.',
    clientIndustry: 'Infrastructure & Field Services',
    status: 'ongoing',
    category: 'Mobile',
    problem: 'Field technicians working in remote or subterranean infrastructure zones operate without cellular reception, making real-time cloud data entry impossible.',
    approach: 'Building an offline-first mobile architecture utilizing local SQLite storage, automatic conflict resolution, and background sync queues upon connection recovery.',
    solution: 'Developing an intuitive mobile application for iOS and Android that lets technicians complete comprehensive checklists, annotate photos, and sync seamlessly.',
    features: [
      'Offline-First Local SQLite Database with Auto-Sync',
      'On-Device Image Annotation & GPS Geotagging',
      'Dynamic Checklist Engine with Conditional Question Logic',
      'Digital Signature Capture for Job Sign-Off',
      'Optimized for Glove-Friendly One-Handed Mobile Operation'
    ],
    technologies: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Node.js', 'PostgreSQL'],
    metricsOrHighlights: [
      'Active Development Milestone 2 of 4 Completed',
      'Zero Data Loss Across Simulated Offline Drops',
      'Sub-50ms Local Form Interaction Response Times',
      'Scheduled for Field Beta Testing in Upcoming Sprints'
    ],
    liveUrl: '#',
    githubUrl: '#',
    coverImage: '/projects/mobile-field.jpg',
    galleryImages: ['/projects/mobile-field-1.jpg'],
    published: true,
    featured: false,
    order: 5
  }
];

export const INITIAL_AUTHORS: AuthorProfile[] = [
  {
    id: 'auth-1',
    slug: 'obliquetech-architecture-team',
    fullName: 'ObliqueTech Engineering Team',
    title: 'Core Architecture & Systems Group',
    bio: 'The engineering team at ObliqueTech focuses on scalable systems architecture, applied artificial intelligence, type-safe full-stack development, and pragmatically solving real business bottlenecks.',
    expertise: ['Distributed Systems', 'Applied AI/ML', 'Next.js & TypeScript', 'PostgreSQL', 'Cloud Infrastructure'],
    avatarUrl: '/avatars/team.png',
    linkedInUrl: 'https://linkedin.com/company/obliquetech',
    githubUrl: 'https://github.com/obliquetech'
  }
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'why-growing-businesses-need-digital-strategy',
    title: 'Why Every Growing Business Needs a Pragmatic Digital Strategy',
    excerpt: 'Adopting technology without a coherent strategy often introduces unmanageable complexity. Here is how modern businesses align tech investments directly with operational efficiency.',
    content: `Technology should be a force multiplier, not an operational burden. Yet, many organizations invest in software, subscriptions, and tools without an overarching architectural strategy.

## The Pitfall of Hype-Driven Adoption
In today's fast-moving market, it is easy to succumb to the latest trends—whether jumping into premature microservices, over-engineered cloud setups, or adopting AI tools without a clear use case. 

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

By focusing on clarity, trust, and measurable outcomes, businesses can build technology that stands the test of time.`,
    category: 'Business Technology',
    authorId: 'auth-1',
    publishedAt: '2026-08-20T10:00:00Z',
    updatedAt: '2026-08-20T10:00:00Z',
    status: 'published',
    readingTimeMinutes: 5,
    coverImage: '/insights/strategy.jpg',
    tags: ['Digital Transformation', 'Architecture', 'Strategy', 'Scalability'],
    featured: true,
    seoTitle: 'Why Growing Businesses Need a Pragmatic Digital Strategy | ObliqueTech',
    seoDescription: 'Learn how to align technology investments with operational outcomes, avoiding expensive technical debt and hype-driven architectural choices.'
  },
  {
    id: 'post-2',
    slug: 'ai-in-business-where-automation-creates-value',
    title: 'AI in Business: Where Automation Actually Creates Measurable Value',
    excerpt: 'Moving past the marketing noise: how practical organizations deploy domain-specific AI, document extraction, and semantic search to cut cycle times without compromising accuracy.',
    content: `Artificial intelligence has captivated public attention, but in commercial applications, the true measure of AI is simple: **does it reliably reduce operational cycle times or unlock actionable intelligence?**

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

At ObliqueTech, we approach AI with engineering rigor: validating data quality first, establishing strict evaluation benchmarks, and delivering systems that earn user trust through accuracy and reliability.`,
    category: 'Artificial Intelligence',
    authorId: 'auth-1',
    publishedAt: '2026-08-28T14:30:00Z',
    updatedAt: '2026-08-28T14:30:00Z',
    status: 'published',
    readingTimeMinutes: 6,
    coverImage: '/insights/ai-value.jpg',
    tags: ['AI/ML', 'Automation', 'RAG', 'Enterprise'],
    featured: false,
    seoTitle: 'AI in Business: Where Automation Creates Value | ObliqueTech',
    seoDescription: 'Explore pragmatic business applications of AI, RAG, and intelligent document processing with strict data privacy and verified citations.'
  },
  {
    id: 'post-3',
    slug: 'what-engineering-students-should-learn-beyond-classroom',
    title: 'What Engineering Students Should Learn Beyond the Classroom',
    excerpt: 'The experience gap is real: companies expect production familiarity while schools focus on theory. Here are the practical skills that bridge the gap.',
    content: `One of the founding observations behind ObliqueTech was the stark disparity between traditional academic curricula and the day-to-day realities of production software engineering.

Students are frequently asked to demonstrate experience before they have been afforded the opportunity to gain it.

## The Missing Pieces in Traditional Education
While computer science degree programs excel at teaching algorithmic theory and foundational logic, they often omit critical aspects of collaborative engineering:

1. **Version Control in Teams:** Branching strategies, pull request reviews, handling merge conflicts, and writing descriptive commit histories.
2. **Architecture and Maintainability:** Designing systems that someone else will have to read, debug, and maintain five years down the road.
3. **Observability & Debugging:** Reading production logs, understanding latency profiles, monitoring database connection pools, and tracing distributed failures.
4. **Product Empathy:** Understanding that the finest algorithm is useless if the user cannot navigate the interface or if the solution does not solve the core business problem.

## How to Build Genuine Experience
* **Contribute to Open Source or Team Projects:** Building in isolation teaches syntax; building with others teaches communication, code reviews, and API contracts.
* **Deploy to Production:** Do not stop at \`localhost\`. Deploy your project to a cloud provider, configure a custom domain, set up SSL, and connect continuous integration (CI/CD).
* **Participate in Mentorship & Hackathons:** Engaging with experienced practitioners exposes you to how real technical trade-offs are decided.

At ObliqueTech, practical hands-on experience and mentorship remain a fundamental part of our DNA. We believe the future belongs to engineers who can think critically, build intelligently, and bridge the gap between concept and production.`,
    category: 'Career & Student Technology',
    authorId: 'auth-1',
    publishedAt: '2026-09-02T09:00:00Z',
    updatedAt: '2026-09-02T09:00:00Z',
    status: 'published',
    readingTimeMinutes: 5,
    coverImage: '/insights/education.jpg',
    tags: ['Education', 'Engineering', 'Mentorship', 'Careers'],
    featured: false,
    seoTitle: 'What Engineering Students Should Learn Beyond the Classroom | ObliqueTech',
    seoDescription: 'Bridging the experience gap: essential practical software engineering skills, version control, and production architectures that matter in the real world.'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What services does ObliqueTech provide?',
    answer: 'ObliqueTech is a full-service technology company offering Web Development, IT Consulting & Strategy, AI / Machine Learning solutions, UI/UX Design, Mobile App Development, Custom Software Engineering, and Technical Digital Marketing.',
    order: 1,
    published: true
  },
  {
    id: 'faq-2',
    category: 'General',
    question: 'What does the name "Oblique" signify in your brand philosophy?',
    answer: 'The word "Oblique" means approaching something from a different perspective. We believe businesses should not merely copy conventional, bloated paths. We help organizations look at their technical and commercial bottlenecks from a fresh angle: thinking differently, building intelligently, and moving faster.',
    order: 2,
    published: true
  },
  {
    id: 'faq-3',
    category: 'Process',
    question: 'How do I start a project with ObliqueTech?',
    answer: 'You can begin by using our interactive "Start a Project" discovery wizard or scheduling a direct 30–45 minute introductory consultation via our "Schedule a Call" page. We will discuss your goals, assess technical requirements, and deliver a transparent project roadmap.',
    order: 3,
    published: true
  },
  {
    id: 'faq-4',
    category: 'Process',
    question: 'How long does a typical development project take?',
    answer: 'Timelines vary according to project scope. A focused MVP or tailored web platform typically takes 4 to 8 weeks. Larger enterprise architectures, complex AI workflows, or comprehensive multi-platform suites generally span 2 to 4 months with continuous sprint releases.',
    order: 4,
    published: true
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'Do you work with international clients and startups?',
    answer: 'Yes. We collaborate with startups, established SMEs, and international clients globally. We maintain transparent asynchronous workflows, clear milestone tracking, and regular video syncs tailored to your timezone.',
    order: 5,
    published: true
  },
  {
    id: 'faq-6',
    category: 'Services',
    question: 'Can you modernize our existing legacy system without a total rewrite?',
    answer: 'Yes. We specialize in incremental modernization. Using proven architectural patterns like the strangler fig or microservices, we can replace critical legacy bottlenecks step-by-step while keeping your existing business operations live and stable.',
    order: 6,
    published: true
  },
  {
    id: 'faq-7',
    category: 'Services',
    question: 'Can you integrate AI or LLMs into our existing applications?',
    answer: 'Yes. We engineer secure API endpoints and private Retrieval-Augmented Generation (RAG) pipelines that connect directly into your existing databases and software, enabling smart search, automated document processing, and conversational agents with strict privacy.',
    order: 7,
    published: true
  },
  {
    id: 'faq-8',
    category: 'Process',
    question: 'Who owns the intellectual property and code created during the project?',
    answer: 'You retain 100% full ownership of all intellectual property, source code, designs, and digital assets upon completion and milestone settlement. We provide complete repositories and technical documentation.',
    order: 8,
    published: true
  },
  {
    id: 'faq-9',
    category: 'Security & Tech',
    question: 'How do you handle security and data protection?',
    answer: 'Security is baked into our engineering from day one. We enforce OWASP security practices, HTTPS encryption in transit and at rest, role-based access control (RBAC), environment variable isolation, and automated dependency vulnerability scanning.',
    order: 9,
    published: true
  },
  {
    id: 'faq-10',
    category: 'General',
    question: 'Can students or early-career engineers approach ObliqueTech for project opportunities?',
    answer: 'Yes! Oblique originated from observing the real-world experience gap faced by engineering students. We regularly support mentorship, hackathon participation, practical project collaboration, and tech speaker sessions.',
    order: 10,
    published: true
  },
  {
    id: 'faq-11',
    category: 'Pricing & Engagement',
    question: 'What is your pricing and engagement model?',
    answer: 'We provide transparent, milestone-based fixed scopes for well-defined projects, as well as dedicated sprint-based retained engineering teams for evolving products. We never surprise clients with hidden fees or inflated complexity.',
    order: 11,
    published: true
  },
  {
    id: 'faq-12',
    category: 'Services',
    question: 'Do you provide post-launch maintenance and continuous support?',
    answer: 'Yes. Every project includes post-launch monitoring and warranty support. We also provide ongoing SLA-backed maintenance agreements covering server uptime, security patching, library upgrades, and continuous feature expansion.',
    order: 12,
    published: true
  }
];

export const INITIAL_TESTIMONIALS: TestimonialSubmission[] = [
  {
    id: 'test-1',
    clientName: 'David Vance',
    company: 'Apex Logistics Global',
    position: 'VP of Technology',
    project: 'Cloud Inventory Platform',
    rating: 5,
    testimonial: 'ObliqueTech redesigned our logistics engine with incredible precision. Real-time fleet synchronization slashed our warehouse latency by 68%.',
    status: 'approved',
    submittedAt: '2026-01-15T10:00:00.000Z',
    featured: true
  },
  {
    id: 'test-2',
    clientName: 'Elena Rostova',
    company: 'MedData Health Systems',
    position: 'Chief Information Officer',
    project: 'Healthcare Patient Portal',
    rating: 5,
    testimonial: 'The engineering standards and clean HIPAA-compliant architectural discipline ObliqueTech brought to our platform exceeded all expectations.',
    status: 'approved',
    submittedAt: '2026-02-10T14:30:00.000Z',
    featured: true
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  companyName: 'ObliqueTech',
  tagline: 'Solutions & Innovation',
  taglineSub: 'Technology solutions designed around your goals, built for the future, and delivered with clarity, quality, and commitment.',
  email: 'contact@obliquetech.com',
  phone: '+91 9225260237',
  whatsappNumber: '+919225260237',
  officeAddress: 'Global Technology Hub & Operations',
  googleMapsUrl: '',
  linkedinUrl: 'https://linkedin.com/company/obliquetech',
  twitterUrl: 'https://twitter.com/obliquetech',
  githubUrl: 'https://github.com/obliquetech',
  instagramUrl: 'https://instagram.com/obliquetech',
  missionStatement: 'To build meaningful technology solutions that solve real problems, create opportunities, and help people and businesses move confidently into the future.',
  visionStatement: 'To build products and technology businesses that solve problems at scale, compete globally, and create lasting impact.',
  trustStripStatements: [
    'Client-Centric Approach',
    'Quality-Driven Development',
    'Transparent Communication',
    'Scalable Technology',
    'Global Collaboration'
  ]
};

function sanitizePostMedia(post: BlogPost): BlogPost {
  if (!post) return post;
  const isDeadBlob = (url?: string | null) => Boolean(url && url.startsWith('blob:'));
  const fallbackImg = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
  const fallbackGallery = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';

  return {
    ...post,
    coverImage: isDeadBlob(post.coverImage) ? fallbackImg : post.coverImage,
    blocks: (post.blocks || []).map(b => {
      if (b.type === 'image' && (isDeadBlob(b.imageUrl) || isDeadBlob(b.previewUrl))) {
        return {
          ...b,
          imageUrl: isDeadBlob(b.imageUrl) ? fallbackImg : b.imageUrl,
          previewUrl: isDeadBlob(b.previewUrl) ? fallbackImg : b.previewUrl,
        };
      }
      if (b.type === 'gallery' && b.galleryImages) {
        return {
          ...b,
          galleryImages: b.galleryImages.map(gi => ({
            ...gi,
            url: isDeadBlob(gi.url) ? fallbackGallery : gi.url,
          }))
        };
      }
      return b;
    })
  };
}

// =============================================================================
// SUPABASE DATABASE MAPPERS (Snake Case <-> Camel Case)
// =============================================================================
function mapBlogToDbPost(rawPost: BlogPost) {
  const post = sanitizePostMedia(rawPost);
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    author_id: post.authorId || null,
    published_at: post.publishedAt || new Date().toISOString(),
    updated_at: post.updatedAt || new Date().toISOString(),
    status: post.status,
    reading_time_minutes: post.readingTimeMinutes || 5,
    cover_image: post.coverImage,
    tags: post.tags || [],
    featured: Boolean(post.featured),
    seo_title: post.seoTitle || null,
    seo_description: post.seoDescription || null,
    blocks: post.blocks || []
  };
}

function mapDbPostToBlog(row: any): BlogPost {
  const post: BlogPost = {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    authorId: row.author_id || '',
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    status: row.status,
    readingTimeMinutes: row.reading_time_minutes || 5,
    coverImage: row.cover_image,
    tags: Array.isArray(row.tags) ? row.tags : [],
    featured: Boolean(row.featured),
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    blocks: Array.isArray(row.blocks) ? row.blocks : []
  };
  return sanitizePostMedia(post);
}

function mapTsServiceToDb(s: ServiceItem) {
  return {
    id: s.id,
    slug: s.slug,
    title: s.title,
    short_description: s.shortDescription,
    full_description: s.fullDescription,
    icon_name: s.iconName,
    badge: s.badge,
    accent: s.accent,
    business_value: s.businessValue,
    problem_statement: s.problemStatement,
    what_we_provide: s.whatWeProvide || [],
    capabilities: s.capabilities || [],
    typical_use_cases: s.typicalUseCases || [],
    technologies: s.technologies || [],
    deliverables: s.deliverables || [],
    process: s.process || [],
    faqs: s.faqs || []
  };
}

function mapDbServiceToTs(row: any): ServiceItem {
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    iconName: row.icon_name,
    badge: row.badge,
    accent: row.accent || 'gold',
    businessValue: row.business_value,
    problemStatement: row.problem_statement,
    whatWeProvide: Array.isArray(row.what_we_provide) ? row.what_we_provide : [],
    capabilities: Array.isArray(row.capabilities) ? row.capabilities : [],
    typicalUseCases: Array.isArray(row.typical_use_cases) ? row.typical_use_cases : [],
    technologies: Array.isArray(row.technologies) ? row.technologies : [],
    deliverables: Array.isArray(row.deliverables) ? row.deliverables : [],
    process: Array.isArray(row.process) ? row.process : [],
    faqs: Array.isArray(row.faqs) ? row.faqs : []
  };
}

function mapTsProjectToDb(p: PortfolioProject) {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    short_description: p.shortDescription,
    client_industry: p.clientIndustry,
    status: p.status,
    category: p.category,
    problem: p.problem,
    approach: p.approach,
    solution: p.solution,
    features: p.features || [],
    technologies: p.technologies || [],
    metrics_or_highlights: p.metricsOrHighlights || [],
    live_url: p.liveUrl || null,
    github_url: p.githubUrl || null,
    cover_image: p.coverImage,
    gallery_images: p.galleryImages || [],
    published: p.published !== false,
    featured: Boolean(p.featured),
    display_order: p.order || 0
  };
}

function mapDbProjectToTs(row: any): PortfolioProject {
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description,
    clientIndustry: row.client_industry,
    status: row.status,
    category: row.category,
    problem: row.problem,
    approach: row.approach,
    solution: row.solution,
    features: Array.isArray(row.features) ? row.features : [],
    technologies: Array.isArray(row.technologies) ? row.technologies : [],
    metricsOrHighlights: Array.isArray(row.metrics_or_highlights) ? row.metrics_or_highlights : [],
    liveUrl: row.live_url,
    githubUrl: row.github_url,
    coverImage: row.cover_image,
    galleryImages: Array.isArray(row.gallery_images) ? row.gallery_images : [],
    published: row.published !== false,
    featured: Boolean(row.featured),
    order: row.display_order || 0
  };
}

function mapTsFaqToDb(f: FAQItem) {
  return {
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category,
    display_order: f.order || 0,
    published: f.published !== false
  };
}

function mapDbFaqToTs(row: any): FAQItem {
  return {
    id: String(row.id),
    question: row.question,
    answer: row.answer,
    category: row.category,
    order: row.display_order || 0,
    published: row.published !== false
  };
}

function mapTsAuthorToDb(a: AuthorProfile) {
  return {
    id: a.id,
    slug: a.slug,
    full_name: a.fullName,
    title: a.title,
    bio: a.bio,
    expertise: a.expertise || [],
    avatar_url: a.avatarUrl,
    linkedin_url: a.linkedInUrl || null,
    twitter_url: a.twitterUrl || null,
    github_url: a.githubUrl || null
  };
}

function mapDbAuthorToTs(row: any): AuthorProfile {
  return {
    id: String(row.id),
    slug: row.slug,
    fullName: row.full_name,
    title: row.title,
    bio: row.bio,
    expertise: Array.isArray(row.expertise) ? row.expertise : [],
    avatarUrl: row.avatar_url,
    linkedInUrl: row.linkedin_url,
    twitterUrl: row.twitter_url,
    githubUrl: row.github_url,
    isComplete: Boolean(row.full_name && row.title && row.bio)
  };
}

function mapTsSettingsToDb(s: SiteSettings) {
  return {
    id: 'current_settings',
    company_name: s.companyName,
    tagline: s.tagline,
    tagline_sub: s.taglineSub,
    email: s.email,
    phone: s.phone,
    whatsapp_number: s.whatsappNumber,
    office_address: s.officeAddress,
    google_maps_url: s.googleMapsUrl || null,
    linkedin_url: s.linkedinUrl,
    twitter_url: s.twitterUrl,
    github_url: s.githubUrl,
    instagram_url: s.instagramUrl || 'https://instagram.com/obliquetech',
    mission_statement: s.missionStatement,
    vision_statement: s.visionStatement,
    trust_strip_statements: s.trustStripStatements || []
  };
}

function mapDbSettingsToTs(row: any): SiteSettings {
  return {
    companyName: row.company_name || 'ObliqueTech',
    tagline: row.tagline || 'See Business Differently.',
    taglineSub: row.tagline_sub || '',
    email: row.email || 'contact@obliquetech.com',
    phone: row.phone || '+1 (555) 019-2834',
    whatsappNumber: row.whatsapp_number || '+15550192834',
    officeAddress: row.office_address || 'Global Technology Operations',
    googleMapsUrl: row.google_maps_url || '',
    linkedinUrl: row.linkedin_url || '',
    twitterUrl: row.twitter_url || '',
    githubUrl: row.github_url || '',
    instagramUrl: row.instagram_url || 'https://instagram.com/obliquetech',
    missionStatement: row.mission_statement || '',
    visionStatement: row.vision_statement || '',
    trustStripStatements: Array.isArray(row.trust_strip_statements) ? row.trust_strip_statements : []
  };
}

function mapTsTestimonialToDb(t: TestimonialSubmission) {
  return {
    id: t.id,
    client_name: t.clientName,
    company: t.company,
    position: t.position,
    project: t.project,
    rating: t.rating,
    testimonial: t.testimonial,
    status: t.status,
    submitted_at: t.submittedAt || new Date().toISOString(),
    featured: Boolean(t.featured)
  };
}

function mapDbTestimonialToTs(row: any): TestimonialSubmission {
  return {
    id: String(row.id),
    clientName: row.client_name,
    company: row.company,
    position: row.position,
    project: row.project,
    rating: row.rating,
    testimonial: row.testimonial,
    status: row.status,
    submittedAt: row.submitted_at,
    featured: Boolean(row.featured)
  };
}

function mapTsContactToDb(c: ContactSubmission) {
  return {
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone || '',
    company: c.company || '',
    service: c.service,
    message: c.message,
    status: c.status || 'new',
    submitted_at: c.submittedAt || new Date().toISOString()
  };
}

function mapDbContactToTs(row: any): ContactSubmission {
  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    service: row.service,
    message: row.message,
    status: row.status,
    submittedAt: row.submitted_at
  };
}

function mapTsCallToDb(c: CallRequest) {
  return {
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    business_name: c.businessName || '',
    reason: c.reason,
    service_required: c.serviceRequired,
    project_type: c.projectType,
    preferred_date: c.preferredDate,
    preferred_time: c.preferredTime,
    duration_minutes: c.durationMinutes || 30,
    requirements: c.requirements || '',
    status: c.status || 'pending',
    user_id: c.userId || null,
    submitted_at: c.submittedAt || new Date().toISOString()
  };
}

function mapDbCallToTs(row: any): CallRequest {
  return {
    id: String(row.id),
    userId: row.user_id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    businessName: row.business_name,
    reason: row.reason,
    serviceRequired: row.service_required,
    projectType: row.project_type,
    preferredDate: row.preferred_date,
    preferredTime: row.preferred_time,
    durationMinutes: row.duration_minutes,
    requirements: row.requirements,
    status: row.status,
    submittedAt: row.submitted_at
  };
}

function mapTsWizardToDb(w: ProjectWizardInquiry) {
  return {
    id: w.id,
    user_id: w.userId || null,
    project_status: w.projectStatus || 'submitted',
    project_type: w.projectType,
    services_needed: w.servicesNeeded || [],
    core_objective: w.coreObjective,
    key_features: w.keyFeatures,
    timeline: w.timeline,
    name: w.name,
    email: w.email,
    phone: w.phone,
    company: w.company || '',
    status: w.status || 'new',
    submitted_at: w.submittedAt || new Date().toISOString()
  };
}

function mapDbWizardToTs(row: any): ProjectWizardInquiry {
  return {
    id: String(row.id),
    userId: row.user_id,
    projectStatus: row.project_status || 'submitted',
    projectType: row.project_type,
    servicesNeeded: Array.isArray(row.services_needed) ? row.services_needed : [],
    coreObjective: row.core_objective,
    keyFeatures: row.key_features,
    timeline: row.timeline,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    status: row.status,
    submittedAt: row.submitted_at
  };
}

function mapDbProfileToTs(row: any): UserProfile {
  return {
    id: String(row.id),
    authUserId: row.auth_user_id || String(row.id),
    fullName: row.full_name || 'User',
    email: row.email,
    phone: row.phone || '',
    countryCode: row.country_code || '+91',
    companyName: row.company_name || '',
    jobTitle: row.job_title || '',
    bio: row.bio || '',
    country: row.country || '',
    city: row.city || '',
    profilePhoto: row.profile_photo || '',
    linkedin: row.linkedin || '',
    website: row.website || '',
    role: row.role || 'user',
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString()
  };
}

function mapTsProfileToDb(p: UserProfile) {
  return {
    id: p.id,
    auth_user_id: p.authUserId || p.id,
    full_name: p.fullName,
    profile_photo: p.profilePhoto || null,
    email: p.email,
    phone: p.phone || null,
    country_code: p.countryCode || '+91',
    company_name: p.companyName || null,
    job_title: p.jobTitle || null,
    bio: p.bio || null,
    country: p.country || null,
    city: p.city || null,
    linkedin: p.linkedin || null,
    website: p.website || null,
    role: p.role || 'user',
    updated_at: new Date().toISOString()
  };
}

function mapDbActivityToTs(row: any): UserActivity {
  return {
    id: String(row.id),
    userId: row.user_id,
    type: row.activity_type,
    title: row.title,
    description: row.description || '',
    timestamp: row.created_at || new Date().toISOString(),
    metadata: row.metadata || {}
  };
}

function mapTsActivityToDb(a: UserActivity) {
  return {
    id: a.id,
    user_id: a.userId,
    activity_type: a.type,
    title: a.title,
    description: a.description || null,
    metadata: a.metadata || {},
    created_at: a.timestamp || new Date().toISOString()
  };
}

function mapDbNotificationToTs(row: any): UserNotification {
  return {
    id: String(row.id),
    userId: row.user_id,
    title: row.title,
    message: row.message,
    type: row.type || 'info',
    read: Boolean(row.read),
    actionUrl: row.action_url || '',
    createdAt: row.created_at || new Date().toISOString()
  };
}

function mapTsNotificationToDb(n: UserNotification) {
  return {
    id: n.id,
    user_id: n.userId,
    title: n.title,
    message: n.message,
    type: n.type,
    read: n.read,
    action_url: n.actionUrl || null,
    created_at: n.createdAt || new Date().toISOString()
  };
}

function mapDbFeedbackToTs(row: any): UserFeedbackItem {
  return {
    id: String(row.id),
    userId: row.user_id,
    userName: row.user_name,
    userEmail: row.user_email,
    category: row.category,
    rating: row.rating || 5,
    message: row.message,
    status: row.status || 'submitted',
    createdAt: row.created_at || new Date().toISOString()
  };
}

function mapTsFeedbackToDb(f: UserFeedbackItem) {
  return {
    id: f.id,
    user_id: f.userId,
    user_name: f.userName,
    user_email: f.userEmail,
    category: f.category,
    rating: f.rating,
    message: f.message,
    status: f.status,
    created_at: f.createdAt || new Date().toISOString()
  };
}

// In-Memory / Local Storage state manager with Supabase Cloud Sync
class ObliqueStore {
  private services: ServiceItem[] = INITIAL_SERVICES;
  private portfolio: PortfolioProject[] = INITIAL_PORTFOLIO;
  private posts: BlogPost[] = INITIAL_POSTS;
  private authors: AuthorProfile[] = INITIAL_AUTHORS;
  private currentAuthorUser: AuthorUser | null = null;
  private draftArticles: Record<string, BlogPost> = {};
  private faqs: FAQItem[] = INITIAL_FAQS;
  private testimonials: TestimonialSubmission[] = [];
  private contactSubmissions: ContactSubmission[] = [];
  private callRequests: CallRequest[] = [];
  private wizardInquiries: ProjectWizardInquiry[] = [];
  private settings: SiteSettings = INITIAL_SETTINGS;
  private mediaRecords: MediaRecord[] = [];
  
  // USER PLATFORM REPOSITORIES
  private userProfiles: Record<string, UserProfile> = {};
  private userActivities: Record<string, UserActivity[]> = {};
  private userNotifications: Record<string, UserNotification[]> = {};
  private userFeedbackItems: UserFeedbackItem[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
      this.initSupabaseSync();
    }
  }

  // =========================================================================
  // SUPABASE FULL CLOUD SYNC & SEED
  // =========================================================================
  public async initSupabaseSync() {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      // 1. Sync Posts
      const { data: postsData } = await supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
      if (postsData && postsData.length > 0) {
        this.posts = postsData.map(mapDbPostToBlog);
        this.saveToStorage('oblique_posts', this.posts);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('oblique_posts_updated'));
        }
      } else if (postsData && postsData.length === 0) {
        // Auto-seed initial posts to Supabase
        for (const post of INITIAL_POSTS) {
          await supabase.from('blog_posts').upsert(mapBlogToDbPost(post));
        }
      }

      // 2. Sync Services
      const { data: srvData } = await supabase.from('services').select('*');
      if (srvData && srvData.length > 0) {
        this.services = srvData.map(mapDbServiceToTs);
        this.saveToStorage('oblique_services', this.services);
      } else if (srvData && srvData.length === 0) {
        for (const srv of INITIAL_SERVICES) {
          await supabase.from('services').upsert(mapTsServiceToDb(srv));
        }
      }

      // 3. Sync Portfolio
      const { data: portData } = await supabase.from('portfolio_projects').select('*').order('display_order', { ascending: true });
      if (portData && portData.length > 0) {
        this.portfolio = portData.map(mapDbProjectToTs);
        this.saveToStorage('oblique_portfolio', this.portfolio);
      } else if (portData && portData.length === 0) {
        for (const proj of INITIAL_PORTFOLIO) {
          await supabase.from('portfolio_projects').upsert(mapTsProjectToDb(proj));
        }
      }

      // 4. Sync FAQs
      const { data: faqData } = await supabase.from('faqs').select('*').order('display_order', { ascending: true });
      if (faqData && faqData.length > 0) {
        this.faqs = faqData.map(mapDbFaqToTs);
        this.saveToStorage('oblique_faqs', this.faqs);
      } else if (faqData && faqData.length === 0) {
        for (const faq of INITIAL_FAQS) {
          await supabase.from('faqs').upsert(mapTsFaqToDb(faq));
        }
      }

      // 5. Sync Testimonials
      const { data: testData } = await supabase.from('testimonials').select('*').order('submitted_at', { ascending: false });
      if (testData && testData.length > 0) {
        this.testimonials = testData.map(mapDbTestimonialToTs);
        this.saveToStorage('oblique_testimonials', this.testimonials);
      } else if (testData && testData.length === 0) {
        for (const t of INITIAL_TESTIMONIALS) {
          await supabase.from('testimonials').upsert(mapTsTestimonialToDb(t));
        }
      }

      // 6. Sync Authors
      const { data: authData } = await supabase.from('authors').select('*');
      if (authData && authData.length > 0) {
        this.authors = authData.map(mapDbAuthorToTs);
        this.saveToStorage('oblique_authors', this.authors);
      } else if (authData && authData.length === 0) {
        for (const auth of INITIAL_AUTHORS) {
          await supabase.from('authors').upsert(mapTsAuthorToDb(auth));
        }
      }

      // 7. Sync Settings
      const { data: setData } = await supabase.from('site_settings').select('*').limit(1);
      if (setData && setData.length > 0) {
        this.settings = mapDbSettingsToTs(setData[0]);
        this.saveToStorage('oblique_settings', this.settings);
      } else if (setData && setData.length === 0) {
        await supabase.from('site_settings').upsert(mapTsSettingsToDb(this.settings));
      }

      // 8. Sync Contact Submissions
      const { data: cntData } = await supabase.from('contact_submissions').select('*').order('submitted_at', { ascending: false });
      if (cntData && cntData.length > 0) {
        this.contactSubmissions = cntData.map(mapDbContactToTs);
        this.saveToStorage('oblique_contacts', this.contactSubmissions);
      }

      // 9. Sync Call Requests
      const { data: callData } = await supabase.from('call_requests').select('*').order('submitted_at', { ascending: false });
      if (callData && callData.length > 0) {
        this.callRequests = callData.map(mapDbCallToTs);
        this.saveToStorage('oblique_calls', this.callRequests);
      }

      // 10. Sync Project Wizard Inquiries
      const { data: wizData } = await supabase.from('project_wizard_inquiries').select('*').order('submitted_at', { ascending: false });
      if (wizData && wizData.length > 0) {
        this.wizardInquiries = wizData.map(mapDbWizardToTs);
        this.saveToStorage('oblique_wizards', this.wizardInquiries);
      }

      // 11. Sync Profiles
      const { data: profData } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (profData && profData.length > 0) {
        profData.forEach((row: any) => {
          const p = mapDbProfileToTs(row);
          this.userProfiles[p.id] = p;
        });
        this.saveToStorage('oblique_user_profiles', this.userProfiles);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('oblique_profiles_updated'));
        }
      }
    } catch (e) {
      console.warn('Initial Supabase sync check:', e);
    }
  }

  private loadFromStorage() {
    try {
      const savedServices = localStorage.getItem('oblique_services');
      if (savedServices) this.services = JSON.parse(savedServices);

      const savedPortfolio = localStorage.getItem('oblique_portfolio');
      if (savedPortfolio) this.portfolio = JSON.parse(savedPortfolio);

      const savedPosts = localStorage.getItem('oblique_posts');
      if (savedPosts) {
        try {
          const rawPosts = JSON.parse(savedPosts);
          this.posts = Array.isArray(rawPosts) ? rawPosts.map(sanitizePostMedia) : [];
        } catch (e) {
          console.warn('Error parsing oblique_posts:', e);
        }
      }

      const savedMedia = localStorage.getItem('oblique_media');
      if (savedMedia) this.mediaRecords = JSON.parse(savedMedia);

      const savedAuthors = localStorage.getItem('oblique_authors');
      if (savedAuthors) this.authors = JSON.parse(savedAuthors);

      const savedAuthorUser = localStorage.getItem('oblique_author_user');
      if (savedAuthorUser) this.currentAuthorUser = JSON.parse(savedAuthorUser);

      const savedDrafts = localStorage.getItem('oblique_drafts');
      if (savedDrafts) this.draftArticles = JSON.parse(savedDrafts);

      const savedFaqs = localStorage.getItem('oblique_faqs');
      if (savedFaqs) this.faqs = JSON.parse(savedFaqs);

      const savedTestimonials = localStorage.getItem('oblique_testimonials');
      if (savedTestimonials) this.testimonials = JSON.parse(savedTestimonials);

      const savedContacts = localStorage.getItem('oblique_contacts');
      if (savedContacts) this.contactSubmissions = JSON.parse(savedContacts);

      const savedCalls = localStorage.getItem('oblique_calls');
      if (savedCalls) this.callRequests = JSON.parse(savedCalls);

      const savedWizards = localStorage.getItem('oblique_wizards');
      if (savedWizards) this.wizardInquiries = JSON.parse(savedWizards);

      const savedSettings = localStorage.getItem('oblique_settings');
      if (savedSettings) this.settings = JSON.parse(savedSettings);

      const savedProfiles = localStorage.getItem('oblique_user_profiles');
      if (savedProfiles) this.userProfiles = JSON.parse(savedProfiles);

      const savedActivities = localStorage.getItem('oblique_user_activities');
      if (savedActivities) this.userActivities = JSON.parse(savedActivities);

      const savedNotifications = localStorage.getItem('oblique_user_notifications');
      if (savedNotifications) this.userNotifications = JSON.parse(savedNotifications);

      const savedFeedback = localStorage.getItem('oblique_user_feedback');
      if (savedFeedback) this.userFeedbackItems = JSON.parse(savedFeedback);
    } catch (e) {
      console.warn('Could not read from local storage:', e);
    }
  }

  private saveToStorage(key: string, data: unknown) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.warn(`Could not save ${key} to local storage:`, e);
      }
    }
  }

  // SERVICES
  public getServices(): ServiceItem[] {
    return this.services;
  }

  public getServiceBySlug(slug: string): ServiceItem | undefined {
    return this.services.find(s => s.slug === slug);
  }

  public updateService(updated: ServiceItem) {
    this.services = this.services.map(s => s.id === updated.id ? updated : s);
    this.saveToStorage('oblique_services', this.services);

    if (isSupabaseConfigured && supabase) {
      supabase.from('services').upsert(mapTsServiceToDb(updated)).then();
    }
  }

  // PORTFOLIO
  public getPortfolio(): PortfolioProject[] {
    return this.portfolio;
  }

  public getPortfolioBySlug(slug: string): PortfolioProject | undefined {
    return this.portfolio.find(p => p.slug === slug);
  }

  public saveProject(project: PortfolioProject) {
    const existingIndex = this.portfolio.findIndex(p => p.id === project.id);
    if (existingIndex >= 0) {
      this.portfolio[existingIndex] = project;
    } else {
      this.portfolio.unshift(project);
    }
    this.saveToStorage('oblique_portfolio', this.portfolio);

    if (isSupabaseConfigured && supabase) {
      supabase.from('portfolio_projects').upsert(mapTsProjectToDb(project)).then();
    }
  }

  public deleteProject(id: string) {
    this.portfolio = this.portfolio.filter(p => p.id !== id);
    this.saveToStorage('oblique_portfolio', this.portfolio);

    if (isSupabaseConfigured && supabase) {
      supabase.from('portfolio_projects').delete().eq('id', id).then();
    }
  }

  // INSIGHTS
  public getPosts(): BlogPost[] {
    return [...this.posts];
  }

  public getPostBySlug(slug: string): BlogPost | undefined {
    if (!slug) return undefined;
    const cleanSlug = slug.toLowerCase().trim();

    // 1. Exact match in published / review / active posts
    const exact = this.posts.find(p => p.slug?.toLowerCase() === cleanSlug);
    if (exact) return exact;

    // 2. Draft matching (e.g. previewing recent author drafts)
    const drafts = Object.values(this.draftArticles || {});
    const exactDraft = drafts.find(d => d.slug?.toLowerCase() === cleanSlug);
    if (exactDraft) return exactDraft;

    return undefined;
  }

  public savePost(rawPost: BlogPost) {
    const post = sanitizePostMedia(rawPost);
    const existingIndex = this.posts.findIndex(p => p.id === post.id);
    if (existingIndex >= 0) {
      const nextPosts = [...this.posts];
      nextPosts[existingIndex] = { ...post };
      this.posts = nextPosts;
    } else {
      this.posts = [{ ...post }, ...this.posts];
    }
    this.saveToStorage('oblique_posts', this.posts);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('oblique_posts_updated'));
    }

    if (isSupabaseConfigured && supabase) {
      supabase.from('blog_posts').upsert(mapBlogToDbPost(post)).then();
    }
  }

  public deletePost(id: string) {
    this.posts = this.posts.filter(p => p.id !== id);
    this.saveToStorage('oblique_posts', this.posts);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('oblique_posts_updated'));
    }

    if (isSupabaseConfigured && supabase) {
      supabase.from('blog_posts').delete().eq('id', id).then();
    }
  }

  // MEDIA PERSISTENCE (Section 10, 15, 22)
  public getMediaForArticle(articleId: string): MediaRecord[] {
    return this.mediaRecords.filter(m => m.articleId === articleId && m.status !== 'deleted');
  }

  public saveMediaRecord(record: MediaRecord) {
    const existingIdx = this.mediaRecords.findIndex(m => m.id === record.id);
    if (existingIdx >= 0) {
      this.mediaRecords[existingIdx] = record;
    } else {
      this.mediaRecords.unshift(record);
    }
    this.saveToStorage('oblique_media', this.mediaRecords);

    if (isSupabaseConfigured && supabase) {
      supabase.from('blog_media').upsert({
        id: record.id,
        article_id: record.articleId,
        author_id: record.authorId || null,
        storage_path: record.storagePath,
        public_url: record.publicUrl,
        file_name: record.fileName,
        mime_type: record.mimeType,
        file_size: record.fileSize,
        width: record.width || null,
        height: record.height || null,
        alt_text: record.altText || null,
        caption: record.caption || null,
        media_type: record.mediaType,
        status: record.status
      }).then();
    }
  }

  public markMediaUnused(mediaId: string) {
    const record = this.mediaRecords.find(m => m.id === mediaId);
    if (record) {
      record.status = 'unused';
      record.updatedAt = new Date().toISOString();
      this.saveToStorage('oblique_media', this.mediaRecords);

      if (isSupabaseConfigured && supabase) {
        supabase.from('blog_media').update({ status: 'unused' }).eq('id', mediaId).then();
      }
    }
  }

  public getAuthors(): AuthorProfile[] {
    return this.authors;
  }

  public getAuthorById(id: string): AuthorProfile | undefined {
    return this.authors.find(a => a.id === id);
  }

  // =========================================================================
  // AUTHOR AUTHENTICATION & PROFILES
  // =========================================================================
  public getCurrentAuthorUser(): AuthorUser | null {
    return this.currentAuthorUser;
  }

  public loginAuthor(email: string, _password?: string): AuthorUser {
    let existingProfile = this.authors.find(a => a.id === 'auth-user' || a.slug === email.split('@')[0]);
    const isComplete = existingProfile ? (existingProfile.fullName?.trim().length > 0 && !!existingProfile.title && !!existingProfile.bio && !!existingProfile.linkedInUrl) : false;

    const user: AuthorUser = {
      id: existingProfile ? existingProfile.id : `auth-${Date.now()}`,
      email: email.trim().toLowerCase(),
      name: existingProfile ? existingProfile.fullName : email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      avatarUrl: existingProfile?.avatarUrl || '/avatars/author-default.png',
      role: 'author',
      createdAt: new Date().toISOString(),
      profileCompleted: !!isComplete
    };

    this.currentAuthorUser = user;
    this.saveToStorage('oblique_author_user', user);
    return user;
  }

  public registerAuthor(name: string, email: string, _password?: string): AuthorUser {
    const newId = `auth-${Date.now()}`;
    const user: AuthorUser = {
      id: newId,
      email: email.trim().toLowerCase(),
      name: name.trim(),
      avatarUrl: '/avatars/author-default.png',
      role: 'author',
      createdAt: new Date().toISOString(),
      profileCompleted: false
    };

    const newProfile: AuthorProfile = {
      id: newId,
      slug: email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-'),
      fullName: name.trim(),
      title: '',
      bio: '',
      expertise: [],
      avatarUrl: '/avatars/author-default.png',
      linkedInUrl: '',
      isComplete: false
    };

    this.authors.unshift(newProfile);
    this.saveToStorage('oblique_authors', this.authors);

    this.currentAuthorUser = user;
    this.saveToStorage('oblique_author_user', user);

    if (isSupabaseConfigured && supabase) {
      supabase.from('authors').upsert(mapTsAuthorToDb(newProfile)).then();
    }

    return user;
  }

  public logoutAuthor(): void {
    this.currentAuthorUser = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('oblique_author_user');
    }
  }

  public getAuthorProfile(authorId?: string): AuthorProfile | undefined {
    const id = authorId || this.currentAuthorUser?.id;
    if (!id) return undefined;
    return this.authors.find(a => a.id === id);
  }

  public isAuthorProfileComplete(authorId?: string): boolean {
    const profile = this.getAuthorProfile(authorId);
    if (!profile) return false;
    return Boolean(
      profile.fullName?.trim() &&
      profile.title?.trim() &&
      profile.bio?.trim() &&
      profile.expertise?.length > 0 &&
      profile.linkedInUrl?.trim()
    );
  }

  public saveAuthorProfile(profile: AuthorProfile): void {
    const isComplete = Boolean(
      profile.fullName?.trim() &&
      profile.title?.trim() &&
      profile.bio?.trim() &&
      profile.expertise?.length > 0 &&
      profile.linkedInUrl?.trim()
    );

    const updatedProfile: AuthorProfile = {
      ...profile,
      isComplete
    };

    const existingIdx = this.authors.findIndex(a => a.id === profile.id);
    if (existingIdx >= 0) {
      this.authors[existingIdx] = updatedProfile;
    } else {
      this.authors.unshift(updatedProfile);
    }
    this.saveToStorage('oblique_authors', this.authors);

    if (this.currentAuthorUser && this.currentAuthorUser.id === profile.id) {
      this.currentAuthorUser.name = updatedProfile.fullName;
      this.currentAuthorUser.avatarUrl = updatedProfile.avatarUrl;
      this.currentAuthorUser.profileCompleted = isComplete;
      this.saveToStorage('oblique_author_user', this.currentAuthorUser);
    }

    if (isSupabaseConfigured && supabase) {
      supabase.from('authors').upsert(mapTsAuthorToDb(updatedProfile)).then();
    }
  }

  // =========================================================================
  // DRAFTS & EDITORIAL WORKFLOW
  // =========================================================================
  public getDraftArticle(authorId?: string): BlogPost | null {
    const id = authorId || this.currentAuthorUser?.id || 'default';
    return this.draftArticles[id] || null;
  }

  public saveDraftArticle(article: BlogPost, authorId?: string): void {
    const id = authorId || this.currentAuthorUser?.id || 'default';
    this.draftArticles[id] = {
      ...article,
      status: 'draft',
      updatedAt: new Date().toISOString()
    };
    this.saveToStorage('oblique_drafts', this.draftArticles);
  }

  public clearDraftArticle(authorId?: string): void {
    const id = authorId || this.currentAuthorUser?.id || 'default';
    delete this.draftArticles[id];
    this.saveToStorage('oblique_drafts', this.draftArticles);
  }

  public submitArticleForReview(article: BlogPost): BlogPost {
    const submitted: BlogPost = {
      ...article,
      status: 'review',
      updatedAt: new Date().toISOString(),
      publishedAt: article.publishedAt || new Date().toISOString()
    };

    this.savePost(submitted);

    const authorId = article.authorId || this.currentAuthorUser?.id || 'default';
    this.clearDraftArticle(authorId);

    return submitted;
  }

  public requestArticleChanges(articleId: string, feedback: { reviewerName: string; comment: string }): BlogPost | undefined {
    const post = this.posts.find(p => p.id === articleId);
    if (!post) return undefined;

    const newFeedback: ReviewFeedback = {
      id: `fb-${Date.now()}`,
      reviewerName: feedback.reviewerName,
      reviewerRole: 'Senior Technical Editor',
      date: new Date().toISOString(),
      comment: feedback.comment,
      status: 'changes_requested'
    };

    const updated: BlogPost = {
      ...post,
      status: 'changes_requested',
      updatedAt: new Date().toISOString(),
      reviewFeedback: [...(post.reviewFeedback || []), newFeedback]
    };

    this.savePost(updated);
    return updated;
  }

  public approveArticle(articleId: string): BlogPost | undefined {
    const post = this.posts.find(p => p.id === articleId);
    if (!post) return undefined;

    const updated: BlogPost = {
      ...post,
      status: 'approved',
      updatedAt: new Date().toISOString()
    };

    this.savePost(updated);
    return updated;
  }

  // FAQS
  public getFAQs(): FAQItem[] {
    return this.faqs;
  }

  public saveFAQ(faq: FAQItem) {
    const existingIndex = this.faqs.findIndex(f => f.id === faq.id);
    if (existingIndex >= 0) {
      this.faqs[existingIndex] = faq;
    } else {
      this.faqs.push(faq);
    }
    this.saveToStorage('oblique_faqs', this.faqs);

    if (isSupabaseConfigured && supabase) {
      supabase.from('faqs').upsert(mapTsFaqToDb(faq)).then();
    }
  }

  public deleteFAQ(id: string) {
    this.faqs = this.faqs.filter(f => f.id !== id);
    this.saveToStorage('oblique_faqs', this.faqs);

    if (isSupabaseConfigured && supabase) {
      supabase.from('faqs').delete().eq('id', id).then();
    }
  }

  // TESTIMONIALS
  public getTestimonials(): TestimonialSubmission[] {
    return this.testimonials;
  }

  public getApprovedTestimonials(): TestimonialSubmission[] {
    return this.testimonials.filter(t => t.status === 'approved');
  }

  public submitTestimonial(testimonial: Omit<TestimonialSubmission, 'id' | 'status' | 'submittedAt'>): TestimonialSubmission {
    const newSubmission: TestimonialSubmission = {
      ...testimonial,
      id: `test-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    this.testimonials.unshift(newSubmission);
    this.saveToStorage('oblique_testimonials', this.testimonials);

    if (isSupabaseConfigured && supabase) {
      supabase.from('testimonials').insert([mapTsTestimonialToDb(newSubmission)]).then();
    }

    return newSubmission;
  }

  public updateTestimonialStatus(id: string, status: 'pending' | 'approved' | 'rejected') {
    this.testimonials = this.testimonials.map(t => t.id === id ? { ...t, status } : t);
    this.saveToStorage('oblique_testimonials', this.testimonials);

    if (isSupabaseConfigured && supabase) {
      supabase.from('testimonials').update({ status }).eq('id', id).then();
    }
  }

  // INQUIRIES & CALL REQUESTS
  public async submitContact(data: Omit<ContactSubmission, 'id' | 'submittedAt' | 'status'>): Promise<ContactSubmission> {
    const submission: ContactSubmission = {
      ...data,
      id: `cnt-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };
    this.contactSubmissions.unshift(submission);
    this.saveToStorage('oblique_contacts', this.contactSubmissions);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('contact_submissions').insert([mapTsContactToDb(submission)]);
      } catch (err) {
        console.warn('Supabase contact submission error:', err);
      }
    }

    return submission;
  }

  public getContactSubmissions(): ContactSubmission[] {
    return this.contactSubmissions;
  }

  public async submitCallRequest(data: Omit<CallRequest, 'id' | 'submittedAt' | 'status'>): Promise<CallRequest> {
    const request: CallRequest = {
      ...data,
      id: `call-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    this.callRequests.unshift(request);
    this.saveToStorage('oblique_calls', this.callRequests);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('call_requests').insert([mapTsCallToDb(request)]);
      } catch (err) {
        console.warn('Supabase call request error:', err);
      }
    }

    return request;
  }

  public getCallRequests(): CallRequest[] {
    return this.callRequests;
  }

  public async submitProjectWizard(data: Omit<ProjectWizardInquiry, 'id' | 'submittedAt' | 'status'>): Promise<ProjectWizardInquiry> {
    const inquiry: ProjectWizardInquiry = {
      ...data,
      id: `wiz-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };
    this.wizardInquiries.unshift(inquiry);
    this.saveToStorage('oblique_wizards', this.wizardInquiries);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('project_wizard_inquiries').insert([mapTsWizardToDb(inquiry)]);
      } catch (err) {
        console.warn('Supabase wizard inquiry error:', err);
      }
    }

    return inquiry;
  }

  public getProjectWizardInquiries(): ProjectWizardInquiry[] {
    return this.wizardInquiries;
  }

  // SETTINGS
  public getSettings(): SiteSettings {
    return this.settings;
  }

  public updateSettings(newSettings: Partial<SiteSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    this.saveToStorage('oblique_settings', this.settings);

    if (isSupabaseConfigured && supabase) {
      supabase.from('site_settings').upsert(mapTsSettingsToDb(this.settings)).then();
    }
  }

  // =========================================================================
  // USER PLATFORM API ("MY OBLIQUE")
  // =========================================================================
  public getUserProfiles(): UserProfile[] {
    return Object.values(this.userProfiles || {});
  }

  public syncLiveUsers(liveUsers: UserProfile[]): void {
    const nextProfiles: Record<string, UserProfile> = {};
    liveUsers.forEach(u => {
      if (u.id) nextProfiles[u.id] = u;
    });
    this.userProfiles = nextProfiles;
    this.saveToStorage('oblique_user_profiles', this.userProfiles);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('oblique_profiles_updated'));
    }
  }

  public getUserProfileByEmail(email: string): UserProfile | undefined {
    if (!email) return undefined;
    const clean = email.trim().toLowerCase();
    return Object.values(this.userProfiles || {}).find(p => p.email.toLowerCase() === clean);
  }

  public getUserProfile(userId: string): UserProfile | undefined {
    if (!userId) return undefined;
    return this.userProfiles[userId];
  }

  public async saveUserProfile(profile: UserProfile): Promise<UserProfile> {
    const updated: UserProfile = {
      ...profile,
      updatedAt: new Date().toISOString()
    };
    this.userProfiles[profile.id] = updated;
    this.saveToStorage('oblique_user_profiles', this.userProfiles);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('oblique_profile_updated', { detail: updated }));
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('profiles').upsert(mapTsProfileToDb(updated));
      } catch (e) {
        console.warn('Supabase saveUserProfile error:', e);
      }
    }

    return updated;
  }

  public async deleteUserProfile(userId: string): Promise<boolean> {
    if (!userId) return false;
    delete this.userProfiles[userId];
    this.saveToStorage('oblique_user_profiles', this.userProfiles);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('oblique_profiles_updated'));
    }
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('profiles').delete().eq('id', userId);
      } catch (e) {
        console.warn('Supabase deleteUserProfile error:', e);
      }
    }
    return true;
  }

  public async updateUserRole(userId: string, role: UserRole): Promise<boolean> {
    const prof = this.userProfiles[userId];
    if (!prof) return false;
    prof.role = role;
    prof.updatedAt = new Date().toISOString();
    this.userProfiles[userId] = prof;
    this.saveToStorage('oblique_user_profiles', this.userProfiles);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('oblique_profiles_updated'));
    }
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('profiles').update({ role }).eq('id', userId);
      } catch (e) {
        console.warn('Supabase updateUserRole error:', e);
      }
    }
    return true;
  }

  public calculateProfileCompletion(profile?: UserProfile | null): number {
    if (!profile) return 0;
    const checks = [
      Boolean(profile.fullName?.trim()),
      Boolean(profile.email?.trim()),
      Boolean(profile.phone?.trim()),
      Boolean(profile.companyName?.trim()),
      Boolean(profile.jobTitle?.trim()),
      Boolean(profile.bio?.trim()),
      Boolean(profile.profilePhoto?.trim()),
      Boolean(profile.linkedin?.trim() || profile.website?.trim())
    ];
    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  }

  public getUserActivities(userId: string): UserActivity[] {
    if (!userId) return [];
    return this.userActivities[userId] || [];
  }

  public async logUserActivity(
    userId: string, 
    type: UserActivityType, 
    title: string, 
    description?: string, 
    metadata?: Record<string, any>
  ): Promise<UserActivity> {
    const activity: UserActivity = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
      type,
      title,
      description,
      metadata: metadata || {},
      timestamp: new Date().toISOString()
    };

    const list = this.userActivities[userId] || [];
    this.userActivities[userId] = [activity, ...list];
    this.saveToStorage('oblique_user_activities', this.userActivities);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('user_activities').insert([mapTsActivityToDb(activity)]);
      } catch (e) {
        console.warn('Supabase logUserActivity error:', e);
      }
    }

    return activity;
  }

  public getUserNotifications(userId: string): UserNotification[] {
    if (!userId) return [];
    return this.userNotifications[userId] || [];
  }

  public markNotificationAsRead(userId: string, notificationId: string): void {
    if (!userId || !this.userNotifications[userId]) return;
    this.userNotifications[userId] = this.userNotifications[userId].map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    this.saveToStorage('oblique_user_notifications', this.userNotifications);

    if (isSupabaseConfigured && supabase) {
      supabase.from('user_notifications').update({ read: true }).eq('id', notificationId).then();
    }
  }

  public async addNotification(
    userId: string,
    notif: Omit<UserNotification, 'id' | 'createdAt' | 'read'>
  ): Promise<UserNotification> {
    const item: UserNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      userId,
      read: false,
      createdAt: new Date().toISOString()
    };

    const current = this.userNotifications[userId] || [];
    this.userNotifications[userId] = [item, ...current];
    this.saveToStorage('oblique_user_notifications', this.userNotifications);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('user_notifications').insert([mapTsNotificationToDb(item)]);
      } catch (e) {
        console.warn('Supabase addNotification error:', e);
      }
    }

    return item;
  }

  public getUserFeedback(userId: string): UserFeedbackItem[] {
    if (!userId) return [];
    return this.userFeedbackItems.filter(f => f.userId === userId);
  }

  public async submitUserFeedback(
    data: Omit<UserFeedbackItem, 'id' | 'createdAt' | 'status'>
  ): Promise<UserFeedbackItem> {
    const feedback: UserFeedbackItem = {
      ...data,
      id: `fb-${Date.now()}`,
      status: 'submitted',
      createdAt: new Date().toISOString()
    };

    this.userFeedbackItems.unshift(feedback);
    this.saveToStorage('oblique_user_feedback', this.userFeedbackItems);

    // Also record user activity
    await this.logUserActivity(
      data.userId,
      'feedback_submitted',
      'Submitted Feedback',
      `Feedback category: ${data.category}`
    );

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('user_feedback').insert([mapTsFeedbackToDb(feedback)]);
      } catch (e) {
        console.warn('Supabase submitUserFeedback error:', e);
      }
    }

    return feedback;
  }

  public getUserProjectInquiries(userId: string): ProjectWizardInquiry[] {
    if (!userId) return [];
    return this.wizardInquiries.filter(w => w.userId === userId);
  }

  public getUserCallRequests(userId: string): CallRequest[] {
    if (!userId) return [];
    return this.callRequests.filter(c => c.userId === userId);
  }

  public getUserArticles(userId: string): BlogPost[] {
    if (!userId) return [];
    return this.posts.filter(p => p.authorId === userId);
  }
}

export const obliqueStore = new ObliqueStore();

