# Nettside-Preview

AI-powered website preview generator that creates professional, responsive website mockups in 30 seconds.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## Features

- 🚀 **Instant Generation** - Professional website mockups in under 30 seconds
- 🎨 **Smart Design** - AI selects templates and colors based on business type
- 🌐 **Multi-language** - Auto-detects input language (Norwegian, English, German, etc.)
- 📱 **Responsive Preview** - Desktop and mobile views
- ⚡ **No Technical Knowledge Required** - Simple form interface

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v3
- Anthropic Claude API (Sonnet 4)

## Getting Started
```bash
npm install --legacy-peer-deps
```

Create `.env.local`:
```
ANTHROPIC_API_KEY=your_key_here
```

Run:
```bash
npm run dev
```

## Project Structure
```
app/
├── api/generate/      # API endpoint
├── page.tsx           # Landing page
components/
├── InputForm.tsx      # User input
├── WebsitePreview.tsx # Preview display
lib/
├── claude.ts          # Claude integration
├── templates.ts       # Design templates
└── prompts.ts         # AI prompts
```

## License

Proprietary © 2026 Fjellstad Teknologi

---

**Developed by [Fjellstad Teknologi](https://fjellstadteknologi.no)**
