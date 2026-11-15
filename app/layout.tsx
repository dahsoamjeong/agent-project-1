import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오늘의 쉼",
  description: "하루 5분, 잘 쉬고 다시 일상으로 돌아가는 온라인 항구",
};

export const viewport: Viewport = {
  themeColor: "#14263d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
