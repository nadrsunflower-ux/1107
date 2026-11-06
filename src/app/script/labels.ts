import { SLIDES } from "@/content/registry";

const MAIN = SLIDES.filter((s) => !s.appendix).length;

export const TOTAL_SLIDES_LABEL = `메인 ${MAIN}장 + 부록 ${SLIDES.length - MAIN}장`;
