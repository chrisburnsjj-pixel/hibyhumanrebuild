export interface ServiceDetailProcess {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceDetailEvidence {
  metric: string;
  label: string;
  detail: string;
}

export interface ServiceDetailFaq {
  question: string;
  answer: string;
}

export interface ServiceDetailData {
  slug: string;
  id: string;
  h1: string;
  title: string;
  metaDescription: string;
  category: string;
  shortTagline: string;
  summary: string;
  overview: string[];
  capabilities: string[];
  process: ServiceDetailProcess[];
  evidence: ServiceDetailEvidence[];
  techStack: string[];
  deliverables: string[];
  relatedCaseStudyIds: string[];
  relatedPackageIds: string[];
  faqs: ServiceDetailFaq[];
}

export const SERVICES_DATA: Record<string, ServiceDetailData> = {
  'interactive-design': {
    slug: 'interactive-design',
    id: 'interactive-design',
    h1: 'Interactive UI/UX Design & Human-Centric Digital Experiences',
    title: 'Interactive Design & UI/UX Studio UK',
    metaDescription: 'Bespoke interactive design, responsive UX/UI architecture, design systems, and rapid prototyping by HiByHuman. Crafting user-centric digital products in the UK.',
    category: 'Design & Interaction',
    shortTagline: 'Stimulating digital experiences & user-centric UX/UI architecture',
    summary: 'At HiByHuman, our interactive design practice centers on crafting engaging, friction-free digital experiences. We engineer bespoke design systems, micro-interactions, and conversion-focused user interfaces tailored specifically to your audience and commercial objectives.',
    overview: [
      'Interactive design at HiByHuman bridges human psychology, brand aesthetics, and ergonomic digital navigation. Rather than deploying generic component libraries, we construct custom blank-canvas UI architectures tailored to the behavioral flow of your target market.',
      'From complex SaaS workflows to high-converting consumer journeys, every interface is engineered with purposeful micro-animations, clear typographical hierarchies, and accessible design patterns that eliminate cognitive friction.',
      'Our interactive deliverables include comprehensive Figma component token libraries, responsive design documentation, and click-through prototypes ready for immediate engineering handoff.'
    ],
    capabilities: [
      'User-Centric Architecture & Journey Mapping',
      'Multi-Device Responsive & Adaptive Layouts',
      'Fluid Micro-Interactions & Motion Transitions',
      'Component-Driven Design Systems (250+ Tokens)',
      'High-Fidelity Clickable Interactive Prototypes',
      'WCAG AA Accessibility & Contrast Audits'
    ],
    process: [
      {
        step: '01',
        title: 'Discovery & Cognitive Journey Mapping',
        desc: 'We map out user personas, intent funnels, and pain points to establish a clean hierarchy of tasks before touching high-fidelity visuals.'
      },
      {
        step: '02',
        title: 'Wireframing & Information Architecture',
        desc: 'Structural blueprints and low-fidelity prototypes are drafted to validate spatial balance, content density, and conversion navigation.'
      },
      {
        step: '03',
        title: 'Design System & Token Architecture',
        desc: 'We create a rigorous design token system encompassing typography, colors, spatial units, button states, and form inputs.'
      },
      {
        step: '04',
        title: 'Micro-Interactions & Dynamic Motion',
        desc: 'Hover states, page transitions, and tactile feedback loops are introduced to elevate the tactile quality and perceived responsiveness.'
      },
      {
        step: '05',
        title: 'Usability Validation & Developer Handoff',
        desc: 'User testing validates task completion times, followed by pixel-perfect developer asset specs and interactive documentation.'
      }
    ],
    evidence: [
      { metric: '100/100', label: 'Core Web Vitals Target', detail: 'Layout shifts (CLS) strictly prevented via fixed aspect ratio bounding containers.' },
      { metric: '60 FPS', label: 'Animation Smoothness', detail: 'Hardware-accelerated CSS and transform animations for lag-free interactions.' },
      { metric: '250+', label: 'Design System Tokens', detail: 'Standardized design language deployed across web, mobile, and client portals.' }
    ],
    techStack: ['Figma Master', 'Adobe Creative Suite', 'Principle', 'Tailwind Design Tokens', 'WCAG AA Checkers'],
    deliverables: [
      'Figma Master Component Library',
      'Responsive Mobile & Tablet Viewports',
      'Interactive Prototype Links',
      'Design Token Specification Document',
      'Accessible Typography & Color Guide'
    ],
    relatedCaseStudyIds: ['concept-eye-clinic', 'sallaum-sky'],
    relatedPackageIds: ['web-pro', 'web-elite', 'logo-silver'],
    faqs: [
      {
        question: 'How does interactive design differ from standard web design?',
        answer: 'Standard web design often focuses on static aesthetics. Interactive design focuses on the tactile dialogue between the human user and the digital platform—accounting for micro-interactions, state changes, transitions, and user cognitive load.'
      },
      {
        question: 'What deliverables will our development team receive?',
        answer: 'Your team receives a fully organized Figma file with complete auto-layout component variants, responsive desktop/tablet/mobile breakpoints, exportable SVG assets, and design token documentation.'
      },
      {
        question: 'Do you design with accessibility standards in mind?',
        answer: 'Yes. All our interactive layouts and typography pairings are verified against WCAG AA standards for color contrast, readable baseline fonts, and clear touch targets (minimum 44px on mobile).'
      },
      {
        question: 'Can you improve the UI/UX of an existing live product?',
        answer: 'Absolutely. We regularly conduct UX audits and redesign critical conversion funnels, booking flows, or administrative portals without requiring a complete teardown of your underlying database.'
      }
    ]
  },

  'web-mobile-dev': {
    slug: 'web-mobile-dev',
    id: 'web-mobile-dev',
    h1: 'Full-Stack Web & Native Mobile Application Development',
    title: 'Bespoke Web & Mobile App Development UK',
    metaDescription: 'Custom full-stack web applications, React Native iOS/Android mobile apps, e-commerce architectures, and headless CMS engineered with clean W3C code by HiByHuman.',
    category: 'Engineering & Technology',
    shortTagline: 'Robust, extensible full-stack web platforms and native mobile applications',
    summary: 'Utilizing modern engineering technologies at the forefront of the industry, we build web and mobile solutions that are reliable, extensible, and precisely aligned with your commercial requirements. We enhance your operational presence with clean, performant code.',
    overview: [
      'HiByHuman engineers bespoke digital platforms and cross-platform applications built for speed, scalability, and airtight security. We avoid fragile page builders in favor of custom, typed codebases using React, Next.js, TypeScript, Node.js, and React Native.',
      'Every web application is optimized for sub-second serverless execution, responsive across every screen dimension, and constructed with clean semantic markup certified for search engine visibility.',
      'For mobile apps, our cross-platform architecture deploys fluid 60 FPS experiences to both Apple App Store and Google Play with unified backend APIs, real-time push notifications, and offline data sync.'
    ],
    capabilities: [
      'Custom Full-Stack Web Application Engineering',
      'Cross-Platform Mobile Apps (iOS & Android)',
      'High-Throughput E-Commerce Platforms (Stripe / Shopify)',
      'Headless Content Management Systems (CMS)',
      'RESTful & GraphQL API Infrastructure',
      'W3C Certified Clean Semantic Codebases'
    ],
    process: [
      {
        step: '01',
        title: 'Technical Architecture & Schema Design',
        desc: 'We define the database models, API contract specifications, and component hierarchy to ensure bulletproof technical foundations.'
      },
      {
        step: '02',
        title: 'Agile Milestone Sprints',
        desc: 'Development proceeds in focused agile sprints with live staging links, automated build checks, and transparent progress reports.'
      },
      {
        step: '03',
        title: 'Multi-Device QA & Security Auditing',
        desc: 'Rigorous cross-browser, cross-device, and security verification tests guarantee responsive fidelity and PCI/GDPR compliance.'
      },
      {
        step: '04',
        title: 'Global Edge Deployment',
        desc: 'Code is compiled, tree-shaken, and deployed to global edge CDN infrastructure with SSL, automated backups, and cache invalidation.'
      },
      {
        step: '05',
        title: 'Post-Launch Care & Uptime Monitoring',
        desc: 'Continuous uptime telemetry, performance auditing, and technical warranty support ensure reliable long-term operations.'
      }
    ],
    evidence: [
      { metric: '<1.0s', label: 'Average Load Time', detail: 'Sub-second edge loading speeds achieved through code splitting and asset optimization.' },
      { metric: '99.8%', label: 'Scheduled Uptime', detail: 'Cloud infrastructure engineered with high availability and automated failovers.' },
      { metric: '100%', label: 'IP Ownership Transfer', detail: 'Clients receive complete repository access and unrestricted commercial rights.' }
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'React Native', 'PostgreSQL', 'Stripe'],
    deliverables: [
      'Complete Production Source Code Repository',
      'Deployment to Production Server & CDN',
      'Administrative CMS / Content Control Panel',
      'API & Integration Documentation',
      'W3C Certified Markup & Automated Sitemaps'
    ],
    relatedCaseStudyIds: ['jd-prestige', 'concept-eye-clinic', 'sallaum-sky'],
    relatedPackageIds: ['web-startup', 'web-pro', 'web-elite', 'web-silver-startup', 'ecom-beginners'],
    faqs: [
      {
        question: 'Do you build on templates or create custom code?',
        answer: 'We build blank-canvas, custom-engineered codebases tailored to your specific functional and branding needs. This guarantees lightweight performance, zero bloat, and total architectural freedom.'
      },
      {
        question: 'Who owns the intellectual property and code upon completion?',
        answer: 'You do. Under our standard Terms & Conditions, 100% of the intellectual property, code repositories, and digital assets transfer fully to you upon milestone completion.'
      },
      {
        question: 'Can you integrate payment processors like Stripe or PayPal?',
        answer: 'Yes. We routinely build secure, PCI-DSS compliant checkout flows, recurring subscription engines, and automated invoice delivery using Stripe, PayPal, and Apple Pay.'
      },
      {
        question: 'Do your websites include a Content Management System (CMS)?',
        answer: 'Yes. Depending on your team’s workflow, we integrate user-friendly headless CMS solutions or custom admin portals allowing you to update text, images, blog posts, and packages effortlessly.'
      }
    ]
  },

  'motion-branding': {
    slug: 'motion-branding',
    id: 'motion-branding',
    h1: 'Motion Graphics, Visual Storytelling & Bespoke Brand Systems',
    title: 'Motion Graphics & Luxury Brand Identity Studio UK',
    metaDescription: 'Elevate your market presence with custom logo suites, comprehensive brand guidelines, 2D/3D motion graphics, and corporate stationery crafted by HiByHuman.',
    category: 'Branding & Motion',
    shortTagline: 'Captivating motion graphics and distinctive, long-lasting brand identities',
    summary: 'We combine cinematic motion design with rigorous brand strategy to ensure your visual identity commands immediate authority. From vector logo suites to dynamic animated idents, our team develops captivating visual assets that elevate your market stature.',
    overview: [
      'In a crowded digital marketplace, static brand marks are often overlooked. HiByHuman crafts living brand systems that translate seamlessly across physical stationery, packaging, web viewports, and high-energy motion video.',
      'Our branding practice starts with strategic market positioning, visual semiotics, and competitor landscape analysis. We develop vector marks, typography pairings, color palettes, and comprehensive brand books that guarantee visual consistency across every customer touchpoint.',
      'For motion graphics, we produce broadcast-ready 2D/3D animated idents, kinetic typography reels, and social motion assets that drive high engagement and brand recall.'
    ],
    capabilities: [
      'Bespoke Brand Identity Systems & Logo Suites',
      'High-Impact 2D & 3D Motion Graphics',
      'Animated Logo Stingers & Video Idents',
      'Corporate Stationery & Print Collateral',
      'Comprehensive Brand Guidelines (PDF Master)',
      'Full Vector Source Delivery (AI, SVG, PDF, EPS)'
    ],
    process: [
      {
        step: '01',
        title: 'Brand Archetype & Semiotic Audit',
        desc: 'We analyze your commercial positioning, audience psychology, and industry competitors to establish clear creative guardrails.'
      },
      {
        step: '02',
        title: 'Concept Ideation & Vector Drafting',
        desc: 'Senior designers explore distinct creative directions with black-and-white silhouettes before introducing color palettes.'
      },
      {
        step: '03',
        title: 'Motion Choreography & Timing',
        desc: 'Dynamic physics, easing curves, and sound cues are integrated to bring the brand mark to life in video and digital viewports.'
      },
      {
        step: '04',
        title: 'Collateral & Stationery Extension',
        desc: 'The identity is applied across business cards, digital letterheads, presentation templates, and physical packaging.'
      },
      {
        step: '05',
        title: 'Brand Book & Master Asset Packaging',
        desc: 'We assemble a complete brand guideline document and package all vector source files across CMYK, RGB, and web formats.'
      }
    ],
    evidence: [
      { metric: '100%', label: 'Original Vector Guarantee', detail: 'Zero clip-art or template generation; every curve is crafted from scratch.' },
      { metric: '24–48h', label: 'Initial Concept TAT', detail: 'Rapid turnaround times for initial identity sprints and concept rounds.' },
      { metric: '42+', label: 'Global Markets Reached', detail: 'Brand and packaging systems successfully deployed in international retail.' }
    ],
    techStack: ['Adobe Illustrator', 'Adobe After Effects', 'Cinema 4D', 'Photoshop', 'InDesign'],
    deliverables: [
      'Master Vector Source Files (AI, SVG, EPS, PDF)',
      'High-Resolution PNG & JPEG Formats (RGB & CMYK)',
      'Motion Idents in 4K MP4 & Transparent WebM',
      'Corporate Stationery Suite (Card, Letterhead, Envelope)',
      'Comprehensive Brand Guidelines Book'
    ],
    relatedCaseStudyIds: ['metco-global', 'khan-al-saboun', 'remecure'],
    relatedPackageIds: ['logo-basic', 'logo-beginners', 'logo-silver', 'logo-gold'],
    faqs: [
      {
        question: 'Will I receive full vector source files for my logo?',
        answer: 'Yes. All logo packages include complete master vector files (.AI, .EPS, .SVG, and print-ready .PDF) allowing infinite scaling without loss of clarity.'
      },
      {
        question: 'What is included in the Brand Guidelines document?',
        answer: 'The brand book defines logo clear space, minimum sizing, primary and secondary color formulas (HEX, RGB, CMYK, Pantone), font pairings, photography styling, and rules on incorrect usage.'
      },
      {
        question: 'How many revisions are permitted during the branding process?',
        answer: 'Our packages range from multiple structured revision rounds to unlimited design revisions until your team is 100% satisfied with the outcome.'
      },
      {
        question: 'Can you produce animated logo intros for YouTube and social media?',
        answer: 'Yes. We deliver broadcast-quality 4K and 1080p video stingers, transparent WebM/alpha channels for website heroes, and kinetic social snippets.'
      }
    ]
  },

  'digital-marketing': {
    slug: 'digital-marketing',
    id: 'digital-marketing',
    h1: 'Data-Driven Digital Marketing, Google Ads PPC & Strategic SEO',
    title: 'High-ROI Digital Marketing, PPC & SEO Agency UK',
    metaDescription: 'Drive measurable revenue with high-intent Google Ads PPC campaigns, technical on-page SEO, social advertising funnels, and conversion rate optimization by HiByHuman.',
    category: 'Growth & Marketing',
    shortTagline: 'Proven SEO strategies, high-intent PPC campaigns & exponential brand reach',
    summary: 'As a results-first digital marketing studio, HiByHuman engineers campaigns designed to maximize return on ad spend (ROAS) and secure dominant organic search visibility. We combine forensic tracking audits, strategic search advertising, and conversion funnels.',
    overview: [
      'Modern digital marketing requires absolute precision in tracking, intent-based ad architecture, and rapid testing. We eliminate wasted ad spend by restructuring Google Ads campaigns around high-intent commercial queries and implementing negative keyword shields.',
      'Our search engine optimization (SEO) methodology focuses on fundamental technical excellence: structured data schema injection, semantic HTML hierarchy, fast Core Web Vitals, and authoritative topic clustering that search engines reward.',
      'Whether launching hyper-local lead generation or national e-commerce scale, we pair every campaign with custom landing pages optimized for maximum conversion throughput.'
    ],
    capabilities: [
      'Google Search & Display Ads (PPC Campaign Architecture)',
      'Technical On-Page & Off-Page Search Engine Optimization',
      'Forensic Conversion Tracking & Analytics Audits',
      'Meta & TikTok Paid Social Advertising Funnels',
      'High-Converting Landing Page Optimization (CRO)',
      'Strategic Copywriting & Email Nurture Automation'
    ],
    process: [
      {
        step: '01',
        title: 'Audience Intent & Competitor Audit',
        desc: 'We analyze current search query volumes, competitor cost-per-click trends, and past ad spend performance to locate conversion gaps.'
      },
      {
        step: '02',
        title: 'Tracking & Telemetry Infrastructure',
        desc: 'Server-side tracking, Google Tag Manager, and conversion pixels are installed and validated to eliminate phantom lead reporting.'
      },
      {
        step: '03',
        title: 'Ad Copy & Landing Experience Synergy',
        desc: 'We construct dedicated, rapid-loading landing pages that mirror search intent, lifting quality scores and reducing CPC.'
      },
      {
        step: '04',
        title: 'Negative Keyword Shielding & Bidding',
        desc: 'Continuous negative keyword additions stop wasteful spend on irrelevant queries while smart automated bidding scales conversions.'
      },
      {
        step: '05',
        title: 'Performance Telemetry & Iteration',
        desc: 'Clients receive transparent bi-weekly reports detailing real lead conversions, cost-per-acquisition (CPA), and pipeline value.'
      }
    ],
    evidence: [
      { metric: '668+', label: 'High-Intent Bookings', detail: 'Documented private luxury vehicle booking conversions on Google Ads.' },
      { metric: '-42%', label: 'CPA Reduction', detail: 'Significant acquisition cost reduction achieved across competitive medical campaigns.' },
      { metric: '#1 Rank', label: 'Search Dominance', detail: 'Secured top organic rankings across primary local and regional commercial terms.' }
    ],
    techStack: ['Google Ads', 'Google Tag Manager', 'GA4', 'Meta Ads Manager', 'Ahrefs', 'Semrush', 'Search Console'],
    deliverables: [
      'Structured Google Ads Campaign Architecture',
      'Negative Keyword Shield Database',
      'Technical SEO Implementation & XML Sitemaps',
      'High-Converting Landing Page Frameworks',
      'Monthly Transparent Telemetry Reports'
    ],
    relatedCaseStudyIds: ['jd-prestige', 'camden-audiology', 'ufirst-coaching'],
    relatedPackageIds: ['seo-startup', 'seo-scale', 'social-starter'],
    faqs: [
      {
        question: 'How quickly can we expect results from Google Ads campaigns?',
        answer: 'Google Ads generates qualified traffic as soon as campaigns go live. With our negative keyword shielding and conversion landing pages, initial high-intent leads typically arrive within the first 48 to 72 hours of campaign activation.'
      },
      {
        question: 'How long does organic SEO take to show meaningful traffic gains?',
        answer: 'While technical fixes (sitemaps, schema, crawlability) are recognized by search engines within days, competitive organic rankings and substantial traffic compound over 3 to 6 months of systematic content and link authority development.'
      },
      {
        question: 'Do you manage our ad spend directly or through our account?',
        answer: 'We operate directly within your own Google or Meta Ads account. You retain 100% transparency and ownership of your ad spend, payment methods, and historical conversion data.'
      },
      {
        question: 'What is conversion rate optimization (CRO)?',
        answer: 'CRO is the systematic refinement of landing pages to increase the percentage of visitors who complete a desired action—such as submitting a form, calling your team, or completing a checkout.'
      }
    ]
  },

  'concept-strategy': {
    slug: 'concept-strategy',
    id: 'concept-strategy',
    h1: 'Digital Concept Validation, Product Strategy & Go-to-Market Execution',
    title: 'Digital Product Strategy & Business Roadmaps UK',
    metaDescription: 'Transform ambitious ideas into actionable digital roadmaps. Market research, competitor analysis, value proposition design, and venture decks with HiByHuman.',
    category: 'Strategy & Advisory',
    shortTagline: 'Transforming ambitious concepts into actionable, high-growth commercial plans',
    summary: 'HiByHuman’s Concept & Strategy practice provides a rigorous framework for new digital products and business ventures. We evaluate market feasibility, build value proposition architecture, and produce VC-grade pitch materials that accelerate growth.',
    overview: [
      'Great digital ventures begin with strategic clarity before code is written. Our strategy team partners with founders, executives, and enterprise innovators to validate digital concepts, uncover underserved market niches, and craft defensible go-to-market roadmaps.',
      'We conduct deep competitor benchmarking, build detailed user persona matrices, and model monetization mechanisms. By stress-testing technical feasibility early, we prevent costly pivots and architectural dead-ends.',
      'Our strategy sprint outcomes include investor-ready pitch decks, financial infographics, product roadmaps, and digital transformation playbooks that mobilize internal teams and win external capital.'
    ],
    capabilities: [
      'In-Depth Market Research & Competitor Gap Analysis',
      'Value Proposition Architecture & Business Model Canvases',
      'VC-Grade Investor Pitch Decks & Infographics',
      'Product Launch & Go-To-Market (GTM) Roadmaps',
      'Technical Feasibility & Technology Stack Selection',
      'Digital Transformation & Operational Strategy'
    ],
    process: [
      {
        step: '01',
        title: 'Executive Stakeholder Workshop',
        desc: 'We unpack the core vision, target customer segments, commercial ambitions, and key constraints through structured discovery.'
      },
      {
        step: '02',
        title: 'Market & Competitor Intelligence',
        desc: 'Comprehensive benchmarking of incumbent offerings, pricing models, and technological gaps across target regional markets.'
      },
      {
        step: '03',
        title: 'Value Proposition & Monetization Modeling',
        desc: 'Defining the singular unfair advantage, pricing tiers, customer acquisition economics, and long-term retention loops.'
      },
      {
        step: '04',
        title: 'Technical Roadmapping & Phase Sprints',
        desc: 'Deconstructing the product into an MVP milestone schedule, balancing time-to-market with core technical stability.'
      },
      {
        step: '05',
        title: 'Investor Decks & Execution Playbook',
        desc: 'Producing narrative-driven pitch decks, financial charts, and operational playbooks ready for boardroom presentation.'
      }
    ],
    evidence: [
      { metric: '£18M+', label: 'Venture Capital Raised', detail: 'Capital successfully raised by startup founders using our pitch decks.' },
      { metric: '100+', label: 'Executive Boardrooms Won', detail: 'High-stakes corporate strategy presentations delivered to institutional boards.' },
      { metric: '100%', label: 'Confidentiality Protection', detail: 'All strategic analysis and venture IP executed under strict NDA protection.' }
    ],
    techStack: ['Figma', 'Keynote', 'Pitch.com', 'Miro', 'Notion', 'Excel / Financial Modeling'],
    deliverables: [
      'Complete Strategic Concept Document',
      'Competitor Matrix & Market Opportunity Report',
      'Investor Pitch Deck (Figma, Keynote & PDF Master)',
      'Phase-by-Phase MVP Development Roadmap',
      'Financial Model & Metric Infographics'
    ],
    relatedCaseStudyIds: ['metco-global', 'sallaum-sky'],
    relatedPackageIds: ['web-elite', 'web-silver-startup', 'logo-gold'],
    faqs: [
      {
        question: 'When should a founder engage your Concept & Strategy team?',
        answer: 'The ideal moment is before committing significant capital to software development. Validating market viability, user journeys, and feature prioritization saves thousands in development revisions.'
      },
      {
        question: 'What makes your investor pitch decks effective?',
        answer: 'We combine clear venture storytelling with institutional financial aesthetics. We translate technical complexity into intuitive TAM/SAM charts, unit economics, and crisp problem-solution narratives.'
      },
      {
        question: 'Do you sign non-disclosure agreements (NDAs)?',
        answer: 'Yes. We provide mutual NDAs before reviewing sensitive business plans, proprietary algorithms, or confidential market data.'
      },
      {
        question: 'Can you assist with go-to-market planning after the strategy phase?',
        answer: 'Yes. Because HiByHuman also builds web applications and runs digital marketing funnels, we seamlessly transition from strategic planning to engineering and customer acquisition.'
      }
    ]
  },

  'illustrations-prototype': {
    slug: 'illustrations-prototype',
    id: 'illustrations-prototype',
    h1: 'Custom Editorial Illustrations, 3D Mockups & Rapid Prototypes',
    title: 'Bespoke Digital Illustrations & Rapid Prototyping UK',
    metaDescription: 'Bring ideas to tangible life with bespoke digital illustrations, character concept design, 3D CAD mockups, and interactive clickable prototypes by HiByHuman.',
    category: 'Illustration & Prototyping',
    shortTagline: 'Artistic precision and tangible, interactive product prototypes',
    summary: 'Aimed at bringing ambitious concepts to reality with art and accuracy, HiByHuman crafts highly detailed digital illustrations, luxury packaging mockups, and functional clickable prototypes that serve as vital reference assets for execution.',
    overview: [
      'Visual storytelling through bespoke illustration and 3D prototyping gives your brand an unmistakable aesthetic signature that stock assets cannot replicate. HiByHuman blends digital painting mastery with technical 3D visualization.',
      'From editorial publication art and character design to photorealistic cosmetic container renderings, our studio produces print-certified 300+ DPI masters and real-time interactive 3D assets.',
      'Our rapid prototyping practice produces high-fidelity interactive models that enable leadership teams and investors to experience a digital product before full-scale engineering commences.'
    ],
    capabilities: [
      'Bespoke Custom Digital Illustrations & Character Art',
      '3D Product Modeling & Luxury Packaging Mockups',
      'Editorial Book Illustrations & Print-Ready Covers (300 DPI)',
      'Clickable Web & Mobile Prototype Simulations',
      'Technical Schematics & Architectural Line Art',
      'Dynamic Storyboards & Scenario Visualizations'
    ],
    process: [
      {
        step: '01',
        title: 'Creative Briefing & Visual Moodboards',
        desc: 'We gather visual references, lighting styles, color harmonies, and thematic inspiration to define the artistic direction.'
      },
      {
        step: '02',
        title: 'Pencil Concept Sketches & Composition',
        desc: 'Rapid structural sketches explore composition, anatomy, lighting angles, and spatial focal points for early sign-off.'
      },
      {
        step: '03',
        title: 'High-Fidelity Rendering & Texture Inking',
        desc: 'Detailed digital painting, realistic lighting textures, and vector inking are layered to achieve rich visual depth.'
      },
      {
        step: '04',
        title: '3D CAD & Interactive Prototype Mapping',
        desc: 'Visual assets are mapped onto 3D bottle/box geometry or integrated into interactive Figma/WebGL viewport simulations.'
      },
      {
        step: '05',
        title: 'Color Proofing & Print/Web Master Delivery',
        desc: 'CMYK color profiles, separation plates, and multi-resolution web assets are compiled with full copyright assignment.'
      }
    ],
    evidence: [
      { metric: '300+ DPI', label: 'Print Certification', detail: 'High-resolution masters certified for commercial offset and packaging print.' },
      { metric: '18 SKUs', label: 'Cosmetic Line Packaged', detail: 'Full cosmetic packaging suite rendered and delivered for retail deployment.' },
      { metric: '100%', label: 'Handcrafted Artistry', detail: 'Every illustration is digitally painted by senior artists with zero generic clip-art.' }
    ],
    techStack: ['Procreate', 'Adobe Illustrator', 'Photoshop', 'Blender 3D', 'Figma', 'InDesign'],
    deliverables: [
      'Layered Master PSD & Vector AI Files',
      'Ultra-High-Resolution 300+ DPI Print Masters',
      '3D Render Views from Multiple Lighting Angles',
      'Interactive Click-Through Prototype Links',
      'Full Commercial Copyright Transfer Documentation'
    ],
    relatedCaseStudyIds: ['khan-al-saboun', 'remecure'],
    relatedPackageIds: ['logo-gold', 'web-elite', 'web-silver-startup'],
    faqs: [
      {
        question: 'Do you create children’s book and novel illustrations?',
        answer: 'Yes. We design complete cover art, full-page interior illustrations, character model sheets, and CMYK print-ready files tailored for Amazon KDP, IngramSpark, and traditional publishers.'
      },
      {
        question: 'Can you produce 3D packaging renders before physical manufacturing?',
        answer: 'Yes. We create photorealistic 3D mockups of bottles, boxes, foil stampings, and tubes, allowing you to validate retail presence and run pre-order marketing before manufacturing.'
      },
      {
        question: 'What is a rapid clickable prototype?',
        answer: 'A clickable prototype is an interactive digital model of your website or application. It looks and behaves like a live app, allowing stakeholders to test user flows without writing backend code.'
      },
      {
        question: 'Are illustrations delivered with full commercial rights?',
        answer: 'Yes. Every illustration and 3D render created for you includes complete commercial copyright transfer for use across digital, print, and retail distribution.'
      }
    ]
  }
};

export function getServiceBySlug(slug: string): ServiceDetailData | undefined {
  return SERVICES_DATA[slug];
}

export function getAllServices(): ServiceDetailData[] {
  return Object.values(SERVICES_DATA);
}
