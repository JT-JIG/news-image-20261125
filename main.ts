// News image for Wednesday 25 November 2026 (Node 22, standard library only).
//
// The entry is one 1024x1024 PNG, entry.png next to this file, drawn as a
// newspaper front page: Wall Street whipsaws — the Dow plunges 1,100 points
// intraday then closes up, Nvidia dives 9% before paring to -3.9% — the US
// proposes new tariffs on 14 economies, the first foreign astronaut boards
// China's Tiangong station, Poland plans a no-fly zone by Ukraine, and 24
// more dated stories from eight regions.
//
// This program copies that image to the grader's output directory. Before it
// writes anything it proves the file is a well-formed PNG the gate accepts:
// the eight-byte PNG signature, an IHDR chunk that declares 1024x1024, and a
// total size under 1 MiB. After writing it reads the output back and compares
// SHA-256 digests, so the two runs the grader makes always produce identical
// output.

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ONE_MIB = 1024 * 1024;
const MAX_DIMENSION = 1024;

// The eight bytes every PNG starts with.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

// Table-driven CRC-32, built once at load, for the chunk checksums below.
const CRC_TABLE: Uint32Array = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(data: Buffer): number {
  let crc = 0xffffffff;
  for (const byte of data) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

const root = dirname(fileURLToPath(import.meta.url));
const inputPath = join(root, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.png");

function sha256(data: Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}

const png = readFileSync(inputPath);

if (png.length > ONE_MIB) {
  throw new Error(`entry.png is ${png.length} bytes, over the 1 MiB cap`);
}
if (png.length < 33 || !png.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error("entry.png does not start with the PNG signature");
}
// The first chunk must be IHDR: 4-byte length (13), then the letters IHDR.
const firstLength = png.readUInt32BE(8);
const firstType = png.toString("latin1", 12, 16);
if (firstLength !== 13 || firstType !== "IHDR") {
  throw new Error(`first chunk is ${firstType} (${firstLength} bytes), not IHDR`);
}
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width === 0 || height === 0 || width > MAX_DIMENSION || height > MAX_DIMENSION) {
  throw new Error(`image dimensions ${width}x${height} are outside 1..1024`);
}
// Walk every chunk from IHDR to IEND, checking each stored CRC against the
// CRC of its type plus data, and confirm the file ends with the IEND chunk:
// a truncated or corrupted PNG is refused before anything is written.
let offset = 8;
let sawIend = false;
while (offset + 12 <= png.length) {
  const length = png.readUInt32BE(offset);
  const type = png.toString("latin1", offset + 4, offset + 8);
  const chunkEnd = offset + 12 + length;
  if (chunkEnd > png.length) {
    throw new Error(`chunk ${type} at offset ${offset} runs past the end of the file`);
  }
  const storedCrc = png.readUInt32BE(offset + 8 + length);
  if (crc32(png.subarray(offset + 4, offset + 8 + length)) !== storedCrc) {
    throw new Error(`chunk ${type} at offset ${offset} has a CRC mismatch`);
  }
  offset = chunkEnd;
  if (type === "IEND") {
    sawIend = true;
    break;
  }
}
if (!sawIend || offset !== png.length) {
  throw new Error("entry.png has no IEND trailer at the end of the file");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, png);

const written = readFileSync(outputPath);
if (sha256(written) !== sha256(png)) {
  throw new Error("output bytes differ from entry.png");
}
console.log(
  `wrote ${outputPath}: ${png.length} bytes, ${width}x${height}, sha256 ${sha256(png).slice(0, 16)}…`,
);
