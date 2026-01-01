/**
 * Material Homepage Build Script
 *
 * This script automates the build process for the Material Homepage browser extension.
 * It performs the following tasks:
 *
 * 1. Bundles all JavaScript files from the scripts/ directory into a single main.js
 * 2. Bundles and minifies all CSS files from the styles/ directory into a single index.css
 * 3. Copies necessary assets (fonts, images, HTML, manifests) to the build directory
 * 4. Creates a ZIP file for Chromium-based browsers (Chrome, Edge, etc.)
 * 5. Replaces the manifest with Firefox-specific version
 * 6. Creates a separate ZIP file for Firefox
 *
 * Note: SVG files from images/ are not copied because they are already embedded
 * in scripts/svg.js via the generate_svgs.mjs script.
 *
 * Usage: deno run -A build.mts
 *
 * Requirements:
 * - Deno runtime installed
 * - esbuild for bundling (automatically imported via JSR)
 *
 * @author Shoaib Hossain Sihab
 */
import * as esbuild from "npm:esbuild@0.20.0";
import { ensureDir } from "jsr:@std/fs@1.0.8";
import { copy } from "jsr:@std/fs@1.0.8/copy";
import { walk } from "jsr:@std/fs@1.0.8/walk";

// Directory configuration
const ROOT_DIR = ".";
const BUILD_DIR = "./build";
const OUT_DIR = `${BUILD_DIR}/material_homepage`;

// Color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

/**
 * Prints a formatted step message to the console
 */
function logStep(step: string, message: string) {
  console.log(`${colors.bright}${colors.blue}[${step}]${colors.reset} ${message}`);
}

/**
 * Prints a success message to the console
 */
function logSuccess(message: string) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

/**
 * Prints an info message to the console
 */
function logInfo(message: string) {
  console.log(`${colors.cyan}ℹ${colors.reset} ${message}`);
}

/**
 * Safely extracts an error message from an unknown error type
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

/**
 * Cleans the build directory
 */
async function cleanBuildDir() {
  logStep("CLEAN", "Removing existing build directory...");
  try {
    await Deno.remove(BUILD_DIR, { recursive: true });
    logSuccess("Build directory cleaned");
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      logInfo("No existing build directory found");
    } else {
      throw error;
    }
  }
}

/**
 * Creates the output directory structure
 */
async function createOutputDir() {
  logStep("SETUP", "Creating output directory structure...");
  await ensureDir(OUT_DIR);
  await ensureDir(`${OUT_DIR}/images`);
  await ensureDir(`${OUT_DIR}/fonts`);
  logSuccess("Directory structure created");
}

/**
 * Bundles all JavaScript files into a single main.js
 */
async function bundleJavaScript() {
  logStep("BUNDLE JS", "Bundling JavaScript files...");

  try {
    const result = await esbuild.build({
      entryPoints: ["./main.js"],
      bundle: true,
      minify: true,
      format: "esm",
      platform: "browser",
      outfile: `${OUT_DIR}/main.js`,
      target: "es2020",
      treeShaking: true,
    });

    if (result.errors.length > 0) {
      console.error("JavaScript bundling errors:", result.errors);
      throw new Error("JavaScript bundling failed");
    }

    logSuccess("JavaScript bundled successfully");
  } finally {
    esbuild.stop();
  }
}

/**
 * Bundles and minifies all CSS files into a single index.css
 */
async function bundleCSS() {
  logStep("BUNDLE CSS", "Bundling and minifying CSS files...");

  // Read all CSS files from styles directory
  const cssFiles: string[] = [];
  for await (const entry of walk("./styles", {
    exts: [".css"],
    includeDirs: false,
  })) {
    cssFiles.push(entry.path);
  }

  // Sort to ensure consistent order (root.css should be first)
  cssFiles.sort((a, b) => {
    if (a.includes("root.css")) return -1;
    if (b.includes("root.css")) return 1;
    return a.localeCompare(b);
  });

  logInfo(`Found ${cssFiles.length} CSS files`);

  // Concatenate all CSS files
  let combinedCSS = "";
  for (const file of cssFiles) {
    const content = await Deno.readTextFile(file);
    combinedCSS += `/* ${file} */\n${content}\n\n`;
  }

  // Basic CSS minification (remove comments, extra whitespace)
  const minifiedCSS = combinedCSS
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/\s*([{}:;,])\s*/g, "$1") // Remove spaces around special characters
    .replace(/;}/g, "}") // Remove last semicolon before closing brace
    .trim();

  await Deno.writeTextFile(`${OUT_DIR}/index.css`, minifiedCSS);
  logSuccess("CSS bundled and minified successfully");
}

/**
 * Copies necessary files to the build directory
 */
async function copyAssets() {
  logStep("COPY", "Copying necessary files...");

  // Copy index.html
  await copy("./index.html", `${OUT_DIR}/index.html`, { overwrite: true });
  logInfo("Copied index.html");

  // Copy fonts directory
  await copy("./fonts", `${OUT_DIR}/fonts`, { overwrite: true });
  logInfo("Copied fonts/");

  // Copy favicon.ico
  await copy("./images/favicon.ico", `${OUT_DIR}/images/favicon.ico`, {
    overwrite: true,
  });
  logInfo("Copied images/favicon.ico");

  // Copy logo directory
  await copy("./images/logo", `${OUT_DIR}/images/logo`, { overwrite: true });
  logInfo("Copied images/logo/");

  // Copy manifest.json for Chromium
  await copy("./manifest.json", `${OUT_DIR}/manifest.json`, {
    overwrite: true,
  });
  logInfo("Copied manifest.json");

  logSuccess("All assets copied successfully");
}

/**
 * Updates index.html to use bundled CSS instead of multiple CSS files
 */
async function updateHTML() {
  logStep("UPDATE", "Updating index.html to use bundled CSS...");

  let html = await Deno.readTextFile(`${OUT_DIR}/index.html`);

  // Replace the CSS link to point to bundled index.css
  // The original has: <link rel="stylesheet" href="styles/index.css" />
  // We need to change it to: <link rel="stylesheet" href="index.css" />
  html = html.replace(
    /<link\s+rel="stylesheet"\s+href="styles\/index\.css"\s*\/>/gi,
    '<link rel="stylesheet" href="index.css" />'
  );

  await Deno.writeTextFile(`${OUT_DIR}/index.html`, html);
  logSuccess("index.html updated");
}

/**
 * Creates a ZIP file from a directory
 */
async function createZip(sourceDir: string, outputZip: string) {
  const command = new Deno.Command("zip", {
    args: ["-r", "-q", outputZip, "."],
    cwd: sourceDir,
    stdout: "piped",
    stderr: "piped",
  });

  const { code, stderr } = await command.output();

  if (code !== 0) {
    const errorString = new TextDecoder().decode(stderr);
    throw new Error(`ZIP creation failed: ${errorString}`);
  }
}

/**
 * Builds the Chromium version ZIP
 */
async function buildChromiumZip() {
  logStep("ZIP", "Creating Chromium build...");

  const zipPath = `${BUILD_DIR}/material_homepage_chromium.zip`;
  await createZip(OUT_DIR, `../material_homepage_chromium.zip`);

  logSuccess(`Chromium build created: ${zipPath}`);
}

/**
 * Builds the Firefox version ZIP
 */
async function buildFirefoxZip() {
  logStep("ZIP", "Creating Firefox build...");

  // Replace manifest.json with Firefox version
  await Deno.remove(`${OUT_DIR}/manifest.json`);
  await copy("./manifest.firefox.json", `${OUT_DIR}/manifest.json`, {
    overwrite: true,
  });
  logInfo("Replaced with Firefox manifest");

  const zipPath = `${BUILD_DIR}/material_homepage_firefox.zip`;
  await createZip(OUT_DIR, `../material_homepage_firefox.zip`);

  logSuccess(`Firefox build created: ${zipPath}`);
}

/**
 * Main build function
 */
async function build() {
  console.log(
    `\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`
  );
  console.log(`${colors.bright}${colors.cyan}  Material Homepage - Build Script${colors.reset}`);
  console.log(
    `${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`
  );

  const startTime = performance.now();

  try {
    // Step 1: Clean build directory
    await cleanBuildDir();

    // Step 2: Create output directory
    await createOutputDir();

    // Step 3: Bundle JavaScript
    await bundleJavaScript();

    // Step 4: Bundle CSS
    await bundleCSS();

    // Step 5: Copy assets
    await copyAssets();

    // Step 6: Update HTML
    await updateHTML();

    // Step 7: Build Chromium ZIP
    await buildChromiumZip();

    // Step 8: Build Firefox ZIP
    await buildFirefoxZip();

    const endTime = performance.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log(
      `\n${colors.bright}${colors.green}═══════════════════════════════════════════════════════${colors.reset}`
    );
    console.log(
      `${colors.bright}${colors.green}  Build completed successfully in ${duration}s!${colors.reset}`
    );
    console.log(
      `${colors.bright}${colors.green}═══════════════════════════════════════════════════════${colors.reset}\n`
    );

    console.log(`${colors.bright}Output:${colors.reset}`);
    console.log(`  📁 Bundle directory: ${colors.yellow}${OUT_DIR}/${colors.reset}`);
    console.log(
      `  📦 Chromium ZIP: ${colors.yellow}${BUILD_DIR}/material_homepage_chromium.zip${colors.reset}`
    );
    console.log(
      `  📦 Firefox ZIP:  ${colors.yellow}${BUILD_DIR}/material_homepage_firefox.zip${colors.reset}\n`
    );
  } catch (error) {
    console.error(`\n${colors.bright}\x1b[31m✗ Build failed:${colors.reset}`, getErrorMessage(error));
    Deno.exit(1);
  }
}

// Run the build
if (import.meta.main) {
  await build();
}
