"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// 임시 파도 소리. 녹음 파일이 준비되기 전까지, 브라우저가 직접 만들어내는 부드러운 소리를 쓴다.
// (낮게 깔리는 잡음을 천천히 키웠다 줄였다 해서 파도처럼 들리게 한다.)
// 소리는 사용자가 버튼을 눌러야만 시작된다.
export function useSeaSound() {
  const [on, setOn] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);

  const start = useCallback(() => {
    const ctx = new AudioContext();
    const seconds = 4;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      // 부드럽고 낮은 잡음(브라운 노이즈)
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      data[i] = last * 3.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 700;

    const wave = ctx.createGain();
    wave.gain.value = 0.1;

    // 약 9초에 한 번씩 밀려왔다 빠지는 느낌
    const swell = ctx.createOscillator();
    swell.frequency.value = 0.11;
    const swellDepth = ctx.createGain();
    swellDepth.gain.value = 0.06;
    swell.connect(swellDepth).connect(wave.gain);

    // 갑자기 켜지지 않고 천천히 들려오게
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(1, ctx.currentTime + 3);

    noise.connect(filter).connect(wave).connect(master).connect(ctx.destination);
    noise.start();
    swell.start();
    contextRef.current = ctx;
  }, []);

  const stop = useCallback(() => {
    void contextRef.current?.close();
    contextRef.current = null;
  }, []);

  const toggle = useCallback(() => {
    if (contextRef.current) {
      stop();
      setOn(false);
    } else {
      start();
      setOn(true);
    }
  }, [start, stop]);

  // 화면을 떠나면 소리도 멈춘다.
  useEffect(() => stop, [stop]);

  return { on, toggle };
}
