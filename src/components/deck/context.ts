"use client";

import * as React from "react";

export const StepContext = React.createContext(0);
export const useStep = () => React.useContext(StepContext);

export type SlidePosition = { index: number; total: number; section: string };
export const PositionContext = React.createContext<SlidePosition>({
  index: 0,
  total: 1,
  section: "intro",
});
export const usePosition = () => React.useContext(PositionContext);
