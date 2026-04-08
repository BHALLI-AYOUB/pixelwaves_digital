import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const rootDir = process.cwd();

const targets = [
  "public/sitevitrine.png",
  "public/plateformweb.png",
  "public/android.png",
  "public/infrasturedevops.png",
  "public/makanluxurymotors.png",
  "public/fastcar.png",
  "public/vias.png",
  "public/erp.png",
  "public/casaxa.png",
  "public/casaxamobile.png",
];

async function optimizeImage(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  const outputPath = absolutePath.replace(path.extname(absolutePath), ".webp");

  await fs.access(absolutePath);

  const image = sharp(absolutePath, { failOn: "none" });
  const metadata = await image.metadata();

  const resized = metadata.width && metadata.width > 1600
    ? image.resize({ width: 1600, withoutEnlargement: true })
    : image;

  await resized.webp({ quality: 78, effort: 5 }).toFile(outputPath);
  return outputPath;
}

async function main() {
  const results = [];
  for (const target of targets) {
    try {
      const output = await optimizeImage(target);
      results.push({ target, output, ok: true });
    } catch (error) {
      results.push({ target, ok: false, error: error.message });
    }
  }

  for (const result of results) {
    if (result.ok) {
      console.log(`optimized ${result.target} -> ${path.relative(rootDir, result.output)}`);
    } else {
      console.error(`failed ${result.target}: ${result.error}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
