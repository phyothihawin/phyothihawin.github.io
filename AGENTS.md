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
- GSAP + ScrollTrigger for animation (registered once in `lib/gsap.js`), `lucide-react` for icons
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

**Verifying animation in a hidden or headless browser pane:** such panes throttle or stop `requestAnimationFrame`, so GSAP timelines and CSS transitions freeze or crawl (GSAP's lag smoothing makes a 1 fps page run ~30x slow). Don't judge motion by waiting. Instead temporarily expose GSAP (e.g. `window.__gsap = gsap` in `lib/gsap.js`), fast-forward with `gsap.globalTimeline.getChildren(false, true, true).forEach(t => t.progress(1))`, and assert on DOM/computed state. Skip infinite tweens and `gsap.quickTo` tweens when fast-forwarding (quickTo's initial dummy tween gets pushed to `+=0.1`). Remove the hook before committing; it must never ship.

## Deployment constraints (static export)

- `next.config.mjs` sets `output: 'export'` and `images.unoptimized: true`. Build output is `out/`.
- Pushes to `main` trigger `.github/workflows/deploy.yml` (Node 22, `npm ci`, then `npm run build`, upload `./out` to GitHub Pages). `npm ci` fails if `package.json` and `package-lock.json` disagree, so always commit them together.
- Everything must work without a server: no API routes/route handlers that read requests, no middleware/proxy, no Server Actions, no `cookies()`/`headers()`, no ISR, no dynamic routes without `generateStaticParams`. Check `node_modules/next/dist/docs/01-app/02-guides/static-exports.md` before using a Next feature you're unsure about.
- There is no `basePath`; assets are referenced root-relative (e.g. `/assets/PhyoThihaWin-MobileDeveloper.pdf`).

## Layout

```
app/layout.js        Root layout: fonts, metadata, pre-hydration script (adds `js` class + theme), ambient background blobs,
                     <ThemeProvider>, <ScrollProgress />, <Spotlight />
app/page.js          Composes the sections in order (the only route)
app/globals.css      Tailwind import, dark variant, accent tokens, keyframes, .glass-panel / .spotlight / terminal-tilt,
                     hero pre-hide rules, view-transition + reduced-motion rules
lib/
  gsap.js            The one place GSAP + ScrollTrigger are imported/registered (import from here, not from "gsap")
  useGsap.js         useGsap(scopeRef, setup): scoped gsap.matchMedia with auto-revert and reduced-motion / pointer conditions
  useReveal.js       useReveal(scopeRef): data-attribute driven scroll reveals + timeline progress for a section
components/
  Navbar.js          Fixed top bar; NAV_LINKS list drives desktop + mobile menus; active-section highlight; animated mobile menu
  Hero.js            #home — orchestrated intro timeline, typed role + terminal command, pointer-tilting terminal (md+, mouse only)
  HeroBackground.js  Canvas starfield + interactive grid (desktop only, paused off-screen), ambient glow blobs
  Profile.js         #profile — bio, languages, education timeline, social links
  TechStack.js       #tech
  Experience.js      #experience — timeline
  Projects.js        #projects
  Contact.js         #contact
  SectionHeading.js  Numbered section heading + underline rule (animated by useReveal)
  ScrollProgress.js  Top reading-progress bar + back-to-top button with progress ring
  Spotlight.js       Delegated pointer listener feeding --mx/--my to `.spotlight` cards
  ThemeProvider.js   Theme context (`useTheme`); theme read from the <html> class; toggle uses a View Transition when available
  BrandIcons.js      Inline SVG brand glyphs (GitHub, LinkedIn, WhatsApp, Play Store, App Store)
public/assets/       Resume PDF, profile photo, circles.png
public/app-ads.txt   Ad-network verification file — leave as is
```

Section order in `app/page.js` is Navbar → Hero → Profile → TechStack → Experience → Projects → Contact.

## Conventions

- **Every component is a Client Component** (`"use client"` at the top) because each uses hooks and/or GSAP. Keep new animated or stateful components the same way; only `app/layout.js` and `app/page.js` are Server Components.
- **Content is hard-coded** as arrays/objects at the top of each component file (`experiences`, `projects`, `techCategories`, `socials`, `education`, …). There is no CMS or data layer. To change what the site says, edit the array.
- **`README.md` mirrors the site content** (bio, tech stack, experience, projects, contact) as markdown. When you change resume content in a component, update `README.md` to match, and vice versa. The resume PDF in `public/assets/` is separate; flag it if the content changes materially.
- **Navbar links must match section ids**: `home`, `profile`, `tech`, `experience`, `projects`, `contact`. Edit `NAV_LINKS` in `Navbar.js` (one list drives desktop and mobile, and the active-section highlight observes those ids).
- **Dark is the default theme.** With nothing saved in `localStorage["theme"]` the site is dark, regardless of the OS colour-scheme preference; only a saved `"light"` overrides it. `app/layout.js` also server-renders `dark` on `<html>` so visitors without JS get dark. Don't reintroduce `prefers-color-scheme` detection.
- **Dark mode** is class-based: `@custom-variant dark (&:where(.dark, .dark *))` in `globals.css`. The `dark` class and `data-theme` attribute on `<html>` are set in two places that must stay in sync: the inline script in `app/layout.js` (before hydration, avoids flash) and `applyTheme` in `ThemeProvider.js`. Preference persists in `localStorage["theme"]`. `<html>` has `suppressHydrationWarning` for this reason. `ThemeProvider` derives `theme` from the `<html>` class with `useSyncExternalStore` (there is no separate React state). The navbar icon swap uses CSS `dark:` variants, not `theme`. `HeroBackground` reads the `dark` class directly from the DOM each frame.
- **Styling**: Tailwind utility classes inline, always with a `dark:` counterpart for colours. Palette is zinc-based monochrome; the indigo→cyan accent (`from-accent-from` / `to-accent-to`, `stroke-accent-from`) is reserved for progress and active states (scroll bar, nav underline, timelines, focus ring). Use Tailwind's real zinc shades only (50–950); classes like `zinc-550` don't exist and silently do nothing. Cards use `.glass-panel`, plus `.spotlight` for the cursor glow.
- **Animation pattern**: don't hand-write timelines per section. Call `useReveal(sectionRef)` (from `lib/useReveal.js`) and mark up with data attributes: `<SectionHeading>` for the title (`data-reveal-title` / `data-reveal-rule`), `data-reveal-item` on cards/blocks (revealed individually as they scroll in, staggered), `data-timeline` + `data-timeline-line` + `data-timeline-item` for timelines (nodes go `data-active="true"` and style with `group-data-[active=true]:`). One-off, bespoke animation (like `Hero.js`) goes through `useGsap(ref, ({ motionOk, finePointer }) => { ... })`, never a bare `useEffect` + `gsap`, so it is reverted on unmount and skipped for reduced motion. Import `gsap`/`ScrollTrigger` from `@/lib/gsap`.
- **Reduced motion**: GSAP work is gated on `motionOk` inside `useGsap`; CSS animation/transition is neutralised by the `prefers-reduced-motion` block in `globals.css`. Content must be visible by default. Anything hidden up front for an entrance (`[data-hero-in]`, `[data-hero-terminal]`, `.name-char`, `[data-term-line]`) is hidden by CSS only when the `js` class (added by the inline script) is present *and* motion is allowed. Don't hide content with inline styles or unconditional CSS.
- **GSAP vs Tailwind on the same element**: Tailwind v4 uses the individual `translate` / `scale` / `rotate` CSS properties, and GSAP folds those into its own `transform` when it first animates an element. `useReveal` clears its inline `opacity`/`transform` (`clearProps`) when a reveal finishes, so hover utilities keep working; keep doing that for any new reveal. `.glass-panel` transitions `background-color`, `border-color`, `box-shadow` and `translate` only, never `opacity`/`transform`, so it doesn't fight GSAP.
- **Mobile performance matters** (see recent commits): the canvas in `HeroBackground` doesn't run below 768px (or with reduced motion) and pauses while off-screen, decorative animations are `md:`-prefixed, and heavy `backdrop-blur` is avoided on small screens. Don't add always-on animation or large blur effects that run on phones. Pointer effects (`Spotlight`, terminal tilt) only attach on `(hover: hover) and (pointer: fine)`.
- **Section headings** carry a mono index number: `01.` Profile, `.02` Tech Stack (right-aligned title, number trails), `03.` Experience, `04.` Projects. Contact has none. `README.md` numbers Contact `05.`; keep numbering consistent if you add or reorder a section.
- Icons: `lucide-react` for general icons; brand glyphs come from `components/BrandIcons.js`.
- Follow the existing style: 2-space indentation, double quotes, semicolons, default-exported function components. Escape apostrophes in JSX text (`&apos;`); ESLint enforces it.

## Known gotchas

- **`gsap.quickTo` ignores property aliases.** Use `rotationX` / `rotationY` / `x` / `y`, not `rotateX` / `rotateY` / `scale`; an alias makes it silently do nothing. (`gsap.set` / `gsap.to` accept aliases; use those for one-off changes such as scale.)
- **The terminal's resting pose lives in two places** that must match: `TILT` in `Hero.js` and `.terminal-tilt` in `globals.css`. The CSS version is what touch devices and reduced-motion users see, and it is written in GSAP's compose order (`rotate` → `rotateY` → `rotateX`) so the handoff to GSAP doesn't jump.
- **Theme toggle with View Transitions**: the `<html>` class changes on the next frame, so `toggleTheme` tracks the pending theme in a ref (fast double-clicks would otherwise lose a toggle), and it must catch `transition.ready` (it rejects when a transition is skipped). `html.theme-switching` disables CSS transitions for the duration.
- **Lint is clean (0 problems); keep it that way.** `react-hooks/set-state-in-effect` is enforced, so don't call `setState` synchronously in an effect body (subscribe to external state with `useSyncExternalStore`, or set state from callbacks/observers).
- `public/` still contains unused create-next-app leftovers (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`). Nothing references them.
- `.env*` is gitignored. Nothing in the app needs environment variables; don't add secrets to the repo. Contact details in the UI (email, phone) are intentionally public.

## Upgrading Next.js

- `next` and `eslint-config-next` are pinned to the **same exact version** in `package.json` (no `^`). Upgrade them together, keep them exact, and use npm so the lockfile is updated: `npm install --save-exact next@<v>` then `npm install -D --save-exact eslint-config-next@<v>`. `react`/`react-dom` are also exact-pinned; `next` 16 accepts React `^18.2 || ^19`.
- Node must satisfy Next's `engines` (`>=20.9.0` for 16.3); CI uses Node 22.
- Read the bundled upgrade guide first: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`.
- Verify with lint (must stay at 0 problems) and a full `next build`; the export must still produce `out/index.html` and the static assets.
- Since Next 16.3, `next dev` auto-creates/updates `AGENTS.md` and `CLAUDE.md` (the `@AGENTS.md` import) when it detects an AI agent. Content outside the `nextjs-agent-rules` markers is preserved.
