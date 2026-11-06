import fs from "node:fs/promises";
import path from "node:path";
import { isOriginal } from "@/content/script";

export type Overrides = Record<string, string>;

const FILE = path.join(process.cwd(), "content", "script-overrides.json");

/**
 * Only a missing file means "no edits yet". A file that exists but cannot be
 * parsed throws instead of returning {}, so the next save cannot silently wipe
 * the presenter's edits.
 */
export async function readOverrides(): Promise<Overrides> {
  let raw: string;
  try {
    raw = await fs.readFile(FILE, "utf8");
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw e;
  }
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("script-overrides.json is not an object");
  }
  return parsed as Overrides;
}

async function writeOverrides(map: Overrides): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.tmp`;
  await fs.writeFile(tmp, `${JSON.stringify(map, null, 2)}\n`, "utf8");
  await fs.rename(tmp, FILE); // atomic, so a crash mid-write cannot leave half a file
}

/* Read-modify-write runs one at a time so saves for different slides cannot overwrite each other. */
let queue: Promise<unknown> = Promise.resolve();

/** Stores `text` for a slide, or drops the entry when it matches the original again. */
export function saveOverride(id: string, text: string): Promise<void> {
  const run = queue.then(async () => {
    const map = await readOverrides();
    if (isOriginal(id, text)) delete map[id];
    else map[id] = text.replace(/\r\n/g, "\n");
    await writeOverrides(map);
  });
  queue = run.catch(() => {});
  return run;
}
