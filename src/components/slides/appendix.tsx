"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Slide } from "@/components/deck/primitives";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EASE } from "@/lib/design";
import { cn } from "@/lib/utils";

/* 42 ------------------------------------------------------- quiz (click to reveal) */

const QUIZ = [
  [
    "운영 역량과 동적 역량은 어떻게 다를까?",
    "운영 역량은 하던 일을 효율적으로 하는 힘. 동적 역량은 환경이 빠르게 바뀔 때 회사 안팎의 능력을 합치고·새로 만들고·다시 짜는 힘.",
  ],
  [
    "이 논문은 몇 편을, 어떤 기준으로 골랐을까?",
    "PRISMA에 따라 579편에서 57편으로. 영어 학술 논문, Q1·Q2 학술지, BMI와 동적 역량의 ‘관계’가 핵심인 연구.",
  ],
  [
    "‘결정’의 4가지 과정과 2가지 공통 역량은?",
    "전략적 감지, BM (재)설계, 재구성·자원 정렬, 조직 학습 지향. 공통 역량은 동적 관리 역량과 이해관계자 관리 역량.",
  ],
  [
    "단일 루프와 이중 루프를 온도조절기로 설명하면?",
    "단일 루프는 “추우면 난방을 켠다”. 이중 루프는 “목표 온도 자체가 맞나?”처럼 전제를 의심한다.",
  ],
  [
    "탐색적·활용적 학습은 어떤 BMI와 성과로 이어질까?",
    "탐색은 새로움 중심 BMI로, 특히 시장 성과. 활용은 효율 중심 BMI로, 특히 재무 성과. 둘을 함께 하면 양손잡이 BMI.",
  ],
  [
    "이 분야 연구의 ‘쏠림’ 두 가지는?",
    "지역은 중국·독일(논문 표현으로 약 40%). 방법은 질적 사례 연구가 절반가량이고 종단·혼합·실험은 드물다.",
  ],
];

export function S42Quiz() {
  const [open, setOpen] = React.useState<Record<number, boolean>>({});
  return (
    <Slide
      kicker="부록"
      tag="누르면 답이 나옵니다"
      title="확인 퀴즈"
      source="쉬운 정리 자료의 확인 퀴즈"
    >
      <div className="grid h-[660px] grid-cols-2 grid-rows-3 gap-[16px]">
        {QUIZ.map(([q, a], i) => (
          <button
            key={q}
            type="button"
            onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
            className={cn(
              "flex flex-col justify-center rounded-[16px] p-[22px] text-left ring-1 transition-colors",
              open[i] ? "bg-d-soft ring-d/40" : "bg-white ring-line hover:bg-surface-2",
            )}
          >
            <div className="text-[25px] font-bold leading-[1.3] tracking-[-0.022em]">
              <span className="mr-[8px] text-d">Q{i + 1}.</span>
              {q}
            </div>
            <AnimatePresence initial={false}>
              {open[i] && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="mt-[8px] text-[20px] leading-[1.42] tracking-[-0.012em] text-sub"
                >
                  {a}
                </motion.p>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </Slide>
  );
}

/* 43, 44 ---------------------------------------------------- glossary */

const GLOSSARY = [
  ["비즈니스 모델 혁신", "Business Model Innovation (BMI)", "돈 버는 설계도를 새로 고치기"],
  ["동적 역량", "Dynamic Capabilities (DC)", "변화에 맞춰 능력을 합치고·만들고·다시 짜는 힘"],
  ["운영 역량", "Operational capabilities", "하던 일을 효율적으로 하는 힘"],
  ["감지·포착·전환", "Sensing · Seizing · Transforming", "알아채기 · 붙잡기 · 회사 바꾸기"],
  ["미시적 기반", "Microfoundations", "역량이 실제로 나오는 곳(사람·루틴·구조·관계)"],
  ["동적 관리 역량", "Dynamic Managerial Capabilities (DMC)", "리더 개인의 변화 주도 능력"],
  ["이해관계자 관리 역량", "Stakeholder Management Capabilities (SMC)", "고객·파트너·정부 등과 함께 일하는 능력"],
  ["가치 제안", "Value proposition", "고객에게 주는 ‘무엇’"],
  ["수익 모델", "Revenue model", "돈 받는 방식(구독, 사용량 요금 등)"],
  ["서비스화", "Servitization", "제품에 서비스를 붙여 파는 것"],
  ["흡수 역량", "Absorptive capacity", "바깥 지식을 알아보고 소화해서 써먹는 힘"],
  ["자원 오케스트레이션", "Resource orchestration", "자원을 지휘자처럼 배치하기"],
  ["전략적 유연성", "Strategic flexibility", "자원을 돌려쓰고 새로 조합하기"],
  ["전략적 민첩성", "Strategic agility", "변화에 맞춰 전략 자원을 재빨리 묶어 내는 힘"],
  ["지배적 논리", "Dominant logic", "“원래 이렇게 해 왔어”라는 굳은 생각"],
  ["경로 의존성", "Path dependence", "과거의 선택이 미래 선택을 묶어 두는 현상"],
  ["주변 시야 / 의미 만들기", "Peripheral vision / Sense-making", "약한 신호 잡기 / 정보를 행동 가능한 통찰로"],
  ["단일·이중 루프 학습", "Single- / Double-loop learning", "틀 안에서 조정 / 틀 자체를 의심"],
  ["탐색 / 활용", "Exploration / Exploitation", "새것 찾기 / 있는 것 다듬기"],
  ["양손잡이", "Ambidexterity", "탐색과 활용을 동시에"],
  ["최소 기능 제품", "MVP (Minimum Viable Product)", "반응을 보려고 만든 가장 간단한 시제품"],
  ["최고경영진", "TMT (Top Management Team)", "회사의 핵심 의사결정자 그룹"],
  ["체계적 문헌 고찰", "Systematic Literature Review (SLR)", "규칙을 정해 논문을 모아 정리하는 연구"],
  ["ADO / TCM", "Antecedents-Decisions-Outcomes / Theories-Context-Methods", "원인-결정-결과 / 이론-맥락-방법으로 정리하는 틀"],
];

function GlossaryTable({ rows }: { rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-[16px] bg-white ring-1 ring-line">
      <Table className="text-[19px]">
        <TableHeader>
          <TableRow className="border-line bg-surface-2 hover:bg-surface-2">
            <TableHead className="h-[44px] w-[310px] pl-[24px] text-[17px] font-bold text-sub">우리말</TableHead>
            <TableHead className="h-[44px] w-[520px] text-[17px] font-bold text-sub">원문</TableHead>
            <TableHead className="h-[44px] text-[17px] font-bold text-sub">쉬운 뜻</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(([ko, en, v]) => (
            <TableRow key={ko} className="border-line hover:bg-transparent">
              <TableCell className="h-[48px] whitespace-normal py-[6px] pl-[24px] text-[20px] font-bold tracking-[-0.018em]">
                {ko}
              </TableCell>
              <TableCell className="h-[48px] whitespace-normal py-[6px] text-[17px] font-medium text-mute">
                {en}
              </TableCell>
              <TableCell className="h-[48px] whitespace-normal py-[6px] text-[19px]">{v}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function S43Glossary1() {
  return (
    <Slide kicker="부록" tag="한국어 ↔ 원문" title="용어 사전 1" source="쉬운 정리 자료의 용어 사전">
      <GlossaryTable rows={GLOSSARY.slice(0, 12)} />
    </Slide>
  );
}

export function S44Glossary2() {
  return (
    <Slide kicker="부록" tag="한국어 ↔ 원문" title="용어 사전 2" source="쉬운 정리 자료의 용어 사전">
      <GlossaryTable rows={GLOSSARY.slice(12)} />
    </Slide>
  );
}
