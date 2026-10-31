import { useEffect } from "react";

  interface SEOHeadProps {
    title: string;
    description: string;
    path: string;
    type?: "website" | "profile" | "article" | "book";
    image?: string;
    imageType?: string;
    imageWidth?: number;
    imageHeight?: number;
    imageAlt?: string;
    keywords?: string;
    breadcrumbLabel?: string;
  }

  function setMeta(attr: "name" | "property", key: string, val: string) {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", val);
  }

  function setMetaAll(attr: "name" | "property", key: string, val: string) {
    const elements = document.querySelectorAll(`meta[${attr}="${key}"]`);
    if (!elements.length) {
      setMeta(attr, key, val);
      return;
    }
    elements.forEach((element) => element.setAttribute("content", val));
  }

  function setCanonical(url: string) {
    let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", "canonical");
      document.head.appendChild(el);
    }
    el.setAttribute("href", url);
  }

  function injectBreadcrumb(path: string, finalLabel?: string) {
    document.getElementById("seo-breadcrumb")?.remove();
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 0) return;
    const items: object[] = [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://faisalorakzai.com/" }];
    let built = "";
    segments.forEach((seg, idx) => {
      built += "/" + seg;
      const name = idx === segments.length - 1 && finalLabel ? finalLabel : seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ");
      items.push({ "@type": "ListItem", "position": idx + 2, "name": name, "item": "https://faisalorakzai.com" + built });
    });
    const ld = document.createElement("script");
    ld.id = "seo-breadcrumb";
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": items });
    document.head.appendChild(ld);
  }

  export default function SEOHead({
    title, description, path, type = "website", image, imageType, imageWidth, imageHeight, imageAlt, keywords, breadcrumbLabel,
  }: SEOHeadProps) {
    const url = `https://faisalorakzai.com${path}`;
    const img = image ?? "https://faisalorakzai.com/faisal-official-knowledge-panel.jpg";
    const normalizedTitle = title.trim();
    const fullTitle = normalizedTitle.toLowerCase().endsWith("| faisal orakzai") ? normalizedTitle : `${normalizedTitle} | Faisal Orakzai`;

    useEffect(() => {
      document.title = fullTitle;

      setMeta("name", "description", description);
      setMeta("name", "author", "Faisal Orakzai");
      setMeta("name", "robots", "index, follow, max-image-preview:large");
      if (keywords) setMeta("name", "keywords", keywords);

      setMeta("property", "og:title", fullTitle);
      setMeta("property", "og:description", description);
      setMeta("property", "og:url", url);
      setMeta("property", "og:type", type);
      setMetaAll("property", "og:image", img);
      if (imageType) {
        setMetaAll("property", "og:image:secure_url", img);
        setMetaAll("property", "og:image:type", imageType);
      }
      if (imageWidth) setMetaAll("property", "og:image:width", String(imageWidth));
      if (imageHeight) setMetaAll("property", "og:image:height", String(imageHeight));
      if (imageAlt) setMetaAll("property", "og:image:alt", imageAlt);
      setMeta("property", "og:site_name", "Faisal Orakzai");

      setMeta("name", "twitter:card", "summary_large_image");
      setMeta("name", "twitter:title", fullTitle);
      setMeta("name", "twitter:description", description);
      setMeta("name", "twitter:image", img);
      if (imageAlt) setMeta("name", "twitter:image:alt", imageAlt);
      setMeta("name", "twitter:creator", "@faisalorakzaii");

      setCanonical(url);
      injectBreadcrumb(path, breadcrumbLabel);

      return () => {
        document.getElementById("seo-breadcrumb")?.remove();
      };
    }, [fullTitle, description, url, img, type, imageType, imageWidth, imageHeight, imageAlt, keywords, path, breadcrumbLabel]);

    return null;
  }
