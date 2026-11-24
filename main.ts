import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Alien Field Notes: The Two Day Earth Review
// One original line, at most 200 characters: an alien tourist's review of
// Earth, written to $MAKEFUN_OUTPUT_DIR/entry.txt (program/v1 harness).
const review =
  "Two days on Earth: humans pay to be flung around a screaming metal loop that lands them back where they started, then queue to go again. Five stars. Do not invade: they rehearse terror for fun.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), review, "utf8");
