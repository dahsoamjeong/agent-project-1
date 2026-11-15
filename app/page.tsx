import { Suspense } from "react";
import Backdrop from "./components/Backdrop";
import Doors from "./components/Doors";
import { placeForToday } from "@/content/places";

// 임시 숫자. 5단계에서 실제로 함께 있는 사람 수로 바뀐다.
const TEMP_RESTING_NOW = 7;

async function TodayRest() {
  const place = await placeForToday();

  return (
    <main className="screen">
      <Backdrop place={place} lights={TEMP_RESTING_NOW} />
      <p className="eyebrow rise">오늘의 항구</p>
      <div className="center rise">
        <p className="sub">{place.country}</p>
        <h1 className="title">{place.name}</h1>
        <p className="sub">{place.line}</p>
        <p className="presence">지금 {TEMP_RESTING_NOW}명이 함께 쉬고 있어요</p>
        {/* 2단계에서 방 1의 여섯 장면으로 이어진다. 지금은 눌러도 아무 일도 일어나지 않는다. */}
        <button type="button" className="enter">
          쉬러 들어가기
        </button>
      </div>
      <Doors current="/" />
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
