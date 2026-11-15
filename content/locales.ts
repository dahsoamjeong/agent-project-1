// 이 사이트가 지원하는 언어. 언어를 더하려면 여기와 i18n.ts의 dictionaries에 한 묶음씩 추가한다.
export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);
