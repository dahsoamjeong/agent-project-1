// 이 사이트의 네 개의 방. 새 방을 붙일 때는 여기에 한 줄을 더하고 app/ 아래에 폴더를 만든다.

export type Room = {
  path: string;
  name: string;
  summary: string;
  open: boolean;
};

export const rooms: Room[] = [
  { path: "/", name: "오늘의 쉼", summary: "하루 5분, 몸을 열고 마음을 나누는 곳", open: true },
  { path: "/next-harbor", name: "다음 항구", summary: "앞으로 열릴 클래스와 리트릿", open: false },
  { path: "/open-harbor", name: "항구 열기", summary: "우리 동네에서 이런 자리를 열고 싶은 분께", open: false },
  { path: "/stage", name: "무대", summary: "나의 이야기가 쌓이고, 들려지는 곳", open: false },
];

export function roomByPath(path: string): Room {
  const room = rooms.find((r) => r.path === path);
  if (!room) throw new Error(`등록되지 않은 방: ${path}`);
  return room;
}
