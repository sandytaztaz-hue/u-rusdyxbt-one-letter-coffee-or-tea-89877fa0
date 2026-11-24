// One Letter: Coffee or Tea — entry program.
//
// Writes exactly one letter, "A" (coffee), to entry.txt in the output
// directory. The competition brief allows nothing else: one letter, no
// word, no explanation, no punctuation. The gate requires entry.txt to
// be UTF-8 text of exactly 1 character, so no trailing newline is added.
//
// Output directory resolution, in order:
//   1. the MAKEFUN_OUTPUT_DIR environment variable
//   2. an --output command-line flag
//   3. /output as the default
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LETTER: string = "A";

// The gate refuses anything that is not exactly one character, so fail
// loudly here instead of writing a bad entry.
if (LETTER.length !== 1) {
  throw new Error("entry letter must be exactly one character");
}

function resolveOutputDir(argv: string[]): string {
  const fromEnv: string | undefined = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv !== "") {
    return fromEnv;
  }
  const flagIndex: number = argv.indexOf("--output");
  if (flagIndex >= 0 && argv[flagIndex + 1] !== undefined && argv[flagIndex + 1] !== "") {
    return argv[flagIndex + 1];
  }
  const equalsArg: string | undefined = argv.find((arg: string): boolean =>
    arg.startsWith("--output="),
  );
  if (equalsArg !== undefined) {
    const value: string = equalsArg.slice("--output=".length);
    if (value !== "") {
      return value;
    }
  }
  return "/output";
}

const outputDir: string = resolveOutputDir(process.argv.slice(2));
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LETTER, "utf8");
