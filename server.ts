import express from 'express';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const PORT = 3000;

// Lazy initialization of Gemini client to prevent crashing if key is missing
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are the official AI Studio Assistant for HiByHuman (https://hibyhuman.com), an elite UK Creative & Technology Studio based in Coatbridge, Scotland (2 Mitchell Street Coatbridge, ML5 5RT).
Tagline: "Human ideas. Powered by intelligent technology."
Phone: +44 7309 690259
Email: info@hibyhuman.com

YOUR MISSION:
1. Enthusiastically and concisely assist potential clients and partners with common service inquiries.
2. Explain HiByHuman's services, tech capabilities, packages, and warranties.
3. Actively guide users toward booking a consultation or scoping their project with our team.
4. Promote the exclusive 50% First Order Discount (voucher code: FIRST50).

CORE STUDIO SERVICES:
- Interactive UX/UI & Web Design: Custom websites, responsive web apps, high-conversion landing pages. Zero generic templates.
- Full-Stack & Mobile Development: React, Next.js, Node, Python, iOS, Android, cross-platform apps, APIs, cloud deployments.
- Digital Marketing & SEO: Google Ads (PPC), technical SEO, conversion rate optimization, analytics.
- Social Media Growth & Video: 9:16 vertical video reels (TikTok, Instagram, YouTube Shorts), viral strategy, content production.
- Pitch Decks & Investor Decks: High-impact presentations for startups raising seed, Series A, and grants.
- Brand Identity & Luxury Packaging: Bespoke logos, brand guidelines, print collateral, 300+ DPI packaging.
- Book Illustration & Publishing: Ghostwriting, children's book illustrations, Amazon KDP, ISBN, global distribution.

TRANSPARENT PRICING & TIERS:
- Basic Web Package: £249 (1-3 custom pages, mobile optimized, contact sync)
- Startup Web Package: £599 (5-7 custom pages, dynamic CMS, SEO foundation)
- Professional Web Package: £899 (Up to 10 pages, e-commerce or web app, custom animations)
- Enterprise Custom Platform: £1,799+ (Full-stack cloud platform, bespoke microservices)
- Logo Packages: Basic (£29.99), Startup (£59.99), Corporate Identity (£119.99)
- Promotional Discount: ALL new clients receive 50% OFF their first order with code FIRST50!

THE HIBYHUMAN TRIPLE GUARANTEE:
1. 100% Unique Bespoke Design: No pre-made templates or recycled themes.
2. 100% Satisfaction & Design Phase Money-Back Guarantee: Full refund if not completely satisfied with initial design before staging sign-off.
3. 100% Commercial IP & Source Code Ownership: Full copyright and Git repositories transferred upon final settlement.
4. 30-Day Post-Launch Warranty: Complimentary bug fixes and technical adjustments.

TONE & STYLE:
- Warm, polite, technologically savvy, transparent, and direct.
- Keep responses concise (2 to 4 short paragraphs or bullet points). Avoid long walls of text.
- Always include clear calls-to-action inviting the client to book a free discovery consultation, try the FIRST50 coupon code, or email info@hibyhuman.com / call or WhatsApp +44 7309 690259.
- If the user asks to book or wants a quote, tell them they can click the "Book Consultation" button in the chat or on the website right now.`;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // Check team photos existence and formats
  app.get('/api/team-photos-status', (_req, res) => {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const checkFile = (filename: string) => fs.existsSync(path.join(imagesDir, filename));
    
    res.json({
      boardroom: {
        webp: checkFile('hibyhuman-boardroom.webp'),
        png: checkFile('hibyhuman-boardroom.png'),
        original: checkFile('ChatGPT Image Sep 21, 2026, 05_17_14 PM.png'),
      },
      production: {
        webp: checkFile('hibyhuman-production-team.webp'),
        png: checkFile('hibyhuman-production-team.png'),
        original: checkFile('ChatGPT Image Sep 21, 2026, 05_17_05 PM.png'),
      },
    });
  });

  // Direct upload and WebP optimization endpoint for team photographs
  app.post('/api/upload-team-photo', async (req, res) => {
    try {
      const { photoType, base64Data, filename } = req.body;
      if (!photoType || !base64Data) {
        return res.status(400).json({ error: 'photoType and base64Data are required' });
      }

      const base64Clean = base64Data.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Clean, 'base64');
      const targetName = photoType === 'boardroom' ? 'hibyhuman-boardroom' : 'hibyhuman-production-team';
      const imagesDir = path.join(process.cwd(), 'public', 'images');
      
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }

      const pngPath = path.join(imagesDir, `${targetName}.png`);
      fs.writeFileSync(pngPath, buffer);

      // Convert to WebP using ffmpeg with high-efficiency compression
      const webpPath = path.join(imagesDir, `${targetName}.webp`);
      try {
        execSync(`ffmpeg -i "${pngPath}" -c:v libwebp -lossless 0 -q:v 85 -y "${webpPath}"`);
      } catch (err) {
        console.error('ffmpeg conversion error:', err);
      }

      if (filename) {
        try {
          fs.writeFileSync(path.join(imagesDir, filename), buffer);
        } catch (e) {}
      }

      return res.json({
        success: true,
        webpUrl: `/images/${targetName}.webp`,
        pngUrl: `/images/${targetName}.png`,
        hasWebp: fs.existsSync(webpPath),
      });
    } catch (err: any) {
      console.error('Error saving team photo:', err);
      return res.status(500).json({ error: err.message || 'Internal server error' });
    }
  });

  // AI Chat Endpoint powered by Gemini API
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }

      const client = getAIClient();

      // If Gemini API key is not configured, provide an intelligent fallback response
      if (!client) {
        const lastUserMessage = messages[messages.length - 1]?.content || '';
        const fallbackText = getSmartFallbackResponse(lastUserMessage);
        return res.json({
          reply: fallbackText,
          model: 'fallback-assistant',
          suggestBooking: true,
        });
      }

      // Build context from recent conversation history
      const lastUserMessage = messages[messages.length - 1]?.content || '';
      const previousTurns = messages.slice(-6, -1);
      
      let promptContents = lastUserMessage;
      if (previousTurns.length > 0) {
        promptContents = [
          'Recent conversation context:',
          ...previousTurns.map((m: any) => `${m.role === 'user' ? 'Client' : 'HiByHuman Assistant'}: ${m.content}`),
          '\nCurrent Client Question:',
          lastUserMessage,
        ].join('\n');
      }

      const generatePromise = client.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout waiting for Gemini response')), 7000)
      );

      const response = (await Promise.race([generatePromise, timeoutPromise])) as any;

      const replyText = response.text || "I'd be glad to help you bring your digital vision to life. Would you like to book a quick consultation with our team?";
      
      const shouldSuggestBooking =
        replyText.toLowerCase().includes('consultation') ||
        replyText.toLowerCase().includes('book') ||
        replyText.toLowerCase().includes('quote') ||
        replyText.toLowerCase().includes('package') ||
        replyText.toLowerCase().includes('50%');

      res.json({
        reply: replyText,
        model: 'gemini-3.8-flash',
        suggestBooking: shouldSuggestBooking,
      });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      const lastUserMessage = req.body?.messages?.[req.body?.messages?.length - 1]?.content || '';
      const fallbackText = getSmartFallbackResponse(lastUserMessage);
      res.json({
        reply: fallbackText,
        model: 'fallback-on-error',
        suggestBooking: true,
      });
    }
  });

  // Explicit SEO Endpoints: robots.txt & sitemap.xml
  app.get('/robots.txt', (_req, res) => {
    res.type('text/plain');
    res.sendFile(path.join(process.cwd(), 'public', 'robots.txt'));
  });

  app.get('/sitemap.xml', (_req, res) => {
    res.type('application/xml');
    res.sendFile(path.join(process.cwd(), 'public', 'sitemap.xml'));
  });

  const KNOWN_ROUTES = new Set([
    '/',
    '/case-studies',
    '/packages',
    '/all-packages',
    '/portfolio',
    '/portfolio-archive',
    '/privacy',
    '/privacy-policy',
    '/terms',
    '/terms-and-conditions',
    // 6 Core Studio Service Canonical Routes
    '/services/interactive-design',
    '/services/web-mobile-dev',
    '/services/motion-branding',
    '/services/digital-marketing',
    '/services/concept-strategy',
    '/services/illustrations-prototype',
    // 8 Verified Case Study Canonical Routes
    '/case-studies/jd-prestige-cars',
    '/case-studies/jd-prestige',
    '/case-studies/metco-global',
    '/case-studies/ufirst-coaching',
    '/case-studies/concept-eye-clinic',
    '/case-studies/camden-audiology',
    '/case-studies/sallaum-sky',
    '/case-studies/remecure',
    '/case-studies/khan-al-saboun',
    // Additional existing case studies
    '/case-studies/red-taxi',
    '/case-studies/world-energy-council',
    '/case-studies/el-piropo',
  ]);

  // Serve public/images directly
  app.use('/images', express.static(path.join(process.cwd(), 'public', 'images')));

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const normalizedPath = req.path.toLowerCase().replace(/\/+$/, '') || '/';
      const isValidRoute = KNOWN_ROUTES.has(normalizedPath) || normalizedPath.startsWith('/admin');
      res.status(isValidRoute ? 200 : 404).sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HiByHuman Server running on http://0.0.0.0:${PORT}`);
  });
}

function getSmartFallbackResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('price') || q.includes('cost') || q.includes('package') || q.includes('rate')) {
    return `HiByHuman offers transparent, fixed-scope pricing packages:
- **Basic Web Package (£249):** 1-3 bespoke pages, responsive layout, W3C valid code.
- **Startup Web Package (£599):** 5-7 custom pages, dynamic CMS, SEO foundation.
- **Professional Web Package (£899):** Up to 10 pages, e-commerce or web app, custom animations.
- **Enterprise Custom Platform (£1,799+):** Full-stack cloud platform, bespoke microservices.
- **Logo Packages:** Basic (£29.99), Startup (£59.99), Corporate (£119.99).

Plus, you receive **50% off your first project** with code **FIRST50**! Would you like to book a consultation to scope your project?`;
  }
  if (q.includes('discount') || q.includes('50%') || q.includes('voucher') || q.includes('promo') || q.includes('code')) {
    return `We are currently offering **50% off your first order** with promo code **FIRST50**! This applies across all bespoke web engineering, mobile development, UI/UX design, and branding services.

You can claim this right now by booking a free discovery consultation with our technical director.`;
  }
  if (q.includes('mobile') || q.includes('app') || q.includes('ios') || q.includes('android')) {
    return `Yes! We build high-performance **native and cross-platform mobile applications** for iOS and Android using React Native, Flutter, and PWA architectures.

From real-time synchronization and offline capabilities to payment gateway integration, we deliver production-ready apps with complete source code ownership. Would you like to discuss your app concept?`;
  }
  if (q.includes('guarantee') || q.includes('refund') || q.includes('money back')) {
    return `All HiByHuman projects are backed by our **Triple Guarantee**:
1. **100% Unique Design:** No pre-made templates or recycled themes.
2. **100% Money-Back Satisfaction Guarantee:** Full refund if not completely satisfied during the concept & design phase.
3. **100% IP & Code Ownership:** Complete source code and Git repository transfer upon final settlement.
4. **30-Day Post-Launch Warranty:** Complimentary technical support and bug fixes.`;
  }
  if (q.includes('timeline') || q.includes('turnaround') || q.includes('how long') || q.includes('time')) {
    return `Our delivery sprints are rapid and structured:
- **Logo Design:** 24-48 hours initial concepts.
- **Landing Pages & Basic Sites:** 3-5 business days.
- **Custom Web Platforms:** 1-2 weeks in iterative agile milestones.
- **Full Mobile Applications:** 2-4 weeks with weekly staging demos.

Every sprint includes continuous communication and dedicated UK project leadership.`;
  }
  if (q.includes('book') || q.includes('consultation') || q.includes('call') || q.includes('schedule') || q.includes('meet')) {
    return `Booking a discovery consultation is quick and easy! You can:
1. Click the **"Book Consultation (50% Off)"** button below to open our project brief dossier.
2. Call or WhatsApp us directly at **+44 7309 690259**.
3. Email your brief to **info@hibyhuman.com**.

Our technical director will review your requirements and provide an architecture blueprint and fixed-cost proposal within 2 hours!`;
  }
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('address') || q.includes('location') || q.includes('scotland')) {
    return `You can reach the HiByHuman team directly:
- **Email:** info@hibyhuman.com
- **Phone / WhatsApp:** +44 7309 690259
- **Studio Headquarters:** 2 Mitchell Street Coatbridge, ML5 5RT, Scotland, UK

We respond to all inquiries within 2 hours during business hours. How can we help you today?`;
  }
  return `Welcome to **HiByHuman**! We engineer bespoke web apps, mobile platforms, luxury brand identities, and high-ROI digital marketing systems.

All new clients receive **50% off their first project** with code **FIRST50**. How can we help bring your ideas to life today? Feel free to ask about our packages, tech stacks, or click below to book a free consultation!`;
}

startServer();
