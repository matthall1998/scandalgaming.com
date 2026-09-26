import Swiper from "swiper";
import { A11y, Autoplay, EffectFade, Navigation } from "swiper/modules";
import { createIcons, Pause, Play } from "lucide";
import "swiper/css";
import "swiper/css/effect-fade";

export function setupBackgroundSlider() {
  const gallery = document.querySelector<HTMLElement>(".hero-gallery")!;
  const toggle = document.querySelector<HTMLButtonElement>(".slide-toggle")!;
  const count = document.querySelector<HTMLElement>(".slide-count")!;
  const controls = document.querySelector<HTMLElement>(".slider-controls")!;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = reducedMotion.matches;
  const slider = new Swiper(gallery, {
    modules: [A11y, Autoplay, EffectFade, Navigation],
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: reducedMotion.matches ? 0 : 1600,
    loop: true,
    allowTouchMove: false,
    autoplay: { delay: 8000, disableOnInteraction: false },
    navigation: { prevEl: ".slide-previous", nextEl: ".slide-next" },
    a11y: {
      enabled: true,
      slideLabelMessage: "Screenshot {{index}} of {{slidesLength}}",
    },
    on: {
      slideChange(swiper) {
        count.textContent = `${String(swiper.realIndex + 1).padStart(2, "0")} / ${String(swiper.slides.length).padStart(2, "0")}`;
      },
    },
  });

  function syncPlayback() {
    const stopped = paused || document.hidden;
    gallery.classList.toggle("is-paused", stopped);
    if (stopped) slider.autoplay.stop();
    else slider.autoplay.start();
    const label = paused ? "Play slideshow" : "Pause slideshow";
    toggle.setAttribute("aria-label", label);
    toggle.title = label;
    toggle.innerHTML = `<i data-lucide="${paused ? "play" : "pause"}" aria-hidden="true"></i>`;
    createIcons({ icons: { Pause, Play }, root: toggle });
  }

  toggle.addEventListener("click", () => {
    paused = !paused;
    syncPlayback();
  });
  controls.addEventListener("focusin", (event) => {
    if (!paused && event.target !== toggle) {
      paused = true;
      syncPlayback();
    }
  });
  reducedMotion.addEventListener("change", () => {
    paused = reducedMotion.matches;
    slider.params.speed = reducedMotion.matches ? 0 : 1600;
    syncPlayback();
  });
  document.addEventListener("visibilitychange", syncPlayback);
  syncPlayback();
  if (import.meta.hot) import.meta.hot.dispose(() => slider.destroy());
}
