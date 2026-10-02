export interface HeroContent {
  heading: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  heroImage?: string;
  heroVideo?: string;
  promoVoucherText?: string;
  promoVoucherCode?: string;
  updatedAt?: string;
}

export interface AboutContent {
  headline: string;
  description: string;
  missionStatement: string;
  pillars: {
    title: string;
    description: string;
    icon?: string;
  }[];
  stats: {
    label: string;
    value: string;
  }[];
  images?: string[];
  updatedAt?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  iconName?: string;
  buttonText: string;
  buttonUrl: string;
  highlights: string[];
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  techStack: string[];
  deliverables: string[];
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatarUrl: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamMemberItem {
  id: string;
  name: string;
  designation: string;
  profileImage: string;
  bio: string;
  linkedInUrl?: string;
  otherSocials?: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type SocialPlatform =
  | 'facebook'
  | 'instagram'
  | 'tiktok'
  | 'linkedin'
  | 'twitter'
  | 'youtube'
  | 'github'
  | 'threads'
  | 'custom';

export interface SocialLinkItem {
  id: string;
  platform: SocialPlatform;
  label: string;
  url: string;
  isActive: boolean;
  order: number;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  businessHours: string;
  socials?: {
    instagram?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    facebook?: string;
    tiktok?: string;
    [key: string]: string | undefined;
  };
  socialLinks?: SocialLinkItem[];
  updatedAt?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  order: number;
  isActive: boolean;
  isExternal?: boolean;
}

export interface FooterContent {
  description: string;
  copyright: string;
  quickLinks: {
    label: string;
    url: string;
  }[];
  updatedAt?: string;
}

export interface MediaAsset {
  id: string;
  fileName: string;
  downloadUrl: string;
  storagePath?: string;
  size?: number;
  mimeType?: string;
  uploadedAt: string;
}
