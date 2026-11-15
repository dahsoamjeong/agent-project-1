import Link from "next/link";
import { getDictionary, getLocale } from "@/content/i18n";
import { rooms } from "@/content/rooms";

// 화면 맨 아래의 작은 문들: 지금 있는 방을 뺀 나머지 방으로 가는 길.
export default async function Doors({ current }: { current: string }) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <nav className="doors" aria-label={dict.otherRooms}>
      {rooms
        .filter((room) => room.path !== current)
        .map((room) => (
          <Link key={room.path} href={`/${locale}${room.path}`}>
            {room.name[locale]}
          </Link>
        ))}
    </nav>
  );
}
