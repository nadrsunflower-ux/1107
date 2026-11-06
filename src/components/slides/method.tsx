"use client";

import { motion } from "framer-motion";
import { ChefHat, Library, User } from "lucide-react";
import { useStep } from "@/components/deck/context";
import { ArrowRight, Build, En, Panel, Slide, Tag } from "@/components/deck/primitives";
import { C, EASE } from "@/lib/design";

/* 11 ---------------------------------------------------------------- PRISMA funnel */

const LEVELS = [
  {
    n: 579,
    name: "① 찾기",
    en: "Identification",
    fill: "#d8d5ca",
    ink: C.ink,
    note: (
      <>
        <b className="font-bold">두 데이터베이스</b>에서 검색
        <br />
        Web of Science 290편 + Scopus 289편
      </>
    ),
  },
  {
    n: 201,
    name: "② 거르기",
    en: "Screening",
    fill: "#a8a59a",
    ink: C.ink,
    note: (
      <>
        <b className="font-bold">378편 제외</b>
        <br />
        Q1·Q2 아님 199 · 문서 유형 125 · 중복 51 · 언어 3
      </>
    ),
  },
  {
    n: 144,
    name: "③ 자격 확인",
    en: "Eligibility",
    fill: "#6e6d66",
    ink: "#fff",
    note: (
      <>
        <b className="font-bold">둘의 ‘관계’를 다루는가?</b>
        <br />
        제목·초록·키워드로 판단하고, 애매하면 전문을 읽었다
      </>
    ),
  },
  {
    n: 57,
    name: "④ 최종 포함",
    en: "Inclusion",
    fill: C.ink,
    ink: "#fff",
    note: (
      <>
        <b className="font-bold">마지막 거름망</b>
        <br />
        BMI만, 동적 역량만, 또는 둘의 관계가 핵심이 아닌 논문 제외
      </>
    ),
  },
];

const F_W = 700;
const BAR_H = 84;
const GAP_H = 72;

export function S11Funnel() {
  const step = useStep();
  const widthOf = (n: number) => (n / 579) * F_W;
  const yOf = (i: number) => i * (BAR_H + GAP_H);
  return (
    <Slide
      kicker="연구 방법"
      tag="Systematic Literature Review · PRISMA"
      title="579편 → 57편"
      lead="검색 2023년 9월 · 영어 학술 논문 · 상위 50% 학술지(Q1·Q2) · 분야와 연도 제한 없음"
      source="논문 그림 1 · §2.1–2.4. 막대 길이는 논문 수에 비례"
    >
      <div className="relative h-[596px]">
        {LEVELS.map((l, i) => (
          <Build key={l.n} at={i} y={0}>
            <div
              className="absolute left-0 flex h-[84px] w-[170px] flex-col justify-center"
              style={{ top: yOf(i) }}
            >
              <div className="text-[25px] font-bold tracking-[-0.022em]">{l.name}</div>
              <div className="t-cap">{l.en}</div>
            </div>
          </Build>
        ))}

        <svg
          width={F_W}
          height={596}
          viewBox={`0 0 ${F_W} 596`}
          className="absolute left-[176px] top-0"
          role="img"
          aria-label="579편에서 201편, 144편을 거쳐 최종 57편으로 줄어드는 깔때기"
        >
          {LEVELS.map((l, i) => {
            const w = widthOf(l.n);
            const prevW = i === 0 ? w : widthOf(LEVELS[i - 1].n);
            const on = step >= i;
            const cx = F_W / 2;
            return (
              <g key={l.n}>
                {i > 0 && (
                  <motion.polygon
                    initial={false}
                    animate={{ opacity: on ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    points={`${cx - prevW / 2},${yOf(i - 1) + BAR_H} ${cx + prevW / 2},${yOf(i - 1) + BAR_H} ${cx + w / 2},${yOf(i)} ${cx - w / 2},${yOf(i)}`}
                    fill={C.surface2}
                  />
                )}
                <motion.rect
                  initial={false}
                  animate={{
                    width: on ? w : prevW,
                    x: on ? cx - w / 2 : cx - prevW / 2,
                    opacity: on ? 1 : 0,
                  }}
                  transition={{ duration: 0.62, ease: EASE }}
                  y={yOf(i)}
                  height={BAR_H}
                  rx={6}
                  fill={l.fill}
                />
                <motion.text
                  initial={false}
                  animate={{ opacity: on ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  x={cx}
                  y={yOf(i) + BAR_H / 2 + 11}
                  textAnchor="middle"
                  fontSize={l.n === 57 ? 28 : 36}
                  fontWeight={800}
                  letterSpacing="-0.02em"
                  fill={l.ink}
                >
                  {l.n}편
                </motion.text>
              </g>
            );
          })}
        </svg>

        {LEVELS.map((l, i) => (
          <Build key={l.n} at={i} x={14} y={0}>
            <div
              className="absolute left-[908px] w-[548px] text-[23px] leading-[1.42] tracking-[-0.014em] text-sub"
              style={{ top: yOf(i) - 2, minHeight: BAR_H }}
            >
              {l.note}
            </div>
          </Build>
        ))}
      </div>
    </Slide>
  );
}

/* 12 ---------------------------------------------------------------- ADO + TCM */

function Letter({
  ch,
  ko,
  en,
  color,
  desc,
}: {
  ch: string;
  ko: string;
  en: string;
  color: string;
  desc: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-[14px] bg-white p-[14px] text-center ring-1 ring-line">
      <div
        className="flex size-[84px] items-center justify-center rounded-[18px] text-[46px] font-extrabold text-white"
        style={{ background: color }}
      >
        {ch}
      </div>
      <div className="mt-[14px] text-[31px] font-extrabold tracking-[-0.026em]">{ko}</div>
      <div className="t-cap">{en}</div>
      <div className="t-body mt-[10px] font-medium text-sub">{desc}</div>
    </div>
  );
}

export function S12Frames() {
  return (
    <Slide
      kicker="연구 방법"
      title="2가지의 분석 틀"
      lead="연구 질문 1은 ADO로, 질문 2는 TCM으로, 질문 3은 둘을 합쳐서 답합니다."
      source="Paul et al. (2023) · 논문 §2.5"
    >
      <div className="grid h-[580px] grid-cols-2 gap-[24px]">
        <Panel tone="d" className="gap-[14px] p-[26px]">
          <div className="flex items-center gap-[10px]">
            <Tag tone="d">ADO</Tag>
            <div className="t-h">이야기의 줄거리</div>
          </div>
          <div className="flex flex-1 items-stretch gap-[10px]">
            <Letter ch="A" color={C.a} ko="선행요인" en="Antecedents" desc="왜 시작했나" />
            <Letter ch="D" color={C.d} ko="결정" en="Decisions" desc="무엇을 했나" />
            <Letter ch="O" color={C.o} ko="결과" en="Outcomes" desc="어떻게 됐나" />
          </div>
          <div className="flex items-center gap-[16px] rounded-[14px] bg-white/70 p-[18px]">
            <ChefHat size={34} className="shrink-0 text-d" />
            <p className="t-body">
              요리로 치면 <b className="font-semibold">재료 → 조리 과정 → 완성된 요리</b>
            </p>
          </div>
        </Panel>
        <Build at={1} y={0} x={14} className="h-full">
          <Panel tone="t" className="h-full gap-[14px] p-[26px]">
            <div className="flex items-center gap-[10px]">
              <Tag tone="t">TCM</Tag>
              <div className="t-h">연구의 ‘연구 방식’</div>
            </div>
            <div className="flex flex-1 items-stretch gap-[10px]">
              <Letter ch="T" color={C.t} ko="이론" en="Theories" desc="어떤 이론으로" />
              <Letter ch="C" color={C.t} ko="맥락" en="Context" desc="어느 나라·회사를" />
              <Letter ch="M" color={C.t} ko="방법" en="Methods" desc="어떤 방법으로" />
            </div>
            <div className="flex items-center gap-[16px] rounded-[14px] bg-white/70 p-[18px]">
              <Library size={34} className="shrink-0 text-t" />
              <p className="t-body">
                요리로 치면 <b className="font-semibold">누가 어떤 레시피와 도구로 실험했나</b>
              </p>
            </div>
          </Panel>
        </Build>
      </div>
    </Slide>
  );
}

/* 13 ---------------------------------------------------------------- intercoder reliability */

function Meter({
  value,
  label,
  text,
  on,
  color,
}: {
  value: number;
  label: string;
  text: string;
  on: boolean;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="t-sm font-medium text-sub">{label}</span>
        <motion.span
          initial={false}
          animate={{ opacity: on ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[52px] font-extrabold leading-[1.1] tracking-[-0.03em]"
        >
          {text}
        </motion.span>
      </div>
      <div className="mt-[6px] h-[30px] rounded-[4px] bg-surface-2">
        <motion.div
          initial={false}
          animate={{ width: on ? `${value * 100}%` : "0%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="h-full rounded-r-[4px]"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

export function S13Reliability() {
  const step = useStep();
  return (
    <Slide
      kicker="연구 방법"
      tag="Intercoder Reliability"
      title="믿을 만한가: 두 명이 따로 읽고 대조했다"
      lead="두 선생님이 같은 시험지를 따로 채점했는데 점수가 거의 같게 나온 셈입니다."
      source="논문 §2.5. κ는 ‘일반적인 우연 일치 수준’을 가정해 계산한 값으로, 모두 상당한 일치(substantial) 수준"
    >
      <div className="grid h-[580px] grid-cols-[1fr_440px] gap-[28px]">
        <Panel className="gap-[20px] p-[28px]">
          <div className="grid grid-cols-2 gap-[36px]">
            <div className="flex flex-col gap-[28px]">
              <div className="t-h">ADO·TCM 분류</div>
              <Meter on={step >= 0} value={0.87} text="87%" label="두 사람의 분류가 같았던 비율" color={C.grayDark} />
              <Meter on={step >= 1} value={0.69} text="κ ≈ 0.69" label="우연히 일치한 몫을 뺀 일치도" color={C.t} />
            </div>
            <div className="flex flex-col gap-[28px]">
              <div className="t-h">과정 주제 분류</div>
              <Meter on={step >= 0} value={0.9} text="90%" label="두 사람의 분류가 같았던 비율" color={C.grayDark} />
              <Meter on={step >= 1} value={0.75} text="κ ≈ 0.75" label="우연히 일치한 몫을 뺀 일치도" color={C.t} />
            </div>
          </div>
          <Build at={1} className="mt-auto">
            <div className="rounded-[14px] bg-t-soft px-[24px] py-[18px] text-[25px] font-semibold tracking-[-0.018em] ring-1 ring-t/30">
              통계에서 <b className="font-extrabold">“상당한 일치”</b>로 보는 수준. 의견이 달랐던 건 모두 토론해서 정리했다.
            </div>
          </Build>
          <div className="t-cap">코딩 대상: 57편 전체 이중 코딩(double-coded)</div>
        </Panel>

        <Build at={2} x={14} y={0} className="h-full">
          <Panel tone="d" className="h-full gap-[14px] p-[26px]">
            <div className="t-h text-d">핵심인 ‘결정’은 이렇게 정리했다</div>
            <div className="flex items-center gap-[10px]">
              <User size={30} className="text-d" />
              <User size={30} className="text-d" />
              <span className="t-sm font-medium text-sub">15편 읽을 때마다 모여 분류를 다듬음</span>
            </div>
            <div className="mt-auto flex flex-col items-center gap-[12px]">
              <div className="text-center">
                <div className="text-[64px] font-extrabold leading-none tracking-[-0.03em] text-sub">5</div>
                <div className="t-sm font-medium text-sub">처음 잡은 범주</div>
              </div>
              <div className="rotate-90">
                <ArrowRight size={44} color={C.d} />
              </div>
              <div className="text-center">
                <div className="text-[64px] font-extrabold leading-none tracking-[-0.03em] text-d">4 + 2</div>
                <div className="t-sm font-medium">
                  <b className="font-bold">4개 과정</b> + <b className="font-bold">2개 공통 역량</b>
                </div>
              </div>
            </div>
            <p className="t-cap mt-auto">
              귀납적 주제 분석 <En>Inductive thematic analysis</En>
            </p>
          </Panel>
        </Build>
      </div>
    </Slide>
  );
}
