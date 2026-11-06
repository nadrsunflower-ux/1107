"use client";

import * as React from "react";
import { STAGE } from "@/lib/design";

/** Fixed 16:9 stage: slides are authored at 1600x900 and scaled to fit, letterboxed. */
export function Stage({
  children,
  background,
  onClick,
}: {
  children: React.ReactNode;
  background: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const hostRef = React.useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = React.useState<number | null>(null);

  React.useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const measure = () => {
      const { width, height } = host.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      setScale(Math.min(width / STAGE.w, height / STAGE.h));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    document.addEventListener("fullscreenchange", measure);
    return () => {
      ro.disconnect();
      document.removeEventListener("fullscreenchange", measure);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      onClick={onClick}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background, transition: "background 180ms ease" }}
    >
      <div
        className="stage relative shrink-0"
        data-stage
        style={{
          transform: `scale(${scale ?? 1})`,
          opacity: scale === null ? 0 : 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}
