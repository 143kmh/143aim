This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
.gitignore
AGENTS.md
CLAUDE.md
eslint.config.mjs
next.config.ts
package.json
postcss.config.mjs
prisma.confif.ts
prisma.config.ts
prisma/schema.prisma
public/file.svg
public/globe.svg
public/next.svg
public/vercel.svg
public/window.svg
README.md
src/app/[lang]/auth/useAuthStore.ts
src/app/[lang]/benchmarks/page.tsx
src/app/[lang]/converter/ConverterClient.tsx
src/app/[lang]/converter/page.tsx
src/app/[lang]/converter/useConverterStore.ts
src/app/[lang]/layout.tsx
src/app/[lang]/page.tsx
src/app/[lang]/profile/page.tsx
src/app/[lang]/profile/ProfileClient.tsx
src/app/[lang]/reaction/ChoiceMode.tsx
src/app/[lang]/reaction/CombinedMode.tsx
src/app/[lang]/reaction/FlickMode.tsx
src/app/[lang]/reaction/page.tsx
src/app/[lang]/reaction/ReactionClient.tsx
src/app/[lang]/reaction/ReactionLeaderboard.tsx
src/app/[lang]/reaction/SimpleMode.tsx
src/app/[lang]/reaction/StrafeMode.tsx
src/app/[lang]/reaction/useReactionStore.ts
src/app/[lang]/routines/page.tsx
src/app/[lang]/tournaments/page.tsx
src/app/api/auth/discord/callback/route.ts
src/app/api/auth/discord/route.ts
src/app/api/auth/logout/route.ts
src/app/api/auth/me/route.ts
src/app/api/auth/steam/return/route.ts
src/app/api/auth/steam/route.ts
src/app/api/profile/get-user/route.ts
src/app/api/profile/save-details/route.ts
src/app/api/profile/setup-username/route.ts
src/app/api/profile/verify-ow/confirm/route.ts
src/app/api/profile/verify-ow/initiate/route.ts
src/app/api/profile/verify-riot/confirm/route.ts
src/app/api/profile/verify-riot/initiate/route.ts
src/app/api/profile/verify-riot/route.ts
src/app/api/reaction/leaderboard/route.ts
src/app/api/reaction/save/route.ts
src/app/BackgroundParticles.tsx
src/app/favicon.ico
src/app/globals.css
src/components/ComingSoon.tsx
src/components/Header.tsx
src/dictionaries/en.json
src/dictionaries/getDictionary.ts
src/dictionaries/ru.json
src/lib/prisma.ts
src/proxy.ts
tsconfig.json
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path=".gitignore">
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

/src/generated/prisma
</file>

<file path="AGENTS.md">
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
</file>

<file path="CLAUDE.md">
@AGENTS.md
</file>

<file path="eslint.config.mjs">
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
</file>

<file path="next.config.ts">
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Включаем standalone режим билда для Hetzner VPS
  output: "standalone",
  // Разрешаем загрузку внешних аватарок Steam и иконок рангов
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.steamstatic.com" },
      { protocol: "https", hostname: "media.valorant-api.com" },
      { protocol: "https", hostname: "d15f34w2p8l1cc.cloudfront.net" },
    ],
  },
};

export default nextConfig;
</file>

<file path="package.json">
{
  "name": "143",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@prisma/adapter-pg": "^7.8.0",
    "@prisma/client": "^7.8.0",
    "@supabase/supabase-js": "^2.107.0",
    "lucide-react": "^1.17.0",
    "next": "16.2.7",
    "next-mdx-remote": "^6.0.0",
    "pg": "^8.21.0",
    "pixi.js": "^8.19.0",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.7",
    "prisma": "^7.8.0",
    "tailwind-scrollbar": "^4.0.2",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
</file>

<file path="postcss.config.mjs">
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
</file>

<file path="prisma.confif.ts">
export default {
  schema: "prisma/schema.prisma",
  earlyAccess: true,
  // Эти настройки берут ссылку из вашего .env
  adapter: undefined, 
}
</file>

<file path="prisma.config.ts">
// This file was generated by Prisma, and assumes you have installed the following:
// npm install --save-dev prisma dotenv
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
</file>

<file path="prisma/schema.prisma">
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

// ==========================================
// МОДУЛЬ 0: Пользователи и авторизация
// ==========================================
model User {
  id            String   @id @default(uuid())
  steamId       String   @unique
  username      String   
  
  customName    String?  @unique
  hasCustomName Boolean  @default(false)
  
  avatarUrl     String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Привязка ID других игровых аккаунтов
  discordId     String?  @unique
  
  // Riot Games (Полностью защищенная связь по PUUID)
  riotId        String?  // Никнейм в Valorant (gameName#tagLine)
  riotPuuid     String?  @unique // Уникальный и неизменяемый ID игрока
  
  faceitId      String?  
  owId          String?  
  marvelId      String?  

  riotRank      String?  
  faceitRank    String?  
  owRank        String?  
  marvelRank    String?  

  // Faceit Stats (кэшируем за 43 игры)
  faceitElo     Int?
  faceitKd      Float?   
  faceitWinrate Int?     
  faceitHs      Int?     

  // Valorant Stats (кэшируем за 10 игр)
  riotElo       Int?     // Настоящие 0-100 RR внутри ранга
  riotImage     String?  
  riotKd        Float?   
  riotWinrate   Int?     
  riotHs        Int?     
  
  cheatAttempts  CheatAttempt[]
  reactionScores ReactionScore[]
}

model CheatAttempt {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  ipAddress String
  userAgent String
  module    String
  timestamp DateTime @default(now())
}

// ==========================================
// МОДУЛЬ 2: Тестер Реакции
// ==========================================
model ReactionScore {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  mode      String   
  bestMs    Int      
  updatedAt DateTime @updatedAt

  @@unique([userId, mode])
}
</file>

<file path="public/file.svg">
<svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>
</file>

<file path="public/globe.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
</file>

<file path="public/next.svg">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>
</file>

<file path="public/vercel.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000"><path d="m577.3 0 577.4 1000H0z" fill="#fff"/></svg>
</file>

<file path="public/window.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>
</file>

<file path="README.md">
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
</file>

<file path="src/app/[lang]/auth/useAuthStore.ts">
import { create } from 'zustand';

// Полный защищенный интерфейс пользователя со всеми привязками по ТЗ
interface User {
  id: string;
  steamId: string;
  username: string;
  customName?: string | null;
  hasCustomName: boolean;
  avatarUrl: string;
  
  // Добавляем все игровые поля для TypeScript
  discordId?: string | null;
  riotId?: string | null;
  riotPuuid?: string | null;
  faceitId?: string | null;
  owId?: string | null;
  marvelId?: string | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  checkSession: () => Promise<void>;
  login: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  
  checkSession: async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      set({ user: data.user, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },

  login: () => {
    window.location.href = '/api/auth/steam';
  },
  
  logout: async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    set({ user: null });
  }
}));
</file>

<file path="src/app/[lang]/benchmarks/page.tsx">
// Путь: src/app/[lang]/benchmarks/page.tsx
import ComingSoon from "../../../components/ComingSoon";

export default function BenchmarksPage() {
  return <ComingSoon title="Benchmarks Hub" />;
}
</file>

<file path="src/app/[lang]/converter/ConverterClient.tsx">
"use client";

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useConverterStore, GAMES } from './useConverterStore';
import { Settings2, Info, Copy, Check, ChevronDown, Search, HelpCircle } from 'lucide-react';

// === КОМПОНЕНТ: TOOLTIP (Увеличенный Z-index и размер) ===
const Tooltip = ({ text, children }: { text: React.ReactNode, children: React.ReactNode }) => (
  <div className="group/tooltip relative inline-flex items-center justify-center cursor-help ml-1">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[250px] p-3 bg-[#0d0d14]/95 backdrop-blur-xl border border-imperial/50 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.9)] text-[11px] leading-relaxed text-ivory opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-[999] text-center pointer-events-none">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-imperial/50" />
    </div>
  </div>
);

// === КОМПОНЕНТ: Кастомный Выпадающий Список ===
function CustomSelect({ value, onChange, placeholder }: { value: string, onChange: (id: string) => void, placeholder: string }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = GAMES.find(g => g.id === value);
  const filtered = GAMES.filter(g => g.name.toLowerCase().includes(search.toLowerCase()) || g.id.includes(search.toLowerCase()));

  return (
    <div className="relative w-full" ref={ref}>
      <div 
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full bg-[#0a0a0f] border border-imperial/30 hover:border-imperial/60 hover:shadow-[0_0_15px_rgba(96,81,155,0.2)] text-ivory rounded-lg p-3.5 cursor-pointer transition-all"
      >
        <span className="text-[13px] font-bold w-full text-left">{selected?.name || placeholder}</span>
        <ChevronDown size={16} className={`text-lavender transition-transform duration-300 ${open ? 'rotate-180 text-imperial' : ''}`} />
      </div>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-[#0d0d14]/95 backdrop-blur-2xl border border-imperial/50 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-2 border-b border-white/10 flex items-center gap-2 bg-black/50">
            <Search size={14} className="text-imperial ml-2" />
            <input 
              autoFocus
              type="text" 
              placeholder="Search game..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-ivory text-xs font-bold outline-none w-full placeholder-lavender/50 py-1.5"
            />
          </div>
          <div className="max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-imperial scrollbar-track-transparent">
            {filtered.length > 0 ? filtered.map(g => (
              <div key={g.id} onClick={() => { onChange(g.id); setOpen(false); setSearch(""); }}
                className="px-4 py-3 text-[13px] font-bold text-lavender/80 hover:bg-imperial/30 hover:text-ivory cursor-pointer transition-colors border-b border-white/5 last:border-0"
              >
                {g.name}
              </div>
            )) : <div className="p-4 text-xs font-bold text-lavender/50 text-center">Not found</div>}
          </div>
        </div>
      )}
    </div>
  );
}

// === ОСНОВНОЙ КОМПОНЕНТ ===
export default function ConverterClient({ dict }: { dict: any }) {
  const state = useConverterStore();
  const [copied, setCopied] = useState(false);

  const targetGameKey = state.mainMode === 'cm' ? state.gameCm : state.gameTo;
  const hasAdvanced = ['cs2', 'pubg', 'apex', 'ow2', 'r6s', 'tf', 'fn', 'arena', 'delta'].includes(targetGameKey);

  useEffect(() => {
    if (!hasAdvanced && state.showAdvanced) state.setField('showAdvanced', false);
  }, [targetGameKey, hasAdvanced, state]);

  const getPubgBaseFov = () => state.pubgMode === 'TPP' ? 80 : state.pubgFov;
  const getEffectiveYaw = (gameKey: string, sens: number) => {
    if (gameKey === 'pubg') return (0.002 * Math.pow(10, sens / 50)) * (getPubgBaseFov() / 36);
    if (gameKey === 'r6s') return sens * (state.r6sMult * 0.2864788975);
    if (gameKey === 'delta') return sens * (state.deltaMouseSens || 3) * 0.01;
    const game = GAMES.find(g => g.id === gameKey);
    return game ? sens * game.yaw : 0;
  };
  const convertFromEffectiveYaw = (gameKey: string, effectiveYaw: number) => {
    if (gameKey === 'pubg') {
      const configSens = effectiveYaw / (getPubgBaseFov() / 36);
      return configSens <= 0 ? 0 : 50 * Math.log10(configSens / 0.002);
    }
    if (gameKey === 'r6s') return effectiveYaw / (state.r6sMult * 0.2864788975);
    if (gameKey === 'delta') return effectiveYaw / ((state.deltaMouseSens || 3) * 0.01);
    const game = GAMES.find(g => g.id === gameKey);
    return game ? effectiveYaw / game.yaw : 0;
  };

  const getTfCm = (base: number, fovMult: number | null, isSniper: boolean, zoomMult: number) => {
    if (!state.tfFls) return base / zoomMult;
    const hip_rad = (state.tfFov / 2) * (Math.PI / 180);
    const ads_rad = isSniper ? (25 / 2) * (Math.PI / 180) : ((state.tfFov * (fovMult || 1)) / 2) * (Math.PI / 180);
    const zoom_ratio = Math.tan(hip_rad) / Math.tan(ads_rad);
    return (base * zoom_ratio) / zoomMult;
  };

  const calc = useMemo(() => {
    let resultText = "0.00";
    let actualBaseCm360 = 0;
    let configText = "";
    
    const targetGame = GAMES.find(g => g.id === targetGameKey) || GAMES[0];
    const dpi = state.dpi || 800;

    if (state.mainMode === 'g2g') {
      const sens = parseFloat(state.sensInput);
      if (!isNaN(sens) && sens > 0) {
        const effectiveYaw1 = getEffectiveYaw(state.gameFrom, sens);
        const converted = convertFromEffectiveYaw(state.gameTo, effectiveYaw1);
        
        if (['tf', 'pubg', 'r6s'].includes(state.gameTo)) {
          resultText = Math.round(converted).toString();
          if (state.gameTo === 'pubg') configText = (0.002 * Math.pow(10, converted / 50)).toFixed(6);
          if (state.gameTo === 'r6s') configText = `MultiplierUnit=${((converted * state.r6sMult) / 50).toFixed(6)}`;
          if (state.gameTo === 'tf') configText = (converted / 100).toFixed(6);
          actualBaseCm360 = (360 * 2.54) / (dpi * getEffectiveYaw(state.gameTo, converted));
        } else {
          resultText = converted.toFixed(targetGame.decimals) + (targetGame.suffix || '');
          actualBaseCm360 = (360 * 2.54) / (dpi * getEffectiveYaw(state.gameTo, converted));
        }
      }
    } else {
      const val = parseFloat(state.cmInput);
      if (!isNaN(val) && val > 0 && dpi > 0) {
        if (state.cmMode === 'cm2game') {
          const reqYaw = (360 * 2.54) / (val * dpi);
          const converted = convertFromEffectiveYaw(state.gameCm, reqYaw);
          if (['tf', 'pubg', 'r6s'].includes(state.gameCm)) {
            resultText = Math.round(converted).toString();
            if (state.gameCm === 'pubg') configText = (0.002 * Math.pow(10, converted / 50)).toFixed(6);
            if (state.gameCm === 'r6s') configText = `MultiplierUnit=${((converted * state.r6sMult) / 50).toFixed(6)}`;
            if (state.gameCm === 'tf') configText = (converted / 100).toFixed(6);
            actualBaseCm360 = val;
          } else {
            resultText = converted.toFixed(targetGame.decimals) + (targetGame.suffix || '');
            actualBaseCm360 = val;
          }
        } else {
          actualBaseCm360 = (360 * 2.54) / (dpi * getEffectiveYaw(state.gameCm, val));
          resultText = actualBaseCm360.toFixed(2); 
        }
      }
    }
    return { resultText, actualBaseCm360, configText, targetGameKey };
  }, [state, targetGameKey]);

  const handleCopy = () => {
    navigator.clipboard.writeText(calc.resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 p-4 w-full max-w-[900px] mx-auto min-h-[80vh]">
      
      <style>{`
        input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
        input[type="range"] { -webkit-appearance: none; background: transparent; }
        input[type="range"]::-webkit-slider-runnable-track { width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; height: 14px; width: 14px; border-radius: 50%; background: #c2bbe0; margin-top: -5px; cursor: pointer; transition: background 0.2s; }
        input[type="range"]::-webkit-slider-thumb:hover { background: #A985FF; box-shadow: 0 0 10px rgba(169,133,255,0.5); }
      `}</style>

      {/* === ЛЕВАЯ КАРТОЧКА === */}
      <div 
        onMouseMove={handleMouseMove} 
        className="w-full max-w-[420px] relative p-[1px] rounded-[1.5rem] bg-gradient-to-b from-imperial/40 to-transparent shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex-shrink-0 z-20 mt-8 group/card cursor-default"
      >
        <div className="absolute inset-[1px] bg-[#0b0812]/95 backdrop-blur-2xl rounded-[calc(1.5rem-1px)] overflow-hidden z-0">
          <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" 
               style={{ background: 'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(169,133,255,0.12), transparent 40%)' }} />
        </div>

        <div className="relative z-10 p-6 flex flex-col gap-5 h-full">
          
          <h1 className="text-2xl font-black text-center tracking-[0.15em] bg-clip-text text-transparent bg-gradient-to-br from-white to-imperial drop-shadow-[0_0_10px_rgba(169,133,255,0.4)] uppercase mt-2 mb-2">
            143 AIM CLUB
          </h1>

          <div className="flex bg-black/60 p-1 rounded-xl border border-imperial/20 relative shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
            <button onClick={() => state.setField('mainMode', 'cm')} className={`flex-1 py-3 text-[11px] font-bold tracking-widest z-10 transition-colors uppercase ${state.mainMode === 'cm' ? 'text-ivory' : 'text-lavender/50 hover:text-lavender'}`}>{dict.converter.tab_cm}</button>
            <button onClick={() => state.setField('mainMode', 'g2g')} className={`flex-1 py-3 text-[11px] font-bold tracking-widest z-10 transition-colors uppercase ${state.mainMode === 'g2g' ? 'text-ivory' : 'text-lavender/50 hover:text-lavender'}`}>{dict.converter.tab_g2g}</button>
            <div className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-b from-imperial/60 to-imperial/10 border border-imperial/40 rounded-lg transition-all shadow-[0_0_12px_rgba(169,133,255,0.4)]" style={{ left: state.mainMode === 'cm' ? '4px' : 'calc(50%)' }} />
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-lavender font-bold uppercase tracking-widest ml-1">{state.mainMode === 'g2g' ? dict.converter.from_game : dict.converter.game}</label>
              <CustomSelect value={state.mainMode === 'g2g' ? state.gameFrom : state.gameCm} onChange={(id) => state.setField(state.mainMode === 'g2g' ? 'gameFrom' : 'gameCm', id)} placeholder="Select Game" />
            </div>

            {state.mainMode === 'g2g' ? (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-lavender font-bold uppercase tracking-widest ml-1">{dict.converter.sens}</label>
                <input type="number" step="0.001" value={state.sensInput} onChange={e => state.setField('sensInput', e.target.value)} placeholder="e.g. 1.5" className="w-full bg-[#0a0a0f] border border-imperial/30 text-ivory rounded-lg p-3.5 text-sm font-bold outline-none focus:border-imperial hover:border-imperial/60 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-lavender font-bold uppercase tracking-widest ml-1">{dict.converter.dpi}</label>
                <input type="number" value={state.dpi || ''} onChange={e => state.setField('dpi', Number(e.target.value))} placeholder="e.g. 800" className="w-full bg-[#0a0a0f] border border-imperial/30 text-ivory rounded-lg p-3.5 text-sm font-bold outline-none focus:border-imperial hover:border-imperial/60 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              {state.mainMode === 'g2g' ? (
                <>
                  <label className="text-[10px] text-lavender font-bold uppercase tracking-widest ml-1">{dict.converter.to_game}</label>
                  <CustomSelect value={state.gameTo} onChange={(id) => state.setField('gameTo', id)} placeholder="Select Game" />
                </>
              ) : (
                <>
                  <div className="flex bg-black/60 p-1 rounded-lg border border-imperial/20 relative shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] mb-1">
                    <button onClick={() => state.setField('cmMode', 'cm2game')} className={`flex-1 py-1.5 text-[9px] font-bold z-10 uppercase tracking-widest ${state.cmMode === 'cm2game' ? 'text-ivory' : 'text-lavender/50'}`}>{dict.converter.sub_cm2game}</button>
                    <button onClick={() => state.setField('cmMode', 'game2cm')} className={`flex-1 py-1.5 text-[9px] font-bold z-10 uppercase tracking-widest ${state.cmMode === 'game2cm' ? 'text-ivory' : 'text-lavender/50'}`}>{dict.converter.sub_game2cm}</button>
                    <div className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-b from-imperial/60 to-imperial/10 border border-imperial/40 rounded transition-all shadow-[0_0_10px_rgba(169,133,255,0.4)]" style={{ left: state.cmMode === 'cm2game' ? '4px' : '50%' }} />
                  </div>
                  <label className="text-[10px] text-imperial font-bold uppercase tracking-widest ml-1 mt-1">{state.cmMode === 'cm2game' ? dict.converter.target_cm : dict.converter.sens}</label>
                  <input type="number" step="0.01" value={state.cmInput} onChange={e => state.setField('cmInput', e.target.value)} placeholder={state.cmMode === 'cm2game' ? "e.g. 35" : "e.g. 1.5"} className="w-full bg-[#0a0a0f] border border-imperial/30 text-ivory rounded-lg p-3.5 text-sm font-bold outline-none focus:border-imperial hover:border-imperial/60 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
                </>
              )}
            </div>

            {hasAdvanced && (
              <button onClick={() => state.setField('showAdvanced', !state.showAdvanced)} 
                      className={`mt-2 flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.15em] transition-all border p-2.5 rounded-lg ${state.showAdvanced ? 'bg-imperial/20 text-ivory border-imperial/50 shadow-[0_0_10px_rgba(96,81,155,0.2)]' : 'bg-transparent text-lavender border-imperial/20 hover:border-imperial/50 hover:bg-imperial/10 hover:text-ivory'}`}>
                <Settings2 size={14} /> {state.showAdvanced ? 'HIDE ADVANCED SETTINGS' : 'SHOW ADVANCED SETTINGS'}
              </button>
            )}

            <div className="mt-2 p-6 bg-gradient-to-b from-imperial/10 to-black/80 rounded-xl border border-imperial/40 shadow-[inset_0_0_20px_rgba(137,102,245,0.1)] flex flex-col items-center justify-center relative group/btn">
              <span className="text-[10px] font-bold text-lavender/70 uppercase tracking-[0.2em] mb-2">{dict.converter.result}</span>
              <div className="text-4xl font-black text-ivory drop-shadow-[0_0_20px_rgba(169,133,255,0.8)] tracking-wide">
                {calc.resultText}
                {(state.mainMode === 'cm' && state.cmMode === 'game2cm') && <span className="text-lg text-lavender/50 ml-1">cm</span>}
              </div>
              <button onClick={handleCopy} className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-imperial/20 border border-white/10 hover:border-imperial/50 rounded-lg transition-all cursor-pointer opacity-0 group-hover/btn:opacity-100">
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-imperial" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* === ПРАВАЯ КАРТОЧКА (АДВАНСЕД) === */}
      {state.showAdvanced && hasAdvanced && (
        <div 
          onMouseMove={handleMouseMove} 
          className="w-full max-w-[420px] relative p-[1px] rounded-[1.5rem] bg-gradient-to-b from-imperial/30 to-transparent shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-in lg:slide-in-from-left-8 slide-in-from-top-8 fade-in duration-300 z-30 lg:mt-8 group/card cursor-default"
        >
          <div className="absolute inset-[1px] bg-[#0b0812]/95 backdrop-blur-2xl rounded-[calc(1.5rem-1px)] overflow-hidden z-0">
            <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" 
                 style={{ background: 'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(169,133,255,0.12), transparent 40%)' }} />
          </div>

          <div className="relative z-10 p-6 flex flex-col gap-5 h-full">
            <h2 className="text-xs font-black text-imperial tracking-[0.2em] uppercase border-b border-imperial/20 pb-3 mb-2 flex items-center gap-2">
              <Settings2 size={16} /> Advanced Settings
            </h2>

            {/* OVERWATCH 2 */}
            {calc.targetGameKey === 'ow2' && (
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(state.ow2Heroes).map(hero => (
                  <div key={hero} className="flex flex-col bg-black/40 p-3 rounded-lg border border-imperial/20 gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-lavender uppercase">{hero === 'ana' ? 'ANA/WIDOW' : hero}</span>
                      <Tooltip text={<>Optimal tracking feel (1:1 MDH 0%):<br/><span className="text-imperial font-bold text-[12px]">{hero==='ana'?'37.89%':hero==='ashe'?'51.47%':hero==='freja'?'62.22%':'54.99%'}</span></>}>
                        <HelpCircle size={16} className="text-imperial/70 hover:text-imperial transition-colors" />
                      </Tooltip>
                    </div>
                    <div className="flex items-center justify-between bg-black/50 border border-imperial/30 rounded px-2 py-1">
                      <input type="number" step="0.01" value={state.ow2Heroes[hero]} onChange={e => state.setScope('ow2Heroes', hero, parseFloat(e.target.value) || 100)} className="w-full bg-transparent text-center text-ivory text-[12px] font-bold outline-none focus:border-imperial" />
                      <span className="text-[10px] text-lavender">%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* THE FINALS */}
            {calc.targetGameKey === 'tf' && (
              <div className="flex flex-col gap-4">
                <div className="bg-black/40 p-3 rounded-lg border border-imperial/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-lavender tracking-widest uppercase">Focal Length Scaling</span>
                      <Tooltip text={<><span className="text-imperial font-bold">ON:</span> Matches physical movement with visual FOV.<br/><span className="text-imperial font-bold">OFF:</span> Uses flat multipliers.</>}><HelpCircle size={16} className="text-imperial/70 hover:text-imperial transition-colors" /></Tooltip>
                    </div>
                    <input type="checkbox" checked={state.tfFls} onChange={e => state.setField('tfFls', e.target.checked)} className="w-4 h-4 accent-imperial cursor-pointer" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-lavender uppercase tracking-widest">Hipfire FOV</span>
                      <Tooltip text={<>The Finals uses Vertical FOV. Pro players use 85 to 100.</>}><HelpCircle size={16} className="text-imperial/70 hover:text-imperial transition-colors" /></Tooltip>
                    </div>
                    <input type="range" min="45" max="100" value={state.tfFov} onChange={e => state.setField('tfFov', parseInt(e.target.value))} className="w-full ml-2" />
                    <span className="text-[11px] font-bold text-ivory w-6 text-right">{state.tfFov}</span>
                  </div>

                  <div className="flex flex-col gap-1 mb-3">
                    <div className="flex justify-between"><span className="text-[9px] font-bold text-lavender uppercase">Mouse Zoom Sens Mult</span><span className="text-[10px] font-bold text-imperial">{state.tfZoom}%</span></div>
                    <input type="range" min="1" max="100" value={state.tfZoom} onChange={e => state.setField('tfZoom', parseInt(e.target.value))} className="w-full" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between"><span className="text-[9px] font-bold text-lavender uppercase">Scoped Zoom Sens Mult</span><span className="text-[10px] font-bold text-imperial">{state.tfScopedZoom}%</span></div>
                    <input type="range" min="1" max="200" value={state.tfScopedZoom} onChange={e => state.setField('tfScopedZoom', parseInt(e.target.value))} className="w-full" />
                  </div>
                </div>
              </div>
            )}

            {/* CS2 */}
            {calc.targetGameKey === 'cs2' && (
              <div className="flex flex-col gap-5">
                <div className="bg-black/40 p-3 rounded-lg border border-imperial/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-lavender tracking-widest uppercase">I use stretched res</span>
                    <input type="checkbox" checked={state.cs2Stretched} onChange={e => state.setField('cs2Stretched', e.target.checked)} className="w-4 h-4 accent-imperial cursor-pointer" />
                  </div>
                  {state.cs2Stretched && (
                    <div className="flex gap-1.5">
                      {['43', '54', '1610'].map(res => (
                        <button key={res} onClick={() => state.setField('cs2Res', res)} className={`flex-1 py-1.5 text-[10px] font-bold rounded border transition-all ${state.cs2Res === res ? 'bg-imperial/40 border-imperial text-ivory shadow-[0_0_10px_rgba(169,133,255,0.3)]' : 'bg-black/60 border-white/5 text-lavender'}`}>{res === '43' ? '4:3' : res === '54' ? '5:4' : '16:10'}</button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-black/40 p-4 rounded-lg border border-imperial/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-lavender tracking-widest uppercase">Zoom Sens Multiplier</span>
                      <Tooltip text={<>For a 1:1 feel (MDH 0%), use <span className="text-imperial font-bold">0.82</span>.</>}><HelpCircle size={16} className="text-imperial/70 hover:text-imperial transition-colors" /></Tooltip>
                    </div>
                    <input type="number" step="0.01" value={state.cs2Zoom} onChange={e => state.setField('cs2Zoom', parseFloat(e.target.value) || 1)} className="w-16 bg-black/80 border border-imperial/30 rounded p-1 text-center text-ivory text-[11px] font-bold outline-none focus:border-imperial" />
                  </div>
                  <input type="range" min="0.01" max="3.00" step="0.01" value={state.cs2Zoom} onChange={e => state.setField('cs2Zoom', parseFloat(e.target.value))} className="w-full" />
                </div>
              </div>
            )}

            {/* PUBG */}
            {calc.targetGameKey === 'pubg' && (
              <div className="flex flex-col gap-4">
                <div className="flex gap-1.5">
                  {['FPP', 'TPP'].map(m => (
                    <button key={m} onClick={() => state.setField('pubgMode', m)} className={`flex-1 py-2 text-[10px] font-bold rounded-lg border ${state.pubgMode === m ? 'bg-imperial/40 border-imperial text-ivory' : 'bg-black/40 border-white/5 text-lavender'}`}>{m}</button>
                  ))}
                </div>
                {state.pubgMode === 'FPP' && (
                  <div className="bg-black/40 p-3 rounded-lg border border-imperial/20 flex items-center gap-3">
                    <span className="text-[10px] font-bold text-lavender tracking-widest flex-1 uppercase">Hipfire FOV</span>
                    <input type="range" min="80" max="103" value={state.pubgFov} onChange={e => state.setField('pubgFov', parseInt(e.target.value))} className="flex-2" />
                    <span className="text-[11px] font-bold text-ivory w-6 text-right">{state.pubgFov}</span>
                  </div>
                )}
                <div className="bg-black/40 p-3 rounded-lg border border-imperial/20 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-lavender tracking-widest uppercase">Vertical Sens Mult</span>
                  <input type="number" step="0.01" value={state.pubgVert} onChange={e => state.setField('pubgVert', parseFloat(e.target.value) || 1)} className="w-14 bg-black/80 border border-imperial/30 rounded p-1.5 text-center text-ivory text-[11px] font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {Object.keys(state.pubgScopes).map(scope => (
                    <div key={scope} className="flex flex-col bg-black/20 p-2 rounded border border-white/5">
                      <div className="flex justify-between mb-1.5"><span className="text-[9px] font-bold text-lavender uppercase">{scope}</span><span className="text-[10px] text-imperial font-bold">{state.pubgScopes[scope]}</span></div>
                      <input type="range" min="0" max="100" value={state.pubgScopes[scope]} onChange={e => state.setScope('pubgScopes', scope, parseInt(e.target.value))} className="w-full" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* APEX */}
            {calc.targetGameKey === 'apex' && (
              <div className="flex flex-col gap-4">
                <div className="bg-black/40 p-3 rounded-lg border border-imperial/20 flex items-center gap-3">
                  <div className="flex items-center gap-1.5 flex-1">
                    <span className="text-[10px] font-bold text-lavender uppercase tracking-widest">In-Game FOV</span>
                  </div>
                  <input type="range" min="70" max="110" value={state.apexFov} onChange={e => state.setField('apexFov', parseInt(e.target.value))} className="flex-2" />
                  <span className="text-[11px] font-bold text-ivory w-6 text-right">{state.apexFov}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {Object.keys(state.apexScopes).map(scope => (
                    <div key={scope} className="flex flex-col bg-black/20 p-2 rounded border border-white/5">
                      <div className="flex justify-between mb-1.5"><span className="text-[9px] font-bold text-lavender uppercase">{scope}</span><span className="text-[10px] text-imperial font-bold">{state.apexScopes[scope].toFixed(1)}</span></div>
                      <input type="range" min="0.1" max="10.0" step="0.1" value={state.apexScopes[scope]} onChange={e => state.setScope('apexScopes', scope, parseFloat(e.target.value))} className="w-full" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* === ИТОГИ ПО СКОУПАМ (SCOPED DISTANCES) === */}
            {calc.actualBaseCm360 > 0 && (
              <div className="mt-auto pt-4 border-t border-imperial/20">
                {calc.configText && (
                  <div className="mb-4 bg-imperial/10 border border-imperial/30 p-2 rounded flex flex-col items-center justify-center">
                    <span className="text-[9px] font-bold text-lavender uppercase mb-0.5">{dict.converter.config}</span>
                    <span className="text-[11px] font-bold text-imperial tracking-wider">{calc.configText}</span>
                  </div>
                )}

                {calc.targetGameKey === 'cs2' && state.cs2Stretched && (
                  <div className="mb-4 bg-orange-500/10 border border-orange-500/30 p-2 rounded flex flex-col items-center justify-center">
                    <span className="text-[9px] font-bold text-orange-400/70 uppercase mb-0.5">{dict.converter.feels_like}</span>
                    <span className="text-[12px] font-bold text-orange-400 tracking-wider">
                      {(calc.actualBaseCm360 / (state.cs2Res === '43' ? 1.3333 : state.cs2Res === '54' ? 1.4222 : 1.1111)).toFixed(2)} CM/360
                    </span>
                  </div>
                )}

                <p className="text-[10px] text-lavender/70 font-bold tracking-[0.1em] mb-2 uppercase text-center">Scoped Distances (1:1 Tracking)</p>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                    <span className="text-[9px] text-lavender font-bold uppercase">Base Hipfire</span>
                    <span className="text-[11px] font-black text-ivory">{calc.actualBaseCm360.toFixed(1)} cm</span>
                  </div>
                  
                  {calc.targetGameKey === 'tf' && (
                    <>
                      <div className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center"><span className="text-[9px] text-lavender font-bold uppercase">Iron/Red Dot</span><span className="text-[11px] font-black text-ivory">{getTfCm(calc.actualBaseCm360, 0.78, false, state.tfZoom/100).toFixed(1)} cm</span></div>
                      <div className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center"><span className="text-[9px] text-lavender font-bold uppercase">Magnifex</span><span className="text-[11px] font-black text-ivory">{getTfCm(calc.actualBaseCm360, 0.68, false, state.tfZoom/100).toFixed(1)} cm</span></div>
                      <div className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center"><span className="text-[9px] text-lavender font-bold uppercase">SR-84 Sniper</span><span className="text-[11px] font-black text-ivory">{getTfCm(calc.actualBaseCm360, null, true, state.tfScopedZoom/100).toFixed(1)} cm</span></div>
                    </>
                  )}

                  {calc.targetGameKey === 'cs2' && (
                    <>
                      <div className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center"><span className="text-[9px] text-lavender font-bold uppercase">AUG / SG</span><span className="text-[11px] font-black text-ivory">{((calc.actualBaseCm360 * 2) / state.cs2Zoom).toFixed(1)} cm</span></div>
                      <div className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center"><span className="text-[9px] text-lavender font-bold uppercase">AWP 1X</span><span className="text-[11px] font-black text-ivory">{((calc.actualBaseCm360 * 2.25) / state.cs2Zoom).toFixed(1)} cm</span></div>
                      <div className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center"><span className="text-[9px] text-lavender font-bold uppercase">AWP 2X</span><span className="text-[11px] font-black text-ivory">{((calc.actualBaseCm360 * 9) / state.cs2Zoom).toFixed(1)} cm</span></div>
                    </>
                  )}

                  {calc.targetGameKey === 'ow2' && Object.keys(state.ow2Heroes).map(hero => (
                     <div key={hero} className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center">
                       <span className="text-[9px] text-lavender font-bold uppercase">{hero === 'ana' ? 'ANA/WIDOW' : hero}</span>
                       <span className="text-[11px] font-black text-ivory">{(calc.actualBaseCm360 / (state.ow2Heroes[hero] / 100)).toFixed(1)} cm</span>
                     </div>
                  ))}

                  {calc.targetGameKey === 'pubg' && (
                    <>
                      <div className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center"><span className="text-[9px] text-lavender font-bold uppercase">Vertical</span><span className="text-[11px] font-black text-ivory">{(calc.actualBaseCm360 / state.pubgVert).toFixed(1)} cm</span></div>
                      {Object.keys(state.pubgScopes).slice(0, 5).map(s => {
                        const yaw = (0.002 * Math.pow(10, state.pubgScopes[s] / 50)) * ({'aim':getPubgBaseFov(), '1x':70, '2x':40, '3x':26.66, '4x':19.04, '6x':13.33, '8x':10, '15x':6.66}[s] as number / 36);
                        return <div key={s} className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center"><span className="text-[9px] text-lavender font-bold uppercase">{s}</span><span className="text-[11px] font-black text-ivory">{((360 * 2.54) / ((state.dpi || 800) * yaw)).toFixed(1)} cm</span></div>
                      })}
                    </>
                  )}

                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
</file>

<file path="src/app/[lang]/converter/page.tsx">
import { getDictionary } from "@/dictionaries/getDictionary";
import ConverterClient from "./ConverterClient";

type Props = {
  params: Promise<{ lang: 'en' | 'ru' }>;
};

export default async function ConverterPage({ params }: Props) {
  // Сервер загружает словарь один раз до рендера
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Передаем готовый словарь в наш умный клиентский компонент
  return <ConverterClient dict={dict} />;
}
</file>

<file path="src/app/[lang]/converter/useConverterStore.ts">
import { create } from 'zustand';

export type Game = {
  id: string;
  name: string;
  yaw: number;
  decimals: number;
  suffix?: string;
};

// Полная база данных игр (включая Deadlock)
export const GAMES: Game[] = [
  { id: 'cs2', name: 'Counter-Strike 2', yaw: 0.022, decimals: 2 },
  { id: 'val', name: 'Valorant', yaw: 0.07, decimals: 3 },
  { id: 'deadlock', name: 'Deadlock', yaw: 0.022, decimals: 3 },
  { id: 'ow2', name: 'Overwatch 2', yaw: 0.0066, decimals: 2 },
  { id: 'apex', name: 'Apex Legends', yaw: 0.022, decimals: 2 },
  { id: 'arc', name: 'ARC Raiders', yaw: 0.001360975, decimals: 2 },
  { id: 'arena', name: 'Arena Breakout: Inf.', yaw: 0.10237395, decimals: 2 },
  { id: 'cod', name: 'Call of Duty', yaw: 0.0066, decimals: 2 },
  { id: 'delta', name: 'Delta Force', yaw: 0.01, decimals: 2 },
  { id: 'fn', name: 'Fortnite', yaw: 0.005555, decimals: 1, suffix: '%' },
  { id: 'mr', name: 'Marvel Rivals', yaw: 0.0175, decimals: 2 },
  { id: 'pubg', name: 'PUBG: BATTLEGROUNDS', yaw: 1, decimals: 1 },
  { id: 'source', name: 'Quake / Source', yaw: 0.022, decimals: 2 },
  { id: 'r6s', name: 'Rainbow Six Siege', yaw: 0.00572957795, decimals: 0 },
  { id: 'rust', name: 'Rust', yaw: 0.111111, decimals: 3 },
  { id: 'tf', name: 'The Finals', yaw: 0.001, decimals: 0 },
].sort((a, b) => a.name.localeCompare(b.name));

interface ConverterState {
  // Базовые настройки
  mainMode: 'cm' | 'g2g';
  cmMode: 'cm2game' | 'game2cm';
  gameFrom: string;
  gameTo: string;
  gameCm: string;
  dpi: number;
  sensInput: string;
  cmInput: string;

  // Продвинутые настройки (Advanced)
  showAdvanced: boolean;
  
  // CS2
  cs2Stretched: boolean;
  cs2Res: '43' | '54' | '1610';
  cs2Zoom: number;

  // PUBG
  pubgMode: 'FPP' | 'TPP';
  pubgFov: number;
  pubgVert: number;
  pubgScopes: Record<string, number>;

  // Apex
  apexFov: number;
  apexScopes: Record<string, number>;

  // OW2
  ow2Heroes: Record<string, number>;

  // The Finals
  tfFls: boolean;
  tfFov: number;
  tfZoom: number;
  tfScopedZoom: number;

  // R6S, FN, Delta, Arena
  r6sMult: number;
  fnAds: number;
  fnScoped: number;
  deltaMouseSens: number;
  deltaScopes: Record<string, number>;
  arenaScopes: Record<string, number>;

  // Экшены (Actions)
  setField: (field: keyof ConverterState, value: any) => void;
  setScope: (game: 'pubgScopes' | 'apexScopes' | 'ow2Heroes' | 'deltaScopes' | 'arenaScopes', key: string, value: number) => void;
}

export const useConverterStore = create<ConverterState>((set) => ({
  mainMode: 'cm',
  cmMode: 'cm2game',
  gameFrom: 'cs2',
  gameTo: 'val',
  gameCm: 'cs2',
  dpi: 800,
  sensInput: '1.5',
  cmInput: '35',

  showAdvanced: false,

  cs2Stretched: false,
  cs2Res: '43',
  cs2Zoom: 1.0,

  pubgMode: 'FPP',
  pubgFov: 90,
  pubgVert: 1.0,
  pubgScopes: { aim: 50, '1x': 50, '2x': 50, '3x': 50, '4x': 50, '6x': 50, '8x': 50, '15x': 50 },

  apexFov: 110,
  apexScopes: { '1x': 1.0, '2x': 1.0, '3x': 1.0, '4x': 1.0, '6x': 1.0, '8x': 1.0, '10x': 1.0 },

  ow2Heroes: { ana: 100, ashe: 100, freja: 100, emre: 100 },

  tfFls: true,
  tfFov: 71,
  tfZoom: 100,
  tfScopedZoom: 100,

  r6sMult: 0.02,
  fnAds: 100,
  fnScoped: 100,
  deltaMouseSens: 3,
  deltaScopes: { '1x': 50, '2x': 50, '5x': 50, '8x': 50 },
  arenaScopes: { '1x': 1.0, '2x': 1.0, '3x': 1.0, '4x': 1.0, '6x': 1.0, '8x': 1.0, '16x': 1.0, '20x': 1.0 },

  setField: (field, value) => set({ [field]: value }),
  setScope: (game, key, value) => set((state) => ({ [game]: { ...state[game], [key]: value } })),
}));
</file>

<file path="src/app/[lang]/layout.tsx">
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import BackgroundParticles from "../BackgroundParticles";
import Header from "@/components/Header";
import { getDictionary } from "@/dictionaries/getDictionary";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "143 Aim Club",
  description: "Ultimate platform for Aimbeast players and esports athletes",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: 'ru' | 'en' }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className={`${inter.className} min-h-screen bg-night text-ivory antialiased selection:bg-imperial/40 selection:text-white`}>
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-imperial/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-imperial/5 blur-[100px] rounded-full" />
        </div>

        <BackgroundParticles />
        
        {/* Наша новая глобальная шапка */}
        <Header dict={dict} lang={lang} />

        <main className="relative z-10 w-full max-w-[1920px] mx-auto min-h-[calc(100vh-64px)] flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
</file>

<file path="src/app/[lang]/page.tsx">
import Link from "next/link";
import { getDictionary } from "@/dictionaries/getDictionary";
import { Crosshair, Zap, ChevronRight, Lock } from "lucide-react";

type Props = {
  params: Promise<{ lang: 'en' | 'ru' }>;
};

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4 py-20 min-h-[80vh]">
      
      {/* HEADER ТЕКСТ */}
      <div className="text-center mb-16 animate-in slide-in-from-bottom-4 fade-in duration-700">
        <h1 className="text-4xl md:text-6xl font-black tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-b from-white to-imperial drop-shadow-[0_0_20px_rgba(169,133,255,0.4)] uppercase mb-4">
          {dict.home.title}
        </h1>
        <p className="text-lavender uppercase tracking-widest text-sm md:text-base font-bold">
          {dict.home.subtitle}
        </p>
      </div>

      {/* СЕТКА МОДУЛЕЙ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        
        {/* КАРТОЧКА: CONVERTER */}
        <Link href={`/${lang}/converter`} className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-imperial/40 to-transparent hover:from-imperial hover:shadow-[0_0_30px_rgba(169,133,255,0.3)] transition-all duration-500 overflow-hidden block">
          <div className="absolute top-0 right-0 w-32 h-32 bg-imperial/20 blur-[50px] group-hover:bg-imperial/40 transition-all pointer-events-none" />
          <div className="bg-[#0b0812]/95 backdrop-blur-xl rounded-[calc(1rem-1px)] p-8 h-full flex flex-col items-start gap-4">
            <div className="p-4 bg-imperial/10 rounded-xl border border-imperial/30 text-imperial group-hover:scale-110 transition-transform duration-500">
              <Crosshair size={32} />
            </div>
            <div>
              <h2 className="text-xl font-black text-ivory tracking-widest uppercase mb-2">{dict.home.mod_converter_title}</h2>
              <p className="text-sm font-medium text-lavender/70">{dict.home.mod_converter_desc}</p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold text-imperial uppercase tracking-widest group-hover:translate-x-2 transition-transform">
              ENTER MODULE <ChevronRight size={14} />
            </div>
          </div>
        </Link>

        {/* КАРТОЧКА: REACTION TESTER (Будущий модуль 2) */}
        <Link href={`/${lang}/reaction`} className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-imperial/40 to-transparent hover:from-imperial hover:shadow-[0_0_30px_rgba(169,133,255,0.3)] transition-all duration-500 overflow-hidden block">
          <div className="absolute top-0 left-0 w-32 h-32 bg-imperial/20 blur-[50px] group-hover:bg-imperial/40 transition-all pointer-events-none" />
          <div className="bg-[#0b0812]/95 backdrop-blur-xl rounded-[calc(1rem-1px)] p-8 h-full flex flex-col items-start gap-4 relative">
            <div className="p-4 bg-imperial/10 rounded-xl border border-imperial/30 text-imperial group-hover:scale-110 transition-transform duration-500">
              <Zap size={32} />
            </div>
            <div>
              <h2 className="text-xl font-black text-ivory tracking-widest uppercase mb-2">{dict.home.mod_reaction_title}</h2>
              <p className="text-sm font-medium text-lavender/70">{dict.home.mod_reaction_desc}</p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold text-imperial uppercase tracking-widest group-hover:translate-x-2 transition-transform">
              ENTER MODULE <ChevronRight size={14} />
            </div>
          </div>
        </Link>

        {/* КАРТОЧКА: BENCHMARKS (Заглушка) */}
        <div className="md:col-span-2 relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-60">
          <div className="bg-[#0b0812]/95 backdrop-blur-xl rounded-[calc(1rem-1px)] p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-lavender/50">
                <Lock size={32} />
              </div>
              <div>
                <h2 className="text-xl font-black text-ivory/50 tracking-widest uppercase mb-1">Aimbeast Benchmarks</h2>
                <p className="text-sm font-medium text-lavender/40">Global leaderboard & tier progression</p>
              </div>
            </div>
            <div className="px-4 py-2 border border-white/10 rounded-lg text-xs font-bold text-lavender/50 tracking-widest uppercase">
              {dict.home.coming_soon}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
</file>

<file path="src/app/[lang]/profile/page.tsx">
// Путь: src/app/[lang]/profile/page.tsx
import { getDictionary } from "@/dictionaries/getDictionary";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage({ params }: { params: Promise<{ lang: 'en' | 'ru' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ProfileClient dict={dict} />;
}
</file>

<file path="src/app/[lang]/profile/ProfileClient.tsx">
"use client";

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../auth/useAuthStore';
import { User, LogIn, Save, Loader2, Link as LinkIcon, Trophy, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ProfileClient({ dict }: { dict: any }) {
  const { user, isLoading: isAuthLoading, login, checkSession } = useAuthStore();
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSaved] = useState(false);

  // Стейты ввода
  const [marvelId, setMarvelId] = useState('');

  // Двухэтапная верификация Valorant
  const [showRiotModal, setShowRiotModal] = useState(false);
  const [inputRiotId, setInputRiotId] = useState('');
  const [riotError, setRiotError] = useState('');
  const [riotStep, setRiotStep] = useState<'init' | 'handshake'>('init');
  const [riotVerifying, setRiotVerifying] = useState(false);
  const [verifyMeta, setVerifyData] = useState<{ originalCardId: string, riotId: string } | null>(null);

  // Двухэтапная верификация Overwatch 2 (НОВОЕ ИСПРАВЛЕННОЕ!)
  const [showOwModal, setShowOwModal] = useState(false);
  const [inputOwId, setInputOwId] = useState('');
  const [owError, setOwError] = useState('');
  const [owStep, setOwStep] = useState<'init' | 'handshake'>('init');
  const [owVerifying, setOwVerifying] = useState(false);
  const [verifyOwMeta, setVerifyOwData] = useState<{ originalAvatar: string, owId: string } | null>(null);

  const fetchFullProfile = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/profile/get-user');
      const data = await res.json();
      if (data.user) {
        setProfileData(data.user);
        setMarvelId(data.user.marvelId || '');
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFullProfile();
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSaved(false);

    try {
      const res = await fetch('/api/profile/save-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ marvelId })
      });
      const data = await res.json();
      if (data.success) {
        setSavedSaved(true);
        fetchFullProfile();
        checkSession();
        setTimeout(() => setSavedSaved(false), 3000);
      }
    } catch (e) {
      console.error(e);
    }
    setIsSaving(false);
  };

  // ВЕРИФИКАЦИЯ RIOT (ANY-TO-ANY)
  const handleInitiateRiot = async (e: React.FormEvent) => {
    e.preventDefault();
    setRiotVerifying(true);
    setRiotError('');

    try {
      const res = await fetch('/api/profile/verify-riot/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ riotId: inputRiotId })
      });
      const data = await res.json();

      if (data.success) {
        setVerifyData({
          originalCardId: data.originalCardId,
          riotId: data.riotId
        });
        setRiotStep('handshake');
      } else {
        setRiotError(data.error || 'Ошибка инициализации');
      }
    } catch (e) {
      setRiotError('Системная ошибка. Попробуйте еще раз.');
    }
    setRiotVerifying(false);
  };

  const handleConfirmRiot = async () => {
    if (!verifyMeta) return;
    setRiotVerifying(true);
    setRiotError('');

    try {
      const res = await fetch('/api/profile/verify-riot/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          riotId: verifyMeta.riotId,
          originalCardId: verifyMeta.originalCardId
        })
      });
      const data = await res.json();

      if (data.success) {
        setShowRiotModal(false);
        setRiotStep('init');
        setVerifyData(null);
        fetchFullProfile();
        checkSession();
      } else {
        setRiotError(data.error || 'Ошибка верификации');
      }
    } catch (e) {
      setRiotError('Системная ошибка подтверждения.');
    }
    setRiotVerifying(false);
  };

  // ВЕРИФИКАЦИЯ OVERWATCH 2 (ANY-TO-ANY)
  const handleInitiateOw = async (e: React.FormEvent) => {
    e.preventDefault();
    setOwVerifying(true);
    setOwError('');

    try {
      const res = await fetch('/api/profile/verify-ow/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ owId: inputOwId })
      });
      const data = await res.json();

      if (data.success) {
        setVerifyOwData({
          originalAvatar: data.originalAvatar,
          owId: data.owId
        });
        setOwStep('handshake');
      } else {
        setOwError(data.error || 'Ошибка инициализации');
      }
    } catch (e) {
      setOwError('Системная ошибка. Попробуйте еще раз.');
    }
    setOwVerifying(false);
  };

  const handleConfirmOw = async () => {
    if (!verifyOwMeta) return;
    setOwVerifying(true);
    setOwError('');

    try {
      const res = await fetch('/api/profile/verify-ow/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owId: verifyOwMeta.owId,
          originalAvatar: verifyOwMeta.originalAvatar
        })
      });
      const data = await res.json();

      if (data.success) {
        setShowOwModal(false);
        setOwStep('init');
        setVerifyOwData(null);
        fetchFullProfile();
        checkSession();
      } else {
        setOwError(data.error || 'Ошибка верификации');
      }
    } catch (e) {
      setOwError('Системная ошибка подтверждения.');
    }
    setOwVerifying(false);
  };

  const handleLinkDiscord = () => { window.location.href = '/api/auth/discord'; };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4 py-12 flex flex-col gap-8">
      
      {/* КАРТОЧКА ПОЛЬЗОВАТЕЛЯ */}
      <div className="relative p-[1px] rounded-[1.5rem] bg-gradient-to-r from-imperial/50 to-transparent shadow-glass-glow w-full">
        <div className="bg-[#0b0812]/95 backdrop-blur-2xl rounded-[calc(1.5rem-1px)] p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6">
          <img src={profileData?.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-2xl border border-imperial/40 shadow-[0_0_20px_rgba(96,81,155,0.3)] flex-shrink-0" />
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <h1 className="text-2xl md:text-3xl font-black text-ivory tracking-wider">{profileData?.customName}</h1>
              <span className="text-[10px] font-black text-imperial bg-imperial/10 px-2 py-1 rounded border border-imperial/20 uppercase tracking-widest">RANKED PLAYER</span>
            </div>
            <p className="text-xs text-lavender/50 font-bold uppercase tracking-widest mt-1">STEAM ID: {profileData?.steamId}</p>
            <p className="text-xs text-lavender/30 font-bold uppercase tracking-widest mt-0.5">MEMBER SINCE: {new Date(profileData?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* КАРТОЧКИ СВЯЗАННЫХ ИГР */}
        <form onSubmit={handleSaveProfile} className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="text-sm font-black text-imperial tracking-[0.2em] uppercase border-b border-white/5 pb-2 mb-2 flex items-center gap-2">
            <LinkIcon size={16} /> Link game accounts & ranks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* FACEIT CS2 */}
            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-[#ff5500]/30 to-black shadow-[0_0_30px_rgba(255,85,0,0.15)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff5500]/20 blur-[30px]" />
              <div className="bg-[#060408]/90 backdrop-blur-xl rounded-[calc(1rem-1px)] p-5 border border-white/[0.02] flex flex-col gap-3 h-full relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-[#ff5500] tracking-widest uppercase">Faceit CS2</span>
                  <span className="text-[8px] bg-[#ff5500]/20 text-[#ff5500] border border-[#ff5500]/40 px-2 py-0.5 rounded font-bold uppercase">43 MATCHES SYNC</span>
                </div>
                {profileData?.faceitId ? (
                  <div className="flex flex-col gap-2">
                    <a 
                      href={`https://www.faceit.com/en/players/${profileData.faceitId}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-xs font-bold text-lavender hover:text-[#ff5500] hover:underline transition-all flex items-center gap-1.5"
                    >
                      Linked Account: <span className="text-ivory font-black">{profileData.faceitId}</span>
                    </a>
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-ivory drop-shadow-[0_0_10px_rgba(255,85,0,0.4)] uppercase">
                        {profileData.faceitRank || "No Level"}
                      </span>
                      {profileData.faceitElo && (
                        <span className="text-xs text-lavender/50 font-bold">({profileData.faceitElo} ELO)</span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-2 pt-2.5 border-t border-white/5">
                      <div className="text-center">
                        <p className="text-[8px] text-lavender/40 font-bold uppercase">K/D (43 matches)</p>
                        <p className="text-sm font-black text-ivory">{profileData.faceitKd || "0.00"}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[8px] text-lavender/40 font-bold uppercase">Winrate (43 matches)</p>
                        <p className="text-sm font-black text-ivory">{profileData.faceitWinrate || "0"}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[8px] text-lavender/40 font-bold uppercase">Headshots (43 matches)</p>
                        <p className="text-sm font-black text-ivory">{profileData.faceitHs || "0"}%</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-lavender/40 font-bold uppercase py-4">No linked Faceit account found on this Steam ID</div>
                )}
              </div>
            </div>

            {/* VALORANT */}
            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-[#ff4655]/30 to-[#0f1923] shadow-[0_0_30px_rgba(255,70,85,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff4655]/20 blur-[30px]" />
              <div className="bg-[#060408]/90 backdrop-blur-xl rounded-[calc(1rem-1px)] p-5 border border-white/[0.02] flex flex-col gap-3 h-full relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-[#ff4655] tracking-widest uppercase">Valorant</span>
                  <span className="text-[8px] bg-[#ff4655]/20 text-[#ff4655] border border-[#ff4655]/40 px-2 py-0.5 rounded font-bold uppercase">10 MATCHES SYNC</span>
                </div>
                
                {profileData?.riotId && profileData?.riotRank ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-xs font-bold text-lavender">Linked Account: <span className="text-ivory font-black">{profileData.riotId}</span></div>
                    
                    <div className="flex items-center gap-3">
                      {profileData.riotImage && (
                        <img src={profileData.riotImage} alt="" className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(255,70,85,0.5)]" />
                      )}
                      <div>
                        <p className="text-[9px] text-lavender/40 font-bold uppercase">Riot Rank</p>
                        <p className="text-sm font-black text-ivory">{profileData.riotRank}</p>
                        {profileData.riotElo !== null && (
                          <p className="text-[10px] text-lavender/50 font-medium">{profileData.riotElo} RR</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-1.5 pt-2 border-t border-white/5">
                      <div className="text-center">
                        <p className="text-[8px] text-lavender/40 font-bold uppercase">K/D (10 matches)</p>
                        <p className="text-sm font-black text-ivory">{profileData.riotKd || "0.00"}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[8px] text-lavender/40 font-bold uppercase">Winrate (10 matches)</p>
                        <p className="text-sm font-black text-ivory">{profileData.riotWinrate || "0"}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[8px] text-lavender/40 font-bold uppercase">Headshots (10 matches)</p>
                        <p className="text-sm font-black text-ivory">{profileData.riotHs || "0"}%</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => { setInputRiotId(''); setRiotError(''); setRiotStep('init'); setVerifyData(null); setShowRiotModal(true); }} 
                    className="w-full py-3.5 mt-2 bg-[#ff4655]/20 hover:bg-[#ff4655]/40 border border-[#ff4655]/50 text-ivory text-xs font-bold tracking-widest uppercase rounded transition-all cursor-pointer"
                  >
                    Link Riot Account
                  </button>
                )}
              </div>
            </div>

            {/* OVERWATCH 2 */}
            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-[#00c3ff]/30 to-[#0e1624] shadow-[0_0_30px_rgba(0,195,255,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00c3ff]/20 blur-[30px]" />
              <div className="bg-[#060408]/90 backdrop-blur-xl rounded-[calc(1rem-1px)] p-5 border border-white/[0.02] flex flex-col gap-4 h-full relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-[#00c3ff] tracking-widest uppercase">Overwatch 2</span>
                  <span className="text-[8px] bg-[#00c3ff]/20 text-[#00c3ff] border border-[#00c3ff]/40 px-2 py-0.5 rounded font-bold uppercase">BATTLE.NET SYNC</span>
                </div>
                
                {profileData?.owId && profileData?.owRank ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-xs font-bold text-lavender">Linked Account: <span className="text-ivory font-black">{profileData.owId}</span></div>
                    
                    <div className="flex items-center gap-3">
                      {profileData.owImage && (
                        <img src={profileData.owImage} alt="" className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(0,195,255,0.5)]" />
                      )}
                      <div>
                        <p className="text-[9px] text-lavender/40 font-bold uppercase">Peak Competitive Rank</p>
                        <p className="text-sm font-black text-ivory">{profileData.owRank}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => { setInputOwId(''); setOwError(''); setOwStep('init'); setVerifyOwData(null); setShowOwModal(true); }} 
                    className="w-full py-3.5 mt-2 bg-[#00c3ff]/20 hover:bg-[#00c3ff]/40 border border-[#00c3ff]/50 text-ivory text-xs font-bold tracking-widest uppercase rounded transition-all cursor-pointer"
                  >
                    Link Overwatch Account
                  </button>
                )}
              </div>
            </div>

            {/* DISCORD */}
            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-[#5865F2]/30 to-black shadow-[0_0_30px_rgba(88,101,242,0.15)] relative overflow-hidden">
              <div className="bg-[#060408]/90 backdrop-blur-xl rounded-[calc(1rem-1px)] p-5 border border-white/[0.02] flex flex-col gap-4 h-full">
                <span className="text-[10px] font-black text-[#5865F2] tracking-widest uppercase">Discord</span>
                {profileData?.discordId ? (
                  <div className="text-xs font-bold text-lavender">Linked Account: <span className="text-ivory font-black">{profileData.discordId}</span></div>
                ) : (
                  <button type="button" onClick={handleLinkDiscord} className="w-full py-3.5 bg-[#5865F2]/20 hover:bg-[#5865F2]/40 border border-[#5865F2]/50 text-ivory text-xs font-bold tracking-widest uppercase rounded transition-all cursor-pointer">
                    Link Discord Account
                  </button>
                )}
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#0a051b] border border-[#8b5cf6]/20">
              <div className="bg-[#060408]/90 backdrop-blur-xl rounded-[calc(1rem-1px)] p-5 flex flex-col gap-4 h-full">
                <span className="text-[10px] font-black text-[#8b5cf6] tracking-widest uppercase">Marvel Rivals</span>
                <input type="text" placeholder="Marvel Rivals ID" value={marvelId} onChange={e => setMarvelId(e.target.value)} className="w-full bg-black/60 border border-[#8b5cf6]/30 text-ivory rounded p-3 text-xs font-bold outline-none focus:border-[#8b5cf6]" />
                <div className="text-[10px] text-lavender/30 uppercase font-black tracking-widest text-center mt-2">Rank synced via API (Soon)</div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end gap-4 mt-6">
            {savedSuccess && <span className="text-xs font-bold text-green-400 flex items-center gap-1.5 uppercase tracking-widest mr-2 animate-pulse">SAVED SUCCESSFULLY!</span>}
            <button type="submit" disabled={isSaving} className="px-8 py-3.5 bg-imperial/30 hover:bg-imperial/50 border border-imperial/50 text-ivory text-xs font-black tracking-widest uppercase rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(96,81,155,0.3)] cursor-pointer">
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} SAVE ALL CHANGES
            </button>
          </div>
        </form>

        {/* СТАТИСТИКА ТЕСТОВ РЕАКЦИИ */}
        <div className="w-full bg-[#0b0812]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col shadow-glass-glow h-fit">
          <h2 className="text-sm font-black text-imperial tracking-[0.2em] uppercase border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
            <Trophy size={16} /> Personal Bests
          </h2>

          <div className="flex flex-col gap-3">
            {['simple', 'choice', 'flick', 'combined', 'strafe'].map(mode => {
              const score = profileData?.reactionScores?.find((s: any) => s.mode === mode);
              return (
                <div key={mode} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-bold text-lavender uppercase">{mode}</span>
                  <span className="text-sm font-black text-ivory tracking-wider">
                    {score ? `${score.bestMs} ms` : '---'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* === ДВУХЭТАПНОЕ МОДАЛЬНОЕ ОКНО ВЕРИФИКАЦИИ RIOT === */}
      {showRiotModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative p-[1px] rounded-[1.5rem] bg-gradient-to-br from-[#ff4655]/60 to-transparent max-w-md w-full shadow-lg">
            <div className="bg-[#09090f]/95 rounded-[calc(1.5rem-1px)] p-8 flex flex-col gap-6">
              
              <div className="text-center">
                <div className="w-12 h-12 bg-[#ff4655]/20 border border-[#ff4655]/50 rounded-xl flex items-center justify-center mx-auto text-[#ff4655] mb-4">
                  <Trophy size={24} />
                </div>
                <h3 className="text-xl font-black text-ivory tracking-widest uppercase">Verify Riot Account</h3>
                {riotStep === 'init' ? (
                  <p className="text-xs text-lavender mt-3 leading-relaxed">Введите ваш Riot ID (например, `Jett#143`). На первом шаге система бесшумно зафиксирует вашу текущую игровую карточку.</p>
                ) : (
                  <div className="text-xs text-lavender mt-3 leading-relaxed bg-[#ff4655]/5 p-4 rounded-xl border border-[#ff4655]/20 text-left flex flex-col gap-2">
                    <p className="font-bold text-ivory text-center">ИНСТРУКЦИЯ ПО ПОДТВЕРЖДЕНИЮ:</p>
                    <p>1. Наша система зафиксировала вашу текущую карточку игрока (Player Card) в Valorant.</p>
                    <p className="font-bold text-yellow-400">2. Зайдите в Valorant, откройте Коллекцию и измените вашу карточку игрока на ЛЮБУЮ ДРУГУЮ карточку в вашей коллекции.</p>
                    <p>3. Вернитесь сюда и нажмите кнопку **«Confirm Verification»**.</p>
                  </div>
                )}
              </div>

              {riotStep === 'init' ? (
                <form onSubmit={handleInitiateRiot} className="flex flex-col gap-4">
                  <input type="text" value={inputRiotId} onChange={(e) => setInputRiotId(e.target.value)} placeholder="e.g. Jett#143" className="w-full bg-black/50 border border-[#ff4655]/30 focus:border-[#ff4655] text-ivory rounded-lg p-3 text-sm font-bold outline-none text-center tracking-wider transition-all" />
                  {riotError && <p className="text-xs text-red-400 bg-red-950/50 p-2.5 rounded border border-red-500/20 text-center font-bold flex items-center gap-1.5 justify-center"><ShieldAlert size={14} /> {riotError}</p>}
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setShowRiotModal(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-ivory text-xs font-black tracking-widest uppercase rounded-lg cursor-pointer">Cancel</button>
                    <button type="submit" disabled={riotVerifying} className="flex-1 py-3 bg-[#ff4655]/30 hover:bg-[#ff4655]/50 border border-[#ff4655]/50 text-ivory text-xs font-black tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,70,85,0.3)]">{riotVerifying ? <Loader2 size={14} className="animate-spin" /> : 'Next Step'}</button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col gap-4">
                  {riotError && <p className="text-xs text-red-400 bg-red-950/50 p-2.5 rounded border border-red-500/20 text-center font-bold flex items-center gap-1.5 justify-center"><ShieldAlert size={14} /> {riotError}</p>}
                  <div className="flex gap-3">
                    <button type="button" onClick={() => { setRiotStep('init'); setVerifyData(null); setRiotError(''); }} className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-ivory text-xs font-black tracking-widest uppercase rounded-lg cursor-pointer">Back</button>
                    <button type="button" onClick={handleConfirmRiot} disabled={riotVerifying} className="flex-1 py-3 bg-green-600/30 hover:bg-green-600/50 border border-green-500/50 text-ivory text-xs font-black tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                      {riotVerifying ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />} 
                      {riotVerifying ? 'Verifying...' : 'Confirm Verification'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* === ДВУХЭТАПНОЕ МОДАЛЬНОЕ ОКНО ВЕРИФИКАЦИИ OVERWATCH 2 === */}
      {showOwModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative p-[1px] rounded-[1.5rem] bg-gradient-to-br from-[#00c3ff]/60 to-transparent max-w-md w-full shadow-lg">
            <div className="bg-[#09090f]/95 rounded-[calc(1.5rem-1px)] p-8 flex flex-col gap-6">
              
              <div className="text-center">
                <div className="w-12 h-12 bg-[#00c3ff]/20 border border-[#00c3ff]/50 rounded-xl flex items-center justify-center mx-auto text-[#00c3ff] mb-4 shadow-[0_0_15px_rgba(0,195,255,0.3)]">
                  <Trophy size={24} />
                </div>
                <h3 className="text-xl font-black text-ivory tracking-widest uppercase">Verify Overwatch 2 Account</h3>
                
                {owStep === 'init' ? (
                  <p className="text-xs text-lavender mt-3 leading-relaxed">
                    Введите ваш BattleTag (например, `Genji#1234`). Система зафиксирует вашу текущую иконку профиля (Avatar).
                  </p>
                ) : (
                  <div className="text-xs text-lavender mt-3 leading-relaxed bg-[#00c3ff]/5 p-4 rounded-xl border border-[#00c3ff]/20 text-left flex flex-col gap-2">
                    <p className="font-bold text-ivory text-center">ИНСТРУКЦИЯ ПО ВЕРИФИКАЦИИ:</p>
                    <p>1. Наша система зафиксировала вашу текущую иконку профиля в Overwatch 2.</p>
                    <p className="font-bold text-yellow-400">2. Откройте клиент Overwatch 2, зайдите в Карьерный Профиль -&gt; Настройка и измените иконку вашего профиля (Avatar) на любую другую.</p>
                    <p>3. Вернитесь сюда и нажмите кнопку **«Confirm Verification»**.</p>
                  </div>
                )}
              </div>

              {owStep === 'init' ? (
                <form onSubmit={handleInitiateOw} className="flex flex-col gap-4">
                  <input 
                    type="text" 
                    value={inputOwId}
                    onChange={(e) => setInputOwId(e.target.value)}
                    placeholder="e.g. Genji#1234"
                    className="w-full bg-black/50 border border-[#00c3ff]/30 focus:border-[#00c3ff] text-ivory rounded-lg p-3 text-sm font-bold outline-none text-center tracking-wider transition-all"
                  />

                  {owError && (
                    <p className="text-xs text-red-400 bg-red-950/50 p-2.5 rounded border border-red-500/20 text-center font-bold flex items-center gap-1.5 justify-center">
                      <ShieldAlert size={14} /> {owError}
                    </p>
                  )}

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setShowOwModal(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-ivory text-xs font-black tracking-widest uppercase rounded-lg cursor-pointer">Cancel</button>
                    <button type="submit" disabled={owVerifying} className="flex-1 py-3 bg-[#00c3ff]/30 hover:bg-[#00c3ff]/50 border border-[#00c3ff]/50 text-ivory text-xs font-black tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,195,255,0.3)]">
                      {owVerifying ? <Loader2 size={14} className="animate-spin" /> : 'Next Step'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col gap-4">
                  {owError && <p className="text-xs text-red-400 bg-red-950/50 p-2.5 rounded border border-red-500/20 text-center font-bold flex items-center gap-1.5 justify-center"><ShieldAlert size={14} /> {owError}</p>}
                  <div className="flex gap-3">
                    <button 
                      type="button" 
                      onClick={() => { setOwStep('init'); setVerifyOwData(null); setOwError(''); }} 
                      className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-ivory text-xs font-black tracking-widest uppercase rounded-lg cursor-pointer"
                    >
                      Back
                    </button>
                    <button 
                      type="button" 
                      onClick={handleConfirmOw}
                      disabled={owVerifying}
                      className="flex-1 py-3 bg-green-600/30 hover:bg-green-600/50 border border-green-500/50 text-ivory text-xs font-black tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(74,222,128,0.3)]"
                    >
                      {owVerifying ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />} 
                      {owVerifying ? 'Verifying...' : 'Confirm Verification'}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
</file>

<file path="src/app/[lang]/reaction/ChoiceMode.tsx">
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReactionStore } from './useReactionStore';
import { useAuthStore } from '../auth/useAuthStore';
import * as PIXI from 'pixi.js';
import { AlertTriangle, RotateCcw, Trophy, Target } from 'lucide-react';

const COLORS = { NIGHT: 0x09090F, GRAY: 0x2a2a35, YELLOW: 0xeab308, GREEN: 0x4ade80 };

export default function ChoiceMode({ dict }: { dict: any }) {
  const state = useReactionStore();
  const { user } = useAuthStore();
  
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const targetsRef = useRef<PIXI.Graphics[]>([]);

  const engineState = useRef({ 
    status: 'idle', 
    timeoutId: 0 as any, 
    yellowTimeoutId: 0 as any,
    startTime: 0, 
    correctIndex: -1,
    isGreen: false
  });

  const [uiStatus, setUiStatus] = useState<'idle'|'waiting'|'ready'>('idle');
  const [lastTime, setLastTime] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isNewPb, setIsNewPb] = useState(false);

  const avgTime = state.results.length > 0 ? Math.round(state.results.reduce((a, b) => a + b, 0) / state.results.length) : 0;

  useEffect(() => {
    let isDestroyed = false;
    const initPixi = async () => {
      if (!canvasContainerRef.current) return;
      const app = new PIXI.Application();
      await app.init({ 
        resizeTo: canvasContainerRef.current, 
        backgroundColor: COLORS.NIGHT, 
        resolution: window.devicePixelRatio || 1, 
        autoDensity: true,
        antialias: true // ВКЛЮЧЕНО СГЛАЖИВАНИЕ
      });
      if (isDestroyed || !canvasContainerRef.current) { app.destroy(true); return; }
      
      canvasContainerRef.current.appendChild(app.canvas);
      appRef.current = app;

      // Создаем ровно 2 Сферы (Левую и Правую)
      for (let i = 0; i < 2; i++) {
        const circle = new PIXI.Graphics();
        circle.circle(0, 0, 60).fill(COLORS.GRAY);
        circle.eventMode = 'static'; 
        circle.cursor = 'crosshair'; // КУРСОР КРЕСТИК НА СФЕРАХ
        
        circle.on('pointerdown', (e) => {
          if (!e.isTrusted) return;
          handleTargetClick(i);
        });

        app.stage.addChild(circle);
        targetsRef.current.push(circle);
      }

      const positionTargets = () => {
        if (!appRef.current) return;
        const w = appRef.current.screen.width; const h = appRef.current.screen.height;
        const spacing = w / 3;
        // Распределяем равномерно на 1/3 и 2/3 экрана
        targetsRef.current[0]?.position.set(spacing, h / 2);
        targetsRef.current[1]?.position.set(spacing * 2, h / 2);
      };
      
      positionTargets();
      window.addEventListener('resize', positionTargets);
      return () => window.removeEventListener('resize', positionTargets);
    };

    initPixi();
    return () => {
      isDestroyed = true;
      if (engineState.current.timeoutId) clearTimeout(engineState.current.timeoutId);
      if (engineState.current.yellowTimeoutId) clearTimeout(engineState.current.yellowTimeoutId);
      if (appRef.current) { appRef.current.destroy(true, { children: true }); appRef.current = null; }
    };
  }, []);

  const changeStatus = (status: any) => {
    engineState.current.status = status; setUiStatus(status);
    if (status === 'idle' || status === 'waiting') {
      targetsRef.current.forEach(t => { t.clear(); t.circle(0, 0, 60).fill(COLORS.GRAY); });
    }
  };

  const spawnChoice = () => {
    const s = engineState.current;
    s.correctIndex = Math.floor(Math.random() * 2); // 0 или 1
    s.isGreen = Math.random() > 0.3; // 70% Зеленый, 30% Желтый
    
    targetsRef.current.forEach((t, i) => {
      t.clear();
      t.circle(0, 0, 60).fill(i === s.correctIndex ? (s.isGreen ? COLORS.GREEN : COLORS.YELLOW) : COLORS.GRAY);
    });
    
    changeStatus('ready');
    s.startTime = performance.now();

    if (!s.isGreen) {
      s.yellowTimeoutId = setTimeout(() => {
        if (engineState.current.status === 'ready') {
          changeStatus('waiting');
          s.timeoutId = setTimeout(spawnChoice, Math.floor(Math.random() * 1500) + 500);
        }
      }, 1000);
    }
  };

  const handleStart = () => {
    if (useReactionStore.getState().results.length >= 10) return;
    setErrorMsg(null); changeStatus('waiting');
    engineState.current.timeoutId = setTimeout(spawnChoice, Math.floor(Math.random() * 2000) + 1000);
  };

  const handleTargetClick = (index: number) => {
    const s = engineState.current;
    
    if (s.status === 'waiting') {
      clearTimeout(s.timeoutId);
      setErrorMsg("TOO EARLY! RESTARTING...");
      state.resetResults(); 
      changeStatus('idle');
    } else if (s.status === 'ready') {
      if (index === s.correctIndex) {
        if (s.isGreen) {
          const reactionTime = Math.round(performance.now() - s.startTime);
          if (reactionTime < 120) { setErrorMsg("IMPOSSIBLE REACTION (< 120ms)"); state.resetResults(); changeStatus('idle'); return; }
          
          setLastTime(reactionTime); 
          state.addResult(reactionTime);
          
          const nextCount = useReactionStore.getState().results.length;
          if (nextCount < 10) {
            changeStatus('waiting');
            s.timeoutId = setTimeout(spawnChoice, Math.floor(Math.random() * 1500) + 500);
          } else {
            changeStatus('idle');
          }
        } else {
          clearTimeout(s.yellowTimeoutId);
          setErrorMsg("FAILED! YOU CLICKED YELLOW. RESTARTING...");
          state.resetResults();
          changeStatus('idle');
        }
      } else {
        clearTimeout(s.yellowTimeoutId);
        setErrorMsg("WRONG TARGET! RESTARTING...");
        state.resetResults();
        changeStatus('idle');
      }
    }
  };

  useEffect(() => {
    if (state.results.length === 10 && user) {
      fetch('/api/reaction/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'choice', avgMs: avgTime }) })
      .then(res => res.json()).then(data => { if (data.isNewRecord) setIsNewPb(true); state.triggerRefresh(); }).catch(console.error);
    }
  }, [state.results.length]);

  return (
    <div className="relative flex-1 rounded-2xl overflow-hidden border border-imperial/40 shadow-glass-glow min-h-[400px]">
      <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
      
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 text-center z-10">
        {state.results.length >= 10 ? (
          <div className="bg-[#0b0812]/95 backdrop-blur-2xl border border-imperial/50 p-10 rounded-3xl flex flex-col items-center gap-4 shadow-[0_0_50px_rgba(96,81,155,0.4)] animate-in zoom-in-95 duration-500 pointer-events-auto min-w-[320px]">
            {isNewPb && <div className="text-yellow-400 text-xs font-black tracking-widest uppercase flex items-center gap-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse"><Trophy size={14}/> NEW PERSONAL BEST!</div>}
            <h2 className="text-sm font-bold text-lavender tracking-[0.2em] uppercase">Choice Test Complete</h2>
            <div className="text-7xl font-black text-ivory drop-shadow-[0_0_20px_rgba(169,133,255,0.8)]">{avgTime} <span className="text-2xl text-lavender/50">ms</span></div>
            <button onClick={() => { state.resetResults(); setLastTime(null); setIsNewPb(false); changeStatus('idle'); }} className="mt-4 w-full py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-xl text-sm font-bold text-ivory tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(96,81,155,0.3)] cursor-pointer"><RotateCcw size={18} /> PLAY AGAIN</button>
          </div>
        ) : (
          <>
            {uiStatus === 'idle' && (
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase bg-black/60 p-4 rounded-xl border border-white/5">
                  <span className="flex items-center gap-2 text-green-400"><Target size={16}/> CLICK GREEN</span>
                  <span className="text-white/20">|</span>
                  <span className="flex items-center gap-2 text-yellow-400 font-bold"><AlertTriangle size={16}/> IGNORE YELLOW</span>
                </div>
                <button onClick={handleStart} className="pointer-events-auto px-8 py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-full text-lg font-black text-ivory tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(96,81,155,0.4)]">
                  START CHOICE TEST
                </button>
              </div>
            )}
            {uiStatus === 'idle' && lastTime !== null && !errorMsg && <p className="mt-6 text-2xl font-bold text-lavender/80 tracking-wider">Hit: {lastTime} ms</p>}
            {errorMsg && <p className="mt-6 text-sm font-bold text-red-400 bg-red-950/50 px-4 py-2 rounded-lg border border-red-500/30 flex items-center gap-2"><AlertTriangle size={16} /> {errorMsg}</p>}
          </>
        )}
      </div>
    </div>
  );
}
</file>

<file path="src/app/[lang]/reaction/CombinedMode.tsx">
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReactionStore } from './useReactionStore';
import { useAuthStore } from '../auth/useAuthStore';
import * as PIXI from 'pixi.js';
import { AlertTriangle, RotateCcw, Trophy } from 'lucide-react';

const COLORS = { NIGHT: 0x09090F, TRACKING: 0x38bdf8, FLICK: 0x4ade80 };

export default function CombinedMode({ dict }: { dict: any }) {
  const state = useReactionStore();
  const { user } = useAuthStore();
  
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  
  const trackingTargetRef = useRef<PIXI.Graphics | null>(null);
  const flickTargetRef = useRef<PIXI.Graphics | null>(null);

  const engineState = useRef({ 
    status: 'idle', // 'idle', 'waiting', 'tracking', 'ready'
    timeoutId: 0 as any, 
    offTargetTimeoutId: 0 as any,
    startTime: 0,
    isHovered: false,
    time: 0,              // Физическое время траектории
    elapsedTrackingTime: 0 // Прошедшее время трекинга в миллисекундах
  });

  const [uiStatus, setUiStatus] = useState<'idle'|'waiting'|'tracking'|'ready'>('idle');
  const [lastTime, setLastTime] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isNewPb, setIsNewPb] = useState(false);

  const avgTime = state.results.length > 0 ? Math.round(state.results.reduce((a, b) => a + b, 0) / state.results.length) : 0;

  useEffect(() => {
    let isDestroyed = false;
    const initPixi = async () => {
      if (!canvasContainerRef.current) return;
      const app = new PIXI.Application();
      await app.init({ 
        resizeTo: canvasContainerRef.current, 
        backgroundColor: COLORS.NIGHT, 
        resolution: window.devicePixelRatio || 1, 
        autoDensity: true,
        antialias: true 
      });
      if (isDestroyed || !canvasContainerRef.current) { app.destroy(true); return; }
      
      canvasContainerRef.current.appendChild(app.canvas);
      appRef.current = app;

      // Слой фона для промахов во время флика
      const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
      bg.width = app.screen.width; bg.height = app.screen.height; bg.tint = COLORS.NIGHT;
      bg.eventMode = 'static';
      bg.cursor = 'crosshair';
      bg.on('pointerdown', (e) => {
        if (!e.isTrusted) return;
        if (engineState.current.status === 'ready') {
          handleFail("MISSED THE FLICK TARGET!");
        }
      });
      app.stage.addChild(bg);

      // Сфера трекинга (Синяя)
      const trackingTarget = new PIXI.Graphics();
      trackingTarget.circle(0, 0, 30).fill(COLORS.TRACKING);
      trackingTarget.eventMode = 'static';
      trackingTarget.cursor = 'crosshair';
      trackingTarget.visible = false;

      // Логика наведения
      trackingTarget.on('pointerover', () => {
        engineState.current.isHovered = true;
        if (engineState.current.offTargetTimeoutId) clearTimeout(engineState.current.offTargetTimeoutId);
      });

      trackingTarget.on('pointerout', () => {
        engineState.current.isHovered = false;
        engineState.current.offTargetTimeoutId = setTimeout(() => {
          if (!engineState.current.isHovered && engineState.current.status === 'tracking') {
            handleFail("TRACKING FAILED! KEEP YOUR CROSSHAIR ON TARGET.");
          }
        }, 150);
      });

      // Первый клик по шарику в центре запускает движение
      trackingTarget.on('pointerdown', (e) => {
        if (!e.isTrusted) return;
        const s = engineState.current;
        if (s.status === 'waiting') {
          changeStatus('tracking');
          s.isHovered = true;
          s.time = 0; // Начинаем движение строго с 0!
          s.elapsedTrackingTime = 0; // Сбрасываем время разгона
          
          // Случайное время удержания от 3 до 7 секунд
          const trackingDuration = Math.floor(Math.random() * 4000) + 3000;
          
          s.timeoutId = setTimeout(() => {
            if (engineState.current.status === 'tracking') {
              spawnFlickTarget();
            }
          }, trackingDuration);
        }
      });

      app.stage.addChild(trackingTarget);
      trackingTargetRef.current = trackingTarget;

      // Сфера флика (Зеленая)
      const flickTarget = new PIXI.Graphics();
      flickTarget.circle(0, 0, 25).fill(COLORS.FLICK);
      flickTarget.eventMode = 'static';
      flickTarget.cursor = 'crosshair';
      flickTarget.visible = false;

      flickTarget.on('pointerdown', (e) => {
        if (!e.isTrusted) return;
        handleFlickHit();
      });

      app.stage.addChild(flickTarget);
      flickTargetRef.current = flickTarget;

      // ТИКЕР ДВИЖЕНИЯ С ПЛАВНЫМ РАЗГОНОМ
      app.ticker.add((ticker) => {
        const s = engineState.current;
        if (s.status === 'tracking' && trackingTargetRef.current) {
          s.elapsedTrackingTime += ticker.elapsedMS;
          
          // Коэффициент плавного разгона в первую секунду (от 0.0 до 1.0)
          const accel = Math.min(s.elapsedTrackingTime / 1000, 1.0);
          
          // Мягкая и плавная базовая скорость с инерцией
          const speed = 0.024 * accel * ticker.deltaTime;
          s.time += speed;
          
          const cx = app.screen.width / 2;
          const cy = app.screen.height / 2;
          
          trackingTargetRef.current.x = cx + Math.sin(s.time) * 200;
          trackingTargetRef.current.y = cy + Math.sin(s.time * 2) * 90;
        }
      });

      const handleResize = () => { if (bg) { bg.width = app.screen.width; bg.height = app.screen.height; }};
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    };

    initPixi();
    return () => {
      isDestroyed = true;
      if (engineState.current.timeoutId) clearTimeout(engineState.current.timeoutId);
      if (engineState.current.offTargetTimeoutId) clearTimeout(engineState.current.offTargetTimeoutId);
      if (appRef.current) { appRef.current.destroy(true, { children: true }); appRef.current = null; }
    };
  }, []);

  const changeStatus = (status: any) => {
    engineState.current.status = status; setUiStatus(status);
    if (status === 'idle') {
      if (trackingTargetRef.current) trackingTargetRef.current.visible = false;
      if (flickTargetRef.current) flickTargetRef.current.visible = false;
    }
  };

  const handleFail = (msg: string) => {
    setErrorMsg(msg);
    // КРИТИЧЕСКИЙ ФИКС: Больше не сбрасываем результаты в 0! Просто перезапускаем ТЕКУЩУЮ попытку.
    if (engineState.current.timeoutId) clearTimeout(engineState.current.timeoutId);
    if (engineState.current.offTargetTimeoutId) clearTimeout(engineState.current.offTargetTimeoutId);
    changeStatus('idle');
  };

  const handleStart = () => {
    if (useReactionStore.getState().results.length >= 10) return;
    setErrorMsg(null); 
    
    // Полное обнуление физики траектории перед спавном
    engineState.current.time = 0;
    engineState.current.elapsedTrackingTime = 0;
    engineState.current.isHovered = false;
    
    if (appRef.current && trackingTargetRef.current) {
      trackingTargetRef.current.position.set(appRef.current.screen.width / 2, appRef.current.screen.height / 2);
      trackingTargetRef.current.visible = true;
    }
    
    changeStatus('waiting');
  };

  const spawnFlickTarget = () => {
    if (!appRef.current || !flickTargetRef.current || !trackingTargetRef.current) return;
    
    trackingTargetRef.current.visible = false;
    
    const w = appRef.current.screen.width;
    const h = appRef.current.screen.height;
    const padding = 60;
    
    const rx = Math.random() * (w - padding * 2) + padding;
    const ry = Math.random() * (h - padding * 2) + padding;
    
    flickTargetRef.current.position.set(rx, ry);
    flickTargetRef.current.visible = true;
    
    changeStatus('ready');
    engineState.current.startTime = performance.now();
  };

  const handleFlickHit = () => {
    const s = engineState.current;
    if (s.status === 'ready') {
      const reactionTime = Math.round(performance.now() - s.startTime);
      if (reactionTime < 100) { handleFail("IMPOSSIBLE REACTION (< 100ms)"); return; }
      
      setLastTime(reactionTime);
      state.addResult(reactionTime);
      
      const nextCount = useReactionStore.getState().results.length;
      if (nextCount < 10) {
        if (flickTargetRef.current) flickTargetRef.current.visible = false;
        handleStart(); // Мгновенно готовит следующий шар в центре
      } else {
        changeStatus('idle');
      }
    }
  };

  // АВТОСОХРАНЕНИЕ
  useEffect(() => {
    if (state.results.length === 10 && user) {
      fetch('/api/reaction/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'combined', avgMs: avgTime }) })
      .then(res => res.json()).then(data => { if (data.isNewRecord) setIsNewPb(true); state.triggerRefresh(); }).catch(console.error);
    }
  }, [state.results.length]);

  return (
    <div className="relative flex-1 rounded-2xl overflow-hidden border border-imperial/40 shadow-glass-glow min-h-[400px]">
      <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
      
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 text-center z-10">
        {state.results.length >= 10 ? (
          <div className="bg-[#0b0812]/95 backdrop-blur-2xl border border-imperial/50 p-10 rounded-3xl flex flex-col items-center gap-4 shadow-[0_0_50px_rgba(96,81,155,0.4)] animate-in zoom-in-95 duration-500 pointer-events-auto min-w-[320px]">
            {isNewPb && <div className="text-yellow-400 text-xs font-black tracking-widest uppercase flex items-center gap-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse"><Trophy size={14}/> NEW PERSONAL BEST!</div>}
            <h2 className="text-sm font-bold text-lavender tracking-[0.2em] uppercase">Combined Test Complete</h2>
            <div className="text-7xl font-black text-ivory drop-shadow-[0_0_20px_rgba(169,133,255,0.8)]">{avgTime} <span className="text-2xl text-lavender/50">ms</span></div>
            <button onClick={() => { state.resetResults(); setLastTime(null); setIsNewPb(false); changeStatus('idle'); }} className="mt-4 w-full py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-xl text-sm font-bold text-ivory tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(96,81,155,0.3)] cursor-pointer"><RotateCcw size={18} /> PLAY AGAIN</button>
          </div>
        ) : (
          <>
            {uiStatus === 'idle' && (
              <button onClick={handleStart} className="pointer-events-auto px-8 py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-full text-lg font-black text-ivory tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(96,81,155,0.4)]">
                {errorMsg ? 'RETRY ATTEMPT' : 'START COMBINED TEST'}
              </button>
            )}
            {uiStatus === 'waiting' && (
              <span className="text-xs font-black tracking-[0.3em] uppercase text-sky-400 animate-pulse bg-sky-950/40 px-4 py-2 border border-sky-500/20 rounded">CLICK THE BLUE SPHERE TO START MOVEMENT</span>
            )}
            {uiStatus === 'tracking' && (
              <span className="text-xs font-black tracking-[0.3em] uppercase text-sky-400 animate-pulse bg-sky-950/40 px-4 py-2 border border-sky-500/20 rounded">TRACK THE BLUE TARGET</span>
            )}
            {uiStatus === 'ready' && (
              <span className="text-xs font-black tracking-[0.3em] uppercase text-green-400 animate-pulse bg-green-950/40 px-4 py-2 border border-green-500/20 rounded">FLICK AND CLICK!</span>
            )}
            {uiStatus === 'idle' && lastTime !== null && !errorMsg && <p className="mt-6 text-2xl font-bold text-lavender/80 tracking-wider">Flick Time: {lastTime} ms</p>}
            {errorMsg && <p className="mt-6 text-sm font-bold text-red-400 bg-red-950/50 px-4 py-2 rounded-lg border border-red-500/30 flex items-center gap-2"><AlertTriangle size={16} /> {errorMsg}</p>}
          </>
        )}
      </div>
    </div>
  );
}
</file>

<file path="src/app/[lang]/reaction/FlickMode.tsx">
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReactionStore } from './useReactionStore';
import { useAuthStore } from '../auth/useAuthStore';
import * as PIXI from 'pixi.js';
import { AlertTriangle, RotateCcw, Trophy } from 'lucide-react';

const COLORS = { NIGHT: 0x09090F, TARGET: 0x4ade80 };

export default function FlickMode({ dict }: { dict: any }) {
  const state = useReactionStore();
  const { user } = useAuthStore();
  
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const targetRef = useRef<PIXI.Graphics | null>(null);

  const engineState = useRef({ status: 'idle', timeoutId: 0 as any, startTime: 0 });
  const [uiStatus, setUiStatus] = useState<'idle'|'waiting'|'ready'>('idle');
  const [lastTime, setLastTime] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isNewPb, setIsNewPb] = useState(false);

  const avgTime = state.results.length > 0 ? Math.round(state.results.reduce((a, b) => a + b, 0) / state.results.length) : 0;

  useEffect(() => {
    let isDestroyed = false;
    const initPixi = async () => {
      if (!canvasContainerRef.current) return;
      const app = new PIXI.Application();
      await app.init({ 
        resizeTo: canvasContainerRef.current, 
        backgroundColor: COLORS.NIGHT, 
        resolution: window.devicePixelRatio || 1, 
        autoDensity: true,
        antialias: true // ВКЛЮЧЕНО СГЛАЖИВАНИЕ
      });
      if (isDestroyed || !canvasContainerRef.current) { app.destroy(true); return; }
      
      canvasContainerRef.current.appendChild(app.canvas);
      appRef.current = app;

      // Фон
      const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
      bg.width = app.screen.width; bg.height = app.screen.height; bg.tint = COLORS.NIGHT;
      bg.eventMode = 'static';
      bg.cursor = 'crosshair'; // КУРСОР КРЕСТИК НА ФОНЕ
      
      bg.on('pointerdown', (e) => {
        if (!e.isTrusted) return;
        if (engineState.current.status === 'ready') {
          setErrorMsg("MISSED TARGET!"); changeStatus('idle'); 
        }
      });
      app.stage.addChild(bg);

      // Зеленая мишень
      const target = new PIXI.Graphics();
      target.circle(0, 0, 30).fill(COLORS.TARGET); 
      target.eventMode = 'static';
      target.cursor = 'crosshair'; // КУРСОР КРЕСТИК НА МИШЕНИ
      target.visible = false;
      
      target.on('pointerdown', (e) => {
        if (!e.isTrusted) return;
        handleTargetHit();
      });

      app.stage.addChild(target);
      targetRef.current = target;

      const handleResize = () => { if (bg && appRef.current) { bg.width = appRef.current.screen.width; bg.height = appRef.current.screen.height; }};
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    };

    initPixi();
    return () => {
      isDestroyed = true;
      if (engineState.current.timeoutId) clearTimeout(engineState.current.timeoutId);
      if (appRef.current) { appRef.current.destroy(true, { children: true }); appRef.current = null; }
    };
  }, []);

  const changeStatus = (status: any) => {
    engineState.current.status = status; setUiStatus(status);
    if (status === 'idle' && targetRef.current) targetRef.current.visible = false;
  };

  const spawnTarget = () => {
    if (!appRef.current || !targetRef.current) return;
    const w = appRef.current.screen.width;
    const h = appRef.current.screen.height;
    const padding = 50;
    
    const rx = Math.random() * (w - padding * 2) + padding;
    const ry = Math.random() * (h - padding * 2) + padding;
    
    targetRef.current.position.set(rx, ry);
    targetRef.current.visible = true;
    changeStatus('ready');
    engineState.current.startTime = performance.now();
  };

  const handleStart = () => {
    if (useReactionStore.getState().results.length >= 10) return;
    setErrorMsg(null); changeStatus('waiting');
    
    engineState.current.timeoutId = setTimeout(() => {
      spawnTarget();
    }, Math.floor(Math.random() * 1500) + 500);
  };

  const handleTargetHit = () => {
    const s = engineState.current;
    if (s.status === 'ready') {
      const reactionTime = Math.round(performance.now() - s.startTime);
      if (reactionTime < 100) { setErrorMsg("IMPOSSIBLE FLICK (< 100ms)"); changeStatus('idle'); return; }
      
      setLastTime(reactionTime); 
      state.addResult(reactionTime); 
      
      const nextCount = useReactionStore.getState().results.length;
      
      if (nextCount < 10) {
        if (targetRef.current) targetRef.current.visible = false;
        changeStatus('waiting');
        s.timeoutId = setTimeout(spawnTarget, Math.floor(Math.random() * 1500) + 500);
      } else {
        changeStatus('idle');
      }
    }
  };

  useEffect(() => {
    if (state.results.length === 10 && user) {
      fetch('/api/reaction/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'flick', avgMs: avgTime }) })
      .then(res => res.json()).then(data => { if (data.isNewRecord) setIsNewPb(true); state.triggerRefresh(); }).catch(console.error);
    }
  }, [state.results.length]);

  return (
    <div className="relative flex-1 rounded-2xl overflow-hidden border border-imperial/40 shadow-glass-glow min-h-[400px]">
      <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
      
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 text-center z-10">
        {state.results.length >= 10 ? (
          <div className="bg-[#0b0812]/95 backdrop-blur-2xl border border-imperial/50 p-10 rounded-3xl flex flex-col items-center gap-4 shadow-[0_0_50px_rgba(96,81,155,0.4)] animate-in zoom-in-95 duration-500 pointer-events-auto min-w-[320px]">
            {isNewPb && <div className="text-yellow-400 text-xs font-black tracking-widest uppercase flex items-center gap-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse"><Trophy size={14}/> NEW PERSONAL BEST!</div>}
            <h2 className="text-sm font-bold text-lavender tracking-[0.2em] uppercase">Flick Test Complete</h2>
            <div className="text-7xl font-black text-ivory drop-shadow-[0_0_20px_rgba(169,133,255,0.8)]">{avgTime} <span className="text-2xl text-lavender/50">ms</span></div>
            <button onClick={() => { state.resetResults(); setLastTime(null); setIsNewPb(false); changeStatus('idle'); }} className="mt-4 w-full py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-xl text-sm font-bold text-ivory tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(96,81,155,0.3)] cursor-pointer"><RotateCcw size={18} /> PLAY AGAIN</button>
          </div>
        ) : (
          <>
            {uiStatus === 'idle' && (
              <button onClick={handleStart} className="pointer-events-auto px-8 py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-full text-lg font-black text-ivory tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(96,81,155,0.4)]">
                START FLICK TEST
              </button>
            )}
            {uiStatus === 'idle' && lastTime !== null && !errorMsg && <p className="mt-6 text-2xl font-bold text-lavender/80 tracking-wider">Hit: {lastTime} ms</p>}
            {errorMsg && <p className="mt-6 text-sm font-bold text-red-400 bg-red-950/50 px-4 py-2 rounded-lg border border-red-500/30 flex items-center gap-2"><AlertTriangle size={16} /> {errorMsg}</p>}
          </>
        )}
      </div>
    </div>
  );
}
</file>

<file path="src/app/[lang]/reaction/page.tsx">
import { getDictionary } from "@/dictionaries/getDictionary";
import ReactionClient from "./ReactionClient";

type Props = {
  params: Promise<{ lang: 'en' | 'ru' }>;
};

export default async function ReactionPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ReactionClient dict={dict} />;
}
</file>

<file path="src/app/[lang]/reaction/ReactionClient.tsx">
"use client";

import React from 'react';
import { useReactionStore, ReactionMode } from './useReactionStore';
import { Activity, Zap, Settings2 } from 'lucide-react';
import ReactionLeaderboard from './ReactionLeaderboard';
import SimpleMode from './SimpleMode';
import ChoiceMode from './ChoiceMode';
import FlickMode from './FlickMode';
import CombinedMode from './CombinedMode';
import StrafeMode from './StrafeMode'; // Наш новый импорт!

export default function ReactionClient({ dict }: { dict: any }) {
  const state = useReactionStore();
  const avgTime = state.results.length > 0 ? Math.round(state.results.reduce((a, b) => a + b, 0) / state.results.length) : 0;

  const availableModes: ReactionMode[] = ['simple', 'choice', 'flick', 'combined', 'strafe'];

  const renderActiveEngine = () => {
    switch (state.mode) {
      case 'simple':   return <SimpleMode dict={dict} />;
      case 'choice':   return <ChoiceMode dict={dict} />;
      case 'flick':    return <FlickMode dict={dict} />;
      case 'combined': return <CombinedMode dict={dict} />;
      case 'strafe':   return <StrafeMode dict={dict} />; // Встраиваем движок
      default:
        return (
          <div className="flex-1 rounded-2xl border border-imperial/40 shadow-glass-glow bg-black/40 flex flex-col items-center justify-center p-6 text-center min-h-[400px]">
            <Settings2 size={48} className="text-imperial animate-spin-slow mb-4" />
            <h2 className="text-xl font-black text-ivory tracking-widest uppercase mb-2">UNDER CONSTRUCTION</h2>
            <p className="text-sm text-lavender">This cognitive mode is currently in development.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-start p-4 py-8 w-full max-w-[1200px] mx-auto min-h-[80vh] gap-6">
      
      {/* HEADER */}
      <div className="w-full flex items-center gap-4 bg-[#0b0812]/80 backdrop-blur-xl border border-imperial/30 p-5 rounded-2xl shadow-glass-glow">
        <div className="p-3 bg-imperial/20 rounded-xl border border-imperial/50 text-imperial">
          <Activity size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-[0.2em] text-ivory drop-shadow-[0_0_10px_rgba(240,235,224,0.3)] uppercase">{dict.reaction.title}</h1>
          <p className="text-lavender text-xs uppercase tracking-widest">{dict.reaction.desc}</p>
        </div>
      </div>

      {/* РЕЖИМЫ (TABS) */}
      <div className="w-full flex flex-wrap gap-2 bg-[#0b0812]/80 backdrop-blur-xl border border-white/5 p-2 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        {availableModes.map((mode) => (
          <button key={mode} onClick={() => state.setMode(mode)} className={`flex-1 min-w-[120px] py-2.5 text-[11px] font-bold tracking-widest uppercase transition-all rounded-lg border ${state.mode === mode ? 'bg-imperial/40 border-imperial text-ivory shadow-[0_0_15px_rgba(96,81,155,0.3)]' : 'bg-transparent border-transparent text-lavender/50 hover:text-lavender hover:bg-white/5'}`}>
            {dict.reaction[`mode_${mode}`]}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-6 h-auto lg:h-[500px]">
        
        {/* АКТИВНЫЙ ДВИЖОК */}
        {renderActiveEngine()}

        {/* SIDEBAR (СТАТИСТИКА 10 ПОПЫТОК) */}
        <div className="w-full lg:w-[320px] bg-[#0b0812]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.8)] flex-shrink-0">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-4">
            <Zap size={18} className="text-imperial" />
            <h3 className="text-sm font-bold text-ivory uppercase tracking-[0.15em]">{dict.reaction.attempts}</h3>
            <span className="ml-auto text-xs font-bold text-lavender/50">{state.results.length} / 10</span>
          </div>

          <div className="grid grid-cols-2 gap-2 flex-1 items-start content-start">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${state.results[i] ? 'bg-imperial/10 border-imperial/30 shadow-[inset_0_0_10px_rgba(96,81,155,0.1)]' : 'bg-black/40 border-white/5'}`}>
                <span className="text-[9px] font-bold text-lavender/40 uppercase">Try {i + 1}</span>
                <span className={`text-sm font-black tracking-wider ${state.results[i] ? 'text-ivory' : 'text-white/10'}`}>{state.results[i] ? `${state.results[i]}` : '---'}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-imperial/20 flex flex-col items-center justify-center bg-gradient-to-b from-imperial/10 to-transparent p-4 rounded-xl">
            <span className="text-[10px] font-bold text-lavender/70 uppercase tracking-[0.2em] mb-1">{dict.reaction.avg}</span>
            <div className="text-3xl font-black text-ivory drop-shadow-[0_0_10px_rgba(169,133,255,0.5)]">
              {avgTime > 0 ? avgTime : '0'} <span className="text-sm text-lavender/50 font-bold ml-1">{dict.reaction.ms}</span>
            </div>
          </div>
        </div>

      </div>

      {/* ЛИДЕРБОРД */}
      <ReactionLeaderboard dict={dict} />
    </div>
  );
}
</file>

<file path="src/app/[lang]/reaction/ReactionLeaderboard.tsx">
"use client";

import React, { useEffect, useState } from 'react';
import { useReactionStore } from './useReactionStore';
import { Trophy, Globe, User, Settings2 } from 'lucide-react';

export default function ReactionLeaderboard({ dict }: { dict: any }) {
  const state = useReactionStore();
  const [tab, setTab] = useState<'current' | 'global'>('current');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBoard = async () => {
      setIsLoading(true);
      try {
        const modeQuery = tab === 'global' ? 'global' : state.mode;
        const res = await fetch(`/api/reaction/leaderboard?mode=${modeQuery}`);
        const json = await res.json();
        if (Array.isArray(json)) setData(json);
        else setData([]);
      } catch (e) {
        console.error(e);
        setData([]);
      }
      setIsLoading(false);
    };

    fetchBoard();
  }, [state.mode, tab, state.refreshTrigger]); // Реагирует на триггер автосохранения!

  return (
    <div className="w-full mt-4 bg-[#0b0812]/80 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-white/10 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-imperial/20 rounded-lg border border-imperial/40 text-imperial">
            <Trophy size={20} />
          </div>
          <h2 className="text-lg font-black text-ivory tracking-widest uppercase">Leaderboard</h2>
        </div>
        
        <div className="flex bg-black/60 p-1 rounded-xl border border-white/5 relative shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] w-full sm:w-[300px]">
          <button onClick={() => setTab('current')} className={`flex-1 py-2 text-[10px] font-bold tracking-widest z-10 transition-colors uppercase ${tab === 'current' ? 'text-ivory' : 'text-lavender/50 hover:text-lavender'}`}>
            Mode: {dict.reaction[`mode_${state.mode}`]}
          </button>
          <button onClick={() => setTab('global')} className={`flex-1 py-2 text-[10px] font-bold tracking-widest z-10 transition-colors uppercase flex items-center justify-center gap-1 ${tab === 'global' ? 'text-ivory' : 'text-lavender/50 hover:text-lavender'}`}>
            <Globe size={12} /> GLOBAL
          </button>
          <div className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-b from-imperial/60 to-imperial/10 border border-imperial/40 rounded-lg transition-all" style={{ left: tab === 'current' ? '4px' : 'calc(50%)' }} />
        </div>
      </div>

      <div className="p-0 min-h-[200px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-12"><Settings2 size={24} className="text-imperial animate-spin" /></div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-lavender/50">
            <Trophy size={32} className="mb-2 opacity-50" />
            <p className="text-sm font-bold uppercase tracking-widest">No records yet. Be the first!</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] font-bold text-lavender/50 uppercase tracking-widest w-16 text-center">Rank</th>
                <th className="px-6 py-4 text-[10px] font-bold text-lavender/50 uppercase tracking-widest">Player</th>
                <th className="px-6 py-4 text-[10px] font-bold text-lavender/50 uppercase tracking-widest text-right">{tab === 'global' ? 'Reaction Power' : 'Average Time'}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                let rankColor = "text-lavender/40";
                if (index === 0) rankColor = "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]";
                else if (index === 1) rankColor = "text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.5)]";
                else if (index === 2) rankColor = "text-amber-700 drop-shadow-[0_0_8px_rgba(180,83,9,0.5)]";

                return (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className={`px-6 py-4 text-sm font-black text-center ${rankColor}`}>#{index + 1}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      {row.avatarUrl ? <img src={row.avatarUrl} alt="" className="w-8 h-8 rounded border border-white/10" /> : <div className="w-8 h-8 rounded border border-white/10 bg-white/5 flex items-center justify-center"><User size={14} className="text-lavender/50" /></div>}
                      <span className="text-sm font-bold text-ivory">{row.username}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-black text-imperial drop-shadow-[0_0_5px_rgba(96,81,155,0.4)] bg-imperial/10 px-3 py-1 rounded border border-imperial/20">{row.formatted}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
</file>

<file path="src/app/[lang]/reaction/SimpleMode.tsx">
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReactionStore } from './useReactionStore';
import { useAuthStore } from '../auth/useAuthStore';
import * as PIXI from 'pixi.js';
import { AlertTriangle, RotateCcw, ShieldAlert, Trophy } from 'lucide-react';

const COLORS = { NIGHT: 0x09090F, BLOOD_WINE: 0x722f37, SUCCESS: 0x4ade80, IMPERIAL: 0x60519b };

export default function SimpleMode({ dict }: { dict: any }) {
  const state = useReactionStore();
  const { user } = useAuthStore();
  
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);

  const engineState = useRef({ status: 'idle', timeoutId: 0 as any, startTime: 0 });
  const [uiStatus, setUiStatus] = useState<'idle'|'waiting'|'ready'|'early'|'finished'>('idle');
  const [lastTime, setLastTime] = useState<number | null>(null);
  
  const [cheatReason, setCheatReason] = useState<string | null>(null);
  const [robotDetected, setRobotDetected] = useState(false);
  const [isNewPb, setIsNewPb] = useState(false);

  const avgTime = state.results.length > 0 ? Math.round(state.results.reduce((a, b) => a + b, 0) / state.results.length) : 0;

  useEffect(() => {
    let isDestroyed = false;
    const initPixi = async () => {
      if (!canvasContainerRef.current) return;
      const app = new PIXI.Application();
      await app.init({ 
        resizeTo: canvasContainerRef.current, 
        backgroundColor: COLORS.NIGHT, 
        resolution: window.devicePixelRatio || 1, 
        autoDensity: true,
        antialias: true // ВКЛЮЧЕНО СГЛАЖИВАНИЕ
      });
      if (isDestroyed || !canvasContainerRef.current) { app.destroy(true); return; }
      
      canvasContainerRef.current.appendChild(app.canvas);
      appRef.current = app;

      app.canvas.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        if (!e.isTrusted) { setCheatReason("SOFTWARE SCRIPT DETECTED"); changeEngineStatus('idle', COLORS.NIGHT); return; }
        handleEngineClick();
      });
    };

    initPixi();
    return () => {
      isDestroyed = true;
      if (engineState.current.timeoutId) clearTimeout(engineState.current.timeoutId);
      if (appRef.current) { appRef.current.destroy(true, { children: true }); appRef.current = null; }
    };
  }, []);

  const changeEngineStatus = (status: any, color: number) => {
    engineState.current.status = status; setUiStatus(status);
    if (appRef.current) appRef.current.renderer.background.color = color;
  };

  const handleEngineClick = () => {
    const s = engineState.current;
    if (state.results.length >= 10) return;

    if (s.status === 'idle' || s.status === 'early') {
      setCheatReason(null); changeEngineStatus('waiting', COLORS.BLOOD_WINE);
      s.timeoutId = setTimeout(() => { changeEngineStatus('ready', COLORS.SUCCESS); s.startTime = performance.now(); }, Math.floor(Math.random() * 3000) + 2000);
    } else if (s.status === 'waiting') {
      clearTimeout(s.timeoutId); changeEngineStatus('early', COLORS.BLOOD_WINE); setLastTime(null);
    } else if (s.status === 'ready') {
      const reactionTime = Math.round(performance.now() - s.startTime);
      if (reactionTime < 95) { setCheatReason("IMPOSSIBLE REACTION (< 95ms)"); changeEngineStatus('idle', COLORS.NIGHT); return; }
      setLastTime(reactionTime); state.addResult(reactionTime); changeEngineStatus('idle', COLORS.NIGHT);
    }
  };

  useEffect(() => {
    if (state.results.length === 10 && user) {
      fetch('/api/reaction/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'simple', avgMs: avgTime }) })
      .then(res => res.json()).then(data => { if (data.isNewRecord) setIsNewPb(true); state.triggerRefresh(); }).catch(console.error);
    }
  }, [state.results.length]);

  return (
    <div className="relative flex-1 rounded-2xl overflow-hidden border border-imperial/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] min-h-[400px]">
      <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
      
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 text-center">
        {state.results.length >= 10 ? (
          <div className="bg-[#0b0812]/95 backdrop-blur-2xl border border-imperial/50 p-10 rounded-3xl flex flex-col items-center gap-4 shadow-[0_0_50px_rgba(96,81,155,0.4)] animate-in zoom-in-95 duration-500 pointer-events-auto min-w-[320px]">
            {robotDetected ? (
              <div className="flex flex-col items-center gap-4 text-red-500">
                <ShieldAlert size={48} />
                <h2 className="text-xl font-black tracking-widest uppercase">MACRO DETECTED</h2>
                <p className="text-sm text-lavender max-w-sm">Variance &lt; 3ms. Result blocked.</p>
              </div>
            ) : (
              <>
                {isNewPb && <div className="text-yellow-400 text-xs font-black tracking-widest uppercase flex items-center gap-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse"><Trophy size={14}/> NEW PERSONAL BEST!</div>}
                <h2 className="text-sm font-bold text-lavender tracking-[0.2em] uppercase">Test Complete</h2>
                <div className="text-7xl font-black text-ivory drop-shadow-[0_0_20px_rgba(169,133,255,0.8)]">
                  {avgTime} <span className="text-2xl text-lavender/50">ms</span>
                </div>
              </>
            )}
            
            <button onClick={() => { state.resetResults(); setLastTime(null); setIsNewPb(false); setRobotDetected(false); changeEngineStatus('idle', COLORS.NIGHT); }} 
                    className="mt-4 w-full py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-xl text-sm font-bold text-ivory tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(96,81,155,0.3)] cursor-pointer">
              <RotateCcw size={18} /> PLAY AGAIN
            </button>
          </div>
        ) : (
          <>
            <h2 className={`text-4xl md:text-5xl font-black tracking-widest uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] transition-all ${uiStatus === 'ready' ? 'text-white scale-110' : 'text-white/90'}`}>
              {uiStatus === 'idle' && !cheatReason && dict.reaction.click_to_start}
              {uiStatus === 'waiting' && dict.reaction.wait}
              {uiStatus === 'ready' && dict.reaction.click_now}
              {uiStatus === 'early' && dict.reaction.too_soon}
              {cheatReason && cheatReason}
            </h2>
            {uiStatus === 'idle' && lastTime !== null && !cheatReason && <p className="mt-4 text-2xl font-bold text-lavender/80 tracking-wider">{lastTime} ms</p>}
            {cheatReason && <p className="mt-4 text-sm font-bold text-red-400 bg-red-950/50 px-4 py-2 rounded-lg border border-red-500/30 flex items-center gap-2 pointer-events-auto"><AlertTriangle size={16} /> Click to retry.</p>}
          </>
        )}
      </div>
    </div>
  );
}
</file>

<file path="src/app/[lang]/reaction/StrafeMode.tsx">
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReactionStore } from './useReactionStore';
import { useAuthStore } from '../auth/useAuthStore';
import * as PIXI from 'pixi.js';
import { AlertTriangle, RotateCcw, Trophy } from 'lucide-react';

const COLORS = { NIGHT: 0x09090F, TARGET: 0x38bdf8 };

export default function StrafeMode({ dict }: { dict: any }) {
  const state = useReactionStore();
  const { user } = useAuthStore();
  
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const targetRef = useRef<PIXI.Graphics | null>(null);

  const engineState = useRef({ 
    status: 'idle', // 'idle', 'waiting', 'tracking', 'reaction_phase'
    timeoutId: 0 as any, 
    offTargetTimeoutId: 0 as any,
    startTime: 0,
    isHovered: false,
    vx: 9,                 
    x: 0,                  
    hasDriftedOff: false,  
    trackedTime: 0,        
    requiredTrackTime: 2000 
  });

  const [uiStatus, setUiStatus] = useState<'idle'|'waiting'|'tracking'|'reaction_phase'>('idle');
  const [lastTime, setLastTime] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isNewPb, setIsNewPb] = useState(false);

  const avgTime = state.results.length > 0 ? Math.round(state.results.reduce((a, b) => a + b, 0) / state.results.length) : 0;

  useEffect(() => {
    let isDestroyed = false;
    const initPixi = async () => {
      if (!canvasContainerRef.current) return;
      const app = new PIXI.Application();
      await app.init({ 
        resizeTo: canvasContainerRef.current, 
        backgroundColor: COLORS.NIGHT, 
        resolution: window.devicePixelRatio || 1, 
        autoDensity: true,
        antialias: true 
      });
      if (isDestroyed || !canvasContainerRef.current) { app.destroy(true); return; }
      
      canvasContainerRef.current.appendChild(app.canvas);
      appRef.current = app;

      // Слой фона
      const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
      bg.width = app.screen.width; bg.height = app.screen.height; bg.tint = COLORS.NIGHT;
      bg.eventMode = 'static';
      bg.cursor = 'crosshair';
      app.stage.addChild(bg);

      // Сфера стрейфа
      const target = new PIXI.Graphics();
      target.circle(0, 0, 30).fill(COLORS.TARGET);
      target.eventMode = 'static';
      target.cursor = 'crosshair';
      target.visible = false;

      // Отслеживание наведения прицела
      target.on('pointerover', () => {
        const s = engineState.current;
        s.isHovered = true;
        
        if (s.status === 'waiting') {
          changeStatus('tracking');
          s.trackedTime = 0; 
        }

        if (s.status === 'reaction_phase' && s.hasDriftedOff) {
          handleReactionSuccess();
        }
      });

      target.on('pointerout', () => {
        const s = engineState.current;
        s.isHovered = false;
        
        if (s.status === 'reaction_phase') {
          s.hasDriftedOff = true;
        }

        // КРИТИЧЕСКИЙ ФИКС: Сброс попытки, если прицел слетел более чем на 400 мс (наказание)
        if (s.status === 'tracking' || s.status === 'reaction_phase') {
          s.offTargetTimeoutId = setTimeout(() => {
            if (!s.isHovered && (engineState.current.status === 'tracking' || engineState.current.status === 'reaction_phase')) {
              handleFail("TRACKING FAILED! STRAYED FROM TARGET.");
            }
          }, 400); // 400 мс буфера
        }
      });

      app.stage.addChild(target);
      targetRef.current = target;

      // ТИКЕР ДВИЖЕНИЯ
      app.ticker.add((ticker) => {
        const s = engineState.current;
        if ((s.status === 'tracking' || s.status === 'reaction_phase') && targetRef.current) {
          
          s.x += s.vx * ticker.deltaTime;
          
          const paddingX = 50;
          if (s.x < paddingX) { s.x = paddingX; s.vx = -s.vx; }
          if (s.x > app.screen.width - paddingX) { s.x = app.screen.width - paddingX; s.vx = -s.vx; }

          targetRef.current.x = s.x;
          targetRef.current.y = app.screen.height / 2;

          // Накопление времени удержания
          if (s.status === 'tracking' && s.isHovered) {
            s.trackedTime += ticker.elapsedMS;
            
            const margin = 100;
            const canStrafe = s.x > margin && s.x < app.screen.width - margin;

            if (s.trackedTime >= s.requiredTrackTime && canStrafe) {
              triggerStrafe(); 
            }
          }
        }
      });

      const handleResize = () => { if (bg && appRef.current) { bg.width = appRef.current.screen.width; bg.height = appRef.current.screen.height; }};
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    };

    initPixi();
    return () => {
      isDestroyed = true;
      if (engineState.current.timeoutId) clearTimeout(engineState.current.timeoutId);
      if (engineState.current.offTargetTimeoutId) clearTimeout(engineState.current.offTargetTimeoutId);
      if (appRef.current) { appRef.current.destroy(true, { children: true }); appRef.current = null; }
    };
  }, []);

  const changeStatus = (status: any) => {
    engineState.current.status = status; setUiStatus(status);
    if (status === 'idle' && targetRef.current) targetRef.current.visible = false;
  };

  const handleStart = () => {
    if (useReactionStore.getState().results.length >= 10) return;
    setErrorMsg(null);
    
    const s = engineState.current;
    s.x = appRef.current ? appRef.current.screen.width / 2 : 200;
    s.vx = Math.random() > 0.5 ? 9 : -9; 
    s.trackedTime = 0;
    s.isHovered = false;
    s.hasDriftedOff = false;
    s.requiredTrackTime = Math.floor(Math.random() * 1500) + 1500; 

    if (targetRef.current && appRef.current) {
      targetRef.current.position.set(s.x, appRef.current.screen.height / 2);
      targetRef.current.visible = true;
    }

    changeStatus('waiting');
  };

  const triggerStrafe = () => {
    const s = engineState.current;
    s.status = 'reaction_phase';
    setUiStatus('reaction_phase');
    s.vx = -s.vx * 1.1; 
    s.startTime = performance.now(); 
    s.hasDriftedOff = !s.isHovered; 
  };

  const handleReactionSuccess = () => {
    const s = engineState.current;
    const reactionTime = Math.round(performance.now() - s.startTime);
    
    if (reactionTime < 100) {
      handleFail("IMPOSSIBLE REACTION TIME (< 100ms)");
      return;
    }

    setLastTime(reactionTime);
    state.addResult(reactionTime);

    const nextCount = useReactionStore.getState().results.length;
    if (nextCount < 10) {
      handleStart(); 
    } else {
      changeStatus('idle');
    }
  };

  const handleFail = (msg: string) => {
    setErrorMsg(msg);
    if (engineState.current.timeoutId) clearTimeout(engineState.current.timeoutId);
    if (engineState.current.offTargetTimeoutId) clearTimeout(engineState.current.offTargetTimeoutId);
    changeStatus('idle');
  };

  useEffect(() => {
    if (state.results.length === 10 && user) {
      fetch('/api/reaction/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'strafe', avgMs: avgTime }) })
      .then(res => res.json()).then(data => { if (data.isNewRecord) setIsNewPb(true); state.triggerRefresh(); }).catch(console.error);
    }
  }, [state.results.length]);

  const isFinished = state.results.length >= 10;

  return (
    <div className="relative flex-1 rounded-2xl overflow-hidden border border-imperial/40 shadow-glass-glow min-h-[400px]">
      <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
      
      <div className={`absolute inset-0 pointer-events-none flex flex-col items-center p-6 text-center z-10 ${isFinished ? 'justify-center bg-black/40' : 'justify-start pt-8'}`}>
        {isFinished ? (
          <div className="bg-[#0b0812]/95 backdrop-blur-2xl border border-imperial/50 p-10 rounded-3xl flex flex-col items-center gap-4 shadow-[0_0_50px_rgba(96,81,155,0.4)] animate-in zoom-in-95 duration-500 pointer-events-auto min-w-[320px]">
            {isNewPb && <div className="text-yellow-400 text-xs font-black tracking-widest uppercase flex items-center gap-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse"><Trophy size={14}/> NEW PERSONAL BEST!</div>}
            <h2 className="text-sm font-bold text-lavender tracking-[0.2em] uppercase">Strafe Test Complete</h2>
            <div className="text-7xl font-black text-ivory drop-shadow-[0_0_20px_rgba(169,133,255,0.8)]">{avgTime} <span className="text-2xl text-lavender/50">ms</span></div>
            <button onClick={() => { state.resetResults(); setLastTime(null); setIsNewPb(false); changeStatus('idle'); }} className="mt-4 w-full py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-xl text-sm font-bold text-ivory tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(96,81,155,0.3)] cursor-pointer"><RotateCcw size={18} /> PLAY AGAIN</button>
          </div>
        ) : (
          <>
            {uiStatus === 'idle' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                <button onClick={handleStart} className="px-8 py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-full text-lg font-black text-ivory tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(96,81,155,0.4)]">
                  {errorMsg ? 'RETRY ATTEMPT' : 'START STRAFE TEST'}
                </button>
              </div>
            )}
            
            {/* Текст зафиксирован и больше НЕ меняется при стрейфе шарика (без ложных подсказок) */}
            {uiStatus === 'waiting' && (
              <span className="text-xs font-black tracking-[0.3em] uppercase text-purple-400 animate-pulse bg-purple-950/40 px-4 py-2 border border-purple-500/20 rounded">HOVER OVER THE TARGET TO BEGIN TRACKING</span>
            )}
            {(uiStatus === 'tracking' || uiStatus === 'reaction_phase') && (
              <span className="text-xs font-black tracking-[0.3em] uppercase text-purple-400 bg-purple-950/40 px-4 py-2 border border-purple-500/20 rounded">KEEP TRACKING THE TARGET!</span>
            )}
            
            {uiStatus === 'idle' && lastTime !== null && !errorMsg && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-lavender/80 tracking-wider">React: {lastTime} ms</p>
              </div>
            )}
            {errorMsg && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-sm font-bold text-red-400 bg-red-950/50 px-4 py-2 rounded-lg border border-red-500/30 flex items-center gap-2"><AlertTriangle size={16} /> {errorMsg}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
</file>

<file path="src/app/[lang]/reaction/useReactionStore.ts">
import { create } from 'zustand';

// Убран 'movement'
export type ReactionMode = 'simple' | 'choice' | 'flick' | 'combined' | 'strafe';

interface ReactionState {
  mode: ReactionMode;
  setMode: (mode: ReactionMode) => void;
  
  results: number[];
  addResult: (time: number) => void;
  resetResults: () => void;

  refreshTrigger: number;
  triggerRefresh: () => void;
}

export const useReactionStore = create<ReactionState>((set) => ({
  mode: 'simple',
  setMode: (mode) => set({ mode, results: [] }),
  
  results: [],
  addResult: (time) => set((state) => ({ results: [...state.results, time] })),
  resetResults: () => set({ results: [] }),

  refreshTrigger: 0,
  triggerRefresh: () => set((state) => ({ refreshTrigger: state.refreshTrigger + 1 }))
}));
</file>

<file path="src/app/[lang]/routines/page.tsx">
// Путь: src/app/[lang]/routines/page.tsx
import ComingSoon from "../../../components/ComingSoon";

export default function RoutinesPage() {
  return <ComingSoon title="Smart Routines" />;
}
</file>

<file path="src/app/[lang]/tournaments/page.tsx">
// Путь: src/app/[lang]/tournaments/page.tsx
import ComingSoon from "../../../components/ComingSoon";

export default function TournamentsPage() {
  return <ComingSoon title="Aim Tournaments" />;
}
</file>

<file path="src/app/api/auth/discord/callback/route.ts">
// Путь: src/app/api/auth/discord/callback/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    if (!code) return NextResponse.redirect(new URL('/profile?error=no_code', request.url));

    const cookieStore = await cookies();
    const sessionId = cookieStore.get('auth_session')?.value;
    if (!sessionId) return NextResponse.redirect(new URL('/?error=unauthorized', request.url));

    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const redirectUri = `${baseUrl}/api/auth/discord/callback`;

    // 1. Обмениваем временный код на токен
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId || '',
        client_secret: clientSecret || '',
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) return NextResponse.redirect(new URL('/profile?error=token_failed', request.url));

    // 2. Получаем ID пользователя Discord
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const discordUser = await userResponse.json();

    if (!discordUser.id) return NextResponse.redirect(new URL('/profile?error=user_failed', request.url));

    // 3. Записываем в базу данных
    await prisma.user.update({
      where: { id: sessionId },
      data: { discordId: `${discordUser.username}#${discordUser.discriminator !== '0' ? discordUser.discriminator : discordUser.id.slice(-4)}` }
    });

    return NextResponse.redirect(new URL('/profile?success=discord_linked', request.url));
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/profile?error=internal', request.url));
  }
}
</file>

<file path="src/app/api/auth/discord/route.ts">
// Путь: src/app/api/auth/discord/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const redirectUri = encodeURIComponent(`${baseUrl}/api/auth/discord/callback`);

  const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify`;

  return NextResponse.redirect(discordUrl);
}
</file>

<file path="src/app/api/auth/logout/route.ts">
// Путь: src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_session');
  return NextResponse.json({ success: true });
}
</file>

<file path="src/app/api/auth/me/route.ts">
// Путь: src/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('auth_session')?.value;

  if (!sessionId) return NextResponse.json({ user: null });

  // Добавили кастомные имена в выборку из базы данных!
  const user = await prisma.user.findUnique({
    where: { id: sessionId },
    select: { 
      id: true, 
      steamId: true, 
      username: true, 
      customName: true, 
      hasCustomName: true, 
      avatarUrl: true 
    }
  });

  return NextResponse.json({ user });
}
</file>

<file path="src/app/api/auth/steam/return/route.ts">
// Путь: src/app/api/auth/steam/return/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // 1. Проверяем подлинность ответа через серверы Steam
    const verifyParams = new URLSearchParams();
    verifyParams.append('openid.ns', 'http://specs.openid.net/auth/2.0');
    verifyParams.append('openid.mode', 'check_authentication');
    searchParams.forEach((value, key) => {
      if (key !== 'openid.mode') verifyParams.append(key, value);
    });

    const verifyRes = await fetch('https://steamcommunity.com/openid/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: verifyParams.toString(),
    });

    const verifyText = await verifyRes.text();
    if (!verifyText.includes('is_valid:true')) return NextResponse.redirect(new URL('/?error=auth_failed', request.url));

    // 2. Достаем 64-битный Steam ID
    const claimedId = searchParams.get('openid.claimed_id') || '';
    const steamIdMatch = claimedId.match(/\/id\/(\d+)$/);
    const steamId = steamIdMatch ? steamIdMatch[1] : null;
    if (!steamId) return NextResponse.redirect(new URL('/?error=no_steam_id', request.url));

    // 3. Скачиваем аватарку и ник через ваш API ключ
    const apiKey = process.env.STEAM_API_KEY;
    const profileRes = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`);
    const profileData = await profileRes.json();
    const player = profileData.response.players[0];
    if (!player) return NextResponse.redirect(new URL('/?error=no_profile', request.url));

    // 4. Сохраняем в Supabase
    const user = await prisma.user.upsert({
      where: { steamId },
      update: { username: player.personaname, avatarUrl: player.avatarfull },
      create: { steamId, username: player.personaname, avatarUrl: player.avatarfull }
    });

    // 5. Выдаем куки-сессию (Next.js 16)
    const cookieStore = await cookies();
    cookieStore.set('auth_session', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // Месяц
      path: '/',
    });

    // 6. Возвращаем на главную
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/?error=internal', request.url));
  }
}
</file>

<file path="src/app/api/auth/steam/route.ts">
// Путь: src/app/api/auth/steam/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const returnUrl = `${baseUrl}/api/auth/steam/return`;

  const params = new URLSearchParams({
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': returnUrl,
    'openid.realm': baseUrl,
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
  });

  return NextResponse.redirect(`https://steamcommunity.com/openid/login?${params.toString()}`);
}
</file>

<file path="src/app/api/profile/get-user/route.ts">
// Путь: src/app/api/profile/get-user/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// === СТРОГАЯ ТИПИЗАЦИЯ БЕЗ ANY/UNKNOWN ПО ТЗ ===
interface FaceitMatch {
  stats: {
    "K/D Ratio": string;
    "Headshots %": string;
    Result: string | number;
  };
}

interface RiotPlayer {
  puuid: string;
  name: string;
  tag: string;
  team: string;
  stats?: {
    kills?: number;
    deaths?: number;
    headshots?: number;
    bodyshots?: number;
    legshots?: number;
  };
}

interface RiotMatch {
  players?: {
    all_players?: RiotPlayer[];
  };
  teams?: Record<string, { has_won?: boolean }>;
}

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('auth_session')?.value;

  if (!sessionId) return NextResponse.json({ user: null });

  try {
    let user = await prisma.user.findUnique({
      where: { id: sessionId },
      include: { reactionScores: true }
    });

    if (!user) return NextResponse.json({ user: null });

    let dbUpdated = false;
    let updateData: any = {};

    // === 1. УМНЫЙ АВТО-СИНК FACEIT (43 ИГРЫ) ===
    const faceitApiKey = process.env.FACEIT_API_KEY;
    if (faceitApiKey && user.steamId) {
      try {
        const faceitRes = await fetch(`https://open.faceit.com/data/v4/players?game=cs2&game_player_id=${user.steamId}`, {
          headers: { 'Authorization': `Bearer ${faceitApiKey}` }
        });

        if (faceitRes.ok) {
          const faceitData = await faceitRes.json();
          const nickname = faceitData.nickname;
          const skillLevel = faceitData.games?.cs2?.skill_level || faceitData.games?.csgo?.skill_level;
          const elo = faceitData.games?.cs2?.faceit_elo || faceitData.games?.csgo?.faceit_elo || null;
          const faceitPlayerId = faceitData.player_id;

          updateData.faceitId = nickname;
          updateData.faceitRank = skillLevel ? `Level ${skillLevel}` : null;
          updateData.faceitElo = elo;

          if (faceitPlayerId) {
            const statsRes = await fetch(`https://open.faceit.com/data/v4/players/${faceitPlayerId}/games/cs2/stats?limit=43`, {
              headers: { 'Authorization': `Bearer ${faceitApiKey}` }
            });

            if (statsRes.ok) {
              const statsData = await statsRes.json();
              const matches: FaceitMatch[] = statsData.items || [];
              
              let totalKD = 0; let totalHS = 0; let wins = 0;

              matches.forEach((m) => {
                const kd = parseFloat(m.stats["K/D Ratio"]) || 0;
                const hs = parseFloat(m.stats["Headshots %"]) || 0;
                const result = m.stats["Result"];
                
                totalKD += kd; totalHS += hs;
                if (result === "1" || result === "Win" || result === 1) wins++;
              });

              updateData.faceitKd = matches.length > 0 ? parseFloat((totalKD / matches.length).toFixed(2)) : 0.00;
              updateData.faceitHs = matches.length > 0 ? Math.round(totalHS / matches.length) : 0;
              updateData.faceitWinrate = matches.length > 0 ? Math.round((wins / matches.length) * 100) : 0;
            }
          }
          dbUpdated = true;
        }
      } catch (e) {
        console.error("Failed to sync Faceit stats:", e);
      }
    }

    // === 2. УМНЫЙ АВТО-СИНК VALORANT ПО PUUID (10 ИГР) ===
    const valApiKey = process.env.VALORANT_API_KEY;
    if (valApiKey && user.riotPuuid) {
      try {
        const valRes = await fetch(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/eu/${user.riotPuuid}`, {
          headers: { 'Authorization': valApiKey }
        });

        if (valRes.ok) {
          const valData = await valRes.json();
          const currentData = valData.data?.current_data;

          if (currentData) {
            updateData.riotRank = currentData.currenttier_patched || "Unranked";
            updateData.riotElo = currentData.ranking_in_tier || 0;
            updateData.riotImage = currentData.images?.small || null;
            
            const activeRiotName = `${valData.data?.name}#${valData.data?.tag}`;
            if (activeRiotName && user.riotId !== activeRiotName) {
              updateData.riotId = activeRiotName;
            }
            dbUpdated = true;
          }
        }

        const valMatchesRes = await fetch(`https://api.henrikdev.xyz/valorant/v3/by-puuid/matches/eu/${user.riotPuuid}?size=10&filter=competitive`, {
          headers: { 'Authorization': valApiKey }
        });

        if (valMatchesRes.ok) {
          const valMatchesData = await valMatchesRes.json();
          const matches: RiotMatch[] = valMatchesData.data || [];

          let totalKills = 0; let totalDeaths = 0; let wins = 0;
          let totalHeadshots = 0; let totalShots = 0;

          matches.forEach((m) => {
            const player = m.players?.all_players?.find((p) => p.puuid === user!.riotPuuid);
            if (player) {
              const stats = player.stats;
              totalKills += stats?.kills || 0;
              totalDeaths += stats?.deaths || 0;

              const hs = player.stats?.headshots || 0;
              const bs = player.stats?.bodyshots || 0;
              const ls = player.stats?.legshots || 0;
              totalHeadshots += hs;
              totalShots += (hs + bs + ls);

              const teamColor = player.team;
              const teamStats = m.teams?.[teamColor.toLowerCase()];
              if (teamStats?.has_won === true) wins++;
            }
          });

          updateData.riotKd = totalDeaths > 0 ? parseFloat((totalKills / totalDeaths).toFixed(2)) : parseFloat(totalKills.toFixed(2));
          updateData.riotHs = totalShots > 0 ? Math.round((totalHeadshots / totalShots) * 100) : 0;
          updateData.riotWinrate = matches.length > 0 ? Math.round((wins / matches.length) * 100) : 0;
          dbUpdated = true;
        }
      } catch (e) {
        console.error("Failed to sync Valorant stats via PUUID:", e);
      }
    }

    if (dbUpdated && Object.keys(updateData).length > 0) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: updateData,
        include: { reactionScores: true }
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
</file>

<file path="src/app/api/profile/save-details/route.ts">
// Путь: src/app/api/profile/save-details/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('auth_session')?.value;
    if (!sessionId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await req.json();

    await prisma.user.update({
      where: { id: sessionId },
      data: {
        owId: data.owId || null,
        marvelId: data.marvelId || null,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
</file>

<file path="src/app/api/profile/setup-username/route.ts">
// Путь: src/app/api/profile/setup-username/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('auth_session')?.value;
    if (!sessionId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { username } = await req.json();
    
    // Регулярное выражение: строго латиница, цифры, символы _ и -, БЕЗ пробелов и кириллицы
    const usernameRegex = /^[a-zA-Z0-9_\-]+$/;
    
    if (!username || username.length < 3 || username.length > 15) {
      return NextResponse.json({ error: 'Длина ника должна быть от 3 до 15 символов' }, { status: 400 });
    }

    if (!usernameRegex.test(username)) {
      return NextResponse.json({ error: 'Только английские буквы, цифры, знаки подчёркивания (_) и дефисы (-)' }, { status: 400 });
    }

    // Проверяем уникальность кастомного ника в базе данных
    const existing = await prisma.user.findUnique({
      where: { customName: username }
    });

    if (existing) {
      return NextResponse.json({ error: 'Этот никнейм уже занят другим игроком' }, { status: 400 });
    }

    // Обновляем данные пользователя
    await prisma.user.update({
      where: { id: sessionId },
      data: {
        customName: username,
        hasCustomName: true
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
</file>

<file path="src/app/api/profile/verify-ow/confirm/route.ts">
// Путь: src/app/api/profile/verify-ow/confirm/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('auth_session')?.value;
    if (!sessionId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { owId, originalAvatar } = await req.json();
    if (!owId || !originalAvatar) {
      return NextResponse.json({ error: 'Недостаточно данных для верификации.' }, { status: 400 });
    }

    const overwatchId = owId.replace('#', '-');
    const owRes = await fetch(`https://overfast-api.tekrop.fr/players/${encodeURIComponent(overwatchId)}/summary`);

    if (!owRes.ok) return NextResponse.json({ error: 'Игрок не найден.' }, { status: 404 });

    const owData = await owRes.json();
    const currentAvatar = owData.avatar || '';

    // === КЛЮЧЕВАЯ ЛОГИКА: Аватарка ОБЯЗАТЕЛЬНО должна измениться! ===
    if (currentAvatar === originalAvatar) {
      return NextResponse.json({ 
        error: 'Верификация отклонена. Вы не изменили иконку вашего профиля (Avatar) в клиенте Overwatch 2.' 
      }, { status: 400 });
    }

    // Проверяем уникальность BattleTag
    const existing = await prisma.user.findFirst({
      where: { owId }
    });

    if (existing && existing.id !== sessionId) {
      return NextResponse.json({ error: 'Этот BattleTag уже привязан к другому профилю.' }, { status: 400 });
    }

    // Успех! Записываем подтвержденные данные
    await prisma.user.update({
      where: { id: sessionId },
      data: { owId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
</file>

<file path="src/app/api/profile/verify-ow/initiate/route.ts">
// Путь: src/app/api/profile/verify-ow/initiate/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('auth_session')?.value;
    if (!sessionId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { owId } = await req.json();
    if (!owId || !owId.includes('#')) {
      return NextResponse.json({ error: 'Введите корректный BattleTag в формате Nickname#1234' }, { status: 400 });
    }

    const overwatchId = owId.replace('#', '-');
    const owRes = await fetch(`https://overfast-api.tekrop.fr/players/${encodeURIComponent(overwatchId)}/summary`);

    if (!owRes.ok) {
      return NextResponse.json({ error: 'Игрок не найден. Проверьте правильность написания BattleTag.' }, { status: 404 });
    }

    const owData = await owRes.json();
    const avatar = owData.avatar || '';

    // Возвращаем URL текущей аватарки для сравнения на Шаге 2
    return NextResponse.json({ 
      success: true, 
      originalAvatar: avatar, 
      owId
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
</file>

<file path="src/app/api/profile/verify-riot/confirm/route.ts">
// Путь: src/app/api/profile/verify-riot/confirm/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('auth_session')?.value;
    if (!sessionId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { riotId, originalCardId } = await req.json();
    if (!riotId || !originalCardId) {
      return NextResponse.json({ error: 'Недостаточно данных для верификации.' }, { status: 400 });
    }

    const [name, tag] = riotId.split('#');
    const valApiKey = process.env.VALORANT_API_KEY;

    // Свежий запрос для проверки изменений
    const res = await fetch(`https://api.henrikdev.xyz/valorant/v1/account/${encodeURIComponent(name.trim())}/${encodeURIComponent(tag.trim())}`, {
      headers: { 'Authorization': valApiKey || '' }
    });

    if (!res.ok) return NextResponse.json({ error: 'Игрок не найден.' }, { status: 404 });

    const accountData = await res.json();
    const currentCardId = accountData.data?.card?.id;
    const puuid = accountData.data?.puuid;

    if (!currentCardId || !puuid) return NextResponse.json({ error: 'Не удалось получить текущую карточку.' }, { status: 400 });

    // === КЛЮЧЕВАЯ ЛОГИКА: Карта ОБЯЗАТЕЛЬНО должна отличаться от исходной! ===
    if (currentCardId === originalCardId) {
      return NextResponse.json({ 
        error: 'Верификация отклонена. Вы не изменили вашу карточку игрока (Player Card) в клиенте Valorant.' 
      }, { status: 400 });
    }

    // Проверяем уникальность PUUID
    const existing = await prisma.user.findUnique({
      where: { riotPuuid: puuid }
    });

    if (existing && existing.id !== sessionId) {
      return NextResponse.json({ error: 'Этот аккаунт Valorant уже привязан к другому профилю.' }, { status: 400 });
    }

    // Успех! Записываем подтвержденные данные
    await prisma.user.update({
      where: { id: sessionId },
      data: {
        riotId: `${accountData.data.name}#${accountData.data.tag}`,
        riotPuuid: puuid
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
</file>

<file path="src/app/api/profile/verify-riot/initiate/route.ts">
// Путь: src/app/api/profile/verify-riot/initiate/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('auth_session')?.value;
    if (!sessionId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { riotId } = await req.json();
    if (!riotId || !riotId.includes('#')) {
      return NextResponse.json({ error: 'Введите корректный Riot ID в формате Имя#Тег' }, { status: 400 });
    }

    const [name, tag] = riotId.split('#');
    const valApiKey = process.env.VALORANT_API_KEY;

    // Запрашиваем текущую карточку
    const res = await fetch(`https://api.henrikdev.xyz/valorant/v1/account/${encodeURIComponent(name.trim())}/${encodeURIComponent(tag.trim())}`, {
      headers: { 'Authorization': valApiKey || '' }
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Игрок не найден. Проверьте правильность написания Riot ID.' }, { status: 404 });
    }

    const accountData = await res.json();
    const cardId = accountData.data?.card?.id;
    const puuid = accountData.data?.puuid;

    if (!cardId || !puuid) {
      return NextResponse.json({ error: 'Не удалось получить данные карточки игрока.' }, { status: 400 });
    }

    // Возвращаем ID его ТЕКУЩЕЙ карточки для сравнения на Шаге 2
    return NextResponse.json({ 
      success: true, 
      originalCardId: cardId, 
      riotId: `${accountData.data.name}#${accountData.data.tag}`
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
</file>

<file path="src/app/api/profile/verify-riot/route.ts">
// Путь: src/app/api/profile/verify-riot/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const DEFAULT_CARD_ID = "910ace70-4d3b-3c53-2c55-5f9fa179caa8"; // Системный ID стандартной карточки Valorant

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('auth_session')?.value;
    if (!sessionId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { riotId } = await req.json();
    if (!riotId || !riotId.includes('#')) {
      return NextResponse.json({ error: 'Введите корректный Riot ID в формате Имя#Тег' }, { status: 400 });
    }

    const [name, tag] = riotId.split('#');
    const valApiKey = process.env.VALORANT_API_KEY;

    // Запрашиваем информацию об аккаунте по нику через бесплатный API
    const res = await fetch(`https://api.henrikdev.xyz/valorant/v1/account/${encodeURIComponent(name.trim())}/${encodeURIComponent(tag.trim())}`, {
      headers: { 'Authorization': valApiKey || '' }
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Игрок не найден. Проверьте правильность написания Riot ID.' }, { status: 404 });
    }

    const accountData = await res.json();
    const cardId = accountData.data?.card?.id;
    const puuid = accountData.data?.puuid;

    if (!cardId || !puuid) {
      return NextResponse.json({ error: 'Не удалось получить данные карточки игрока.' }, { status: 400 });
    }

    // === ПРОВЕРКА КАРТОЧКИ (АНТИ-ФРОД) ===
    if (cardId !== DEFAULT_CARD_ID) {
      return NextResponse.json({ 
        error: 'Верификация не пройдена. Пожалуйста, зайдите в Valorant, экипируйте стандартную карточку (Default Card) и попробуйте снова.' 
      }, { status: 400 });
    }

    // Проверяем, не привязан ли этот аккаунт кем-то другим
    const existing = await prisma.user.findUnique({
      where: { riotPuuid: puuid }
    });

    if (existing && existing.id !== sessionId) {
      return NextResponse.json({ error: 'Этот аккаунт Valorant уже привязан к другому профилю 143 Aim Club.' }, { status: 400 });
    }

    // Если всё совпало — привязываем PUUID и Riot ID
    await prisma.user.update({
      where: { id: sessionId },
      data: {
        riotId: `${accountData.data.name}#${accountData.data.tag}`,
        riotPuuid: puuid
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
</file>

<file path="src/app/api/reaction/leaderboard/route.ts">
// Путь: src/app/api/reaction/leaderboard/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Отключаем кэш, чтобы лидерборд всегда был свежим
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('mode') || 'simple';

  try {
    // === ГЛОБАЛЬНЫЙ ЛИДЕРБОРД ===
    if (mode === 'global') {
      const allScores = await prisma.reactionScore.findMany({
        include: { user: { select: { username: true, avatarUrl: true } } }
      });

      const userStats: Record<string, { username: string, avatarUrl: string, totalRP: number, modesCount: number }> = {};
      
      allScores.forEach(score => {
        if (!userStats[score.userId]) {
          userStats[score.userId] = { username: score.user.username, avatarUrl: score.user.avatarUrl || '', totalRP: 0, modesCount: 0 };
        }
        // ХИТРАЯ ФОРМУЛА: Reaction Power (Чем меньше ms, тем больше очков)
        const rp = 100000 / score.bestMs;
        userStats[score.userId].totalRP += rp;
        userStats[score.userId].modesCount += 1;
      });

      const globalLeaderboard = Object.values(userStats).map((u, index) => ({
        id: index.toString(),
        username: u.username,
        avatarUrl: u.avatarUrl,
        score: Math.round(u.totalRP / u.modesCount), // Средняя мощность (RP)
        formatted: `${Math.round(u.totalRP / u.modesCount)} RP`
      })).sort((a, b) => b.score - a.score).slice(0, 50); // Выводим топ-50

      return NextResponse.json(globalLeaderboard);
    }

    // === ЛИДЕРБОРД ДЛЯ КОНКРЕТНОГО СЦЕНАРИЯ ===
    const scores = await prisma.reactionScore.findMany({
      where: { mode },
      orderBy: { bestMs: 'asc' }, // Сортируем по возрастанию (Меньше MS = Топ 1)
      take: 50,
      include: { user: { select: { username: true, avatarUrl: true } } }
    });

    const leaderboard = scores.map(s => ({
      id: s.id,
      username: s.user.username,
      avatarUrl: s.user.avatarUrl || '',
      score: s.bestMs,
      formatted: `${s.bestMs} ms`
    }));

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
</file>

<file path="src/app/api/reaction/save/route.ts">
// Путь: src/app/api/reaction/save/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('auth_session')?.value;
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { mode, avgMs } = await req.json();
    if (!mode || !avgMs) return NextResponse.json({ error: 'Invalid data' }, { status: 400 });

    // Ищем, есть ли уже рекорд у этого игрока в этом режиме
    const existing = await prisma.reactionScore.findUnique({
      where: { userId_mode: { userId: sessionId, mode } }
    });

    // Сохраняем ТОЛЬКО если рекорда нет, ИЛИ если новый результат МЕНЬШЕ (лучше) старого
    if (!existing || avgMs < existing.bestMs) {
      await prisma.reactionScore.upsert({
        where: { userId_mode: { userId: sessionId, mode } },
        update: { bestMs: avgMs },
        create: { userId: sessionId, mode, bestMs: avgMs }
      });
      return NextResponse.json({ success: true, isNewRecord: true });
    }

    return NextResponse.json({ success: true, isNewRecord: false });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
</file>

<file path="src/app/BackgroundParticles.tsx">
"use client";

import { useEffect, useRef } from 'react';

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    // Подгоняем под размер экрана
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Отслеживаем мышь для параллакса
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Класс частицы (пылинки/звездочки)
    class Particle {
      x: number; y: number; z: number; speedX: number; speedY: number; alpha: number;
      
      constructor() {
        this.x = Math.random() * (canvas!.width + 200) - 100;
        this.y = Math.random() * (canvas!.height + 200) - 100;
        this.z = Math.random() * 2 + 0.5; // Глубина (определяет параллакс)
        this.speedY = this.z * 0.1 + 0.05; // Медленное падение
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.alpha = Math.random() * 0.5 + 0.1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        // Зацикливание при вылете за экран
        if (this.y > canvas!.height + 100) {
          this.y = -100;
          this.x = Math.random() * (canvas!.width + 200) - 100;
        }
        if (this.x < -100) this.x = canvas!.width + 100;
        if (this.x > canvas!.width + 100) this.x = -100;
      }
      
      draw(ctx: CanvasRenderingContext2D, mx: number, my: number) {
        // Применяем смещение мыши (параллакс) умноженное на глубину (z)
        const drawX = this.x - mx * this.z;
        const drawY = this.y - my * this.z;
        
        ctx.beginPath();
        ctx.arc(drawX, drawY, this.z * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(194, 187, 224, ${this.alpha})`; // Цвет Lavender
        ctx.shadowBlur = this.z * 2;
        ctx.shadowColor = `rgba(194, 187, 224, ${this.alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Создаем 80 частиц
    for (let i = 0; i < 80; i++) particles.push(new Particle());

    // Цикл анимации
    const animate = () => {
      // Плавное следование за мышью
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      // Очистка кадра
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw(ctx, mouseX, mouseY);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none w-full h-full" />;
}
</file>

<file path="src/app/globals.css">
@import "tailwindcss";

@theme {
  --color-night: #09090F;
  --color-imperial: #60519b;
  --color-lavender: #c2bbe0;
  --color-ivory: #f0ebe0;
  --color-blood: #722f37;
  --color-gold: #c4a44a;
  
  --background-image-glass-gradient: linear-gradient(to bottom right, rgba(96, 81, 155, 0.25), transparent, transparent);
  --shadow-glass-glow: 0 20px 40px rgba(0, 0, 0, 0.7), 0 0 30px rgba(96, 81, 155, 0.08);
}

body {
  background-color: var(--color-night);
  color: var(--color-ivory);
  overflow-x: hidden;
  /* Для Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(96, 81, 155, 0.3) var(--color-night);
}

/* Кастомный скроллбар в стиле стеклянного дизайна (Chrome, Edge, Safari) */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-night);
}

::-webkit-scrollbar-thumb {
  background: rgba(96, 81, 155, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(96, 81, 155, 0.6);
}

/* Утилита для скрытия скроллбара, но сохранения прокрутки (нужна для некоторых виджетов) */
@utility no-scrollbar {
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</file>

<file path="src/components/ComingSoon.tsx">
// Путь: src/app/[lang]/components/ComingSoon.tsx
"use client";

import React from 'react';
import { Settings2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center max-w-md mx-auto">
      <div className="p-4 bg-imperial/10 border border-imperial/30 text-imperial rounded-2xl mb-6 shadow-[0_0_20px_rgba(96,81,155,0.2)] animate-pulse">
        <Settings2 size={48} className="animate-spin" style={{ animationDuration: '4s' }} />
      </div>
      <h1 className="text-2xl font-black text-ivory tracking-widest uppercase mb-2">{title}</h1>
      <p className="text-xs text-lavender uppercase tracking-widest mb-8 leading-relaxed">
        Этот раздел находится в стадии закрытой бета-разработки.<br/>
        Следите за обновлениями в Discord!
      </p>
      <Link href="/" className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-xs font-bold text-lavender hover:text-ivory hover:border-imperial hover:bg-imperial/10 transition-all cursor-pointer">
        <ArrowLeft size={14} /> Back to Hub
      </Link>
    </div>
  );
}
</file>

<file path="src/components/Header.tsx">
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/app/[lang]/auth/useAuthStore';
import { Crosshair, Zap, BarChart2, LogIn, LogOut, Loader2, User, Trophy, BookOpen } from 'lucide-react';

export default function Header({ dict, lang }: { dict: any, lang: string }) {
  const pathname = usePathname();
  const { user, isLoading, checkSession, login, logout } = useAuthStore();
  
  const [showSetup, setShowSetup] = useState(false);
  const [customName, setCustomName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (user && !user.hasCustomName) {
      setShowSetup(true);
    } else {
      setShowSetup(false);
    }
  }, [user]);

  const handleSetupName = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/profile/setup-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: customName })
      });
      const data = await res.json();

      if (data.success) {
        setShowSetup(false);
        checkSession();
      } else {
        setErrorMsg(data.error || 'Ошибка сохранения');
      }
    } catch (e) {
      setErrorMsg('Системная ошибка. Попробуйте позже.');
    }
    setIsSubmitting(false);
  };

  const toggleLang = lang === 'ru' ? 'en' : 'ru';
  const newPath = pathname.replace(`/${lang}`, `/${toggleLang}`);

  // ВСЕ ВАШИ ВКЛАДКИ НАВИГАЦИИ ПО ТЗ
  const navLinks = [
    { href: `/${lang}/converter`, label: dict.header.converter, icon: <Crosshair size={14} /> },
    { href: `/${lang}/reaction`, label: dict.header.reaction, icon: <Zap size={14} /> },
    { href: `/${lang}/benchmarks`, label: dict.header.benchmarks, icon: <BarChart2 size={14} /> },
    { href: `/${lang}/tournaments`, label: dict.header.tournaments, icon: <Trophy size={14} /> },
    { href: `/${lang}/routines`, label: dict.header.routines, icon: <BookOpen size={14} /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-[#05020a]/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between">
          
          <Link href={`/${lang}`} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-imperial to-imperial/20 rounded flex items-center justify-center border border-imperial/50 group-hover:shadow-[0_0_15px_rgba(96,81,155,0.6)] transition-all">
              <span className="font-black text-ivory text-xs">143</span>
            </div>
            <span className="font-black tracking-widest text-ivory text-sm hidden sm:block">AIM CLUB</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname.includes(link.href);
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${isActive ? 'bg-imperial/20 text-ivory border border-imperial/30 shadow-[0_0_15px_rgba(96,81,155,0.2)]' : 'text-lavender/60 hover:text-ivory hover:bg-white/5 border border-transparent'}`}
                >
                  {link.icon} {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link href={newPath} className="text-xs font-black text-lavender/50 hover:text-ivory hover:drop-shadow-[0_0_8px_#A985FF] transition-all uppercase tracking-widest">
              {toggleLang}
            </Link>
            <div className="w-[1px] h-6 bg-white/10" />

            {isLoading ? (
              <div className="flex items-center justify-center w-[120px]">
                <Loader2 size={16} className="text-imperial animate-spin" />
              </div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <Link href={`/${lang}/profile`} className="text-xs font-bold text-ivory hover:text-imperial transition-colors cursor-pointer block">
                    {user.customName || user.username}
                  </Link>
                  <button onClick={(e) => { e.preventDefault(); logout(); }} className="text-[10px] text-lavender/50 hover:text-blood transition-colors uppercase font-bold tracking-widest flex items-center gap-1 justify-end w-full mt-0.5 cursor-pointer">
                    {dict.header.logout}
                  </button>
                </div>
                <Link href={`/${lang}/profile`}>
                  <img src={user.avatarUrl} alt="Avatar" className="w-9 h-9 rounded-lg border border-imperial/40 hover:border-imperial hover:shadow-[0_0_12px_rgba(96,81,155,0.5)] transition-all" />
                </Link>
              </div>
            ) : (
              <button 
                onClick={login}
                className="flex items-center gap-2 bg-[#171a21] hover:bg-[#2a475e] border border-[#2a475e] text-ivory px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
              >
                <LogIn size={16} /> <span className="hidden sm:block">{dict.header.login_steam}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ONBOARDING MODAL */}
      {showSetup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative p-[1px] rounded-[1.5rem] bg-gradient-to-br from-imperial/60 to-transparent max-w-md w-full shadow-glass-glow">
            <div className="bg-[#09090f]/95 rounded-[calc(1.5rem-1px)] p-8 flex flex-col gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-imperial/20 border border-imperial/50 rounded-xl flex items-center justify-center mx-auto text-imperial mb-4">
                  <User size={24} />
                </div>
                <h3 className="text-xl font-black text-ivory tracking-widest uppercase">CREATE UNIQUE PROFILE</h3>
                <p className="text-xs text-lavender mt-2 leading-relaxed">
                  Пожалуйста, введите ваш никнейм. Только английские буквы, цифры, знаки подчёркивания (_) и дефисы (-).
                </p>
              </div>
              <form onSubmit={handleSetupName} className="flex flex-col gap-4">
                <input type="text" maxLength={15} value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="e.g. AimGod_143" className="w-full bg-black/50 border border-imperial/30 hover:border-imperial/60 focus:border-imperial text-ivory rounded-lg p-3 text-sm font-bold outline-none text-center tracking-wider transition-all" />
                {errorMsg && <p className="text-xs text-red-400 bg-red-950/40 p-2.5 rounded border border-red-500/20 text-center font-bold">{errorMsg}</p>}
                <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-imperial/30 hover:bg-imperial/50 border border-imperial/50 text-ivory text-xs font-black tracking-widest uppercase rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(96,81,155,0.3)] cursor-pointer">
                  {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : 'CONFIRM USERNAME'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
</file>

<file path="src/dictionaries/en.json">
{
  "header": {
    "converter": "Converter",
    "reaction": "Reaction Tester",
    "benchmarks": "Benchmarks",
    "tournaments": "Tournaments",
    "routines": "Routines",
    "login_steam": "Login via Steam",
    "profile": "Profile",
    "logout": "Logout"
  },
  "home": {
    "title": "WELCOME TO 143",
    "subtitle": "Select a module to begin",
    "mod_converter_title": "Sens Converter",
    "mod_converter_desc": "Instant sensitivity conversion between 15+ games",
    "mod_reaction_title": "Reaction Tester",
    "mod_reaction_desc": "Cognitive tests and reaction speed simulator built on WebGL",
    "coming_soon": "Coming Soon"
  },
  "converter": {
    "title": "Sens Converter",
    "desc": "Ultra-precise mouse sensitivity conversion",
    "tab_cm": "CM/360 TO GAME",
    "tab_g2g": "GAME TO GAME",
    "sub_cm2game": "CM TO GAME",
    "sub_game2cm": "GAME TO CM",
    "game": "Game:",
    "from_game": "From game:",
    "to_game": "To game:",
    "sens": "Sensitivity:",
    "dpi": "Mouse DPI:",
    "target_cm": "Target CM/360 Distance:",
    "result": "RESULT:",
    "distance": "DISTANCE ON MOUSEPAD:",
    "config": "FOR CONFIG FILE",
    "feels_like": "FEELS LIKE"
  },
  "reaction": {
    "title": "Reaction Tester",
    "desc": "Hardware-accelerated cognitive test simulator",
    "mode_simple": "Simple",
    "mode_choice": "Choice",
    "mode_flick": "Flick",
    "mode_combined": "Combined",
    "mode_strafe": "Strafe React",
    "click_to_start": "CLICK TO START",
    "wait": "WAIT FOR GREEN...",
    "click_now": "CLICK!",
    "too_soon": "TOO SOON! CLICK TO CONTINUE",
    "avg": "Average:",
    "ms": "ms",
    "save": "Save Record",
    "attempts": "Attempts:"
  }
}
</file>

<file path="src/dictionaries/getDictionary.ts">
const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  ru: () => import('./ru.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'ru') => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};
</file>

<file path="src/dictionaries/ru.json">
{
  "header": {
    "converter": "Конвертер",
    "reaction": "Тестер реакции",
    "benchmarks": "Бенчмарки",
    "tournaments": "Турниры",
    "routines": "Рутины",
    "login_steam": "Войти через Steam",
    "profile": "Профиль",
    "logout": "Выйти"
  },
  "home": {
    "title": "ДОБРО ПОЖАЛОВАТЬ В 143",
    "subtitle": "Выберите модуль для начала работы",
    "mod_converter_title": "Sens Converter",
    "mod_converter_desc": "Моментальная конвертация чувствительности между 15+ играми",
    "mod_reaction_title": "Reaction Tester",
    "mod_reaction_desc": "Когнитивные тесты и симулятор скорости реакции на базе WebGL",
    "coming_soon": "Скоро"
  },
  "converter": {
    "title": "Sens Converter",
    "desc": "Сверхточная конвертация чувствительности мыши",
    "tab_cm": "CM/360 в Игру",
    "tab_g2g": "Из Игры в Игру",
    "sub_cm2game": "CM В ИГРУ",
    "sub_game2cm": "ИГРА В CM",
    "game": "Игра:",
    "from_game": "Из игры:",
    "to_game": "В игру:",
    "sens": "Чувствительность:",
    "dpi": "DPI мыши:",
    "target_cm": "Целевая дистанция CM/360:",
    "result": "РЕЗУЛЬТАТ:",
    "distance": "ДИСТАНЦИЯ НА КОВРИКЕ:",
    "config": "ДЛЯ ФАЙЛА КОНФИГА",
    "feels_like": "ОЩУЩАЕТСЯ КАК"
  },
  "reaction": {
    "title": "Reaction Tester",
    "desc": "Hardware-accelerated симулятор когнитивных тестов",
    "mode_simple": "Simple",
    "mode_choice": "Choice",
    "mode_flick": "Flick",
    "mode_combined": "Combined",
    "mode_strafe": "Strafe React",
    "click_to_start": "КЛИКНИТЕ ДЛЯ СТАРТА",
    "wait": "ЖДИТЕ ЗЕЛЕНЫЙ...",
    "click_now": "КЛИК!",
    "too_soon": "СЛИШКОМ РАНО! КЛИКНИТЕ ЧТОБЫ ПРОДОЛЖИТЬ",
    "avg": "Среднее:",
    "ms": "мс",
    "save": "Сохранить рекорд",
    "attempts": "Попытки:"
  }
}
</file>

<file path="src/lib/prisma.ts">
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Берем ссылку на базу из вашего .env
const connectionString = process.env.DATABASE_URL;

// Создаем пул соединений с обязательным включением SSL (Требование Supabase)
const pool = new Pool({ 
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

const adapter = new PrismaPg(pool);

// Инициализируем клиента
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
</file>

<file path="src/proxy.ts">
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['en', 'ru'];
const defaultLocale = 'en';

// Обратите внимание: функция теперь называется proxy!
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Проверяем, есть ли уже язык в ссылке
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) {
    return NextResponse.next();
  }
 
  // Если языка нет, перекидываем на английский по умолчанию
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}
 
export const config = {
  matcher: [
    // Игнорируем системные пути Next.js и картинки
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
</file>

<file path="tsconfig.json">
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
</file>

</files>
