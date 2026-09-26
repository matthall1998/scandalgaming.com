import "@fontsource/barlow/latin-400.css";
import "@fontsource/barlow/latin-500.css";
import "@fontsource/barlow/latin-600.css";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import {
  createIcons,
  ArrowUpRight,
  ArrowRight,
  Copy,
  Check,
  Terminal,
  Crosshair,
  MapPin,
  Zap,
  Users,
  MessageCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide";
import { site } from "./site";
import { setupBackgroundSlider } from "./background-slider";
import "./site.css";

const icon = (name: string) =>
  `<i data-lucide="${name}" aria-hidden="true"></i>`;
const discordAction = () =>
  site.discordUrl
    ? `<a class="button button-primary" href="${site.discordUrl}" target="_blank" rel="noopener noreferrer">${icon("message-circle")} Join Discord ${icon("arrow-up-right")}</a>`
    : `<button class="button button-primary" type="button" disabled aria-describedby="discord-placeholder">${icon("message-circle")} Join Discord ${icon("arrow-up-right")}</button>`;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="wordmark" href="#" aria-label="Scandal Gaming home"><span class="brand-mark">S<span>G</span></span><span>SCANDAL<span class="wordmark-light">GAMING</span></span></a>
    <nav aria-label="Main navigation"><a class="nav-link" href="#rotation">Map rotation</a><a class="nav-link" href="#server">The server</a><a class="nav-discord" href="${site.discordUrl ?? "#community"}">Discord ${icon("arrow-up-right")}</a></nav>
  </header>
  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-gallery swiper" aria-label="Server screenshots" aria-roledescription="carousel">
        <div class="swiper-wrapper">${site.backgrounds.map((background, index) => `<div class="swiper-slide"><picture><source media="(max-width: 650px)" srcset="/images/backgrounds/${background.file}-mobile.webp"><img src="/images/backgrounds/${background.file}.webp" alt="Counter-Strike 1.6 gameplay: ${background.name}" width="1920" height="594" fetchpriority="${index === 0 ? "high" : "low"}" decoding="async"></picture></div>`).join("")}</div>
      </div>
      <div class="hero-shade"></div>
      <div class="hero-content container">
        <p class="eyebrow"><span class="small-cross">+</span> COUNTER-STRIKE 1.6 <span class="eyebrow-divider">/</span> COMMUNITY SERVER</p>
        <h1 id="hero-title">SCANDAL<br><span>GAMING</span><span class="heading-period">.</span></h1>
        <p class="hero-tagline">Halloween never rotates out.</p>
        <p class="hero-description">24/7 Halloween maps. Team-aware bots.<br>Fast downloads. US East. Classic Counter-Strike.</p>
        <div class="hero-actions">${discordAction()}<a class="text-link" href="#connect">Join the server ${icon("arrow-right")}</a></div>
        <p class="invite-note" id="discord-placeholder">Discord invite coming soon <span>/</span> URL not yet configured</p>
      </div>
      <div class="hero-bottom container"><span><span class="accent-dot"></span> ALL HALLOWEEN. ALL THE TIME.</span><div class="slider-controls" role="group" aria-label="Background slideshow controls"><span class="slide-count" aria-live="off">01 / ${String(site.backgrounds.length).padStart(2, "0")}</span><button type="button" class="icon-button slide-previous" aria-label="Previous background" title="Previous background">${icon("chevron-left")}</button><button type="button" class="icon-button slide-toggle" aria-label="Pause slideshow" title="Pause slideshow">${icon("pause")}</button><button type="button" class="icon-button slide-next" aria-label="Next background" title="Next background">${icon("chevron-right")}</button></div></div>
    </section>
    <div class="server-strip" aria-label="Server highlights"><div class="container server-facts">
      <span>${icon("crosshair")} <strong>Counter-Strike 1.6</strong><span class="fact-detail">GoldSrc</span></span>
      <span>${icon("map-pin")} <strong>US East</strong><span class="fact-detail">Server region</span></span>
      <span>${icon("users")} <strong>Adaptive bots</strong><span class="fact-detail">Powered by YaPB</span></span>
      <span>${icon("zap")} <strong>FastDL enabled</strong><span class="fact-detail">Quick map downloads</span></span>
    </div></div>
    <section class="connect-section container" id="connect" aria-labelledby="connect-title">
      <div><p class="eyebrow section-kicker">READY WHEN YOU ARE</p><h2 id="connect-title">See you in the server.</h2><p>24/7 Halloween Maps | Bots | FastDL | US East</p></div>
      <div class="connect-controls"><div class="command-box">${icon("terminal")}<input id="connect-command" aria-label="Counter-Strike console connection command" readonly value="connect ${site.serverAddress}" spellcheck="false"><button id="copy-command" class="icon-button" aria-label="Copy connection command" title="Copy connection command">${icon("copy")}</button></div><div class="connect-meta"><span id="copy-status" role="status" aria-live="polite">Counter-Strike 1.6 console command</span><a href="steam://connect/${site.serverAddress}">Open in Steam ${icon("arrow-up-right")}</a></div></div>
    </section>
    <section class="rotation-section container" id="rotation" aria-labelledby="rotation-title">
      <div class="section-intro"><p class="eyebrow section-kicker">THE NIGHT SHIFT</p><h2 id="rotation-title">Six maps.<br>No daylight required.</h2><p>Haunted halls. Empty streets. Familiar corners with a darker side.</p><span class="rotation-count"><span class="accent-dot"></span> 6 MAPS IN ROTATION</span></div>
      <ol class="map-list">${site.maps.map((map, index) => `<li><span class="map-number">0${index + 1}</span><div><h3>${map.name}</h3><span class="map-filename">${map.file}</span></div><span class="map-type">${map.file.startsWith("de_") ? "DE" : map.file.startsWith("fy_") ? "FY" : "CS"}</span>${icon("crosshair")}</li>`).join("")}</ol>
    </section>
    <section class="details-section" id="server" aria-labelledby="details-title"><div class="container"><div class="details-heading"><p class="eyebrow section-kicker">CLASSIC GAME. GOOD COMPANY.</p><h2 id="details-title">The right kind of old-school.</h2></div><div class="feature-grid">
      <article><span class="feature-icon">${icon("users")}</span><h3>Bots that read the room.</h3><p>YaPB bots adapt their difficulty from team performance. Team-aware opposition, with the classic Counter-Strike feel.</p><span class="feature-label">TEAM-AWARE ADAPTIVE BOTS</span></article>
      <article><span class="feature-icon">${icon("zap")}</span><h3>Less downloading. More playing.</h3><p>FastDL is configured and active, so custom maps download quickly. Get into the rotation and back to the game.</p><span class="feature-label">FASTDL ENABLED</span></article>
      <article><span class="feature-icon">${icon("map-pin")}</span><h3>US East. Halloween, always.</h3><p>A Counter-Strike 1.6 / GoldSrc server dedicated to Halloween maps. Six maps on repeat, whatever the season.</p><span class="feature-label">24/7 HALLOWEEN ROTATION</span></article>
    </div></div></section>
    <section class="community-section container" id="community" aria-labelledby="community-title"><div><p class="eyebrow section-kicker">THE GAME IS BETTER WITH A CREW</p><h2 id="community-title">Find your people.<br>Then find your server.</h2><p>Discord is home base for the Scandal Gaming community.<br>Come for the maps. Stay for the people.</p></div><div class="community-action">${discordAction()}<p class="community-note">Discord invite coming soon.</p></div></section>
  </main>
  <footer class="site-footer container"><a class="footer-brand" href="#">SCANDAL GAMING<span>EST. AFTER DARK</span></a><p>Counter-Strike 1.6 community server.<br>Not affiliated with Valve Corporation.</p><span class="footer-address">${site.serverAddress}</span></footer>
`;

if (site.discordUrl) {
  document.querySelector("#discord-placeholder")?.remove();
  document.querySelector(".community-note")?.remove();
}

const icons = {
  ArrowUpRight,
  ArrowRight,
  Copy,
  Check,
  Terminal,
  Crosshair,
  MapPin,
  Zap,
  Users,
  MessageCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
};
createIcons({ icons });
setupBackgroundSlider();
const copyButton = document.querySelector<HTMLButtonElement>("#copy-command")!;
const commandInput =
  document.querySelector<HTMLInputElement>("#connect-command")!;
const copyStatus = document.querySelector<HTMLSpanElement>("#copy-status")!;
let resetTimer: ReturnType<typeof setTimeout> | undefined;

copyButton.addEventListener("click", async () => {
  clearTimeout(resetTimer);
  try {
    await navigator.clipboard.writeText(commandInput.value);
    copyStatus.textContent = "Connection command copied";
    copyButton.innerHTML = icon("check");
    copyButton.setAttribute("aria-label", "Connection command copied");
    createIcons({ icons });
  } catch {
    commandInput.focus();
    commandInput.select();
    copyStatus.textContent =
      "Copy unavailable. Command selected for manual copying.";
  }
  resetTimer = setTimeout(() => {
    copyStatus.textContent = "Counter-Strike 1.6 console command";
    copyButton.innerHTML = icon("copy");
    copyButton.setAttribute("aria-label", "Copy connection command");
    createIcons({ icons });
  }, 4000);
});
