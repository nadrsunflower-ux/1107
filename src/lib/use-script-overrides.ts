"use client";

import * as React from "react";

/** The presenter's edits for the deck's notes panel. Re-reads when the tab regains focus. */
export function useScriptOverrides(): Record<string, string> {
  const [overrides, setOverrides] = React.useState<Record<string, string>>({});
  React.useEffect(() => {
    let alive = true;
    const load = () => {
      fetch("/api/script", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (alive && d?.overrides) setOverrides(d.overrides);
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
  return overrides;
}
