import fs from "node:fs";
import site from "../site-data.mjs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";
const layoutPath = "app/layout.tsx";

let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");
let layout = fs.readFileSync(layoutPath, "utf8");

const desktopHero = site.images?.heroDesktop || site.images?.portrait;
const mobileHero = site.images?.heroMobile || site.images?.gallery?.[0]?.src || site.images?.portrait;

source = source
  .replaceAll("Маникюр и педикюр от Елены Строгановой · Москва", "Стрижки и окрашивание · Москва")
  .replaceAll("мастер маникюра и педикюра", "парикмахер-колорист")
  .replaceAll("Индивидуальная работа мастера", "Стрижки · окрашивание · уход")
  .replaceAll("Telegram", "WhatsApp")
  .replaceAll("Личный WhatsApp", "WhatsApp");

// The base header uses a Telegram paper-plane icon. Replace it with a neutral chat icon for WhatsApp.
source = source.replaceAll(
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /></svg>',
);

source = source.replace(
  `${site.reputation.reviewCount} оценок<br />Все отзывы на Яндексе →`,
  `${site.reputation.reviewCount} оценок<br />Отзывы на Яндексе →`,
);

// Keep the TANEM tab mark instead of using the portrait as a browser icon.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#111111"/>
  <path d="M16 18h32v7H36v24h-8V25H16z" fill="#ffffff"/>
</svg>\n`;
fs.writeFileSync("public/favicon.svg", favicon, "utf8");
if (site.images?.favicon) {
  layout = layout
    .replace(`icon: ${JSON.stringify(site.images.favicon)},`, 'icon: "/favicon.svg",')
    .replace(`shortcut: ${JSON.stringify(site.images.favicon)},`, 'shortcut: "/favicon.svg",');
}

css += `

/* Elena Stroganova — light hair profile */
:root {
  --tanem-hair-bg: #faf9f6;
  --tanem-hair-paper: #f5f1eb;
  --tanem-hair-ink: #282522;
  --tanem-hair-soft: #736c66;
  --tanem-hair-accent: #8a7468;
}

.mct-hero {
  background:
    radial-gradient(circle at 14% 10%, rgba(255,255,255,.96), transparent 36%),
    linear-gradient(145deg, var(--tanem-hair-bg), #f5f0e9) !important;
}

.mct-palette-stage {
  display: none !important;
}

.mct-eyebrow,
.mct-section-kicker {
  color: var(--tanem-hair-accent) !important;
}

.mct-main-cta,
.mct-final-cta,
.mct-sticky {
  background: #2e2a27 !important;
  color: #fff !important;
}

.mct-about,
.mct-visit,
.mct-services {
  background-color: var(--tanem-hair-bg);
}

@media (max-width: 767px) {
  .mct-hero > .mct-shell {
    grid-template-rows: auto auto minmax(154px, .78fr) auto !important;
  }

  .mct-hero-visual {
    min-height: 154px !important;
    margin: 8px 0 7px !important;
    overflow: hidden !important;
    border-radius: 24px;
    background: #ece7e1;
    box-shadow: 0 18px 42px rgba(54, 45, 39, .09);
  }

  .mct-hero-visual::before {
    position: absolute;
    inset: 0;
    z-index: 0;
    display: block;
    background:
      linear-gradient(180deg, rgba(255,255,255,.04), rgba(35,29,25,.1)),
      url("${mobileHero}") center 42% / cover no-repeat;
    content: "";
  }

  .mct-hero-visual::after {
    position: absolute;
    inset: auto 0 0;
    z-index: 1;
    height: 38%;
    background: linear-gradient(180deg, transparent, rgba(36,29,25,.08));
    content: "";
  }

  .dct-hero-portrait {
    display: none !important;
  }

  .mct-hero h1 em {
    color: #675a53 !important;
  }

  .mct-hero-copy {
    max-width: 34ch !important;
  }
}

@media (min-width: 768px) {
  .dct-hero-portrait {
    overflow: hidden !important;
    background:
      linear-gradient(180deg, rgba(255,255,255,.02), rgba(42,34,29,.05)),
      url("${desktopHero}") center / cover no-repeat !important;
  }

  .dct-hero-portrait > img {
    opacity: 0 !important;
  }

  .dct-hero-portrait figcaption {
    background: rgba(250, 248, 244, .88) !important;
    backdrop-filter: blur(12px);
  }

  .tanem-hero-title {
    max-width: 14ch !important;
  }
}
`;

fs.writeFileSync(componentPath, source, "utf8");
fs.writeFileSync(cssPath, css, "utf8");
fs.writeFileSync(layoutPath, layout, "utf8");
console.log("Elena hair profile applied.");
