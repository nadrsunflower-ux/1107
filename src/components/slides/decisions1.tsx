"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Brain, Eye, FlaskConical, Handshake, Lightbulb, Radar, Target, User } from "lucide-react";
import { useStep } from "@/components/deck/context";
import { ArrowRight, Build, Ex, Hl, Panel, Slide } from "@/components/deck/primitives";
import { DecisionLoop, MiniMap } from "@/components/viz/framework";
import { C, EASE } from "@/lib/design";

/* 18 ------------------------------------------------------- decisions overview */

const DECISION_LIST = [
  ["전략적 감지", "변화 신호를 알아채고 해석한다"],
  ["BM (재)설계", "기회를 붙잡아 설계도를 고친다"],
  ["재구성·자원 정렬", "회사 안의 자원과 구조를 다시 짠다"],
  ["조직 학습 지향", "앞의 셋을 계속 돌게 하는 엔진"],
];

export function S18DecisionOverview() {
  return (
    <Slide
      kicker="D · 결정"
      tag="Decisions · 논문의 핵심"
      title="네 과정이 맞물려 돌고, 두 기둥이 받친다"
      lead="네 과정은 따로 놀지 않고, 학습을 통해 서로를 강화합니다."
      source="논문 §3.2 · 그림 2"
    >
      <div className="grid h-[580px] grid-cols-[714px_1fr] items-center gap-[40px]">
        <div className="rounded-[18px] bg-d-soft p-[24px] ring-1 ring-d/30">
          <DecisionLoop scale={0.95} />
          <div className="mt-[14px] grid grid-cols-2 gap-[12px]">
            <div className="flex items-center justify-center gap-[10px] rounded-[12px] bg-white py-[12px] text-[21px] font-bold ring-1 ring-d/40">
              <User size={24} className="text-d" /> 동적 관리 역량
            </div>
            <div className="flex items-center justify-center gap-[10px] rounded-[12px] bg-white py-[12px] text-[21px] font-bold ring-1 ring-d/40">
              <Handshake size={24} className="text-d" /> 이해관계자 관리 역량
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          {DECISION_LIST.map(([k, v], i) => (
            <div key={k} className="flex items-center gap-[18px] rounded-[14px] bg-white px-[22px] py-[14px] ring-1 ring-line">
              <span className="num text-[34px] font-extrabold text-d">{i + 1}</span>
              <div>
                <div className="text-[25px] font-bold tracking-[-0.022em]">{k}</div>
                <div className="t-sm text-sub">{v}</div>
              </div>
            </div>
          ))}
          <div className="rounded-[14px] bg-night px-[22px] py-[14px] text-white">
            <div className="text-[25px] font-bold tracking-[-0.022em]">두 기둥(공통 역량)</div>
            <div className="t-sm text-white/80">리더의 능력과 바깥과 협력하는 능력이 네 과정 모두를 받친다</div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* 19 ------------------------------------------------------- sensing */

export function S19Sensing() {
  return (
    <Slide
      kicker="D · 과정 1"
      tag="Strategic Sensing"
      title="전략적 감지: 변화의 신호를 알아채고 해석한다"
      lead="시장·기술·고객·경쟁의 변화를 읽는 힘. 세 가지 재료로 이루어집니다."
      mini={<MiniMap active="sense" />}
      source="논문 §3.2.1 (Ciampi et al., 2021 등)"
    >
      <div className="grid h-[580px] grid-cols-3 gap-[18px]">
        <Build at={0} y={0} className="h-full">
          <Panel className="h-full p-[26px]">
            <Target size={36} className="text-d" />
            <div className="t-h mt-[4px]">① 시장 지향</div>
            <div className="t-cap">Market orientation</div>
            <div className="mt-[8px] flex flex-col gap-[12px]">
              <div>
                <div className="t-h2">고객 지향</div>
                <p className="t-sm text-sub">
                  말로 하는 요구는 물론, 본인도 모르는
                  <br />
                  <Hl>숨은 요구</Hl>까지 찾아낸다
                </p>
              </div>
              <div>
                <div className="t-h2">경쟁자 지향</div>
                <p className="t-sm text-sub">
                  경쟁사 정보를 모으고, 회사 안에 퍼뜨리고,
                  <br />
                  실제로 활용한다
                </p>
              </div>
            </div>
            <p className="t-sm mt-auto rounded-[12px] bg-surface-2 p-[14px] font-medium">
              신흥 시장 진출, 서비스화, 위기 때 가치 제안 바꾸기, 친환경 요구 대응이 가능해진다
            </p>
          </Panel>
        </Build>
        <Build at={1} y={0} x={14} className="h-full">
          <Panel className="h-full p-[26px]">
            <Radar size={36} className="text-d" />
            <div className="t-h mt-[4px]">② 기술 감지</div>
            <div className="t-cap">Technology sensing</div>
            <p className="t-body mt-[8px]">새 기술이 우리 업계에 어떤 의미인지 살피고, <Hl>새로운 가치</Hl>로 바꾼다.</p>
            <ul className="mt-auto flex flex-col gap-[10px]">
              {[
                ["빅데이터 분석", "고객 행동 변화를 잡아 BMI 결정을 돕는다"],
                ["클라우드 소싱", "모델의 부품과 구조를 바꾸게 해 준다"],
                ["플랫폼 역량", "유행 분석과 가치 제안 개발에 힘이 된다"],
              ].map(([k, v]) => (
                <li key={k} className="rounded-[12px] bg-surface-2 px-[14px] py-[10px]">
                  <div className="text-[20px] font-bold">{k}</div>
                  <div className="text-[18px] leading-[1.4] text-sub">{v}</div>
                </li>
              ))}
            </ul>
          </Panel>
        </Build>
        <Build at={2} y={0} x={14} className="h-full">
          <Panel tone="d" className="h-full p-[26px]">
            <Brain size={36} className="text-d" />
            <div className="t-h mt-[4px]">③ 인지적 감지</div>
            <div className="t-cap">Cognitive sensing · 머릿속 안테나</div>
            <p className="t-body mt-[8px]">
              비즈니스 모델은 사실 <b className="font-semibold">경영자 머릿속의 그림(스키마)</b>이기도 하다.
            </p>
            <div className="mt-auto rounded-[14px] bg-d p-[22px] text-center text-white">
              <div className="text-[31px] font-extrabold leading-[1.28] tracking-[-0.026em]">
                BMI를 하려면
                <br />
                생각부터 바뀌어야 한다
              </div>
            </div>
          </Panel>
        </Build>
      </div>
    </Slide>
  );
}

/* 20 ------------------------------------------------------- cognitive sensing */

const ANTENNA = [
  {
    icon: Eye,
    ko: "주변 시야",
    en: "Peripheral vision",
    def: "아직 작지만 커질 수 있는 약한 신호를 먼저 잡아낸다",
    ex: "배달 주문 비율이 석 달째 조금씩 오른다",
  },
  {
    icon: Lightbulb,
    ko: "의미 만들기",
    en: "Sense-making",
    def: "복잡한 정보를 “그래서 뭘 해야 하지?”로 바꾼다",
    ex: "단골에게 “집에서 혼자 먹을 때 뭐가 아쉬워?”라고 묻는다",
  },
  {
    icon: FlaskConical,
    ko: "생성적 감지",
    en: "Generative sensing",
    def: "관찰로 가설을 세우고 실험하며 미래를 직접 만들어 간다",
    ex: "“집에서 끓여 먹는 1인분 키트라면 팔리지 않을까?”",
  },
];

const BARRIERS = ["아예 알아차리지 못한다", "지배적 논리에 갇힌다", "생각이 지나치게 복잡해진다"];

export function S20Antenna() {
  return (
    <Slide
      kicker="D · 과정 1"
      tag="Cognitive Sensing"
      title="인지적 감지: 약한 신호를 가설로 바꾼다"
      mini={<MiniMap active="sense" />}
      source="논문 §3.2.1 (Bitetti & Gibbert, 2022 등) · 노란 칸은 떡볶이 가게 예시"
    >
      <div className="grid grid-cols-[1fr_52px_1fr_52px_1fr]">
        {ANTENNA.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={a.ko} className="contents">
              <Build at={i} x={-12} y={0}>
                <Panel className="h-[506px] p-[24px]">
                  <SignalBars level={i} />
                  <div className="mt-[8px] flex items-center gap-[10px]">
                    <Icon size={30} className="text-d" />
                    <div className="text-[31px] font-extrabold tracking-[-0.026em]">{a.ko}</div>
                  </div>
                  <div className="t-cap">{a.en}</div>
                  <p className="t-body mt-[6px]">{a.def}</p>
                  <Ex className="mt-auto">{a.ex}</Ex>
                </Panel>
              </Build>
              {i < 2 && (
                <Build at={i + 1} x={-10} y={0} className="flex items-center justify-center">
                  <ArrowRight size={40} color={C.d} />
                </Build>
              )}
            </div>
          );
        })}
      </div>
      <Build at={3} className="mt-[18px]">
        <div className="flex h-[122px] items-center gap-[28px] rounded-[16px] bg-a-soft px-[28px] ring-1 ring-a/35">
          <div className="w-[320px] shrink-0 text-[25px] font-bold leading-[1.28] tracking-[-0.022em] text-a">
            머릿속 생각이 오히려 기회를 가리기도 한다
          </div>
          <div className="grid flex-1 grid-cols-3 gap-[12px]">
            {BARRIERS.map((b) => (
              <div key={b} className="flex h-[76px] items-center justify-center rounded-[12px] bg-white px-[12px] text-center text-[21px] font-semibold leading-[1.3] tracking-[-0.016em]">
                {b}
              </div>
            ))}
          </div>
        </div>
      </Build>
    </Slide>
  );
}

function SignalBars({ level }: { level: number }) {
  const reduced = useReducedMotion();
  const heights = [
    [8, 10, 7, 12, 9, 14, 10],
    [12, 20, 14, 28, 18, 34, 24],
    [22, 34, 28, 44, 36, 52, 44],
  ][level];
  return (
    <div className="flex h-[58px] items-end gap-[6px]" aria-hidden>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[10px] rounded-t-[3px]"
          style={{ background: level === 0 ? "#8db8ec" : C.d, height: h, transformOrigin: "bottom" }}
          animate={reduced ? undefined : { scaleY: [0.72, 1, 0.72] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.13, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* 21 ------------------------------------------------------- BM redesign */

export function S21Redesign() {
  return (
    <Slide
      kicker="D · 과정 2"
      tag="BM (Re)Design · 포착 Seizing"
      title="BM (재)설계: 감지한 기회를 제때 붙잡는다"
      lead="지금 모델의 가치 창출·전달·획득을 점검하고, 투자 우선순위를 정합니다."
      mini={<MiniMap active="design" />}
      source="논문 §3.2.2 · 정수기와 프로그램 구독은 이해를 돕는 예시"
    >
      <div className="grid h-[462px] grid-cols-3 gap-[18px]">
        <RedesignCol
          title="① 가치 제안 바꾸기"
          en="Value proposition"
          items={[
            "새 지역·새 고객층 진출",
            "현지화 (가격·유통 조정)",
            <><b className="font-bold">서비스화</b>: 제품에 서비스를 붙임</>,
            <>지속가능·<b className="font-bold">순환</b>: 재사용을 염두에 둔 설계</>,
            "디지털 플랫폼으로 적은 시설로 세계 시장 공략",
          ]}
        />
        <RedesignCol
          title="② 수익 모델 바꾸기"
          en="Revenue model"
          items={[
            <>한 번 사는 <b className="font-bold">라이선스 → 구독</b></>,
            "등급별 요금제",
            <><b className="font-bold">쓴 만큼 내는</b> 요금제</>,
            "돈 버는 구조를 회사 전체 전략과 맞추기",
          ]}
        />
        <RedesignCol
          hot
          title="③ BM 실험"
          en="Business model experimentation"
          items={[
            <>작게 시험하고 <b className="font-bold">데이터로</b> 판단</>,
            "크게 실패할 위험은 줄이고 출시는 빠르게",
            <><b className="font-bold">린 스타트업</b>: 가설을 과학적으로 검증</>,
            <><b className="font-bold">MVP</b>로 실시간 피드백 받기</>,
          ]}
        />
      </div>
      <Build at={1} className="mt-[16px] grid grid-cols-2 gap-[18px]">
        <Ex label="서비스화란" className="h-[122px]">
          <span className="text-[24px] leading-[1.36] tracking-[-0.016em]">
            정수기를 팔고 끝내는 대신 <b className="font-bold">렌탈 + 정기 관리</b>로 바꾸는 것
          </span>
        </Ex>
        <Ex label="라이선스 → 구독이란" className="h-[122px]">
          <span className="text-[24px] leading-[1.36] tracking-[-0.016em]">
            프로그램을 한 번 사던 방식에서 <b className="font-bold">매달 요금을 내는</b> 방식으로 바뀌는 것
          </span>
        </Ex>
      </Build>
    </Slide>
  );
}

function RedesignCol({
  title,
  en,
  items,
  hot,
}: {
  title: string;
  en: string;
  items: React.ReactNode[];
  hot?: boolean;
}) {
  return (
    <Panel tone={hot ? "d" : "plain"} className="h-full p-[24px]">
      <div className="t-h">{title}</div>
      <div className="t-cap">{en}</div>
      <ul className="mt-[8px] flex flex-col gap-[11px]">
        {items.map((it, i) => (
          <li key={i} className="flex gap-[10px] text-[24px] leading-[1.36] tracking-[-0.016em]">
            <span className="mt-[13px] size-[7px] shrink-0 rounded-full bg-d" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* 22 ------------------------------------------------------- experimentation */

const MVP_STEPS = [
  { k: "작게 만든다", v: "2주 동안 20개만 만들어 단골에게 판다", en: "MVP" },
  { k: "반응을 듣는다", v: "“소스가 너무 달다”", en: "피드백" },
  { k: "고친다", v: "소스를 고쳐 다시 내놓는다", en: "수정" },
  { k: "다음 가설로", v: "반응이 좋으면 “주 2회 배송 월 구독권”도 시험", en: "새 수익 모델" },
];

const RING = "M210 40 A170 170 0 1 1 209.9 40 Z";

export function S22Experiment() {
  const step = useStep();
  const reduced = useReducedMotion();
  return (
    <Slide
      kicker="D · 과정 2"
      tag="Lean Startup · MVP"
      title="크게 걸기 전에 작게 시험한다"
      lead="실패할 위험은 줄이고, 시장에 나가는 시간은 앞당깁니다."
      mini={<MiniMap active="design" />}
      source="논문 §3.2.2 (Bocken & Konietzko, 2022; Liu & Yu, 2021 등) · 떡볶이 가게 예시"
    >
      <div className="grid h-[580px] grid-cols-[440px_1fr] items-center gap-[36px]">
        <svg
          width="420"
          height="420"
          viewBox="0 0 420 420"
          role="img"
          aria-label="가설, MVP, 피드백, 수정이 반복되는 순환"
          className="justify-self-center"
        >
          <circle cx="210" cy="210" r="170" fill="none" stroke={C.dSoft} strokeWidth="24" />
          <motion.circle
            cx="210"
            cy="210"
            r="170"
            fill="none"
            stroke={C.d}
            strokeWidth="24"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: (step + 1) / 4 }}
            transition={{ duration: 0.55, ease: EASE }}
            transform="rotate(-90 210 210)"
          />
          {!reduced && (
            <circle r="9" fill="#fff" stroke={C.d} strokeWidth="3">
              <animateMotion dur="6s" repeatCount="indefinite" path={RING} />
            </circle>
          )}
          <text x="210" y="196" textAnchor="middle" fontSize="36" fontWeight="800" letterSpacing="-0.03em" fill={C.ink}>
            가설 검증
          </text>
          <text x="210" y="236" textAnchor="middle" fontSize="24" fontWeight="600" fill={C.sub}>
            린 스타트업
          </text>
        </svg>
        <div className="flex flex-col gap-[14px]">
          {MVP_STEPS.map((s, i) => (
            <Build key={s.k} at={i} x={16} y={0}>
              <div className="flex h-[124px] items-center gap-[22px] rounded-[16px] bg-ex px-[26px] ring-1 ring-ex-line">
                <span className="num flex size-[52px] shrink-0 items-center justify-center rounded-full bg-d text-[25px] font-extrabold text-white">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline gap-[10px]">
                    <span className="text-[28px] font-extrabold tracking-[-0.025em]">{s.k}</span>
                    <span className="text-[17px] font-semibold text-ex-ink">{s.en}</span>
                  </div>
                  <p className="t-body text-sub">{s.v}</p>
                </div>
              </div>
            </Build>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* 23 ------------------------------------------------------- reconfiguration */

export function S23Reconfig() {
  return (
    <Slide
      kicker="D · 과정 3"
      tag="Reconfiguration & Resource Alignment · 전환 Transforming"
      title="재구성·자원 정렬: 회사 안을 다시 짠다"
      lead="새 설계도가 있어도 회사 안이 그대로면 실행할 수 없습니다."
      mini={<MiniMap active="align" />}
      source="논문 §3.2.3"
    >
      <div className="grid h-[580px] grid-cols-3 gap-[18px]">
        <Build at={0} y={0} className="h-full">
          <Panel className="h-full p-[26px]">
            <div className="t-h">① 자원·역량 새로 고치기</div>
            <div className="t-cap">Renewing resources &amp; competencies</div>
            <p className="t-sm mt-[4px] text-sub">핵심 자원을 파악한 뒤</p>
            <div className="mt-[6px] flex flex-col gap-[10px]">
              {[
                ["있는 건", "고쳐 쓰고"],
                ["없는 건", "새로 얻고"],
                ["필요 없는 건", "정리한다"],
              ].map(([a, b]) => (
                <div key={a} className="flex items-baseline justify-between rounded-[12px] bg-surface-2 px-[18px] py-[14px]">
                  <span className="text-[20px] font-medium text-sub">{a}</span>
                  <span className="text-[27px] font-extrabold tracking-[-0.024em]">{b}</span>
                </div>
              ))}
            </div>
            <p className="t-sm mt-auto text-sub">전문 인재를 뽑고, 기존 직원을 다시 교육하는 것도 중요하다.</p>
          </Panel>
        </Build>
        <Build at={1} y={0} x={14} className="h-full">
          <Panel className="h-full p-[26px]">
            <div className="t-h">② 자원 오케스트레이션</div>
            <div className="t-cap">Resource orchestration</div>
            <p className="t-body mt-[6px]">
              돈·기술·사람을 새 모델에 맞게 <Hl>지휘자처럼 배치</Hl>한다.
            </p>
            <div className="mt-[6px] flex flex-1 flex-col gap-[10px]">
              <div className="flex flex-1 flex-col justify-center rounded-[12px] bg-surface-2 p-[18px]">
                <div className="text-[27px] font-extrabold tracking-[-0.024em]">조정 역량</div>
                <div className="t-sm mt-[4px] text-sub">정보와 자원이 회사와 파트너 사이를 잘 흐르게</div>
              </div>
              <div className="flex flex-1 flex-col justify-center rounded-[12px] bg-surface-2 p-[18px]">
                <div className="text-[27px] font-extrabold tracking-[-0.024em]">통합 역량</div>
                <div className="t-sm mt-[4px] text-sub">개인에게 흩어진 지식을 한데 모으게</div>
              </div>
            </div>
          </Panel>
        </Build>
        <Build at={2} y={0} x={14} className="h-full">
          <Panel className="h-full p-[26px]">
            <div className="t-h">③ 조직 구조 바꾸기</div>
            <div className="t-cap">Organizational structure adaptation</div>
            <ul className="mt-[12px] flex flex-col gap-[22px]">
              {[
                "새 부서·사업부·직무 만들기",
                <><b className="font-bold">수평적 조직</b>, 빠른 의사결정, 유연한 절차</>,
                <>아주 새로운 모델은 <b className="font-bold">혁신 랩·스핀오프</b>로 본업과 떼어 놓기</>,
                <><b className="font-bold">교차 기능 팀</b>으로 결정은 빠르게, 문제 해결은 함께</>,
              ].map((it, i) => (
                <li key={i} className="flex gap-[10px] text-[24px] leading-[1.38] tracking-[-0.016em]">
                  <span className="mt-[14px] size-[7px] shrink-0 rounded-full bg-d" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </Build>
      </div>
    </Slide>
  );
}

/* 24 ------------------------------------------------------- reallocating resources in the shop */

const MOVES = [
  { from: "잘 안 팔리던 튀김 메뉴", to: "메뉴 정리", kind: "정리", color: C.grayDark },
  { from: "남는 주방 공간", to: "밀키트 포장대", kind: "돌려쓰기", color: C.d },
  { from: "아르바이트생 한 명", to: "밀키트 전담 + 배달앱 관리 교육", kind: "재교육", color: C.d },
  { from: "(없음)", to: "밀키트용 포장 기계", kind: "새로 들이기", color: C.o },
];

const CONCEPTS = [
  { ko: "자원 유연성", en: "Resource flexibility", v: "있는 자원을 다른 용도로 돌려쓰기" },
  { ko: "조정 유연성", en: "Coordination flexibility", v: "자원을 새롭게 조합하기" },
  { ko: "전략적 민첩성", en: "Strategic agility", v: "변화에 맞춰 전략 자원을 재빨리 묶어 내기" },
  { ko: "흡수 역량", en: "Absorptive capacity", v: "바깥 지식을 알아보고 → 소화해서 → 써먹기" },
];

export function S24Realloc() {
  return (
    <Slide
      kicker="D · 과정 3"
      tag="떡볶이 가게로 보기"
      title="돌려쓰고, 새로 들이고, 정리한다"
      mini={<MiniMap active="align" />}
      source="논문 §3.2.3 (전략적 유연성·민첩성·흡수 역량) · 왼쪽은 이해를 돕는 예시"
    >
      <div className="grid h-[640px] grid-cols-[1fr_450px] gap-[24px]">
        <div className="flex flex-col rounded-[18px] bg-ex p-[24px] ring-1 ring-ex-line">
          <div className="mb-[12px] grid grid-cols-[1fr_72px_1.28fr] text-[18px] font-bold text-ex-ink">
            <span>지금 가게에 있는 것</span>
            <span />
            <span>새 설계도에 맞춘 뒤</span>
          </div>
          <div className="flex flex-1 flex-col justify-between">
            {MOVES.map((m, i) => (
              <div key={m.to} className="grid grid-cols-[1fr_72px_1.28fr] items-center">
                <div
                  className="flex h-[122px] items-center justify-center rounded-[14px] bg-white px-[14px] text-center text-[23px] font-semibold leading-[1.3] tracking-[-0.018em] ring-1 ring-ex-line"
                  style={{ color: m.from === "(없음)" ? C.mute : C.ink }}
                >
                  {m.from}
                </div>
                <Build at={i + 1} x={-12} y={0} className="flex items-center justify-center">
                  <ArrowRight size={44} color={m.color} strokeWidth={3} />
                </Build>
                <Build at={i + 1} x={-16} y={0}>
                  <div
                    className="flex h-[122px] flex-col justify-center rounded-[14px] px-[20px] text-white"
                    style={{ background: m.color }}
                  >
                    <div className="text-[17px] font-semibold text-white/85">{m.kind}</div>
                    <div className="text-[25px] font-bold leading-[1.26] tracking-[-0.022em]">{m.to}</div>
                  </div>
                </Build>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <div className="t-h text-sub">이걸 받쳐 주는 역량들</div>
          {CONCEPTS.map((c) => (
            <Panel key={c.ko} className="flex-1 justify-center gap-[2px] p-[20px]">
              <div className="flex items-baseline gap-[8px]">
                <span className="text-[25px] font-bold tracking-[-0.022em]">{c.ko}</span>
              </div>
              <div className="t-cap">{c.en}</div>
              <p className="t-sm mt-[2px] text-sub">{c.v}</p>
            </Panel>
          ))}
        </div>
      </div>
    </Slide>
  );
}
