// Hero background: rows of small square "pixels" riding layered sine waves, drawn on a
// canvas. Rows further back are smaller and dimmer, colour shifts violet → cyan across the
// width, and the pointer lifts the wave a little. Pauses off screen and when the tab is
// hidden; with reduced motion it draws a single still frame.

const ROWS = 26;
const VIOLET = [139, 92, 246];
const CYAN = [56, 189, 248];

export function initHeroWaves(canvas, { reduceMotion }) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let step = 12;
  let frame = 0;
  let running = false;
  let visible = true;
  let pointerX = 0;
  let pointerY = 0;
  let pointerInside = false;
  let lift = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    step = width < 640 ? 14 : 11;
  }

  function draw(time) {
    const t = time / 1000;
    ctx.clearRect(0, 0, width, height);
    lift += ((pointerInside ? 1 : 0) - lift) * 0.05;

    for (let row = 0; row < ROWS; row++) {
      const depth = row / (ROWS - 1); // 0 = back, 1 = front
      const baseY = height * (0.38 + depth * 0.4);
      const amplitude = height * (0.04 + depth * 0.07);
      const size = 1.2 + depth * 2;
      const rowAlpha = 0.25 + depth * 0.75;

      for (let x = -step; x <= width + step; x += step) {
        const u = x / width;
        let y =
          baseY +
          Math.sin(u * 5.2 + t * 0.55 + row * 0.32) * amplitude +
          Math.sin(u * 11.5 - t * 0.35 + row * 0.18) * amplitude * 0.35;

        if (lift > 0.01) {
          const dx = x - pointerX;
          const dy = y - pointerY;
          y -= Math.exp(-(dx * dx + dy * dy) / 26000) * 28 * lift * (0.4 + depth);
        }

        // Crests glow brighter than troughs.
        const crest = 0.55 + 0.45 * Math.sin(u * 5.2 + t * 0.55 + row * 0.32 + Math.PI / 2);
        const mix = Math.min(1, Math.max(0, u * 0.9 + depth * 0.25 - 0.1));
        const r = Math.round(VIOLET[0] + (CYAN[0] - VIOLET[0]) * mix);
        const g = Math.round(VIOLET[1] + (CYAN[1] - VIOLET[1]) * mix);
        const b = Math.round(VIOLET[2] + (CYAN[2] - VIOLET[2]) * mix);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(rowAlpha * crest).toFixed(3)})`;
        ctx.fillRect(x, y, size, size);
      }
    }
  }

  function loop(time) {
    draw(time);
    frame = requestAnimationFrame(loop);
  }

  function update() {
    const shouldRun = visible && !document.hidden && !reduceMotion.matches;
    if (shouldRun && !running) {
      running = true;
      frame = requestAnimationFrame(loop);
    } else if (!shouldRun && running) {
      running = false;
      cancelAnimationFrame(frame);
    }
    if (!shouldRun) draw(8000);
  }

  resize();
  draw(8000);

  if ("ResizeObserver" in window) {
    new ResizeObserver(() => {
      resize();
      if (!running) draw(8000);
    }).observe(canvas);
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }).observe(canvas);
  }

  const hero = canvas.closest("[data-hero]");
  if (hero && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    hero.addEventListener(
      "pointermove",
      (event) => {
        const rect = canvas.getBoundingClientRect();
        pointerX = event.clientX - rect.left;
        pointerY = event.clientY - rect.top;
        pointerInside = true;
      },
      { passive: true },
    );
    hero.addEventListener("pointerleave", () => {
      pointerInside = false;
    });
  }

  document.addEventListener("visibilitychange", update);
  reduceMotion.addEventListener("change", update);
  update();
}
