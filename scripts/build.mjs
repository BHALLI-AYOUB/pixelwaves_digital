// Renders the JSX in src/site to static HTML (index.html, fr/index.html, legal pages,
// sitemap, robots, manifest) and bundles the small client script in src/client to app.js.
// No React ships to the browser. Use --watch during development.
import crypto from "crypto";
import * as esbuild from "esbuild";
import fs from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";

const rootDir = process.cwd();

const watch = process.argv.includes("--watch");
const renderBundle = path.join(rootDir, ".build", "render.mjs");

async function assetUrl(file) {
  if (watch) return `/${file}`;
  // Content hash so browsers never mix a new page with a cached stylesheet or script.
  const content = await fs.readFile(path.join(rootDir, file)).catch(() => "");
  const hash = crypto.createHash("sha1").update(content).digest("hex").slice(0, 10);
  return `/${file}?v=${hash}`;
}

async function writePages() {
  const { renderPages } = await import(`${pathToFileURL(renderBundle).href}?t=${Date.now()}`);
  const assets = { css: await assetUrl("styles.css"), js: await assetUrl("app.js") };
  const pages = renderPages({ assets });
  for (const page of pages) {
    const target = path.join(rootDir, page.path);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, page.content);
  }
  console.log(`[site] rendered ${pages.length} files`);
}

const renderPlugin = {
  name: "render-pages",
  setup(build) {
    build.onEnd(async (result) => {
      if (result.errors.length) return;
      try {
        await writePages();
      } catch (error) {
        console.error("[site] render failed:", error);
        if (!watch) process.exitCode = 1;
      }
    });
  },
};

const clientOptions = {
  entryPoints: ["src/client/main.js"],
  outfile: "app.js",
  bundle: true,
  minify: !watch,
  format: "iife",
  target: ["es2019"],
  legalComments: "none",
  logLevel: "warning",
};

const renderOptions = {
  entryPoints: ["src/site/render.jsx"],
  outfile: renderBundle,
  bundle: true,
  platform: "node",
  format: "esm",
  jsx: "automatic",
  packages: "external",
  logLevel: "warning",
  plugins: [renderPlugin],
};

if (watch) {
  const contexts = await Promise.all([esbuild.context(clientOptions), esbuild.context(renderOptions)]);
  await Promise.all(contexts.map((context) => context.watch()));
  console.log("[site] watching src/ for changes");
} else {
  await esbuild.build(clientOptions);
  await esbuild.build(renderOptions);
}
