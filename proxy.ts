import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/content/locales";

// 주소에 언어(/ko, /en)가 없이 들어오면, 방문자의 브라우저 언어를 보고 알맞은 쪽으로 안내한다.
// 한국어를 쓰는 브라우저는 /ko로, 그 밖의 언어는 /en으로 보낸다.

function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;
  const first = header.split(",")[0].trim().toLowerCase();
  return first.startsWith("ko") ? "ko" : "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (hasLocale) return;

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // 사이트 내부 파일(_next)과 사진·아이콘 같은 파일(이름에 점이 있는 주소)은 건너뛴다.
  matcher: ["/((?!_next|.*\\..*).*)"],
};
