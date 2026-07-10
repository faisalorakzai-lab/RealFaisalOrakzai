import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DigitalIdentityVisual() {
  const h2Style: React.CSSProperties = { fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:"clamp(1.45rem,4vw,2rem)", color:"rgba(255,255,255,0.95)", margin:"3.5rem 0 1rem", lineHeight:1.25, letterSpacing:"-0.02em" };
  const h3Style: React.CSSProperties = { fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(1.1rem,3vw,1.45rem)", color:"rgba(255,255,255,0.88)", margin:"2.25rem 0 0.75rem", lineHeight:1.3 };
  const G = "#F3BA2F";
  const GB = "rgba(243,186,47,0.18)";
  const [activePhase, setActivePhase] = React.useState(0);
  const [activeComponent, setActiveComponent] = React.useState(0);
  const [activeZkp, setActiveZkp] = React.useState(0);
  const [activeIndustry, setActiveIndustry] = React.useState(0);
  const [openFaq, setOpenFaq] = React.useState<number|null>(null);

  const pSt: React.CSSProperties = { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1rem,2.4vw,1.15rem)", lineHeight:1.85, color:"rgba(255,255,255,0.72)", margin:"0 0 1.4rem" };

  React.useEffect(() => {
    const schemas = [
      { "@context":"https://schema.org","@type":"TechArticle",
        "headline":"How Digital Identity Works on Blockchain: DIDs, SSI, Verifiable Credentials & Future Guide (2026)",
        "description":"Learn how blockchain digital identity works, including Decentralized Identifiers (DIDs), Self-Sovereign Identity (SSI), Verifiable Credentials, Zero-Knowledge Proofs, enterprise identity architecture, and the future of decentralized identity systems.",
        "keywords":"Blockchain Digital Identity, Decentralized Identity, Self-Sovereign Identity, SSI, DID, Decentralized Identifiers, Verifiable Credentials, Blockchain Authentication, Identity on Blockchain, Web3 Identity, Enterprise Digital Identity, Zero-Knowledge Proofs, Blockchain Privacy, Future of Digital Identity",
        "author":{"@type":"Person","name":"Faisal Orakzai","url":"https://faisalorakzai.com/founder","sameAs":["https://orcid.org/0009-0000-0915-7272","https://www.linkedin.com/in/faisalorakzaii"],"identifier":{"@type":"PropertyValue","propertyID":"ORCID","value":"0009-0000-0915-7272"}},
        "publisher":{"@type":"Organization","name":"Orakzai Research Lab","url":"https://faisalorakzai.com","logo":{"@type":"ImageObject","url":"https://faisalorakzai.com/logo.png"}},
        "datePublished":"2026-07-01","dateModified":"2026-07-01",
        "url":"https://faisalorakzai.com/research/blockchain-digital-identity",
        "image":{"@type":"ImageObject","url":"https://faisalorakzai.com/mk/blockchain-identity-hero.png","width":1200,"height":630},
        "inLanguage":"en-US","isAccessibleForFree":true,"proficiencyLevel":"Intermediate" },
      { "@context":"https://schema.org","@type":"BreadcrumbList",
        "itemListElement":[
          {"@type":"ListItem","position":1,"name":"Home","item":"https://faisalorakzai.com"},
          {"@type":"ListItem","position":2,"name":"Research","item":"https://faisalorakzai.com/research"},
          {"@type":"ListItem","position":3,"name":"How Digital Identity Works on Blockchain","item":"https://faisalorakzai.com/research/blockchain-digital-identity"}
        ] },
      {"@context":"https://schema.org","@type":"Person","@id":"https://faisalorakzai.com#person","name":"Faisal Orakzai","url":"https://faisalorakzai.com/founder","sameAs":["https://orcid.org/0009-0000-0915-7272","https://www.linkedin.com/in/faisalorakzaii","https://github.com/faisalorakzai-lab","https://www.imdb.com/name/nm18674496/"],"jobTitle":"Founder & Chairman","affiliation":{"@type":"Organization","name":"Orakzai Group"},"identifier":{"@type":"PropertyValue","propertyID":"ORCID","value":"0009-0000-0915-7272"}},
      {"@context":"https://schema.org","@type":"Organization","@id":"https://faisalorakzai.com#org","name":"Orakzai Group","url":"https://faisalorakzai.com","founder":{"@type":"Person","name":"Faisal Orakzai"}},
      {"@context":"https://schema.org","@type":"WebPage","name":"How Digital Identity Works on Blockchain (2026)","url":"https://faisalorakzai.com/research/blockchain-digital-identity","description":"Learn how blockchain digital identity works, including DIDs, SSI, Verifiable Credentials, Zero-Knowledge Proofs, and the future of decentralized identity.","author":{"@type":"Person","name":"Faisal Orakzai"},"datePublished":"2026-07-01","inLanguage":"en-US","isPartOf":{"@type":"WebSite","name":"Faisal Orakzai","url":"https://faisalorakzai.com"}},
      {"@context":"https://schema.org","@type":"WebSite","name":"Faisal Orakzai","url":"https://faisalorakzai.com","potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://faisalorakzai.com/research?q={search_term_string}"},"query-input":"required name=search_term_string"}},
      {"@context":"https://schema.org","@type":"Speakable","cssSelector":[".did-intro",".did-def"]}
    ];
    const existing = document.getElementById("did-extra-ld");
    if (existing) existing.remove();
    const el = document.createElement("script");
    el.id = "did-extra-ld"; el.type = "application/ld+json";
    el.text = JSON.stringify(schemas);
    document.head.appendChild(el);
    let canon = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = "https://faisalorakzai.com/research/blockchain-digital-identity";
    return () => { document.getElementById("did-extra-ld")?.remove(); };
  }, []);

  const identityPhases = [
    { phase:"Phase 1", name:"Physical Identity", col:"rgba(255,255,255,0.25)", items:["Paper documents","Passports & ID cards","Birth certificates","Manual verification","Location-dependent","No digital record"] },
    { phase:"Phase 2", name:"Digital Identity", col:"#60a5fa", items:["Email logins","Password systems","Mobile verification","Centralized databases","Online services","New privacy risks"] },
    { phase:"Phase 3", name:"Federated Identity", col:"#a78bfa", items:["Google Sign-In","Apple ID","Microsoft SSO","Convenience-focused","Concentrated control","Platform dependency"] },
    { phase:"Phase 4", name:"Blockchain Identity", col:G, items:["Cryptographic verification","User-controlled wallets","Portable credentials","Selective disclosure","No central database","Self-sovereign ownership"] },
  ];

  const coreComponents = [
    { name:"Public & Private Keys", icon:"🔑", col:"#60a5fa",
      desc:"The foundation of blockchain identity. Asymmetric cryptography gives each user a public key (shareable address) and a private key (secret signature tool). Identity is proven by signing requests — not by sending passwords.",
      details:["Public key: shareable address for verification","Private key: secret — proves ownership","Digital signatures replace passwords","No credentials transmitted over the network","Loss of private key = loss of identity control","Requires secure key storage hardware"] },
    { name:"Decentralized Identifiers (DIDs)", icon:"🪪", col:G,
      desc:"Globally unique identifiers that belong entirely to the identity owner — not issued or controlled by any company, government, or platform. Each DID points to a DID Document containing public keys and authentication methods.",
      details:["Format: did:example:8394829348293489","Globally unique — no registration authority","User owns the DID completely","DID Document: public keys + auth methods","No personal data in DID Document","Supported by W3C international standard"] },
    { name:"Verifiable Credentials (VCs)", icon:"📜", col:"#4ade80",
      desc:"Digitally signed proofs of claims — university degrees, government IDs, professional licenses, medical records. Signed by trusted issuers, tamper-evident, and instantly verifiable without contacting the original issuer.",
      details:["Issuer: organization signing the credential","Holder: user storing it in wallet","Claims: information being certified","Digital signature: cryptographic proof","Timestamp + expiry date included","Instantly verifiable without issuer contact"] },
    { name:"Identity Wallet", icon:"👝", col:"#a78bfa",
      desc:"A secure digital vault controlled entirely by the user — storing identity credentials, academic certificates, government IDs, employment history, medical records, and professional licenses with cryptographic protection.",
      details:["Identity layer: stores all DIDs","Credential layer: stores VCs","Cryptographic layer: manages keys","Authentication layer: signs requests","Privacy layer: controls sharing","User has complete custody"] },
    { name:"Verifiable Presentations", icon:"📤", col:"#f87171",
      desc:"When a service requests identity verification, the wallet creates a Verifiable Presentation — a cryptographically signed package containing only the specific credentials or proofs required, nothing more.",
      details:["User selects which credentials to share","Selective disclosure enforced","Cryptographically signed by user","Verifier cannot store excess data","Proof of specific claims only","One-time or time-limited sharing"] },
    { name:"Revocation Registry", icon:"🔴", col:"#fbbf24",
      desc:"A cryptographically verifiable on-chain registry that allows issuers to invalidate credentials — expired licenses, withdrawn degrees, suspended IDs — without deleting the original credential from the user's wallet.",
      details:["Issuer updates revocation status","Verifier checks registry during verification","Credential remains in wallet","Cryptographic proof of invalidity","No personal data on-chain","Audit trail maintained"] },
  ];

  const zkpExamples = [
    { scenario:"Age Verification", traditional:"Reveals: Full name, address, date of birth, ID number, photo, nationality", zkp:"Proves: ✓ Age over 18 — nothing else revealed", col:"#60a5fa" },
    { scenario:"Income Verification", traditional:"Reveals: Complete bank statements, salary history, account balance, transactions", zkp:"Proves: ✓ Annual income exceeds $50,000 threshold", col:G },
    { scenario:"Healthcare", traditional:"Reveals: Complete medical history, diagnoses, medications, test results", zkp:"Proves: ✓ Vaccination certificate verified", col:"#4ade80" },
    { scenario:"Education", traditional:"Reveals: Full academic transcript, grades, enrollment history, personal details", zkp:"Proves: ✓ Master's Degree awarded in Computer Science", col:"#a78bfa" },
    { scenario:"Citizenship", traditional:"Reveals: National ID number, address, nationality, government records", zkp:"Proves: ✓ Citizenship of a specific country verified", col:"#f87171" },
    { scenario:"Financial KYC", traditional:"Reveals: Bank account details, transaction history, source of funds", zkp:"Proves: ✓ Passed KYC verification — no details exposed", col:"#fbbf24" },
  ];

  const ssiPrinciples = [
    { num:"01", name:"Ownership", desc:"The identity belongs entirely to the user — not the platform, government, or organization that issued credentials." },
    { num:"02", name:"Control", desc:"Users decide who accesses data, what information is shared, and how long access remains valid." },
    { num:"03", name:"Consent", desc:"Nothing is shared without explicit, granular user authorization for each specific request." },
    { num:"04", name:"Privacy", desc:"Only the minimum necessary information is revealed — selective disclosure by default." },
    { num:"05", name:"Portability", desc:"Identity works across countries, applications, governments, enterprises, and financial institutions." },
    { num:"06", name:"Persistence", desc:"Identity remains valid regardless of service providers — no platform can revoke existence." },
    { num:"07", name:"Interoperability", desc:"Different blockchain ecosystems can verify the same identity through open standards." },
    { num:"08", name:"Security", desc:"Cryptographic signatures protect credentials against forgery and tampering." },
    { num:"09", name:"Transparency", desc:"Verification rules are publicly auditable — no hidden logic or centralized gatekeepers." },
    { num:"10", name:"Minimal Disclosure", desc:"The verifier receives only the required proof — not the complete identity record." },
  ];

  const industries = [
    { name:"Banking & KYC", icon:"🏦", col:"#60a5fa", desc:"Streamline Know Your Customer (KYC) and AML checks — customers reuse trusted credentials across institutions instead of repeating identity verification at every bank.", useCases:["One-time KYC across all banks","Digital account opening","Cross-border financial services","Credit verification without exposing history","AML compliance with privacy","Instant customer onboarding"] },
    { name:"Healthcare", icon:"🏥", col:"#4ade80", desc:"Patients control access to their health credentials — authorizing specific providers for specific durations, with full audit trails and no central patient database.", useCases:["Digital vaccination certificates","Patient-controlled health records","Medical license verification","Prescription authentication","Cross-hospital identity","Clinical research participation"] },
    { name:"Government", icon:"🏛", col:G, desc:"National digital identity programs, e-passports, digital voting, land registries, tax administration — blockchain acts as the tamper-evident trust layer for public services.", useCases:["National digital ID programs","Digital passports","E-voting systems","Land ownership records","Tax identification","Social benefit distribution"] },
    { name:"Education", icon:"🎓", col:"#a78bfa", desc:"Universities issue cryptographically signed, tamper-resistant digital credentials — graduates prove qualifications instantly without physical documents or manual verification.", useCases:["Tamper-proof degree certificates","Instant qualification verification","Cross-border credential recognition","Professional certifications","Lifelong learning records","Employer-grade transcript verification"] },
    { name:"Enterprise", icon:"🏢", col:"#f87171", desc:"Organizations manage identities for employees, contractors, vendors, APIs, IoT devices, AI agents, and digital twins — all verified through a unified blockchain trust architecture.", useCases:["Employee credential management","Vendor/contractor verification","IoT device identity","AI agent authentication","Supply chain participant IDs","Cross-organizational trust"] },
    { name:"Supply Chain", icon:"📦", col:"#fbbf24", desc:"Verify manufacturer authenticity, supplier credentials, product provenance, and shipment integrity — every participant authenticated without a single central database.", useCases:["Manufacturer verification","Anti-counterfeit authentication","Supplier KYB checks","Product provenance proof","Customs compliance credentials","Logistics partner identity"] },
  ];

  const authFlow = [
    { step:"1", label:"Service Request", desc:"A service (employer, bank, hospital) requests identity verification from the user." },
    { step:"2", label:"Wallet Prompt", desc:"The user's identity wallet receives the request and prompts for approval." },
    { step:"3", label:"User Signs", desc:"The user signs the verification request with their private key — no password sent." },
    { step:"4", label:"VC Presented", desc:"The wallet packages the required Verifiable Credential into a Verifiable Presentation." },
    { step:"5", label:"Issuer Signature Checked", desc:"The verifier confirms the credential was signed by a trusted issuer organization." },
    { step:"6", label:"Revocation Checked", desc:"The verifier queries the on-chain revocation registry — credential is still valid." },
    { step:"7", label:"Access Granted", desc:"Identity confirmed. No personal data stored by the verifier. The user retains full ownership." },
  ];

  const recoveryMethods = [
    { method:"Social Recovery", icon:"👥", desc:"Trusted guardians (family, colleagues, institutions) collectively authorize recovery with multi-party approval." },
    { method:"Multi-Signature", icon:"🔐", desc:"Multiple cryptographic keys stored in different locations — all required together to restore access." },
    { method:"Hardware Backup", icon:"🔩", desc:"Recovery keys stored securely on dedicated hardware security modules or physical devices." },
    { method:"Encrypted Cloud", icon:"☁", desc:"Credentials encrypted before cloud backup — the cloud provider cannot read or access the data." },
    { method:"Institutional Recovery", icon:"🏛", desc:"Enterprise environments: approved administrators restore corporate identities under strict governance policies." },
  ];

  const futureTrends = [
    { year:"2026–2028", col:"#60a5fa", trends:["W3C DID standard adopted by 50+ governments","Post-quantum cryptography integrated","AI agents get cryptographic identities","Cross-border DID verification pilots launch"] },
    { year:"2029–2032", col:G, trends:["National digital IDs on blockchain in 30+ countries","ZKP-based KYC standard adopted by major banks","IoT device identity at billion-scale","Healthcare DID networks cross borders"] },
    { year:"2033–2035", col:"#4ade80", trends:["Global identity interoperability layer operational","AI agents transact autonomously with verified IDs","Quantum-resistant signatures deployed globally","Physical-digital identity fusion (AR/VR)"] },
    { year:"2036–2050", col:"#a78bfa", trends:["Identity becomes invisible infrastructure","Every human, AI, device has verifiable DID","Global SSI enables borderless digital participation","Post-quantum cryptography standard everywhere"] },
  ];

  const internalLinks = [
    { title:"What is Blockchain? A Complete Beginner's Guide", slug:"blockchain-basic", desc:"Understand the blockchain foundation before diving into identity." },
    { title:"Blockchain Infrastructure Explained", slug:"blockchain-infra", desc:"Nodes, validators, and the technical infrastructure identity systems run on." },
    { title:"Public vs Private vs Consortium Blockchains", slug:"blockchain-types", desc:"How different blockchain architectures support different identity use cases." },
    { title:"How Smart Contracts Work", slug:"smart-contracts", desc:"Smart contracts automate credential issuance, verification, and revocation." },
    { title:"Tokenization of Real World Assets (RWA)", slug:"rwa-tokenization", desc:"Identity verification is essential for compliant tokenized asset ownership." },
    { title:"Blockchain Security & Consensus Mechanisms", slug:"blockchain-security", desc:"The cryptographic security layer that makes DID and VC systems trustworthy." },
    { title:"The Future of Web3 Infrastructure", slug:"future-of-web3", desc:"How digital identity integrates into the broader Web3 infrastructure vision." },
  ];

  const faqs = [
    { q:"What is blockchain digital identity?", a:"A blockchain digital identity is a cryptographically verifiable identity that allows individuals or organizations to prove information securely without relying on a single centralized database — using DIDs, Verifiable Credentials, and digital wallets." },
    { q:"Does blockchain store personal data?", a:"Not necessarily. Most modern identity systems avoid storing sensitive personal information directly on-chain. Instead, blockchain stores proofs, identifiers, and verification data while personal information remains under the user's control in their digital wallet." },
    { q:"What is Self-Sovereign Identity (SSI)?", a:"SSI is a model in which individuals own, manage, and share their digital identity credentials independently — without relying on any central authority, company, or government to control or maintain their identity." },
    { q:"What are Verifiable Credentials (VCs)?", a:"Verifiable Credentials are digitally signed credentials issued by trusted organizations — university degrees, driving licenses, professional certifications — that can be instantly verified for authenticity without contacting the original issuer each time." },
    { q:"Can blockchain identity replace passwords?", a:"In many scenarios, yes. Blockchain identity enables cryptographic authentication through digital wallets and private keys — users sign verification requests instead of transmitting passwords, dramatically reducing breach risk." },
    { q:"Is blockchain identity secure?", a:"When implemented correctly with strong cryptography, secure key management, Zero-Knowledge Proofs, and privacy-preserving protocols, blockchain identity provides a highly secure framework — significantly stronger than centralized password-based systems." },
    { q:"Which industries benefit most?", a:"Healthcare, banking and financial services, government, education, logistics, enterprise security, real estate, insurance, travel, supply chains, and digital commerce are among the sectors with the highest potential for blockchain identity transformation." },
    { q:"Will blockchain identity become global?", a:"Many experts believe decentralized identity will increasingly support international interoperability through W3C DID standards. Global adoption will depend on technical standards maturing, governance frameworks, and regulatory cooperation across jurisdictions." },
  ];

  const myths = [
    { myth:"Blockchain identity stores your personal data on-chain permanently", reality:"Modern blockchain identity systems store only cryptographic proofs and identifiers on-chain — never sensitive personal data. Personal information stays in the user's encrypted wallet." },
    { myth:"Losing your private key means your identity is stolen", reality:"Recovery mechanisms — social recovery, multi-signature, hardware backup — allow secure identity restoration. Advanced wallets include biometric authentication and guardian-based recovery." },
    { myth:"Blockchain identity is only for crypto users", reality:"Blockchain identity serves healthcare patients, banking customers, government citizens, university graduates, and enterprise employees — it has nothing to do with holding cryptocurrency." },
    { myth:"SSI means no organization can ever verify your identity", reality:"SSI means you own your identity — organizations still issue and verify credentials, but they cannot control or revoke your identity existence without your permission." },
    { myth:"Zero-Knowledge Proofs are too slow for real-world use", reality:"Modern ZKP systems (zk-SNARKs, zk-STARKs) generate proofs in milliseconds — fast enough for real-time age verification, KYC, and financial compliance at production scale." },
  ];

  const takeaways = [
    "Blockchain digital identity gives individuals cryptographic ownership of their credentials — shifting control from organizations to users through Self-Sovereign Identity (SSI).",
    "Decentralized Identifiers (DIDs) are globally unique identifiers that belong to the identity owner — not issued or controlled by any central authority, government, or platform.",
    "Verifiable Credentials are digitally signed proofs of claims — degrees, passports, licenses — tamper-evident and instantly verifiable without contacting the original issuer.",
    "Zero-Knowledge Proofs allow proving facts — age over 18, sufficient income — without revealing underlying personal data, delivering maximum privacy with full cryptographic trust.",
    "Identity wallets securely store all credentials, keys, and permissions — becoming the user's portable, privacy-preserving, cryptographically secured digital identity vault.",
    "By 2035–2050, blockchain identity will evolve into foundational infrastructure supporting governments, enterprises, AI agents, IoT devices, and autonomous systems at global scale.",
  ];

  return (
    <div>
      {/* ── Intro ── */}
      <div id="intro" data-section="intro">
        <p style={pSt} className="did-intro">Every digital service starts with identity. When you open a bank account, visit a hospital, apply for a university, or access a government portal — your identity is verified first. Today, that means submitting the same documents to dozens of organizations, each maintaining their own copy of your personal data in their own database.</p>
        <p style={pSt}>Blockchain introduces a fundamentally different model: <strong style={{ color:"rgba(255,255,255,0.9)" }}>you become the owner of your identity</strong>, not the organizations that currently hold your data. This is the foundation of the next-generation internet.</p>

        {/* Identity Evolution */}
        <div className="did-def" style={{ marginBottom:"3rem" }}>
          <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.35em", color:G, textTransform:"uppercase", marginBottom:"14px" }}>Evolution of Identity Systems</div>
          <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"12px" }}>
            {identityPhases.map((p,i) => (
              <button key={i} onClick={() => setActivePhase(i)}
                style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.1em", padding:"5px 12px", border:`1px solid ${activePhase===i ? p.col : "rgba(255,255,255,0.1)"}`, color: activePhase===i ? p.col : "rgba(255,255,255,0.3)", background: activePhase===i ? `${p.col}12` : "none", cursor:"pointer", textTransform:"uppercase", transition:"all 0.18s" }}>{p.phase}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activePhase} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.2 }}
              style={{ border:`1px solid ${identityPhases[activePhase].col}30`, background:`${identityPhases[activePhase].col}06`, padding:"1.4rem 1.6rem", borderRadius:"2px" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"18px", color:identityPhases[activePhase].col, marginBottom:"14px" }}>{identityPhases[activePhase].phase}: {identityPhases[activePhase].name}</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:"8px" }}>
                {identityPhases[activePhase].items.map((it,j) => (
                  <div key={j} style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                    <span style={{ color:identityPhases[activePhase].col, fontSize:"9px", opacity:0.6, flexShrink:0 }}>◆</span>
                    <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.45)" }}>{it}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Problems with traditional identity */}
        <h2 style={h2Style}>Why Traditional Identity Is Broken</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {[
            { prob:"Massive Data Breaches", icon:"🔓", desc:"Every centralized database is a high-value attack target. One breach can expose millions of identities — and users have no way to revoke or rotate their stolen data." },
            { prob:"Password Fatigue", icon:"😵", desc:"Average users maintain dozens of accounts with unique credentials. Password reuse becomes inevitable — creating systemic security vulnerabilities across services." },
            { prob:"Identity Theft", icon:"🎭", desc:"Stolen credentials enable attackers to impersonate individuals — opening bank accounts, making purchases, applying for loans, and committing fraud at scale." },
            { prob:"High KYC Costs", icon:"💸", desc:"Banks, telecoms, healthcare providers, and governments spend billions annually on Know Your Customer verification — repeated across institutions for the same users." },
            { prob:"No User Control", icon:"⚠", desc:"Platforms collect and retain more personal information than users actively authorize. Limited visibility into how data is shared, sold, or used by third parties." },
            { prob:"Fragmented Identity", icon:"🧩", desc:"Passport, national ID, bank identity, university records, healthcare ID — all stored separately. Users submit identical information repeatedly to different organizations." },
          ].map((p,i) => (
            <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.04)" }}
              style={{ background:"#000", padding:"1.2rem", transition:"background 0.18s" }}>
              <div style={{ fontSize:"18px", marginBottom:"7px" }}>{p.icon}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"13.5px", color:"rgba(255,255,255,0.82)", marginBottom:"7px" }}>{p.prob}</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.32)", lineHeight:1.6, margin:0 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Technical Architecture ── */}
      <div id="components" data-section="components">
        <h2 style={h2Style}>Technical Architecture: 6 Core Components</h2>
        <p style={pSt}>Blockchain identity is not a single technology — it is an architecture of six interoperating components. Each performs a unique role in creating a secure ecosystem where individuals, not corporations, control their digital identity.</p>
        <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"12px" }}>
          {coreComponents.map((c,i) => (
            <button key={i} onClick={() => setActiveComponent(i)}
              style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.1em", padding:"5px 10px", border:`1px solid ${activeComponent===i ? c.col : "rgba(255,255,255,0.1)"}`, color: activeComponent===i ? c.col : "rgba(255,255,255,0.3)", background: activeComponent===i ? `${c.col}10` : "none", cursor:"pointer", textTransform:"uppercase", transition:"all 0.18s" }}>{c.icon}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeComponent} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.2 }}
            style={{ border:`1px solid ${coreComponents[activeComponent].col}30`, background:`${coreComponents[activeComponent].col}06`, padding:"1.5rem 1.75rem", marginBottom:"2rem", borderRadius:"2px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px" }}>
              <span style={{ fontSize:"22px" }}>{coreComponents[activeComponent].icon}</span>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"17px", color:coreComponents[activeComponent].col }}>{coreComponents[activeComponent].name}</div>
            </div>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1rem,2.3vw,1.1rem)", color:"rgba(255,255,255,0.7)", lineHeight:1.8, margin:"0 0 14px" }}>{coreComponents[activeComponent].desc}</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"6px" }}>
              {coreComponents[activeComponent].details.map((d,i) => (
                <div key={i} style={{ display:"flex", gap:"8px", alignItems:"flex-start" }}>
                  <span style={{ color:coreComponents[activeComponent].col, fontSize:"9px", flexShrink:0, marginTop:"3px", opacity:0.6 }}>◆</span>
                  <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.4)" }}>{d}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* DID Format Visual */}
        <div style={{ border:"1px solid rgba(243,186,47,0.15)", borderRadius:"4px", padding:"1.25rem 1.5rem", background:"rgba(243,186,47,0.03)", marginBottom:"3rem", fontFamily:"monospace" }}>
          <div style={{ fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(243,186,47,0.4)", marginBottom:"12px", textTransform:"uppercase" }}>DID Format Example</div>
          <div style={{ fontSize:"clamp(12px,2.5vw,16px)", color:G, marginBottom:"8px" }}>did:<span style={{ color:"#60a5fa" }}>polygon</span>:<span style={{ color:"#4ade80" }}>7A82B9f3c1d4e5a6b7c8</span></div>
          <div style={{ display:"flex", gap:"16px", flexWrap:"wrap" }}>
            <div><span style={{ color:"rgba(255,255,255,0.2)", fontSize:"9px" }}>METHOD → </span><span style={{ color:"#60a5fa", fontSize:"10px" }}>blockchain network</span></div>
            <div><span style={{ color:"rgba(255,255,255,0.2)", fontSize:"9px" }}>ID → </span><span style={{ color:"#4ade80", fontSize:"10px" }}>cryptographic identifier</span></div>
          </div>
        </div>

        {/* Authentication Flow */}
        <h3 style={h3Style}>Identity Authentication Flow: 7-Step Verification</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {authFlow.map((f,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.06*i }}
              style={{ background:"#000", padding:"0.9rem 1.2rem", display:"flex", gap:"14px", alignItems:"center" }}>
              <div style={{ minWidth:"28px", height:"28px", borderRadius:"50%", background:"rgba(243,186,47,0.1)", border:`1px solid rgba(243,186,47,0.25)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"10px", color:G, flexShrink:0 }}>{f.step}</div>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"13.5px", color:G, marginBottom:"2px" }}>{f.label}</div>
                <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.35)", lineHeight:1.55, margin:0 }}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── SSI + ZKP ── */}
      <div id="benefits" data-section="benefits">
        <h2 style={h2Style}>Self-Sovereign Identity: 10 Core Principles</h2>
        <p style={pSt}>SSI shifts digital identity from an organization-centric model to a user-centric trust model. Instead of organizations owning your identity — you own it. The issuer only creates and signs credentials. The verifier only checks authenticity. The individual remains the permanent owner.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {ssiPrinciples.map((p,i) => (
            <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.04)" }}
              style={{ background:"#000", padding:"1rem", transition:"background 0.18s" }}>
              <div style={{ fontFamily:"monospace", fontSize:"8px", color:`${G}60`, marginBottom:"4px" }}>{p.num}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"14px", color:G, marginBottom:"7px" }}>{p.name}</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.32)", lineHeight:1.6, margin:0 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ZKP Section */}
        <h2 style={h2Style}>Zero-Knowledge Proofs: Prove Without Revealing</h2>
        <p style={pSt}>Zero-Knowledge Proofs are one of the most revolutionary technologies in modern cryptography. They allow someone to prove a statement is true — age over 18, sufficient income, valid degree — without revealing any of the underlying personal data. Traditional verification exposes everything; ZKP verification exposes nothing except the proof itself.</p>
        <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"12px" }}>
          {zkpExamples.map((z,i) => (
            <button key={i} onClick={() => setActiveZkp(i)}
              style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.1em", padding:"5px 10px", border:`1px solid ${activeZkp===i ? z.col : "rgba(255,255,255,0.1)"}`, color: activeZkp===i ? z.col : "rgba(255,255,255,0.3)", background: activeZkp===i ? `${z.col}10` : "none", cursor:"pointer", textTransform:"uppercase", transition:"all 0.18s" }}>{z.scenario.split(" ")[0]}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeZkp} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.2 }}
            style={{ border:`1px solid ${zkpExamples[activeZkp].col}30`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
            <div style={{ padding:"12px 16px", borderBottom:`1px solid ${zkpExamples[activeZkp].col}20`, fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"16px", color:zkpExamples[activeZkp].col }}>{zkpExamples[activeZkp].scenario}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
              <div style={{ padding:"1.2rem 1.4rem", background:"rgba(239,68,68,0.03)", borderRight:`1px solid rgba(239,68,68,0.08)` }}>
                <div style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.3em", color:"rgba(239,68,68,0.5)", marginBottom:"10px" }}>TRADITIONAL (EXPOSES)</div>
                <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"13.5px", color:"rgba(255,255,255,0.45)", lineHeight:1.7, margin:0 }}>{zkpExamples[activeZkp].traditional}</p>
              </div>
              <div style={{ padding:"1.2rem 1.4rem", background:`${zkpExamples[activeZkp].col}06` }}>
                <div style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.3em", color:`${zkpExamples[activeZkp].col}80`, marginBottom:"10px" }}>ZKP VERIFICATION (PRIVATE)</div>
                <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"13.5px", color:"rgba(255,255,255,0.72)", lineHeight:1.7, margin:0 }}>{zkpExamples[activeZkp].zkp}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Recovery Mechanisms */}
        <h3 style={h3Style}>Identity Recovery Mechanisms</h3>
        <p style={pSt}>One of the biggest challenges in decentralized identity is recovery. Unlike centralized systems, there is no "Forgot Password" button. Modern decentralized identity solutions incorporate secure recovery models that maintain security without reintroducing central control.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {recoveryMethods.map((r,i) => (
            <div key={i} style={{ background:"#000", padding:"1.1rem" }}>
              <div style={{ fontSize:"20px", marginBottom:"7px" }}>{r.icon}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"13.5px", color:G, marginBottom:"7px" }}>{r.method}</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.32)", lineHeight:1.6, margin:0 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Industries ── */}
      <div id="industries" data-section="industries">
        <h2 style={h2Style}>6 Industries Being Transformed</h2>
        <p style={pSt}>Blockchain identity is not limited to crypto wallets. It is becoming foundational infrastructure for healthcare, government, banking, education, enterprise operations, and global supply chains — anywhere identity, credentials, or verification matter.</p>
        <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"12px" }}>
          {industries.map((ind,i) => (
            <button key={i} onClick={() => setActiveIndustry(i)}
              style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.1em", padding:"5px 12px", border:`1px solid ${activeIndustry===i ? ind.col : "rgba(255,255,255,0.1)"}`, color: activeIndustry===i ? ind.col : "rgba(255,255,255,0.3)", background: activeIndustry===i ? `${ind.col}10` : "none", cursor:"pointer", textTransform:"uppercase", transition:"all 0.18s" }}>{ind.icon} {ind.name.split(" ")[0]}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeIndustry} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.2 }}
            style={{ border:`1px solid ${industries[activeIndustry].col}30`, background:`${industries[activeIndustry].col}06`, padding:"1.5rem 1.75rem", marginBottom:"3rem", borderRadius:"2px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px" }}>
              <span style={{ fontSize:"22px" }}>{industries[activeIndustry].icon}</span>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"17px", color:industries[activeIndustry].col }}>{industries[activeIndustry].name}</div>
            </div>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(0.98rem,2.2vw,1.1rem)", color:"rgba(255,255,255,0.68)", lineHeight:1.8, margin:"0 0 14px" }}>{industries[activeIndustry].desc}</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"6px" }}>
              {industries[activeIndustry].useCases.map((u,i) => (
                <div key={i} style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                  <span style={{ color:industries[activeIndustry].col, fontSize:"9px", flexShrink:0, opacity:0.6 }}>◆</span>
                  <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.4)" }}>{u}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Future Vision ── */}
      <div id="trends" data-section="trends">
        <h2 style={h2Style}>Future of Digital Identity: 2026–2050</h2>
        <p style={pSt}>By 2035 and beyond, digital identity is expected to become one of the most important components of the global digital economy. Every person, organization, AI system, connected device, and digital asset may possess a cryptographically verifiable identity that enables secure interaction across decentralized networks.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"2.5rem" }}>
          {futureTrends.map((f,i) => (
            <motion.div key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1*i }}
              style={{ background:"#000", padding:"1.2rem" }}>
              <div style={{ fontFamily:"monospace", fontWeight:700, fontSize:"10px", color:f.col, background:`${f.col}10`, border:`1px solid ${f.col}25`, padding:"3px 10px", borderRadius:"2px", marginBottom:"12px", display:"inline-block" }}>{f.year}</div>
              {f.trends.map((t,j) => (
                <div key={j} style={{ display:"flex", gap:"8px", padding:"5px 0", borderBottom:j<f.trends.length-1?"1px solid rgba(255,255,255,0.03)":"none" }}>
                  <span style={{ color:f.col, fontSize:"9px", flexShrink:0, opacity:0.5 }}>◆</span>
                  <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.38)", lineHeight:1.5 }}>{t}</span>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Post-Quantum note */}
        <div style={{ border:`1px solid rgba(167,139,250,0.2)`, borderRadius:"3px", padding:"1.2rem 1.5rem", background:"rgba(167,139,250,0.04)", marginBottom:"3rem" }}>
          <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(167,139,250,0.6)", marginBottom:"8px", textTransform:"uppercase" }}>Post-Quantum Cryptography</div>
          <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(0.98rem,2.2vw,1.1rem)", color:"rgba(255,255,255,0.62)", lineHeight:1.8, margin:0 }}>Many of today's public-key cryptographic algorithms could eventually become vulnerable to sufficiently powerful quantum computers. The blockchain community is actively developing <strong style={{ color:"rgba(167,139,250,0.9)" }}>post-quantum digital signatures</strong>, quantum-resistant key exchange, hybrid cryptographic schemes, and upgradable security protocols — preparing now for the long-term resilience of decentralized identity systems.</p>
        </div>

        {/* Internal Links */}
        <h3 style={h3Style}>Complete Blockchain Knowledge Series</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {internalLinks.map((lnk,i) => (
            <motion.a key={i} href={`/research/${lnk.slug}`} whileHover={{ background:"rgba(243,186,47,0.06)" }}
              style={{ background:"#000", padding:"1rem 1.25rem", display:"flex", alignItems:"center", gap:"14px", textDecoration:"none", transition:"background 0.18s" }}>
              <div style={{ minWidth:"24px", height:"24px", borderRadius:"50%", background:"rgba(243,186,47,0.1)", border:`1px solid rgba(243,186,47,0.25)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"9px", color:G, flexShrink:0 }}>→</div>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"14.5px", color:"rgba(255,255,255,0.88)", marginBottom:"3px" }}>{lnk.title}</div>
                <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.3)", lineHeight:1.5, margin:0 }}>{lnk.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* ── FAQs ── */}
      <div id="faq" data-section="faq">
        <h2 style={h2Style}>Frequently Asked Questions</h2>
        <div style={{ marginBottom:"2.5rem" }}>
          {faqs.map((f,i) => (
            <div key={i} style={{ borderBottom:"1px solid rgba(243,186,47,0.07)", overflow:"hidden" }}>
              <button onClick={() => setOpenFaq(openFaq===i?null:i)}
                style={{ width:"100%", textAlign:"left", padding:"1rem 0", background:"transparent", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"12px" }}>
                <div style={{ minWidth:"22px", height:"22px", borderRadius:"50%", background:"rgba(243,186,47,0.1)", border:"1px solid rgba(243,186,47,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"9px", color:G, flexShrink:0 }}>{i+1}</div>
                <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"clamp(0.95rem,2.2vw,1.05rem)", color:openFaq===i?G:"rgba(255,255,255,0.82)", flex:1, textAlign:"left", lineHeight:1.4 }}>{f.q}</span>
                <span style={{ color:G, opacity:0.5, fontSize:"12px", flexShrink:0 }}>{openFaq===i?"▲":"▼"}</span>
              </button>
              <AnimatePresence>
                {openFaq===i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} style={{ overflow:"hidden" }}>
                    <div style={{ paddingBottom:"1rem", paddingLeft:"34px" }}>
                      <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(0.95rem,2.2vw,1.08rem)", color:"rgba(255,255,255,0.55)", lineHeight:1.8, margin:0 }}>{f.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* ── Myths ── */}
      <div id="myths" data-section="myths">
        <h2 style={h2Style}>Common Myths vs Reality</h2>
        <div style={{ display:"grid", gap:"10px", marginBottom:"3rem" }}>
          {myths.map((m,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.06*i }}
              style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0", border:"1px solid rgba(243,186,47,0.08)", borderRadius:"3px", overflow:"hidden" }}>
              <div style={{ padding:"1rem 1.25rem", background:"rgba(239,68,68,0.03)" }}>
                <div style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.3em", color:"rgba(239,68,68,0.5)", marginBottom:"6px" }}>MYTH</div>
                <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"13px", color:"rgba(255,255,255,0.5)", lineHeight:1.6, margin:0 }}>{m.myth}</p>
              </div>
              <div style={{ padding:"1rem 1.25rem", background:"rgba(74,222,128,0.02)", borderLeft:"1px solid rgba(74,222,128,0.08)" }}>
                <div style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.3em", color:"rgba(74,222,128,0.55)", marginBottom:"6px" }}>REALITY</div>
                <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"13px", color:"rgba(255,255,255,0.55)", lineHeight:1.6, margin:0 }}>{m.reality}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Takeaways ── */}
      <div id="takeaways" data-section="takeaways">
        <div style={{ border:`1px solid rgba(243,186,47,0.16)`, borderRadius:"4px", overflow:"hidden" }}>
          <div style={{ padding:"1rem 1.25rem", borderBottom:"1px solid rgba(243,186,47,0.1)", fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(243,186,47,0.45)", textTransform:"uppercase" }}>KEY TAKEAWAYS</div>
          {takeaways.map((t,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.07*i }}
              style={{ display:"flex", gap:"16px", alignItems:"flex-start", padding:"13px 18px", borderBottom:i<takeaways.length-1?"1px solid rgba(243,186,47,0.05)":"none", background:i%2===0?"rgba(243,186,47,0.015)":"#000" }}>
              <div style={{ minWidth:"22px", height:"22px", borderRadius:"50%", background:"rgba(243,186,47,0.1)", border:"1px solid rgba(243,186,47,0.16)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"9px", color:G, flexShrink:0, marginTop:"1px" }}>{i+1}</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"13px", color:"rgba(255,255,255,0.58)", lineHeight:1.65, margin:0 }}>{t}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Web3 Future Visual Article ────────────────────────────────────────── */
