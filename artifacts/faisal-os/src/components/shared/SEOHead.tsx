import { useEffect } from "react";

  interface SEOHeadProps {
    title: string;
    description: string;
    path: string;
    type?: "website" | "profile" | "article";
    image?: string;
    keywords?: string;
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

  function setCanonical(url: string) {
    let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", "canonical");
      document.head.appendChild(el);
    }
    el.setAttribute("href", url);
  }

  export default function SEOHead({
    title,
    description,
    path,
    type = "website",
    image,
    keywords,
  }: SEOHeadProps) {
    const url = `https://faisalorakzai.com${path}`;
    const img = image ?? "https://faisalorakzai.com/story/story-03.png";
    const fullTitle = `${title} | Faisal Orakzai`;

    useEffect(() => {
      const prev = document.title;
      document.title = fullTitle;

      setMeta("name", "description", description);
      setMeta("name", "author", "Muhammad Faisal Orakzai");
      setMeta("name", "robots", "index, follow, max-image-preview:large");
      if (keywords) setMeta("name", "keywords", keywords);

      setMeta("property", "og:title", fullTitle);
      setMeta("property", "og:description", description);
      setMeta("property", "og:url", url);
      setMeta("property", "og:type", type);
      setMeta("property", "og:image", img);
      setMeta("property", "og:site_name", "Faisal Orakzai");

      setMeta("name", "twitter:card", "summary_large_image");
      setMeta("name", "twitter:title", fullTitle);
      setMeta("name", "twitter:description", description);
      setMeta("name", "twitter:image", img);
      setMeta("name", "twitter:creator", "@faisalorakzaii");

      setCanonical(url);

      return () => {
        document.title = prev;
      };
    }, [fullTitle, description, url, img, type, keywords]);

    return null;
  }
  