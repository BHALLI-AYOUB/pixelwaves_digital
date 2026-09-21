// Downloads each client's own logo (projects[].logo.src) and turns it into a white,
// transparent mark in public/clients/, so the logo wall reads as one consistent set.
// Sizes are recorded in src/site/data/logos.json.
//
//   npm run client:logos
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { projects } from "../src/site/data/projects.mjs";

const rootDir = process.cwd();
const outDir = path.join(rootDir, "public", "clients");
const manifestPath = path.join(rootDir, "src", "site", "data", "logos.json");
const HEIGHT = 120;

async function download(url) {
  const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (PixelWaves logo fetch)" }, signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

const clamp01 = (value) => Math.min(1, Math.max(0, value));

// Per-pixel coverage of the logo, 0..1:
//   transparent  the file's own alpha channel
//   dark         bright artwork on a dark plate: coverage follows brightness
//   light        artwork on a light plate: coverage follows distance from the plate colour
function coverage(data, info, background) {
  const alpha = new Float32Array(info.width * info.height);
  const at = (x, y) => (y * info.width + x) * info.channels;
  let plate = [255, 255, 255];
  if (background === "light") {
    const corners = [at(2, 2), at(info.width - 3, 2), at(2, info.height - 3), at(info.width - 3, info.height - 3)];
    plate = [0, 1, 2].map((c) => corners.reduce((sum, i) => sum + data[i + c], 0) / corners.length);
  }
  for (let p = 0; p < alpha.length; p += 1) {
    const i = p * info.channels;
    const own = info.channels === 4 ? data[i + 3] / 255 : 1;
    if (background === "dark") {
      const brightest = Math.max(data[i], data[i + 1], data[i + 2]) / 255;
      alpha[p] = own * clamp01((brightest - 0.28) / 0.3);
    } else if (background === "light") {
      const distance = Math.hypot(data[i] - plate[0], data[i + 1] - plate[1], data[i + 2] - plate[2]) / 255;
      alpha[p] = own * clamp01((distance - 0.08) / 0.25);
    } else {
      alpha[p] = own;
    }
  }
  return alpha;
}

function inkBounds(alpha, width, height, area = { top: 0, bottom: height }) {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = area.top; y < area.bottom; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (alpha[y * width + x] > 0.12) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

// For logos with extra lines below (phone number, socials): keep the first block of rows.
function firstBlock(alpha, width, height) {
  const rowInk = (y) => {
    for (let x = 0; x < width; x += 1) if (alpha[y * width + x] > 0.12) return true;
    return false;
  };
  let y = 0;
  while (y < height && !rowInk(y)) y += 1;
  const minGap = Math.max(4, Math.round(height * 0.02));
  let gap = 0;
  for (; y < height; y += 1) {
    gap = rowInk(y) ? 0 : gap + 1;
    if (gap >= minGap) return { top: 0, bottom: y - gap };
  }
  return { top: 0, bottom: height };
}

async function processLogo(project) {
  const source = await download(project.logo.src);
  // Work at a manageable size; some source files are huge.
  const { data, info } = await sharp(source).resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).raw().toBuffer({ resolveWithObject: true });
  const alpha = coverage(data, info, project.logo.background);
  const area = project.logo.topBlockOnly ? firstBlock(alpha, info.width, info.height) : { top: 0, bottom: info.height };
  const box = inkBounds(alpha, info.width, info.height, area);

  const white = Buffer.alloc(box.width * box.height * 4);
  for (let y = 0; y < box.height; y += 1) {
    for (let x = 0; x < box.width; x += 1) {
      const o = (y * box.width + x) * 4;
      white[o] = 255;
      white[o + 1] = 255;
      white[o + 2] = 255;
      white[o + 3] = Math.round(alpha[(box.top + y) * info.width + box.left + x] * 255);
    }
  }
  const mark = sharp(white, { raw: { width: box.width, height: box.height, channels: 4 } }).resize({ height: HEIGHT });
  const png = await mark.clone().png().toBuffer();
  const meta = await sharp(png).metadata();
  await fs.writeFile(path.join(outDir, `${project.slug}.png`), png);
  await mark.clone().webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(outDir, `${project.slug}.webp`));
  return { width: meta.width, height: meta.height };
}

await fs.mkdir(outDir, { recursive: true });
const manifest = {};
for (const project of projects) {
  if (!project.logo) continue;
  try {
    manifest[project.slug] = await processLogo(project);
    console.log(`logo ${project.slug} ${manifest[project.slug].width}x${manifest[project.slug].height}`);
  } catch (error) {
    console.error(`logo ${project.slug} failed: ${error.message}`);
    process.exitCode = 1;
  }
}
await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
