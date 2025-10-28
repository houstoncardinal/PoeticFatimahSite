# Design Guidelines: Poetically Fatimah

## Design Approach

**Reference-Based Approach**: Premium editorial design inspired by high-end poetry publications and artistic portfolios. Think literary magazines (Paris Review, Poetry Foundation) meets modern artist portfolios (Behance, personal artist sites). Emphasis on whitespace, cinematic imagery, and typographic hierarchy that honors the poetry.

**Brand Essence**: Soulful, empowering, reflective, healing, bold with intimate, poetic, confident, warm tone.

---

## Color System

**Primary Palette**:
- **Obsidian Black** (#0E0E10) - Primary text, hero backgrounds
- **Porcelain White** (#FAFAFA) - Background, light sections
- **Rose Gold** (#B76E79) - Primary CTAs, accent elements
- **Deep Plum** (#4C2A4E) - Secondary buttons, headings
- **Soft Sand** (#E8DCCB) - Section backgrounds, subtle dividers

**Application**:
- Hero sections: Obsidian backgrounds with Porcelain text
- Alternating sections: Porcelain and Soft Sand backgrounds
- CTAs: Rose Gold primary, Deep Plum secondary
- Text hierarchy: Obsidian for body, Deep Plum for subheadings

---

## Typography

**Font Families**:
- **Display**: Playfair Display (elegant, editorial) - Hero headlines, poem titles, section headings
- **Body**: Inter (modern, accessible) - Body text, UI elements, navigation

**Type Scale**:
- Hero Headlines: 4xl-6xl (56-72px desktop, 36-48px mobile), Playfair Display, font-weight 700
- Section Headings: 3xl-4xl (36-48px desktop, 28-36px mobile), Playfair Display, font-weight 600
- Poem Titles: 2xl-3xl (24-36px), Playfair Display, font-weight 600
- Body Text: base-lg (16-18px), Inter, font-weight 400, line-height 1.7
- UI Elements: sm-base (14-16px), Inter, font-weight 500
- Captions: sm (14px), Inter, font-weight 400, italic

**Emphasis**: Use oversized quotes (5xl-6xl) for testimonials and featured poem excerpts with Playfair Display italic.

---

## Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32 for consistent rhythm.

**Container Strategy**:
- Full-width sections: w-full with inner max-w-7xl mx-auto px-6
- Content sections: max-w-6xl mx-auto
- Poetry/text content: max-w-prose (optimal reading ~65 characters)
- Grid layouts: gap-8 to gap-12

**Section Padding**:
- Desktop: py-24 to py-32
- Tablet: py-16 to py-20
- Mobile: py-12 to py-16

**Grid Patterns**:
- Poetry Collections: 3 columns desktop (lg:grid-cols-3), 2 tablet (md:grid-cols-2), 1 mobile
- Shop Products: 3 columns desktop, 2 tablet, 1 mobile
- Testimonials: 2-3 columns desktop, 1 mobile
- Event Cards: 2 columns desktop, 1 mobile

---

## Component Library

**Hero Section**:
- Full viewport height (min-h-screen) with large cinematic portrait
- Centered content with headline, subhead, dual CTAs, social row
- Buttons with blurred backgrounds when over images
- Rose Gold primary CTA, Deep Plum outline secondary

**Poem Card**:
- Image thumbnail (if available) or decorative texture
- Playfair title (2xl), excerpt (2 lines, Inter regular)
- "Read More" link with arrow
- Hover: subtle lift (translate-y-1) and shadow increase

**Audio Player**:
- Large play/pause button (Rose Gold accent)
- Scrub bar with progress indicator
- Transcript toggle button
- Time display (current/total)
- Minimal, clean interface with ample padding

**Navigation**:
- Desktop: Horizontal menu, Inter medium, letter-spacing wide
- Mobile: Drawer with large touch targets (min 44px)
- Fixed header with subtle shadow on scroll

**Quote Block**:
- Oversized quotation marks (Deep Plum, 6xl)
- Playfair Display italic for quote text (3xl-4xl)
- Attribution: Inter regular, smaller size, Soft Sand background

**Product Card**:
- Product image (4:5 aspect ratio)
- Title (Playfair, xl), price (Inter, Rose Gold)
- Short description (2 lines)
- "Add to Cart" or external link button

**Event Card**:
- Date badge (large, Rose Gold background)
- Event title, venue, city
- RSVP/Details button
- Past events: reduced opacity

**Newsletter Signup**:
- Full-width section with Soft Sand background
- Large headline (Playfair 3xl): "Get first reads, show dates & quiet notes"
- Email input with Rose Gold submit button
- Success state with confirmation message

**Footer**:
- Multi-column layout (4 columns desktop, 2 tablet, 1 mobile)
- Quick links, social icons, newsletter mini-form
- Copyright and credits in smaller text
- Soft Sand background or Obsidian with Porcelain text

---

## Imagery & Visual Direction

**Photography Style**: Cinematic portraits with soft natural light, warm grain, minimal clutter. B-roll elements: hands writing, stage silhouettes, pages turning.

**Image Placement**:
- **Hero**: Large, full-bleed cinematic portrait of Fatimah (warm tones, natural light)
- **About Page**: 2-3 lifestyle portraits showcasing personality and presence
- **Performance Section**: Embedded video reel, stage photography thumbnails
- **Poetry Pages**: Optional featured images per poem, abstract textures
- **Shop**: Product photography (books, prints) with clean backgrounds

**Visual Accents**:
- Handwritten SVG brush strokes as dividers
- Subtle grain texture overlay on dark sections
- Hairline dividers with small star glyph
- Soft shadows (shadow-lg, shadow-2xl) with subtle blur

**Animations**: Minimal, purposeful
- Fade-in on scroll for sections
- Subtle hover lifts on cards
- Smooth audio player interactions
- No distracting parallax or complex scroll-triggered effects

---

## Page-Specific Layouts

**Home Page**:
1. Hero (full viewport, image background, centered content)
2. Spotlight Poem (max-w-prose, centered, audio player)
3. Performance Reel (video embed, stats row)
4. Latest Shop Items (3-column grid)
5. Newsletter Band (full-width, Soft Sand background)
6. Testimonials (2-column quotes)

**Poetry Section**:
- Collection grid landing page
- Individual poem pages: centered prose layout, large typography, audio player prominent

**Performances/EPK**:
- Video reel at top
- Multi-column sections for topics, tech needs, highlights
- Downloadable EPK button (Rose Gold, prominent)

**Shop**:
- Product grid with filters
- External embed integration (Gumroad/Shopify)

**Link-in-Bio**:
- Minimal centered layout
- Large touch-friendly buttons (6 primary actions)
- Clean typography, generous spacing

---

## Accessibility

- Minimum 16px base font size
- WCAG AA contrast ratios (4.5:1 minimum)
- Keyboard focus states (Rose Gold outline)
- ARIA labels on audio players, navigation
- Alt text for all images
- Transcript toggle for audio content