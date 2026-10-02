import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  writeBatch,
} from 'firebase/firestore';
import { db, auth } from './config';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
import {
  HeroContent,
  AboutContent,
  ServiceItem,
  ProjectItem,
  TestimonialItem,
  TeamMemberItem,
  ContactInfo,
  SocialLinkItem,
  NavigationItem,
  FooterContent,
  MediaAsset,
} from '../types/cms';
import {
  STUDIO_SERVICES,
  PORTFOLIO_PROJECTS,
  TESTIMONIALS_DATA,
  STUDIO_INFO,
} from '../data';

// ============================================================================
// DEFAULT FALLBACK DATA (Mirrors current live website content exactly)
// ============================================================================

export const DEFAULT_HERO_CONTENT: HeroContent = {
  heading: 'HUMAN IDEAS. POWERED BY INTELLIGENT TECHNOLOGY.',
  subtitle: 'Award-Winning Creative & Technology Engineering Studio',
  description:
    'HiByHuman transforms visionary ideas into world-class digital realities. We engineer bespoke web apps, high-conversion brand identities, viral social video, and investor pitch decks with zero generic templates.',
  primaryButtonText: 'Claim 50% Off First Project',
  primaryButtonUrl: '#packages',
  secondaryButtonText: 'Explore Bespoke Services',
  secondaryButtonUrl: '#services',
  promoVoucherText: 'Special Studio Offer: 50% Off First Order',
  promoVoucherCode: 'FIRST50',
};

export const DEFAULT_ABOUT_CONTENT: AboutContent = {
  headline: 'Crafting the Future of Human-Centric Technology',
  description:
    'Based in Coatbridge, Scotland, HiByHuman is a premier digital engineering studio blending artistic craftsmanship with cutting-edge intelligence.',
  missionStatement:
    'We believe software and design should feel alive, intuitive, and unmistakably authentic. Every interface is handcrafted with mathematical precision.',
  pillars: [
    {
      title: '100% Unique Bespoke Design',
      description: 'Zero pre-made templates or cookie-cutter builders. Every pixel crafted from scratch.',
    },
    {
      title: 'Full Intellectual Property Transfer',
      description: 'You own 100% of your source code, design files, and copyright upon milestone settlement.',
    },
    {
      title: 'Design-Phase Money-Back Guarantee',
      description: 'Complete peace of mind. Full refund guarantee during initial design presentation.',
    },
  ],
  stats: [
    { label: 'Client Satisfaction', value: '100%' },
    { label: 'Delivery Guarantee', value: '30-Day Warranty' },
    { label: 'Average Turnaround', value: '3-5 Days' },
    { label: 'Global Reach', value: 'UK & International' },
  ],
};

export const DEFAULT_SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'social-facebook',
    platform: 'facebook',
    label: 'Facebook',
    url: 'https://facebook.com/hibyhuman',
    isActive: true,
    order: 1,
  },
  {
    id: 'social-instagram',
    platform: 'instagram',
    label: 'Instagram',
    url: 'https://instagram.com/hibyhuman',
    isActive: true,
    order: 2,
  },
  {
    id: 'social-tiktok',
    platform: 'tiktok',
    label: 'TikTok',
    url: 'https://tiktok.com/@hibyhuman',
    isActive: true,
    order: 3,
  },
  {
    id: 'social-linkedin',
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/company/hibyhuman',
    isActive: true,
    order: 4,
  },
];

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  email: STUDIO_INFO.email || 'info@hibyhuman.com',
  phone: STUDIO_INFO.phone || '+44 7309 690259',
  whatsapp: STUDIO_INFO.whatsappUrl || 'https://wa.me/447309690259',
  address: STUDIO_INFO.address || '2 Mitchell Street Coatbridge, ML5 5RT, Scotland, UK',
  businessHours: 'Mon - Fri: 9:00 AM - 6:00 PM GMT',
  socials: {
    facebook: 'https://facebook.com/hibyhuman',
    instagram: 'https://instagram.com/hibyhuman',
    tiktok: 'https://tiktok.com/@hibyhuman',
    linkedin: 'https://linkedin.com/company/hibyhuman',
    github: 'https://github.com/chrisburnsjj-pixel',
    twitter: 'https://twitter.com/hibyhuman',
  },
  socialLinks: DEFAULT_SOCIAL_LINKS,
};

export function getActiveSocialLinks(contact?: ContactInfo): SocialLinkItem[] {
  if (!contact) return DEFAULT_SOCIAL_LINKS;

  if (Array.isArray(contact.socialLinks) && contact.socialLinks.length > 0) {
    return contact.socialLinks.filter((item) => item.isActive).sort((a, b) => a.order - b.order);
  }

  // Fallback to legacy contact.socials if socialLinks array was not yet saved
  const legacy: SocialLinkItem[] = [];
  if (contact.socials?.facebook) {
    legacy.push({ id: 'legacy-fb', platform: 'facebook', label: 'Facebook', url: contact.socials.facebook, isActive: true, order: 1 });
  }
  if (contact.socials?.instagram) {
    legacy.push({ id: 'legacy-ig', platform: 'instagram', label: 'Instagram', url: contact.socials.instagram, isActive: true, order: 2 });
  }
  if (contact.socials?.tiktok) {
    legacy.push({ id: 'legacy-tt', platform: 'tiktok', label: 'TikTok', url: contact.socials.tiktok, isActive: true, order: 3 });
  }
  if (contact.socials?.linkedin) {
    legacy.push({ id: 'legacy-li', platform: 'linkedin', label: 'LinkedIn', url: contact.socials.linkedin, isActive: true, order: 4 });
  }
  if (contact.socials?.twitter) {
    legacy.push({ id: 'legacy-tw', platform: 'twitter', label: 'X / Twitter', url: contact.socials.twitter, isActive: true, order: 5 });
  }
  if (contact.socials?.github) {
    legacy.push({ id: 'legacy-gh', platform: 'github', label: 'GitHub', url: contact.socials.github, isActive: true, order: 6 });
  }

  return legacy.length > 0 ? legacy : DEFAULT_SOCIAL_LINKS;
}

export const DEFAULT_NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'nav-1', label: 'Home', url: '#', order: 1, isActive: true },
  { id: 'nav-2', label: 'Services', url: '#services', order: 2, isActive: true },
  { id: 'nav-3', label: 'Packages', url: '#packages', order: 3, isActive: true },
  { id: 'nav-4', label: 'Case Studies', url: '#case-studies', order: 4, isActive: true },
  { id: 'nav-5', label: 'Portfolio', url: '#portfolio-archive', order: 5, isActive: true },
  { id: 'nav-6', label: 'About', url: '#story', order: 6, isActive: true },
  { id: 'nav-7', label: 'Contact', url: '#contact', order: 7, isActive: true },
];

export const DEFAULT_FOOTER_CONTENT: FooterContent = {
  description:
    'HiByHuman is an elite Scottish creative and technological engineering studio. We combine bespoke human craftsmanship with high-performance architectures to build next-generation digital products.',
  copyright: '© 2026 HiByHuman Creative & Tech Studio. All rights reserved.',
  quickLinks: [
    { label: 'All Packages (50% Off)', url: '#all-packages' },
    { label: 'Case Studies', url: '#case-studies' },
    { label: 'Portfolio Archive', url: '#portfolio-archive' },
    { label: 'Privacy Policy (UK GDPR)', url: '#privacy-policy' },
    { label: 'Terms & Guarantee', url: '#terms-and-conditions' },
    { label: 'Admin Portal', url: '/admin' },
  ],
};

export function getDefaultServices(): ServiceItem[] {
  return STUDIO_SERVICES.map((s, index) => ({
    id: s.id,
    title: s.name,
    tagline: s.tagline || s.name,
    description: s.description,
    category: s.category || 'Engineering',
    iconName: s.iconName || 'Code2',
    buttonText: 'Scope This Service (50% Off)',
    buttonUrl: '#packages',
    highlights: s.highlights || ['Bespoke Architecture', '100% Code Ownership', '30-Day Support'],
    order: index + 1,
    isActive: true,
  }));
}

export function getDefaultProjects(): ProjectItem[] {
  return PORTFOLIO_PROJECTS.map((p, index) => ({
    id: p.id,
    title: p.title,
    client: p.client || 'HiByHuman Client',
    year: p.year || '2026',
    category: p.category || 'Web Application',
    description: p.description,
    imageUrl: '',
    projectUrl: '#',
    techStack: p.techStack || ['React', 'TypeScript', 'Tailwind CSS'],
    deliverables: p.deliverables || ['UI/UX Design', 'Full-Stack Development'],
    order: index + 1,
    isActive: true,
  }));
}

export function getDefaultTestimonials(): TestimonialItem[] {
  return TESTIMONIALS_DATA.map((t, index) => ({
    id: t.id,
    author: t.author,
    role: t.role,
    company: t.company,
    quote: t.quote,
    rating: t.rating || 5,
    avatarUrl: '',
    order: index + 1,
    isActive: true,
  }));
}

export const DEFAULT_TEAM_MEMBERS: TeamMemberItem[] = [
  {
    id: 'team-1',
    name: 'Christopher Burns',
    designation: 'Founder & Technical Director',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Pioneering human-centric software engineering and bespoke brand experiences across the UK and globally.',
    linkedInUrl: 'https://linkedin.com',
    order: 1,
    isActive: true,
  },
  {
    id: 'team-2',
    name: 'Elena Rostova',
    designation: 'Lead Creative & 3D UI Architect',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Specializing in generative design, fluid micro-interactions, and visual storytelling.',
    linkedInUrl: 'https://linkedin.com',
    order: 2,
    isActive: true,
  },
  {
    id: 'team-3',
    name: 'Marcus Vance',
    designation: 'Head of Growth & Performance SEO',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Architect of conversion funnels, enterprise technical SEO, and viral multi-channel campaigns.',
    linkedInUrl: 'https://linkedin.com',
    order: 3,
    isActive: true,
  },
];

// ============================================================================
// FIRESTORE READ & WRITE UTILITIES
// ============================================================================

export async function getSiteSetting<T>(sectionName: string, fallback: T): Promise<T> {
  try {
    const docRef = doc(db, 'siteSettings', sectionName);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...fallback, ...snap.data() } as T;
    }
  } catch (error) {
    console.warn(`Firestore: using fallback for siteSettings/${sectionName}:`, error);
  }
  return fallback;
}

export async function updateSiteSetting<T>(sectionName: string, data: Partial<T>): Promise<void> {
  const docRef = doc(db, 'siteSettings', sectionName);
  await setDoc(
    docRef,
    {
      ...data,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

// Collection fetchers
export async function getCollectionItems<T extends { id: string; order?: number; isActive?: boolean }>(
  collectionName: string,
  fallbackList: T[],
  onlyActive = false
): Promise<T[]> {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, orderBy('order', 'asc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const items: T[] = [];
      snap.forEach((docItem) => {
        items.push({ id: docItem.id, ...docItem.data() } as T);
      });
      if (onlyActive) {
        return items.filter((item) => item.isActive !== false);
      }
      return items;
    }
  } catch (error) {
    console.warn(`Firestore: using fallback for collection ${collectionName}:`, error);
  }
  if (onlyActive) {
    return fallbackList.filter((item) => item.isActive !== false);
  }
  return fallbackList;
}

// Item CRUD
export async function saveCollectionItem<T extends { id?: string }>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<string> {
  const docId = id || doc(collection(db, collectionName)).id;
  const docRef = doc(db, collectionName, docId);
  await setDoc(
    docRef,
    {
      ...data,
      id: docId,
      updatedAt: new Date().toISOString(),
      ...(data as any).createdAt ? {} : { createdAt: new Date().toISOString() },
    },
    { merge: true }
  );
  return docId;
}

export async function deleteCollectionItem(collectionName: string, id: string): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}

export async function batchReorderItems(
  collectionName: string,
  orderedItems: { id: string; order: number }[]
): Promise<void> {
  const batch = writeBatch(db);
  orderedItems.forEach((item) => {
    const docRef = doc(db, collectionName, item.id);
    batch.update(docRef, { order: item.order, updatedAt: new Date().toISOString() });
  });
  await batch.commit();
}

// One-click Seeder to bootstrap Firestore with existing site data
export async function seedFirestoreWithExistingSiteData(): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Settings
    await updateSiteSetting('hero', DEFAULT_HERO_CONTENT);
    await updateSiteSetting('about', DEFAULT_ABOUT_CONTENT);
    await updateSiteSetting('contact', DEFAULT_CONTACT_INFO);
    await updateSiteSetting('footer', DEFAULT_FOOTER_CONTENT);
    await updateSiteSetting('navigation', { items: DEFAULT_NAVIGATION_ITEMS });

    // 2. Services
    const defaultServices = getDefaultServices();
    for (const service of defaultServices) {
      await saveCollectionItem('services', service.id, service);
    }

    // 3. Projects
    const defaultProjects = getDefaultProjects();
    for (const project of defaultProjects) {
      await saveCollectionItem('projects', project.id, project);
    }

    // 4. Testimonials
    const defaultTestimonials = getDefaultTestimonials();
    for (const testimonial of defaultTestimonials) {
      await saveCollectionItem('testimonials', testimonial.id, testimonial);
    }

    // 5. Team
    for (const member of DEFAULT_TEAM_MEMBERS) {
      await saveCollectionItem('team', member.id, member);
    }

    return {
      success: true,
      message: 'All website content successfully seeded into Firestore database!',
    };
  } catch (error: any) {
    console.error('Failed to seed Firestore:', error);
    return {
      success: false,
      message: error?.message || 'Error occurred while seeding database.',
    };
  }
}
