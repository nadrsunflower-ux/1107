/**
 * How script text is split into clicks and timed. Kept apart from the script itself so the
 * deck can use it without bundling a single line of the presenter's words.
 */

export const CLICK_MARK = "---";

/** Same basis as the Ch.2 deck: Korean speech at about 320 non-space chars a minute. */
export const CHARS_PER_MINUTE = 320;

const DIVIDER_LINE = /^[ \t]*---[ \t]*$/m;

export function splitSegments(text: string): string[] {
  return text.split(DIVIDER_LINE).map((s) => s.trim());
}

export function speechChars(text: string): number {
  return text.split(DIVIDER_LINE).join("").replace(/\s+/g, "").length;
}

export function estimateSeconds(text: string): number {
  return Math.round((speechChars(text) / CHARS_PER_MINUTE) * 60);
}

export function mmss(total: number): string {
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Which click block a caret position falls in. */
export function stepAtCaret(text: string, caret: number): number {
  const before = text.slice(0, caret);
  const matches = before.match(new RegExp(DIVIDER_LINE.source, "gm"));
  return matches ? matches.length : 0;
}
