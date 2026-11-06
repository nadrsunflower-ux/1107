"use client";

import * as React from "react";
import Link from "next/link";
import { MotionConfig } from "framer-motion";
import { Check, CircleAlert, ExternalLink, Loader2, Pencil, Printer, RotateCcw } from "lucide-react";
import { PositionContext, StepContext } from "@/components/deck/context";
import { Tag } from "@/components/deck/primitives";
import { Button, buttonVariants } from "@/components/ui/button";
import { SLIDES, type SlideMeta } from "@/content/registry";
import {
  CHARS_PER_MINUTE,
  CLICK_MARK,
  SCRIPT,
  estimateSeconds,
  isOriginal,
  mmss,
  splitSegments,
  stepAtCaret,
} from "@/content/script";
import { SECTIONS } from "@/content/sections";
import { TOTAL_SLIDES_LABEL } from "./labels";
import { cn } from "@/lib/utils";

const PREVIEW_W = 440;
const SAVE_DELAY = 600;

type Overrides = Record<string, string>;
type Active = { index: number; step: number };
type SaveState = { kind: "idle" | "saving" | "error" } | { kind: "saved"; at: string };

const putScript = (id: string, text: string, keepalive = false) =>
  fetch("/api/script", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, text }),
    keepalive,
  });

const sectionOf = (s: SlideMeta) => (s.appendix ? "appendix" : s.section);

const NAV_GROUPS = [...SECTIONS, { id: "appendix", label: "부록", tone: "plain" as const }].map(
  (sec) => ({
    ...sec,
    items: SLIDES.map((s, i) => ({ s, i })).filter(({ s }) => sectionOf(s) === sec.id),
  }),
);

export function ScriptClient() {
  const [overrides, setOverrides] = React.useState<Overrides>({});
  const [loadState, setLoadState] = React.useState<"loading" | "ready" | "failed">("loading");
  const [saveState, setSaveState] = React.useState<SaveState>({ kind: "idle" });
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [active, setActive] = React.useState<Active>({ index: 0, step: 0 });

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const mainRef = React.useRef<HTMLElement | null>(null);
  const editingRef = React.useRef<string | null>(null);

  /* ------------------------------------------------------------- load */
  React.useEffect(() => {
    fetch("/api/script", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { overrides: Overrides }) => {
        setOverrides(d.overrides);
        setLoadState("ready");
      })
      .catch(() => setLoadState("failed"));
  }, []);

  /* ------------------------------------------------------------- save
     Typing marks a slide as pending; after a short pause pending slides are sent in
     order. A failed slide is remembered so nothing is lost and can be retried. */
  const pending = React.useRef(new Map<string, string>());
  const failed = React.useRef(new Map<string, string>());
  const inflight = React.useRef(0);
  const chain = React.useRef<Promise<unknown>>(Promise.resolve());
  const timer = React.useRef<number | undefined>(undefined);

  const flush = React.useCallback(() => {
    window.clearTimeout(timer.current);
    if (pending.current.size === 0) return;
    const items = [...pending.current];
    pending.current.clear();
    inflight.current += items.length;
    setSaveState({ kind: "saving" });
    for (const [id, text] of items) {
      chain.current = chain.current
        .then(() => putScript(id, text))
        .then((r) => {
          if (!r.ok) throw new Error(String(r.status));
          failed.current.delete(id);
        })
        .catch(() => {
          if (!pending.current.has(id)) failed.current.set(id, text);
        })
        .finally(() => {
          inflight.current -= 1;
          if (inflight.current > 0 || pending.current.size > 0) return;
          if (failed.current.size > 0) setSaveState({ kind: "error" });
          else {
            setSaveState({
              kind: "saved",
              at: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
            });
          }
        });
    }
  }, []);

  const retry = React.useCallback(() => {
    for (const [id, text] of failed.current) pending.current.set(id, text);
    failed.current.clear();
    flush();
  }, [flush]);

  const edit = React.useCallback(
    (id: string, text: string) => {
      setOverrides((o) => ({ ...o, [id]: text }));
      pending.current.set(id, text);
      setSaveState({ kind: "saving" });
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(flush, SAVE_DELAY);
    },
    [flush],
  );

  const reset = React.useCallback(
    (id: string, label: string) => {
      if (!window.confirm(`‘${label}’ 대본을 원본으로 되돌릴까요?\n이 장에서 수정한 내용은 사라집니다.`)) {
        return false;
      }
      edit(id, SCRIPT[id] ?? "");
      flush();
      return true;
    },
    [edit, flush],
  );

  /* leaving mid-pause still saves; only a failed save warns before closing */
  React.useEffect(() => {
    const onHide = () => {
      window.clearTimeout(timer.current);
      for (const [id, text] of pending.current) void putScript(id, text, true);
      pending.current.clear();
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };
    const onBefore = (e: BeforeUnloadEvent) => {
      if (failed.current.size > 0) e.preventDefault();
    };
    window.addEventListener("pagehide", onHide);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("beforeunload", onBefore);
    return () => {
      window.removeEventListener("pagehide", onHide);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("beforeunload", onBefore);
    };
  }, [flush]);

  /* ------------------------------------------------------- editing state */
  const startEdit = React.useCallback(
    (id: string, index: number) => {
      flush();
      editingRef.current = id;
      setEditingId(id);
      setActive({ index, step: 0 });
    },
    [flush],
  );

  const endEdit = React.useCallback(() => {
    flush();
    editingRef.current = null;
    setEditingId(null);
  }, [flush]);

  const pick = React.useCallback((index: number, step: number) => {
    setActive({ index, step: Math.min(step, SLIDES[index].steps - 1) });
  }, []);

  /* --------------------------------------- the preview follows the reading line */
  React.useEffect(() => {
    if (loadState !== "ready") return;
    const root = rootRef.current;
    const main = mainRef.current;
    if (!root || !main) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      if (editingRef.current) return;
      const m = main.getBoundingClientRect();
      const r = root.getBoundingClientRect();
      const el = document
        .elementFromPoint(m.left + m.width / 2, r.top + root.clientHeight * 0.35)
        ?.closest<HTMLElement>("[data-seg]");
      if (!el) return;
      const index = Number(el.dataset.index);
      const step = Math.min(Number(el.dataset.step), SLIDES[index].steps - 1);
      setActive((p) => (p.index === index && p.step === step ? p : { index, step }));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => {
      root.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [loadState]);

  /* /script#s-14 opens on that slide */
  React.useEffect(() => {
    if (loadState !== "ready") return;
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, [loadState]);

  const textOf = (id: string) => overrides[id] ?? SCRIPT[id] ?? "";
  const isEdited = (id: string) => overrides[id] !== undefined && !isOriginal(id, overrides[id]);
  const total = SLIDES.reduce(
    (sum, s) => sum + (s.appendix ? 0 : estimateSeconds(textOf(s.id))),
    0,
  );
  const editedCount = SLIDES.filter((s) => isEdited(s.id)).length;
  const activeSlide = SLIDES[active.index];

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={rootRef}
        className="h-dvh overflow-y-auto bg-paper text-ink print:h-auto print:overflow-visible print:bg-white"
      >
        {/* ------------------------------------------------------- top bar */}
        <header className="sticky top-0 z-20 border-b border-line bg-paper print:static print:border-0 print:bg-white">
          <div className="mx-auto flex h-[64px] max-w-[1560px] items-center gap-5 px-6">
            <div className="min-w-0 flex-1">
              <div className="text-[20px] font-extrabold tracking-[-0.02em]">발표 대본</div>
              <div className="truncate text-[13px] font-medium text-mute">
                회사는 ‘돈 버는 방식’을 어떻게 계속 바꿔 나갈까? · {TOTAL_SLIDES_LABEL}
              </div>
            </div>
            <div className="shrink-0 text-right" title={`공백 제외 분당 ${CHARS_PER_MINUTE}자 기준, 부록 제외`}>
              <div className="num text-[20px] font-extrabold tracking-[-0.01em]">{mmss(total)}</div>
              <div className="text-[12px] font-medium text-mute">예상 시간 · 목표 30~40분</div>
            </div>
            <div className="print:hidden">
              <SaveStatus state={saveState} onRetry={retry} editedCount={editedCount} />
            </div>
            <div className="flex shrink-0 items-center gap-2 print:hidden">
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer /> 인쇄
              </Button>
              <Link
                href="/"
                target="bmi-deck"
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                <ExternalLink /> 슬라이드 열기
              </Link>
            </div>
          </div>
        </header>

        {loadState === "failed" && (
          <div
            role="alert"
            className="mx-auto mt-4 max-w-[1100px] rounded-xl bg-a-soft px-5 py-4 text-[16px] font-medium ring-1 ring-a/40 print:hidden"
          >
            저장된 수정본을 읽지 못했습니다. 아래는 원본 대본이며, 내용을 지키기 위해 수정 기능을 잠갔습니다.
            <br />
            서버가 켜져 있는지, <code>content/script-overrides.json</code> 파일이 정상인지 확인해 주세요.
          </div>
        )}

        {loadState === "loading" ? (
          <div className="py-24 text-center text-[16px] text-mute">대본을 불러오는 중입니다.</div>
        ) : (
          <div className="mx-auto grid max-w-[1560px] gap-8 px-6 lg:grid-cols-[210px_minmax(0,1fr)] xl:grid-cols-[210px_minmax(0,1fr)_440px] print:block">
            {/* -------------------------------------------------- slide list */}
            <nav
              aria-label="슬라이드 목록"
              className="sticky top-[64px] hidden max-h-[calc(100dvh-64px)] self-start overflow-y-auto py-6 lg:block print:hidden"
            >
              {NAV_GROUPS.filter((g) => g.items.length > 0).map((g) => (
                <div key={g.id} className="mb-4">
                  <div className="mb-1 px-2 text-[12px] font-bold text-mute">{g.label}</div>
                  {g.items.map(({ s, i }) => (
                    <a
                      key={s.id}
                      href={`#s-${i + 1}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(`s-${i + 1}`)
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className={cn(
                        "flex items-baseline gap-2 rounded-md px-2 py-[3px] text-[13.5px] leading-[1.4] hover:bg-surface-2",
                        i === active.index ? "bg-surface-2 font-semibold text-ink" : "text-sub",
                      )}
                    >
                      <span className="num w-[20px] shrink-0 text-right text-mute">{i + 1}</span>
                      <span className="min-w-0 flex-1">{s.title}</span>
                      {isEdited(s.id) && (
                        <span aria-label="수정됨" className="size-[7px] shrink-0 rounded-full bg-a" />
                      )}
                    </a>
                  ))}
                </div>
              ))}
            </nav>

            {/* ---------------------------------------------------- the script */}
            <main ref={mainRef} className="min-w-0 py-4 pb-[60vh] print:pb-0">
              {SLIDES.map((s, i) => {
                const first = i === 0 || sectionOf(SLIDES[i - 1]) !== sectionOf(s);
                const group = NAV_GROUPS.find((g) => g.id === sectionOf(s));
                return (
                  <React.Fragment key={s.id}>
                    {first && group && (
                      <h2 className="mt-8 mb-1 text-[15px] font-bold text-mute first:mt-2 print:break-after-avoid">
                        {group.label}
                      </h2>
                    )}
                    <Article
                      index={i}
                      meta={s}
                      text={textOf(s.id)}
                      edited={isEdited(s.id)}
                      editing={editingId === s.id}
                      locked={loadState === "failed"}
                      activeStep={active.index === i ? active.step : -1}
                      onStart={startEdit}
                      onEnd={endEdit}
                      onChange={edit}
                      onReset={reset}
                      onPick={pick}
                    />
                  </React.Fragment>
                );
              })}
            </main>

            {/* -------------------------------------------------- live preview */}
            <aside className="sticky top-[64px] hidden self-start py-6 xl:block print:hidden">
              <SlidePreview index={active.index} step={active.step} />
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-[15px] font-bold">
                    {active.index + 1}장 · {activeSlide.title}
                  </div>
                  {activeSlide.steps > 1 && (
                    <div className="num text-[13px] font-medium text-mute">
                      {active.step === 0 ? "첫 화면" : `${active.step}번째 클릭 후`} · 이 장 클릭{" "}
                      {activeSlide.steps - 1}번
                    </div>
                  )}
                </div>
                <Link
                  href={`/#/${active.index + 1}${active.step ? `/${active.step}` : ""}`}
                  target="bmi-deck"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}
                >
                  <ExternalLink /> 이 화면 열기
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}

/* ------------------------------------------------------------------ status */

function SaveStatus({
  state,
  editedCount,
  onRetry,
}: {
  state: SaveState;
  editedCount: number;
  onRetry: () => void;
}) {
  return (
    <div className="flex w-[186px] shrink-0 items-center justify-end gap-2 text-[14px] font-medium" aria-live="polite">
      {state.kind === "saving" && (
        <>
          <Loader2 size={16} className="animate-spin text-mute" />
          <span className="text-mute">저장 중</span>
        </>
      )}
      {state.kind === "saved" && (
        <>
          <Check size={16} className="text-o" />
          <span className="text-sub">저장됨 {state.at}</span>
        </>
      )}
      {state.kind === "idle" && (
        <span className="text-mute">{editedCount > 0 ? `수정한 장 ${editedCount}개` : "수정 사항 없음"}</span>
      )}
      {state.kind === "error" && (
        <>
          <CircleAlert size={16} className="text-a" />
          <span className="font-semibold text-a">저장 실패</span>
          <Button variant="outline" size="xs" onClick={onRetry}>
            다시 시도
          </Button>
        </>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- article */

type ArticleProps = {
  index: number;
  meta: SlideMeta;
  text: string;
  edited: boolean;
  editing: boolean;
  locked: boolean;
  activeStep: number;
  onStart: (id: string, index: number) => void;
  onEnd: () => void;
  onChange: (id: string, text: string) => void;
  onReset: (id: string, label: string) => boolean;
  onPick: (index: number, step: number) => void;
};

const Article = React.memo(function Article({
  index,
  meta,
  text,
  edited,
  editing,
  locked,
  activeStep,
  onStart,
  onEnd,
  onChange,
  onReset,
  onPick,
}: ArticleProps) {
  const segments = splitSegments(text);
  const seconds = estimateSeconds(text);
  return (
    <article
      id={`s-${index + 1}`}
      className="scroll-mt-[72px] border-b border-line py-7 last:border-0 print:break-inside-avoid"
    >
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="num rounded-md bg-ink px-2 py-[2px] text-[14px] font-bold text-white">
          {index + 1}
        </span>
        <h3 className="text-[24px] font-extrabold leading-[1.3] tracking-[-0.022em]">{meta.title}</h3>
        {edited && <Tag tone="a">수정됨</Tag>}
        <span className="num ml-auto text-[14px] font-medium text-mute">{mmss(seconds)}</span>
        {!editing && (
          <Button
            variant="outline"
            size="sm"
            disabled={locked}
            onClick={() => onStart(meta.id, index)}
            className="print:hidden"
          >
            <Pencil /> 수정
          </Button>
        )}
      </div>

      {editing && (
        <Editor
          index={index}
          meta={meta}
          text={text}
          edited={edited}
          onEnd={onEnd}
          onChange={onChange}
          onReset={onReset}
          onPick={onPick}
        />
      )}
      {/* a slide being edited still prints as plain text */}
      <div className={editing ? "hidden print:block" : undefined}>
        <ReadView index={index} steps={meta.steps} segments={segments} activeStep={activeStep} onPick={onPick} />
      </div>
    </article>
  );
});

function ReadView({
  index,
  steps,
  segments,
  activeStep,
  onPick,
}: {
  index: number;
  steps: number;
  segments: string[];
  activeStep: number;
  onPick: (index: number, step: number) => void;
}) {
  const empty = segments.length === 1 && segments[0] === "";
  if (empty) return <p className="text-[16px] text-mute">대본 없음</p>;
  return (
    <div>
      {segments.map((seg, k) => (
        <React.Fragment key={k}>
          {k > 0 &&
            (k < steps ? (
              <div className="my-1 flex items-center gap-2" aria-label={`${k}번째 클릭`}>
                <span className="rounded-full bg-d-soft px-[9px] py-[1px] text-[12.5px] font-bold text-d">
                  클릭 {k}
                </span>
                <span className="h-px flex-1 bg-d/20" />
              </div>
            ) : (
              <hr className="my-3 border-0 border-t border-dashed border-line" />
            ))}
          <div
            data-seg
            data-index={index}
            data-step={k}
            onClick={() => onPick(index, k)}
            className={cn(
              "script-text -mx-3 whitespace-pre-line rounded-lg px-3 py-1 transition-colors duration-150",
              activeStep === Math.min(k, steps - 1) && "bg-white print:bg-transparent",
            )}
          >
            {seg || <span className="text-mute">대본 없음</span>}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function Editor({
  index,
  meta,
  text,
  edited,
  onEnd,
  onChange,
  onReset,
  onPick,
}: Omit<ArticleProps, "editing" | "locked" | "activeStep" | "onStart">) {
  const ref = React.useRef<HTMLTextAreaElement | null>(null);
  /* uncontrolled so Korean IME composition is never disturbed by a re-render */
  const [seed, setSeed] = React.useState({ key: 0, text });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    el.setSelectionRange(0, 0);
    onPick(index, 0);
    /* run on open and after a reset only */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed.key]);

  const syncCaret = () => {
    const el = ref.current;
    if (el) onPick(index, stepAtCaret(el.value, el.selectionStart ?? 0));
  };

  const insertClick = () => {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? start;
    const before = el.value.slice(0, start);
    const after = el.value.slice(end);
    const lead = before === "" || before.endsWith("\n") ? "" : "\n";
    const trail = after === "" || after.startsWith("\n") ? "" : "\n";
    const insert = `${lead}${CLICK_MARK}${trail}`;
    el.value = before + insert + after;
    const caret = start + insert.length;
    el.focus();
    el.setSelectionRange(caret, caret);
    onChange(meta.id, el.value);
    syncCaret();
  };

  const marks = splitSegments(text).length - 1;

  return (
    <div className="rounded-xl bg-white ring-[1.5px] ring-d print:hidden">
      <div className="grow-wrap" data-value={text}>
        <textarea
          key={seed.key}
          ref={ref}
          defaultValue={seed.text}
          aria-label={`${meta.title} 대본`}
          spellCheck={false}
          onInput={(e) => {
            onChange(meta.id, e.currentTarget.value);
            syncCaret();
          }}
          onSelect={syncCaret}
          onKeyDown={(e) => {
            if (e.key === "Escape") onEnd();
          }}
          className="w-full rounded-xl bg-transparent text-ink outline-none"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-line px-3 py-2">
        <Button variant="outline" size="sm" onClick={insertClick}>
          클릭 구분 넣기
        </Button>
        {meta.steps > 1 && (
          <span className="num text-[13px] font-medium text-mute">
            구분 {marks}개 · 이 장의 클릭 {meta.steps - 1}번
          </span>
        )}
        <div className="ml-auto flex items-center gap-2">
          {edited && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (onReset(meta.id, meta.title)) {
                  setSeed((p) => ({ key: p.key + 1, text: SCRIPT[meta.id] ?? "" }));
                }
              }}
            >
              <RotateCcw /> 원본으로 되돌리기
            </Button>
          )}
          <Button size="sm" onClick={onEnd}>
            <Check /> 완료
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- preview */

/** The real slide at its real build state, scaled down. */
function SlidePreview({ index, step }: Active) {
  const meta = SLIDES[index];
  const Comp = meta.Comp;
  const position = React.useMemo(
    () => ({ index, total: SLIDES.length, section: meta.section }),
    [index, meta.section],
  );
  const scale = PREVIEW_W / 1600;
  return (
    <div
      inert
      aria-hidden
      className="overflow-hidden rounded-xl bg-paper shadow-sm ring-1 ring-line"
      style={{ width: PREVIEW_W, height: 900 * scale }}
    >
      <div className="stage relative origin-top-left" style={{ transform: `scale(${scale})` }}>
        <PositionContext.Provider value={position}>
          <StepContext.Provider value={step}>
            <Comp key={meta.id} />
          </StepContext.Provider>
        </PositionContext.Provider>
      </div>
    </div>
  );
}
