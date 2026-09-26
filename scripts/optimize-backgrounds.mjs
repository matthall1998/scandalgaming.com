import { readdir, rename, stat, mkdir } from "node:fs/promises";
import sharp from "sharp";

const scenes = [
  ["1.48.17", "pumpkin-path"],
  ["1.48.37", "moonlit-courtyard"],
  ["1.49.09", "horror-entrance"],
  ["1.49.34", "cobwebbed-room"],
  ["1.50.00", "iron-gate"],
];
const originals = new URL("../BACKGROUNDS/", import.meta.url);
const output = new URL("../public/images/backgrounds/", import.meta.url);
await mkdir(output, { recursive: true });
const files = await readdir(originals);
let originalBytes = 0;
let desktopBytes = 0;
let mobileBytes = 0;

for (const [timestamp, name] of scenes) {
  const source = new URL(`${name}.png`, originals);
  if (!files.includes(`${name}.png`)) {
    const oldName = files.find(
      (file) => file.includes(timestamp) && file.endsWith(".png"),
    );
    if (!oldName) throw new Error(`Missing source screenshot for ${name}`);
    await rename(new URL(oldName, originals), source);
  }
  originalBytes += (await stat(source)).size;
  const { width, height } = await sharp(source.pathname).metadata();
  const crop = {
    left: 0,
    top: Math.round(height * 0.13),
    width,
    height: Math.round(height * 0.55),
  };
  const desktop = await sharp(source.pathname)
    .extract(crop)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(new URL(`${name}.webp`, output).pathname);
  const mobile = await sharp(source.pathname)
    .extract(crop)
    .resize(720, 960, { fit: "cover", position: "centre" })
    .webp({ quality: 80, effort: 6 })
    .toFile(new URL(`${name}-mobile.webp`, output).pathname);
  desktopBytes += desktop.size;
  mobileBytes += mobile.size;
  console.log(
    `${name}: ${Math.round(desktop.size / 1024)} KB desktop, ${Math.round(mobile.size / 1024)} KB mobile`,
  );
}
await sharp(new URL("pumpkin-path.webp", output).pathname)
  .resize(1200)
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(new URL("social-preview.jpg", output).pathname);
console.log(
  JSON.stringify(
    {
      originalBytes,
      desktopBytes,
      mobileBytes,
      desktopReduction: `${(100 * (1 - desktopBytes / originalBytes)).toFixed(1)}%`,
    },
    null,
    2,
  ),
);
