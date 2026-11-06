"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Building,
  Cpu,
  Crown,
  Flag,
  Globe,
  Landmark,
  Network,
  Palette,
  ShoppingBag,
} from "lucide-react";
import { useStep } from "@/components/deck/context";
import { Build, Hl, Slide } from "@/components/deck/primitives";
import { MiniMap } from "@/components/viz/framework";
import { C, EASE } from "@/lib/design";

/* 16 */

type Factor = {
  icon: typeof Cpu;
  name: string;
  desc: React.ReactNode;
};

const EXTERNAL: Factor[] = [
  {
    icon: Activity,
    name: "환경 역동성",
    desc: (
      <>
        세상이 얼마나 빠르고
        <br />
        예측 못 하게 바뀌나
      </>
    ),
  },
  {
    icon: Cpu,
    name: "기술 발전",
    desc: (
      <>
        플랫폼·빅데이터·AI·IoT가
        <br />
        채널과 고객 관계를 바꾼다
      </>
    ),
  },
  { icon: ShoppingBag, name: "시장 변화", desc: "소비자 취향, 인구 구조, 새 경쟁자" },
  { icon: Landmark, name: "규제 변화", desc: "더 엄격한 법, 시장 개방 정책" },
];

const INTERNAL: Factor[] = [
  { icon: Flag, name: "전략", desc: "어떤 고객과 수익 구조를 택할까" },
  { icon: Network, name: "조직 설계", desc: "권한을 나누는 분권화, 여러 부서를 섞은 팀, 유연한 소통 통로" },
  {
    icon: Palette,
    name: "조직 문화",
    desc: (
      <>
        실험하는 문화는 변화에 강하다.
        <br />
        <Hl>“우린 원래 이렇게 해 왔어”</Hl>
        <br />
        (지배적 논리)는 머릿속 장벽
      </>
    ),
  },
  {
    icon: Crown,
    name: "리더십",
    desc: (
      <>
        기회를 보는 감각과 비전.
        <br />
        분산·상향식 리더십도 효과적
      </>
    ),
  },
];

function FactorCard({ f, tint }: { f: Factor; tint: string }) {
  const Icon = f.icon;
  return (
    <div className="flex h-[306px] flex-col rounded-[16px] bg-white px-[20px] py-[24px] ring-1 ring-line">
      <div className="flex size-[60px] items-center justify-center rounded-[14px] bg-a-soft">
        <Icon size={32} strokeWidth={2} style={{ color: tint }} />
      </div>
      <div className="mt-[20px] text-[29px] font-extrabold tracking-[-0.026em]">{f.name}</div>
      <p className="mt-[8px] text-[22px] leading-[1.42] tracking-[-0.014em] text-sub">{f.desc}</p>
    </div>
  );
}

function Row({
  icon,
  label,
  factors,
}: {
  icon: React.ReactNode;
  label: string;
  factors: Factor[];
}) {
  return (
    <div className="grid grid-cols-[56px_1fr] gap-[10px]">
      <div className="flex flex-col items-center justify-center gap-[6px] rounded-[14px] bg-a text-white">
        {icon}
        <span className="text-[19px] font-bold leading-[1.2] [writing-mode:vertical-rl]">{label}</span>
      </div>
      <div className="grid grid-cols-4 gap-[12px]">
        {factors.map((f) => (
          <FactorCard key={f.name} f={f} tint={C.a} />
        ))}
      </div>
    </div>
  );
}

export function S16Antecedents() {
  return (
    <Slide
      tag="Antecedents"
      kicker="A · 선행요인"
      title="왜 바꾸게 될까: 외부 원인과 내부 원인"
      mini={<MiniMap active="a" />}
      source="논문 §3.1"
    >
      <div className="flex flex-col gap-[14px]">
        <Row icon={<Globe size={24} />} label="외부 원인" factors={EXTERNAL} />
        <Build at={1} y={14}>
          <Row icon={<Building size={24} />} label="내부 원인" factors={INTERNAL} />
        </Build>
      </div>
    </Slide>
  );
}

/* 17 ----------------------------------------------------------- environmental dynamism */

const WAVE_W = 1456;
const WAVE_MID = 94;

function wavePath(from: number, to: number, amp: number, period: number, ampEnd = amp) {
  const pts: string[] = [];
  for (let x = from; x <= to; x += 4) {
    const t = (x - from) / (to - from);
    const a = amp + (ampEnd - amp) * t;
    const y = WAVE_MID + a * Math.sin((x / period) * Math.PI * 2);
    pts.push(`${pts.length === 0 ? "M" : "L"}${x},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

const COL = WAVE_W / 3;

const ZONES = [
  {
    d: wavePath(0, COL, 5, 240, 7),
    color: C.gray,
    name: "잔잔할 때",
    en: "Stable",
    what: "지금 모델을 효율적으로 다듬는 작은 개선",
    size: "점진적",
  },
  {
    d: wavePath(COL, COL * 2, 7, 130, 34),
    color: "#e0a077",
    name: "적당히 출렁일 때",
    en: "Dynamic",
    what: "현재 모델을 고치고 보완",
    size: "수정·보완",
  },
  {
    d: wavePath(COL * 2, WAVE_W, 34, 74, 80),
    color: C.a,
    name: "폭풍일 때",
    en: "Hypercompetitive",
    what: "급진적 혁신이 필요하고, 이때 동적 역량이 결정적",
    size: "급진적",
  },
];

export function S17Dynamism() {
  const step = useStep();
  return (
    <Slide
      kicker="A · 선행요인"
      tag="Environmental Dynamism"
      title="세상이 출렁일수록 더 큰 혁신이 필요하다"
      lead="외부 원인 중 첫째, 환경 역동성은 어떤 혁신이 필요한지를 정합니다."
      mini={<MiniMap active="a" />}
      source="논문 §3.1.1 (Liao et al., 2019; Wang et al., 2023; Schaffer et al., 2022). 곡선은 개념도이며 측정값이 아님"
    >
      <div className="relative">
        <svg
          width={WAVE_W}
          height="190"
          viewBox={`0 0 ${WAVE_W} 190`}
          role="img"
          aria-label="왼쪽의 잔잔한 물결에서 오른쪽의 큰 파도로 커지는 곡선"
        >
          <line x1="0" y1={WAVE_MID} x2={WAVE_W} y2={WAVE_MID} stroke={C.line} strokeWidth="1" />
          {ZONES.map((z, i) => (
            <motion.path
              key={z.name}
              d={z.d}
              fill="none"
              stroke={z.color}
              strokeWidth={i === 2 ? 4 : 3}
              strokeLinecap="round"
              initial={false}
              animate={{ pathLength: step >= i ? 1 : 0, opacity: step >= i ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          ))}
        </svg>
        <div className="mt-[10px] grid grid-cols-3 gap-[16px]">
          {ZONES.map((z, i) => (
            <Build key={z.name} at={i} y={14}>
              <motion.div
                className="flex h-[320px] flex-col rounded-[18px] p-[26px] ring-1"
                initial={false}
                animate={{ backgroundColor: i === 2 ? C.aSoft : C.surface }}
                style={{ boxShadow: i === 2 ? `inset 0 0 0 1.5px ${C.a}` : undefined }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <div className="text-[33px] font-extrabold tracking-[-0.028em]">{z.name}</div>
                <div className="t-cap">{z.en}</div>
                <p className="mt-[18px] text-[27px] font-medium leading-[1.42] tracking-[-0.02em]">{z.what}</p>
                <div className="mt-auto flex items-center gap-[10px]">
                  <span className="size-[14px] rounded-full" style={{ background: z.color }} />
                  <span className="text-[22px] font-bold">{z.size}</span>
                </div>
              </motion.div>
            </Build>
          ))}
        </div>
      </div>
    </Slide>
  );
}
