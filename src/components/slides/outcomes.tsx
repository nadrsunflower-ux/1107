"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Leaf, Monitor, Recycle, Wrench } from "lucide-react";
import { useStep } from "@/components/deck/context";
import { Build, En, Hl, Panel, Slide } from "@/components/deck/primitives";
import { MiniMap } from "@/components/viz/framework";
import { C, EASE } from "@/lib/design";

/* 29 ------------------------------------------------------- 2x2 scope x novelty */

const CELLS = [
  {
    at: 0,
    ko: "진화적 BMI",
    en: "Evolutionary",
    def: "하위 시스템 하나를 조금씩 다듬기",
    ex: "배달앱에 입점해 전달 채널만 넓힌다",
  },
  {
    at: 1,
    ko: "집중적 BMI",
    en: "Focused",
    def: "일부만 바꾸지만 업계 최초",
    ex: "동네 분식집 최초로 소스 정기배송을 얹는다",
  },
  {
    at: 2,
    ko: "적응적 BMI",
    en: "Adaptive",
    def: "모델 전체를 바꾸기",
    ex: "가게를 남들처럼 밀키트·구독 중심으로 바꾼다",
  },
  {
    at: 3,
    ko: "복합적 BMI",
    en: "Complex",
    def: "전체를 바꾸고 업계에도 처음 (가장 급진적)",
    ex: "누구도 안 해 본 방식으로 가게 전체를 새로 짠다",
    hot: true,
  },
];

export function S29Matrix() {
  return (
    <Slide
      kicker="O · 결과"
      tag="Dimensions of BMI"
      title="얼마나, 어디까지 바꿨나: 네 칸으로 본다"
      lead="대부분의 연구는 부품만 바꾸는 모듈형과 전체 구조를 바꾸는 아키텍처형으로 나눕니다."
      mini={<MiniMap active="o" />}
      source="Foss & Saebi (2017, 2018) · 논문 §3.3.1 · 노란 글씨 줄은 이해를 돕는 예시"
    >
      <div className="grid h-[580px] grid-cols-[150px_1fr_1fr] grid-rows-[50px_1fr_1fr] gap-[10px]">
        <div />
        <AxisHead>우리 회사에만 새로움</AxisHead>
        <AxisHead>업계 전체에도 새로움</AxisHead>
        <AxisHead>
          일부 부품만 바꿈
          <br />
          <En>모듈형</En>
        </AxisHead>
        <Cell c={CELLS[0]} />
        <Cell c={CELLS[1]} />
        <AxisHead>
          전체 구조를 바꿈
          <br />
          <En>아키텍처형</En>
        </AxisHead>
        <Cell c={CELLS[2]} />
        <Cell c={CELLS[3]} />
      </div>
    </Slide>
  );
}

function AxisHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center rounded-[12px] bg-surface-2 px-[10px] text-center text-[20px] font-bold leading-[1.32] tracking-[-0.016em] text-sub">
      <span>{children}</span>
    </div>
  );
}

function Cell({ c }: { c: (typeof CELLS)[number] }) {
  const step = useStep();
  const on = step >= c.at;
  return (
    <motion.div
      initial={false}
      animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.97 }}
      transition={{ duration: 0.34, ease: EASE }}
      className="flex flex-col justify-center rounded-[16px] px-[28px]"
      style={{
        background: c.hot ? C.o : C.oSoft,
        color: c.hot ? "#fff" : C.ink,
        boxShadow: c.hot ? "none" : `inset 0 0 0 1px ${C.o}55`,
      }}
    >
      <div className="flex items-baseline gap-[10px]">
        <span className="text-[33px] font-extrabold tracking-[-0.028em]" style={{ color: c.hot ? "#fff" : C.o }}>
          {c.ko}
        </span>
        <span className="text-[17px] font-medium" style={{ color: c.hot ? "rgba(255,255,255,.8)" : C.mute }}>
          {c.en}
        </span>
      </div>
      <p className="text-[24px] font-medium leading-[1.4] tracking-[-0.018em]">{c.def}</p>
      <p
        className="mt-[8px] text-[19px] font-semibold leading-[1.38]"
        style={{ color: c.hot ? "#ffe58a" : C.exInk }}
      >
        {c.ex}
      </p>
    </motion.div>
  );
}

/* 30 ------------------------------------------------------- learning -> BMI type -> performance */

const COLS = [0, 548, 1096];
const NODE_W = 360;
const ROWS = [8, 168, 372];
const NODE_H = 124;

type FlowRow = {
  at: number;
  learn: [string, string];
  bmi: [string, string];
  perf: [string, string];
  hot?: boolean;
};

const FLOWS: FlowRow[] = [
  {
    at: 0,
    learn: ["활용적 학습", "있는 것을 다듬기"],
    bmi: ["효율 중심 BMI", "과정 최적화 · 비용 절감"],
    perf: ["특히 재무 성과", "Financial performance"],
  },
  {
    at: 1,
    learn: ["탐색적 학습", "새것을 실험하기"],
    bmi: ["새로움 중심 BMI", "실험 · 신기술로 시장을 흔들기"],
    perf: ["특히 시장 성과", "Market performance"],
  },
  {
    at: 2,
    learn: ["활용 + 탐색 동시에", "지금의 돈줄 + 미래의 돌파구"],
    bmi: ["양손잡이 BMI", "Ambidextrous BMI"],
    perf: ["오래가는 경쟁우위", "Sustained competitive advantage"],
    hot: true,
  },
];

function FlowNode({
  x,
  y,
  title,
  sub,
  on,
  hot,
  soft,
}: {
  x: number;
  y: number;
  title: string;
  sub: string;
  on: boolean;
  hot?: boolean;
  soft?: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: on ? 1 : 0, x: on ? 0 : -12 }}
      transition={{ duration: 0.34, ease: EASE }}
      className="absolute flex flex-col justify-center rounded-[16px] px-[24px]"
      style={{
        left: x,
        top: y,
        width: NODE_W,
        height: NODE_H,
        background: hot ? C.o : soft ? C.oSoft : C.surface,
        color: hot ? "#fff" : C.ink,
        boxShadow: hot ? "none" : `inset 0 0 0 1.5px ${soft ? C.o : C.line}`,
      }}
    >
      <div className="text-[29px] font-extrabold leading-[1.22] tracking-[-0.026em]">{title}</div>
      <div
        className="text-[18px] font-medium leading-[1.35]"
        style={{ color: hot ? "rgba(255,255,255,.85)" : C.sub }}
      >
        {sub}
      </div>
    </motion.div>
  );
}

export function S30Flow() {
  const step = useStep();
  return (
    <Slide
      kicker="O · 결과"
      tag="Efficiency · Novelty · Ambidexterity"
      title="학습의 방향이 혁신의 성격과 성과를 가른다"
      mini={<MiniMap active="o" />}
      source="Zott & Amit (2010); Randhawa et al. (2021); Yuan et al. (2021); Ciampi et al. (2021) · 논문 §3.3.2–3.3.3"
    >
      <div className="relative h-[516px]">
        <svg
          width="1456"
          height="516"
          viewBox="0 0 1456 516"
          className="absolute inset-0"
          role="img"
          aria-label="활용적 학습은 효율 중심 BMI와 재무 성과로, 탐색적 학습은 새로움 중심 BMI와 시장 성과로, 둘을 함께 하면 양손잡이 BMI와 오래가는 경쟁우위로 이어진다"
        >
          <defs>
            <marker id="flow-m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill={C.o} />
            </marker>
          </defs>
          {FLOWS.map((f, r) =>
            [0, 1].map((c) => (
              <motion.path
                key={`${r}-${c}`}
                d={`M${COLS[c] + NODE_W + 8} ${ROWS[r] + NODE_H / 2} H${COLS[c + 1] - 10}`}
                stroke={C.o}
                strokeWidth={f.hot ? 5 : 3}
                markerEnd="url(#flow-m)"
                initial={false}
                animate={{ pathLength: step >= f.at ? 1 : 0, opacity: step >= f.at ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            )),
          )}
        </svg>
        {FLOWS.map((f, r) => (
          <div key={r}>
            <FlowNode x={COLS[0]} y={ROWS[r]} title={f.learn[0]} sub={f.learn[1]} on={step >= f.at} />
            <FlowNode x={COLS[1]} y={ROWS[r]} title={f.bmi[0]} sub={f.bmi[1]} on={step >= f.at} soft={!f.hot} hot={f.hot} />
            <FlowNode x={COLS[2]} y={ROWS[r]} title={f.perf[0]} sub={f.perf[1]} on={step >= f.at} />
          </div>
        ))}
        <Build at={2} y={0} className="absolute inset-x-0 top-[324px] flex items-center gap-[16px]">
          <div className="h-px flex-1 bg-line" />
          <span className="text-[19px] font-semibold text-mute">둘을 동시에 하면</span>
          <div className="h-px flex-1 bg-line" />
        </Build>
      </div>
      <Build at={1} className="mt-[14px]">
        <p className="text-center text-[24px] font-medium tracking-[-0.016em] text-sub">
          효율형과 새로움형은 <b className="font-bold text-ink">둘 다 성과에 도움</b>이 됩니다. 어느 쪽이 더 강한지가 다를 뿐입니다.
        </p>
      </Build>
    </Slide>
  );
}

/* 31 ------------------------------------------------------- emerging BMI types and outcomes */

const OLD_PERF = ["조직 성과", "재무 성과", "시장 성과", "혁신 성과"];
const NEW_PERF = ["적응력", "조직 학습", "모델의 지속적 갱신"];

export function S31Emerging() {
  return (
    <Slide
      kicker="O · 결과"
      tag="Sustainable · Circular · Digital BMI"
      title="BMI의 종류도, 성과의 범위도 넓어지고 있다"
      mini={<MiniMap active="o" />}
      source="논문 §3.3.4 · §3 요약 (Bocken & Geradts, 2020; Xu et al., 2021 등)"
    >
      <div className="grid h-[640px] grid-cols-[1fr_520px] gap-[22px]">
        <div className="flex flex-col gap-[14px]">
          <Panel className="flex-1 justify-center gap-[8px] p-[28px]">
            <div className="flex items-center gap-[12px]">
              <Leaf size={32} className="text-o" />
              <Recycle size={32} className="text-o" />
              <div className="text-[31px] font-extrabold tracking-[-0.026em]">지속가능 · 순환 BMI</div>
            </div>
            <p className="text-[25px] leading-[1.46] tracking-[-0.016em]">
              돈만이 아니라 <Hl>경제·사회·환경</Hl> 세 가지 성과(트리플 바텀라인)를 함께 노린다.
              순환경제는 환경 문제에 맞춰 모델을 바꾸는 새 연구 흐름이다. 포용적 성장과 저소득 소비자를 위한 사회 혁신도 여기에 든다.
            </p>
          </Panel>
          <Panel className="flex-1 justify-center gap-[8px] p-[28px]">
            <div className="flex items-center gap-[12px]">
              <Monitor size={32} className="text-o" />
              <Wrench size={32} className="text-o" />
              <div className="text-[31px] font-extrabold tracking-[-0.026em]">디지털 BMI · 서비스화</div>
            </div>
            <p className="text-[25px] leading-[1.46] tracking-[-0.016em]">
              신기술이 비즈니스 모델의 핵심 부품을 바꾼다. 제조업체가 제품에 서비스를 붙이는 서비스화도 모델을 다시 설계해야 하는 일이다.
            </p>
          </Panel>
        </div>
        <Panel tone="o" className="gap-[14px] p-[28px]">
          <div className="t-h text-o">최종 성과는 무엇으로 볼까</div>
          <div className="grid grid-cols-2 gap-[10px]">
            {OLD_PERF.map((p) => (
              <div key={p} className="rounded-[12px] bg-white py-[18px] text-center text-[24px] font-bold tracking-[-0.02em]">
                {p}
              </div>
            ))}
          </div>
          <Build at={1} y={12} className="mt-auto">
            <div className="rounded-[14px] bg-o p-[22px] text-white">
              <div className="text-[19px] font-semibold text-white/85">논문이 여기에 더해 강조하는 것</div>
              <div className="mt-[10px] flex flex-col gap-[6px]">
                {NEW_PERF.map((p) => (
                  <div key={p} className="text-[33px] font-extrabold leading-[1.26] tracking-[-0.028em]">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </Build>
        </Panel>
      </div>
    </Slide>
  );
}
