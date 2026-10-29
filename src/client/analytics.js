// Privacy-friendly analytics. Loads the providers enabled in site.analytics (all
// cookieless, so no consent banner is needed) and sends them the same events.
// On localhost nothing is sent: events are logged to the console instead, and
// `?analytics=debug` logs them on any host.
const config = JSON.parse(document.getElementById("analytics-config")?.textContent || "{}");
const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
const debug = isLocal || new URLSearchParams(location.search).get("analytics") === "debug";

function loadScript(src, attributes = {}) {
  const script = document.createElement("script");
  script.defer = true;
  script.src = src;
  for (const [name, value] of Object.entries(attributes)) script.setAttribute(name, value);
  document.head.append(script);
}

if (!isLocal) {
  if (config.vercel) {
    // Enable Web Analytics in the Vercel dashboard (Project → Analytics).
    window.va = window.va || ((...args) => (window.vaq = window.vaq || []).push(args));
    loadScript("/_vercel/insights/script.js");
  }
  if (config.plausibleDomain) {
    window.plausible = window.plausible || ((...args) => (window.plausible.q = window.plausible.q || []).push(args));
    loadScript(config.plausibleSrc || "https://plausible.io/js/script.js", { "data-domain": config.plausibleDomain });
  }
  if (config.umamiWebsiteId) {
    loadScript(config.umamiSrc || "https://cloud.umami.is/script.js", { "data-website-id": config.umamiWebsiteId });
  }
}

export function track(name, props = {}) {
  const data = Object.fromEntries(Object.entries({ ...props, lang: document.documentElement.lang }).filter(([, value]) => value));
  if (debug) console.info("[analytics]", name, data);
  if (isLocal) return;
  try {
    window.va?.("event", { name, data });
    window.plausible?.(name, { props: data });
    window.umami?.track(name, data);
  } catch {
    // Analytics must never break the page.
  }
}

// Declarative events: data-track="name" (+ data-track-project), plus contact links.
document.addEventListener(
  "click",
  (event) => {
    const link = event.target.closest("a, button");
    if (!link) return;
    const tracked = link.closest("[data-track]");
    if (tracked) {
      track(tracked.dataset.track, { project: tracked.dataset.trackProject });
      return;
    }
    const href = link.getAttribute("href") || "";
    if (href.startsWith("https://wa.me")) track("whatsapp_click", { from: link.dataset.trackFrom });
    else if (href.startsWith("mailto:")) track("email_click");
    else if (href.startsWith("tel:")) track("phone_click");
    else if (link.hasAttribute("data-lang-link")) track("lang_switch", { to: link.getAttribute("hreflang") });
    else if (href.endsWith("#contact")) {
      const place = link.closest("section[id]")?.id || (link.closest(".site-header, #mobile-menu") ? "nav" : link.closest("footer") ? "footer" : "page");
      track("cta_start_project", { from: place });
    }
  },
  { capture: true },
);

// How far visitors get: one event the first time each section comes into view.
if ("IntersectionObserver" in window) {
  const seen = new Set();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id;
        if (!entry.isIntersecting || seen.has(id)) continue;
        seen.add(id);
        track("section_view", { section: id });
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.35 },
  );
  document.querySelectorAll("main > section[id]").forEach((section) => observer.observe(section));
}
