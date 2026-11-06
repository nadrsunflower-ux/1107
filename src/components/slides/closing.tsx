"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, MessageCircleQuestion, TriangleAlert } from "lucide-react";
import { useStep } from "@/components/deck/context";
import { Build, DarkSlide, Hl, Panel, Slide, Tag } from "@/components/deck/primitives";
import { DecisionLoop } from "@/components/viz/framework";
import { EASE, type Tone } from "@/lib/design";

/* 35 ------------------------------------------------------- research agenda (Table 7) */

const AGENDA: { tone: Tone; name: string; q: React.ReactNode[] }[] = [
  {
    tone: "a",
    name: "선행요인",
    q: [
      <><b className="font-bold">AI·블록체인·양자컴퓨팅·XR·IoT</b>는 동적 역량을 어떻게 바꾸고, 어떤 역량 공백을 만드나?</>,
      "수평 조직이나 위험 감수 문화는 정말 원인인가?",
    ],
  },
  {
    tone: "d",
    name: "결정",
    q: [
      <><b className="font-bold">린 스타트업</b>을 도구가 아니라 하나의 동적 역량으로 볼 수 있나?</>,
      "되돌리기 어려운 투자에서 위험을 어떻게 관리하나?",
    ],
  },
  {
    tone: "o",
    name: "결과",
    q: [
      <>BMI 유형마다 동적 역량이 만드는 <b className="font-bold">성과가 어떻게 다른가</b>?</>,
      "단기 성과 말고 장기적으로 모델이 얼마나 오래가나?",
    ],
  },
  {
    tone: "t",
    name: "이론",
    q: [
      <>연구마다 다른 <b className="font-bold">BMI의 정의를 하나로</b> 모을 수 있을까?</>,
      "이중 루프 학습은 굳어진 사업 논리를 어떻게 깨나?",
    ],
  },
  {
    tone: "t",
    name: "맥락",
    q: [
      <><b className="font-bold">남미·아프리카·동남아</b>에서는 어떻게 다른가?</>,
      "자원이 부족한 회사나 스타트업에는 어떤 길이 맞나?",
    ],
  },
  {
    tone: "t",
    name: "방법",
    q: [
      <>여러 해 추적하는 <b className="font-bold">종단 연구</b>, 혼합 방법, fsQCA를 더 써야 한다.</>,
      "개인·팀·회사·생태계를 함께 보는 다층 연구",
    ],
  },
];

export function S35Agenda() {
  return (
    <Slide
      kicker="결론"
      tag="Future Research Agenda"
      title="앞으로 연구할 것: 여섯 칸의 질문"
      lead="ADO와 TCM의 각 칸마다 비어 있는 질문을 정리했습니다. 대표 질문만 골랐습니다."
      source="논문 표 7 · §5"
    >
      <div className="grid h-[580px] grid-cols-3 grid-rows-2 gap-[16px]">
        {AGENDA.map((a) => (
          <Panel key={a.name} className="gap-[10px] p-[22px]">
            <Tag tone={a.tone} className="self-start text-[17px]">
              {a.name}
            </Tag>
            <ul className="flex flex-col gap-[8px]">
              {a.q.map((q, i) => (
                <li key={i} className="text-[22px] leading-[1.4] tracking-[-0.014em]">
                  {q}
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
    </Slide>
  );
}

/* 36 ------------------------------------------------------- contribution */

export function S36Contribution() {
  const step = useStep();
  return (
    <Slide
      kicker="결론"
      tag="Theoretical Implications"
      title="이 논문이 바꾼 것은 질문 자체다"
      source="논문 §6.1"
    >
      <div className="flex h-[248px] flex-col justify-center gap-[10px] rounded-[20px] bg-night px-[44px] text-white">
        <div className="relative self-start text-[35px] font-semibold tracking-[-0.026em] text-white/75">
          “어떤 부품이 바뀌나?”
          <motion.span
            initial={false}
            animate={{ scaleX: step >= 1 ? 1 : 0 }}
            transition={{ duration: 0.36, ease: EASE }}
            className="absolute inset-x-0 top-[52%] h-[3px] origin-left bg-[#ffd65a]"
          />
        </div>
        <Build at={1} y={12}>
          <div className="text-[44px] font-extrabold leading-[1.28] tracking-[-0.032em]">
            “회사는 변하는 상황 속에서 <span className="text-[#ffd65a]">역량을 어떻게 계속 다시 지휘하나?</span>”
          </div>
        </Build>
      </div>
      <div className="mt-[20px] grid grid-cols-2 gap-[20px]">
        <Build at={2} y={12}>
          <Panel className="h-[372px] p-[30px]">
            <span className="text-[60px] font-extrabold leading-none text-d">①</span>
            <div className="mt-[8px] text-[31px] font-extrabold tracking-[-0.026em]">BMI의 의미를 다시 정의했다</div>
            <p className="mt-[6px] text-[25px] leading-[1.46] tracking-[-0.016em] text-sub">
              BMI는 한 번의 재설계가 아니다. 감지 → 시제품 만들기 → 자원 재구성 → 학습이{" "}
              <Hl>스스로 강화되며 도는 순환</Hl>이다.
            </p>
          </Panel>
        </Build>
        <Build at={3} y={12}>
          <Panel className="h-[372px] p-[30px]">
            <span className="text-[60px] font-extrabold leading-none text-d">②</span>
            <div className="mt-[8px] text-[31px] font-extrabold tracking-[-0.026em]">‘블랙박스’를 열었다</div>
            <p className="mt-[6px] text-[25px] leading-[1.46] tracking-[-0.016em] text-sub">
              개인(리더의 판단 틀) → 조직(학습 기반 루틴) → 관계·생태계(이해관계자와의 상호작용)를 잇는{" "}
              <Hl>3층 미시적 기반</Hl>으로, 역량이 어떻게 모델 갱신을 만들거나 가로막는지 설명한다.
            </p>
          </Panel>
        </Build>
      </div>
    </Slide>
  );
}

/* 37 ------------------------------------------------------- managerial checklist */

const CHECKS = [
  ["살피기", "고객 행동, 경쟁사, 규제, 신기술을 꾸준히 살피고 회사 안의 데이터도 통찰로 바꾸고 있나?"],
  ["실험하기", "MVP나 A/B 테스트로 가치 제안·가격·채널을 반복해서 다듬고 있나?"],
  ["자원 맞추기", "돈·사람·기술을 새 모델에 맞게 다시 배치하고, 팀 개편이나 전략적 제휴도 하고 있나?"],
  ["균형 잡기", "탐색(트렌드 분석, 시범 사업)과 활용(피드백, 작은 개선)을 함께 하고 있나?"],
  ["지식 나누기", "성공과 실패의 교훈을 빠르게 회사의 규칙으로 만들고 있나?"],
  ["생태계 넓히기", "고객·공급자·스타트업·대학·공공기관과 함께 만들고 위험을 나누고 있나?"],
  ["리더의 역할", "실험과 회복력의 문화를 만들고, 잘될 곳으로 자원을 빠르게 옮기고, 결정 권한을 나누고 있나?"],
];

export function S37Checklist() {
  return (
    <Slide
      kicker="결론"
      tag="Managerial Implications"
      title="경영자를 위한 체크리스트 일곱 개"
      source="논문 §6.2"
    >
      <div className="flex h-[660px] flex-col justify-between">
        {CHECKS.map(([k, v], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: EASE, delay: 0.05 * i }}
            className="flex h-[86px] items-center gap-[20px] rounded-[14px] bg-white px-[22px] ring-1 ring-line"
          >
            <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[10px] bg-o text-white">
              <Check size={26} strokeWidth={3} />
            </span>
            <span className="w-[172px] shrink-0 text-[26px] font-extrabold tracking-[-0.026em]">{k}</span>
            <span className="text-[22px] leading-[1.38] tracking-[-0.014em] text-sub">{v}</span>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

/* 38 ------------------------------------------------------- limitations and critical reading */

export function S38Limits() {
  return (
    <Slide
      kicker="결론"
      tag="Limitations"
      title="한계: 논문이 밝힌 것, 읽으며 확인한 것"
      source="논문 §7 · 표 4·5 · §2.5 · §4.2. 오른쪽은 발표자가 표와 본문을 대조해 계산한 내용"
    >
      <div className="grid h-[640px] grid-cols-[1fr_1.18fr] gap-[22px]">
        <Panel className="gap-[14px] p-[28px]">
          <div className="t-h">논문이 스스로 밝힌 한계</div>
          <div className="flex flex-1 flex-col gap-[14px]">
            <div className="flex flex-1 flex-col justify-center rounded-[14px] bg-surface-2 p-[24px]">
              <div className="text-[28px] font-extrabold tracking-[-0.024em]">좋은 학술지만 봤다</div>
              <p className="t-body mt-[6px] text-sub">
                질을 지키려고 Q1·Q2로 제한했지만, 등급이 낮은 학술지의 참신한 아이디어는 놓쳤을 수 있다.
              </p>
            </div>
            <div className="flex flex-1 flex-col justify-center rounded-[14px] bg-surface-2 p-[24px]">
              <div className="text-[28px] font-extrabold tracking-[-0.024em]">스냅숏이다</div>
              <p className="t-body mt-[6px] text-sub">
                2023년 9월에 검색한 결과라서 그 뒤에 나온 연구는 들어 있지 않다.
              </p>
            </div>
          </div>
        </Panel>
        <Build at={1} x={14} y={0} className="h-full">
          <Panel tone="a" className="h-full gap-[12px] p-[28px]">
            <div className="flex items-center gap-[10px]">
              <TriangleAlert size={28} className="text-a" />
              <div className="t-h text-a">원문을 읽으며 확인한 숫자</div>
            </div>
            <div className="flex flex-1 flex-col gap-[12px]">
              <Mismatch
                title="회사 규모 비율"
                body="본문은 26·23·16·7%라고 적었지만, 표 5의 24·12·9·5편은 42·21·16·9%다."
              />
              <Mismatch
                title="중국 + 독일 “40%”"
                body="표 4의 11 + 10 = 21편은 57편의 37%다. 큰 결론은 같지만 숫자는 조금 다르다."
              />
              <Mismatch
                title="κ는 계산 전제가 있다"
                body="실제 분할표가 아니라 ‘일반적인 우연 일치 수준’을 가정한 값이다. 역산하면 우연 일치 약 0.6을 가정한 셈이다."
              />
            </div>
          </Panel>
        </Build>
      </div>
    </Slide>
  );
}

function Mismatch({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-1 flex-col justify-center rounded-[14px] bg-white p-[20px]">
      <div className="text-[26px] font-extrabold tracking-[-0.022em]">{title}</div>
      <p className="mt-[4px] text-[22px] leading-[1.4] tracking-[-0.014em] text-sub">{body}</p>
    </div>
  );
}

/* 39 ------------------------------------------------------- conclusion, one lap around the shop */

export function S39Conclusion() {
  return (
    <DarkSlide source="떡볶이 가게는 이해를 돕기 위한 예시이며 논문의 사례가 아닙니다.">
      <div className="flex h-full flex-col">
        <h1 className="text-[52px] font-extrabold leading-[1.22] tracking-[-0.034em]">
          BMI는 한 번의 사건이 아니라, <span className="text-[#ffd65a]">역량이 돌리는 순환</span>이다
        </h1>
        <div className="mt-[26px] grid flex-1 grid-cols-[700px_1fr] items-center gap-[40px]">
          <DecisionLoop
            dark
            labels={{
              sense: { title: "감지", sub: "배달 주문이 조금씩 는다" },
              design: { title: "재설계", sub: "밀키트와 구독권을 시험" },
              align: { title: "자원 정렬", sub: "포장 기계, 전담 직원" },
              learn: {
                title: "학습",
                sub: "우리는 어떤 가게인가?",
              },
            }}
          />
          <div className="flex flex-col gap-[16px]">
            <Build at={0} x={14} y={0}>
              <div className="rounded-[16px] bg-white/10 p-[24px]">
                <div className="text-[18px] font-semibold text-white/65">왜 도는가</div>
                <div className="mt-[2px] text-[28px] font-bold leading-[1.34] tracking-[-0.022em]">
                  바깥과 안쪽의 자극이 계속 들어오고, 결과는 다음 바퀴의 출발점이 된다
                </div>
              </div>
            </Build>
            <Build at={1} x={14} y={0}>
              <div className="rounded-[16px] bg-white/10 p-[24px]">
                <div className="text-[18px] font-semibold text-white/65">무엇이 받치는가</div>
                <div className="mt-[2px] text-[28px] font-bold leading-[1.34] tracking-[-0.022em]">
                  사장님의 판단력(리더)과 떡 공장·단골·배달앱과의 <span className="whitespace-nowrap">협력(이해관계자)</span>
                </div>
              </div>
            </Build>
            <Build at={2} x={14} y={0}>
              <div className="rounded-[16px] bg-[#ffd65a] p-[24px] text-ink">
                <div className="text-[18px] font-bold text-ink/70">그래서 물어야 할 것</div>
                <div className="mt-[2px] text-[30px] font-extrabold leading-[1.3] tracking-[-0.026em]">
                  무엇을 바꿀까보다, 계속 바꿀 수 있는 힘이 있는가
                </div>
              </div>
            </Build>
          </div>
        </div>
      </div>
    </DarkSlide>
  );
}

/* 40 ------------------------------------------------------- discussion */

const QUESTIONS = [
  {
    q: "린 스타트업은 도구일까요, 동적 역량일까요?",
    hint: "논문은 감지·포착·전환을 모두 도울 수 있다고 보지만, 아직 이론으로 잘 엮이지 않았다고 합니다.",
  },
  {
    q: "AI 같은 신기술은 동적 역량을 어떻게 바꾸고, 어떤 공백을 만들까요?",
    hint: "감지를 대신해 주는 도구일까요, 새로운 역량을 요구하는 환경일까요?",
  },
  {
    q: "자원이 부족한 기술 스타트업이라면 네 과정 중 어디서 먼저 막힐까요?",
    hint: "논문의 표본에서 스타트업 연구는 5편뿐입니다.",
  },
];

export function S40Discussion() {
  return (
    <Slide
      kicker="결론"
      tag="시간에 맞춰 조절"
      title="함께 생각해 볼 질문"
      source="논문 표 7(Lean Startup as a DC, Technology-Driven Antecedents)과 표 5에서 출발한 질문"
    >
      <div className="flex h-[660px] flex-col gap-[16px]">
        {QUESTIONS.map((c, i) => (
          <Build key={c.q} at={i} y={12} className="flex-1">
            <div className="flex h-full items-center gap-[26px] rounded-[18px] bg-white px-[34px] ring-1 ring-line">
              <MessageCircleQuestion size={46} strokeWidth={1.8} className="shrink-0 text-d" />
              <div>
                <div className="text-[34px] font-bold leading-[1.28] tracking-[-0.028em]">{c.q}</div>
                <p className="t-body mt-[6px] text-sub">{c.hint}</p>
              </div>
            </div>
          </Build>
        ))}
      </div>
    </Slide>
  );
}

/* 41 ------------------------------------------------------- thanks */

export function S41Thanks() {
  return (
    <DarkSlide>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <h1 className="text-[76px] font-extrabold tracking-[-0.038em]">경청해 주셔서 감사합니다</h1>
        <p className="mt-[18px] text-[28px] font-medium tracking-[-0.018em] text-white/80">
          질문이 있으시면 편하게 말씀해 주세요.
        </p>
        <p className="mt-[60px] max-w-[1120px] text-[18px] leading-[1.55] text-white/60">
          Cruz-Sánchez, O., Cruz-Cázares, C., &amp; Hernandez-Vivanco, A. (2026). Business model innovation
          from dynamic capabilities perspective: A systematic literature review. Journal of Business
          Research, 204, 115835. https://doi.org/10.1016/j.jbusres.2025.115835
        </p>
      </div>
    </DarkSlide>
  );
}
