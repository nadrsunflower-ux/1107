import type { Metadata } from "next";
import { ScriptEntry } from "./script-entry";

export const metadata: Metadata = {
  title: "발표 대본 | 회사는 ‘돈 버는 방식’을 어떻게 계속 바꿔 나갈까?",
  description: "슬라이드 단계에 맞춘 발표 대본. 브라우저에서 바로 고치면 자동으로 저장됩니다.",
};

export default function ScriptPage() {
  return <ScriptEntry />;
}
