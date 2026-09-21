// Builds every brand asset from public/logo.png into public/brand/:
//   logo-mark / logo-compact   transparent logo for dark surfaces (full and nav versions)
//   favicon.ico, favicon-32/-16, apple-touch-icon, icon-192/512   the swoosh mark on a tile
//   og.jpg, og-<slug>.jpg      Open Graph share images for the home and each case study
// Run after `npm run optimize:images` (share images use the project screenshots).
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { projects } from "../src/site/data/projects.mjs";

const rootDir = process.cwd();
const outDir = path.join(rootDir, "public", "brand");
const logoPath = path.join(rootDir, "public", "logo.png");
const displayFont = path.join(rootDir, "src", "assets", "fonts", "bricolage-display-bold.ttf");
const ink = "#07060b";
const tile = "#0c0a13";
const purple = "#8b5cf6";

function bounds(data, info, alphaMin, area = { left: 0, top: 0, width: info.width, height: info.height }) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -1;
  let maxY = -1;
  for (let y = area.top; y < area.top + area.height; y += 1) {
    for (let x = area.left; x < area.left + area.width; x += 1) {
      if (data[(y * info.width + x) * info.channels + 3] > alphaMin) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

// The source logo is artwork on a dark navy gradient. Keying on the brightest channel
// keeps the bright wordmark and mark, and drops the background to transparent so the
// logo can sit on any dark surface.
async function keyedLogo() {
  const { data, info } = await sharp(logoPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const low = 0.34;
  const high = 0.6;
  for (let i = 0; i < data.length; i += info.channels) {
    const brightest = Math.max(data[i], data[i + 1], data[i + 2]) / 255;
    data[i + 3] = Math.round(Math.min(1, Math.max(0, (brightest - low) / (high - low))) * 255);
  }
  return { data, info };
}

const raw = ({ data, info }) => sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });

async function writeLogos(logo) {
  const { data, info } = logo;
  const pad = 4;
  const box = bounds(data, info, 24);
  const full = { left: box.left - pad, top: box.top - pad, width: box.width + pad * 2, height: box.height + pad * 2 };
  await raw(logo).extract(full).png().toFile(path.join(outDir, "logo-mark.png"));
  await raw(logo).extract(full).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(outDir, "logo-mark.webp"));

  // Compact variant: everything above the small "DIGITAL SOLUTIONS" line, which is
  // unreadable at navigation size. Scan right of the swoosh, which spans the full height.
  const scanFrom = full.left + Math.round(full.width * 0.4);
  const rowHasInk = [];
  for (let y = full.top; y < full.top + full.height; y += 1) {
    let ink = false;
    for (let x = scanFrom; x < full.left + full.width && !ink; x += 1) {
      if (data[(y * info.width + x) * info.channels + 3] > 24) ink = true;
    }
    rowHasInk.push(ink);
  }
  let cursor = rowHasInk.length - 1;
  while (cursor > 0 && !rowHasInk[cursor]) cursor -= 1;
  while (cursor > 0 && rowHasInk[cursor]) cursor -= 1;
  while (cursor > 0 && !rowHasInk[cursor]) cursor -= 1;
  const compact = { ...full, height: cursor > full.height * 0.5 ? cursor + pad : full.height };
  await raw(logo).extract(compact).png().toFile(path.join(outDir, "logo-compact.png"));
  await raw(logo).extract(compact).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(outDir, "logo-compact.webp"));
  return full;
}

// The swoosh mark alone: the ink left of the first clear vertical gap in the logo.
async function markOnly(logo, full) {
  const { data, info } = logo;
  const columnHasInk = (x) => {
    for (let y = full.top; y < full.top + full.height; y += 1) {
      if (data[(y * info.width + x) * info.channels + 3] > 40) return true;
    }
    return false;
  };
  let x = full.left + Math.round(full.width * 0.1);
  while (x < full.left + full.width && columnHasInk(x)) x += 1;
  const markArea = { left: full.left, top: full.top, width: x - full.left, height: full.height };
  const box = bounds(data, info, 40, markArea);
  return raw(logo).extract(box).png().toBuffer();
}

async function iconTile(mark, size, { radius, scale }) {
  const inner = Math.round(size * scale);
  const glyph = await sharp(mark).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  const background = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${tile}"/></svg>`,
  );
  const offset = Math.round((size - inner) / 2);
  return sharp(background).composite([{ input: glyph, left: offset, top: offset }]).png().toBuffer();
}

// Minimal ICO container holding PNG images (supported by every current browser).
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + pngs.length * 16;
  const entries = pngs.map(({ size, png }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...pngs.map(({ png }) => png)]);
}

async function writeIcons(mark) {
  // Small sizes: rounded tile, mark nearly edge to edge so it stays legible.
  const small = {};
  for (const size of [16, 32, 48]) small[size] = await iconTile(mark, size, { radius: Math.round(size * 0.22), scale: 0.84 });
  await fs.writeFile(path.join(outDir, "favicon-16.png"), small[16]);
  await fs.writeFile(path.join(outDir, "favicon-32.png"), small[32]);
  await fs.writeFile(path.join(outDir, "favicon.ico"), ico([16, 32, 48].map((size) => ({ size, png: small[size] }))));
  await fs.copyFile(path.join(outDir, "favicon.ico"), path.join(rootDir, "favicon.ico"));

  // App icons: full-bleed square (the OS applies its own mask), mark inside the safe zone.
  for (const [size, file] of [
    [180, "apple-touch-icon.png"],
    [192, "icon-192.png"],
    [512, "icon-512.png"],
  ]) {
    await fs.writeFile(path.join(outDir, file), await iconTile(mark, size, { radius: 0, scale: 0.6 }));
  }
}

async function browserCard(slug, width) {
  const bar = Math.round(width * 0.04);
  const height = Math.round(width / 1.6) + bar;
  const radius = Math.round(width * 0.022);
  const shot = await sharp(path.join(rootDir, "public", "work", `${slug}-desktop-1200.webp`)).resize(width).toBuffer();
  const chrome = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="${width}" height="${height}" fill="#1e1a2a"/>
    ${[0, 1, 2].map((i) => `<circle cx="${bar * 0.7 + i * bar * 0.55}" cy="${bar / 2}" r="${bar * 0.16}" fill="#ffffff" opacity="0.25"/>`).join("")}
  </svg>`);
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${radius}" fill="#fff"/></svg>`);
  return sharp(chrome)
    .composite([{ input: shot, top: bar, left: 0 }, { input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

const shadow = (w, h) =>
  sharp({ create: { width: w + 120, height: h + 120, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w + 120}" height="${h + 120}"><rect x="60" y="80" width="${w}" height="${h}" rx="16" fill="#000" opacity="0.7"/></svg>`) }])
    .blur(28)
    .png()
    .toBuffer();

function ogBackground() {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <radialGradient id="glow" cx="0.78" cy="0.35" r="0.6">
        <stop offset="0" stop-color="#7c3aed" stop-opacity="0.55"/>
        <stop offset="1" stop-color="#7c3aed" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#a78bfa" stop-opacity="0"/>
        <stop offset="0.55" stop-color="#ede9fe" stop-opacity="0.9"/>
        <stop offset="1" stop-color="#7c3aed" stop-opacity="0"/>
      </linearGradient>
      <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M60 0H0v60" fill="none" stroke="#ffffff" stroke-opacity="0.05"/>
      </pattern>
    </defs>
    <rect width="1200" height="630" fill="${ink}"/>
    <rect width="1200" height="630" fill="url(#grid)"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <circle cx="930" cy="250" r="330" fill="none" stroke="url(#ring)" stroke-width="2"/>
  </svg>`);
}

const escapeMarkup = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Pango needs the font's internal family name ("Bricolage Grotesque 96pt") and the
// trailing comma so the "96pt" in it is not read as a size.
async function text(content, size, color, width, letterSpacing = 0) {
  return sharp({
    text: {
      text: `<span foreground="${color}" letter_spacing="${letterSpacing}">${escapeMarkup(content)}</span>`,
      fontfile: displayFont,
      font: `Bricolage Grotesque 96pt, Bold ${size}`,
      width,
      rgba: true,
      dpi: 72,
    },
  })
    .png()
    .toBuffer();
}

async function writeHomeOg() {
  const logo = await sharp(path.join(outDir, "logo-mark.png")).resize({ width: 440 }).toBuffer();
  const logoMeta = await sharp(logo).metadata();
  const cardBack = await browserCard("mastertimepiece", 560);
  const cardFront = await browserCard("elitegear", 600);
  const backMeta = await sharp(cardBack).metadata();
  const frontMeta = await sharp(cardFront).metadata();
  await sharp(ogBackground())
    .composite([
      { input: await shadow(backMeta.width, backMeta.height), left: 530, top: 10 },
      { input: cardBack, left: 590, top: 70 },
      { input: await shadow(frontMeta.width, frontMeta.height), left: 370, top: 190 },
      { input: cardFront, left: 430, top: 250 },
      { input: logo, left: 72, top: Math.round(150 - logoMeta.height / 2) },
      { input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="56" height="3"><rect width="56" height="3" rx="1.5" fill="${purple}"/></svg>`), left: 72, top: 470 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(outDir, "og.jpg"));
}

// One share image per case study: project screenshot, name and category.
async function writeProjectOg(project) {
  const card = await browserCard(project.slug, 640);
  const cardMeta = await sharp(card).metadata();
  const logo = await sharp(path.join(outDir, "logo-compact.png")).resize({ height: 38 }).toBuffer();
  // Long names get a smaller size so they stay on two lines.
  const name = await text(project.name, project.name.length > 16 ? 62 : 76, "#ffffff", 450);
  const category = await text(`${project.en.category} · ${project.en.sector}`, 28, "#c4b5fd", 450);
  const label = await text("CASE STUDY", 17, "#a9a4bb", 450, 3000);
  const [labelMeta, nameMeta, categoryMeta] = await Promise.all([label, name, category].map((buffer) => sharp(buffer).metadata()));

  // Stack label, name, category and accent bar, centred in the space below the logo.
  const gaps = { label: 18, category: 22, bar: 34 };
  const stackHeight = labelMeta.height + gaps.label + nameMeta.height + gaps.category + categoryMeta.height + gaps.bar + 3;
  let y = Math.round(140 + (630 - 140 - stackHeight) / 2);
  const layer = (input, height, gap) => {
    const placed = { input, left: 64, top: y };
    y += height + gap;
    return placed;
  };
  await sharp(ogBackground())
    .composite([
      { input: await shadow(cardMeta.width, cardMeta.height), left: 560 - 60, top: 150 - 60 },
      { input: card, left: 560, top: 150 },
      { input: logo, left: 64, top: 64 },
      layer(label, labelMeta.height, gaps.label),
      layer(name, nameMeta.height, gaps.category),
      layer(category, categoryMeta.height, gaps.bar),
      layer(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="56" height="3"><rect width="56" height="3" rx="1.5" fill="${purple}"/></svg>`), 3, 0),
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(outDir, `og-${project.slug}.jpg`));
}

await fs.mkdir(outDir, { recursive: true });
const logo = await keyedLogo();
const full = await writeLogos(logo);
await writeIcons(await markOnly(logo, full));
await writeHomeOg();
for (const project of projects) await writeProjectOg(project);
await fs.rm(path.join(outDir, "favicon.svg"), { force: true });
console.log(`brand assets written to public/brand/ (${projects.length} case study share images)`);
