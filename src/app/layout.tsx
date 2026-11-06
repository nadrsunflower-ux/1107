import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

/* Pretendard is bundled so the deck renders identically offline in a lecture room. */
const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["Apple SD Gothic Neo", "system-ui", "-apple-system", "Malgun Gothic", "sans-serif"],
});

export const metadata: Metadata = {
  title: "회사는 ‘돈 버는 방식’을 어떻게 계속 바꿔 나갈까? | BMI × 동적 역량",
  description:
    "Cruz-Sánchez et al. (2026) 비즈니스 모델 혁신과 동적 역량 체계적 문헌 고찰 발표 슬라이드.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbfaf6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="h-full">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
