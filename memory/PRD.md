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
