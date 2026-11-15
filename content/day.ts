import { connection } from "next/server";

/** 한국 시간 기준 "오늘"의 날짜 번호와 날짜 글자(2026-11-15 같은)를 알려준다. 매일 바뀌는 내용을 고르는 데 쓴다. */
export async function today(): Promise<{ dayNumber: number; dateKey: string }> {
  // 미리 만들어둔 화면이 아니라, 방문한 순간의 날짜를 쓰도록 기다린다.
  await connection();
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return {
    dayNumber: Math.floor(kst.getTime() / (24 * 60 * 60 * 1000)),
    dateKey: kst.toISOString().slice(0, 10),
  };
}

/** 목록에서 오늘 차례인 것을 고른다. 목록이 끝나면 처음으로 돌아간다. */
export function pickForDay<T>(list: readonly T[], dayNumber: number): T {
  return list[dayNumber % list.length];
}
