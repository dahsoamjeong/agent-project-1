import type { CSSProperties } from "react";
import type { Place } from "@/content/places";

// 화면 가득 배경. 장소에 사진(photo)이 있으면 사진을 천천히 움직이며 보여주고,
// 없으면 색으로 그린 임시 배경을 보여준다.
// lights: 함께 쉬고 있는 사람 수만큼 수면 위에 작은 빛을 띄운다 (최대 12개까지만 그린다).
export default function Backdrop({ place, lights = 0 }: { place: Place; lights?: number }) {
  const [sky, horizon, water] = place.colors;
  const style = { "--sky": sky, "--horizon": horizon, "--water": water } as CSSProperties;
  const count = Math.min(lights, 12);

  return (
    <div className={place.photo ? "backdrop has-photo" : "backdrop"} style={style} aria-hidden="true">
      {place.photo && (
        // eslint-disable-next-line @next/next/no-img-element -- 화면 가득 채우는 배경이라 일반 img로 충분하다
        <img className="photo" src={`/places/${place.photo}`} alt="" />
      )}
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="light"
          style={{
            left: `${8 + ((i * 37) % 84)}%`,
            top: `${74 + ((i * 23) % 22)}%`,
            animationDelay: `${(i * 1.3) % 7}s`,
          }}
        />
      ))}
    </div>
  );
}
