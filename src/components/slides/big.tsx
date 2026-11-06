"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Handshake, User } from "lucide-react";
import { useStep } from "@/components/deck/context";
import { ArrowRight, Build, En, Slide } from "@/components/deck/primitives";
import { DecisionLoop } from "@/components/viz/framework";
import { C, EASE } from "@/lib/design";

/* 14 ------------------------------------------------- the paper's big picture (Fig. 2, ADO) */

function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-1 flex-col justify-center rounded-[12px] bg-white px-[16px] py-[10px]">
      <div className="text-[18px] font-bold text-a">{title}</div>
      <ul className="mt-[2px] text-[24px] font-semibold leading-[1.42] tracking-[-0.018em]">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function OBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col justify-center rounded-[12px] bg-white px-[16px] py-[10px]">
      <div className="text-[18px] font-bold text-o">{title}</div>
      <div className="text-[21px] font-semibold leading-[1.4] tracking-[-0.016em]">{children}</div>
    </div>
  );
}

export function S14BigPicture() {
  const step = useStep();
  return (
    <Slide
      kicker="큰 그림"
      tag="ADO Framework"
      title="한 장으로 보는 논문의 결론"
      source="논문 그림 2를 쉬운 말로 다시 그림. 점선 화살표는 ‘재귀적 과정’ 서술을 표현한 것으로 원 그림에는 없음"
    >
      <div className="relative h-[660px]">
        {/* A */}
        <Build at={0} y={0} className="absolute left-0 top-0 w-[276px]">
          <div className="flex h-[578px] flex-col gap-[10px] rounded-[18px] bg-a-soft p-[14px] ring-[1.5px] ring-a">
            <div className="px-[4px]">
              <div className="text-[26px] font-extrabold tracking-[-0.024em] text-a">① 선행요인</div>
              <div className="text-[18px] font-semibold text-sub">왜 바꾸게 되나?</div>
            </div>
            <MiniList title="외부" items={["환경 역동성", "기술 발전", "시장 변화", "규제 변화"]} />
            <MiniList title="내부" items={["전략", "조직 설계", "조직 문화", "리더십"]} />
          </div>
        </Build>

        <Build at={1} x={-10} y={0} className="absolute left-[282px] top-[228px]">
          <ArrowRight size={40} color={C.ink} />
        </Build>

        {/* D */}
        <Build at={1} y={0} className="absolute left-[328px] top-0 w-[800px]">
          <div className="relative h-[464px] rounded-[18px] bg-d-soft ring-[1.5px] ring-d">
            <div className="absolute left-[22px] top-[14px]">
              <div className="text-[26px] font-extrabold tracking-[-0.024em] text-d">② 결정 (핵심)</div>
              <div className="text-[18px] font-semibold text-sub">어떻게 바꾸나?</div>
            </div>
            <div className="absolute left-[50px] top-[66px]">
              <DecisionLoop nodes={step >= 1} engine={step >= 2} flow={step >= 2} />
            </div>
          </div>
        </Build>

        {/* cross-cutting pillars */}
        <Build at={3} y={12} className="absolute left-[328px] top-[474px] w-[800px]">
          <div className="grid grid-cols-2 gap-[14px]">
            <Pillar
              icon={<User size={28} strokeWidth={2.2} className="text-d" />}
              title="동적 관리 역량"
              sub="리더 개인의 능력"
            />
            <Pillar
              icon={<Handshake size={28} strokeWidth={2.2} className="text-d" />}
              title="이해관계자 관리 역량"
              sub="바깥과 협력하는 능력"
            />
          </div>
        </Build>

        <Build at={4} x={-10} y={0} className="absolute left-[1130px] top-[228px]">
          <ArrowRight size={40} color={C.ink} />
        </Build>

        {/* O */}
        <Build at={4} x={14} y={0} className="absolute left-[1176px] top-0 w-[280px]">
          <div className="flex h-[578px] flex-col gap-[8px] rounded-[18px] bg-o-soft p-[14px] ring-[1.5px] ring-o">
            <div className="px-[4px]">
              <div className="text-[26px] font-extrabold tracking-[-0.024em] text-o">③ 결과</div>
              <div className="text-[18px] font-semibold text-sub">바꾸면 어떻게 되나?</div>
            </div>
            <OBox title="BMI 범위">일부 부품만 vs 구조 전체</OBox>
            <OBox title="BMI 종류">
              효율형 · 새로움형
              <br />
              양손잡이형 · 지속가능
              <br />
              순환 · 디지털
            </OBox>
            <OBox title="성과">
              경쟁 · 재무 성과
              <br />
              시장 성과 · 혁신
            </OBox>
          </div>
        </Build>

        {/* recursive arrow: not in the original figure; drawn from the 'recursive process' wording */}
        <svg
          width="1456"
          height="660"
          viewBox="0 0 1456 660"
          className="pointer-events-none absolute inset-0"
          aria-hidden
        >
          <defs>
            <marker
              id="rec-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill={C.ink} />
            </marker>
          </defs>
          <motion.path
            d="M1316 582 V620 H138 V584"
            fill="none"
            stroke={C.ink}
            strokeWidth="2.5"
            strokeDasharray="8 7"
            markerEnd="url(#rec-arrow)"
            initial={false}
            animate={{ opacity: step >= 5 ? 1 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          />
        </svg>
        <Build at={5} y={0} className="absolute inset-x-0 top-[603px] flex justify-center">
          <div className="rounded-full bg-paper px-[20px] text-[22px] font-bold leading-[34px] tracking-[-0.016em]">
            결과는 다음 바퀴의 출발점: 재귀적·역량 주도 과정 <En>recursive, capability-driven</En>
          </div>
        </Build>
      </div>
    </Slide>
  );
}

function Pillar({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div
      className="flex h-[104px] items-center gap-[14px] rounded-[14px] bg-white px-[20px]"
      style={{ boxShadow: `inset 0 0 0 2px ${C.d}` }}
    >
      {icon}
      <div>
        <div className="text-[24px] font-bold leading-[1.2] tracking-[-0.022em]">{title}</div>
        <div className="text-[18px] font-medium text-sub">{sub} · 모든 과정을 받침</div>
      </div>
    </div>
  );
}

/* 15 ------------------------------------------------- three tiers of microfoundations */

const TIERS = [
  {
    tag: "개인",
    name: "리더의 머리",
    desc: "동적 관리 역량. 바깥의 신호를 해석해서 ‘해야 할 혁신 목록’으로 바꾼다.",
    r: 92,
    fill: C.d,
    ink: "#fff",
  },
  {
    tag: "조직",
    name: "회사의 습관",
    desc: "감지·재설계·자원 재배치·학습 루틴. 리더의 생각을 실제 변화로 만든다.",
    r: 182,
    fill: "#8db8ec",
    ink: C.ink,
  },
  {
    tag: "관계·생태계",
    name: "바깥과의 연결",
    desc: "고객·파트너·제도와의 상호작용. 새로운 조합을 함께 만들어 낸다.",
    r: 272,
    fill: C.dSoft,
    ink: C.ink,
  },
];

export function S15Tiers() {
  const step = useStep();
  return (
    <Slide
      kicker="큰 그림"
      tag="Three Tiers of Microfoundations"
      title="‘결정’은 세 층에서 나온다"
      lead="논문은 흩어져 있던 개인·조직·생태계 차원을 하나의 그림으로 연결했습니다."
      source="논문 §3 요약 · §6.1"
    >
      <div className="grid h-[580px] grid-cols-[570px_1fr] items-center gap-[36px]">
        <svg
          width="560"
          height="560"
          viewBox="-280 -280 560 560"
          role="img"
          aria-label="개인을 조직이 감싸고 다시 관계와 생태계가 감싸는 동심원"
        >
          {[...TIERS].reverse().map((t) => {
            const i = TIERS.indexOf(t);
            const on = step >= i;
            return (
              <motion.circle
                key={t.tag}
                cx={0}
                cy={0}
                initial={false}
                animate={{ r: on ? t.r : TIERS[Math.max(0, i - 1)].r * (i === 0 ? 0.8 : 1), opacity: on ? 1 : 0 }}
                transition={{ duration: 0.55, ease: EASE }}
                fill={t.fill}
                stroke={C.d}
                strokeWidth="1.5"
              />
            );
          })}
          <text textAnchor="middle" y="11" fontSize="30" fontWeight="800" fill="#fff" letterSpacing="-0.03em">
            개인
          </text>
          <motion.text
            initial={false}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            textAnchor="middle"
            y="-122"
            fontSize="28"
            fontWeight="800"
            fill={C.ink}
            letterSpacing="-0.03em"
          >
            조직
          </motion.text>
          <motion.text
            initial={false}
            animate={{ opacity: step >= 2 ? 1 : 0 }}
            textAnchor="middle"
            y="-214"
            fontSize="28"
            fontWeight="800"
            fill={C.ink}
            letterSpacing="-0.03em"
          >
            관계·생태계
          </motion.text>
        </svg>
        <div className="flex flex-col gap-[16px]">
          {TIERS.map((t, i) => (
            <Build key={t.tag} at={i} x={16} y={0}>
              <div className="flex h-[150px] items-center gap-[24px] rounded-[18px] bg-white px-[28px] ring-1 ring-line">
                <div
                  className="size-[26px] shrink-0 rounded-full"
                  style={{ background: t.fill, boxShadow: `inset 0 0 0 1.5px ${C.d}` }}
                />
                <div>
                  <div className="flex items-baseline gap-[12px]">
                    <span className="text-[19px] font-bold text-d">{t.tag}</span>
                    <span className="text-[31px] font-extrabold tracking-[-0.026em]">{t.name}</span>
                  </div>
                  <p className="t-body mt-[4px] text-sub">{t.desc}</p>
                </div>
              </div>
            </Build>
          ))}
        </div>
      </div>
    </Slide>
  );
}
