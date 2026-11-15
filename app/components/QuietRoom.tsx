import { Suspense } from "react";
import Backdrop from "./Backdrop";
import Doors from "./Doors";
import LanguageSwitch from "./LanguageSwitch";
import { getDictionary, getLocale } from "@/content/i18n";
import { placeForToday } from "@/content/places";
import { roomByPath } from "@/content/rooms";

async function QuietRoomScreen({ path }: { path: string }) {
  const room = roomByPath(path);
  const [locale, dict, place] = await Promise.all([getLocale(), getDictionary(), placeForToday()]);
  return (
    <main className="screen">
      <Backdrop place={place} />
      <LanguageSwitch path={path} />
      <p className="eyebrow rise">{dict.roomInPreparation}</p>
      <div className="center rise">
        <h1 className="title">{room.name[locale]}</h1>
        <p className="sub">{room.summary[locale]}</p>
        <p className="presence">{dict.preparingSlowly}</p>
      </div>
      <Doors current={path} />
    </main>
  );
}

// 아직 열리지 않은 방의 공통 화면. 방을 실제로 만들 때 각 page.tsx에서 이 컴포넌트를 걷어내면 된다.
export default function QuietRoom({ path }: { path: string }) {
  return (
    <Suspense>
      <QuietRoomScreen path={path} />
    </Suspense>
  );
}
