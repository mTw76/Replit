# RMT — Research Measurement Technologies Website

A complete website for **RMT (Research Measurement Technologies)**, an Emmy® Award-winning advertising research company founded by Bill Harvey and Bill McKenna. Built and hosted on Replit.

---

## About RMT

RMT helps advertisers maximize ROI by matching ads with high-response audiences and high-response contexts — a proprietary methodology validated by six independent third-party studies showing results up to **+95% ROAS improvement** (Neustar RCT).

---

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, key stats, awards strip, two-pillar overview, proof study teasers |
| `/how-it-works` | How It Works | Deep dive on High-Response Audiences & High-Response Contexts methodology |
| `/results` | Results | All 6 third-party proof studies (Neustar, 605/NCS, ARF/NCS/Turner, Google, ARF Cognition Council, Simmons) |
| `/leadership` | Leadership | Bill Harvey, Bill McKenna (in memoriam), Audrey Steele |
| `/contact` | Contact | Contact form with backend submission handling |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript, Vite, Wouter routing |
| Styling | Tailwind CSS, shadcn/ui component library |
| Forms | react-hook-form + Zod validation |
| Data fetching | TanStack Query |
| Backend | Express.js + TypeScript |
| Font | Inter (Google Fonts) |

---

## Project Structure

```
RMT Website/
├── client/
│   ├── src/
│   │   ├── pages/          # Home, HowItWorks, Results, Leadership, Contact
│   │   ├── components/     # Navbar, Footer, shadcn/ui components
│   │   ├── hooks/          # use-mobile, use-toast
│   │   ├── lib/            # queryClient, utils
│   │   ├── index.css       # Tailwind + CSS variables (dark theme)
│   │   └── App.tsx         # Router + layout wrapper
│   └── index.html
├── server/
│   ├── index.ts            # Express server entry point
│   ├── routes.ts           # API routes (contact form endpoint)
│   ├── static.ts           # Static file serving
│   └── vite.ts             # Vite dev middleware
├── shared/
│   └── schema.ts           # Shared Zod/Drizzle schemas
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

---

## Design

- **Dark premium aesthetic** — deep charcoal background (`#0d1117` range), emerald green accent
- **Bold typography** — oversized ultra-heavy headlines, Inter font
- **Responsive** — mobile hamburger menu, fluid grid layouts
- **Emmy Award** gold highlights throughout

---

## Key Stats (from third-party studies)

| Metric | Result | Source |
|--------|--------|--------|
| ROAS increase | **+95%** | Neustar Random Control Trial |
| Average ROI lift | **+36%** | ARF / NCS |
| Brand recall lift | **+83%** | Google / ARF Cognition Council |
| Studies published | **6** | Multiple independent orgs |

---

*Emmy® is a registered trademark of NATAS / ATAS.*
