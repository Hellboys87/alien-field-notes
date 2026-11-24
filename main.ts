// Alien Field Notes — a two-day Earth review, filed by one bemused visitor.
//
// The harness expects exactly one artefact: entry.txt inside the directory
// named by MAKEFUN_OUTPUT_DIR. The review itself is a single line of plain
// text, so this program keeps the text in one constant, validates it against
// the gate rules (one line, at most 200 characters), and writes it out.

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

// The review is assembled from its three beats — what the visitor saw, the
// rating they gave it, and the note they filed for any would-be invaders —
// then joined with single spaces so the emitted line stays exactly one line.
const REVIEW_PARTS = [
  "Two days on Earth: humans pay to be flung around a screaming metal loop that lands them back where they started, then queue to go again.",
  "Five stars.",
  "Do not invade: they rehearse terror for fun.",
] as const;

const REVIEW = REVIEW_PARTS.join(" ");

const MAX_CHARS = 200;

function checkReview(text: string): void {
  if (text.trim() !== text || text.includes("\n")) {
    throw new Error("review must be one clean line, no stray whitespace");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(`review is ${text.length} chars, limit is ${MAX_CHARS}`);
  }
}

async function main(): Promise<void> {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  checkReview(REVIEW);
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, "entry.txt"), REVIEW + "\n", "utf8");
  console.log(`wrote entry.txt (${REVIEW.length} chars)`);
}

await main();
