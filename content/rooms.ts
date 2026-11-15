import type { Text } from "./i18n";

// 이 사이트의 네 개의 방. 새 방을 붙일 때는 여기에 한 묶음을 더하고 app/[lang]/ 아래에 폴더를 만든다.
// path는 언어 표시(/ko, /en) 뒤에 붙는 주소다. 방 1은 빈 문자열이다.

export type Room = {
  path: string;
  name: Text;
  summary: Text;
};

export const rooms: Room[] = [
  {
    path: "",
    name: { ko: "오늘의 쉼", en: "Today's Rest" },
    summary: { ko: "하루 5분, 몸을 열고 마음을 나누는 곳", en: "Five minutes to open your body and share your heart" },
  },
  {
    path: "/next-harbor",
    name: { ko: "다음 항구", en: "Next Harbor" },
    summary: { ko: "앞으로 열릴 클래스와 리트릿", en: "Upcoming classes and retreats" },
  },
  {
    path: "/open-harbor",
    name: { ko: "항구 열기", en: "Open a Harbor" },
    summary: { ko: "우리 동네에서 이런 자리를 열고 싶은 분께", en: "For those who want to open a place like this where they live" },
  },
  {
    path: "/stage",
    name: { ko: "무대", en: "The Stage" },
    summary: { ko: "나의 이야기가 쌓이고, 들려지는 곳", en: "Where your story gathers and is heard" },
  },
];

export function roomByPath(path: string): Room {
  const room = rooms.find((r) => r.path === path);
  if (!room) throw new Error(`등록되지 않은 방: ${path}`);
  return room;
}
