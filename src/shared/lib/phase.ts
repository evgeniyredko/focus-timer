import type { Phase } from "../../features/timer/model/types";

export const getPhaseLabel = (phase: Phase): string => {
  switch (phase) {
    case "focus":
      return "focus";
    case "shortBreak":
      return "break";
    case "longBreak":
      return "long break";
  }
};
