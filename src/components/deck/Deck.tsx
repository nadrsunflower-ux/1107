"use client";

import * as React from "react";
import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutGrid,
  Maximize2,
  Minimize2,
  NotebookText,
  RotateCcw,
  X,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SLIDES } from "@/content/registry";
import { SCRIPT, estimateSeconds, mmss, splitSegments } from "@/content/script";
import { SECTIONS } from "@/content/sections";
import { C } from "@/lib/design";
import { useScriptOverrides } from "@/lib/use-script-overrides";
import { cn } from "@/lib/utils";
import { PositionContext, StepContext } from "./context";
import { Stage } from "./Stage";

const COUNT = SLIDES.length;

function readHash(): { index: number; step: number } {
  const m = /^#\/(\d+)(?:\/(\d+))?/.exec(window.location.hash);
  if (!m) return { index: 0, step: 0 };
  const index = Math.max(0, Math.min(COUNT - 1, parseInt(m[1], 10) - 1));
  const step = m[2] ? Math.max(0, Math.min(SLIDES[index].steps - 1, parseInt(m[2], 10))) : 0;
  return { index, step };
}

export function Deck() {
  const [pos, setPos] = React.useState(readHash);
  const [notesOpen, setNotesOpen] = React.useState(false);
  const [overviewOpen, setOverviewOpen] = React.useState(false);
  const [isFull, setIsFull] = React.useState(false);
  const [startedAt, setStartedAt] = React.useState<number | null>(null);
  const [now, setNow] = React.useState(0);

  const { index, step } = pos;
  const meta = SLIDES[index];

  /* times are estimated from the script text, so edits on /script move them too */
  const overrides = useScriptOverrides();
  const textOf = React.useCallback(
    (id: string) => overrides[id] ?? SCRIPT[id] ?? "",
    [overrides],
  );
  const timing = React.useMemo(() => {
    const seconds = SLIDES.map((s) => (s.appendix ? 0 : estimateSeconds(textOf(s.id))));
    const starts = seconds.reduce<number[]>((acc, _sec, i) => {
      acc.push(i === 0 ? 0 : acc[i - 1] + seconds[i - 1]);
      return acc;
    }, []);
    return { seconds, starts, total: seconds.reduce((sum, sec) => sum + sec, 0) };
  }, [textOf]);
  const segments = splitSegments(textOf(meta.id));
  const currentSegment = Math.min(step, segments.length - 1);
  const currentSegmentRef = React.useRef<HTMLParagraphElement | null>(null);

  React.useEffect(() => {
    currentSegmentRef.current?.scrollIntoView({ block: "nearest" });
  }, [index, step, notesOpen]);

  const next = React.useCallback(() => {
    setStartedAt((t) => t ?? Date.now());
    setPos(({ index: i, step: s }) => {
      if (s < SLIDES[i].steps - 1) return { index: i, step: s + 1 };
      if (i < COUNT - 1) return { index: i + 1, step: 0 };
      return { index: i, step: s };
    });
  }, []);

  const prev = React.useCallback(() => {
    setPos(({ index: i, step: s }) => {
      if (s > 0) return { index: i, step: s - 1 };
      if (i > 0) return { index: i - 1, step: SLIDES[i - 1].steps - 1 };
      return { index: i, step: s };
    });
  }, []);

  const jump = React.useCallback((i: number, s = 0) => {
    setPos({ index: Math.max(0, Math.min(COUNT - 1, i)), step: s });
  }, []);

  /* hash keeps your place on reload: #/slide/step */
  React.useEffect(() => {
    const target = step > 0 ? `#/${index + 1}/${step}` : `#/${index + 1}`;
    if (window.location.hash !== target) window.history.replaceState(null, "", target);
  }, [index, step]);

  React.useEffect(() => {
    const onHash = () => setPos(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const toggleFull = React.useCallback(() => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.().catch(() => {});
  }, []);

  React.useEffect(() => {
    const onFs = () => setIsFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  /* keyboard lives on document, never on a focused element (Safari weak focus) */
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (overviewOpen) {
        if (k === "o") setOverviewOpen(false);
        return;
      }
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
        case "Enter":
          e.preventDefault();
          next();
          return;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
        case "Backspace":
          e.preventDefault();
          prev();
          return;
        case "Home":
          e.preventDefault();
          jump(0);
          return;
        case "End":
          e.preventDefault();
          jump(COUNT - 1);
          return;
      }
      if (k === "n") setNotesOpen((v) => !v);
      if (k === "o") setOverviewOpen(true);
      if (k === "f") toggleFull();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [next, prev, jump, toggleFull, overviewOpen]);

  /* timer only ticks while the notes panel can show it */
  React.useEffect(() => {
    if (!notesOpen) return;
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [notesOpen]);

  /* click anywhere advances; the left edge goes back; controls inside a slide keep their click */
  const onStageClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = e.target as HTMLElement;
      if (el.closest("button, a, [data-no-advance]")) return;
      const box = e.currentTarget.getBoundingClientRect();
      if (e.clientX - box.left < box.width * 0.12) prev();
      else next();
    },
    [next, prev],
  );

  const Comp = meta.Comp;
  const position = React.useMemo(
    () => ({ index, total: COUNT, section: meta.section }),
    [index, meta.section],
  );
  const elapsed = startedAt ? Math.max(0, (now - startedAt) / 1000) : 0;

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-dvh w-screen">
        <div className="group/stage relative min-w-0 flex-1">
          <Stage background={meta.bg ?? (meta.dark ? C.night : C.paper)} onClick={onStageClick}>
            <PositionContext.Provider value={position}>
              <StepContext.Provider value={step}>
                <motion.div
                  key={meta.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.18 }}
                  className="absolute inset-0"
                >
                  <Comp />
                </motion.div>
              </StepContext.Provider>
            </PositionContext.Provider>
          </Stage>

          {/* controls: stay out of the way until the pointer moves near them */}
          <div
            className="absolute bottom-[10px] right-[10px] z-20 flex items-center gap-1 rounded-xl bg-white/95 p-1 opacity-0 shadow-md ring-1 ring-line transition-opacity duration-150 hover:opacity-100 focus-within:opacity-100"
            data-no-advance
          >
            <CtrlButton label="이전 (←)" onClick={prev}>
              <ChevronLeft />
            </CtrlButton>
            <CtrlButton label="다음 (→ · Space)" onClick={next}>
              <ChevronRight />
            </CtrlButton>
            <CtrlButton label="전체 보기 (O)" onClick={() => setOverviewOpen(true)}>
              <LayoutGrid />
            </CtrlButton>
            <CtrlButton label="발표자 노트 (N)" onClick={() => setNotesOpen((v) => !v)}>
              <NotebookText />
            </CtrlButton>
            <CtrlButton
              label="대본 사이트 열기"
              onClick={() => window.open(`/script#s-${index + 1}`, "bmi-script")}
            >
              <FileText />
            </CtrlButton>
            <CtrlButton label="전체 화면 (F)" onClick={toggleFull}>
              {isFull ? <Minimize2 /> : <Maximize2 />}
            </CtrlButton>
          </div>
        </div>

        {notesOpen && (
          <aside className="flex h-full w-[400px] shrink-0 flex-col gap-4 overflow-y-auto border-l border-line bg-white p-5 text-[15px] leading-[1.6] text-ink">
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-semibold text-mute">
                {index + 1} / {COUNT} · {SECTIONS.find((s) => s.id === meta.section)?.label}
                {meta.steps > 1 && ` · 단계 ${step + 1}/${meta.steps}`}
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="노트 닫기"
                onClick={() => setNotesOpen(false)}
              >
                <X />
              </Button>
            </div>
            <div className="text-[18px] font-bold leading-[1.35]">{meta.title}</div>
            <div className="flex flex-col gap-2">
              {segments.map((seg, i) => (
                <p
                  key={i}
                  ref={i === currentSegment ? currentSegmentRef : undefined}
                  className={cn(
                    "whitespace-pre-line rounded-lg px-3 py-2 text-[16px] leading-[1.7]",
                    i === currentSegment ? "bg-d-soft font-medium text-ink" : "text-mute",
                  )}
                >
                  {seg || "대본 없음"}
                </p>
              ))}
            </div>
            <Link
              href={`/script#s-${index + 1}`}
              target="bmi-script"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "self-start")}
            >
              <FileText /> 이 장 대본 수정
            </Link>
            <Separator />
            <div className="grid grid-cols-2 gap-3 text-[13px]">
              <Metric label="이 장 예상" value={mmss(timing.seconds[index])} />
              <Metric label="예상 시작" value={mmss(timing.starts[index])} />
              <Metric label="경과 시간" value={mmss(elapsed)} />
              <Metric label="전체 예상" value={mmss(timing.total)} />
            </div>
            <Progress
              value={timing.total ? Math.min(100, (timing.starts[index] / timing.total) * 100) : 0}
              aria-label="전체 대비 위치"
            />
            <Button
              variant="outline"
              size="sm"
              className="self-start"
              onClick={() => {
                setStartedAt(Date.now());
                setNow(Date.now());
              }}
            >
              <RotateCcw /> 타이머 다시 시작
            </Button>
            <p className="mt-auto text-[13px] text-mute">
              → Space 다음 · ← 이전 · O 전체 보기 · N 노트 · F 전체 화면 · 화면 왼쪽 끝 클릭은 뒤로
            </p>
          </aside>
        )}
      </div>

      <Dialog open={overviewOpen} onOpenChange={setOverviewOpen}>
        <DialogContent className="max-h-[86vh] w-[min(1080px,92vw)] max-w-none overflow-y-auto sm:max-w-none">
          <DialogHeader>
            <DialogTitle className="text-[18px] font-bold">
              전체 {COUNT}장 · 예상 {mmss(timing.total)}
            </DialogTitle>
          </DialogHeader>
          <div className="columns-2 gap-6">
            {SECTIONS.concat([{ id: "appendix", label: "부록", tone: "plain" }]).map((sec) => {
              const items = SLIDES.map((s, i) => ({ s, i })).filter(
                ({ s }) => s.section === sec.id || (sec.id === "appendix" && s.appendix),
              );
              if (!items.length) return null;
              return (
                <div key={sec.id} className="mb-4 break-inside-avoid">
                  <div className="mb-1 text-[13px] font-bold text-mute">{sec.label}</div>
                  {items
                    .filter(({ s }) => sec.id === "appendix" || !s.appendix)
                    .map(({ s, i }) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          jump(i);
                          setOverviewOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-baseline gap-2 rounded-md px-2 py-1 text-left text-[14px] hover:bg-surface-2",
                          i === index && "bg-surface-2 font-semibold",
                        )}
                      >
                        <span className="num w-[24px] shrink-0 text-right text-mute">{i + 1}</span>
                        <span>{s.title}</span>
                      </button>
                    ))}
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </MotionConfig>
  );
}

function CtrlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button variant="ghost" size="icon-sm" aria-label={label} onClick={onClick} />}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-mute">{label}</div>
      <div className="num text-[17px] font-bold">{value}</div>
    </div>
  );
}
