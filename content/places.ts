import { pickForDay, today } from "./day";
import type { Text } from "./i18n";

// 오늘의 항구: 사람들이 가보고 싶었던 세계의 좋은 곳들.
// 지금은 임시 목록이며, 3단계에서 소밍이 코드 없이 고칠 수 있는 관리 화면(저장소)으로 옮긴다.
//
// photo: public/places/ 안의 사진 파일 이름. 없으면 colors로 그린 임시 배경이 나온다.
// focus: 사진에서 화면 가운데에 둘 지점 (가로% 세로%). 가로로 긴 사진이 휴대폰에서 잘릴 때 쓴다.
// credit: 사진의 출처와 사용 조건 (사진을 넣을 때 반드시 함께 적는다).
// colors: 사진이 없을 때 쓰는 임시 배경 색 (하늘, 수평선, 물).

export type Place = {
  name: Text;
  country: Text;
  line: Text;
  photo?: string;
  focus?: string;
  credit?: string;
  colors: [string, string, string];
};

export const places: Place[] = [
  {
    name: { ko: "투명한 라군", en: "A clear lagoon" },
    country: { ko: "몰디브", en: "Maldives" },
    line: { ko: "얕고 맑은 바다 위, 작은 배 한 척", en: "One small boat on shallow, clear water" },
    photo: "maldives-lagoon.webp",
    credit: "소밍이 전달한 사진. 출처와 사용 조건 확인 필요.",
    colors: ["#1b3a5c", "#5fa8b8", "#0f5c6e"],
  },
  {
    name: { ko: "해 질 녘의 해변", en: "A beach at sunset" },
    country: { ko: "몰디브", en: "Maldives" },
    line: { ko: "야자수 아래, 천천히 흔들리는 그네", en: "A swing moving slowly under a palm tree" },
    photo: "maldives-sunset.webp",
    focus: "40% 50%",
    credit: "소밍이 전달한 사진. 출처와 사용 조건 확인 필요.",
    colors: ["#243a5e", "#f0b98f", "#1f6a7a"],
  },
  {
    name: { ko: "테카포 호수", en: "Lake Tekapo" },
    country: { ko: "뉴질랜드", en: "New Zealand" },
    line: { ko: "별이 내려앉는 호숫가", en: "A lakeshore where the stars come down" },
    colors: ["#1a2247", "#6d7fb8", "#27407a"],
  },
  {
    name: { ko: "이아 마을", en: "Oia" },
    country: { ko: "그리스 산토리니", en: "Santorini, Greece" },
    line: { ko: "절벽 끝에서 보는 에게해", en: "The Aegean from the edge of the cliffs" },
    colors: ["#2b3a67", "#e0a68a", "#2c5d8a"],
  },
  {
    name: { ko: "우붓의 숲", en: "The forests of Ubud" },
    country: { ko: "인도네시아 발리", en: "Bali, Indonesia" },
    line: { ko: "이른 아침 안개 낀 계단식 논", en: "Rice terraces in the early morning mist" },
    colors: ["#1f3b33", "#9fc2a0", "#2e5d4a"],
  },
  {
    name: { ko: "브리엔츠 호수", en: "Lake Brienz" },
    country: { ko: "스위스", en: "Switzerland" },
    line: { ko: "산 그림자가 비치는 에메랄드빛 물", en: "Emerald water holding the shadow of the mountains" },
    colors: ["#20404f", "#8fc7c0", "#1d6b6b"],
  },
  {
    name: { ko: "하날레이 만", en: "Hanalei Bay" },
    country: { ko: "하와이 카우아이", en: "Kauai, Hawaii" },
    line: { ko: "산과 바다가 만나는 고요한 만", en: "A quiet bay where mountains meet the sea" },
    colors: ["#243a5e", "#f0b98f", "#1f6a7a"],
  },
  {
    name: { ko: "레이니스피아라", en: "Reynisfjara" },
    country: { ko: "아이슬란드", en: "Iceland" },
    line: { ko: "검은 모래 위로 밀려오는 파도", en: "Waves rolling in over black sand" },
    colors: ["#1c2430", "#7d8ea3", "#2d3e50"],
  },
];

/**
 * 오늘의 항구. 매일 한 곳씩 차례로 바뀐다.
 * preview: 주소 끝에 ?place=2 처럼 번호를 붙이면 그 순서의 장소를 미리 볼 수 있다 (1부터 시작).
 */
export async function placeForToday(preview?: string): Promise<Place> {
  const { dayNumber } = await today();
  const chosen = preview ? places[Number(preview) - 1] : undefined;
  return chosen ?? pickForDay(places, dayNumber);
}
