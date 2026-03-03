import type { AppDispatch, RootState } from "../../../app/store/store";
import {
  incFocus,
  decFocus,
  incShortBreak,
  decShortBreak,
  incLongBreak,
  decLongBreak,
} from "./settingsSlice";
import { primeAudio, playSound } from "../../../shared/lib/sound";

primeAudio();
export const incCurrentPhaseMinutesThunk =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const phase = getState().timer.phase;

    if (phase === "focus") dispatch(incFocus());
    else if (phase === "shortBreak") dispatch(incShortBreak());
    else dispatch(incLongBreak());
    playSound("resume");
  };

export const decCurrentPhaseMinutesThunk =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const phase = getState().timer.phase;

    if (phase === "focus") dispatch(decFocus());
    else if (phase === "shortBreak") dispatch(decShortBreak());
    else dispatch(decLongBreak());
    playSound("pause");
  };
