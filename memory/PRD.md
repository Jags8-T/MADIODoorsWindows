# Madio Doors & Windows — Product Catalogue

## Problem Statement
Build a static and dynamic digital product catalogue for "Madio Doors & Windows" — a white-labelled premium aluminium doors & windows brand (no NHPC branding, contacts, or location). Source data extracted from NHPC Modutech brochure (24 pages, image-based PDF). Products renamed with completely new names.

## Architecture
- **Frontend**: React 19 + TailwindCSS + Framer Motion + Playfair Display / Manrope fonts
- **Backend**: FastAPI + Motor (async MongoDB)
- **Database**: MongoDB (seeded with 18 products on startup)
- **Deployment**: Kubernetes (frontend port 3000, backend port 8001)

## Brand Identity
- **Name**: Madio Doors & Windows
- **Tagline**: Architectural Precision. Timeless Luxury.
- **Colors**: Dark charcoal (#050505) + Metallic Gold (#D4AF37)
- **Contact**: 1, Plot, Road, Hitex Road, Shilpa Layout, Kondapur, Hyderabad, Telangana 500084 | +91 99486 01899

## Pages & Routes
| Route | Description |
|-------|-------------|
| `/` | Landing/home page with hero, features, categories, stats |
| `/catalogue` | Interactive product catalogue (filterable, searchable) |
| `/about` | About Madio — Mission, Vision, Core Values |
| `/contact` | Contact form + Madio address |
| `/print` | Print-ready PDF catalogue (cover + all products + back cover) |

## What's Been Implemented (March 2026)
- [x] All 18 products seeded in MongoDB with full specs (all new names, no NHPC)
- [x] Backend: GET /api/products (w/ category filter), GET /api/products/{id}, POST /api/contact
- [x] Backend: Auto-syncs product images on every restart from PRODUCT_SEED
- [x] Home page: hero, features strip, category cards, stats, CTA
- [x] Dynamic catalogue: category filter tabs, search bar, 3-col product grid
- [x] Product detail modal: image + specs table + features chips
- [x] **WhatsApp enquiry button** on every product modal → wa.me/919948601899
- [x] **Realistic product images** updated — actual window/door/partition photos
- [x] Print/PDF catalogue: cover page, 2-col product grid per category, back cover
- [x] About page: mission, vision, core values, product range overview
- [x] Contact page: full address, phone, contact form with backend integration
- [x] Navbar + Footer with all navigation
- [x] Dark theme with gold accents — matches Madio brand identity
- [x] All data-testid attributes for testing
- [x] CSS @media print styles for clean PDF output

## Product Catalogue (18 Products)

### Sliding & Folding (7)
| Product | Subtitle |
|---------|----------|
| Madio SlideFold | Panoramic Folding System |
| Madio Vista 32 | Classic 32mm Profile |
| Madio Monoslim | Ultra-Thin Profile Window |
| Madio Breeze 35 | Versatile 35mm Sliding System |
| Madio Zephyr 29 | Compact 29mm Sliding System |
| Madio Phantom | Superslim Precision Profile |
| Madio Titan 40 | Heavy Duty 40mm System |

### Casement Windows (2)
| Product | Subtitle |
|---------|----------|
| Madio Casement 40 | 40mm Casement System |
| Madio Casement 52 | 52mm Premium Casement |

### Glass Partitions (8)
| Product | Subtitle |
|---------|----------|
| Madio Division 82 | 82mm Single Glass Partition |
| Madio Division 82 DG | 82mm Double Glass Partition |
| Madio Division 85 | 85mm Single Glass Partition |
| Madio Division 85 DG | 85mm Double Glass Partition |
| Madio Slimwall 25x50 | 25x50mm Slim Glass Partition |
| Madio Grandwall 100 | 100mm Single Glass Partition |
| Madio Grandwall 100 DG | 100mm Double Glass Partition |
| Madio Ultraslim 16x25 | 16x25mm Slim Glass Partition |

### Hardware (1)
| Product | Subtitle |
|---------|----------|
| Madio Hardware Pro | Premium Hardware Collection |

## P0 Features (Done)
- [x] All 18 products with full specifications
- [x] Dynamic interactive catalogue
- [x] Static print/PDF version
- [x] Product detail modals
- [x] Category filtering + search
- [x] Contact form
- [x] No NHPC branding

## P1 Backlog (Future)
- [ ] Admin panel to add/edit/delete products without code
- [ ] Product image upload (actual product photography)
- [ ] WhatsApp enquiry button
- [ ] Product comparison feature
- [ ] Multi-language support (Telugu, Hindi)
- [ ] SEO optimization (meta tags, sitemap)
- [ ] Quote request form per product

## P2 Backlog
- [ ] 3D product viewer
- [ ] Case studies / project gallery
- [ ] Testimonials section
- [ ] Blog / technical articles
