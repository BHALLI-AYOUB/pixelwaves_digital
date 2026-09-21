// Progressive enhancement for the static pages: navigation, scroll reveals,
// pointer glows, light parallax and the contact form. Everything works without it.
import { track } from "./analytics.js";

const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/* ─── Header & mobile menu ─────────────────────────────────────── */
const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const pageRegions = [...document.querySelectorAll("main, footer, .wa-float")];

function setMenu(open) {
  if (!menu || !menuToggle) return;
  root.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.querySelector("[data-menu-label]").textContent = open ? menuToggle.dataset.labelClose : menuToggle.dataset.labelOpen;
  menu.toggleAttribute("inert", !open);
  // Keep focus inside the header + menu while the menu covers the page.
  pageRegions.forEach((region) => region.toggleAttribute("inert", open));
  if (open) header.classList.remove("is-hidden");
}

menuToggle?.addEventListener("click", () => {
  const open = !root.classList.contains("menu-open");
  setMenu(open);
  if (open) menu.querySelector("a")?.focus({ preventScroll: true });
});

menu?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && root.classList.contains("menu-open")) {
    setMenu(false);
    menuToggle.focus();
  }
});

window.matchMedia("(min-width: 1024px)").addEventListener("change", (event) => {
  if (event.matches) setMenu(false);
});

// Language links keep the current section.
document.querySelectorAll("[data-lang-link]").forEach((link) => {
  link.addEventListener("click", () => {
    if (location.hash) link.href = `${link.getAttribute("href").split("#")[0]}${location.hash}`;
  });
});

/* ─── Scroll-linked effects (one rAF per frame) ────────────────── */
const visibleStages = new Set();
const statements = [...document.querySelectorAll("[data-words]")];
let lastScrollY = window.scrollY;
let frameRequested = false;

function updateOnScroll() {
  frameRequested = false;
  const y = window.scrollY;
  const viewport = window.innerHeight;

  // Read every rect first, then write, so a frame never forces an extra layout.
  const stageRects = reduceMotion.matches ? [] : [...visibleStages].map((stage) => [stage, stage.getBoundingClientRect()]);
  const statementRects = statements.map((statement) => [statement, statement.getBoundingClientRect()]);

  if (header) {
    header.classList.toggle("is-scrolled", y > 16);
    if (!root.classList.contains("menu-open")) {
      const delta = y - lastScrollY;
      if (y > 640 && delta > 4) header.classList.add("is-hidden");
      else if (delta < -4 || y <= 640) header.classList.remove("is-hidden");
    }
  }
  lastScrollY = y;

  for (const [stage, rect] of stageRects) {
    const progress = clamp((rect.top + rect.height / 2 - viewport / 2) / viewport, -1, 1);
    stage.style.setProperty("--p", progress.toFixed(3));
  }

  for (const [statement, rect] of statementRects) {
    const start = viewport * 0.9;
    const end = viewport * 0.35;
    const progress = reduceMotion.matches ? 1 : clamp((start - rect.top) / (start - end + rect.height * 0.6), 0, 1);
    statement.style.setProperty("--p", progress.toFixed(3));
  }
}

function requestUpdate() {
  if (frameRequested) return;
  frameRequested = true;
  requestAnimationFrame(updateOnScroll);
}

window.addEventListener("scroll", requestUpdate, { passive: true });
window.addEventListener("resize", requestUpdate, { passive: true });
requestUpdate();

/* ─── Observers: reveals, parallax targets, active nav, floating CTA ── */
const revealTargets = document.querySelectorAll("[data-reveal]");
const stages = document.querySelectorAll("[data-stage]");
const navLinks = [...document.querySelectorAll("[data-nav-link]")];
const hero = document.querySelector("[data-hero]");
const contactSection = document.getElementById("contact");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  revealTargets.forEach((target) => revealObserver.observe(target));

  const stageObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleStages.add(entry.target);
        else visibleStages.delete(entry.target);
      }
      requestUpdate();
    },
    { rootMargin: "25% 0px" },
  );
  stages.forEach((stage) => stageObserver.observe(stage));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        navLinks.forEach((link) => link.classList.toggle("is-active", link.dataset.navLink === entry.target.id));
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  document.querySelectorAll("main > section").forEach((section) => sectionObserver.observe(section));

  const floatObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === hero) root.classList.toggle("past-hero", !entry.isIntersecting);
      if (entry.target === contactSection) root.classList.toggle("at-contact", entry.isIntersecting);
    }
  });
  if (hero) floatObserver.observe(hero);
  if (contactSection) floatObserver.observe(contactSection);
} else {
  revealTargets.forEach((target) => target.classList.add("is-in"));
  root.classList.add("past-hero");
}

/* ─── Pointer glows & hero depth (desktop pointers only) ───────── */
if (finePointer.matches) {
  let pointer = null;
  let pointerFrame = 0;

  const applyPointer = () => {
    pointerFrame = 0;
    const { target, x, y } = pointer;
    const glow = target.closest("[data-glow], [data-stage]");
    if (glow) {
      const rect = glow.getBoundingClientRect();
      const localX = x - rect.left;
      const localY = y - rect.top;
      if (glow.hasAttribute("data-stage")) {
        glow.style.setProperty("--cx", `${localX}px`);
        glow.style.setProperty("--cy", `${localY}px`);
        glow.style.setProperty("--gx", `${((localX / rect.width) * 100).toFixed(1)}%`);
        glow.style.setProperty("--gy", `${((localY / rect.height) * 100).toFixed(1)}%`);
      } else {
        glow.style.setProperty("--mx", `${localX}px`);
        glow.style.setProperty("--my", `${localY}px`);
      }
    }
    if (hero && !reduceMotion.matches && target.closest("[data-hero]")) {
      hero.style.setProperty("--hx", ((x / window.innerWidth) * 2 - 1).toFixed(3));
      hero.style.setProperty("--hy", ((y / window.innerHeight) * 2 - 1).toFixed(3));
    }
  };

  document.addEventListener(
    "pointermove",
    (event) => {
      pointer = { target: event.target, x: event.clientX, y: event.clientY };
      if (!pointerFrame) pointerFrame = requestAnimationFrame(applyPointer);
    },
    { passive: true },
  );

  stages.forEach((stage) => {
    stage.addEventListener("pointerleave", () => {
      stage.style.removeProperty("--gx");
      stage.style.removeProperty("--gy");
    });
  });
}

/* ─── Contact form ─────────────────────────────────────────────── */
const form = document.querySelector("[data-contact-form]");

if (form) {
  const messages = JSON.parse(form.dataset.messages);
  const status = form.querySelector("[data-form-status]");
  const submit = form.querySelector("[data-submit]");
  const submitLabel = form.querySelector("[data-submit-label]");
  const defaultLabel = submitLabel.textContent;
  const requiredFields = ["nom", "email", "projet", "message"];

  const controlsFor = (name) => {
    const field = form.elements[name];
    return field instanceof RadioNodeList ? [...field] : [field];
  };

  const setError = (name, message) => {
    const error = form.querySelector(`[data-error-for="${name}"]`);
    for (const control of controlsFor(name)) {
      if (message) {
        control.setAttribute("aria-invalid", "true");
        control.setAttribute("aria-describedby", error.id);
      } else {
        control.removeAttribute("aria-invalid");
        control.removeAttribute("aria-describedby");
      }
    }
    if (error) {
      error.textContent = message || "";
      error.hidden = !message;
    }
  };

  const validate = (data) => {
    const errors = {};
    if (!data.nom.trim()) errors.nom = messages.errors.nom;
    if (!data.email.trim()) errors.email = messages.errors.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = messages.errors.emailInvalid;
    if (!data.projet) errors.projet = messages.errors.projet;
    if (!data.message.trim()) errors.message = messages.errors.message;
    return errors;
  };

  const showStatus = (type, text, whatsappHref) => {
    status.className = `form-status is-${type}`;
    status.textContent = text;
    if (whatsappHref) {
      const link = document.createElement("a");
      link.dataset.trackFrom = "form_fallback";
      link.href = whatsappHref;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = messages.whatsappFallback;
      status.append(link);
    }
  };

  const whatsappBrief = (data) => {
    const lines = [messages.briefIntro, ""];
    for (const [key, label] of Object.entries(messages.labels)) {
      if (data[key]) lines.push(`${label}: ${data[key]}`);
    }
    return `${messages.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const clearOnEdit = (event) => {
    const { name } = event.target;
    if (requiredFields.includes(name) && event.target.getAttribute("aria-invalid") === "true") setError(name, "");
  };
  form.addEventListener("input", clearOnEdit);
  form.addEventListener("change", clearOnEdit);

  // Service rows link to the form and preselect the matching project type.
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-service]");
    if (!link) return;
    const option = controlsFor("projet").find((radio) => radio.value === link.dataset.service);
    if (option) {
      option.checked = true;
      setError("projet", "");
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = { nom: "", email: "", projet: "", message: "", ...Object.fromEntries(new FormData(form)) };
    const errors = validate(data);
    requiredFields.forEach((name) => setError(name, errors[name]));

    const invalid = requiredFields.filter((name) => errors[name]);
    if (invalid.length) {
      showStatus("error", messages.errors.summary);
      controlsFor(invalid[0])[0].focus();
      return;
    }

    submit.disabled = true;
    submitLabel.textContent = messages.sending;
    status.className = "form-status";
    status.textContent = "";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Time on page lets the server spot bots that post instantly.
        body: JSON.stringify({ ...data, elapsed: Math.round(performance.now()) }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error(payload.reason || `HTTP ${response.status}`);
      form.reset();
      showStatus("success", messages.success);
      track("brief_sent", { type: data.projet, timeline: data.delai });
    } catch (error) {
      showStatus("error", messages.failure, whatsappBrief(data));
      track("brief_failed", { reason: error.message });
    } finally {
      submit.disabled = false;
      submitLabel.textContent = defaultLabel;
    }
  });
}
