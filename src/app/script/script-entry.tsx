"use client";

import dynamic from "next/dynamic";

/* The live slide preview shares the deck's client-only components. */
const ScriptClient = dynamic(() => import("./script-client").then((m) => m.ScriptClient), {
  ssr: false,
});

export function ScriptEntry() {
  return <ScriptClient />;
}
