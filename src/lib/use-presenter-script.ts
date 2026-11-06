"use client";

import * as React from "react";

type ScriptResponse = { script?: Record<string, string>; overrides?: Record<string, string> };

/**
 * The presenter's script for the notes panel: the authored originals with the /script edits
 * laid over them. It comes from the local server rather than the bundle, so a deploy without
 * the script API (the public slides) carries none of it and gets null here.
 * Re-reads when the tab regains focus, so edits made on /script show up in the deck.
 */
export function usePresenterScript(): Record<string, string> | null {
  const [script, setScript] = React.useState<Record<string, string> | null>(null);
  React.useEffect(() => {
    let alive = true;
    const load = () => {
      fetch("/api/script", { cache: "no-store" })
        .then((r) => (r.ok ? (r.json() as Promise<ScriptResponse>) : null))
        .then((d) => {
          if (alive && d?.script) setScript({ ...d.script, ...d.overrides });
        })
        .catch(() => {});
    };
    load();
    window.addEventListener("focus", load);
    return () => {
      alive = false;
      window.removeEventListener("focus", load);
    };
  }, []);
  return script;
}
