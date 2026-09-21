// Turns the raw captures in .captures/ into responsive AVIF + WebP files in public/work/
// and records their dimensions and placeholder colour in src/site/data/images.json.
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { projects } from "../src/site/data/projects.mjs";

const rootDir = process.cwd();
const captureDir = path.join(rootDir, ".captures");
const workDir = path.join(rootDir, "public", "work");
const manifestPath = path.join(rootDir, "src", "site", "data", "images.json");

const variants = {
  desktop: { widths: [480, 800, 1200, 1800, 2400], avif: { quality: 58, effort: 6 }, webp: { quality: 80, effort: 5 } },
  mobile: { widths: [180, 300, 600], avif: { quality: 60, effort: 6 }, webp: { quality: 80, effort: 5 } },
};

const portrait = {
  // Waist-up crop of src/assets/ayoub-bhalli.jpg with the event backdrop softened.
  source: path.join(rootDir, "src", "assets", "ayoub-bhalli-portrait.jpg"),
  name: "ayoub-bhalli",
  widths: [400, 520],
};

async function placeholderColor(file) {
  const { dominant } = await sharp(file).stats();
  return `#${[dominant.r, dominant.g, dominant.b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

async function writeVariants(source, baseName, widths, options, outDir) {
  const metadata = await sharp(source).metadata();
  // Never upscale: a source narrower than a requested width is written at its own width.
  const outputWidths = [...new Set(widths.map((width) => Math.min(width, metadata.width)))];
  for (const width of outputWidths) {
    const resized = () => sharp(source).resize({ width });
    await resized().avif(options.avif).toFile(path.join(outDir, `${baseName}-${width}.avif`));
    await resized().webp(options.webp).toFile(path.join(outDir, `${baseName}-${width}.webp`));
  }
  return {
    widths: outputWidths,
    aspect: +(metadata.width / metadata.height).toFixed(4),
    color: await placeholderColor(source),
  };
}

// The portrait is displayed at up to ~430px wide. Widths above the source size are
// upscaled with Lanczos and light sharpening, which looks crisper than letting the
// browser stretch the image.
async function writePortrait(outDir) {
  const metadata = await sharp(portrait.source).metadata();
  for (const width of portrait.widths) {
    const upscale = width > metadata.width;
    const image = () => {
      const resized = sharp(portrait.source).resize({ width, kernel: sharp.kernel.lanczos3 });
      return upscale ? resized.sharpen({ sigma: 0.8, m1: 0.6, m2: 2 }) : resized;
    };
    await image().avif({ quality: 62, effort: 6 }).toFile(path.join(outDir, `${portrait.name}-${width}.avif`));
    await image().webp({ quality: 84, effort: 5 }).toFile(path.join(outDir, `${portrait.name}-${width}.webp`));
  }
  return { widths: portrait.widths, aspect: +(metadata.width / metadata.height).toFixed(4), color: await placeholderColor(portrait.source) };
}

async function main() {
  await fs.mkdir(workDir, { recursive: true });
  // Optional slug arguments limit the run; --portrait processes only the portrait.
  // Existing entries are kept for everything not reprocessed.
  const args = process.argv.slice(2);
  const portraitOnly = args.includes("--portrait");
  const only = portraitOnly ? ["--none--"] : args.filter((arg) => !arg.startsWith("--"));
  const existing = only.length ? JSON.parse(await fs.readFile(manifestPath, "utf8")) : { work: {}, portrait: null };
  const manifest = { work: { ...existing.work }, portrait: existing.portrait };

  for (const project of projects) {
    if (only.length && !only.includes(project.slug)) continue;
    manifest.work[project.slug] = {};
    for (const [mode, options] of Object.entries(variants)) {
      const source = path.join(captureDir, `${project.slug}-${mode}.png`);
      try {
        await fs.access(source);
      } catch {
        console.error(`missing ${path.relative(rootDir, source)} (run npm run capture:projects)`);
        process.exitCode = 1;
        continue;
      }
      manifest.work[project.slug][mode] = await writeVariants(source, `${project.slug}-${mode}`, options.widths, options, workDir);
      console.log(`optimized ${project.slug}-${mode}`);
    }

    // Inner screens for the case study page.
    manifest.work[project.slug].shots = {};
    for (const shot of project.shots || []) {
      const entry = {};
      for (const mode of shot.mobile ? ["desktop", "mobile"] : ["desktop"]) {
        const name = `${project.slug}-${shot.id}-${mode}`;
        const source = path.join(captureDir, `${name}.png`);
        try {
          await fs.access(source);
        } catch {
          console.error(`missing ${path.relative(rootDir, source)} (run npm run capture:projects)`);
          process.exitCode = 1;
          continue;
        }
        entry[mode] = await writeVariants(source, name, variants[mode].widths, variants[mode], workDir);
        console.log(`optimized ${name}`);
      }
      manifest.work[project.slug].shots[shot.id] = entry;
    }
  }

  if (!only.length || portraitOnly) {
    const teamDir = path.join(rootDir, "public", "team");
    await fs.mkdir(teamDir, { recursive: true });
    manifest.portrait = await writePortrait(teamDir);
    console.log(`optimized ${portrait.name}`);
  }

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
