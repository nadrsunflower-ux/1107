"use client";

import { motion } from "framer-motion";
import { useStep } from "@/components/deck/context";
import { Build, Hl, Panel, Slide } from "@/components/deck/primitives";
import { Bars, type BarRow } from "@/components/viz/bars";
import { C, EASE } from "@/lib/design";

/* 32 ------------------------------------------------------- Theories (Table 3) */

const THEORY: BarRow[] = [
  { label: "감지·포착·전환 (Teece, 2007)", n: 29, hi: true },
  { label: "감지·학습·통합·조정 (Teece 외, 1997)", n: 5 },
  { label: "전략적 유연성", n: 5 },
  { label: "전략적 민첩성 (Doz & Kosonen, 2010)", n: 4 },
  { label: "동적 관리 역량", n: 3 },
  { label: "기업가 지향", n: 2 },
  { label: "시장 지향", n: 2 },
  { label: "흡수 역량", n: 2 },
];

export function S32Theory() {
  return (
    <Slide
      kicker="T · 이론"
      tag="TCM · Theories"
      title="이론: 절반이 Teece의 ‘감지-포착-전환’ 틀을 쓴다"
      lead="57편을 이론·맥락·방법으로 나눠 보면 이 분야의 쏠림이 보입니다."
      source="논문 표 3. 비율은 57편 기준. 표에 분류되지 않은 논문이 있어 합계가 57이 되지 않음"
    >
      <div className="grid h-[580px] grid-cols-[1fr_330px] items-center gap-[30px]">
        <Panel className="h-full justify-center p-[28px]">
          <div className="t-h2 mb-[12px]">어떤 동적 역량 틀을 썼나 <span className="t-cap">논문 수</span></div>
          <Bars rows={THEORY} total={57} labelW={410} trackW={620} rowH={52} />
        </Panel>
        <div className="flex h-full flex-col justify-center gap-[16px]">
          <div className="rounded-[18px] bg-t-soft p-[26px] ring-1 ring-t/30">
            <div className="text-[86px] font-extrabold leading-none tracking-[-0.04em]">51%</div>
            <p className="t-body mt-[10px]">29편이 Teece(2007)의 틀을 그대로 쓴다.</p>
          </div>
          <p className="t-sm text-sub">
            이번 논문이 찾아낸 네 과정도 이 틀 위에 있다. 감지·포착·전환에 <b className="font-semibold text-ink">학습</b>을 엔진으로 더한 그림이다.
          </p>
        </div>
      </div>
    </Slide>
  );
}

/* 33 ------------------------------------------------------- Context (Tables 4, 5) */

const COUNTRY: BarRow[] = [
  { label: "중국", n: 11, hi: true },
  { label: "독일", n: 10, hi: true },
  { label: "미국", n: 3 },
  { label: "인도", n: 3 },
  { label: "영국", n: 3 },
  { label: "네덜란드", n: 3 },
  { label: "글로벌·유럽(다국가)", n: 3 },
  { label: "브라질", n: 2 },
];

const SIZE: BarRow[] = [
  { label: "중소기업 + 대기업", n: 24 },
  { label: "대기업", n: 12 },
  { label: "중소기업", n: 9 },
  { label: "개념 연구", n: 6 },
  { label: "스타트업(신생 기업)", n: 5 },
  { label: "실험 연구", n: 1 },
];

export function S33Context() {
  const step = useStep();
  return (
    <Slide
      kicker="C · 맥락"
      tag="TCM · Context"
      title="맥락: 중국과 독일에 쏠려 있다"
      source="논문 표 4·5 · §4.2. 규모는 표 5의 숫자(본문 비율과 다름). 국가 표는 중복·미지정이 있어 합계가 57이 아님"
    >
      <div className="grid h-[640px] grid-cols-[1fr_560px] gap-[20px]">
        <Panel className="gap-[8px] p-[24px]">
          <div className="t-h2">어느 나라를 연구했나 <span className="t-cap">논문 수</span></div>
          <Bars rows={COUNTRY} total={57} labelW={196} trackW={620} rowH={41} showPct={false} />
          <p className="mt-[2px] rounded-[10px] bg-surface-2 px-[14px] py-[8px] text-[18px] leading-[1.42] text-sub">
            <b className="font-bold text-ink">각 1편:</b> 스페인, 스웨덴, 호주, 이탈리아, 노르웨이, 핀란드, 사하라 이남 아프리카, 프랑스, 스위스, 오스트리아, 대만
          </p>
          <div className="mt-auto rounded-[14px] bg-t-soft p-[16px] ring-1 ring-t/30">
            <p className="text-[24px] font-semibold leading-[1.36] tracking-[-0.018em]">
              중국과 독일만 합쳐 <Hl>21편</Hl>. 논문은 <b className="font-extrabold">“약 40%”</b>라며 지역 다양성이 심각하게 부족하다고 지적한다.
            </p>
            <p className="t-sm mt-[2px] text-sub">동적 역량은 상황을 타기 때문에 신흥국 연구가 특히 필요하다.</p>
          </div>
        </Panel>
        <Build at={1} x={14} y={0} className="h-full">
          <Panel className="h-full gap-[10px] p-[24px]">
            <div className="t-h2">어떤 규모의 회사를 연구했나 <span className="t-cap">논문 수</span></div>
            <Bars
              on={step >= 1}
              rows={SIZE}
              total={57}
              labelW={196}
              trackW={300}
              rowH={66}
              fontSize={20}
              showPct={false}
            />
            <p className="t-sm mt-auto rounded-[12px] bg-surface-2 p-[14px] text-sub">
              산업은 제조, 정보통신, 건설, 운송·물류, 과학기술 서비스 등으로 다양했다.
            </p>
          </Panel>
        </Build>
      </div>
    </Slide>
  );
}

/* 34 ------------------------------------------------------- Methods (Table 6) as a 57-cell waffle */

const CELL = 70;
const GAP = 6;
const CATS = [
  { key: "case", n: 27, color: C.t, at: 0, label: "사례 연구" },
  { key: "qual", n: 3, color: "#a79deb", at: 0, label: "그 외 질적" },
  { key: "quant", n: 22, color: C.grayDark, at: 1, label: "양적" },
  { key: "other", n: 5, color: C.gray, at: 2, label: "개념·혼합" },
];

/* each paper is one cell, filled column by column so categories read as bands */
const WAFFLE = CATS.flatMap((c) =>
  Array.from({ length: c.n }, () => ({ color: c.color, at: c.at })),
);

export function S34Methods() {
  const step = useStep();
  return (
    <Slide
      kicker="M · 방법"
      tag="TCM · Methods"
      title="방법: 절반이 ‘사례 연구’다"
      lead="한 칸이 논문 한 편입니다. 몇몇 회사를 깊게 들여다본 연구가 많고, 오래 추적한 연구는 드뭅니다."
      source="논문 표 6 · §4.3. 사례 연구 27편 외 질적 3편은 QCA 사례 연구 1, 주제 분석 2. 양적 22편에 실험 1 포함"
    >
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(3, ${CELL}px)`,
          gridAutoFlow: "column",
          gridAutoColumns: `${CELL}px`,
          gap: GAP,
        }}
        role="img"
        aria-label="57편 중 사례 연구 27편, 그 외 질적 3편, 양적 22편, 개념 4편, 혼합 1편"
      >
        {WAFFLE.map((c, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{ backgroundColor: step >= c.at ? c.color : C.surface2 }}
            transition={{ duration: 0.28, ease: EASE, delay: step >= c.at ? (i % 30) * 0.008 : 0 }}
            className="rounded-[8px]"
          />
        ))}
      </div>

      <div className="mt-[14px] flex gap-[22px]">
        {CATS.map((c) => (
          <div key={c.key} className="flex items-center gap-[8px] text-[18px] font-semibold text-sub">
            <span className="size-[16px] rounded-[4px]" style={{ background: c.color }} />
            {c.label} {c.n}편
          </div>
        ))}
      </div>

      <div className="mt-[16px] grid grid-cols-3 gap-[16px]">
        <Panel tone="t" className="h-[196px] gap-[6px] p-[22px]">
          <div className="flex items-baseline gap-[10px]">
            <span className="text-[28px] font-extrabold tracking-[-0.026em]">질적 연구</span>
            <span className="text-[24px] font-bold">30편</span>
          </div>
          <p className="text-[22px] leading-[1.42] tracking-[-0.014em]">
            인터뷰와 보고서로 <b className="font-bold">깊게 들여다보는</b> 방식. 복잡한 과정이나 루틴을 보기에 좋다.
          </p>
        </Panel>
        <Build at={1} y={10}>
          <Panel className="h-[196px] gap-[6px] p-[22px]">
            <div className="flex items-baseline gap-[10px]">
              <span className="text-[28px] font-extrabold tracking-[-0.026em]">양적 연구</span>
              <span className="text-[24px] font-bold">22편</span>
            </div>
            <p className="text-[22px] leading-[1.42] tracking-[-0.014em]">주로 설문 후 통계 분석. 회귀분석 11편, 구조방정식(SEM) 10편, 실험 1편.</p>
          </Panel>
        </Build>
        <Build at={2} y={10}>
          <Panel className="h-[196px] gap-[6px] bg-surface-2 p-[22px] ring-0">
            <div className="flex items-baseline gap-[10px]">
              <span className="text-[28px] font-extrabold tracking-[-0.026em]">개념·혼합</span>
              <span className="text-[24px] font-bold">5편</span>
            </div>
            <p className="text-[22px] leading-[1.42] tracking-[-0.014em]">개념 연구 4편, 혼합 방법 1편. 종단·혼합·실험 연구가 더 필요하다.</p>
          </Panel>
        </Build>
      </div>
    </Slide>
  );
}
