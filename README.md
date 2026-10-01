# Nettside-Preview

AI-powered website generator that creates professional, responsive websites in under 1 minute. Live production application built with Next.js, Claude AI, and PostgreSQL.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1) ![Railway](https://img.shields.io/badge/Deploy-Railway-0B0D0E)

🔗 **Live Demo:** [sedinside.no](https://sedinside.no)

## Overview

A full-stack web application that generates complete, production-ready HTML websites using AI. Users fill out a simple form (business name, industry, description), and the system generates a professionally designed, responsive website in 45-60 seconds.

## Tech Stack

**Frontend**
- Next.js 14 (App Router, React Server Components)
- TypeScript 5
- Tailwind CSS v3
- React 18

**Backend**
- Next.js API Routes
- Anthropic Claude API (Sonnet 4, 8000 tokens)
- PostgreSQL (Neon serverless database)
- `@neondatabase/serverless` driver

**Infrastructure**
- Railway (hosting, automatic deployments)
- GitHub (version control, CI/CD trigger)
- Domeneshop (DNS management)

## Key Features

✅ **AI-Powered Generation** - Claude Sonnet 4 generates complete HTML/CSS/JS  
✅ **Database Persistence** - Every website stored with unique ID in PostgreSQL  
✅ **Smart Templates** - Industry-specific design templates and color palettes  
✅ **Responsive Design** - Desktop and mobile preview modes  
✅ **Production Ready** - SSL, custom domain, automated deployments  

## Architecture Flow
```
User Input → Form Validation → API Route → Claude AI (8000 tokens)
                                    ↓
                            PostgreSQL (Neon)
                                    ↓
                        Generated Website Preview
                                    ↓
                    GitHub Push → Railway CI/CD → Production
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

## Project Structure
```
app/
├── api/generate/route.ts     # API endpoint (Claude + Database)
├── page.tsx                  # Landing page
components/
├── InputForm.tsx             # Form with validation
└── WebsitePreview.tsx        # Desktop/mobile preview
lib/
├── claude.ts                 # Claude API integration
├── database.ts               # PostgreSQL client
├── templates.ts              # Design templates
└── prompts.ts                # AI prompts
```

## Technical Highlights

- **Full-stack TypeScript** - End-to-end type safety
- **Server-side API** - Secure API key handling, no client exposure
- **Edge-compatible database** - Neon serverless PostgreSQL with connection pooling
- **Dynamic AI prompts** - Industry-specific template selection
- **Error handling** - Comprehensive validation and logging
- **CI/CD pipeline** - Automated GitHub → Railway deployments

## Local Development
```bash
npm install --legacy-peer-deps
```

Create `.env.local`:
```env
ANTHROPIC_API_KEY=your_key_here
DATABASE_URL=postgresql://user:pass@host/db
```

Run:
```bash
npm run dev
```

## Skills Demonstrated

- Full-stack development (Next.js, React, TypeScript)
- Database design & integration (PostgreSQL, SQL)
- AI/LLM API integration (Claude API)
- Cloud infrastructure (Railway, Neon)
- CI/CD automation
- Modern CSS (Tailwind)
- API design (RESTful)
- Version control (Git/GitHub)
