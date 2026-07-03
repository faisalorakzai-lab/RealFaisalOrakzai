import { useEffect } from "react";

// Slim schema — only adds data NOT already present in index.html static schemas
// (Person, FAQPage, Organization, WebSite already in index.html)
const PROFILE_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "url": "https://faisalorakzai.com/founder",
  "name": "Faisal Orakzai — Founder & Chairman, Orakzai Group",
  "description": "Official profile page of Muhammad Faisal Orakzai, Founder of Orakzai Group.",
  "about": {
    "@type": "Person",
    "@id": "https://www.wikidata.org/wiki/Q140264666",
    "name": "Muhammad Faisal Orakzai",
    "url": "https://faisalorakzai.com"
  },
  "mainEntity": {
    "@type": "Person",
    "@id": "https://www.wikidata.org/wiki/Q140264666",
    "name": "Muhammad Faisal Orakzai",
    "alternateName": ["Faisal Orakzai", "Chairman Orakzai"],
    "url": "https://faisalorakzai.com",
    "sameAs": [
      "https://www.linkedin.com/in/faisalorakzaiii",
      "https://x.com/faisalorakzaii",
      "https://www.wikidata.org/wiki/Q140264666",
      "https://orcid.org/0009-0000-0915-7272"
    ]
  }
};

export default function HomeSchema() {
  useEffect(() => {
    const id = "home-profile-schema";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(PROFILE_PAGE_SCHEMA);
    document.head.appendChild(s);
    return () => { document.getElementById(id)?.remove(); };
  }, []);
  return null;
}
