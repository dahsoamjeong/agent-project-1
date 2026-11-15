import type { Text } from "./i18n";

// 방 1 "오늘의 쉼"에 들어가는 내용. 모두 임시이며, 3단계에서 소밍이 코드 없이 고칠 수 있는 저장소로 옮긴다.
// 각 목록은 매일 하나씩 차례로 나오고, 끝나면 처음으로 돌아간다.

/** 몸 열기: 앉아서 하는 스트레칭. 동작 하나에 30초씩, 모두 3분. */
export const STRETCH_SECONDS = 30;
export const stretches: Text[] = [
  {
    ko: "어깨를 귀 가까이 올렸다가, 숨을 내쉬며 툭 내려놓아요.",
    en: "Lift your shoulders toward your ears, then let them drop as you breathe out.",
  },
  {
    ko: "고개를 오른쪽으로 천천히 기울여요. 왼쪽 목이 길어지는 걸 느껴보세요.",
    en: "Slowly tilt your head to the right. Feel the left side of your neck grow long.",
  },
  {
    ko: "이번엔 왼쪽으로 기울여요. 서두르지 않아도 돼요.",
    en: "Now to the left. There is no need to hurry.",
  },
  {
    ko: "두 손을 깍지 끼고 머리 위로 길게 뻗어요.",
    en: "Lace your fingers together and reach long above your head.",
  },
  {
    ko: "두 손을 등 뒤에서 맞잡고, 가슴을 활짝 열어요.",
    en: "Clasp your hands behind your back and open your chest wide.",
  },
  {
    ko: "앉은 채로 몸을 오른쪽으로, 그리고 왼쪽으로 천천히 돌려요.",
    en: "Staying seated, turn gently to the right, and then to the left.",
  },
];

/** 숨 고르기: 30초 동안 화면에 머무는 한 문장. */
export const BREATH_SECONDS = 30;
export const breathLines: Text[] = [
  { ko: "지금 이 숨만으로 충분해요.", en: "This one breath is enough." },
  { ko: "애쓰지 않아도, 파도는 다시 와요.", en: "Without any effort from you, the waves return." },
  { ko: "잠시 멈춘 것도 나아가는 거예요.", en: "Pausing is also a way of moving forward." },
];

/** 한 문장 나누기: 오늘의 질문. */
export const SENTENCE_MAX = 100;
export const questions: Text[] = [
  { ko: "오늘 나를 조금 웃게 한 건 무엇이었나요?", en: "What made you smile a little today?" },
  { ko: "요즘 내 마음이 자주 머무는 곳은 어디인가요?", en: "Where has your mind been resting lately?" },
  { ko: "오늘의 나에게 해주고 싶은 말이 있나요?", en: "Is there something you want to say to yourself today?" },
];

/** 문장 건네받기: 아직 다른 사람의 문장이 없으므로, 임시로 준비해둔 문장을 건넨다. */
export const giftSentences: Text[] = [
  { ko: "별일 없는 하루였는데, 그게 참 고마웠어요.", en: "Nothing special happened today, and I was grateful for that." },
  { ko: "퇴근길 하늘이 예뻐서 한 정거장 먼저 내렸어요.", en: "The sky was so pretty on my way home that I got off one stop early." },
  { ko: "잘하고 있는지 모르겠지만, 오늘도 해냈어요.", en: "I am not sure I am doing well, but I made it through today." },
];

/** 다시 일상으로: 바로 해볼 수 있는 작은 행동. */
export const RETURN_SECONDS = 30;
export const smallActions: Text[] = [
  { ko: "물 한 잔을 천천히 마셔보세요.", en: "Drink a glass of water, slowly." },
  { ko: "창밖을 열 번의 숨 동안 바라보세요.", en: "Look out the window for ten breaths." },
  { ko: "떠오르는 사람에게 짧은 안부를 보내보세요.", en: "Send a short hello to someone who comes to mind." },
];

/** 임시 숫자: 예전에 남긴 내 문장에 "함께해요"를 누른 사람 수. 4단계에서 실제 숫자로 바뀐다. */
export const TEMP_BESIDE_YOU = 3;
