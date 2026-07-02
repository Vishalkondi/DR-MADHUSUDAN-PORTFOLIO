# Dr. Madhusudan Yemul — Cardiologist Portfolio

A premium, production-ready personal portfolio & clinic website for a senior interventional cardiologist. Built with the latest stack.

## Tech Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (all animations, reveals, magnetic buttons, tilt cards, carousel)
- **lucide-react** (icons)
- AI Health Assistant via an Edge API route (OpenAI **or** Anthropic)

## Features

- Animated hero with ECG line, live availability badge, magnetic CTAs, animated stat counters
- About / Mission / Vision, subspecialty expertise cards (3D tilt), 10 procedures
- Animated professional-journey timeline, awards + research
- Masonry gallery, testimonial carousel, FAQ accordion, blog/insights grid
- **Multi-step appointment booking** (details → date & time slots → review → success)
- **AI Health Assistant** chatbot (real LLM with graceful offline keyword fallback)
- Scroll progress bar, back-to-top, floating WhatsApp
- SEO: dynamic metadata, Open Graph, `Physician` JSON-LD, sitemap, robots
- Fully responsive, respects `prefers-reduced-motion`

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. (Optional) enable the AI assistant
cp .env.example .env.local
#   then add ONE key inside .env.local:
#   OPENAI_API_KEY=sk-...        (or)
#   ANTHROPIC_API_KEY=sk-ant-...
#   Without a key the chatbot still works via its keyword fallback.

# 3. Run the dev server
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel (recommended)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset auto-detects **Next.js** — no config needed.
4. Add your env var (`OPENAI_API_KEY` or `ANTHROPIC_API_KEY`) under **Settings → Environment Variables**.
5. Deploy. Add your custom domain under **Settings → Domains**.

You can also deploy to Netlify, Render, or any Node host that supports Next.js 15.

## Customising Content

**All content lives in [`lib/data.ts`](./lib/data.ts)** — doctor name, contact details,
stats, expertise, procedures, timeline, awards, research, gallery, testimonials, FAQs, blog.
Edit that one file to update the whole site.

> ⚠️ The current phone number, email, address, stats, awards and affiliations are
> **realistic placeholders**. Replace them with real details before going live.
> Also update the domain in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts`.

## Project Structure

```
app/
  layout.tsx          # fonts, SEO metadata, JSON-LD
  page.tsx            # composes all sections
  globals.css         # Tailwind v4 + keyframes + fonts
  api/chat/route.ts   # AI assistant endpoint (OpenAI/Anthropic)
  sitemap.ts, robots.ts
components/
  Nav, Hero, ScrollProgress
  Sections   (Affiliations, About, Expertise, Procedures, Journey, Recognition)
  Sections2  (Gallery, Testimonials, FAQ, Blog)
  Contact    (multi-step booking + map)
  ChatWidget (AI chat + floating controls)
  Footer, Reveal (motion helper)
lib/data.ts           # ← all editable content
public/dr-yemul.png   # doctor photo
```

## Notes on the Gallery / Blog images

They currently point at Unsplash URLs (allowed in `next.config.mjs`). Swap in your own
photos by dropping files into `public/` and updating the `img` paths in `lib/data.ts`.

---

Designed & scaffolded as a faithful port of the original HTML design. Medical disclaimer:
the AI assistant is for general guidance only and never provides diagnosis or treatment.
