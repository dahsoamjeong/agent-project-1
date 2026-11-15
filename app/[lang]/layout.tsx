import type { Metadata, Viewport } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "../globals.css";
import { getDictionary, getLocale, locales } from "@/content/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.siteTitle, description: dict.siteDescription };
}

export const viewport: Viewport = {
  themeColor: "#14263d",
};

// 미리 만들어둘 언어별 주소: /ko, /en
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  return (
    <html lang={await getLocale()}>
      <body>{children}</body>
    </html>
  );
}
