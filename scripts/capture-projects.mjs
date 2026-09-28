// Captures the portfolio screenshots into .captures/, then run `npm run optimize:images`.
//
//   Homepage   <slug>-desktop.png (1440x900 @2x) and <slug>-mobile.png (390x844 @2x)
//   Case shots <slug>-<shot>-desktop.png (+ -mobile.png when the shot sets mobile: true),
//              as listed in each project's `shots` in src/site/data/projects.mjs
//
//   npm i --no-save puppeteer-core
//   npm run capture:projects                      everything
//   npm run capture:projects elitegear casaxa     only these projects
//   npm run capture:projects casaxa:b2b           one shot
//   npm run capture:projects -- --home            homepages only (--shots for shots only)
//
//   CHROME_PATH overrides the Chrome location, WAIT the settle time in ms.
import fs from "fs/promises";
import path from "path";
import { projects } from "../src/site/data/projects.mjs";

let puppeteer;
try {
  puppeteer = (await import("puppeteer-core")).default;
} catch {
  console.error("puppeteer-core is not installed. Run: npm i --no-save puppeteer-core");
  process.exit(1);
}

const executablePath = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const outDir = path.join(process.cwd(), ".captures");
const wait = Number(process.env.WAIT || 2500);
const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith("--")));
const targets = args.filter((arg) => !arg.startsWith("--"));
const includeHome = !flags.has("--shots");
const includeShots = !flags.has("--home");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const viewports = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 2 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
const mobileAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";

function wanted(slug, shotId) {
  if (!targets.length) return true;
  return targets.some((target) => target === slug || target === `${slug}:${shotId}`);
}

await fs.mkdir(outDir, { recursive: true });
const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--hide-scrollbars", "--ignore-certificate-errors"] });

async function tidy(page) {
  await page.keyboard.press("Escape").catch(() => {});
  await page.evaluate(() => {
    const dismiss = /^(accept|accept all|accepter|tout accepter|ok|got it|close|fermer|×)$/i;
    for (const el of document.querySelectorAll("button, [role=button]")) {
      if (dismiss.test((el.innerText || el.getAttribute("aria-label") || "").trim())) el.click();
    }
    // Floating chat bubbles and builder badges add noise to the mockups. Fixed widgets are
    // matched by size and placement. Some apps pin them with position:absolute inside their
    // own root instead; those must also look like a chat widget, so ordinary absolutely
    // positioned content (product-card links, overlays) is never hidden.
    const widgetPattern = /whatsapp|wa\.me|chat|messenger|assistant|tawk|crisp|intercom/i;
    for (const el of document.querySelectorAll("body *")) {
      const style = getComputedStyle(el);
      if (style.position !== "fixed" && style.position !== "absolute") continue;
      const rect = el.getBoundingClientRect();
      const small = rect.width > 0 && rect.width < 260 && rect.height > 0 && rect.height < 260;
      const pinnedToCorner = rect.bottom > window.innerHeight * 0.6 && rect.bottom < window.innerHeight + 40;
      const atEdge = rect.left > window.innerWidth * 0.6 || rect.right < window.innerWidth * 0.4;
      const label = `${el.innerText || ""} ${el.getAttribute("aria-label") || ""} ${el.getAttribute("href") || ""} ${el.querySelector("a")?.getAttribute("href") || ""} ${el.querySelector("img")?.getAttribute("alt") || ""}`;
      const looksLikeWidget = style.position === "fixed" || (atEdge && widgetPattern.test(label));
      if (small && pinnedToCorner && looksLikeWidget) {
        el.style.setProperty("display", "none", "important");
      }
    }
    document.querySelectorAll('a[href*="lovable"], #lovable-badge').forEach((el) => el.style.setProperty("display", "none", "important"));
  }).catch(() => {});
}

async function open(url, mode) {
  const page = await browser.newPage();
  await page.setViewport(viewports[mode]);
  if (mode === "mobile") await page.setUserAgent(mobileAgent);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 }).catch((error) => console.warn(`  ${url}: ${error.message}`));
  await sleep(2500);
  await instantScrolling(page);
  // Scroll once through the page so lazy media and entrance animations settle.
  await page.evaluate(async () => {
    for (let y = 0; y < Math.min(document.body.scrollHeight, 12000); y += window.innerHeight * 0.8) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    window.scrollTo(0, 0);
  }).catch(() => {});
  return page;
}

// Sites with `scroll-behavior: smooth` animate every programmatic scroll, and a second
// scroll cancels the first. Captures need instant, predictable jumps.
async function instantScrolling(page) {
  await page.evaluate(() => {
    for (const el of [document.documentElement, document.body]) el.style.setProperty("scroll-behavior", "auto", "important");
  }).catch(() => {});
}

// Clicks the smallest visible element whose own text matches exactly.
async function clickText(page, text) {
  const clicked = await page.evaluate((label) => {
    const matches = [...document.querySelectorAll("a, button, [role=button], [role=link], [tabindex], div, span")]
      .filter((el) => (el.innerText || "").trim() === label)
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && getComputedStyle(el).visibility !== "hidden";
      })
      .sort((a, b) => a.getBoundingClientRect().width * a.getBoundingClientRect().height - b.getBoundingClientRect().width * b.getBoundingClientRect().height);
    if (!matches.length) return false;
    matches[0].click();
    return true;
  }, text);
  if (clicked) {
    await page.waitForNetworkIdle({ idleTime: 800, timeout: 20000 }).catch(() => {});
  }
  return clicked;
}

async function focus(page, shot, mode) {
  const offset = mode === "mobile" ? 64 : 88;
  const nudge = typeof shot.nudge === "object" ? shot.nudge[mode] || 0 : shot.nudge || 0;
  await instantScrolling(page);
  // Scroll twice: late-loading content above the target can shift it after the first jump.
  for (let pass = 0; pass < 2; pass += 1) {
    const found = await page.evaluate(
      ({ selector, text, offset, nudge }) => {
        let target = selector ? document.querySelector(selector) : null;
        if (!target && text) {
          const pattern = new RegExp(text, "i");
          target = [...document.querySelectorAll("h1, h2, h3, [role=heading]")].find((el) => pattern.test(el.innerText || ""));
        }
        if ((selector || text) && !target) return false;
        // The page scroller, or the app's own scroll container when the document does not scroll.
        const documentScrolls = document.documentElement.scrollHeight > window.innerHeight + 10;
        const scroller = documentScrolls
          ? null
          : [...document.querySelectorAll("*")]
              .filter((el) => /(auto|scroll)/.test(getComputedStyle(el).overflowY) && el.scrollHeight > el.clientHeight + 50)
              .sort((a, b) => b.clientHeight - a.clientHeight)[0];
        const current = scroller ? scroller.scrollTop : window.scrollY;
        const base = target ? target.getBoundingClientRect().top + current - (scroller ? scroller.getBoundingClientRect().top : 0) - offset : current;
        const top = Math.max(0, base + nudge);
        if (scroller) scroller.scrollTop = top;
        else window.scrollTo(0, top);
        return true;
      },
      { selector: shot.scrollTo, text: shot.scrollToText, offset, nudge },
    );
    if (!found) {
      console.warn(`  could not find ${shot.scrollTo || shot.scrollToText}`);
      break;
    }
    // Without a target, the nudge applies once.
    if (!shot.scrollTo && !shot.scrollToText) break;
    await sleep(1200);
  }
  await sleep(wait);
}

async function screenshot(page, file) {
  await tidy(page);
  await sleep(600);
  await page.screenshot({ path: path.join(outDir, file) });
  console.log(`captured ${file}`);
}

async function captureHome(project, mode) {
  const page = await open(project.url, mode);
  await sleep(wait);
  await screenshot(page, `${project.slug}-${mode}.png`);
  await page.close();
}

async function captureShot(project, shot) {
  let resolvedUrl = shot.url;
  for (const mode of shot.mobile ? ["desktop", "mobile"] : ["desktop"]) {
    const page = await open(resolvedUrl, mode);
    if (shot.click && resolvedUrl === shot.url) {
      const clicked = await clickText(page, shot.click);
      if (!clicked) console.warn(`  "${shot.click}" not found on ${mode}`);
      // Apps with real routes change the URL: reuse it for the mobile capture.
      if (clicked && page.url() !== shot.url) resolvedUrl = page.url();
    }
    await focus(page, shot, mode);
    await screenshot(page, `${project.slug}-${shot.id}-${mode}.png`);
    await page.close();
  }
}

for (const project of projects) {
  if (includeHome && wanted(project.slug, "home")) {
    for (const mode of ["desktop", "mobile"]) {
      await captureHome(project, mode).catch((error) => console.error(project.slug, mode, error.message));
    }
  }
  if (includeShots) {
    for (const shot of project.shots || []) {
      if (!wanted(project.slug, shot.id)) continue;
      await captureShot(project, shot).catch((error) => console.error(project.slug, shot.id, error.message));
    }
  }
}
await browser.close();
