import type { AppDispatch, RootState } from "../../../app/store/store";
import type { Phase } from "./types";
import { setRunning, setPaused, resumeRunning } from "./timerSlice";
import { applyTick } from "./timerSlice";
import { openTimer } from "../../../app/ui/uiSlice";
import { transitionToPhase, incrementFocusCycle, setIdleReset } from "./timerSlice";
import { addTodaySeconds } from "../../stats/model/statsSlice";
import { openMain, openPhaseCompleteModal } from "../../../app/ui/uiSlice";
import {
  requestNotificationsPermission,
  showAppNotification,
} from "../../../shared/lib/notifications";
import { primeAudio, playSound } from "../../../shared/lib/sound";
import { resetCycles, resetSession } from "./timerSlice";
import { incTasksCompletedToday } from "../../stats/model/statsSlice";
import { addSecondsToTask } from "../../tasks/model/tasksSlice";

export const startTimerThunk = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  if ("Notification" in window && Notification.permission === "default") {
    await requestNotificationsPermission();
  }
  primeAudio();
  const state = getState();
  const focusMinutes = state.settings.focusMinutes;
  const shortBreakMinutes = state.settings.shortBreakMinutes;
  const longBreakMinutes = state.settings.longBreakMinutes;
  const { phase } = state.timer;
  let minutes: number;
  if (phase === "focus") minutes = focusMinutes;
  else if (phase === "shortBreak") minutes = shortBreakMinutes;
  else minutes = longBreakMinutes;
  const durationMs = minutes * 60_000;
  const now = Date.now();
  const endsAt = now + durationMs;
  const totalSeconds = minutes * 60;
  playSound("start");
  dispatch(setRunning({ endsAt, now, totalSeconds }));
  dispatch(applyTick({ now }));
  dispatch(openTimer());
};

export const completePhaseThunk = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState();
  const { phase, cyclesCompleted } = state.timer;
  const { cyclesBeforeLongBreak, focusMinutes, shortBreakMinutes, longBreakMinutes } =
    state.settings;
  let nextPhase: Phase;

  if (phase === "focus") {
    const nextCycles = cyclesCompleted + 1;
    const isLong = nextCycles % cyclesBeforeLongBreak === 0;

    if (isLong) {
      nextPhase = "longBreak";
    } else {
      nextPhase = "shortBreak";
    }
  } else {
    nextPhase = "focus";
  }

  let nextSecondsLeft: number;

  if (nextPhase === "focus") {
    nextSecondsLeft = focusMinutes * 60;
  } else if (nextPhase === "shortBreak") {
    nextSecondsLeft = shortBreakMinutes * 60;
  } else {
    nextSecondsLeft = longBreakMinutes * 60;
  }

  const isSetComplete = phase === "focus" && cyclesCompleted + 1 === cyclesBeforeLongBreak;
  if (isSetComplete) dispatch(incTasksCompletedToday());

  dispatch(addTodaySeconds(state.timer.elapsedThisRun));
  const { currentTaskId } = state.tasks;
  if (currentTaskId) {
    dispatch(
      addSecondsToTask({
        id: currentTaskId,
        seconds: state.timer.elapsedThisRun,
      }),
    );
  }

  if (phase === "focus") {
    dispatch(incrementFocusCycle());
  } else if (phase === "longBreak") {
    dispatch(resetCycles());
  }
  dispatch(transitionToPhase({ phase: nextPhase, secondsLeft: nextSecondsLeft }));
  let notificationMessage: string;
  if (phase === "focus") {
    notificationMessage = "Time to take a short break!";
  } else {
    notificationMessage = "Time to focus!";
  }
  showAppNotification(notificationMessage, "");
};

export const tickThunk = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const now = Date.now();
  dispatch(applyTick({ now }));

  const { status, secondsLeft } = getState().timer;
  if (status === "running" && secondsLeft === 0) {
    playSound("notify");
    dispatch(completePhaseThunk());
    dispatch(openPhaseCompleteModal());
  }
};

export const skipPhaseThunk = () => (dispatch: AppDispatch) => {
  playSound("skip");
  dispatch(completePhaseThunk());
  dispatch(openMain());
};

export const stopTimerThunk = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState();
  let resetSeconds: number;
  playSound("stop");
  dispatch(addTodaySeconds(state.timer.elapsedThisRun));
  if (state.timer.phase === "focus") {
    resetSeconds = state.settings.focusMinutes * 60;
  } else if (state.timer.phase === "shortBreak") {
    resetSeconds = state.settings.shortBreakMinutes * 60;
  } else {
    resetSeconds = state.settings.longBreakMinutes * 60;
  }
  dispatch(setIdleReset({ seconds: resetSeconds }));
  dispatch(openMain());
};

export const togglePauseThunk = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const { status } = getState().timer;
  if (status === "running") {
    playSound("pause");
    dispatch(setPaused());
  } else if (status === "paused") {
    playSound("resume");
    dispatch(resumeRunning({ now: Date.now() }));
  }
};

export const resetSessionThunk = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const focusSeconds = getState().settings.focusMinutes * 60;
  dispatch(resetSession({ focusSeconds }));
  dispatch(openMain());
};
