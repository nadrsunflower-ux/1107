"use client";

import { motion } from "framer-motion";
import { Boxes, Cog, HelpCircle, Network, User, Workflow } from "lucide-react";
import { useStep } from "@/components/deck/context";
import { ArrowRight, Build, En, Hl, Panel, Slide, Tag } from "@/components/deck/primitives";
import { C, EASE } from "@/lib/design";

/* 4 */
const QUESTIONS = [
  { q: "누구에게 팔까?", term: "고객", ex: "학생들에게" },
  { q: "무엇을 줄까?", term: "가치 제안", ex: "싸고 맛있는 떡볶이를" },
  { q: "어떻게 전달할까?", term: "채널", ex: "가게에서" },
  { q: "어떻게 돈을 받을까?", term: "수익 모델", ex: "1인분 4,000원에" },
];

export function S04BusinessModel() {
  return (
    <Slide
      kicker="개념 ①"
      tag="Business Model"
      title="비즈니스 모델: 회사가 돈을 버는 설계도"
      lead="네 가지 질문에 대한 답을 모아 놓은 것이 비즈니스 모델입니다."
      source="논문 §1"
    >
      <div className="grid grid-cols-4 gap-[20px]">
        {QUESTIONS.map((c) => (
          <Panel key={c.q} className="h-[222px] justify-center p-[24px]">
            <div className="text-[36px] font-extrabold leading-[1.26] tracking-[-0.03em]">{c.q}</div>
            <div className="t-body font-medium text-mute">{c.term}</div>
          </Panel>
        ))}
      </div>

      <Build at={1} y={8} className="mt-[16px] grid grid-cols-4 gap-[20px]">
        <Bracket className="col-span-2" label="가치 창출" en="Value creation" />
        <Bracket label="가치 전달" en="Value delivery" />
        <Bracket label="가치 획득" en="Value capture" />
      </Build>

      <Build at={2} className="mt-[24px]">
        <div className="rounded-[18px] bg-ex p-[20px] ring-1 ring-ex-line">
          <div className="mb-[12px] text-[18px] font-bold text-ex-ink">떡볶이 가게의 설계도</div>
          <div className="grid grid-cols-4 gap-[20px]">
            {QUESTIONS.map((c) => (
              <div
                key={c.ex}
                className="flex h-[108px] items-center justify-center rounded-[12px] bg-white px-[14px] text-center text-[28px] font-bold leading-[1.25] tracking-[-0.02em] ring-1 ring-ex-line"
              >
                {c.ex}
              </div>
            ))}
          </div>
        </div>
      </Build>
    </Slide>
  );
}

function Bracket({ className, label, en }: { className?: string; label: string; en: string }) {
  return (
    <div className={className}>
      <div className="h-[12px] rounded-b-[8px] border-x-[2.5px] border-b-[2.5px] border-d" />
      <div className="mt-[6px] text-center text-[25px] font-bold text-d">
        {label} <En>{en}</En>
      </div>
    </div>
  );
}

/* 5 */
const ROWS = [
  { k: "누구에게", from: "학생들", to: "집에서 혼자 먹는 1인 가구" },
  { k: "무엇을", from: "떡볶이", to: "1인분 떡볶이 밀키트" },
  { k: "어떻게", from: "가게에서", to: "집으로 배송" },
  { k: "얼마에", from: "1인분 4,000원", to: "월 구독권" },
];

export function S05BMI() {
  const step = useStep();
  return (
    <Slide
      kicker="개념 ②"
      tag="Business Model Innovation, BMI"
      title="BMI: 메뉴를 늘리는 게 아니라 설계도 자체를 고치는 것"
      source="논문 §1 · 예시는 이해를 돕기 위한 것"
    >
      <div className="grid grid-cols-[480px_1fr] gap-[28px]">
        <Panel className="h-[498px] p-[26px]">
          <div className="t-h">메뉴를 하나 더 만든다</div>
          <p className="t-sm text-sub">설계도는 그대로다.</p>
          <div className="mt-[8px] flex flex-col gap-[10px]">
            {ROWS.map((r) => (
              <div
                key={r.k}
                className="flex h-[64px] items-center gap-[14px] rounded-[12px] bg-surface-2 px-[18px]"
              >
                <span className="w-[80px] shrink-0 text-[17px] font-semibold text-mute">{r.k}</span>
                <span className="text-[22px] font-semibold">{r.from}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto self-start rounded-full bg-surface-2 px-[16px] py-[6px] text-[18px] font-semibold text-sub">
            + 치즈 떡볶이 추가
          </div>
        </Panel>

        <Panel tone="d" className="h-[498px] p-[26px]">
          <div className="t-h text-d">파는 방식, 돈 받는 방식을 바꾼다</div>
          <p className="t-sm text-sub">이것이 비즈니스 모델 혁신이다.</p>
          <div className="mt-[8px] flex flex-col gap-[10px]">
            {ROWS.map((r) => (
              <div
                key={r.k}
                className="flex h-[64px] items-center gap-[14px] rounded-[12px] bg-white px-[18px] ring-1 ring-d/25"
              >
                <span className="w-[80px] shrink-0 text-[17px] font-semibold text-mute">{r.k}</span>
                <span className="relative shrink-0 text-[22px] font-medium text-mute">
                  {r.from}
                  <motion.span
                    initial={false}
                    animate={{ scaleX: step >= 1 ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="absolute inset-x-0 top-1/2 h-[2.5px] origin-left bg-a"
                  />
                </span>
                <motion.span
                  initial={false}
                  animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -14 }}
                  transition={{ duration: 0.36, ease: EASE }}
                  className="flex items-center gap-[12px]"
                >
                  <ArrowRight size={30} color={C.d} />
                  <span className="text-[28px] font-bold tracking-[-0.024em] text-d">{r.to}</span>
                </motion.span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Build at={2} className="mt-[20px]">
        <div className="flex h-[112px] items-center gap-[20px] rounded-[16px] bg-night px-[30px] text-white">
          <span className="shrink-0 text-[26px] font-bold">BMI를 잘하면</span>
          <div className="flex flex-1 justify-around text-[28px] font-semibold tracking-[-0.02em]">
            <span>새로운 수익원</span>
            <span>비용 절감</span>
            <span>시장 점유율 확대</span>
            <span>친환경 경영</span>
          </div>
        </div>
      </Build>
    </Slide>
  );
}

/* 6 */
const SSTEPS = [
  { key: "감지", en: "Sensing", say: "알아채기", ex: "배달앱이 퍼지고 혼밥족이 는 것을 알아챈다" },
  { key: "포착", en: "Seizing", say: "붙잡기", ex: "밀키트와 구독권을 떠올린다" },
  { key: "전환", en: "Transforming", say: "바꾸기", ex: "가게 운영을 바꾼다" },
];

export function S06Capabilities() {
  return (
    <Slide
      kicker="개념 ③"
      tag="Operational vs Dynamic Capabilities"
      title="운영 역량은 하던 일을 잘하는 힘, 동적 역량은 일을 바꾸는 힘"
      source="Teece et al. (1997, p. 516); Teece (2007) · 논문 §1에서 재인용"
    >
      <div className="grid h-[296px] grid-cols-[1fr_1.4fr] gap-[24px]">
        <Panel className="p-[26px]">
          <div className="flex items-center gap-[10px]">
            <Cog size={28} className="text-mute" />
            <div className="t-h">운영 역량</div>
          </div>
          <p className="t-body">
            생산·관리처럼 <b className="font-semibold">정해진 일을 효율적으로</b> 해내는 힘. 세상이 그대로일
            때는 충분하지만, 예측 못 할 변화가 오면 흔들린다.
          </p>
          <p className="t-body mt-auto font-semibold text-ex-ink">떡볶이를 빠르고 맛있게 만드는 솜씨</p>
        </Panel>
        <Panel tone="d" className="p-[26px]">
          <div className="flex items-center gap-[10px]">
            <Workflow size={28} className="text-d" />
            <div className="t-h text-d">동적 역량</div>
          </div>
          <p className="text-[30px] font-semibold leading-[1.4] tracking-[-0.022em]">
            “빠르게 변하는 환경에 맞서 회사 안팎의 능력을{" "}
            <Hl>합치고·새로 만들고·다시 짜는</Hl> 능력”
          </p>
          <p className="t-cap mt-auto">Teece, Pisano &amp; Shuen (1997)의 정의</p>
        </Panel>
      </div>

      <div className="mt-[24px] grid grid-cols-[1fr_1fr_1fr_296px] items-stretch gap-[14px]">
        {SSTEPS.map((s, i) => (
          <Build key={s.key} at={i + 1} x={-14} y={0}>
            <div className="flex h-[318px] flex-col rounded-[16px] bg-white p-[22px] ring-[1.5px] ring-d">
              <div className="flex items-baseline gap-[8px]">
                <span className="text-[40px] font-extrabold tracking-[-0.03em] text-d">{s.key}</span>
                <En>{s.en}</En>
              </div>
              <div className="t-h2 mt-[2px] text-sub">{s.say}</div>
              <div className="mt-auto rounded-[12px] bg-ex p-[16px] text-[24px] font-semibold leading-[1.36] tracking-[-0.016em] ring-1 ring-ex-line">
                {s.ex}
              </div>
            </div>
          </Build>
        ))}
        <Build at={4} x={-14} y={0}>
          <div className="flex h-[318px] flex-col justify-center rounded-[16px] bg-night p-[24px] text-white">
            <div className="text-[23px] font-semibold text-white/75">그렇게 파는 방식이</div>
            <div className="text-[23px] font-semibold text-white/75">실제로 바뀌면</div>
            <div className="mt-[12px] text-[60px] font-extrabold tracking-[-0.03em]">= BMI</div>
          </div>
        </Build>
      </div>
    </Slide>
  );
}

/* 7 */
const FOUND = [
  { icon: User, name: "사람", desc: "사람 한 명 한 명" },
  { icon: Workflow, name: "루틴", desc: "일하는 습관" },
  { icon: Boxes, name: "구조", desc: "조직의 짜임새" },
  { icon: Network, name: "관계", desc: "사람들끼리의 상호작용" },
];

export function S07Micro() {
  const step = useStep();
  return (
    <Slide
      kicker="개념 ④"
      tag="Microfoundations"
      title="미시적 기반: 그 역량은 실제로 어디서 나올까"
      lead="‘역량’이라는 말은 추상적입니다. 그래서 상자를 열어 재료를 봅니다."
      source="Felin et al. (2015); Helfat & Peteraf (2015) · 논문 §1에서 재인용"
    >
      <div className="grid h-[596px] grid-cols-[380px_90px_1fr]">
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={false}
            animate={{ scale: step >= 1 ? 0.84 : 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex h-[300px] w-[330px] flex-col items-center justify-center rounded-[22px] bg-night text-white"
          >
            <HelpCircle size={56} strokeWidth={1.6} className="text-white/60" />
            <div className="mt-[12px] text-[44px] font-extrabold tracking-[-0.03em]">동적 역량</div>
            <div className="t-body mt-[4px] text-white/75">안에 무엇이 들어 있을까?</div>
          </motion.div>
        </div>
        <Build at={1} x={-12} y={0} className="flex items-center justify-center">
          <ArrowRight size={62} color={C.ink} strokeWidth={2.5} />
        </Build>
        <div className="flex flex-col justify-center gap-[20px]">
          <div className="grid grid-cols-2 gap-[16px]">
            {FOUND.map(({ icon: Icon, name, desc }, i) => {
              const hot = i === 0 && step >= 2;
              return (
                <Build key={name} at={1} y={16}>
                  <div
                    className="flex h-[160px] items-center gap-[20px] rounded-[16px] px-[28px] ring-1 ring-line"
                    style={{
                      background: hot ? C.d : C.surface,
                      color: hot ? "#fff" : C.ink,
                      transition: "background .25s",
                    }}
                  >
                    <Icon size={46} strokeWidth={1.9} className={hot ? "text-white" : "text-d"} />
                    <div>
                      <div className="text-[37px] font-extrabold tracking-[-0.028em]">{name}</div>
                      <div
                        className="t-body font-medium"
                        style={{ color: hot ? "rgba(255,255,255,.85)" : C.sub }}
                      >
                        {desc}
                      </div>
                    </div>
                  </div>
                </Build>
              );
            })}
          </div>
          <Build at={2}>
            <Panel tone="d" className="gap-[8px] p-[26px]">
              <div className="flex items-center gap-[10px]">
                <Tag tone="d">핵심 재료</Tag>
                <span className="t-h2">동적 관리 역량 <En>Dynamic Managerial Capabilities, DMC</En></span>
              </div>
              <p className="t-body">
                <b className="font-semibold">리더 개인의 능력.</b> 주의력·판단력·문제 해결력, 그리고 확실하지
                않은 상황에서도 결정하는 힘이다.
              </p>
            </Panel>
          </Build>
        </div>
      </div>
    </Slide>
  );
}

