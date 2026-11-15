import { Suspense } from "react";
import Backdrop from "./Backdrop";
import Doors from "./Doors";
import { placeForToday } from "@/content/places";
import { roomByPath } from "@/content/rooms";

async function QuietRoomScreen({ path }: { path: string }) {
  const room = roomByPath(path);
  const place = await placeForToday();
  return (
    <main className="screen">
      <Backdrop place={place} />
      <p className="eyebrow rise">준비 중인 방</p>
      <div className="center rise">
        <h1 className="title">{room.name}</h1>
        <p className="sub">{room.summary}</p>
        <p className="presence">천천히 준비하고 있어요.</p>
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
