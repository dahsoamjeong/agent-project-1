// 오늘의 항구: 사람들이 가보고 싶었던 세계의 좋은 곳들.
// 지금은 임시 목록이며, 3단계에서 소밍이 코드 없이 고칠 수 있는 관리 화면(저장소)으로 옮긴다.
// colors는 실제 영상/사진이 준비되기 전까지 쓰는 임시 배경 색(하늘 → 수평선 → 물)이다.

import { connection } from "next/server";

export type Place = {
  name: string;
  country: string;
  line: string;
  colors: [string, string, string];
};

export const places: Place[] = [
  { name: "바아 환초", country: "몰디브", line: "얕고 맑은 바다 위", colors: ["#1b3a5c", "#5fa8b8", "#0f5c6e"] },
  { name: "테카포 호수", country: "뉴질랜드", line: "별이 내려앉는 호숫가", colors: ["#1a2247", "#6d7fb8", "#27407a"] },
  { name: "이아 마을", country: "그리스 산토리니", line: "절벽 끝에서 보는 에게해", colors: ["#2b3a67", "#e0a68a", "#2c5d8a"] },
  { name: "우붓의 숲", country: "인도네시아 발리", line: "이른 아침 안개 낀 계단식 논", colors: ["#1f3b33", "#9fc2a0", "#2e5d4a"] },
  { name: "브리엔츠 호수", country: "스위스", line: "산 그림자가 비치는 에메랄드빛 물", colors: ["#20404f", "#8fc7c0", "#1d6b6b"] },
  { name: "하날레이 만", country: "하와이 카우아이", line: "산과 바다가 만나는 고요한 만", colors: ["#243a5e", "#f0b98f", "#1f6a7a"] },
  { name: "레이니스피아라", country: "아이슬란드", line: "검은 모래 위로 밀려오는 파도", colors: ["#1c2430", "#7d8ea3", "#2d3e50"] },
];

/** 한국 시간 기준 날짜로 오늘의 항구를 고른다. 매일 한 곳씩 차례로 바뀐다. */
export async function placeForToday(): Promise<Place> {
  // 미리 만들어둔 화면이 아니라, 방문한 순간의 날짜로 고르도록 기다린다.
  await connection();
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const dayNumber = Math.floor(kst.getTime() / (24 * 60 * 60 * 1000));
  return places[dayNumber % places.length];
}
