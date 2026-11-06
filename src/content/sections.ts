import type { Tone } from "@/lib/design";

export const SECTIONS: { id: string; label: string; tone: Tone }[] = [
  { id: "intro", label: "도입", tone: "ink" },
  { id: "why", label: "배경", tone: "ink" },
  { id: "method", label: "방법", tone: "ink" },
  { id: "big", label: "큰 그림", tone: "ink" },
  { id: "a", label: "선행요인", tone: "a" },
  { id: "d", label: "결정", tone: "d" },
  { id: "o", label: "결과", tone: "o" },
  { id: "tcm", label: "연구 지형", tone: "t" },
  { id: "end", label: "결론", tone: "ink" },
];
