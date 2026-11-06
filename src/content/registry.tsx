import type { ComponentType } from "react";
import { S14BigPicture, S15Tiers } from "@/components/slides/big";
import { S16Antecedents, S17Dynamism } from "@/components/slides/antecedents";
import {
  S35Agenda,
  S36Contribution,
  S37Checklist,
  S38Limits,
  S39Conclusion,
  S40Discussion,
  S41Thanks,
} from "@/components/slides/closing";
import { S42Quiz, S43Glossary1, S44Glossary2 } from "@/components/slides/appendix";
import {
  S18DecisionOverview,
  S19Sensing,
  S20Antenna,
  S21Redesign,
  S22Experiment,
  S23Reconfig,
  S24Realloc,
} from "@/components/slides/decisions1";
import { S25Loops, S26Direction, S27DMC, S28SMC } from "@/components/slides/decisions2";
import { S01Title, S03Answer } from "@/components/slides/intro";
import { S11Funnel, S12Frames, S13Reliability } from "@/components/slides/method";
import { S29Matrix, S30Flow, S31Emerging } from "@/components/slides/outcomes";
import { S32Theory, S33Context, S34Methods } from "@/components/slides/tcm";
import { S08PhotoVideo, S09Theories, S10Gaps } from "@/components/slides/why";
import { C } from "@/lib/design";

export type SlideMeta = {
  id: string;
  section: string;
  title: string;
  /** number of reveal states, including the first; arrow keys walk through them */
  steps: number;
  dark?: boolean;
  /** letterbox color when the slide's background is neither the paper nor the dark default */
  bg?: string;
  appendix?: boolean;
  Comp: ComponentType;
};

export const SLIDES: SlideMeta[] = [
  /* ---------- 도입 ---------- */
  {
    id: "title",
    section: "intro",
    title: "표지",
    steps: 1,
    bg: C.cover,
    Comp: S01Title,
  },
  {
    id: "answer",
    section: "intro",
    title: "결론부터",
    steps: 4,
    Comp: S03Answer,
  },

  /* ---------- 배경 ---------- */
  {
    id: "photo-video",
    section: "why",
    title: "사진과 동영상",
    steps: 2,
    Comp: S08PhotoVideo,
  },
  {
    id: "theories",
    section: "why",
    title: "왜 동적 역량 렌즈인가",
    steps: 2,
    Comp: S09Theories,
  },
  {
    id: "gaps",
    section: "why",
    title: "기존 리뷰의 빈틈과 연구 질문",
    steps: 2,
    Comp: S10Gaps,
  },

  /* ---------- 방법 ---------- */
  {
    id: "funnel",
    section: "method",
    title: "579편 → 57편 (PRISMA)",
    steps: 4,
    Comp: S11Funnel,
  },
  {
    id: "frames",
    section: "method",
    title: "ADO와 TCM",
    steps: 2,
    Comp: S12Frames,
  },
  {
    id: "reliability",
    section: "method",
    title: "신뢰도: 87%, 90%",
    steps: 3,
    Comp: S13Reliability,
  },

  /* ---------- 큰 그림 ---------- */
  {
    id: "big-picture",
    section: "big",
    title: "한 장으로 보는 큰 그림",
    steps: 6,
    Comp: S14BigPicture,
  },
  {
    id: "tiers",
    section: "big",
    title: "세 층의 미시적 기반",
    steps: 3,
    Comp: S15Tiers,
  },

  /* ---------- A ---------- */
  {
    id: "antecedents",
    section: "a",
    title: "선행요인 8개",
    steps: 2,
    Comp: S16Antecedents,
  },
  {
    id: "dynamism",
    section: "a",
    title: "환경 역동성",
    steps: 3,
    Comp: S17Dynamism,
  },

  /* ---------- D ---------- */
  {
    id: "d-overview",
    section: "d",
    title: "결정: 4개 과정과 2개 기둥",
    steps: 1,
    Comp: S18DecisionOverview,
  },
  {
    id: "sensing",
    section: "d",
    title: "과정 1. 전략적 감지",
    steps: 3,
    Comp: S19Sensing,
  },
  {
    id: "antenna",
    section: "d",
    title: "인지적 감지",
    steps: 4,
    Comp: S20Antenna,
  },
  {
    id: "redesign",
    section: "d",
    title: "과정 2. BM (재)설계",
    steps: 2,
    Comp: S21Redesign,
  },
  {
    id: "experiment",
    section: "d",
    title: "BM 실험과 MVP",
    steps: 4,
    Comp: S22Experiment,
  },
  {
    id: "reconfig",
    section: "d",
    title: "과정 3. 재구성·자원 정렬",
    steps: 3,
    Comp: S23Reconfig,
  },
  {
    id: "realloc",
    section: "d",
    title: "가게의 자원 재배치",
    steps: 5,
    Comp: S24Realloc,
  },
  {
    id: "loops",
    section: "d",
    title: "과정 4. 단일 루프와 이중 루프",
    steps: 3,
    Comp: S25Loops,
  },
  {
    id: "direction",
    section: "d",
    title: "탐색과 활용, 실행 전과 하면서",
    steps: 3,
    Comp: S26Direction,
  },
  {
    id: "dmc",
    section: "d",
    title: "기둥 A. 동적 관리 역량",
    steps: 3,
    Comp: S27DMC,
  },
  {
    id: "smc",
    section: "d",
    title: "기둥 B. 이해관계자 관리 역량",
    steps: 2,
    Comp: S28SMC,
  },

  /* ---------- O ---------- */
  {
    id: "matrix",
    section: "o",
    title: "BMI 네 칸 표",
    steps: 4,
    Comp: S29Matrix,
  },
  {
    id: "flow",
    section: "o",
    title: "학습 → BMI → 성과",
    steps: 3,
    Comp: S30Flow,
  },
  {
    id: "emerging",
    section: "o",
    title: "요즘 뜨는 BMI와 성과",
    steps: 2,
    Comp: S31Emerging,
  },

  /* ---------- TCM ---------- */
  {
    id: "theory",
    section: "tcm",
    title: "T: 이론 쏠림",
    steps: 1,
    Comp: S32Theory,
  },
  {
    id: "context",
    section: "tcm",
    title: "C: 지역 쏠림",
    steps: 2,
    Comp: S33Context,
  },
  {
    id: "methods",
    section: "tcm",
    title: "M: 방법 쏠림",
    steps: 3,
    Comp: S34Methods,
  },

  /* ---------- 결론 ---------- */
  {
    id: "agenda",
    section: "end",
    title: "앞으로의 연구 과제",
    steps: 1,
    Comp: S35Agenda,
  },
  {
    id: "contribution",
    section: "end",
    title: "학문적 기여",
    steps: 4,
    Comp: S36Contribution,
  },
  {
    id: "checklist",
    section: "end",
    title: "경영자 체크리스트",
    steps: 1,
    Comp: S37Checklist,
  },
  {
    id: "limits",
    section: "end",
    title: "한계와 비판적 읽기",
    steps: 2,
    Comp: S38Limits,
  },
  {
    id: "conclusion",
    section: "end",
    title: "결론",
    steps: 3,
    dark: true,
    Comp: S39Conclusion,
  },
  {
    id: "discussion",
    section: "end",
    title: "토론 질문",
    steps: 3,
    Comp: S40Discussion,
  },
  {
    id: "thanks",
    section: "end",
    title: "감사 인사",
    steps: 1,
    dark: true,
    Comp: S41Thanks,
  },

  /* ---------- 부록 (시간 계획에서 제외) ---------- */
  {
    id: "quiz",
    section: "end",
    appendix: true,
    title: "부록: 확인 퀴즈",
    steps: 1,
    Comp: S42Quiz,
  },
  {
    id: "glossary-1",
    section: "end",
    appendix: true,
    title: "부록: 용어 사전 1",
    steps: 1,
    Comp: S43Glossary1,
  },
  {
    id: "glossary-2",
    section: "end",
    appendix: true,
    title: "부록: 용어 사전 2",
    steps: 1,
    Comp: S44Glossary2,
  },
];
