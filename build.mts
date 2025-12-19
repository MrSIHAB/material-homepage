/**
 * A script to bundle and build the extension to the `build/` folder. \
 * Install deno runtime and run the command : ```deno run -A --unstable-bundle build.js```
 */
import { exec } from "node:child_process";

const ROOT_DIR = ".";
const BUILD_DIR = `./build`;
const OUT_DIR = `${BUILD_DIR}/material_homepage`;

// Bundle the javascript files
console.log("Bundling javascript...");
await Deno.bundle({
  entrypoints: [`${ROOT_DIR}/main.js`],
  format: "esm",
  minify: true,
  outputDir: OUT_DIR,
  platform: "browser",
  outputPath: OUT_DIR + "/main.js",
});

// Copy necessary files to build folder
console.log(`Copying necessary files...`);
await exec(`mkdir -p ${OUT_DIR}/images`);
await exec(`cp -r index.html ${OUT_DIR}/index.html`);
await exec(`cp -r styles/ ${OUT_DIR}/styles/`);
await exec(`cp -r manifest.json ${OUT_DIR}/manifest.json`);
await exec(`cp -r fonts/ ${OUT_DIR}/fonts/`);
await exec(`cp -r images/favicon.ico ${OUT_DIR}/images/favicon.ico`);
await exec(`cp -r images/logo/ ${OUT_DIR}/images/logo/`);

// Building zip file for Chromium based browsers
console.log(`Building for chromium...`);
await exec(`zip -r ${BUILD_DIR}/material_homepage_chromium.zip ${OUT_DIR}/*`);

// Building zip file for firefox
console.log(`Building for moz...`);
await exec(`rm ${OUT_DIR}/manifest.json`);
await exec(`cp -r manifest.firefox.json ${OUT_DIR}/manifest.json`);
await exec(`zip -r ${BUILD_DIR}/material_homepage_moz.zip ${OUT_DIR}/*`);

// Complete message
console.log(
  `
Done: process was successful.
Bundle : ${OUT_DIR}/
ZIP:
  - Chromium: ${BUILD_DIR}/material_homepage_chromium.zip
  - Mozilla: ${BUILD_DIR}/material_homepage_moz.zip
  `
);
