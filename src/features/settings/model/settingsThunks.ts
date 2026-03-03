import type { AppDispatch, RootState } from "../../../app/store/store";
import type { Phase } from "../../timer/model/types";
import {
  decFocus,
  decShortBreak,
  decLongBreak,
  incFocus,
  incLongBreak,
  incShortBreak,
} from "./settingsSlice";
import { playSound } from "../../../shared/lib/sound";

const increaseActionByPhase = {
  focus: incFocus,
  shortBreak: incShortBreak,
  longBreak: incLongBreak,
} as const;

const decreaseActionByPhase = {
  focus: decFocus,
  shortBreak: decShortBreak,
  longBreak: decLongBreak,
} as const;

const getActionCreator = <T extends Record<Phase, () => { type: string }>>(phase: Phase, map: T) =>
  map[phase];

export const incCurrentPhaseMinutesThunk =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const phase = getState().timer.phase;
    dispatch(getActionCreator(phase, increaseActionByPhase)());
    playSound("resume");
  };

export const decCurrentPhaseMinutesThunk =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const phase = getState().timer.phase;
    dispatch(getActionCreator(phase, decreaseActionByPhase)());
    playSound("pause");
  };
