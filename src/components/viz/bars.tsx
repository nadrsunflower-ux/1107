"use client";

import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { C, EASE } from "@/lib/design";

export type BarRow = { label: string; n: number; hi?: boolean };

/**
 * Horizontal bars: one series, one baseline, 4px rounded data-end, value at the tip.
 * Emphasis comes from highlighting the row the story is about and graying the rest.
 */
export function Bars({
  rows,
  total,
  on = true,
  labelW = 360,
  trackW = 760,
  rowH = 46,
  fontSize = 21,
  color = C.t,
  showPct = true,
}: {
  rows: BarRow[];
  total: number;
  on?: boolean;
  labelW?: number;
  trackW?: number;
  rowH?: number;
  fontSize?: number;
  color?: string;
  showPct?: boolean;
}) {
  const max = Math.max(...rows.map((r) => r.n));
  /* leave room at the far end so the value label on the longest bar is never clipped */
  const scale = (trackW - (showPct ? 130 : 70)) / max;
  return (
    <div role="list">
      {rows.map((r, i) => {
        const pct = Math.round((r.n / total) * 100);
        const msg = `${r.label} · ${r.n}편 (${pct}%)`;
        return (
          <Tooltip key={r.label}>
            <TooltipTrigger
              render={
                <div
                  role="listitem"
                  aria-label={msg}
                  className="flex cursor-default items-center gap-[14px]"
                  style={{ height: rowH }}
                />
              }
            >
              <div
                className="shrink-0 text-right leading-[1.25] tracking-[-0.014em]"
                style={{
                  width: labelW,
                  fontSize,
                  fontWeight: r.hi ? 700 : 500,
                  color: r.hi ? C.ink : C.sub,
                }}
              >
                {r.label}
              </div>
              <div className="flex items-center gap-[10px]" style={{ width: trackW }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: on ? Math.max(4, r.n * scale) : 0 }}
                  transition={{ duration: 0.75, ease: EASE, delay: on ? i * 0.035 : 0 }}
                  className="h-[24px] shrink-0 rounded-r-[4px]"
                  style={{ background: r.hi ? color : C.gray }}
                />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: on ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: on ? 0.25 + i * 0.035 : 0 }}
                  className="num shrink-0 whitespace-nowrap"
                  style={{
                    fontSize,
                    fontWeight: r.hi ? 800 : 500,
                    color: r.hi ? C.ink : C.sub,
                  }}
                >
                  {r.n}편{showPct && ` · ${pct}%`}
                </motion.span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-[14px]">
              {msg}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
