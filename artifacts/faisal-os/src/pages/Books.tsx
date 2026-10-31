import { useEffect, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, ExternalLink } from "lucide-react";
import SEOHead from "@/components/shared/SEOHead";
import bookData from "@/data/books.json";

const { author, books } = bookData;
const personUrl = `https://faisalorakzai.com${author.profileUrl}`;
const portraitUrl = `https://faisalorakzai.com${author.image}`;
const coverUrl = (path: string) => `https://faisalorakzai.com${path}`;
const coverMimeType = (path: string) => path.endsWith(".webp") ? "image/webp" : "image/jpeg";
const sovereign = books[0];
const imOrakzai = books[1];

type TrackParams = Record<string, string>;
function trackBookEvent(eventName: string, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  const detail = { event: eventName, ...params };
  window.dispatchEvent(new CustomEvent("fo:book-analytics", { detail }));
  const analyticsWindow = window as Window & {
    gtag?: (command: "event", name: string, values: TrackParams) => void;
    dataLayer?: Array<Record<string, unknown>>;
  };
  if (typeof analyticsWindow.gtag === "function") {
    analyticsWindow.gtag("event", eventName, params);
  } else if (Array.isArray(analyticsWindow.dataLayer)) {
    analyticsWindow.dataLayer.push(detail);
  }
}

function usePageView(pageName: string, title?: string, eventName = "book_page_view") {
  useEffect(() => {
    trackBookEvent(eventName, { page_name: pageName, ...(title ? { book_title: title } : {}) });
  }, [pageName, title, eventName]);
}

function Breadcrumbs({ current, bookTitle }: { current: string; bookTitle?: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10 text-xs text-white/45">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/" className="hover:text-[#F3BA2F]">Home</Link></li>
        <li aria-hidden="true">/</li>
        {bookTitle ? (
          <>
            <li><Link href="/books" className="hover:text-[#F3BA2F]">Books</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white/70">{current}</li>
          </>
        ) : (
          <li aria-current="page" className="text-white/70">{current}</li>
        )}
      </ol>
    </nav>
  );
}

function BookCover({ book, large = false, number }: { book: (typeof books)[number]; large?: boolean; number?: string }) {
  return (
    <figure className={`m-0 flex flex-col items-center justify-center gap-3 border border-[#F3BA2F]/25 bg-[#09121e] p-4 ${large ? "min-h-[320px] sm:min-h-[440px]" : "min-h-[280px]"}`}>
      <img
        src={coverUrl(book.cover)}
        alt={`Cover of ${book.title} by Faisal Orakzai`}
        width={book.coverWidth}
        height={book.coverHeight}
        loading="eager"
        fetchPriority={large ? "high" : "auto"}
        decoding="async"
        className={`${large ? "max-h-[520px]" : "max-h-[380px]"} h-auto w-auto max-w-full object-contain`}
      />
      <figcaption className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
        <BookOpen aria-hidden="true" className="h-3.5 w-3.5 text-[#F3BA2F]/70" />
        {number ? `Book ${number} · ` : ""}Author-supplied cover artwork
      </figcaption>
    </figure>
  );
}

function AmazonButton({ book, location }: { book: (typeof books)[number]; location: string }) {
  return (
    <a
      href={book.amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackBookEvent("amazon_button_click", { book_title: book.title, asin: book.asin, page_location: location })}
      className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#F3BA2F] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#ffd666] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F3BA2F]"
    >
      View on Amazon <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

function AuthorLink({ children = "Faisal Orakzai", className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <Link
      href={author.profileUrl}
      onClick={() => trackBookEvent("author_profile_click", { source_page: window.location.pathname })}
      className={className}
    >
      {children}
    </Link>
  );
}

function ResearchLink({ children = "Research & publications", className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <Link
      href="/research"
      onClick={() => trackBookEvent("related_publication_click", { destination: "/research", source_page: window.location.pathname })}
      className={className}
    >
      {children}
    </Link>
  );
}

function BookCard({ book, number }: { book: (typeof books)[number]; number: string }) {
  return (
    <article className="grid gap-7 border-t border-white/10 py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10 md:py-10">
      <Link href={book.path} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F3BA2F]" aria-label={`Read details about ${book.title}`}>
        <BookCover book={book} number={number} />
      </Link>
      <div className="flex flex-col justify-center">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#F3BA2F]/70">{book.format} · {book.language}</p>
        <h2 className="font-serif text-2xl leading-snug text-white sm:text-3xl">
          <Link href={book.path} className="hover:text-[#F3BA2F]">{book.shortTitle}</Link>
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-base leading-snug text-white/75">{book.title.slice(book.shortTitle.length).replace(/^:\s*/, "")}</p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">{book.directoryDescription}</p>
        <p className="mt-4 text-xs text-white/45">Published {book.displayDate} · {book.publisher}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link href={book.path} className="inline-flex items-center gap-2 text-sm text-[#F3BA2F] hover:text-white">
            Book details <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <AmazonButton book={book} location="/books" />
        </div>
      </div>
    </article>
  );
}

export function BooksDirectory() {
  usePageView("books_directory");
  return (
    <div className="min-h-screen bg-[#05080d] px-5 pb-24 pt-28 text-white sm:px-8">
      <SEOHead
        title="Books & Publications | Faisal Orakzai"
        description="Explore two books by Faisal Orakzai: The Sovereign Stack on blockchain infrastructure and I’m Orakzai on heritage, Pashtun identity, history and technology."
        path="/books"
        image={coverUrl(sovereign.cover)}
        imageType={coverMimeType(sovereign.cover)}
        imageWidth={sovereign.coverWidth}
        imageHeight={sovereign.coverHeight}
        imageAlt={`Cover of ${sovereign.title} by ${author.name}`}
        keywords="Faisal Orakzai books, The Sovereign Stack, I’m Orakzai, blockchain book, Orakzai heritage"
        breadcrumbLabel="Books & Publications"
      />
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs current="Books & Publications" />
        <header className="mb-14 max-w-3xl">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.34em] text-[#F3BA2F]">Books · Faisal Orakzai</p>
          <h1 className="font-serif text-4xl leading-tight text-white sm:text-6xl">Books &amp; Publications</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
            Two books by Faisal Orakzai explore distinct but connected subjects: blockchain infrastructure and the relationship between heritage, identity and a technology-shaped future.
          </p>
          <p className="mt-4 text-sm text-white/45">Author: <AuthorLink className="text-[#F3BA2F] underline decoration-[#F3BA2F]/30 underline-offset-4 hover:text-white" /> · <ResearchLink className="text-[#F3BA2F] underline decoration-[#F3BA2F]/30 underline-offset-4 hover:text-white" /></p>
        </header>

        <section aria-label="Books by Faisal Orakzai" className="border-b border-white/10">
          <BookCard book={sovereign} number="01" />
          <BookCard book={imOrakzai} number="02" />
        </section>

        <section className="mt-16 grid gap-8 border-t border-[#F3BA2F]/20 pt-10 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#F3BA2F]/75">About the author</p>
            <h2 className="font-serif text-2xl text-white sm:text-3xl">Faisal Orakzai</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">{author.description}</p>
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <AuthorLink className="inline-flex items-center gap-2 text-sm text-[#F3BA2F] hover:text-white">
              Read the author profile <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </AuthorLink>
            <ResearchLink className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-[#F3BA2F]">
              Browse research &amp; publications <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ResearchLink>
          </div>
        </section>
      </div>
    </div>
  );
}

export function AuthorProfile() {
  usePageView("author_profile", undefined, "author_profile_view");
  return (
    <div className="min-h-screen bg-[#05080d] px-5 pb-24 pt-28 text-white sm:px-8">
      <SEOHead
        title="Author Profile | Faisal Orakzai"
        description="Official author profile for Faisal Orakzai, Pakistani technology entrepreneur, researcher and author of The Sovereign Stack and I’m Orakzai."
        path={author.profileUrl}
        type="profile"
        image={portraitUrl}
        imageType="image/jpeg"
        imageWidth={1080}
        imageHeight={1080}
        imageAlt={`Portrait of ${author.name}`}
        keywords="Faisal Orakzai author, Faisal Orakzai biography, Faisal Orakzai books, Pakistani technology author"
        breadcrumbLabel="Author profile"
      />
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs current="Author profile" />
        <div className="grid items-start gap-10 md:grid-cols-[240px_minmax(0,1fr)] md:gap-16">
          <figure className="m-0">
            <img src={portraitUrl} alt="Portrait of Faisal Orakzai" width="1080" height="1080" loading="eager" fetchPriority="high" decoding="async" className="aspect-square w-full border border-[#F3BA2F]/25 object-cover" />
            <figcaption className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">Faisal Orakzai · Author</figcaption>
          </figure>
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.34em] text-[#F3BA2F]">Author profile</p>
            <h1 className="font-serif text-4xl leading-tight text-white sm:text-6xl">Faisal Orakzai</h1>
            <p className="mt-2 text-sm text-white/45">{author.fullName}</p>
            <p className="mt-7 text-base leading-8 text-white/70">{author.description}</p>
            <p className="mt-5 text-sm leading-7 text-white/60">
              His books address both practical digital infrastructure and the cultural histories that inform identity and community. The Sovereign Stack focuses on blockchain systems and their applications; I’m Orakzai connects heritage and history with technology and the future.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/books" className="inline-flex min-h-12 items-center gap-3 bg-[#F3BA2F] px-5 py-3 text-sm font-semibold text-black hover:bg-[#ffd666]">Browse the books <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
              <a href={author.amazonAuthorUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 border border-white/15 px-5 py-3 text-sm text-white/75 hover:border-[#F3BA2F]/50 hover:text-[#F3BA2F]">Amazon author page <ExternalLink aria-hidden="true" className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <section className="mt-16 border-t border-white/10 pt-10">
          <h2 className="font-serif text-2xl text-white sm:text-3xl">Books by Faisal Orakzai</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {books.map((book, index) => (
              <Link key={book.slug} href={book.path} onClick={() => trackBookEvent("related_publication_click", { destination: book.path, source_page: author.profileUrl })} className="group border border-white/10 p-5 transition-colors hover:border-[#F3BA2F]/40">
                <BookCover book={book} number={`0${index + 1}`} />
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#F3BA2F]/65">Book 0{index + 1} · {book.displayDate}</p>
                <h3 className="mt-3 font-serif text-xl leading-snug text-white group-hover:text-[#F3BA2F]">{book.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/55">{book.directoryDescription}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-white/10 pt-8">
          <h2 className="font-serif text-xl text-white">Research &amp; official profiles</h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <ResearchLink className="inline-flex items-center gap-2 text-[#F3BA2F] hover:text-white">Research &amp; publications <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></ResearchLink>
            <a href="https://orcid.org/0009-0000-0915-7272" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#F3BA2F]">ORCID <ArrowUpRight aria-hidden="true" className="inline h-3.5 w-3.5" /></a>
            <a href="https://www.linkedin.com/in/faisalorakzaii" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#F3BA2F]">LinkedIn <ArrowUpRight aria-hidden="true" className="inline h-3.5 w-3.5" /></a>
            <a href="https://github.com/faisalorakzai-lab" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#F3BA2F]">GitHub <ArrowUpRight aria-hidden="true" className="inline h-3.5 w-3.5" /></a>
            <a href="https://x.com/faisalorakzaii" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#F3BA2F]">X <ArrowUpRight aria-hidden="true" className="inline h-3.5 w-3.5" /></a>
          </div>
        </section>
      </div>
    </div>
  );
}

function BookDetail({ book, pageTitle, metaDescription, topicsIntro, keywords }: { book: (typeof books)[number]; pageTitle: string; metaDescription: string; topicsIntro: string; keywords: string }) {
  usePageView("book_detail", book.title);
  const isSovereign = book.slug === "the-sovereign-stack";
  const related = isSovereign ? imOrakzai : sovereign;
  return (
    <div className="min-h-screen bg-[#05080d] px-5 pb-24 pt-28 text-white sm:px-8">
      <SEOHead
        title={pageTitle}
        description={metaDescription}
        path={book.path}
        type="book"
        image={coverUrl(book.cover)}
        imageType={coverMimeType(book.cover)}
        imageWidth={book.coverWidth}
        imageHeight={book.coverHeight}
        imageAlt={`Cover of ${book.title} by ${author.name}`}
        keywords={keywords}
        breadcrumbLabel={book.shortTitle}
      />
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs current={book.shortTitle} bookTitle={book.title} />
        <header className="grid items-center gap-9 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] md:gap-14">
          <BookCover book={book} number={isSovereign ? "01" : "02"} large />
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#F3BA2F]/75">Book by <AuthorLink className="text-[#F3BA2F] hover:text-white" /></p>
            <h1 className="font-serif text-3xl leading-tight text-white sm:text-5xl">{book.shortTitle}</h1>
            <p className="mt-3 max-w-3xl font-serif text-xl leading-snug text-white/80 sm:text-2xl">{book.title.slice(book.shortTitle.length).replace(/^:\s*/, "")}</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65">{book.description}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-white/45">
              <span>{book.format}</span><span aria-hidden="true">·</span><span>{book.language}</span><span aria-hidden="true">·</span><span>Published {book.displayDate}</span>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <AmazonButton book={book} location={book.path} />
              <Link href="/books" className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-[#F3BA2F]"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> All books</Link>
            </div>
          </div>
        </header>

        <div className="mt-16 grid gap-12 border-t border-white/10 pt-10 md:grid-cols-[minmax(0,1fr)_290px]">
          <div>
            <section aria-labelledby="book-overview-heading">
              <h2 id="book-overview-heading" className="font-serif text-2xl text-white sm:text-3xl">About this book</h2>
              <p className="mt-5 max-w-3xl text-sm leading-8 text-white/60">{book.description}</p>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-white/60">{topicsIntro}</p>
            </section>
            <section aria-labelledby="book-topics-heading" className="mt-10">
              <h2 id="book-topics-heading" className="font-serif text-2xl text-white">Topics covered</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {book.topics.map((topic) => <li key={topic} className="border-l border-[#F3BA2F]/50 bg-white/[0.025] px-4 py-3 text-sm text-white/65">{topic}</li>)}
              </ul>
            </section>
            <section className="mt-10 border-t border-white/10 pt-8">
              <h2 className="font-serif text-2xl text-white">About the author</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60">{author.description}</p>
              <AuthorLink className="mt-4 inline-flex items-center gap-2 text-sm text-[#F3BA2F] hover:text-white">Faisal Orakzai’s author profile <ArrowRight aria-hidden="true" className="h-4 w-4" /></AuthorLink>
            </section>
            <section className="mt-10 border-t border-white/10 pt-8">
              <h2 className="font-serif text-2xl text-white">Related reading</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">Explore technical research and publications by Faisal Orakzai, or read about the other book in this collection.</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                <ResearchLink className="inline-flex items-center gap-2 text-sm text-[#F3BA2F] hover:text-white">Research &amp; publications <ArrowRight aria-hidden="true" className="h-4 w-4" /></ResearchLink>
                <Link href={related.path} onClick={() => trackBookEvent("related_publication_click", { destination: related.path, source_page: book.path })} className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-[#F3BA2F]">{related.shortTitle} <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
              </div>
            </section>
          </div>

          <aside aria-label="Publication details" className="h-fit border border-white/10 p-5 sm:p-6">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F3BA2F]">Publication details</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div><dt className="text-xs text-white/35">Author</dt><dd className="mt-1 text-white/75"><AuthorLink className="hover:text-[#F3BA2F]" /></dd></div>
              <div><dt className="text-xs text-white/35">Publisher</dt><dd className="mt-1 text-white/75">{book.publisher}</dd></div>
              <div><dt className="text-xs text-white/35">Publication date</dt><dd className="mt-1 text-white/75"><time dateTime={book.datePublished}>{book.displayDate}</time></dd></div>
              <div><dt className="text-xs text-white/35">Format</dt><dd className="mt-1 text-white/75">{book.format}</dd></div>
              {book.edition && <div><dt className="text-xs text-white/35">Edition</dt><dd className="mt-1 text-white/75">{book.edition}</dd></div>}
              <div><dt className="text-xs text-white/35">Language</dt><dd className="mt-1 text-white/75">{book.language}</dd></div>
              <div><dt className="text-xs text-white/35">Amazon ASIN</dt><dd className="mt-1 font-mono text-white/75">{book.asin}</dd></div>
            </dl>
            <div className="mt-6 border-t border-white/10 pt-5">
              <AmazonButton book={book} location={book.path} />
              <p className="mt-4 text-[11px] leading-5 text-white/35">ISBN is not listed in the verified Amazon product details. Amazon is the source for current price and availability.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export function SovereignStackPage() {
  return (
    <BookDetail
      book={sovereign}
      pageTitle="The Sovereign Stack: Blockchain | Faisal Orakzai"
      metaDescription="The Sovereign Stack by Faisal Orakzai is a practical book on blockchain infrastructure, smart contracts, tokenization, digital identity, security and Web3."
      keywords="The Sovereign Stack, Faisal Orakzai, blockchain infrastructure book, smart contracts, tokenization, digital identity, Web3"
      topicsIntro="The book’s verified listing and contents describe a practical route through blockchain fundamentals and infrastructure, smart-contract engineering, tokenization, digital identity, enterprise systems, security, interoperability and Web3."
    />
  );
}

export function ImOrakzaiPage() {
  return (
    <BookDetail
      book={imOrakzai}
      pageTitle="I’m Orakzai: Heritage & Identity | Faisal Orakzai"
      metaDescription="I’m Orakzai by Faisal Orakzai explores Orakzai heritage, Pashtun identity, history and the connections between culture, technology and the future."
      keywords="I’m Orakzai, Faisal Orakzai, Orakzai heritage, Pashtun identity, Pashtun history, culture and technology"
      topicsIntro="The verified Amazon description and the author’s publication announcement frame the book around identity, heritage, history and culture, then connect those subjects with technology, entrepreneurship and the future."
    />
  );
}
