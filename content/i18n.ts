import { lang } from "next/root-params";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "./locales";

export { locales, type Locale } from "./locales";

/** 두 언어로 적어두는 글. */
export type Text = Record<Locale, string>;

// 화면에 보이는 고정 문구 모음. 왼쪽 이름은 그대로 두고 오른쪽 글만 고치면 된다.
const dictionaries = {
  ko: {
    siteTitle: "오늘의 쉼",
    siteDescription: "하루 5분, 잘 쉬고 다시 일상으로 돌아가는 온라인 항구",
    todaysHarbor: "오늘의 항구",
    restingNow: (count: number) => `지금 ${count}명이 함께 쉬고 있어요`,
    enter: "쉬러 들어가기",
    roomInPreparation: "준비 중인 방",
    preparingSlowly: "천천히 준비하고 있어요.",
    otherRooms: "다른 방으로 가기",
    soundOn: "소리 켜기",
    soundOff: "소리 끄기",
    skip: "건너뛰기",
    next: "다음",
    bodyTitle: "몸 열기",
    breathTitle: "숨 고르기",
    sentencePlaceholder: "한 문장이면 충분해요",
    leaveSentence: "남기기",
    justListen: "오늘은 그냥 지나갈게요",
    giftIntro: "어제 누군가 남긴 문장이에요",
    together: "함께해요",
    togetherDone: "함께했어요",
    yourSentence: "오늘 당신이 남긴 문장",
    besideYou: "{count}명이 당신 곁에 있었어요",
    farewell: "오늘도 충분히 잘하고 있어요. 다녀오세요.",
    switchTo: "English",
    switchLabel: "Switch to English",
  },
  en: {
    siteTitle: "Today's Rest",
    siteDescription: "Five minutes a day to rest well and return to your life — an online harbor",
    todaysHarbor: "Today's harbor",
    restingNow: (count: number) => (count === 1 ? "1 person is resting here with you" : `${count} people are resting here with you`),
    enter: "Come in and rest",
    roomInPreparation: "A room in preparation",
    preparingSlowly: "We are getting it ready, slowly.",
    otherRooms: "Go to another room",
    soundOn: "Sound on",
    soundOff: "Sound off",
    skip: "Skip",
    next: "Next",
    bodyTitle: "Open your body",
    breathTitle: "Settle your breath",
    sentencePlaceholder: "One sentence is enough",
    leaveSentence: "Leave it here",
    justListen: "I will pass for today",
    giftIntro: "Someone left this sentence yesterday",
    together: "I am with you",
    togetherDone: "With you",
    yourSentence: "The sentence you left today",
    besideYou: "{count} people were beside you",
    farewell: "You are doing well enough today. Off you go.",
    switchTo: "한국어",
    switchLabel: "한국어로 보기",
  },
} satisfies Record<Locale, unknown>;

export type Dictionary = (typeof dictionaries)[Locale];

/** 지금 보고 있는 주소(/ko 또는 /en)에서 언어를 읽는다. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!isLocale(value)) notFound();
  return value;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()];
}
