"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useSeaSound } from "./useSeaSound";

// 방 1 "오늘의 쉼"의 여섯 장면을 차례로 보여준다.
// 들어오기 → 몸 열기 → 숨 고르기 → 한 문장 나누기 → 문장 건네받기 → 다시 일상으로
type Scene = "arrive" | "body" | "breath" | "share" | "gift" | "back";

type Props = {
  backdrop: ReactNode;
  languageSwitch: ReactNode;
  doors: ReactNode;
  dateKey: string;
  seconds: { stretch: number; breath: number; back: number };
  sentenceMax: number;
  tempBesideYou: number;
  content: {
    country: string;
    placeName: string;
    placeLine: string;
    restingNow: string;
    stretches: string[];
    breathLine: string;
    question: string;
    gift: string;
    action: string;
  };
  text: {
    todaysHarbor: string;
    enter: string;
    soundOn: string;
    soundOff: string;
    skip: string;
    next: string;
    bodyTitle: string;
    breathTitle: string;
    sentencePlaceholder: string;
    leaveSentence: string;
    justListen: string;
    giftIntro: string;
    together: string;
    togetherDone: string;
    yourSentence: string;
    besideYou: string;
    farewell: string;
  };
};

// 내 문장은 지금은 서버로 보내지 않고, 이 브라우저 안에만 보관한다. (4단계에서 저장소와 연결)
const STORAGE_KEY = "harbor.sentences";
type Saved = { date: string; text: string };

function readSaved(): Saved[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? (list as Saved[]) : [];
  } catch {
    return [];
  }
}

function save(entry: Saved) {
  try {
    const others = readSaved().filter((s) => s.date !== entry.date);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...others, entry]));
  } catch {
    // 저장이 막힌 브라우저(사생활 보호 모드 등)에서도 화면은 그대로 이어진다.
  }
}

const FADE_MS = 1200;

/** 정해진 시간이 흐르면 onDone을 부른다. 남은 시간의 비율(0~1)을 돌려준다. */
function useCountdown(totalSeconds: number, onDone: () => void) {
  const [left, setLeft] = useState(totalSeconds);

  useEffect(() => {
    const id = window.setInterval(() => setLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (left === 0) onDone();
  }, [left, onDone]);

  return 1 - left / totalSeconds;
}

/** 시간이 흐르는 것을 보여주는 가느다란 선. 숫자는 보여주지 않는다. */
function TimeLine({ progress }: { progress: number }) {
  return (
    <div className="timeline" aria-hidden="true">
      <div className="timeline-fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

function Body({ lines, seconds, title, onDone }: { lines: string[]; seconds: number; title: string; onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const nextLine = useCallback(() => {
    if (index + 1 < lines.length) setIndex(index + 1);
    else onDone();
  }, [index, lines.length, onDone]);

  return (
    <>
      <p className="eyebrow">{title}</p>
      <StretchLine key={index} line={lines[index]} seconds={seconds} onDone={nextLine} />
      <div className="dots" aria-hidden="true">
        {lines.map((_, i) => (
          <span key={i} className={i <= index ? "dot dot-on" : "dot"} />
        ))}
      </div>
    </>
  );
}

function StretchLine({ line, seconds, onDone }: { line: string; seconds: number; onDone: () => void }) {
  const progress = useCountdown(seconds, onDone);
  return (
    <div className="center rise">
      <p className="lead" aria-live="polite">
        {line}
      </p>
      <TimeLine progress={progress} />
    </div>
  );
}

function Breath({ line, seconds, title, onDone }: { line: string; seconds: number; title: string; onDone: () => void }) {
  const progress = useCountdown(seconds, onDone);
  return (
    <>
      <p className="eyebrow">{title}</p>
      <div className="center">
        <div className="breath-ring" aria-hidden="true" />
        <p className="lead">{line}</p>
      </div>
      <TimeLine progress={progress} />
    </>
  );
}

export default function Journey({ backdrop, languageSwitch, doors, dateKey, seconds, sentenceMax, tempBesideYou, content, text }: Props) {
  const [scene, setScene] = useState<Scene>("arrive");
  const [leaving, setLeaving] = useState(false);
  const [draft, setDraft] = useState("");
  const [mine, setMine] = useState("");
  const [together, setTogether] = useState(false);
  // 예전에(오늘 말고) 남긴 문장이 있는 사람에게만 "곁에 있었어요"를 보여준다.
  const [hadEarlier] = useState(() => typeof window !== "undefined" && readSaved().some((s) => s.date !== dateKey));
  const sound = useSeaSound();

  // 장면을 천천히 바꾼다: 먼저 흐려지고, 그 다음 새 장면이 떠오른다.
  const go = useCallback((next: Scene) => {
    setLeaving(true);
    window.setTimeout(() => {
      setScene(next);
      setLeaving(false);
    }, FADE_MS);
  }, []);

  const toBreath = useCallback(() => go("breath"), [go]);
  const toShare = useCallback(() => go("share"), [go]);

  const leaveSentence = () => {
    const sentence = draft.trim();
    if (!sentence) return;
    setMine(sentence);
    save({ date: dateKey, text: sentence });
    go("gift");
  };

  const settled = scene === "back";

  return (
    <main className={settled ? "screen screen-dawn" : "screen"}>
      {backdrop}
      {/* 다시 일상으로: 새벽에서 해 뜨는 느낌으로 천천히 밝아진다 */}
      <div className="dawn" style={{ transitionDuration: `${seconds.back}s` }} aria-hidden="true" />

      <button type="button" className="corner corner-left" onClick={sound.toggle} aria-pressed={sound.on}>
        {sound.on ? text.soundOff : text.soundOn}
      </button>
      {scene === "arrive" && languageSwitch}

      <div className={leaving ? "scene scene-leaving" : "scene"} key={scene}>
        {scene === "arrive" && (
          <>
            <p className="eyebrow">{text.todaysHarbor}</p>
            <div className="center">
              <p className="sub">{content.country}</p>
              <h1 className="title">{content.placeName}</h1>
              <p className="sub">{content.placeLine}</p>
              <p className="presence">{content.restingNow}</p>
              <button type="button" className="enter" onClick={() => go("body")}>
                {text.enter}
              </button>
            </div>
            {doors}
          </>
        )}

        {scene === "body" && (
          <>
            <Body lines={content.stretches} seconds={seconds.stretch} title={text.bodyTitle} onDone={toBreath} />
            <button type="button" className="quiet" onClick={toBreath}>
              {text.skip}
            </button>
          </>
        )}

        {scene === "breath" && (
          <>
            <Breath line={content.breathLine} seconds={seconds.breath} title={text.breathTitle} onDone={toShare} />
            <button type="button" className="quiet" onClick={toShare}>
              {text.skip}
            </button>
          </>
        )}

        {scene === "share" && (
          <>
            <span />
            <div className="center">
              <label className="lead" htmlFor="sentence">
                {content.question}
              </label>
              <textarea
                id="sentence"
                className="sentence-input"
                rows={3}
                maxLength={sentenceMax}
                placeholder={text.sentencePlaceholder}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
              <p className="count" aria-hidden="true">
                {draft.length} / {sentenceMax}
              </p>
              <button type="button" className="enter" onClick={leaveSentence} disabled={!draft.trim()}>
                {text.leaveSentence}
              </button>
            </div>
            <button type="button" className="quiet" onClick={() => go("back")}>
              {text.justListen}
            </button>
          </>
        )}

        {scene === "gift" && (
          <>
            <p className="eyebrow">{text.giftIntro}</p>
            <div className="center">
              <p className="lead quote">{content.gift}</p>
              <button type="button" className={together ? "enter enter-on" : "enter"} onClick={() => setTogether(true)} aria-pressed={together}>
                {together ? text.togetherDone : text.together}
              </button>
            </div>
            <button type="button" className="quiet" onClick={() => go("back")}>
              {text.next}
            </button>
          </>
        )}

        {scene === "back" && (
          <>
            <span />
            <div className="center">
              {mine && (
                <>
                  <p className="eyebrow">{text.yourSentence}</p>
                  <p className="lead quote">{mine}</p>
                </>
              )}
              {hadEarlier && <p className="presence">{text.besideYou.replace("{count}", String(tempBesideYou))}</p>}
              <p className="sub action">{content.action}</p>
              <p className="lead farewell">{text.farewell}</p>
            </div>
            {doors}
          </>
        )}
      </div>
    </main>
  );
}
