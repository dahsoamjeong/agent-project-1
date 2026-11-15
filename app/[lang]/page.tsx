import { Suspense } from "react";
import Backdrop from "../components/Backdrop";
import Doors from "../components/Doors";
import Journey from "../components/Journey";
import LanguageSwitch from "../components/LanguageSwitch";
import { pickForDay, today } from "@/content/day";
import { getDictionary, getLocale } from "@/content/i18n";
import { placeForToday } from "@/content/places";
import {
  BREATH_SECONDS,
  RETURN_SECONDS,
  SENTENCE_MAX,
  STRETCH_SECONDS,
  TEMP_BESIDE_YOU,
  breathLines,
  giftSentences,
  questions,
  smallActions,
  stretches,
} from "@/content/rest";

// 임시 숫자. 5단계에서 실제로 함께 있는 사람 수로 바뀐다.
const TEMP_RESTING_NOW = 7;

// 서버에서 오늘의 내용을 골라, 화면을 움직이는 Journey에게 글자만 건네준다.
async function TodayRest() {
  const [locale, dict, place, { dayNumber, dateKey }] = await Promise.all([
    getLocale(),
    getDictionary(),
    placeForToday(),
    today(),
  ]);

  return (
    <Journey
      backdrop={<Backdrop place={place} lights={TEMP_RESTING_NOW} />}
      languageSwitch={<LanguageSwitch path="" />}
      doors={<Doors current="" />}
      dateKey={dateKey}
      seconds={{ stretch: STRETCH_SECONDS, breath: BREATH_SECONDS, back: RETURN_SECONDS }}
      sentenceMax={SENTENCE_MAX}
      tempBesideYou={TEMP_BESIDE_YOU}
      content={{
        country: place.country[locale],
        placeName: place.name[locale],
        placeLine: place.line[locale],
        restingNow: dict.restingNow(TEMP_RESTING_NOW),
        stretches: stretches.map((s) => s[locale]),
        breathLine: pickForDay(breathLines, dayNumber)[locale],
        question: pickForDay(questions, dayNumber)[locale],
        gift: pickForDay(giftSentences, dayNumber)[locale],
        action: pickForDay(smallActions, dayNumber)[locale],
      }}
      text={{
        todaysHarbor: dict.todaysHarbor,
        enter: dict.enter,
        soundOn: dict.soundOn,
        soundOff: dict.soundOff,
        skip: dict.skip,
        next: dict.next,
        bodyTitle: dict.bodyTitle,
        breathTitle: dict.breathTitle,
        sentencePlaceholder: dict.sentencePlaceholder,
        leaveSentence: dict.leaveSentence,
        justListen: dict.justListen,
        giftIntro: dict.giftIntro,
        together: dict.together,
        togetherDone: dict.togetherDone,
        yourSentence: dict.yourSentence,
        besideYou: dict.besideYou,
        farewell: dict.farewell,
      }}
    />
  );
}

export default function Page() {
  return (
    <Suspense>
      <TodayRest />
    </Suspense>
  );
}
