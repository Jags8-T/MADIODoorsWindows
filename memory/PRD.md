# Madio Doors & Windows — Product Requirements Document

## Original Problem Statement
Create static and dynamic versions of a catalogue for Madio Doors & Windows, a white-labelled brand for NHPC Modutech. There should be absolutely no mention of NHPC contacts, branding, or location details. The user requested a WhatsApp enquiry button, realistic images, competitor-inspired UI enhancements (Tostem India, Fenesta), 3 theme toggles (Sleek modern, Clean minimalist, Bold industrial), and an admin tool to generate a Print-ready Brochure (A4 booklet) for architects and customers.

## Core Requirements
- Dynamic web catalogue with 18 products across 4 categories
- Product detail modals with full specs and WhatsApp enquiry
- 3-theme toggling (Sleek Modern charcoal+gold, Clean Minimalist white+navy, Bold Industrial black+orange)
- Admin A4 Print-ready brochure generator (PIN: MADIO24)
- NO NHPC Modutech branding anywhere

## Tech Stack
- Frontend: React (CRA + Craco), Tailwind CSS, Lucide React icons
- Backend: FastAPI, Motor (Async MongoDB)
- Database: MongoDB (18 products seeded on startup)

## What's Been Implemented (All Complete)
1. Home page with hero, features strip, category cards, stats, CTA
2. Catalogue page with 18 products, category filters, search, product cards
3. Product modal with specs, features, WhatsApp enquiry button
4. About page (mission, vision, values)
5. Contact page with form submission (saves to MongoDB)
6. Print catalogue page (/print) with A4 cover and product grid
7. Admin brochure generator (/admin) with PIN auth, 3 brochure themes, cover customization, product selection
8. Brochure preview (/brochure-preview) with A4 page layout and Print/Save PDF button
9. Theme picker FAB with 3 UI themes applied across the entire app
10. Responsive navigation with mobile menu
11. Realistic Unsplash product images
12. No NHPC branding anywhere — all Madio branding

## API Endpoints
- GET /api/products — Returns all products (with optional ?category= filter)
- GET /api/products/{product_id} — Returns single product
- POST /api/contact — Saves contact form submission

## DB Schema
- products: {id, name, subtitle, category, categoryLabel, description, features, specs, image, badge}
- contact_messages: {name, email, phone, message, timestamp}

## Architecture
```
/app/backend/server.py — FastAPI server + MongoDB seeding
/app/frontend/src/App.js — Main router
/app/frontend/src/pages/ — Home, Catalogue, About, Contact, PrintCatalogue, AdminBrochure, BrochurePreview
/app/frontend/src/components/ — Navbar, Footer, ProductCard, ProductModal, ThemePicker
/app/frontend/src/context/ThemeContext.js — Theme provider
/app/frontend/src/data/products.js — Hardcoded fallback product data
/app/frontend/src/index.css — Theme variables + utility classes
```

## Testing Status
- Backend: 100% (13/13 tests pass)
- Frontend: 100% (all features verified)
- Test reports: /app/test_reports/iteration_1.json, /app/test_reports/iteration_2.json

## Future/Backlog Tasks
- Admin panel to manage/edit products without code changes (P1)
- Address format cleanup on Contact page (minor)
