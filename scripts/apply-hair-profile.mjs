import fs from "node:fs";
import site from "../site-data.mjs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";
const layoutPath = "app/layout.tsx";

let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");
let layout = fs.readFileSync(layoutPath, "utf8");

const desktopHero = site.images?.heroDesktop || site.images?.portrait;

source = source
  .replaceAll("Маникюр и педикюр от Елены Строгановой · Москва", "Стрижки и окрашивание · Москва")
  .replaceAll("мастер маникюра и педикюра", "парикмахер-колорист")
  .replaceAll("Индивидуальная работа мастера", "Стрижки · окрашивание · уход")
  .replaceAll("Telegram", "WhatsApp")
  .replaceAll("Личный WhatsApp", "WhatsApp");

source = source
  .replace(
    '<div><p className="mct-section-kicker">О мастере</p><h2>Мастер, к которому возвращаются</h2></div>',
    '<div><p className="mct-section-kicker">О мастере</p><h2>Мастер Елена</h2></div>',
  )
  .replace(
    '<p className="mct-about-lead">Стрижки, окрашивание и работа с текстурой волос — с предварительным обсуждением результата.</p>',
    '<p className="mct-about-lead">Я Елена, парикмахер-колорист. Для меня важно, чтобы результат подходил именно вам — по форме, оттенку и тому, как вы привыкли носить волосы.</p>',
  )
  .replace(
    '<p>Клиенты особенно отмечают, что Елена внимательно слушает пожелания, помогает подобрать форму и оттенок и объясняет, как поддерживать результат дома.</p>',
    '<p>Перед работой я всегда обсуждаю желаемый результат и состояние волос. Если вижу, что выбранная техника может навредить качеству волос, предлагаю более безопасный вариант и объясняю почему.</p>',
  )
  .replace(
    '<p>Для сложного осветления при первом визите предусмотрен тест-прядь. В стоимость большинства окрашиваний входят расходники, мытьё и укладка.</p>',
    '<p>Работаю со стрижками, укладками, окрашиваниями и восстановлением волос. Перед сложным осветлением на первом визите делаю тест-прядь, а после процедуры подсказываю, как сохранить цвет и качество волос дома.</p>',
  )
  .replace(
    '<ul className="mct-about-list"><li>Стрижки и укладки</li><li>Сложные техники окрашивания</li><li>Уход и восстановление волос</li></ul>',
    '<ul className="mct-about-list"><li>Стрижки и укладки</li><li>Окрашивание и осветление</li><li>Уход и восстановление</li></ul>',
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

.mct-about-copy > .mct-about-lead {
  text-wrap: balance;
}

@media (max-width: 767px) {
  .mct-hero > .mct-shell {
    grid-template-rows: auto auto minmax(0, 1fr) auto !important;
  }

  .mct-hero-content {
    grid-row: 2;
    align-self: auto;
    padding: clamp(12px, 2.1svh, 19px) 0 0 !important;
  }

  .mct-hero-bottom {
    grid-row: 4;
  }

  .mct-hero-visual {
    display: none !important;
  }

  .mct-intro-mark span {
    max-width: calc(100vw - 36px);
    font-size: clamp(32px, 10vw, 44px) !important;
    letter-spacing: .01em !important;
    text-align: center;
    white-space: nowrap;
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

  .mct-about h2 {
    max-width: none !important;
    font-size: clamp(35px, 10.4vw, 45px) !important;
    line-height: .94 !important;
  }

  .mct-about-copy {
    padding: 23px 20px 20px !important;
  }

  .mct-about-copy > .mct-about-lead {
    max-width: 31ch;
    font-size: clamp(20px, 5.9vw, 23px) !important;
    line-height: 1.25 !important;
  }

  .mct-about-copy > p:not(.mct-about-lead) {
    font-size: 13px !important;
    line-height: 1.62 !important;
  }

  .mct-about-copy > p + p {
    padding-top: 14px !important;
  }

  .mct-about-list {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 0 !important;
    margin: 19px 0 0 !important;
    padding: 0 !important;
    border-top: 1px solid rgba(70, 55, 49, .13);
  }

  .mct-about-list li {
    display: flex !important;
    min-height: 42px;
    align-items: center;
    margin-top: 0 !important;
    padding: 0 !important;
    border-top: 0 !important;
    border-bottom: 1px solid rgba(70, 55, 49, .11);
    color: #514b47 !important;
    font-size: 10.5px !important;
    font-weight: 600 !important;
    line-height: 1.3 !important;
    letter-spacing: .025em;
    text-align: left !important;
  }

  .mct-about-list li:last-child {
    border-bottom: 0;
  }

  .mct-final-contact-grid > .mct-final-secondary:last-child {
    grid-column: 1 / -1 !important;
    width: 100% !important;
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

  .mct-about-copy > .mct-about-lead {
    max-width: 30ch;
  }
}
`;

fs.writeFileSync(componentPath, source, "utf8");
fs.writeFileSync(cssPath, css, "utf8");
fs.writeFileSync(layoutPath, layout, "utf8");
console.log("Elena hair profile applied.");
