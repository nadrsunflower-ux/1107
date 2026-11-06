"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Soup } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SECTIONS } from "@/content/sections";
import { C, EASE, type Tone } from "@/lib/design";
import { cn } from "@/lib/utils";
import { usePosition, useStep } from "./context";

/* ---------------------------------------------------------------- tones */

const PANEL_TONE: Record<Tone, string> = {
  plain: "bg-surface ring-line",
  a: "bg-a-soft ring-a/35",
  d: "bg-d-soft ring-d/35",
  o: "bg-o-soft ring-o/35",
  t: "bg-t-soft ring-t/35",
  ex: "bg-ex ring-ex-line",
  ink: "bg-night text-white ring-night",
};

const TAG_TONE: Record<Tone, string> = {
  plain: "bg-surface-2 text-sub",
  a: "bg-a text-white",
  d: "bg-d text-white",
  o: "bg-o text-white",
  t: "bg-t text-white",
  ex: "bg-ex-line text-ex-ink",
  ink: "bg-ink text-white",
};

export const TEXT_TONE: Record<Tone, string> = {
  plain: "text-ink",
  a: "text-a",
  d: "text-d",
  o: "text-o",
  t: "text-t",
  ex: "text-ex-ink",
  ink: "text-ink",
};

export const toneColor = (t: Tone) =>
  t === "a" ? C.a : t === "d" ? C.d : t === "o" ? C.o : t === "t" ? C.t : C.ink;

/* ---------------------------------------------------------- small atoms */

export function Tag({
  tone = "plain",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Badge
      className={cn(
        "h-auto rounded-full border-0 px-[12px] py-[4px] text-[15px] font-semibold tracking-[-0.005em]",
        TAG_TONE[tone],
        className,
      )}
    >
      {children}
    </Badge>
  );
}

export function En({ children }: { children: React.ReactNode }) {
  return <span className="t-en">{children}</span>;
}

export function Hl({ children }: { children: React.ReactNode }) {
  return <mark className="hl font-semibold">{children}</mark>;
}

export function Panel({
  tone = "plain",
  className,
  style,
  children,
}: {
  tone?: Tone;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <Card
      style={style}
      className={cn(
        "gap-[10px] rounded-[18px] p-[24px] text-[22px] leading-[1.5] text-ink shadow-none",
        PANEL_TONE[tone],
        className,
      )}
    >
      {children}
    </Card>
  );
}

/** The running example. It is ours, not the paper's, and always labelled as such. */
export function Ex({
  className,
  label = "떡볶이 가게 예시",
  children,
}: {
  className?: string;
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-[14px] bg-ex px-[20px] py-[12px] ring-1 ring-ex-line", className)}>
      <div className="mb-[2px] flex items-center gap-[6px] text-[15px] font-bold text-ex-ink">
        <Soup size={16} strokeWidth={2.4} />
        {label}
      </div>
      <div className="t-sm text-ink">{children}</div>
    </div>
  );
}

/* ---------------------------------------------------------------- build */

/** Reveals children once the deck has reached `at`. Space is reserved so nothing jumps. */
export function Build({
  at = 0,
  y = 14,
  x = 0,
  className,
  style,
  children,
}: {
  at?: number;
  y?: number;
  x?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  const step = useStep();
  const on = step >= at;
  return (
    <motion.div
      initial={false}
      animate={{ opacity: on ? 1 : 0, y: on ? 0 : y, x: on ? 0 : x }}
      transition={{ duration: 0.34, ease: EASE }}
      className={className}
      style={{ pointerEvents: on ? undefined : "none", ...style }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- slide */

export function Rail({ dark }: { dark?: boolean }) {
  const { section } = usePosition();
  const activeIdx = SECTIONS.findIndex((s) => s.id === section);
  return (
    <div className="flex items-center gap-[18px]">
      {SECTIONS.map((s, i) => {
        const active = i === activeIdx;
        const past = i < activeIdx;
        return (
          <div key={s.id} className="relative text-[14px] leading-none">
            <span
              style={{
                fontWeight: active ? 700 : 500,
                color: active
                  ? dark
                    ? "#fff"
                    : C.ink
                  : past
                    ? dark
                      ? "rgba(255,255,255,.62)"
                      : C.mute
                    : dark
                      ? "rgba(255,255,255,.4)"
                      : "#a9a79e",
              }}
            >
              {s.label}
            </span>
            {active && (
              <span
                className="absolute -bottom-[7px] left-0 right-0 h-[3px] rounded-full"
                style={{ background: dark ? "#fff" : s.tone === "ink" ? C.ink : undefined }}
              >
                {!dark && s.tone !== "ink" && (
                  <span
                    className="block h-full w-full rounded-full"
                    style={{ background: toneColor(s.tone) }}
                  />
                )}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Footer({ source, dark }: { source?: React.ReactNode; dark?: boolean }) {
  const { index, total } = usePosition();
  return (
    <div className="absolute inset-x-[72px] bottom-[16px] flex h-[30px] items-center justify-between gap-[24px]">
      <div
        className="min-w-0 truncate text-[15px] font-medium"
        style={{ color: dark ? "rgba(255,255,255,.6)" : C.mute }}
      >
        {source}
      </div>
      <div className="flex shrink-0 items-center gap-[26px]">
        <Rail dark={dark} />
        <div
          className="num w-[58px] text-right text-[15px] font-semibold"
          style={{ color: dark ? "rgba(255,255,255,.7)" : C.sub }}
        >
          {index + 1} / {total}
        </div>
      </div>
    </div>
  );
}

export function Slide({
  kicker,
  tag,
  title,
  lead,
  source,
  mini,
  children,
  tight,
}: {
  kicker?: React.ReactNode;
  tag?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  source?: React.ReactNode;
  mini?: React.ReactNode;
  tight?: boolean;
  children: React.ReactNode;
}) {
  const { section } = usePosition();
  const sec = SECTIONS.find((s) => s.id === section);
  return (
    <div className="absolute inset-0 bg-paper">
      <div className="absolute inset-x-[72px] top-[34px] bottom-[58px] flex flex-col">
        <header className={cn("relative shrink-0", mini ? "pr-[220px]" : "")}>
          <div className="mb-[8px] flex h-[28px] items-center gap-[10px]">
            <Tag tone={sec?.tone ?? "ink"}>{kicker ?? sec?.label}</Tag>
            {tag && <span className="text-[17px] font-semibold text-mute">{tag}</span>}
          </div>
          <h1 className="t-title">{title}</h1>
          {lead && <p className="t-lead mt-[6px]">{lead}</p>}
          {mini && <div className="absolute right-0 top-0">{mini}</div>}
        </header>
        <div className={cn("relative min-h-0 flex-1", tight ? "mt-[16px]" : "mt-[22px]")}>
          {children}
        </div>
      </div>
      <Footer source={source} />
    </div>
  );
}

/** Dark full-bleed slide for the title and closing beats. */
export function DarkSlide({
  source,
  children,
}: {
  source?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="on-dark absolute inset-0 bg-night text-white">
      <div className="absolute inset-x-[72px] top-[56px] bottom-[58px]">{children}</div>
      <Footer source={source} dark />
    </div>
  );
}

/* --------------------------------------------------------------- arrows */

export function ArrowRight({
  size = 40,
  color = C.mute,
  strokeWidth = 2.5,
}: {
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 40 24" fill="none" aria-hidden>
      <path d="M2 12H36" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path
        d="M27 3L37 12L27 21"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
