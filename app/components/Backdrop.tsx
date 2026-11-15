import type { CSSProperties } from "react";
import type { Place } from "@/content/places";

// 임시 배경. 실제 자연 영상/사진이 준비되면 이 컴포넌트 안만 바꾸면 된다.
// lights: 함께 쉬고 있는 사람 수만큼 수면 위에 작은 빛을 띄운다 (최대 12개까지만 그린다).
export default function Backdrop({ place, lights = 0 }: { place: Place; lights?: number }) {
  const [sky, horizon, water] = place.colors;
  const style = { "--sky": sky, "--horizon": horizon, "--water": water } as CSSProperties;
  const count = Math.min(lights, 12);

  return (
    <div className="backdrop" style={style} aria-hidden="true">
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
