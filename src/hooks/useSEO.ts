import { useEffect } from 'react';

const BASE_URL = 'https://www.hibyhuman.com';
const DEFAULT_TITLE = 'HiByHuman | Bespoke Web Design, Mobile Apps & Digital Marketing Studio UK';
const DEFAULT_DESCRIPTION = 'HiByHuman is a premier UK creative and technology studio based in Coatbridge, Scotland. We engineer bespoke web applications, mobile platforms, and high-ROI digital systems.';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function useSEO({ title, description, canonicalPath = '/', noindex = false, jsonLd }: SEOProps) {
  useEffect(() => {
    // 1. Update Document Title
    const finalTitle = title ? `${title} | HiByHuman` : DEFAULT_TITLE;
    document.title = finalTitle;

    // 2. Update Meta Description
    const finalDesc = description || DEFAULT_DESCRIPTION;
    let descMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', finalDesc);

    // 3. Update Canonical Link
    // Ensure clean leading slash and no trailing slash except for root
    const cleanPath = canonicalPath === '/' ? '/' : canonicalPath.startsWith('/') ? canonicalPath.replace(/\/+$/, '') : `/${canonicalPath}`;
    const finalCanonical = `${BASE_URL}${cleanPath === '/' ? '/' : cleanPath}`;
    
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', finalCanonical);

    // 4. Update Robots Directive
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute(
      'content',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // 5. Update OpenGraph Tags
    const updateOrCreateMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateOrCreateMeta('og:title', finalTitle);
    updateOrCreateMeta('og:description', finalDesc);
    updateOrCreateMeta('og:url', finalCanonical);

    // 6. Update Twitter Meta Tags
    const updateOrCreateTwitter = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateOrCreateTwitter('twitter:title', finalTitle);
    updateOrCreateTwitter('twitter:description', finalDesc);

    // 7. Dynamic JSON-LD Structured Data
    const SCRIPT_ID = 'page-structured-data';
    let scriptTag = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = SCRIPT_ID;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      const existing = document.getElementById(SCRIPT_ID);
      if (existing) {
        existing.remove();
      }
    };
  }, [title, description, canonicalPath, noindex, jsonLd]);
}
