import Link from "next/link";
import { rooms } from "@/content/rooms";

// 화면 맨 아래의 작은 문들: 지금 있는 방을 뺀 나머지 방으로 가는 길.
export default function Doors({ current }: { current: string }) {
  return (
    <nav className="doors" aria-label="다른 방으로 가기">
      {rooms
        .filter((room) => room.path !== current)
        .map((room) => (
          <Link key={room.path} href={room.path}>
            {room.name}
          </Link>
        ))}
    </nav>
  );
}
