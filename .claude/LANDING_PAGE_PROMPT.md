# Pro Court Surfaces — Landing Page Build (Next.js)

## Context
You're building the homepage/landing page for Pro Court Surfaces (procourtsurfaces.com), a premium pickleball and tennis court resurfacing company based in Austin, TX serving Greater Central Texas. This is a Next.js app (the same repo as the quote platform). The landing page lives at the root `/` route.

## Brand Assets — All Cloudinary-hosted

### Cloud Name: `dwyd4f7lz`

### Video
- **Drone hero video**: `https://res.cloudinary.com/dwyd4f7lz/video/upload/Website_Video_gnp5ib.mp4`
- Use Cloudinary transformations for optimization: append `q_auto,f_auto` for images, `q_auto` for video

### Logos
- **Full color (transparent bg)**: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1767487583/pro_court_logo_full_color_no_bg_2_owjtqf.png`
- **All white (transparent bg)**: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1767487552/pro_court_logo_white_no_bg_2_ludutv.png`

### Brand Colors (EXACT from logo — do not change these)
- **Primary Blue**: `#004AAD`
- **Court Green**: `#93ED69`  
- **Dark Navy** (derived, for dark sections): `#003278`
- **Background**: White `#FFFFFF` or very subtle warm white `#FAFAF8`
- **Text**: Near-black `#1A1A1A`
- Use the blue as the primary accent (buttons, links, nav highlights). Use the green sparingly as a secondary pop (hover states, small accents, decorative elements). Don't overdo the green — it's a court-surface color, let it show up in the photos naturally.

### Project Photos — Organized by Project

**YOAKUM CITY PARK** (Two tennis courts, city park, aerial drone shots, no fence/nets in photos)
- Hero (zoomed): `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1769365113/DJI_0052_ntkfl1.jpg`
- After aerial: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1769365125/DJI_0054_rgzy6p.jpg`
- After most zoomed: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1769365087/DJI_0061_kcgxtd.jpg`
- After side: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1769365100/DJI_0048_hn3ejm.jpg`

**LAKESIDE TENNIS** (Large residential tennis court refurb, beautiful results, has before/during/after shots — NOTE: this project is in Washington state, NOT Texas — do NOT mention location but fine to use photos)
- Hero aerial: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1759800811/DJI_20250917112633_0423_D_kiqa0u.jpg`
- Hero alternative: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1759800915/FNGP5079_ficg32.jpg`
- After 1: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1759809108/FNGP5077_h7m7si.jpg`
- After 2: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1759801933/FNGP5107_cdnnzj.jpg`
- After aerial: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1759802070/DJI_20250917112353_0396_D_2_v1nhyi.jpg`
- Before wide: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1759801129/IMG_0037_xclgpd.jpg`
- Before cracks: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1759801041/IMG_0045_1_uviac1.jpg`
- During lining: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1759801799/lining_vwqbmb.jpg`
- During surface prep: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1759801397/IMG_1422_vhekii.jpg`
- During color: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1759801650/IMG_0227_m0rksn.jpg`
- During baselayer: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1759801585/IMG_0140_bxh7sl.jpg`

**WIMBERLEY WAYSIDE 1** (Backyard court, tree-covered, not great for aerials — good for "residential backyard" vibe)
- Hero: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1762309892/2_color_front_j6zp5s.heic`
- After: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1762309890/2_color_side_ipxlnu.heic`
- Before: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1762353459/before_1_ngdfo2.heic`
- During birdbath fill: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1762353721/in_progress_bird_bath_fill_1_rbxf6u.heic`
- All green: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1762353719/Colors_rudolr.heic`

**WIMBERLEY WAYSIDE 2** (3-color court, looks great but fence posts with no fence visible)
- Hero: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1762354561/3_color_straight_h4nhiw.heic`
- After: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1762354989/3_color_straight_1_dtxi5n.heic`
- Before: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1762354899/before_2_dyksr6.heic`
- During 1: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1762354938/during_2_exs400.heic`
- During 2: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1762354934/during_edjnaw.heic`

**ABOUT / TEAM**
- Patrick photo: `https://res.cloudinary.com/dwyd4f7lz/image/upload/v1759809485/IMG_0225_iaakk1.jpg`

---

## Design Direction

You are an expert designer who builds clean, high-converting landing pages for a living. Every competitor in this space (CourTex, BuildMyCourts, Sport Court Texas, Dobbs Tennis) has the same generic contractor website: walls of text, cluttered layouts, stock photo grids, dated fonts, zero personality. **Pro Court Surfaces will be the opposite.**

### Aesthetic: "Refined Athletic Minimalism"
Think: the love child of Apple's product pages, a premium sports brand, and a modern architecture firm. Clean, confident, spacious. The kind of page where a homeowner with a $40K court project thinks "these guys are legit" within 2 seconds.

### Design Principles
1. **Breathe** — Generous whitespace. Let every section have room. No cramming.
2. **One thing per viewport** — Each scroll section makes exactly one point, powerfully.
3. **Typography carries the weight** — Big, bold headlines do the selling. Body text is secondary and minimal.
4. **Brand-consistent colors** — Blue primary (#004AAD), court green accent (#93ED69), clean white background. The blue dominates UI elements (buttons, links). The green is used sparingly.
5. **Real photography everywhere** — We have beautiful drone shots and project photos. USE THEM. No placeholders, no stock photos.
6. **Mobile-first** — Most leads come from phones. Every section must look incredible at 375px.

### Typography
Pick distinctive Google Fonts that feel premium but not fussy:
- Display/Headlines: Something with character — Outfit, Sora, DM Sans (bold weights), Manrope, or similar
- Body: Clean and readable — matching at lighter weights or a complementary sans
- Do NOT use: Inter, Roboto, Arial, Open Sans, or any default system font

### What makes this UNFORGETTABLE
The drone video hero. The real photography. The confidence of the copy. While every competitor screams "WE DO EVERYTHING! PICKLEBALL! TENNIS! BASKETBALL! RUNNING TRACKS! CALL NOW!!!", this page whispers with authority. Short copy. Big type. Stunning visuals. One clear CTA.

---

## Page Structure — Sections (top to bottom)

### 1. Nav
- Sticky, clean, minimal
- White logo (on video) / color logo (after scroll) on the left — use the transparent bg logos from Cloudinary
- Right side: Services, Our Work, About, Contact (anchor links) + "Get a Free Estimate" button (blue bg, white text)
- Nav should be transparent over the hero video, then get a white background + shadow on scroll
- Hamburger menu on mobile

### 2. Hero — DRONE VIDEO
- **Full-viewport hero with the drone video as background**
- Video: `https://res.cloudinary.com/dwyd4f7lz/video/upload/q_auto/Website_Video_gnp5ib.mp4`
- `autoPlay muted loop playsInline` — NO controls shown
- Dark gradient overlay (from bottom ~60% opacity) so text is readable
- **Poster/fallback image**: Use the Yoakum aerial shot `DJI_0054_rgzy6p.jpg` as the poster for slow connections
- **Headline**: "Courts that play as good as they look." (large, white, bold)
- **Subhead**: "Premium pickleball & tennis court resurfacing across Greater Austin." (white, lighter weight)
- **CTA button**: "Get a Free Estimate" (brand blue bg `#004AAD`, white text, rounded)
- **Mobile**: On mobile, consider using the poster image instead of video to save bandwidth. Use a `<picture>` or media query approach. Or let the video play but ensure it's compressed via Cloudinary transformations.

### 3. Services (keep it tight)
- Section headline: "What We Do" or similar
- Three cards or columns:
  - **Resurfacing** — Breathe new life into cracked, faded courts
  - **New Court Surfacing** — First-time surface applications on fresh concrete  
  - **Custom Color & Design** — Your court, your colors, your lines
- Each gets: a subtle icon or small accent, short title, ONE sentence. That's it.
- Background: white or very subtle off-white
- Consider using a small court photo as a subtle background element or accent image

### 4. Before & After Showcase
- This is the money section. Use REAL before/after photos.
- **Featured transformation: Lakeside Tennis**
  - Before: `IMG_0037_xclgpd.jpg` (wide shot, faded court) or `IMG_0045_1_uviac1.jpg` (crack detail)
  - After: `DJI_20250917112633_0423_D_kiqa0u.jpg` (aerial) or `FNGP5077_h7m7si.jpg` (ground level)
- **Second transformation: Wimberley Wayside 2**
  - Before: `before_2_dyksr6.heic`
  - After: `3_color_straight_h4nhiw.heic`
- Present as side-by-side or slider (before/after drag slider is great UX if you can do it cleanly with CSS/minimal JS). Or just two images side by side with "Before" / "After" labels.
- Section headline: "See the Difference" or "The Transformation"
- Keep it to 2-3 transformations max. Quality over quantity.

### 5. Portfolio / Project Gallery
- A clean grid of the best finished shots — 4 to 6 images
- Suggested images (the money shots):
  - Yoakum aerial: `DJI_0054_rgzy6p.jpg`
  - Yoakum zoomed: `DJI_0061_kcgxtd.jpg`
  - Lakeside aerial after: `DJI_20250917112353_0396_D_2_v1nhyi.jpg`
  - Lakeside ground after: `FNGP5107_cdnnzj.jpg`
  - Wimberley 2 three-color: `3_color_straight_1_dtxi5n.heic`
  - Wimberley 1 two-color: `2_color_front_j6zp5s.heic`
- Use Cloudinary auto-format and quality: append `/q_auto,f_auto/` in the URL path after `/upload/`
- Images should have subtle rounded corners, maybe a light shadow
- Consider a masonry-style or clean 2x3 grid
- Caption each subtly if you want: "Residential Court — Wimberley, TX" / "City Park — Yoakum, TX" etc. (Don't caption Lakeside with a location since it's in WA)

### 6. The Process (how it works)
- Simple 4-step visual:
  1. **Assess** — We inspect your court and discuss your vision
  2. **Quote** — You get a detailed, transparent quote within 48 hours
  3. **Surface** — Our crew transforms your court in 3-5 days
  4. **Play** — Step onto a court that looks and plays brand new
- Clean horizontal timeline or numbered steps
- Consider using one of the "during" photos as a background accent:
  - Lining: `lining_vwqbmb.jpg`
  - Color application: `IMG_0227_m0rksn.jpg`

### 7. Why Pro Court Surfaces
- 3-4 differentiators, NOT a wall of text:
  - **Owner-operated** — You work directly with the person doing the work
  - **Premium materials** — Same coatings used on pro tournament facilities
  - **Transparent pricing** — Detailed quotes with no surprise upcharges
  - **Central Texas experts** — We know Austin soil, drainage, and climate
- Use Patrick's photo (`IMG_0225_iaakk1.jpg`) somewhere in or near this section to reinforce the "owner-operated" point. A circular crop or clean rectangular image alongside the differentiators.
- Keep this section warm and personal. This is where trust gets built.

### 8. Service Area
- Simple, clean text block:
  - "Proudly serving Austin, Round Rock, Cedar Park, Georgetown, Wimberley, San Marcos, Dripping Springs, Kyle, Buda, and the greater Central Texas Hill Country."
- Light background treatment to separate from adjacent sections
- Optional: subtle map graphic or just let the text do the work

### 9. FAQ Section (SEO/AEO powerhouse)
- Use the questions from the FAQ schema above
- Style as a clean accordion (click to expand) or simple Q&A stack
- Each question is an `<h3>`, each answer is a `<p>`
- Keep it clean and minimal — not a giant wall of text
- 5 questions max
- This section is critical for AI engine citations — AI models scrape FAQ content heavily

### 10. CTA / Contact Section
- Final conversion section
- Headline: "Ready to transform your court?"
- Simple contact form: Name, Email, Phone, Brief project description (textarea)
- "Get a Free Estimate" submit button
- OR: Phone number displayed prominently + email + form
- Phone: make it a clickable `tel:` link for mobile
- Background: could use the dark navy `#003278` with white text for visual contrast and to signal "this is the end, take action"
- Keep it clean. This is the close.

### 11. Footer
- Dark background (navy `#003278` or near-black)
- White logo (the all-white transparent version)
- Phone, email, "Austin, TX"
- Links: Terms & Conditions, Privacy (placeholder for now)
- Copyright: "© 2026 Pro Court Surfaces. All rights reserved."
- That's it. No giant footer.

---

## Technical Requirements

1. **Framework**: Next.js App Router. Landing page at `app/page.tsx`.
2. **Styling**: Tailwind CSS. Extend the Tailwind config with brand colors:
   ```js
   colors: {
     brand: {
       blue: '#004AAD',
       green: '#93ED69',
       navy: '#003278',
     }
   }
   ```
3. **Fonts**: Import via `next/font/google` in layout.tsx.
4. **Components**: Break into `components/landing/` directory:
   ```
   components/landing/
     Navbar.tsx
     Hero.tsx
     Services.tsx
     BeforeAfter.tsx
     Portfolio.tsx
     Process.tsx
     WhyUs.tsx
     ServiceArea.tsx
     FAQ.tsx
     Contact.tsx
     Footer.tsx
   ```
5. **Images**: Use `next/image` with Cloudinary URLs. Configure `next.config.js` to allow Cloudinary domain:
   ```js
   images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: 'res.cloudinary.com',
         pathname: '/dwyd4f7lz/**',
       },
     ],
   }
   ```
6. **Video**: Use a standard `<video>` tag for the hero (Next.js Image doesn't handle video). Add Cloudinary quality transforms in the URL.
7. **HEIC images**: Cloudinary auto-converts HEIC to JPG/WebP when you use `f_auto` in the URL transform. So for any `.heic` URL, insert `f_auto,q_auto` after `/upload/` like: `https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto/v1762354561/3_color_straight_h4nhiw.heic` — this will serve WebP or JPG to the browser automatically.
8. **Responsive**: Mobile-first. Beautiful at 375px, 768px, and 1440px.
9. **Animations**: Subtle fade-in on scroll for sections using Intersection Observer. Smooth scroll for anchor links. Nothing flashy.
10. **Performance**: Lazy load images below the fold. Use Cloudinary responsive transforms (w_auto or specific widths like w_800, w_1200) for different breakpoints.
11. **SEO/AEO**: See the dedicated SEO & AEO section below. This is critical — implement everything listed there.
12. **Contact form**: Just the UI for now. Console.log the form data on submit. We'll wire it to Resend later.
13. **Nav scroll behavior**: Transparent on hero → white bg with shadow after scrolling past hero. Use scroll event listener or Intersection Observer.

---

## Cloudinary Image Optimization Tips
For any image URL, you can insert transforms after `/upload/`:
- Auto format + quality: `/f_auto,q_auto/`
- Resize: `/w_1200,f_auto,q_auto/` (width 1200px)
- Crop for aspect ratio: `/c_fill,w_800,h_600,f_auto,q_auto/`
- Video poster frame: `/so_2,f_auto,q_auto/` (screenshot at 2 seconds)

Use these to serve optimized assets without needing to manually resize anything.

---

## SEO & AEO (AI Engine Optimization) — CRITICAL

This page needs to rank in Google AND get cited by AI assistants (ChatGPT, Perplexity, Claude, Gemini) when someone asks "best pickleball court resurfacing Austin" or similar. Implement ALL of the following:

### Page Metadata (Next.js `metadata` export in page.tsx or layout.tsx)
```tsx
export const metadata: Metadata = {
  title: 'Pro Court Surfaces | Pickleball & Tennis Court Resurfacing in Austin, TX',
  description: 'Austin\'s premier pickleball and tennis court resurfacing company. Expert surface restoration, custom colors, and new court surfacing across Greater Austin and Central Texas. Free estimates.',
  keywords: 'pickleball court resurfacing Austin, tennis court resurfacing Austin TX, court resurfacing Central Texas, pickleball court repair Austin, tennis court repair near me, court surfacing Austin, sport court resurfacing Texas',
  openGraph: {
    title: 'Pro Court Surfaces | Pickleball & Tennis Court Resurfacing in Austin, TX',
    description: 'Austin\'s premier pickleball and tennis court resurfacing company. Expert surface restoration, custom colors, and new court surfacing across Greater Austin and Central Texas.',
    url: 'https://www.procourtsurfaces.com',
    siteName: 'Pro Court Surfaces',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1200/v1769365125/DJI_0054_rgzy6p.jpg',
        width: 1200,
        height: 630,
        alt: 'Aerial view of freshly resurfaced tennis courts by Pro Court Surfaces in Texas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pro Court Surfaces | Court Resurfacing in Austin, TX',
    description: 'Premium pickleball & tennis court resurfacing across Greater Austin. Free estimates.',
    images: ['https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1200/v1769365125/DJI_0054_rgzy6p.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.procourtsurfaces.com',
  },
};
```

### Semantic HTML Structure
- One `<h1>` only (the hero headline)
- `<h2>` for each section headline (Services, Our Work, Process, etc.)
- `<h3>` for subsection items (individual service names, differentiator titles)
- Use `<main>`, `<section>`, `<nav>`, `<header>`, `<footer>` landmarks
- Each `<section>` gets an `id` for anchor links AND a descriptive `aria-label`
- Use `<article>` for self-contained pieces like project showcases

### Image SEO (EVERY image must have these)
- Descriptive `alt` text that includes keywords naturally:
  - ✅ "Aerial view of resurfaced pickleball court with blue and green custom colors at Yoakum City Park in Texas"
  - ✅ "Before photo showing cracked and faded tennis court surface needing resurfacing"
  - ✅ "Professional court resurfacing in progress — applying acrylic color coating"
  - ❌ "court1.jpg" or "image" or "photo of court"
- Use `loading="lazy"` for below-fold images (Next.js Image does this by default)
- Include `width` and `height` to prevent layout shift

### JSON-LD Structured Data (add to layout.tsx or page.tsx as a `<script>` tag)
Add THREE schema blocks:

**1. LocalBusiness Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Pro Court Surfaces",
  "description": "Professional pickleball and tennis court resurfacing, new court surfacing, and custom color design serving Austin and Greater Central Texas.",
  "url": "https://www.procourtsurfaces.com",
  "logo": "https://res.cloudinary.com/dwyd4f7lz/image/upload/v1767487583/pro_court_logo_full_color_no_bg_2_owjtqf.png",
  "image": "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto/v1769365125/DJI_0054_rgzy6p.jpg",
  "telephone": "+15125551234",
  "email": "patrick@procourtsurfaces.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.2672,
    "longitude": -97.7431
  },
  "areaServed": [
    {"@type": "City", "name": "Austin", "sameAs": "https://en.wikipedia.org/wiki/Austin,_Texas"},
    {"@type": "City", "name": "Round Rock"},
    {"@type": "City", "name": "Cedar Park"},
    {"@type": "City", "name": "Georgetown"},
    {"@type": "City", "name": "Wimberley"},
    {"@type": "City", "name": "San Marcos"},
    {"@type": "City", "name": "Dripping Springs"},
    {"@type": "City", "name": "Kyle"},
    {"@type": "City", "name": "Buda"},
    {"@type": "City", "name": "Pflugerville"},
    {"@type": "City", "name": "Lakeway"},
    {"@type": "City", "name": "Bee Cave"}
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 30.2672,
      "longitude": -97.7431
    },
    "geoRadius": "100 mi"
  },
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "17:00"
  },
  "sameAs": []
}
```

**2. Service Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Court Resurfacing",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Pro Court Surfaces"
  },
  "areaServed": {
    "@type": "State",
    "name": "Texas"
  },
  "description": "Professional pickleball and tennis court resurfacing services including surface restoration, crack repair, custom color application, and new court surfacing on fresh concrete.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Court Surfacing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Court Resurfacing",
          "description": "Complete resurfacing of existing pickleball and tennis courts including crack repair, base layer application, color coating, and line striping"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "New Court Surfacing",
          "description": "First-time acrylic surface application on new concrete slabs for pickleball and tennis courts"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Court Color and Design",
          "description": "Custom color selection and multi-color court design with professional line striping for pickleball, tennis, and multi-sport courts"
        }
      }
    ]
  }
}
```

**3. FAQ Schema (for AEO — these are the questions AI assistants pull from):**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does it cost to resurface a pickleball court in Austin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pickleball court resurfacing in Austin typically ranges from $3,000 to $8,000 depending on the court's condition, size, and number of colors. Pro Court Surfaces provides free on-site estimates with detailed, transparent pricing and no hidden fees."
      }
    },
    {
      "@type": "Question",
      "name": "How long does court resurfacing take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most court resurfacing projects take 3 to 5 working days from start to finish, depending on weather conditions and the scope of work. This includes surface preparation, crack repair, base layer application, color coats, and line striping."
      }
    },
    {
      "@type": "Question",
      "name": "What areas does Pro Court Surfaces serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pro Court Surfaces serves the Greater Austin and Central Texas area including Austin, Round Rock, Cedar Park, Georgetown, Wimberley, San Marcos, Dripping Springs, Kyle, Buda, Pflugerville, Lakeway, Bee Cave, and the surrounding Hill Country region."
      }
    },
    {
      "@type": "Question",
      "name": "Can you resurface a tennis court into pickleball courts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Converting a tennis court to pickleball is one of our most popular services. A standard tennis court can accommodate up to four pickleball courts. We handle the full conversion including surface prep, new color application, and pickleball line striping."
      }
    },
    {
      "@type": "Question",
      "name": "What type of surface coating do you use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We use professional-grade acrylic sport surface coatings — the same systems used on tournament-level facilities. These coatings are specifically engineered for outdoor sport courts and are designed to withstand Texas heat, UV exposure, and heavy play."
      }
    }
  ]
}
```

### AEO-Specific Content Strategy
AI engines cite pages that directly answer questions in natural language. To optimize for AI citation:

1. **Add a visible FAQ section** on the page (place it between the Service Area and Contact sections). Use the same Q&A content from the FAQ schema above. Style it as a clean accordion or simple Q&A list. Use `<h3>` for each question. This serves double duty — humans see it AND AI models pull from it.

2. **Write copy in answer-ready format.** Throughout the page, weave in natural-language statements that directly answer likely queries:
   - In the services section: "Pro Court Surfaces specializes in pickleball and tennis court resurfacing across Greater Austin and Central Texas."
   - In the process section: "Most resurfacing projects are completed in 3 to 5 working days."
   - In the about/why section: "Pro Court Surfaces is an owner-operated court resurfacing company based in Austin, Texas."
   
3. **Entity clarity**: Make sure the page clearly and repeatedly establishes WHAT Pro Court Surfaces is, WHERE it operates, and WHAT it does. AI models need this entity clarity to confidently cite the page. Don't be cute or vague — state it plainly at least 2-3 times across different sections.

### Technical SEO Checklist
- [ ] Canonical URL set to `https://www.procourtsurfaces.com`
- [ ] All images have descriptive alt text with keywords
- [ ] All headings follow proper h1 → h2 → h3 hierarchy
- [ ] JSON-LD structured data for LocalBusiness, Service, and FAQPage
- [ ] OpenGraph and Twitter Card meta tags
- [ ] Semantic HTML landmarks (main, nav, section, footer)
- [ ] Mobile responsive (Core Web Vitals friendly)
- [ ] No render-blocking resources
- [ ] Video has poster image fallback (for CLS and LCP)
- [ ] All external images use `next/image` for automatic optimization
- [ ] Internal anchor links use smooth scroll
- [ ] Page loads fast — target < 3s LCP

---

## What NOT to do
- No stock photos — we have real project photography, use it
- No purple gradients  
- No "Welcome to our website" energy
- No walls of text anywhere
- No more than ONE h1 on the page
- No generic testimonial carousels
- No cluttered navigation with 8+ links
- Don't mention Lakeside project is in Washington — just use the photos without location
- Don't make it look like every other contractor website

---

Build it. Make it beautiful. Make it the page that makes every court resurfacing competitor in Austin look like they're stuck in 2015.
