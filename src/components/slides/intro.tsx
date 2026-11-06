"use client";

import type * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, Cpu, Scale, Store, Users } from "lucide-react";
import coverArt from "@/assets/cover-shop-loop.jpg";
import { ArrowRight, Build, Hl, Panel, Slide, Tag } from "@/components/deck/primitives";
import { C, EASE } from "@/lib/design";

/* 1 */
/* The road's centre line in the illustration's own pixels, clockwise from its left end. */
const COVER_ROAD = "M221 768 A356 245 0 1 1 933 768 A356 245 0 1 1 221 768 Z";

/** The money the business earns keeps rolling round the road, past each way of earning it. */
function CoverCoin() {
  return (
    <svg
      className="absolute inset-0 size-full"
      viewBox={`0 0 ${coverArt.width} ${coverArt.height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g>
        <animateMotion dur="16s" repeatCount="indefinite" path={COVER_ROAD} />
        <ellipse cy="8" rx="28" ry="8" fill={C.ink} opacity="0.2" />
        <g transform="translate(0 -26)">
          <g>
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1 1;0.14 1;1 1"
              dur="3s"
              repeatCount="indefinite"
            />
            <circle r="32" fill="#efc04f" stroke="#b5831f" strokeWidth="4" />
            <circle r="23" fill="none" stroke="#fbe6a2" strokeWidth="3" />
            <text
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="30"
              fontWeight="800"
              fill="#8d6212"
            >
              ₩
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function S01Title() {
  const reduced = useReducedMotion();
  return (
    <div className="absolute inset-0" style={{ background: C.cover }}>
      <motion.div
        className="absolute inset-y-0 right-0 w-[760px]"
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 24px)",
          maskImage: "linear-gradient(to right, transparent 0, #000 24px)",
        }}
      >
        <Image
          src={coverArt}
          alt="같은 가게가 동네 상점, 배달, 구독 상자, 앱으로 모습을 바꾸며 둘러선 원형 도로. 가운데에서 경영자가 설계도를 고치고 있다."
          fill
          unoptimized
          loading="eager"
          sizes="760px"
          placeholder="blur"
          className="object-cover object-center"
        />
        {!reduced && <CoverCoin />}
      </motion.div>

      <div className="absolute inset-y-[56px] left-[72px] flex w-[780px] flex-col">
        <div className="text-[20px] font-semibold tracking-[-0.01em] text-sub">
          논문 발표 · Journal of Business Research 204 (2026)
        </div>
        <div className="my-auto">
          <h1 className="whitespace-nowrap text-[78px] font-extrabold leading-[1.2] tracking-[-0.035em]">
            회사는{" "}
            <span style={{ background: "linear-gradient(transparent 56%, #ffd65a 56%)" }}>
              ‘돈 버는 방식’
            </span>
            을
            <br />
            어떻게 계속 바꿔 나갈까?
          </h1>
          <p className="mt-[28px] text-[28px] font-medium leading-[1.4] tracking-[-0.018em] text-sub">
            비즈니스 모델 혁신(BMI)을 동적 역량(DC) 관점에서
            <br />
            읽는 체계적 문헌 고찰
          </p>
          <p className="mt-[36px] w-[720px] text-[18px] font-normal leading-[1.5] text-mute">
            Cruz-Sánchez, O., Cruz-Cázares, C., &amp; Hernandez-Vivanco, A. (2026). Business model
            innovation from dynamic capabilities perspective: A systematic literature review.
          </p>
        </div>
        <div className="flex items-center gap-[20px]">
          <span className="h-px w-[56px] shrink-0 bg-ink/25" />
          <div className="text-[17px] font-medium leading-[1.5] text-sub">
            고려대학교 일반대학원 첨단기술비즈니스학과
            <br />
            글로벌 과학 기술 혁신과 사업화
          </div>
          <div className="ml-[8px] text-[24px] font-bold tracking-[-0.01em]">유선화</div>
        </div>
      </div>
    </div>
  );
}

/* 2 */
const BLUEPRINT = [
  ["누구에게", "학생들에게"],
  ["무엇을", "싸고 맛있는 떡볶이를"],
  ["어떻게", "가게에서"],
  ["얼마에", "1인분 4,000원에"],
];

const SHOCKS = [
  { icon: Cpu, tag: "기술", text: "배달앱이 퍼졌다" },
  { icon: Users, tag: "시장", text: "근처에 1인 가구 원룸이 늘었다" },
  { icon: Scale, tag: "규제", text: "일회용 용기 규제가 생겼다" },
  { icon: Building2, tag: "경쟁", text: "길 건너에 프랜차이즈 분식집이 생겼다" },
];

export function S02Hook() {
  return (
    <Slide
      kicker="도입"
      title="떡볶이를 아무리 잘 만들어도, 세상이 바뀌면 흔들린다"
      lead="학교 앞 떡볶이 가게 하나로 오늘 논문 전체를 따라가 보겠습니다."
      source="떡볶이 가게는 이해를 돕기 위해 덧붙인 예시로, 논문에 나오는 사례가 아닙니다."
    >
      <div className="grid h-[440px] grid-cols-[600px_96px_1fr]">
        <Panel tone="ex" className="justify-between p-[28px]">
          <div className="flex items-center gap-[10px]">
            <Store size={28} strokeWidth={2.2} className="text-ex-ink" />
            <div className="t-h">지금 가게의 ‘설계도’</div>
          </div>
          <div className="flex flex-col gap-[12px]">
            {BLUEPRINT.map(([q, a]) => (
              <div
                key={q}
                className="flex items-center gap-[16px] rounded-[12px] bg-white px-[20px] py-[14px] ring-1 ring-ex-line"
              >
                <span className="w-[92px] shrink-0 text-[19px] font-semibold text-ex-ink">{q}</span>
                <span className="text-[25px] font-bold tracking-[-0.02em]">{a}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Build at={1} x={12} y={0} className="flex items-center justify-center">
          <div className="rotate-180">
            <ArrowRight size={56} color={C.a} strokeWidth={3} />
          </div>
        </Build>
        <div className="flex flex-col justify-between">
          {SHOCKS.map(({ icon: Icon, tag, text }) => (
            <Build key={tag} at={1} x={18} y={0}>
              <div className="flex h-[98px] items-center gap-[18px] rounded-[16px] bg-a-soft px-[24px] ring-1 ring-a/35">
                <Icon size={34} strokeWidth={2} className="shrink-0 text-a" />
                <div>
                  <div className="text-[16px] font-bold text-a">{tag}</div>
                  <div className="text-[24px] font-semibold leading-[1.3] tracking-[-0.018em]">
                    {text}
                  </div>
                </div>
              </div>
            </Build>
          ))}
        </div>
      </div>
      <Build at={2} className="mt-[24px]">
        <div className="flex h-[106px] items-center justify-center gap-[10px] rounded-[18px] bg-night text-center text-white">
          <span className="text-[33px] font-bold tracking-[-0.026em]">
            맛을 더 올리면 해결될까요? 아니면 <span className="text-[#ffd65a]">‘설계도’ 자체</span>를
            고쳐야 할까요?
          </span>
        </div>
      </Build>
    </Slide>
  );
}

/* 3 */
/**
 * A pen underline that runs the sentence's full width, curls once like a pig's tail and
 * swings up to the "BMI" note. Everything hangs off the sentence's right edge, so the
 * stroke still fits if the wording changes or a browser sets the text a pixel wider.
 */
function PigtailNote({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 h-[2.6px] rounded-full bg-d"
        style={{ right: -18, top: "calc(100% + 1.7px)" }}
      />
      <svg
        className="pointer-events-none absolute top-full overflow-visible"
        style={{ left: "calc(100% + 18px)" }}
        width={60}
        height={8}
        viewBox="0 0 60 8"
        fill="none"
        aria-hidden
      >
        <path
          d="M0 3 C18 3 34 -5 34 -15 C34 -24 24 -28 17 -24 C9 -19 12 -5 24 -1 C34 2 48 -4 56 -16"
          stroke={C.d}
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="absolute top-[-4px] text-[32px] font-extrabold leading-[1.2] tracking-[-0.02em] text-d"
        style={{ left: "calc(100% + 82px)" }}
      >
        BMI
      </span>
    </span>
  );
}

const ANSWERS = [
  <PigtailNote key="bmi">
    <span className="whitespace-nowrap">
      기술·고객·규제가 변화함에 따라 회사도 비즈니스 모델을 고쳐야 한다.
    </span>
  </PigtailNote>,
  <>
    BMI를 가능하게 하는 힘은 <Hl>동적 역량</Hl>이다.
    <span className="mt-[4px] block text-[20px] font-normal leading-[1.4] tracking-[-0.008em] text-sub">
      *동적 역량(DC): 변화를 알아채고, 기회를 붙잡고, 회사를 바꾸는 능력
    </span>
  </>,
  <>
    BMI는 한 번 바꾸고 끝이 아니라
    <br />
    <Hl>감지 → 재설계 → 자원 재배치 → 학습</Hl>이 계속 도는 <b className="font-bold">순환</b>이다.
  </>,
  <>
    이 순환을 받치는 두 기둥은 <b className="font-bold">① 리더의 능력</b>과{" "}
    <b className="font-bold">② 회사 바깥과 협력하는 능력</b>이다.
  </>,
];

export function S03Answer() {
  return (
    <Slide
      kicker="도입"
      title="비즈니스 모델 혁신(BMI)은 한 번의 변신이 아니라 계속 도는 순환이다."
      source="Cruz-Sánchez et al. (2026), 초록 · §6"
    >
      <div className="grid h-full grid-cols-[1fr_370px] gap-[36px]">
        <div className="flex flex-col justify-between">
          {ANSWERS.map((a, i) => (
            <Build key={i} at={i} x={-16} y={0}>
              <div className="flex h-[134px] items-center gap-[24px] rounded-[18px] bg-white px-[28px] ring-1 ring-line">
                <span className="num flex size-[52px] shrink-0 items-center justify-center rounded-[14px] bg-ink text-[26px] font-extrabold text-white">
                  {i + 1}
                </span>
                <p className="text-[26px] font-normal leading-[1.44] tracking-[-0.016em]">{a}</p>
              </div>
            </Build>
          ))}
        </div>
        <Panel className="justify-between bg-surface-2 p-[28px] ring-0">
          <div>
            <div className="t-cap">이 논문이 한 일</div>
            <div className="mt-[10px] text-[92px] font-extrabold leading-none tracking-[-0.04em]">
              57<span className="text-[38px] font-bold tracking-[-0.02em]">편</span>
            </div>
            <p className="t-sm mt-[10px] text-sub">
              흩어져 있던 BMI와 동적 역량 연구를 모아 큰 그림 하나로 묶었다.
            </p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-wrap gap-[6px]">
              <Tag tone="d">ADO 틀</Tag>
              <Tag tone="t">TCM 틀</Tag>
            </div>
            <p className="t-cap">
              저자: 바르셀로나 대학교, IQS(라몬 율 대학교)
              <br />
              2025년 11월 온라인 공개 · 오픈 액세스(CC BY)
            </p>
          </div>
        </Panel>
      </div>
    </Slide>
  );
}
