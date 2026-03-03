import type { SettingsState } from "../../settings/model/settingsSlice";
import type { Phase } from "../model/types";

type TimerSettings = Pick<
  SettingsState,
  "focusMinutes" | "shortBreakMinutes" | "longBreakMinutes" | "cyclesBeforeLongBreak"
>;

type PhaseTransitionParams = {
  phase: Phase;
  cyclesCompleted: number;
  settings: TimerSettings;
};

type PhaseTransition = {
  nextPhase: Phase;
  nextSecondsLeft: number;
  isSetComplete: boolean;
};

export const getPhaseMinutes = (settings: TimerSettings, phase: Phase): number => {
  if (phase === "focus") return settings.focusMinutes;
  if (phase === "shortBreak") return settings.shortBreakMinutes;
  return settings.longBreakMinutes;
};

export const getPhaseSeconds = (settings: TimerSettings, phase: Phase): number => {
  return getPhaseMinutes(settings, phase) * 60;
};

export const getPhaseTransition = ({
  phase,
  cyclesCompleted,
  settings,
}: PhaseTransitionParams): PhaseTransition => {
  let nextPhase: Phase;

  if (phase === "focus") {
    const nextCycles = cyclesCompleted + 1;
    const isLongBreak = nextCycles % settings.cyclesBeforeLongBreak === 0;
    nextPhase = isLongBreak ? "longBreak" : "shortBreak";
  } else {
    nextPhase = "focus";
  }

  return {
    nextPhase,
    nextSecondsLeft: getPhaseSeconds(settings, nextPhase),
    isSetComplete: phase === "focus" && cyclesCompleted + 1 === settings.cyclesBeforeLongBreak,
  };
};

export const getPhaseCompleteNotificationMessage = (phase: Phase): string => {
  return phase === "focus" ? "Time to take a short break!" : "Time to focus!";
};
