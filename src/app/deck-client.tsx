"use client";

import dynamic from "next/dynamic";

/* The deck reads the URL hash and viewport on first render, so it runs client-only. */
const Deck = dynamic(() => import("@/components/deck/Deck").then((m) => m.Deck), {
  ssr: false,
});

export function DeckClient() {
  return <Deck />;
}
