import { PortfolioProject, StudioService, TechNode, PricingPackage, ProcessStage, TestimonialItem, FaqItem } from './types';

export const STUDIO_INFO = {
  name: 'HiByHuman',
  tagline: 'Human ideas. Powered by intelligent technology.',
  headline: 'Human ideas. Powered by intelligent technology.',
  subhead: 'We build digital experiences, intelligent solutions and creative systems that bring human ideas to life.',
  description: 'HiByHuman is where human ideas are powered by intelligent technology. A perfect combination of innovation, artificial intelligence, and expert engineering provides our clients with bespoke systems to grow and succeed in the cyber era.',
  phone: '+44 7309 690259',
  phoneRaw: '447309690259',
  whatsappUrl: 'https://wa.me/447309690259?text=Hi%20HiByHuman%2C%20I%20would%20like%20to%20inquire%20about%20a%20project',
  email: 'info@hibyhuman.com',
  location: '2 Mitchell Street Coatbridge, ML5 5RT',
  address: '2 Mitchell Street Coatbridge, ML5 5RT',
  website: 'https://hibyhuman.com',
  locations: [
    {
      title: 'Studio Headquarters',
      address: '2 Mitchell Street Coatbridge, ML5 5RT',
    },
    {
      title: 'Global Client Operations',
      address: 'London & Worldwide Digital Delivery',
    }
  ],
  stats: [
    { value: '10k+', label: 'Projects Completed', sub: 'Delivered across global markets' },
    { value: '8k+', label: 'Happy Customers', sub: 'Long-term enterprise partners' },
    { value: '25 Yrs', label: 'Combined Experience', sub: 'Award-winning UK innovators' },
    { value: '98', label: 'Awards & Honours', sub: 'Recognized globally' },
  ],
  pillars: [
    { percentage: '95%', title: 'Creative Excellence', desc: 'Exceptional creative concepts and executions in branding and digital product design that command target market attention.' },
    { percentage: '92%', title: 'Tailored Strategies', desc: 'Customized technical architectures and go-to-market strategies aligned with unique business objectives.' },
    { percentage: '91%', title: 'Timely Delivery', desc: 'Efficient agile sprint processes ensuring on-time milestone delivery without compromising code craftsmanship.' }
  ]
};

export const IMPACT_STATS = STUDIO_INFO.stats;

export const STUDIO_SERVICES: StudioService[] = [
  {
    id: 'interactive-design',
    number: '01',
    name: 'Interactive Design',
    tagline: 'Stimulating digital experiences & user-centric UX/UI',
    category: 'Design',
    description: 'At HiByHuman, our interactive design services focus on creating stimulating digital experiences. Unique and easy to navigate, we provide professional graphic and custom website design services tailored for your business-specific site.',
    highlights: [
      'User-Centric Design & Wireframing',
      'Fully Responsive Adaptive Layouts',
      'Dynamic & Engaging Micro-Interactions',
      'Cross-Platform System Integration',
      'Interactive High-Fidelity Prototyping',
      'Performance & Visual Optimisation'
    ],
    gradient: 'from-sky-500 to-blue-600',
    iconName: 'Layout'
  },
  {
    id: 'web-mobile-dev',
    number: '02',
    name: 'Web & Mobile Development',
    tagline: 'Robust, extensible full-stack web and native mobile apps',
    category: 'Engineering',
    description: 'Utilising technology at the forefront of development and innovative design, we create digital solutions that are reliable, extensible, and aligned with your business requirements. As a leading Apps Development Agency, we enhance your presence in the virtual world.',
    highlights: [
      'Custom Web Application Development',
      'Cross-Platform Mobile Apps (iOS & Android)',
      'High-Scale E-Commerce Architectures',
      'Headless Content Management Systems (CMS)',
      'REST & GraphQL API Engineering',
      'W3C Certified Clean Codebases'
    ],
    gradient: 'from-blue-600 to-indigo-600',
    iconName: 'Code'
  },
  {
    id: 'motion-branding',
    number: '03',
    name: 'Motion & Branding Design',
    tagline: 'Captivating motion graphics & distinctive brand identities',
    category: 'Design',
    description: 'We employ motion graphics and carefully crafted branding so that your impactful content meets your target demographics. Our team shapes and optimizes your logo or develops engaging motion content to elevate your brand to the next level.',
    highlights: [
      'Custom Branding Solutions & Systems',
      'Engaging 2D & 3D Motion Graphics',
      'Dynamic Animated Logos & Stingers',
      'Cinematic Commercial Video Production',
      'Visual Storytelling & Brand Guidelines',
      'Comprehensive Stationery & Collateral'
    ],
    gradient: 'from-purple-500 to-pink-600',
    iconName: 'Sparkles'
  },
  {
    id: 'digital-marketing',
    number: '04',
    name: 'Digital Marketing & SEO',
    tagline: 'Proven SEO strategies, PPC campaigns & exponential brand visibility',
    category: 'Marketing',
    description: 'As a digital marketing agency, HiByHuman provides solutions that improve your brand visibility and achieve tangible commercial results. Our approach integrates proven SEO strategies, targeted PPC, and high-conversion social campaigns.',
    highlights: [
      'Search Engine Optimisation (SEO)',
      'Pay-Per-Click Advertising (PPC & Google Ads)',
      'Social Media Strategy & Campaign Management',
      'High-Conversion Copywriting & Content',
      'Automated Email Marketing Funnels',
      'Influencer Marketing & Digital PR'
    ],
    gradient: 'from-emerald-500 to-teal-600',
    iconName: 'TrendingUp'
  },
  {
    id: 'concept-strategy',
    number: '05',
    name: 'Concept & Strategy',
    tagline: 'Transforming ambitious concepts into actionable, high-growth plans',
    category: 'Strategy',
    description: 'HiByHuman’s Concept & Strategy services form a strong framework for every business endeavour to be executed with precision and efficiency, where transformed concepts become actionable plans that propel your business forward.',
    highlights: [
      'Deep Market Research & Competitor Analysis',
      'Comprehensive SWOT & Opportunity Matrices',
      'Brand Positioning & Value Propositions',
      'Sustainable Business Model Development',
      'Product Launch & Go-To-Market Roadmaps',
      'End-to-End Digital Transformation Plans'
    ],
    gradient: 'from-amber-500 to-orange-600',
    iconName: 'Compass'
  },
  {
    id: 'illustrations-prototype',
    number: '06',
    name: 'Illustrations & Prototype',
    tagline: 'Artistic precision and tangible interactive prototypes',
    category: 'Design',
    description: 'Aimed at bringing your vision to reality with art and accuracy. We provide highly detailed illustrations and functional prototypes that provide crucial reference material in the early stages of product design and execution.',
    highlights: [
      'Bespoke Custom Digital Illustrations',
      'Concept Art & Character/Visual Design',
      'Technical & Architectural Schematics',
      '3D CAD & WebGL Product Prototyping',
      'Clickable Interactive Prototypes',
      'Dynamic Storyboard & User Flow Maps'
    ],
    gradient: 'from-rose-500 to-red-600',
    iconName: 'PenTool'
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'website-design-dev',
    number: '01',
    title: 'Website Design and development',
    client: 'Enterprise & Startups',
    year: '2024',
    category: 'Web Design & Dev',
    description: 'Bespoke UI/UX website design and full-stack development crafted from scratch with clean W3C certified code, responsive mobile layouts, and sub-second speed.',
    specs: {
      platform: 'Next.js, React & WordPress',
      timeline: '2–4 Weeks Agile',
      performance: '100/100 Core Web Vitals',
      impact: '3.5x Conversion Uplift'
    },
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress / Headless CMS'],
    gradient: 'from-sky-500 via-blue-600 to-indigo-700',
    deliverables: ['Custom Blank-Canvas Design', 'W3C Certified Clean Code', 'CMS / Admin Control Panel', 'Technical SEO & Sitemaps']
  },
  {
    id: 'social-media-management',
    number: '02',
    title: 'Social media management',
    client: 'Global Brands & Retail',
    year: '2024',
    category: 'Social Media',
    description: 'Full-service social channel management: strategic content calendars, viral paid campaigns, custom visual assets, community moderation, and audience growth.',
    specs: {
      platform: 'Meta, LinkedIn, X & TikTok',
      timeline: 'Monthly Retainer',
      performance: '99.8% Scheduled Uptime',
      impact: '+340% Community Reach'
    },
    techStack: ['Meta Business Suite', 'Hootsuite', 'Sprout Social', 'Canva Pro', 'CapCut Studio'],
    gradient: 'from-indigo-500 via-purple-600 to-pink-600',
    deliverables: ['Monthly Content Scheduling', 'Community Engagement & DMs', 'Hashtag & Viral Trend Playbook', 'Monthly Performance Telemetry']
  },
  {
    id: 'pitch-deck',
    number: '03',
    title: 'Pitch deck to raise fund',
    client: 'Seed & Series A/B Startups',
    year: '2024',
    category: 'Venture & Pitch',
    description: 'VC-grade investor pitch decks designed to captivate angels and institutional investors, articulate complex business models, and secure capital rounds.',
    specs: {
      platform: 'Figma, Keynote & PDF Master',
      timeline: '5–7 Days Sprint',
      performance: 'Investor-Vetted Narrative',
      impact: '£18M+ Capital Raised'
    },
    techStack: ['Figma', 'Keynote', 'Pitch.com', 'Adobe Illustrator', 'Financial Infographics'],
    gradient: 'from-amber-500 via-orange-600 to-emerald-600',
    deliverables: ['Problem-Solution Narrative Flow', 'Financial Model Infographics', 'TAM / SAM Market Visuals', 'Executive Leave-Behind One-Pager']
  },
  {
    id: 'powerpoint-presentations',
    number: '04',
    title: 'Powerpoint presentations',
    client: 'Corporate & Boardrooms',
    year: '2024',
    category: 'Presentations',
    description: 'High-impact corporate presentations, executive slide decks, and conference keynotes tailored to boardroom standards with custom typography and transitions.',
    specs: {
      platform: 'MS PowerPoint & Google Slides',
      timeline: '48–72 Hours Fast TAT',
      performance: 'Master Slide Architecture',
      impact: '100+ Boardrooms Won'
    },
    techStack: ['MS PowerPoint', 'Google Slides', 'Keynote', 'Custom Master Layouts', 'Vector Icons'],
    gradient: 'from-blue-600 via-cyan-600 to-teal-600',
    deliverables: ['Custom Master Slide Themes', 'Interactive Data Visualisation', 'Executive Keynote Decks', 'Animated Slide Sequences']
  },
  {
    id: 'mobile-app-dev',
    number: '05',
    title: 'mobile application development',
    client: 'Fintech & Consumer Tech',
    year: '2024',
    category: 'iOS & Android',
    description: 'Bespoke native and cross-platform mobile apps for iOS and Android, offering fluid 60 FPS animations, biometric authentication, and offline capability.',
    specs: {
      platform: 'React Native & Flutter / Swift',
      timeline: '8–12 Weeks Sprint',
      performance: '60 FPS Native Performance',
      impact: '350k+ App Downloads'
    },
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase / Supabase'],
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    deliverables: ['Cross-Platform iOS & Android Apps', 'Hardware & Camera Integration', 'App Store & Google Play Launch', 'Push Notification Engine']
  },
  {
    id: 'graphic-designing',
    number: '06',
    title: 'Graphic designing',
    client: 'Agencies & Enterprises',
    year: '2024',
    category: 'Visual Design',
    description: 'End-to-end bespoke graphic design services: custom brand identities, stationery, trade show collateral, commercial packaging, and digital assets.',
    specs: {
      platform: 'Adobe Creative Suite & Figma',
      timeline: '24–48 Hours TAT',
      performance: 'Vector Master Quality',
      impact: '100% Unique Design'
    },
    techStack: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Figma', 'Vector Rendering'],
    gradient: 'from-purple-500 via-fuchsia-600 to-pink-600',
    deliverables: ['Brand Logos & Style Guides', 'Marketing Banners & Brochures', 'Packaging & Print Master Files', 'Vector Source Files (AI, SVG, PDF)']
  },
  {
    id: 'book-illustration',
    number: '07',
    title: 'Book illustration',
    client: 'Authors & Publishers',
    year: '2024',
    category: 'Editorial Art',
    description: 'Enchanting children’s book illustrations, novel cover art, and graphic novel visuals crafted with rich storytelling, character design, and painterly detail.',
    specs: {
      platform: 'Digital Painting & Vector Art',
      timeline: 'Milestone Delivery',
      performance: '300+ DPI Print Certified',
      impact: 'Amazon Bestseller Rated'
    },
    techStack: ['Procreate', 'Adobe Illustrator', 'Photoshop', 'Clip Studio', 'InDesign'],
    gradient: 'from-teal-500 via-emerald-600 to-amber-500',
    deliverables: ['Cover Art Design & Typography', 'Full-Page Interior Illustrations', 'Character Concept Model Sheets', 'CMYK Print-Ready Files']
  },
  {
    id: 'ghost-writing',
    number: '08',
    title: 'Ghost writing',
    client: 'CEOs & Industry Leaders',
    year: '2024',
    category: 'Publishing & Copy',
    description: 'Confidential, elite ghostwriting capturing your distinct narrative for non-fiction books, executive memoirs, thought leadership articles, and viral op-eds.',
    specs: {
      platform: 'Manuscript & Editorial Suite',
      timeline: 'Chapter-by-Chapter Sprints',
      performance: '100% NDA Protection',
      impact: 'Published in Top Outlets'
    },
    techStack: ['Scrivener', 'Google Docs', 'Grammarly Pro', 'Hemingway Editor', 'Chicago Manual'],
    gradient: 'from-slate-700 via-slate-800 to-sky-900',
    deliverables: ['Full-Length Book Manuscripts', 'Thought Leadership Op-Eds', 'Executive Speeches & Memoirs', '100% Copyright Transfer']
  },
  {
    id: 'publication',
    number: '09',
    title: 'Publication',
    client: 'Independent & Trade Authors',
    year: '2024',
    category: 'Global Publishing',
    description: 'Turnkey book publishing, typesetting, global distribution, and ISBN registration across Amazon KDP, Apple Books, Barnes & Noble, and IngramSpark.',
    specs: {
      platform: 'Amazon KDP, IngramSpark & Print',
      timeline: 'End-to-End Release',
      performance: 'Global ISBN & Distribution',
      impact: 'Worldwide Bookstore Reach'
    },
    techStack: ['Amazon KDP', 'IngramSpark', 'Adobe InDesign', 'Calibre', 'ePub / Mobi Master'],
    gradient: 'from-amber-600 via-rose-600 to-indigo-700',
    deliverables: ['ISBN Assignment & Barcode Setup', 'Paperback & Hardcover Formatting', 'eBook ePub Conversion', 'Global Distribution Setup']
  }
];

export const TECH_ECOSYSTEM_NODES: TechNode[] = [
  { id: '1', category: 'frontend', from: 'CLIENT BROWSER REQUEST', to: 'REACT & NEXT.JS ENGINE', detail: 'Server-side rendering & instant sub-second page loads' },
  { id: '2', category: 'frontend', from: 'USER INTERACTION', to: 'TAILWIND & MOTION CORE', detail: 'Fluid 60 FPS micro-animations and zero layout shifts' },
  { id: '3', category: 'backend', from: 'REST & GRAPHQL APIS', to: 'NODE / PYTHON MICROSERVICES', detail: 'Scalable cloud backends with enterprise security compliance' },
  { id: '4', category: 'backend', from: 'E-COMMERCE TRANSACTIONS', to: 'STRIPE & SHOPIFY GATEWAY', detail: 'PCI-DSS certified seamless multi-currency checkouts' },
  { id: '5', category: 'cloud', from: 'ASSET PIPELINES', to: 'GLOBAL CDN EDGE DEPLOYMENT', detail: 'Automated WebP compression and sub-50ms asset delivery' },
  { id: '6', category: 'cloud', from: 'CMS CONTENT EDITS', to: 'HEADLESS API REVALIDATION', detail: 'Instant preview updates for marketing and editorial teams' },
  { id: '7', category: 'marketing', from: 'SEARCH ENGINE CRAWLER', to: 'SCHEMA & METATAG INJECTION', detail: '100% W3C valid semantic tags and Google-indexed sitemaps' },
  { id: '8', category: 'marketing', from: 'CAMPAIGN TRAFFIC SPIKE', to: 'AUTOSCALING CLOUD CLUSTERS', detail: 'Zero downtime during high-volume sales and launch events' },
];

export const PRICING_PACKAGES: PricingPackage[] = [
  // LOGO PACKAGES
  {
    id: 'logo-basic',
    name: 'Basic Logo Package',
    category: 'Logo',
    price: '29.99',
    currency: '£',
    turnaround: '24 Hours TAT',
    description: 'Perfect for new startups wanting a fast, clean, and distinct initial visual identity.',
    features: [
      '3 Custom Logo Design Concepts',
      '3 Revision Rounds',
      '24 Hours Fast Turnaround Time',
      'High-Resolution JPEG & PNG Files',
      'Suitable for Social & Digital Avatars'
    ],
    guarantees: ['100% Satisfaction Guarantee', '100% Unique Design Guarantee', '100% Money Back Guarantee']
  },
  {
    id: 'logo-beginners',
    name: 'Beginners Logo Package',
    category: 'Logo',
    price: '89.99',
    currency: '£',
    turnaround: '24 Hours TAT',
    popular: true,
    description: 'Our most popular identity package for small businesses establishing serious presence.',
    features: [
      '6 Custom Logo Design Concepts',
      'FREE App / Favicon Icon Design',
      'FREE Grayscale Formats Included',
      'FREE Color Palette Specifications',
      '6 Comprehensive Revision Rounds',
      'Full High-Res Formats (JPEG, PNG, PDF, TIFF)',
      '100% Full Commercial Ownership Rights'
    ],
    guarantees: ['100% Satisfaction Guarantee', '100% Unique Design (No Templates)', '100% Money Back Guarantee']
  },
  {
    id: 'logo-silver',
    name: 'Silver Logo Package',
    category: 'Logo',
    price: '149.99',
    currency: '£',
    turnaround: '24 Hours TAT',
    description: 'Complete corporate identity suite with custom business stationery design.',
    features: [
      '10 Custom Logo Design Concepts',
      '4 Dedicated Senior Designers Working on Project',
      'UNLIMITED Design Revisions',
      'FREE Custom Stationery Design (Letterhead, Envelope, Business Card)',
      'FREE MS Word Digital Letterhead Template',
      'FREE Grayscale & Vector Formats (AI, PSD, EPS, PDF, PNG)',
      '100% Full Ownership & Copyright Transfer'
    ],
    guarantees: ['100% Satisfaction Guarantee', '100% Unique Design Guarantee', '100% Money Back Guarantee']
  },
  {
    id: 'logo-gold',
    name: 'Gold Logo Package',
    category: 'Logo',
    price: '199.99',
    currency: '£',
    turnaround: '24 Hours TAT',
    description: 'The ultimate bespoke identity with 6 designers, invoices, and email signatures.',
    features: [
      'UNLIMITED Custom Logo Design Concepts',
      '6 Dedicated Senior Identity Designers',
      'UNLIMITED Revisions until absolute perfection',
      'FREE Custom Stationery Design (Card, Letterhead, Envelope)',
      'FREE Custom Invoice & Quotation Design',
      'FREE HTML Email Signature Design',
      'All Master Vector Source Files (AI, PSD, SVG, EPS, PDF)',
      'Lifetime File Backup in Cloud'
    ],
    guarantees: ['100% Satisfaction Guarantee', '100% Unique Design Guarantee', '100% Money Back Guarantee']
  },

  // WEBSITE PACKAGES
  {
    id: 'web-startup',
    name: 'Startup Website Package',
    category: 'Website',
    price: '199.99',
    currency: '£',
    turnaround: '48 to 72 Hours TAT',
    description: 'Essential high-impact online presence for local businesses and independent professionals.',
    features: [
      '3-Page Custom Designed Website',
      '5 Premium Stock Photos Included',
      '3 Custom Banner Designs',
      '1 Interactive Slider Banner',
      'FREE Google-Friendly Sitemap Generation',
      'Complete W3C Certified Clean HTML Code',
      'Social Media Integration (Facebook, Twitter, YouTube)',
      'Search Engine Submission'
    ],
    guarantees: ['100% Satisfaction Guarantee', '100% Unique Design Guarantee', '100% Money Back Guarantee']
  },
  {
    id: 'web-pro',
    name: 'Pro Website Package',
    category: 'Website',
    price: '599.99',
    currency: '£',
    turnaround: '48 to 72 Hours TAT',
    popular: true,
    description: 'Modern 10-page CMS website engineered for growing companies seeking lead generation.',
    features: [
      '10 Unique Custom-Designed Pages',
      'CMS / Admin Panel Support (Easy Self-Editing)',
      '8 Premium Stock Images Included',
      '5 Custom High-End Banner Designs',
      '1 Interactive Slider Banner',
      'Complete Deployment on Live Domain',
      'FREE Google-Friendly Sitemap & Submission',
      'Complete W3C Certified HTML Code',
      'Social Media Page Designs Included'
    ],
    guarantees: ['100% Satisfaction Guarantee', '100% Unique Design Guarantee', '100% Money Back Guarantee']
  },
  {
    id: 'web-elite',
    name: 'Elite Website Package',
    category: 'Website',
    price: '999.99',
    currency: '£',
    turnaround: '48 to 72 Hours TAT',
    description: 'Conceptual and dynamic digital experience with online reservations and payment gateways.',
    features: [
      'Up to 15 Unique Pages Website',
      'Conceptual, Dynamic & Mobile-First Architecture',
      'Online Reservation / Appointment Booking Tool',
      'Online Payment Gateway Integration',
      'Custom Lead Capturing & Inquiry Forms',
      'Striking Interactive Hover & Motion Effects',
      'Newsletter Subscription System',
      'Complete W3C Certified Semantic Code',
      'Dedicated Project Manager Support'
    ],
    guarantees: ['100% Satisfaction Guarantee', '100% Unique Design Guarantee', '100% Money Back Guarantee']
  },
  {
    id: 'web-silver-startup',
    name: 'Silver Enterprise Website',
    category: 'Website',
    price: '1599.99',
    currency: '£',
    turnaround: 'Bespoke Sprint',
    description: 'High-end interactive web system with custom CMS/PHP/React, multilingual and dedicated team.',
    features: [
      '15 to 20 Custom High-End Pages',
      'Custom Made, Interactive & High-End Design',
      'Custom WordPress or React/PHP Architecture',
      'Up to 10 Custom Made Banner Designs & 10 Stock Photos',
      'UNLIMITED Revisions on Design Phase',
      'Online Appointment / Scheduling / Ordering Module',
      'Multi-Lingual International Support',
      'Industry-Specified Team of Designers & Developers',
      'Dedicated Senior Accounts Manager'
    ],
    guarantees: ['100% Ownership Rights', '100% Satisfaction Guarantee', '100% Money Back Guarantee']
  },

  // E-COMMERCE PACKAGES
  {
    id: 'ecom-beginners',
    name: 'Beginners E-Commerce',
    category: 'Ecommerce',
    price: '999.99',
    currency: '£',
    turnaround: '10 to 14 Days',
    popular: true,
    description: 'Turnkey online store with complete shopping cart, payment gateway, and catalog management.',
    features: [
      'Up to 15 Unique Store Pages',
      'Content Management System (Shopify / WooCommerce)',
      'Mobile-First Responsive Shopping Experience',
      'Up to 100 Products & 7 Categories Configured',
      'Full Shopping Cart & Checkout Integration',
      'Payment Module Setup (Stripe, PayPal, Cards)',
      'Product Reviews & Rating Engine',
      'Free Google Friendly Sitemap',
      'Dedicated Accounts Manager'
    ],
    guarantees: ['100% Ownership Rights', '100% Satisfaction Guarantee', '100% Money Back Guarantee']
  },
  {
    id: 'ecom-corporate',
    name: 'Corporate E-Commerce',
    category: 'Ecommerce',
    price: '1799.99',
    currency: '£',
    turnaround: 'Comprehensive Sprint',
    description: 'Enterprise omnichannel store with unlimited products, inventory sync, and financial reports.',
    features: [
      'UNLIMITED Unique Pages & Unlimited Products',
      'UNLIMITED Categories with Advanced Filtering',
      'Sales & Inventory Management System',
      'Integrated Purchase Orders & Stock Alerts',
      'Partial Order Fulfillment & Backordering Support',
      'Financial & Sales Analytics Reporting Engine',
      'Custom Corporate Email Addresses',
      'Multi-Currency & International Tax Engine',
      'Complete Deployment & Staff Training Session'
    ],
    guarantees: ['100% Ownership Rights', '100% Satisfaction Guarantee', '100% Money Back Guarantee']
  },

  // SEO PACKAGES
  {
    id: 'seo-startup',
    name: 'Startup SEO Package',
    category: 'SEO',
    price: '499.99',
    currency: '£',
    turnaround: 'Monthly Retainer',
    description: 'Guaranteed search engine ranking on Google with essential on-page and off-page optimization.',
    features: [
      '5 Target Keywords with Guaranteed Ranking on Google',
      'Complete On-Site & Off-Site SEO Optimization',
      'Strategic High-Authority Link Building',
      'In-Depth Website Analysis & Penalty Check',
      'Content Duplicity & Keyword Research Analysis',
      'Google My Business & Bing Local Listings',
      'Monthly Search Engine Rank & Activity Reports',
      'Dedicated SEO Accounts Manager'
    ],
    guarantees: ['Guaranteed Google Ranking', 'White-Hat SEO Standards', 'Transparent Monthly Reports']
  },
  {
    id: 'seo-identity',
    name: 'Identity SEO Package',
    category: 'SEO',
    price: '849.99',
    currency: '£',
    turnaround: 'Monthly Retainer',
    popular: true,
    description: '10 Keywords with technical code cleanup, page speed enhancement, schema markup, and PR.',
    features: [
      '10 Target Keywords with Guaranteed Google Ranking',
      'Title, Meta Tags & Schema Markup Implementation',
      'Page Speed & Core Web Vitals Optimization',
      'Internal Link Structuring & Canonicalization Check',
      'Robots.txt & Sitemap Creation and Maintenance',
      '2 Blog Articles & 1 Info Content Piece Per Month',
      'Press Release Writing & Distribution',
      'Google Analytics 4 & Webmaster Tools Integration'
    ],
    guarantees: ['Guaranteed Google Ranking', 'Technical Code Optimization', 'Dedicated Specialist']
  },
  {
    id: 'seo-elite',
    name: 'Elite SEO Package',
    category: 'SEO',
    price: '1549.99',
    currency: '£',
    turnaround: 'Monthly Retainer',
    description: '20 Keywords targeting competitive commercial search queries with aggressive backlink strategy.',
    features: [
      '20 High-Value Competitive Keywords',
      'Advanced Competitor Backlink Reversal',
      'Comprehensive HTML Code Clean-up & Tag Optimization',
      'Schema.org Rich Snippets for SERP Dominance',
      'Press Release Writing & Multi-Channel Distribution',
      'High-Authority Social Bookmarking Syndication',
      'Detailed Conversion Funnel Tracking in GA4',
      'Weekly Progress Calls with Senior Strategist'
    ],
    guarantees: ['Top-Tier Search Visibility', 'Dedicated SEO Squad', 'Monthly ROI Breakdowns']
  },

  // DIGITAL MARKETING
  {
    id: 'marketing-startup',
    name: 'Startup Social Plan',
    category: 'Digital Marketing',
    price: '350.99',
    currency: '£',
    turnaround: 'Monthly Retainer',
    description: 'Consistent, professional social media posting and audience growth for new brands.',
    features: [
      '3 Postings Per Week across Facebook, Twitter/X, Instagram, LinkedIn',
      'Custom Graphic Content Creation',
      'Business Page & Bio Optimization',
      'Targeted Social Media Overview Strategy',
      'Audience Engagement Campaign',
      'Professional Ad & Post Copywriting',
      'Monthly Progress & Reach Analytics Report'
    ],
    guarantees: ['Brand Consistency', 'Dedicated Content Creator', 'Monthly Growth Reports']
  },
  {
    id: 'marketing-scaling',
    name: 'Scaling Growth Plan',
    category: 'Digital Marketing',
    price: '700.99',
    currency: '£',
    turnaround: 'Monthly Retainer',
    popular: true,
    description: '5 postings weekly with ad campaign management, spam monitoring, and reputation oversight.',
    features: [
      '5 High-Impact Postings Per Week Across All Channels',
      'Bespoke Copywriting & Custom Visual Graphic Designs',
      'Paid Ad Campaign Management (Meta / Google)',
      'Brand Reputation Management & Spam Monitoring',
      'Active Social Media Listening & Community Queries',
      'Social Account Setup & Integration',
      'Bi-Weekly In-Depth Progress Reports'
    ],
    guarantees: ['Targeted Lead Influx', 'Reputation Shield', 'Active Engagement']
  },
  {
    id: 'marketing-venture',
    name: 'Venture Enterprise Plan',
    category: 'Digital Marketing',
    price: '1200.99',
    currency: '£',
    turnaround: 'Monthly Retainer',
    description: 'High-velocity 6 postings/week with aggressive ad spend optimization and social hearing.',
    features: [
      '6 Postings Per Week Across Meta, X, LinkedIn, TikTok',
      'Comprehensive Video Reels & Motion Graphic Ads',
      'Advanced Retargeting & Lookalike Audience Campaigns',
      'Dedicated Community Manager for Real-Time Query Replies',
      'Influencer Collab Strategy & Outreach',
      'Brand Sentiment & Social Hearing Analytics',
      'Weekly Executive Dashboard & Strategy Sync'
    ],
    guarantees: ['Maximum Market Reach', 'Dedicated Growth Team', 'Guaranteed Campaign Scaling']
  }
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'Concept, Discovery & Market Strategy',
    subtitle: 'Understanding your commercial vision & competitive edge',
    description: 'We perform deep market research, audience profiling, and technical requirement mapping. We analyze your competitors and synthesize your value proposition into an actionable blueprint.',
    deliverable: 'Strategic Project Blueprint, Scope of Work & Wireframe Architecture',
    timeline: 'Days 1–3',
    nextStep: 'Interactive UI/UX & High-Fidelity Prototyping'
  },
  {
    step: '02',
    title: 'Interactive UI/UX & High-Fidelity Prototype',
    subtitle: 'Bringing your brand to life with artistic precision',
    description: 'Our senior designers craft custom visual systems, interactive wireframes, and clickable prototypes. You will experience how your digital product looks, feels, and interacts before a single line of code is written.',
    deliverable: 'Figma Design System, Clickable Prototype & Asset Master Files',
    timeline: 'Days 4–7',
    nextStep: 'Custom Engineering & Full-Stack Deployment'
  },
  {
    step: '03',
    title: 'Custom Engineering & W3C Certified Deployment',
    subtitle: 'Crafted with clean code, scalability, and sub-second speed',
    description: 'Our UK engineering team builds your bespoke web or mobile application with cutting-edge frameworks (React, Next.js, TypeScript, Shopify, or WordPress). Every project undergoes rigorous QA and cross-device testing.',
    deliverable: 'Full-Stack Source Code, W3C Certified Markup & Live Staging Review',
    timeline: 'Days 8–18',
    nextStep: 'Launch, SEO Indexing & Scaled Marketing'
  },
  {
    step: '04',
    title: 'Launch, SEO Indexing & Scaled Growth',
    subtitle: 'Guaranteed rankings, continuous support & commercial success',
    description: 'We deploy to your live domain with zero downtime, configure Google Analytics 4, submit XML sitemaps, and initiate your custom SEO or marketing campaigns to start driving qualified traffic from day one.',
    deliverable: 'Live Production Launch, Google Indexing & 30-Day Post-Launch Support',
    timeline: 'Launch Day & Beyond',
    nextStep: 'Scaling your business in the global cyber era'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: '1',
    quote: 'When it comes to digital systems and website redesign, HiByHuman hit the bull’s-eye! The assigned team delivered a clean and intuitive experience that turned out to be a game-changer for us by effectively multiplying visitor engagement.',
    author: 'Sarah',
    role: 'Marketing Manager',
    company: 'Enterprise Retail UK',
    rating: 5,
    avatarInitials: 'SM'
  },
  {
    id: '2',
    quote: 'Bravo to HiByHuman! They engineered a truly unique brand identity and intelligent platform that speaks volumes to our audience. Their work has helped us stand tall in our field, making us memorable to our customers.',
    author: 'Jack',
    role: 'Chief Imagineer',
    company: 'Creative Horizons',
    rating: 5,
    avatarInitials: 'JK'
  },
  {
    id: '3',
    quote: 'HiByHuman increased our digital activity and attracted high-converting qualified leads: they are truly knowledgeable about modern AI, web apps and digital media. We couldn’t be happier with our ROI.',
    author: 'David',
    role: 'Head of Growth',
    company: 'Fintech Solutions Group',
    rating: 5,
    avatarInitials: 'DH'
  },
  {
    id: '4',
    quote: 'Our team gives impactful and positive feedback on HiByHuman’s services, quick turnarounds, and top-tier engineering support. They transformed our digital presence seamlessly.',
    author: 'Jessica Sherlock',
    role: 'Manager',
    company: 'Oitaka Group',
    rating: 5,
    avatarInitials: 'JS'
  },
  {
    id: '5',
    quote: 'From custom full-stack architecture to intelligent digital campaigns, HiByHuman delivered results that exceeded our highest projections. A genuine strategic innovation partner.',
    author: 'Adam Smith',
    role: 'Managing Director',
    company: 'British Heritage Brands',
    rating: 5,
    avatarInitials: 'AS'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Services & Process',
    question: 'What makes HiByHuman different from other digital agencies?',
    answer: 'HiByHuman combines human creative thinking with intelligent technology. We do not rely on generic templates—every solution is custom engineered to your exact business objectives, built with clean code, and backed by a 100% satisfaction guarantee.'
  },
  {
    category: 'Pricing & Payment',
    question: 'What is included in your 100% Money Back & Satisfaction Guarantee?',
    answer: 'We stand firmly behind the quality of our work. If you are not completely satisfied with the initial design concepts presented by our team during the design phase, you are entitled to a 100% money-back refund. We also guarantee 100% unique custom design with zero copied templates.'
  },
  {
    category: 'Development & Tech',
    question: 'Do I get 100% ownership rights and source code of my website or system?',
    answer: 'Yes, absolutely. Upon final project sign-off and completion, 100% commercial ownership rights and all master source files (AI, PSD, EPS, SVG, and clean source code repositories) are fully transferred to you. You maintain total intellectual property ownership.'
  },
  {
    category: 'Development & Tech',
    question: 'What technologies and CMS platforms does HiByHuman work with?',
    answer: 'Our engineering stack spans modern full-stack technologies including Python, JavaScript, TypeScript, React, Next.js, Node.js, Swift, Kotlin, PHP, and Rust. For content management and commerce, we build on WordPress, Shopify Plus, WooCommerce, Magento, Drupal, Webflow, and custom headless CMS architectures.'
  },
  {
    category: 'SEO & Marketing',
    question: 'How quickly will my website rank on Google with your SEO packages?',
    answer: 'Our SEO packages target verified high-intent keywords using strict Google white-hat standards (on-page semantic tags, schema markup, technical site speed, and high-authority link building). Clients typically see noticeable keyword upward movement within 30 to 60 days, with guaranteed rankings reported in transparent monthly dashboards.'
  },
  {
    category: 'Services & Process',
    question: 'How fast can you start our project and what is the turnaround time?',
    answer: 'We can kick off your project within 24 business hours of your consultation. Logo design concepts are delivered in as little as 24 hours, startup websites in 48 to 72 hours, and comprehensive custom web or e-commerce applications in agile 2-to-4 week development sprints.'
  }
];

export const TECH_BADGES = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Swift', 'Kotlin', 'Rust',
  'PHP', 'Shopify Plus', 'WordPress', 'WooCommerce', 'Magento', 'Node.js', 'Tailwind CSS', 'Three.js / WebGL'
];
