# RMT — Research Measurement Technologies Website

## Overview

A complete redesign of the RMT (Research Measurement Technologies) website. RMT is an Emmy® Award-winning advertising research company founded by Bill Harvey and Bill McKenna, focused on matching ads with high-response audiences and contexts.

## Pages

- **Home** (`/`) — Hero, stats, awards, two-pillar overview, proof studies teaser, guarantee CTA
- **How It Works** (`/how-it-works`) — Deep dive on High-Response Audiences and High-Response Contexts methodology
- **Results** (`/results`) — All 6 third-party proof studies (Neustar, 605/NCS, ARF/NCS/Turner, Google, ARF Cognition Council, Simmons)
- **Leadership** (`/leadership`) — Bill Harvey, Bill McKenna (in memoriam), Audrey Steele
- **Contact** (`/contact`) — Contact form with backend submission handling

## Stack

- **Frontend**: React + Vite, Wouter routing, TanStack Query, shadcn/ui, Tailwind CSS
- **Backend**: Express.js
- **Forms**: react-hook-form + Zod validation
- **Font**: Plus Jakarta Sans / Inter

## Color Scheme

Deep navy blue primary (`215 80% 28%`) with clean white backgrounds. Professional, authoritative design suited for a premium research firm.

## Key Stats Featured

- +95% increase in ROAS (Neustar, random control trial)
- +36% average ROI lift (ARF/NCS, 15 ads)
- +83% better than lookalikes (Simmons)
- 48% of sales effect attributed to RMT (ARF Cognition Council)

## API Endpoints

- `POST /api/contact` — Accepts contact form submissions (name, email, phone, company, message)

## Architecture

```
client/src/
  components/
    Navbar.tsx       — Fixed top navigation with mobile hamburger
    Footer.tsx       — Dark footer with nav links and contact info
  pages/
    Home.tsx         — Homepage with all sections
    HowItWorks.tsx   — Methodology explainer
    Results.tsx      — 6 proof studies grid
    Leadership.tsx   — Team bios
    Contact.tsx      — Contact form
server/
  routes.ts          — Contact form API endpoint
```
