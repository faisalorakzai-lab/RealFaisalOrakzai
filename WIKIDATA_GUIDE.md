# Wikidata Entry — Faisal Orakzai
## Google Knowledge Panel ka #1 Zariya

> Wikidata ek free, open knowledge base hai jise Google Knowledge Panel banane ke liye directly use karta hai.
> Yahan entry banao to Knowledge Panel **guaranteed** hota hai.

---

## Step 1: Wikidata Account Banao
1. Jao: https://www.wikidata.org/wiki/Special:CreateAccount
2. Apna username: `FaisalOrakzai` rakho
3. Email verify karo

---

## Step 2: Naya Item Banao
1. Jao: https://www.wikidata.org/wiki/Special:NewItem
2. Label (English): `Faisal Orakzai`
3. Description (English): `Pakistani technology entrepreneur and computer scientist`
4. Aliases: `Muhammad Faisal Orakzai`, `فیصل اورکزئی`
5. Click "Create"

---

## Step 3: Ye Properties Add Karo (Ek Ek Karke)

| Property | Value |
|---------|-------|
| **P31** (instance of) | `Q5` (human) |
| **P21** (sex or gender) | `Q6581097` (male) |
| **P27** (country of citizenship) | `Q843` (Pakistan) |
| **P569** (date of birth) | `+2006-04-30T00:00:00Z` |
| **P19** (place of birth) | `Q1186812` (Orakzai District) |
| **P106** (occupation) | `Q131524` (entrepreneur) + `Q82594` (computer scientist) + `Q4964182` (businessperson) |
| **P101** (field of work) | `Q11016` (blockchain) + `Q11660` (artificial intelligence) |
| **P735** (given name) | `Q15897419` (Faisal) |
| **P734** (family name) | create new → `Orakzai` |
| **P937** (work location) | `Q8660` (Karachi) |
| **P856** (official website) | `https://faisalorakzai.com` |
| **P2002** (Twitter username) | `faisalorakzaii` |
| **P4084** (Instagram username) | `faisalorakzaii` |
| **P2037** (GitHub username) | `faisalorakzai-lab` |
| **P1960** (Google Scholar) | (if applicable) |
| **P496** (ORCID) | `0009-0000-0915-7272` |
| **P345** (IMDb ID) | `nm18674496` |
| **P6634** (LinkedIn ID) | `faisalorakzaii` |

---

## Step 4: Image Add Karo
- Pehle apni photo Wikimedia Commons par upload karo: https://commons.wikimedia.org/wiki/Special:UploadWizard
- Phir Wikidata mein **P18** (image) property add karo

---

## Step 5: EverybodyWiki Link Add Karo
- Property **P11247** (EverybodyWiki article) ya external link add karo
- URL: `https://en.everybodywiki.com/Faisal_Orakzai`

---

## Wikidata Entry ke baad kya hoga?

Google ka Knowledge Graph crawler wikidata.org ko continuously scan karta hai.
Ek baar Wikidata entry ban jaye (Q-number mil jaye):

1. **24-72 hours** mein Google isse detect kar leta hai
2. **Knowledge Panel** "Faisal Orakzai" search par appear hona shuru hoga
3. Panel mein ye automatically aayega:
   - ✅ Title: "Technology entrepreneur and computer scientist"
   - ✅ Born: April 30, 2006
   - ✅ Born in: Orakzai District, KPK, Pakistan
   - ✅ Organization: Orakzai Group
   - ✅ Website: faisalorakzai.com
   - ✅ Social links (Twitter, Instagram, LinkedIn)

---

## Ek baar Q-number mile to website mein add karo

Wikidata par entry ban jaye aur Q-number mile (jaise Q12345678), to:

Website ke `index.html` mein Person schema ke `sameAs` array mein add karo:
```
"https://www.wikidata.org/wiki/Q12345678"
```

Aur `mainEntityOfPage` mein bhi add karo:
```
"@type": "AboutPage",
"sameAs": "https://www.wikidata.org/wiki/Q12345678"
```

---

## Knowledge Panel Claim karna

Wikidata entry ban jaye to:
1. Jao: https://search.google.com/local/writereview (ya Google Search par apna naam search karo)
2. Panel ke neeche "Claim this knowledge panel" click karo
3. Verify karo (website ya social media se)
4. Phir aap panel edit kar sakte ho — title, description, images

---

*Estimated time: Wikidata entry → Knowledge Panel appear = 1-4 weeks*
