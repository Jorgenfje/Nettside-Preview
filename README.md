# Nettside-Preview

AI-powered website preview generator that creates professional, responsive website mockups in 30 seconds. Live production application with full-stack architecture.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1) ![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7)

🔗 **Live Application:** [sedinside.no](https://sedinside.no)

## Features

- 🚀 **Instant Generation** - Professional website mockups in under 30 seconds
- 🎨 **Smart Design** - AI selects templates and colors based on business type
- 🌐 **Multi-language** - Auto-detects input language (Norwegian, English, German, etc.)
- 📱 **Responsive Preview** - Desktop and mobile views
- 💾 **Database Persistence** - Every generation stored with unique ID in PostgreSQL
- 🔒 **Production Ready** - SSL, CDN, automated deployments
- ⚡ **No Technical Knowledge Required** - Simple form interface

## Tech Stack

**Frontend**
- Next.js 14 (App Router)
- TypeScript 5
- Tailwind CSS v3
- React 18

**Backend & APIs**
- Next.js API Routes
- Anthropic Claude API (Sonnet 4)
- PostgreSQL (Neon serverless)
- Neon Database Serverless SDK

**Infrastructure**
- Netlify (hosting, CDN, SSL)
- GitHub (version control)
- CI/CD pipeline (automatic deployments)

## Getting Started
```bash
npm install --legacy-peer-deps
```

Create `.env.local`:
```
ANTHROPIC_API_KEY=your_key_here
DATABASE_URL=postgresql://user:pass@host/db
```

Run:
```bash
npm run dev
```

## Database Schema
```sql
CREATE TABLE generated_websites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  bedriftsnavn TEXT NOT NULL,
  bransje TEXT NOT NULL,
  beskrivelse TEXT NOT NULL,
  html TEXT NOT NULL,
  short_id TEXT NOT NULL UNIQUE
);

CREATE INDEX idx_short_id ON generated_websites(short_id);
```

## Architecture
```
User Input → Next.js Form → API Route → Claude AI → PostgreSQL → Preview
                                ↓
                        GitHub Push → Netlify CI/CD → Production
```

## Project Structure
```
app/
├── api/
│   └── generate/
│       └── route.ts       # API endpoint (Claude + Database)
├── page.tsx               # Landing page with state management
├── layout.tsx             # Root layout
└── globals.css            # Tailwind configuration
components/
├── InputForm.tsx          # User input with validation
└── WebsitePreview.tsx     # Preview display with desktop/mobile toggle
lib/
├── claude.ts              # Claude API integration
├── database.ts            # PostgreSQL client (Neon)
├── templates.ts           # Design templates & color palettes
└── prompts.ts             # AI prompts for website generation
types/
└── index.ts               # TypeScript interfaces
```

## Key Technical Features

- **Full-stack TypeScript** - Type safety across frontend and backend
- **Server-side rendering** - Next.js App Router with React Server Components
- **AI integration** - Anthropic Claude Sonnet 4 for dynamic HTML generation
- **Database integration** - PostgreSQL with Neon's edge-compatible serverless driver
- **Automated CI/CD** - GitHub to Netlify deployment pipeline
- **Responsive design** - Mobile-first approach with Tailwind CSS
- **Error handling** - Comprehensive validation and error management
- **Security** - Environment variables, server-side API routes, SSL

## Skills Demonstrated

✅ Full-stack web development (Next.js, React, TypeScript)  
✅ Database design & integration (PostgreSQL, SQL)  
✅ AI/LLM API integration (Claude API)  
✅ Cloud infrastructure & deployment (Netlify, Neon)  
✅ CI/CD pipelines (GitHub → Netlify)  
✅ Modern CSS frameworks (Tailwind CSS)  
✅ API design (RESTful endpoints)  
✅ Version control (Git, GitHub)

## License

Proprietary © 2026 Fjellstad Teknologi

---

**Developed by [Fjellstad Teknologi](https://fjellstadteknologi.no)**  
