# Nexus Electronic – Premium Electronics eCommerce

A world-class premium electronics eCommerce website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

## 🛠 Tech Stack

- **Framework:** Next.js 15 App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Data:** Static JSON (no backend)

## 📦 14 Products Included

| # | Product | Brand | Category | Price |
|---|---------|-------|----------|-------|
| 1 | iPhone 15 Pro Max | Apple | Smartphones | $1,199 |
| 2 | Samsung Galaxy S24 Ultra | Samsung | Smartphones | $1,099 |
| 3 | Apple Watch Ultra 2 | Apple | Smart Watches | $799 |
| 4 | Samsung Galaxy Watch 6 Classic | Samsung | Smart Watches | $349 |
| 5 | Sony WH-1000XM5 Headphones | Sony | Earbuds | $279 |
| 6 | AirPods Pro 2nd Generation | Apple | Earbuds | $249 |
| 7 | MacBook Pro 16" M3 Pro | Apple | Laptops | $2,499 |
| 8 | ASUS ROG Zephyrus G14 | Asus | Laptops | $1,599 |
| 9 | JBL Charge 5 | JBL | Bluetooth Speakers | $149 |
| 10 | Anker PowerCore 26800mAh | Anker | Power Banks | $69 |
| 11 | Logitech MX Keys S | Logitech | Keyboards | $119 |
| 12 | Xiaomi Redmi Note 13 Pro+ | Xiaomi | Smartphones | $449 |
| 13 | iPad Pro 12.9" M2 | Apple | Accessories | $1,099 |
| 14 | Lenovo ThinkPad X1 Carbon Gen 11 | Lenovo | Laptops | $1,699 |

## 📁 Project Structure

```
nexus-electronic/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── shop/page.tsx       # Shop with filters
│   ├── product/[id]/       # Product detail
│   ├── cart/page.tsx       # Shopping cart
│   ├── wishlist/page.tsx   # Wishlist
│   ├── about/page.tsx      # About page
│   └── contact/page.tsx    # Contact page
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Sticky header + nav
│   │   ├── Footer.tsx      # 4-column footer
│   │   └── MobileNav.tsx   # Bottom mobile nav
│   ├── product/
│   │   └── ProductCard.tsx # Reusable product card
│   └── sections/
│       ├── HeroSlider.tsx        # Auto-play hero
│       ├── FeaturedCategories.tsx
│       ├── WhyChooseUs.tsx
│       ├── TestimonialsSection.tsx
│       ├── NewsletterSection.tsx
│       └── BrandShowcase.tsx
├── context/
│   └── StoreContext.tsx    # Cart + Wishlist + Language
├── data/
│   ├── products.json       # 14 products
│   ├── categories.json     # 8 categories
│   ├── brands.json
│   ├── testimonials.json
│   ├── hero-slides.json
│   └── banners.json
└── types/
    └── index.ts            # TypeScript interfaces
```

## ✨ Features

- 🛒 **Cart** – Add/remove items, quantity controls, coupon (NEXUS10)
- ❤️ **Wishlist** – Save and manage favourite products
- 🔍 **Search & Filter** – Real-time search, category/brand/price filters
- 🌐 **Bilingual** – English & Bangla language switcher
- 📱 **Responsive** – Mobile-first with bottom navigation
- 🎨 **Premium UI** – Glassmorphism, smooth transitions, hover effects
- 🏷️ **Product Pages** – Image gallery, specs, related products

## 🎨 Brand Colors

- Primary: `#2563EB` (Blue)
- Dark: `#0F172A`
- Light: `#F8FAFC`

## 📝 Notes

- All data is static JSON – no backend or database required
- Images are served from Unsplash CDN
- Cart and wishlist state is in-memory (resets on page refresh)
- Coupon code: **NEXUS10** for 10% discount
