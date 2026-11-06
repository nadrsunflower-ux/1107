"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, Factory, Landmark, ShoppingCart, Swords, Users } from "lucide-react";
import { useStep } from "@/components/deck/context";
import { ArrowRight, Build, En, Ex, Hl, Panel, Slide, Tag } from "@/components/deck/primitives";
import { MiniMap } from "@/components/viz/framework";
import { C, EASE } from "@/lib/design";

/* 25 ------------------------------------------------------- single vs double loop */

function LoopBox({
  x,
  y,
  w,
  h,
  label,
  value,
  on = true,
  hot,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  value: string;
  on?: boolean;
  hot?: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: on ? 1 : 0.25 }}
      className="absolute flex flex-col justify-center rounded-[14px] px-[18px]"
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
        background: hot ? C.d : C.surface,
        color: hot ? "#fff" : C.ink,
        boxShadow: hot ? "none" : `inset 0 0 0 1.5px ${C.line}`,
      }}
    >
      <div className="text-[17px] font-semibold" style={{ color: hot ? "rgba(255,255,255,.8)" : C.mute }}>
        {label}
      </div>
      <div className="text-[24px] font-bold leading-[1.28] tracking-[-0.02em]">{value}</div>
    </motion.div>
  );
}

export function S25Loops() {
  const step = useStep();
  const reduced = useReducedMotion();
  const single = "M654 210 C654 272 394 272 394 212";
  const dbl = "M654 110 C654 8 109 8 109 108";
  return (
    <Slide
      kicker="D · 과정 4"
      tag="Organizational Learning Orientation"
      title="조직 학습: 틀 안에서 고칠까, 틀 자체를 의심할까"
      lead="앞의 세 과정을 돌리는 엔진. 학습은 개인 실력이 아니라 조직 전체의 과정입니다."
      mini={<MiniMap active="learn" />}
      source="Demil & Lecocq (2010); McGrath (2010); Sosna et al. (2010) · 논문 §3.2.4. 온도조절기와 떡볶이는 이해를 돕는 예시"
    >
      <div className="relative h-[316px]">
        <svg
          width="1456"
          height="316"
          viewBox="0 0 1456 316"
          className="absolute inset-0"
          role="img"
          aria-label="결과에서 행동으로 돌아가는 단일 루프와, 결과에서 전제로 돌아가는 이중 루프"
        >
          <defs>
            <marker id="m-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill={C.grayDark} />
            </marker>
            <marker id="m-d" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill={C.d} />
            </marker>
            <marker id="m-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill={C.a} />
            </marker>
          </defs>
          <path d="M220 160 H284" stroke={C.grayDark} strokeWidth="3" markerEnd="url(#m-ink)" />
          <path d="M500 160 H564" stroke={C.grayDark} strokeWidth="3" markerEnd="url(#m-ink)" />
          <motion.path
            d={single}
            fill="none"
            stroke={C.d}
            strokeWidth="4"
            markerEnd="url(#m-d)"
            initial={false}
            animate={{ pathLength: 1, opacity: 1 }}
          />
          {!reduced && (
            <circle r="7" fill={C.d}>
              <animateMotion dur="2.6s" repeatCount="indefinite" path={single} />
            </circle>
          )}
          <motion.path
            d={dbl}
            fill="none"
            stroke={C.a}
            strokeWidth="4"
            markerEnd="url(#m-a)"
            initial={false}
            animate={{ pathLength: step >= 1 ? 1 : 0, opacity: step >= 1 ? 1 : 0 }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
          />
          {step >= 1 && !reduced && (
            <circle r="7" fill={C.a}>
              <animateMotion dur="3.6s" repeatCount="indefinite" path={dbl} />
            </circle>
          )}
        </svg>

        <LoopBox x={0} y={112} w={218} h={96} label="전제 · 목표" value="목표 온도 20도" hot={step >= 1} />
        <LoopBox x={288} y={112} w={210} h={96} label="행동" value="난방을 켠다" />
        <LoopBox x={568} y={112} w={172} h={96} label="결과" value="방이 춥다" />

        <div className="absolute left-[254px] top-[268px] w-[540px] text-center text-[25px] font-bold tracking-[-0.018em] text-d">
          단일 루프: “춥네, 난방을 켜자”
        </div>
        <Build at={1} y={0} className="absolute left-[150px] top-[14px] w-[462px] text-center">
          <div className="inline-block rounded-full bg-paper px-[14px] text-[25px] font-bold tracking-[-0.018em] text-a">
            이중 루프: “애초에 목표 20도가 맞아?”
          </div>
        </Build>

        <div className="absolute left-[816px] top-[0px] flex w-[640px] flex-col gap-[14px]">
          <Panel tone="d" className="h-[150px] gap-[4px] p-[20px]">
            <div className="flex items-center gap-[10px]">
              <Tag tone="d">단일 루프</Tag>
              <En>Single-loop learning</En>
            </div>
            <p className="t-body">지금 모델 <b className="font-bold">안에서</b> 조금씩 조정한다.</p>
          </Panel>
          <Build at={1} y={10}>
            <Panel tone="a" className="h-[150px] gap-[4px] p-[20px]">
              <div className="flex items-center gap-[10px]">
                <Tag tone="a">이중 루프</Tag>
                <En>Double-loop learning</En>
              </div>
              <p className="t-body">모델의 <b className="font-bold">밑바탕 전제 자체</b>를 의심하고 고친다.</p>
            </Panel>
          </Build>
        </div>
      </div>

      <Build at={2} className="mt-[16px] grid grid-cols-2 gap-[16px]">
        <Ex className="h-[196px]" label="떡볶이 가게의 단일 루프">
          <span className="mt-[18px] block text-[34px] font-bold leading-[1.32] tracking-[-0.026em]">
            밀키트 소스 양을 10g 줄인다
          </span>
        </Ex>
        <Ex className="h-[196px]" label="떡볶이 가게의 이중 루프">
          <span className="mt-[18px] block text-[34px] font-bold leading-[1.32] tracking-[-0.026em]">
            우리는 ‘가게에서 먹는 분식집’일까, ‘집에서 먹는 떡볶이 브랜드’일까?
          </span>
        </Ex>
      </Build>
    </Slide>
  );
}

/* 26 ------------------------------------------------------- learning direction and timing */

function Versus({
  axis,
  left,
  right,
  h,
}: {
  h: number;
  axis: string;
  left: { ko: string; en: string; desc: React.ReactNode; to?: string };
  right: { ko: string; en: string; desc: React.ReactNode; to?: string };
}) {
  return (
    <div className="grid grid-cols-[1fr_128px_1fr] items-stretch">
      <Side h={h} {...left} />
      <div className="flex items-center justify-center">
        <div className="flex size-[104px] items-center justify-center rounded-full bg-night text-center text-[23px] font-bold leading-[1.2] text-white">
          {axis}
        </div>
      </div>
      <Side h={h} {...right} />
    </div>
  );
}

function Side({
  h,
  ko,
  en,
  desc,
  to,
}: {
  h: number;
  ko: string;
  en: string;
  desc: React.ReactNode;
  to?: string;
}) {
  return (
    <Panel className="gap-[4px] p-[24px]" style={{ height: h }}>
      <div className="flex items-baseline gap-[8px]">
        <span className="text-[30px] font-extrabold tracking-[-0.026em]">{ko}</span>
        <En>{en}</En>
      </div>
      <p className="t-body mt-[4px] text-sub">{desc}</p>
      {to && (
        <div className="mt-auto flex items-center gap-[10px] text-[23px] font-bold text-d">
          <ArrowRight size={30} color={C.d} /> {to}
        </div>
      )}
    </Panel>
  );
}

export function S26Direction() {
  return (
    <Slide
      kicker="D · 과정 4"
      tag="Exploration · Exploitation"
      title="어디서, 언제 배우나: 둘 다 필요하다"
      mini={<MiniMap active="learn" />}
      source="논문 §3.2.4 (Mezger, 2014; Stalmokaitė et al., 2023; Schaffer et al., 2022 등)"
    >
      <div className="flex flex-col gap-[14px]">
        <Versus
          h={256}
          axis="방향"
          left={{
            ko: "탐색적 학습",
            en: "Exploratory",
            desc: (
              <>
                <b className="font-semibold text-ink">업계 밖</b>에서 아이디어를 찾고 실험한다. 다른 산업의 역량을 빌리고, 개방형 혁신이 힘을 보탠다.
              </>
            ),
            to: "새로운 가치 제안",
          }}
          right={{
            ko: "활용적 학습",
            en: "Exploitative",
            desc: (
              <>
                <b className="font-semibold text-ink">업계 안</b>의 고객·공급자·유통업체에게 배워 지금 모델을 다듬고 숨은 자원을 찾는다.
              </>
            ),
            to: "효율 향상",
          }}
        />
        <Build at={1} y={14}>
          <Versus
            h={190}
            axis="시점"
            left={{
              ko: "실행 전 학습",
              en: "Learning-before-doing",
              desc: "정보를 모으고, 조사하고, 계획해서 문제를 미리 예상한다.",
            }}
            right={{
              ko: "하면서 배우기",
              en: "Learning-by-doing",
              desc: "시행착오와 실시간 반응을 보면서 실제 경험으로 모델을 고친다.",
            }}
          />
        </Build>
        <Build at={2} y={10}>
          <div className="flex h-[132px] items-center justify-center rounded-[16px] bg-d-soft px-[28px] text-[29px] font-semibold tracking-[-0.02em] ring-1 ring-d/30">
            <span>
              바탕은 고객·파트너·직원의 피드백을 설계도에 꾸준히 반영하는 <Hl>지속적 개선 문화</Hl>
            </span>
          </div>
        </Build>
      </div>
    </Slide>
  );
}

/* 27 ------------------------------------------------------- pillar A: DMC */

const SIX = [
  ["예측하기", "Anticipate", "눈앞 너머를 보고 약한 신호와 위협을 찾는다"],
  ["도전하기", "Challenge", "당연하게 여기던 가정을 의심한다"],
  ["해석하기", "Interpret", "여러 출처의 정보를 엮어 큰 그림을 본다"],
  ["결정하기", "Decide", "정보가 다 없어도 제때 결정한다"],
  ["한 방향 맞추기", "Align", "열린 대화로 사람들의 합의를 만든다"],
  ["배우기", "Learn", "좋은 피드백도 나쁜 피드백도 받아들인다"],
];

const INGREDIENTS = [
  ["인적 자본", "교육·경험으로 쌓은 지식과 기업가적 기술"],
  ["사회적 자본", "신뢰와 인맥. 최고경영진 안의 정보 공유"],
  ["경영자 인지", "시장 변화를 알아채고 해석하는 방식"],
];

export function S27DMC() {
  return (
    <Slide
      kicker="D · 기둥 A"
      tag="Dynamic Managerial Capabilities"
      title="동적 관리 역량: 리더가 변화를 이끈다"
      mini={<MiniMap active="dmc" />}
      source="Schoemaker et al. (2018); Teece (2018); Heubeck & Meckl (2022) · 논문 §3.2.5"
    >
      <div className="grid h-[640px] grid-cols-[1fr_450px] gap-[22px]">
        <div className="flex flex-col gap-[14px]">
          <div>
            <div className="t-h2 text-sub">불확실한 시대에 리더에게 필요한 6가지 능력</div>
            <div className="mt-[10px] grid grid-cols-3 gap-[12px]">
              {SIX.map(([ko, en, v], i) => (
                <div key={ko} className="flex h-[172px] flex-col rounded-[14px] bg-white p-[16px] ring-1 ring-line">
                  <div className="flex items-baseline gap-[6px]">
                    <span className="num text-[20px] font-extrabold text-d">{i + 1}</span>
                    <span className="text-[25px] font-bold tracking-[-0.024em]">{ko}</span>
                  </div>
                  <div className="t-cap">{en}</div>
                  <p className="mt-[4px] text-[19px] leading-[1.42] text-sub">{v}</p>
                </div>
              ))}
            </div>
          </div>
          <Build at={1} y={12}>
            <div className="flex h-[188px] flex-col justify-center gap-[12px] rounded-[16px] bg-night px-[24px] text-white">
              <div className="text-[18px] font-semibold text-white/65">Teece (2018)의 구분</div>
              <div className="flex items-center gap-[14px]">
                <span className="w-[230px] text-[24px] font-bold tracking-[-0.02em]">기업가적 역량</span>
                <ArrowRight size={34} color="#fff" />
                <span className="rounded-full bg-white/15 px-[18px] py-[4px] text-[23px] font-semibold">감지</span>
              </div>
              <div className="flex items-center gap-[14px]">
                <span className="w-[230px] text-[24px] font-bold tracking-[-0.02em]">관리 역량</span>
                <ArrowRight size={34} color="#fff" />
                <span className="rounded-full bg-white/15 px-[18px] py-[4px] text-[23px] font-semibold">포착·전환</span>
                <span className="ml-auto text-[19px] font-medium text-white/80">회사의 관성과 저항을 이겨 낸다</span>
              </div>
            </div>
          </Build>
        </div>
        <Build at={2} x={14} y={0} className="h-full">
          <Panel tone="d" className="h-full gap-[12px] p-[22px]">
            <div className="t-h text-d">리더 능력의 세 가지 재료</div>
            <div className="flex flex-col gap-[10px]">
              {INGREDIENTS.map(([k, v]) => (
                <div key={k} className="rounded-[12px] bg-white p-[14px]">
                  <div className="text-[24px] font-bold tracking-[-0.02em]">{k}</div>
                  <div className="text-[19px] leading-[1.4] text-sub">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-auto rounded-[12px] bg-d p-[18px] text-white">
              <div className="text-[23px] font-bold tracking-[-0.02em]">최고경영진(TMT)의 다양성</div>
              <p className="mt-[4px] text-[19px] leading-[1.42] text-white/90">
                배경·성별·재임 기간이 다양할수록 결정이 탄탄해지고 시행착오 실험도 활발해진다.
              </p>
            </div>
          </Panel>
        </Build>
      </div>
    </Slide>
  );
}

/* 28 ------------------------------------------------------- pillar B: SMC */

const R = 212;
const STAKE = [
  { icon: ShoppingCart, label: "고객", hot: true },
  { icon: Factory, label: "공급자", hot: true },
  { icon: Building2, label: "파트너", hot: true },
  { icon: Swords, label: "경쟁자" },
  { icon: Landmark, label: "정부" },
  { icon: Users, label: "지역사회" },
].map((s, i) => {
  const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
  return { ...s, x: Math.round(R * Math.cos(a)), y: Math.round(R * Math.sin(a)) };
});

const FUNCTIONS = [
  ["필요 알기", "고객 피드백으로 시장의 빈틈을, 공급자·파트너에게서 기술과 자원의 한계를 배운다"],
  ["자원 얻기", "다양한 자원을 얻는 비용과 어려움을 줄인다"],
  ["함께 만들기", "이해관계자가 기능·시장 반응·위험에 의견을 주며 실험에 직접 참여한다 (공동 창조)"],
  ["빈칸 채우기", "대학·기술 기업과 손잡고 회사에 없는 전문성을 빌린다. 처음 들어가는 시장일수록 중요"],
];

export function S28SMC() {
  const step = useStep();
  return (
    <Slide
      kicker="D · 기둥 B"
      tag="Stakeholder Management Capabilities"
      title="이해관계자 관리 역량: 바깥과 함께 움직인다"
      mini={<MiniMap active="smc" />}
      source="논문 §3.2.5 (Mihailova, 2023; Velu, 2017; Randhawa et al., 2021 등) · 노란 칸은 떡볶이 가게 예시"
    >
      <div className="grid h-[640px] grid-cols-[600px_1fr] items-center gap-[26px]">
        <div className="relative h-[560px] w-[600px]">
          <svg
            width="600"
            height="560"
            viewBox="-300 -280 600 560"
            className="absolute inset-0"
            role="img"
            aria-label="회사를 중심으로 고객, 공급자, 파트너, 경쟁자, 정부, 지역사회가 연결된 그물"
          >
            {STAKE.map((s) => (
              <motion.line
                key={s.label}
                x1="0"
                y1="0"
                x2={s.x}
                y2={s.y}
                stroke={C.d}
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            ))}
          </svg>
          <div className="absolute left-1/2 top-1/2 flex size-[132px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-d text-center text-[27px] font-extrabold text-white">
            회사
          </div>
          {STAKE.map((s) => {
            const Icon = s.icon;
            const lit = Boolean(s.hot) && step >= 1;
            return (
              <div
                key={s.label}
                className="absolute flex size-[116px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full ring-[2.5px] transition-colors duration-200"
                style={{
                  left: 300 + s.x,
                  top: 280 + s.y,
                  background: lit ? C.ex : C.surface,
                  ["--tw-ring-color" as string]: lit ? C.exLine : C.d,
                }}
              >
                <Icon size={30} className={lit ? "text-ex-ink" : "text-d"} />
                <div className="text-[22px] font-bold">{s.label}</div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-[12px]">
          <p className="t-body text-sub">
            비즈니스 모델은 회사 안에서만 돌지 않는다. <b className="font-semibold text-ink">활동의 그물</b>이고, BMI의 <b className="font-semibold text-ink">모든 단계</b>에서 함께 움직여야 한다.
          </p>
          {FUNCTIONS.map(([k, v]) => (
            <div key={k} className="flex items-center gap-[16px] rounded-[14px] bg-white p-[16px] ring-1 ring-line">
              <div className="w-[146px] shrink-0 text-[26px] font-extrabold tracking-[-0.024em]">{k}</div>
              <p className="text-[21px] leading-[1.4] tracking-[-0.014em] text-sub">{v}</p>
            </div>
          ))}
          <Build at={1} y={10}>
            <Ex>
              떡 공장과 <b className="font-bold">잘 퍼지지 않는 떡</b>을 개발하고(공급자), 단골 10명을{" "}
              <b className="font-bold">시식단</b>으로 꾸리고(고객), 배달앱 회사와{" "}
              <b className="font-bold">할인 행사</b>를 연다(파트너).
            </Ex>
          </Build>
        </div>
      </div>
    </Slide>
  );
}
