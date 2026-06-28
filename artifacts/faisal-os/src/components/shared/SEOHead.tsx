import { Helmet } from "react-helmet-async";

  interface SEOHeadProps {
    title: string;
    description: string;
    path: string;
    type?: "website" | "profile" | "article";
    image?: string;
    keywords?: string;
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

    return (
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="canonical" href={url} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={type} />
        <meta property="og:image" content={img} />
        <meta property="og:site_name" content="Faisal Orakzai" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={img} />
        <meta name="twitter:creator" content="@faisalorakzaii" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="Muhammad Faisal Orakzai" />
      </Helmet>
    );
  }
  