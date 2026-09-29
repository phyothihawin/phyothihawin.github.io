<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project: phthwn-portfolio

Personal portfolio for Phyo Thiha Win (Software Engineer). A single-page, statically exported Next.js site: one route (`/`), no backend, no database, no tests, no TypeScript.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19, plain JavaScript (`.js`, `jsconfig.json` only; `@/*` maps to the repo root)
- Tailwind CSS v4 (CSS-first config in `app/globals.css`; no `tailwind.config.js`)
- GSAP + ScrollTrigger for animation, `lucide-react` for icons
- Fonts via `next/font/google`: Inter (`--font-inter`) and Roboto Mono (`--font-roboto-mono`)
- Package manager: **npm** (`package-lock.json` is the only lockfile; don't add `pnpm-lock.yaml`, `yarn.lock` or `pnpm-workspace.yaml`)

## Commands

```bash
npm install       # install dependencies (CI uses `npm ci`)
npm run dev       # dev server on http://localhost:3000
npm run build     # static export -> ./out
npm run lint      # eslint (flat config, eslint-config-next/core-web-vitals)
```

There is no `test` script. To check a change, run `npm run lint` and `npm run build`, and look at the page in a browser (`npm run dev`); animations, theme switching and the mobile layout can't be verified from a build alone.

## Deployment constraints (static export)

- `next.config.mjs` sets `output: 'export'` and `images.unoptimized: true`. Build output is `out/`.
- Pushes to `main` trigger `.github/workflows/deploy.yml` (Node 22, `npm ci`, then `npm run build`, upload `./out` to GitHub Pages). `npm ci` fails if `package.json` and `package-lock.json` disagree, so always commit them together.
- Everything must work without a server: no API routes/route handlers that read requests, no middleware/proxy, no Server Actions, no `cookies()`/`headers()`, no ISR, no dynamic routes without `generateStaticParams`. Check `node_modules/next/dist/docs/01-app/02-guides/static-exports.md` before using a Next feature you're unsure about.
- There is no `basePath`; assets are referenced root-relative (e.g. `/assets/PhyoThihaWin-MobileDeveloper.pdf`).

## Layout

```
app/layout.js        Root layout: fonts, metadata, pre-hydration theme script, ambient background blobs, <ThemeProvider>
app/page.js          Composes the sections in order (the only route)
app/globals.css      Tailwind import, dark variant, theme tokens, custom keyframes, .glass-panel and terminal-tilt utilities
components/
  Navbar.js          Fixed top bar, anchor links, theme toggle, mobile menu (click-outside closes it)
  Hero.js            #home — GSAP intro, name-letter stagger, tilted terminal mockup (md+ only), resume link
  HeroBackground.js  Canvas starfield + interactive grid (desktop only), ambient glow blobs
  Profile.js         #profile — bio, languages, education
  TechStack.js       #tech
  Experience.js      #experience
  Projects.js        #projects
  Contact.js         #contact
  ThemeProvider.js   Theme context (`useTheme`) — light/dark
public/assets/       Resume PDF, profile photo, circles.png
public/app-ads.txt   Ad-network verification file — leave as is
```

Section order in `app/page.js` is Navbar → Hero → Profile → TechStack → Experience → Projects → Contact.

## Conventions

- **Every component is a Client Component** (`"use client"` at the top) because each uses hooks and/or GSAP. Keep new animated or stateful components the same way; only `app/layout.js` and `app/page.js` are Server Components.
- **Content is hard-coded** as arrays/objects inside each component (`experiences`, `projects`, `techCategories`, …). There is no CMS or data layer. To change what the site says, edit the array in that component.
- **`README.md` mirrors the site content** (bio, tech stack, experience, projects, contact) as markdown. When you change resume content in a component, update `README.md` to match, and vice versa. The resume PDF in `public/assets/` is separate; flag it if the content changes materially.
- **Navbar links must match section ids**: `home`, `profile`, `tech`, `experience`, `projects`, `contact`. Navbar duplicates the list for desktop and mobile; update both.
- **Dark mode** is class-based: `@custom-variant dark (&:where(.dark, .dark *))` in `globals.css`. The `dark` class and `data-theme` attribute on `<html>` are set in two places that must stay in sync: the inline script in `app/layout.js` (before hydration, avoids flash) and `toggleTheme` in `ThemeProvider.js`. Preference persists in `localStorage["theme"]`. `<html>` has `suppressHydrationWarning` for this reason. `HeroBackground` reads the `dark` class directly from the DOM each frame.
- **Styling**: Tailwind utility classes inline, always with a `dark:` counterpart for colours. Palette is zinc-based monochrome. Use the `.glass-panel` utility for cards. Custom animations (`animate-blob`, `animate-pulse-glow`, …) are defined in `globals.css`.
- **Animation pattern**: each section makes a `useRef` for the section, title and items, and in a single `useEffect(..., [])` builds a `gsap.timeline` with `scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }`, using `fromTo` for the title then a staggered `fromTo` for `itemsRef.current`. Items are collected via `ref={el => itemsRef.current[index] = el}`.
- **Section headings** carry a mono index number: `01.` Profile, `.02` Tech Stack (right-aligned title, number trails), `03.` Experience, `04.` Projects. Contact has none. `README.md` numbers Contact `05.`; keep numbering consistent if you add or reorder a section.
- **Mobile performance matters** (see recent commits): the canvas in `HeroBackground` doesn't run below 768px, decorative animations are `md:`-prefixed, and heavy `backdrop-blur` is avoided on small screens. Don't add always-on animation or large blur effects that run on phones.
- Icons: `lucide-react` for general icons; the Play Store / App Store glyphs in `Projects.js` are inline SVGs.
- Follow the existing style: 2-space indentation, double quotes, semicolons, default-exported function components.

## Known gotchas

- **ScrollTrigger is registered in one place only.** `gsap.registerPlugin(ScrollTrigger)` is called in `components/Profile.js`. `TechStack`, `Experience`, `Projects` and `Contact` import `ScrollTrigger` but never register it; they work only because `Profile` is imported by `app/page.js` and evaluates first. If you add a section that uses `scrollTrigger`, or reorder/remove `Profile`, register the plugin explicitly in that file (or centralise it).
- **No GSAP cleanup.** No component reverts its tweens or ScrollTriggers on unmount (`gsap.context`/`useGSAP` aren't used). With a single static page this is harmless in production, but in dev, React Strict Mode double-runs effects, so expect duplicate tweens there. Add cleanup if you introduce anything that mounts/unmounts.
- **Lint is not clean at baseline** (29 problems, identical on Next 16.2.10 and 16.3.7): 27 × `react/no-unescaped-entities` (25 in `Hero.js`, mostly the quoted strings in the terminal mockup; 2 in `Contact.js`), 1 × `@next/next/no-img-element` warning (`Profile.js` uses `<img>`), 1 × `react-hooks/set-state-in-effect` (`ThemeProvider.js`). Don't treat these as regressions, but don't add new ones; compare counts before/after your change.
- `public/` still contains unused create-next-app leftovers (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`). Nothing references them.
- `.env*` is gitignored. Nothing in the app needs environment variables; don't add secrets to the repo. Contact details in the UI (email, phone) are intentionally public.

## Upgrading Next.js

- `next` and `eslint-config-next` are pinned to the **same exact version** in `package.json` (no `^`). Upgrade them together, keep them exact, and use npm so the lockfile is updated: `npm install --save-exact next@<v>` then `npm install -D --save-exact eslint-config-next@<v>`. `react`/`react-dom` are also exact-pinned; `next` 16 accepts React `^18.2 || ^19`.
- Node must satisfy Next's `engines` (`>=20.9.0` for 16.3); CI uses Node 22.
- Read the bundled upgrade guide first: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`.
- Verify with lint (compare against the baseline above) and a full `next build`; the export must still produce `out/index.html` and the static assets.
- Since Next 16.3, `next dev` auto-creates/updates `AGENTS.md` and `CLAUDE.md` (the `@AGENTS.md` import) when it detects an AI agent. Content outside the `nextjs-agent-rules` markers is preserved.
