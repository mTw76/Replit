# Acro Capital Group — Website

This repository contains the full source code for the **Acro Capital Group** website, built and hosted on Replit.

**Live site:** [acrocapitalgroup.com](https://acrocapitalgroup.com)

---

## Project Structure

```
/
├── artifacts/
│   ├── acro-capital/        # Frontend website (React + Vite)
│   │   ├── src/             # Page components, styles, and app logic
│   │   ├── public/          # Static images and assets
│   │   └── index.html       # HTML entry point
│   │
│   ├── api-server/          # Backend API server (Express)
│   │   └── src/
│   │       └── routes/      # API routes (contact form, newsletter, health check)
│   │
│   └── mockup-sandbox/      # Design prototyping environment (internal use only)
│
├── lib/
│   ├── api-spec/            # OpenAPI specification (API contract definition)
│   ├── api-client-react/    # Auto-generated React Query hooks (from API spec)
│   ├── api-zod/             # Auto-generated Zod validation schemas (from API spec)
│   └── db/                  # PostgreSQL database schema (Drizzle ORM)
│
├── scripts/                 # Utility scripts
└── attached_assets/         # Reference screenshots and uploaded assets
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Express 5, Node.js |
| Database | PostgreSQL + Drizzle ORM |
| Validation | Zod |
| Package manager | pnpm (monorepo workspace) |
| Hosting | Replit |
| Domain | GoDaddy → `acrocapitalgroup.com` |

---

## Key Pages

| Page | Path | Purpose |
|------|------|---------|
| Home | `/` | Overview, hero, and introduction |
| About | `/about` | Firm background and team |
| Strategy | `/strategy` | Investment approach |
| Contact | `/contact` | Inquiry and newsletter signup form |

---

## Notes

- All edits are made inside Replit and republished via the **Republish** button
- The contact form and newsletter are handled by the API server
- Domain DNS is managed through GoDaddy
