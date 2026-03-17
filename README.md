# Bouye — Gambian Wellness Juices

Landing page for [bouye.ca](https://bouye.ca) — Toronto's first and only Gambian juice brand.

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Hero UI** (formerly NextUI) component library
- **Tailwind CSS v4** with custom brand theme
- **Framer Motion** for scroll animations
- **next/image** ready for optimized image handling

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
bouye/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata & JSON-LD
│   ├── page.tsx            # Landing page (all sections)
│   ├── providers.tsx       # HeroUI + theme providers
│   ├── error.tsx           # Error boundary
│   ├── sitemap.ts          # Dynamic sitemap for SEO
│   └── robots.ts           # Robots.txt config
├── components/
│   ├── navbar.tsx           # Sticky navbar with brand + CTAs
│   ├── footer.tsx           # Footer with social links
│   ├── icons.tsx            # SVG icons (Instagram, TikTok, etc.)
│   ├── theme-switch.tsx     # Dark/light mode toggle
│   └── sections/
│       ├── hero-section.tsx       # Hero with product visuals + CTAs
│       ├── products-section.tsx   # Three juice product cards
│       ├── story-section.tsx      # Gambian cultural story
│       ├── health-section.tsx     # Bouye vs Boba comparison table
│       ├── find-us-section.tsx    # Markets, events, order channels
│       └── newsletter-section.tsx # Email signup
├── config/
│   ├── site.ts             # Site config, nav items, social links
│   └── fonts.ts            # Google Fonts (Inter + Playfair Display)
├── styles/
│   └── globals.css         # Tailwind + HeroUI theme + brand colours
├── hero.ts                 # HeroUI theme plugin with brand palette
└── public/                 # Static assets (favicon, OG images, etc.)
```

## Brand Colours

| Colour       | Hex       | Usage                    |
| ------------ | --------- | ------------------------ |
| Wonjo Red    | `#C41E3A` | Hibiscus juice accent    |
| Ginger Gold  | `#D4A017` | Ginger juice accent      |
| Baobab Cream | `#F5F0E8` | Baobab juice / bg accent |
| Forest Green | `#1B4332` | Primary brand colour     |

## Before Launch Checklist

- [ ] Replace placeholder image blocks with real product photos
- [ ] Add actual Uber Eats listing URL in `config/site.ts`
- [ ] Add actual GloriaFood URL in `config/site.ts`
- [ ] Add OG image (`public/og-image.jpg`, 1200x630)
- [ ] Add apple touch icon (`public/apple-touch-icon.png`)
- [ ] Connect newsletter form to email service (Mailchimp, ConvertKit, etc.)
- [ ] Update event dates in `find-us-section.tsx`
- [ ] Add real market/pop-up locations
- [ ] Set up domain (bouye.ca) on Vercel
- [ ] Test on mobile devices

## Setup pnpm (optional)

If you are using `pnpm`, add this to `.npmrc`:

```bash
public-hoist-pattern[]=*@heroui/*
```

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

Or connect the GitHub repo to [vercel.com](https://vercel.com) for automatic deploys on every push.

## License

Licensed under the [MIT license](./LICENSE).
# bouye
