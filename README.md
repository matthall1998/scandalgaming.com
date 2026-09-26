# Scandal Gaming

A static, mobile-first Counter-Strike 1.6 community site built with Vite and TypeScript. No backend or analytics required.

## Develop and deploy

Requires Node.js 22.12+ (or a compatible newer release).

```sh
npm ci
npm run dev -- --host 127.0.0.1
npm run build
npm run preview -- --host 127.0.0.1
```

Deploy `dist/` to any static HTTPS host. The build includes TypeScript checking. HTTPS is required for the Clipboard API; when copying is unavailable the command is selected for manual copying.

## Site configuration

Edit `src/site.ts`:

- `discordUrl` is set to `https://discord.scandalgaming.com`. Change it here to update the Discord links. Setting it to `null` disables the Join Discord buttons and displays explicit placeholder messages.
- Edit `serverAddress` to change the connection command, Steam link, and footer together.
- Edit `maps` to update the map rotation.
- Edit `backgrounds` to reorder the hero screenshots. The scene names describe the captures, not verified map filenames.

These are trusted, developer-maintained values, not user input. Keep the canonical and social URLs and the no-JavaScript fallback in `index.html` in sync if the domain or server changes. No live player counts or server-status claims are made.

## Visual assets

The hero uses five supplied Counter-Strike screenshots. Full-resolution PNG originals are preserved in `BACKGROUNDS/` with descriptive names: `pumpkin-path`, `moonlit-courtyard`, `horror-entrance`, `cobwebbed-room`, and `iron-gate`. The site owner is responsible for permission to publish supplied game imagery.

Run `npm run images:optimize` to regenerate the assets in `public/images/backgrounds/`. The Sharp pipeline crops HUD-heavy top/bottom edges in the exports only, strips metadata, and creates 1920px-wide desktop WebP and 720x960 mobile WebP versions. It also generates a JPEG social preview. Original PNGs are never recompressed. The five desktop exports total about 245 KB; mobile exports total about 107 KB, compared with about 39 MB of source PNGs.

The Swiper hero crossfades every eight seconds with a subtle 2%-7.5% zoom and horizontal drift. Previous/next and pause/play controls are keyboard accessible. Playback pauses when navigating with the controls or hiding the tab. Reduced-motion preferences disable automatic playback, fades, and zoom; manual navigation remains available. Timing is in `src/background-slider.ts`; motion styling is in `src/site.css`.

Barlow and Barlow Condensed are self-hosted through Fontsource (SIL Open Font License). Interface icons are from Lucide (ISC license).
