import { Suspense } from "react";
import Backdrop from "../components/Backdrop";
import Doors from "../components/Doors";
import LanguageSwitch from "../components/LanguageSwitch";
import { getDictionary, getLocale } from "@/content/i18n";
import { placeForToday } from "@/content/places";

// 임시 숫자. 5단계에서 실제로 함께 있는 사람 수로 바뀐다.
const TEMP_RESTING_NOW = 7;

async function TodayRest() {
  const [locale, dict, place] = await Promise.all([getLocale(), getDictionary(), placeForToday()]);

  return (
    <main className="screen">
      <Backdrop place={place} lights={TEMP_RESTING_NOW} />
      <LanguageSwitch path="" />
      <p className="eyebrow rise">{dict.todaysHarbor}</p>
      <div className="center rise">
        <p className="sub">{place.country[locale]}</p>
        <h1 className="title">{place.name[locale]}</h1>
        <p className="sub">{place.line[locale]}</p>
        <p className="presence">{dict.restingNow(TEMP_RESTING_NOW)}</p>
        {/* 2단계에서 방 1의 여섯 장면으로 이어진다. 지금은 눌러도 아무 일도 일어나지 않는다. */}
        <button type="button" className="enter">
          {dict.enter}
        </button>
      </div>
      <Doors current="" />
    </main>
  );
}

export default function Page() {
  return (
    <Suspense>
      <TodayRest />
    </Suspense>
  );
}
