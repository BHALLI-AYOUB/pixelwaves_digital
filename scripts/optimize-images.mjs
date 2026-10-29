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

async function main() {
  await fs.mkdir(workDir, { recursive: true });
  // Optional slug arguments limit the run; entries not reprocessed are kept.
  const only = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
  const existing = only.length ? JSON.parse(await fs.readFile(manifestPath, "utf8")) : { work: {} };
  const manifest = { work: { ...existing.work } };

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

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
