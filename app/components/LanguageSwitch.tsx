import Link from "next/link";
import { getDictionary, getLocale } from "@/content/i18n";

// 화면 오른쪽 위의 작은 언어 바꾸기. 같은 방의 다른 언어 화면으로 간다.
export default async function LanguageSwitch({ path }: { path: string }) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const other = locale === "ko" ? "en" : "ko";
  return (
    <Link className="language" href={`/${other}${path}`} lang={other} aria-label={dict.switchLabel}>
      {dict.switchTo}
    </Link>
  );
}
