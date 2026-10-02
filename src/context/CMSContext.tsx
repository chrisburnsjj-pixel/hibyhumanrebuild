import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  HeroContent,
  AboutContent,
  ServiceItem,
  ProjectItem,
  TestimonialItem,
  TeamMemberItem,
  ContactInfo,
  NavigationItem,
  FooterContent,
} from '../types/cms';
import {
  DEFAULT_HERO_CONTENT,
  DEFAULT_ABOUT_CONTENT,
  DEFAULT_CONTACT_INFO,
  DEFAULT_NAVIGATION_ITEMS,
  DEFAULT_FOOTER_CONTENT,
  DEFAULT_TEAM_MEMBERS,
  getDefaultServices,
  getDefaultProjects,
  getDefaultTestimonials,
  getSiteSetting,
  getCollectionItems,
} from '../firebase/firestore';

interface CMSContextType {
  hero: HeroContent;
  about: AboutContent;
  services: ServiceItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  team: TeamMemberItem[];
  contact: ContactInfo;
  navigation: NavigationItem[];
  footer: FooterContent;
  isLoading: boolean;
  refreshCMS: () => Promise<void>;
  isLiveFromFirestore: boolean;
}

const CMSContext = createContext<CMSContextType>({
  hero: DEFAULT_HERO_CONTENT,
  about: DEFAULT_ABOUT_CONTENT,
  services: getDefaultServices(),
  projects: getDefaultProjects(),
  testimonials: getDefaultTestimonials(),
  team: DEFAULT_TEAM_MEMBERS,
  contact: DEFAULT_CONTACT_INFO,
  navigation: DEFAULT_NAVIGATION_ITEMS,
  footer: DEFAULT_FOOTER_CONTENT,
  isLoading: false,
  refreshCMS: async () => {},
  isLiveFromFirestore: false,
});

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [hero, setHero] = useState<HeroContent>(DEFAULT_HERO_CONTENT);
  const [about, setAbout] = useState<AboutContent>(DEFAULT_ABOUT_CONTENT);
  const [services, setServices] = useState<ServiceItem[]>(getDefaultServices());
  const [projects, setProjects] = useState<ProjectItem[]>(getDefaultProjects());
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(getDefaultTestimonials());
  const [team, setTeam] = useState<TeamMemberItem[]>(DEFAULT_TEAM_MEMBERS);
  const [contact, setContact] = useState<ContactInfo>(DEFAULT_CONTACT_INFO);
  const [navigation, setNavigation] = useState<NavigationItem[]>(DEFAULT_NAVIGATION_ITEMS);
  const [footer, setFooter] = useState<FooterContent>(DEFAULT_FOOTER_CONTENT);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLiveFromFirestore, setIsLiveFromFirestore] = useState<boolean>(false);

  const fetchAllCMSData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Parallel fetch with fallbacks
      const [
        heroData,
        aboutData,
        contactData,
        footerData,
        navData,
        servicesData,
        projectsData,
        testimonialsData,
        teamData,
      ] = await Promise.all([
        getSiteSetting<HeroContent>('hero', DEFAULT_HERO_CONTENT),
        getSiteSetting<AboutContent>('about', DEFAULT_ABOUT_CONTENT),
        getSiteSetting<ContactInfo>('contact', DEFAULT_CONTACT_INFO),
        getSiteSetting<FooterContent>('footer', DEFAULT_FOOTER_CONTENT),
        getSiteSetting<{ items: NavigationItem[] }>('navigation', { items: DEFAULT_NAVIGATION_ITEMS }),
        getCollectionItems<ServiceItem>('services', getDefaultServices(), false),
        getCollectionItems<ProjectItem>('projects', getDefaultProjects(), false),
        getCollectionItems<TestimonialItem>('testimonials', getDefaultTestimonials(), false),
        getCollectionItems<TeamMemberItem>('team', DEFAULT_TEAM_MEMBERS, false),
      ]);

      if (heroData) setHero(heroData);
      if (aboutData) setAbout(aboutData);
      if (contactData) setContact(contactData);
      if (footerData) setFooter(footerData);
      if (navData?.items && navData.items.length > 0) setNavigation(navData.items);
      if (servicesData && servicesData.length > 0) setServices(servicesData);
      if (projectsData && projectsData.length > 0) setProjects(projectsData);
      if (testimonialsData && testimonialsData.length > 0) setTestimonials(testimonialsData);
      if (teamData && teamData.length > 0) setTeam(teamData);

      setIsLiveFromFirestore(true);
    } catch (err) {
      console.warn('Using default static CMS data fallback:', err);
      setIsLiveFromFirestore(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Non-blocking background sync with Firestore
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => fetchAllCMSData(), { timeout: 3500 });
      } else {
        fetchAllCMSData();
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [fetchAllCMSData]);

  return (
    <CMSContext.Provider
      value={{
        hero,
        about,
        services,
        projects,
        testimonials,
        team,
        contact,
        navigation,
        footer,
        isLoading,
        refreshCMS: fetchAllCMSData,
        isLiveFromFirestore,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  return useContext(CMSContext);
}
