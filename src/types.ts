export interface PortfolioProject {
  id: string;
  number: string;
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  specs: {
    platform: string;
    timeline: string;
    performance: string;
    impact: string;
  };
  techStack: string[];
  gradient: string;
  deliverables: string[];
}

export interface StudioService {
  id: string;
  number: string;
  name: string;
  tagline: string;
  category: 'Design' | 'Engineering' | 'Marketing' | 'Strategy';
  description: string;
  highlights: string[];
  gradient: string;
  iconName: string;
}

export interface TechNode {
  id: string;
  category: 'frontend' | 'backend' | 'cloud' | 'marketing';
  from: string;
  to: string;
  detail: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  category: 'Logo' | 'Website' | 'Ecommerce' | 'SEO' | 'Digital Marketing';
  price: string;
  currency: string;
  turnaround: string;
  deliveryTime?: string;
  originalPrice?: string;
  subtitle?: string;
  revisions?: string;
  popular?: boolean;
  description: string;
  features: string[];
  guarantees: string[];
}

export interface ProcessStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverable: string;
  timeline: string;
  nextStep: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatarInitials: string;
  projectType?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Services & Process' | 'Pricing & Payment' | 'Development & Tech' | 'SEO & Marketing';
}

export interface ConsultationFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  company: string;
  serviceCategory: string;
  budgetRange: string;
  projectBrief: string;
}

// Backward compatible aliases
export type ProductItem = PortfolioProject;
export type MobilityGoal = PricingPackage;
export type FittingFormData = ConsultationFormData;
