"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Camera, Film } from "lucide-react";
import { useStep } from "@/components/deck/context";
import { ArrowRight, Build, Panel, Slide, Tag } from "@/components/deck/primitives";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { C, EASE } from "@/lib/design";

/* 8 */
const FRAME_COLORS = [
  [C.gray, C.gray, C.gray, C.gray],
  [C.d, C.gray, C.gray, C.gray],
  [C.d, C.d, C.gray, C.gray],
  [C.d, C.d, C.a, C.gray],
  [C.d, C.d, C.a, C.o],
];

function MiniBlueprint({ colors, size = 34 }: { colors: string[]; size?: number }) {
  return (
    <div className="grid grid-cols-2 gap-[5px]">
      {colors.map((c, i) => (
        <div key={i} className="rounded-[6px]" style={{ width: size, height: size, background: c }} />
      ))}
    </div>
  );
}

export function S08PhotoVideo() {
  return (
    <Slide
      kicker="연구 배경"
      title="정적 관점으로는 ‘어떻게’를 볼 수 없다"
      source="Demil & Lecocq (2010); Foss & Saebi (2017) · 논문 §1"
    >
      <div className="grid h-[473px] grid-cols-[1fr_1.45fr] gap-[24px]">
        <Panel className="p-[28px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <Camera size={30} className="text-mute" />
              <div className="t-h">정적 관점 = 사진</div>
            </div>
            <div className="flex gap-[6px]">
              <Tag>무엇 what</Tag>
              <Tag>왜 why</Tag>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="rounded-[10px] border-[10px] border-white p-[14px] shadow-[0_2px_14px_rgba(0,0,0,.16)]">
              <MiniBlueprint colors={FRAME_COLORS[0]} size={64} />
            </div>
          </div>
          <p className="t-sm text-sub">
            무엇으로 이뤄졌는지는 잘 보인다.
            <br />
            하지만 자원을 어떻게 계속 다시 짜는지는 설명하지 못한다.
          </p>
        </Panel>
        <Panel tone="d" className="p-[28px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <Film size={30} className="text-d" />
              <div className="t-h text-d">동적 관점 = 동영상</div>
            </div>
            <Tag tone="d">어떻게 how</Tag>
          </div>
          <div className="relative flex flex-1 items-center justify-center">
            <FilmStrip />
          </div>
          <p className="t-sm text-sub">
            BMI를 <b className="font-semibold text-ink">계속 반복되는 과정</b>으로 본다. 부품과 전체 구조를
            시간에 걸쳐 조금씩, 때로는 크게 고쳐 나간다.
          </p>
        </Panel>
      </div>

      <Build at={1} className="mt-[20px]">
        <div className="flex h-[200px] items-center gap-[40px] rounded-[18px] bg-night px-[40px] text-white">
          <div className="w-[270px] shrink-0">
            <div className="text-[18px] font-semibold text-white/65">동적 역량의 역할</div>
            <div className="text-[46px] font-extrabold leading-[1.2] tracking-[-0.03em]">
              둘을 잇는 다리
            </div>
          </div>
          <div className="flex flex-1 items-center gap-[20px]">
            <div className="flex-1 rounded-[14px] bg-white/10 p-[20px] text-center">
              <div className="text-[17px] font-medium text-white/70">무엇을 바꿀까</div>
              <div className="text-[25px] font-bold tracking-[-0.02em]">새 모델 찾기</div>
            </div>
            <ArrowRight size={42} color="#fff" />
            <div className="flex-1 rounded-[14px] bg-white/10 p-[20px] text-center">
              <div className="text-[17px] font-medium text-white/70">어떻게 바꿀까</div>
              <div className="text-[25px] font-bold tracking-[-0.02em]">변화에 맞춰 가는 과정</div>
            </div>
          </div>
          <p className="w-[345px] shrink-0 text-[20px] font-medium leading-[1.45] text-white/85">
            “원래 하던 대로”의 습관(<b className="font-bold text-white">경로 의존성</b>)에서 벗어나는 길도
            설명해 준다.
          </p>
        </div>
      </Build>
    </Slide>
  );
}

function FilmStrip() {
  const W = 740;
  return (
    <div className="relative" style={{ width: W }}>
      <div className="flex justify-between">
        {FRAME_COLORS.map((colors, i) => (
          <div
            key={i}
            className="rounded-[8px] bg-white p-[10px] ring-1 ring-d/30"
            style={{ width: 123 }}
          >
            <MiniBlueprint colors={colors} size={49} />
          </div>
        ))}
      </div>
      <div className="relative mt-[14px] h-[6px] rounded-full bg-d/20">
        <motion.div
          className="absolute -top-[6px] size-[18px] rounded-full bg-d ring-[3px] ring-white"
          animate={{ left: [0, W - 18] }}
          transition={{ duration: 7, ease: "linear", repeat: Infinity, repeatDelay: 0.5 }}
        />
      </div>
    </div>
  );
}

/* 9 */
const THEORIES = [
  ["상황 이론", "환경에 맞게 조직 구조를 맞춘다", "계속 반복해서 다시 짜는 과정"],
  ["자원 기반 관점 (RBV)", "회사가 가진 자원이 경쟁력이다", "자원을 움직이고 바꾸는 과정. 자원을 정지된 것으로 봄"],
  ["이해관계자 이론", "여러 이해관계자의 이익을 조율한다", "조직 능력을 설명하는 틀"],
  ["학습 이론", "지식을 얻는 과정", "더 높은 수준의 ‘능력’ 개념"],
];

export function S09Theories() {
  const step = useStep();
  return (
    <Slide
      kicker="연구 배경"
      title="왜 하필 동적 역량 렌즈인가"
      lead="다른 이론도 일부는 설명합니다. 다만 ‘계속 다시 짜는 과정’까지는 닿지 못합니다."
      source="논문 §1 (Burns & Stalker, 1994; Barney, 1991; Parmar et al., 2010; Argyris & Schön, 1997)"
    >
      <div className="mt-[16px] overflow-hidden rounded-[18px] bg-white ring-1 ring-line">
        <Table className="text-[24px]">
          <TableHeader>
            <TableRow className="border-line bg-surface-2 hover:bg-surface-2">
              <TableHead className="h-[56px] w-[320px] whitespace-normal pl-[28px] text-[19px] font-bold text-sub">
                이론
              </TableHead>
              <TableHead className="h-[56px] w-[500px] whitespace-normal text-[19px] font-bold text-sub">
                무엇을 잘 설명하나
              </TableHead>
              <TableHead className="h-[56px] whitespace-normal text-[19px] font-bold text-sub">
                무엇이 빠졌나
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {THEORIES.map(([name, good, miss]) => (
              <TableRow key={name} className="border-line hover:bg-transparent">
                <TableCell className="h-[92px] whitespace-normal pl-[28px] text-[27px] font-bold tracking-[-0.02em]">
                  {name}
                </TableCell>
                <TableCell className="h-[92px] whitespace-normal text-[24px]">{good}</TableCell>
                <TableCell className="h-[92px] whitespace-normal text-[24px] font-semibold text-a">
                  {miss}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <motion.div
        initial={false}
        animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 16, scale: step >= 1 ? 1 : 0.985 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="mt-[14px] flex h-[124px] items-center gap-[36px] rounded-[18px] bg-d px-[28px] text-white"
      >
        <div className="w-[292px] shrink-0 text-[34px] font-extrabold tracking-[-0.025em]">동적 역량</div>
        <p className="text-[27px] font-semibold leading-[1.38] tracking-[-0.02em]">
          과정·시스템·적응을 모두 다루고 미시적 기반까지 연결된다. BMI를 설명하기에 가장 알맞다.
        </p>
      </motion.div>
    </Slide>
  );
}

/* 10 */
const GAPS: [string, ReactNode][] = [
  [
    "BMI를 ‘결과물’로만 봤다",
    <>
      원인·종류·결과를 분류하는 데 그쳤다
      <br />
      (Bashir et al., 2020; Zhang et al., 2021 등)
    </>,
  ],
  ["한 분야만 봤다", "지속가능성이나 디지털화만 다루고 조직 능력은 놓쳤다"],
  [
    "이론적 뼈대가 없었다",
    <>
      과정으로 본 리뷰도 있었지만
      <br />
      동적 역량을 어떻게 키우고 쓰는지 일관되게 설명하지 못했다
    </>,
  ],
];

const QUESTIONS = [
  {
    q: (
      <>
        동적 역량과 그 미시적 기반은
        <br />
        BMI 과정을 어떻게 가능하게 하나?
      </>
    ),
    tag: "ADO로 답함",
    tone: "d" as const,
  },
  {
    q: (
      <>
        기존 연구는 어떤 이론·상황·방법으로
        <br />
        이 주제를 연구했나?
      </>
    ),
    tag: "TCM으로 답함",
    tone: "t" as const,
  },
  { q: "앞으로 무엇을 더 연구해야 하나?", tag: "둘을 합쳐 제시", tone: "o" as const },
];

export function S10Gaps() {
  return (
    <Slide kicker="연구 배경" title="기존 리뷰들의 3가지 빈틈" source="논문 표 1 · §1">
      <div className="grid h-full grid-cols-[1fr_84px_1fr]">
        <div className="flex flex-col gap-[14px]">
          {/* An empty heading line keeps the gap cards level with the question cards, whose column has a heading. */}
          <div aria-hidden className="t-h">
            &nbsp;
          </div>
          {GAPS.map(([h, d]) => (
            <Panel key={h} className="flex-1 justify-center gap-[6px] p-[24px]">
              <div className="text-[30px] font-extrabold tracking-[-0.026em]">{h}</div>
              <p className="t-body text-sub">{d}</p>
            </Panel>
          ))}
        </div>
        <Build at={1} x={-12} y={0} className="flex items-center justify-center pt-[44px]">
          <ArrowRight size={54} color={C.ink} />
        </Build>
        <div className="flex flex-col gap-[14px]">
          <Build at={1} y={0}>
            <div className="t-h text-sub">이 논문의 연구 질문</div>
          </Build>
          {QUESTIONS.map((c, i) => (
            <Build key={c.tag} at={1} x={16} y={0} className="flex flex-1 flex-col">
              <div className="flex flex-1 items-center gap-[20px] rounded-[18px] bg-night px-[24px] text-white">
                <span className="num text-[52px] font-extrabold text-white/50">{i + 1}</span>
                <div>
                  <p className="text-[28px] font-semibold leading-[1.36] tracking-[-0.022em]">{c.q}</p>
                  <Tag tone={c.tone} className="mt-[8px]">
                    {c.tag}
                  </Tag>
                </div>
              </div>
            </Build>
          ))}
        </div>
      </div>
    </Slide>
  );
}
