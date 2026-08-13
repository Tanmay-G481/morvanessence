# Morvan Essence — B2B Export Website PRD

## Original Problem Statement
Morvan Essence is a premium Indian organic incense and dhoop export brand inspired by the spiritual heritage of Vrindavan. Build a modern, luxurious, earthy and highly trustworthy website focused on international B2B buyers and global exports. Homepage message: "Authentic Indian Incense, Inspired by Vrindavan — Crafted for the World." Sections: Our Story (Vrindavan), Products, Natural & Organic Approach, Why Morvan Essence, Export & Global Supply, Private Label/OEM, Quality & Certifications, Fragrance Collection, Contact/Request a Quote. Products: organic incense sticks, dhoop sticks, cow-dung incense/dhoop in 3.5", 6", 9" formats with multiple fragrances. Palette: natural earthy tones, ivory, muted green, sandalwood/brown, subtle gold accents. B2B CTAs: Request a Sample, Request a Quote, Become a Distributor, Private Label Enquiry. Mobile-responsive, fast, SEO-friendly, conversion-focused. No unsupported claims (no "100% organic" or unverified certifications).

## User Personas
- International importer/wholesaler evaluating an Indian incense supplier
- Distributor seeking territory partnerships
- Private-label/wellness brand looking for an OEM manufacturer
- Retail chain buyer requesting samples before bulk orders

## Architecture
- Frontend: React (CRA + craco), TailwindCSS, Shadcn UI, Axios — `/app/frontend/src/App.js`
- Backend: FastAPI + Motor (async MongoDB) — `/app/backend/server.py`
- Database: MongoDB via `MONGO_URL`/`DB_NAME` env vars
- Preview URL: https://essence-export.preview.emergentagent.com

## DB Schema
- `enquiries`: { id (uuid), enquiry_type, company_name, contact_person, business_email, phone_whatsapp, country, business_type, product_interest, message, status, timestamp }

## Key API Endpoints
- `GET /api/` — brand/health status
- `POST /api/enquiries` — B2B enquiry ingestion (validated, stored in MongoDB)

## Core Requirements (static)
- Earthy luxury design (ivory, muted green, sandalwood, gold)
- All 9 content sections listed above
- 4 B2B CTA types wired to enquiry form
- Database-backed enquiry form
- No unsupported marketing claims

## Implemented (2026-08-11)
- Full homepage with all sections: Story, Products, Natural Approach, Why Us, Export & Global Supply, Private Label/OEM, Quality, Fragrance Collection, Contact
- B2B enquiry form (sample/quote/distributor/private-label types) saving to MongoDB — verified end-to-end via curl
- Copy sanitized: no unverified certifications, placeholder contact details removed (awaiting real ones from user)
- Fixed React lint errors and raw HTML entity rendering on submit button
- Verified: backend health endpoint, enquiry POST round-trip, homepage + products + contact section screenshots
- Full 7-language i18n (EN, HI, AR, FR, DE, ES, NL) via react-i18next — every UI string, form label, and blog article translated; locale files in `/app/frontend/src/locales/*.json`
- Language switcher in desktop nav, mobile menu, and footer; selection persisted in localStorage
- Arabic renders full RTL (document.dir switch + RTL-aware icons)
- "Morvan Journal" blog section with 4 complete SEO-friendly articles (Vrindavan heritage, incense vs dhoop buyer guide, cow-dung dhoop education, India sourcing playbook), each fully translated into all 7 languages, with in-app article reader view
- Verified: EN home, AR RTL home, blog cards, article view in EN + HI, all 7 locale JSONs valid, webpack compiles clean
- Journal expanded to 6 articles (added: incense sizes guide, private-label launch playbook), all translated into 7 languages
- Contact details live across contact section + footer (email, WhatsApp with wa.me link, Vrindavan location) with translated labels in all 7 languages
- Per-language SEO: translated title + meta description switch with language; hreflang alternates for all 7 locales and keywords/OG tags added to index.html
- Branded OG/Twitter share image (`/app/frontend/public/og-image.jpg`, 1200×630) wired as absolute og:image + twitter:image
- Enquiry email alerts: backend sends a branded HTML notification to OWNER_NOTIFY_EMAIL via Resend on every POST /api/enquiries (non-blocking, fire-and-forget). ACTIVE ONLY after a real RESEND_API_KEY is added to backend/.env (currently empty placeholder — ask user for a Resend key or Emergent-managed Resend activation)
- WhatsApp number corrected per user confirmation: 7060374484 → +91 70603 74484, wa.me/917060374484
- Hero "Become a Distributor" CTA now opens WhatsApp (wa.me/917060374484) with a prefilled distributor enquiry message translated per language (hero.waDistributor key in all 7 locales)
- Header/nav spacing fixed: widened header container to 88rem, responsive brand sizing, tagline hidden below 2xl, nowrap nav links, compact CTA buttons — verified clean at 1100px/1280px/1920px
- Business Certifications section added after Quality (#certificates): IEC (DGFT), MSME (Udyam), GST Registration, Organic Quality Certificate — dark premium cards with gold accents, translated into all 7 languages; note states scans/registration numbers shared on request (no actual certificate images uploaded yet — user to provide scans for embedding)
- Each of the 8 fragrance cards now shows a context-matched photo (meditation/sandalwood, roses, jasmine bouquet, amber perfume bottles, spices/resins, lavender field, lemons, honey) with the numbered badge overlaid
- Theme refreshed to a brighter organic palette (user request): ivory #FAF7EF, alt #F1EDDF, borders #E6DFC9, deep green surface #33442C, leaf green primary #5F7D53 (hover #4C6642), gold #CDA94E (dark-surface accents #EAD18F), muted #6E7A60, footer #2B3A24
- Buyer auto-reply: branded confirmation email (reference ID, enquiry summary, WhatsApp contact) now sent to the enquirer's business email on every enquiry — also dormant until RESEND_API_KEY is set. Note: Resend free test mode only sends to the account owner's own email; sending to arbitrary buyer emails requires verifying a sending domain in Resend

## Pending / Backlog
- P0: Swap in official contact details (email, phone/WhatsApp, location) once the user provides them
- P1: Multi-currency price estimation for bulk shipments
- P1: Email notification on new enquiry (e.g., Resend)
- P2: Client portal login for existing wholesale partners
- P2: SEO meta tags, sitemap, Open Graph images

## Next Tasks
1. Collect real contact details from user and update Contact section + footer
2. Add enquiry email notifications
3. Add product catalogue PDF download (gated by enquiry)
