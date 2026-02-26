import notify from "../../assets/sounds/notify.mp3";
import start from "../../assets/sounds/start.mp3";
import skip from "../../assets/sounds/skip.mp3";
import stop from "../../assets/sounds/stop.mp3";
import pause from "../../assets/sounds/pause.mp3";
import resume from "../../assets/sounds/resume.mp3";

export type SoundKey = "notify" | "start" | "skip" | "stop" | "pause" | "resume";

const sources: Record<SoundKey, string> = {
  notify,
  start,
  skip,
  stop,
  pause,
  resume,
};

const cache: Partial<Record<SoundKey, HTMLAudioElement>> = {};

const getAudio = (key: SoundKey) => {
  if (!cache[key]) {
    cache[key] = new Audio(sources[key]);
    cache[key]!.preload = "auto";
  }
  return cache[key]!;
};

export const primeAudio = () => {
  (Object.keys(sources) as SoundKey[]).forEach((k) => getAudio(k));
};

export const playSound = (key: SoundKey) => {
  const audio = getAudio(key);
  audio.currentTime = 0;
  audio.play().catch(() => {});
};
