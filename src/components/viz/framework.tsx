"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { C, EASE } from "@/lib/design";

export type DecisionKey = "sense" | "design" | "align" | "learn" | "dmc" | "smc";

/* ---------------------------------------------------------------- mini map
   A tiny copy of the paper's big picture, kept in the corner of every A/D/O slide
   so the audience always knows where in the framework we are. */

export function MiniMap({ active }: { active: "a" | "o" | DecisionKey }) {
  const dOn = (k: DecisionKey) => active === k;
  const nodeFill = (k: DecisionKey) => (dOn(k) ? C.d : "#d3d0c5");
  const dGroup = active !== "a" && active !== "o";
  return (
    <svg
      width="200"
      height="88"
      viewBox="0 0 200 88"
      role="img"
      aria-label="전체 틀에서 지금 위치"
    >
      <rect x="0" y="16" width="30" height="58" rx="7" fill={active === "a" ? C.a : "#d3d0c5"} />
      <text x="15" y="50" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">
        A
      </text>
      <path d="M36 45H46" stroke={C.gray} strokeWidth="2" strokeLinecap="round" />
      <rect
        x="50"
        y="2"
        width="100"
        height="84"
        rx="10"
        fill={dGroup ? C.dSoft : "none"}
        stroke={dGroup ? C.d : "#d3d0c5"}
        strokeWidth="1.5"
      />
      <circle cx="100" cy="17" r={dOn("sense") ? 9 : 7} fill={nodeFill("sense")} />
      <circle cx="72" cy="50" r={dOn("align") ? 9 : 7} fill={nodeFill("align")} />
      <circle cx="128" cy="50" r={dOn("design") ? 9 : 7} fill={nodeFill("design")} />
      <circle cx="100" cy="38" r={dOn("learn") ? 8 : 6} fill={nodeFill("learn")} />
      <rect x="62" y="68" width="34" height="10" rx="3" fill={nodeFill("dmc")} />
      <rect x="104" y="68" width="34" height="10" rx="3" fill={nodeFill("smc")} />
      <path d="M154 45H164" stroke={C.gray} strokeWidth="2" strokeLinecap="round" />
      <rect x="170" y="16" width="30" height="58" rx="7" fill={active === "o" ? C.o : "#d3d0c5"} />
      <text x="185" y="50" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">
        O
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------ decision loop
   Authored at 700x380. Positions mirror Fig. 2: sensing on top, reconfiguration
   bottom-left, (re)design bottom-right, learning as the dashed centre. */

const LOOP_W = 700;
const LOOP_H = 380;

const ARROWS = [
  "M204 44 C118 44 90 120 90 282", // sensing <-> reconfiguration
  "M496 44 C582 44 610 120 610 282", // sensing <-> redesign
  "M286 334 L414 334", // reconfiguration <-> redesign
];

/* clockwise: sensing -> redesign -> reconfiguration -> sensing */
const ORBIT = "M496 44 C582 44 610 120 610 282 L610 334 L90 334 L90 282 C90 120 118 44 204 44 Z";

type NodeProps = {
  title: string;
  sub: string;
  style: React.CSSProperties;
  on: boolean;
  hot?: boolean;
  dim?: boolean;
  dark?: boolean;
};

function Node({ title, sub, style, on, hot, dim, dark }: NodeProps) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: on ? (dim ? 0.38 : 1) : 0, scale: on ? 1 : 0.94 }}
      transition={{ duration: 0.34, ease: EASE }}
      className="absolute flex flex-col items-center justify-center rounded-[14px] text-center"
      style={{
        ...style,
        background: hot ? C.d : dark ? "rgba(255,255,255,.08)" : C.surface,
        color: hot || dark ? "#fff" : C.ink,
        boxShadow: `inset 0 0 0 ${hot ? 0 : 1.5}px ${dark ? "rgba(255,255,255,.4)" : C.d}`,
      }}
    >
      <div className="text-[24px] font-bold leading-[1.25] tracking-[-0.02em]">{title}</div>
      <div
        className="text-[17px] font-medium leading-[1.35]"
        style={{ color: hot ? "rgba(255,255,255,.85)" : dark ? "rgba(255,255,255,.72)" : C.sub }}
      >
        {sub}
      </div>
    </motion.div>
  );
}

export function DecisionLoop({
  nodes = true,
  engine = true,
  flow = true,
  active,
  labels,
  scale = 1,
  dark,
}: {
  nodes?: boolean;
  engine?: boolean;
  flow?: boolean;
  active?: DecisionKey;
  labels?: Partial<Record<"sense" | "design" | "align" | "learn", { title?: string; sub?: string }>>;
  scale?: number;
  dark?: boolean;
}) {
  const reduced = useReducedMotion();
  const stroke = dark ? "rgba(255,255,255,.55)" : C.d;
  const markerId = dark ? "loop-arrow-dark" : "loop-arrow";
  const dimOf = (k: DecisionKey) => Boolean(active && active !== k);
  return (
    <div style={{ width: LOOP_W * scale, height: LOOP_H * scale }}>
      <div
        className="relative origin-top-left"
        style={{ width: LOOP_W, height: LOOP_H, transform: `scale(${scale})` }}
      >
        <motion.svg
          initial={false}
          animate={{ opacity: nodes ? 1 : 0 }}
          transition={{ duration: 0.34 }}
          width={LOOP_W}
          height={LOOP_H}
          viewBox={`0 0 ${LOOP_W} ${LOOP_H}`}
          className="absolute inset-0"
          aria-hidden
        >
          <defs>
            <marker
              id={markerId}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill={stroke} />
            </marker>
          </defs>
          {ARROWS.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke={stroke}
              strokeWidth="2.5"
              markerStart={`url(#${markerId})`}
              markerEnd={`url(#${markerId})`}
            />
          ))}
          {flow && nodes && !reduced && (
            <circle r="8" fill={dark ? "#fff" : C.d} stroke={dark ? C.night : C.surface} strokeWidth="2">
              <animateMotion dur="5.5s" repeatCount="indefinite" path={ORBIT} />
            </circle>
          )}
        </motion.svg>

        <Node
          on={nodes}
          dark={dark}
          hot={active === "sense"}
          dim={dimOf("sense")}
          title={labels?.sense?.title ?? "전략적 감지"}
          sub={labels?.sense?.sub ?? "변화 알아채기 · Sensing"}
          style={{ left: 210, top: 0, width: 280, height: 92 }}
        />
        <Node
          on={nodes}
          dark={dark}
          hot={active === "align"}
          dim={dimOf("align")}
          title={labels?.align?.title ?? "재구성·자원 정렬"}
          sub={labels?.align?.sub ?? "회사 안 바꾸기 · Transforming"}
          style={{ left: 0, top: 288, width: 280, height: 92 }}
        />
        <Node
          on={nodes}
          dark={dark}
          hot={active === "design"}
          dim={dimOf("design")}
          title={labels?.design?.title ?? "BM (재)설계"}
          sub={labels?.design?.sub ?? "설계도 고치기 · Seizing"}
          style={{ left: 420, top: 288, width: 280, height: 92 }}
        />

        {/* learning engine */}
        <motion.div
          initial={false}
          animate={{ opacity: engine ? (dimOf("learn") ? 0.38 : 1) : 0, scale: engine ? 1 : 0.8 }}
          transition={{ duration: 0.36, ease: EASE }}
          className="absolute flex flex-col items-center justify-center text-center"
          style={{
            left: 262,
            top: 104,
            width: 176,
            height: 176,
            color: dark ? "#fff" : active === "learn" ? C.d : C.ink,
          }}
        >
          <motion.svg
            className="absolute inset-0"
            width="176"
            height="176"
            viewBox="0 0 176 176"
            aria-hidden
            animate={flow && engine && !reduced ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
          >
            <circle
              cx="88"
              cy="88"
              r="85"
              fill={dark ? C.night : active === "learn" ? C.dSoft : C.surface}
              stroke={stroke}
              strokeWidth="2.5"
              strokeDasharray="7 7"
            />
          </motion.svg>
          <div className="relative text-[22px] font-bold leading-[1.25] tracking-[-0.02em]">
            {labels?.learn?.title ?? (
              <>
                조직 학습
                <br />
                지향
              </>
            )}
          </div>
          <div
            className="relative text-[16px] font-medium leading-[1.3]"
            style={{ color: dark ? "rgba(255,255,255,.72)" : C.sub }}
          >
            {labels?.learn?.sub ?? "가운데 엔진"}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
