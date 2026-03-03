import type { AppDispatch, RootState } from "../../../app/store/store";
import { openMain, openPhaseCompleteModal, openTimer } from "../../../app/ui/uiSlice";
import {
  requestNotificationsPermission,
  showAppNotification,
} from "../../../shared/lib/notifications";
import { primeAudio, playSound } from "../../../shared/lib/sound";
import { addTodaySeconds, incTasksCompletedToday } from "../../stats/model/statsSlice";
import { addSecondsToTask } from "../../tasks/model/tasksSlice";
import {
  getPhaseCompleteNotificationMessage,
  getPhaseSeconds,
  getPhaseTransition,
} from "../lib/phaseUtils";
import {
  applyTick,
  incrementFocusCycle,
  resetCycles,
  resetSession,
  resumeRunning,
  setIdleReset,
  setPaused,
  setRunning,
  transitionToPhase,
} from "./timerSlice";

export const startTimerThunk = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  if ("Notification" in window && Notification.permission === "default") {
    await requestNotificationsPermission();
  }

  primeAudio();
  const state = getState();
  const totalSeconds = getPhaseSeconds(state.settings, state.timer.phase);
  const now = Date.now();
  const endsAt = now + totalSeconds * 1000;

  playSound("start");
  dispatch(setRunning({ endsAt, now, totalSeconds }));
  dispatch(applyTick({ now }));
  dispatch(openTimer());
};

export const completePhaseThunk = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState();
  const { phase, cyclesCompleted, elapsedThisRun } = state.timer;
  const transition = getPhaseTransition({ phase, cyclesCompleted, settings: state.settings });

  if (transition.isSetComplete) dispatch(incTasksCompletedToday());

  dispatch(addTodaySeconds(elapsedThisRun));
  const { currentTaskId } = state.tasks;
  if (currentTaskId) {
    dispatch(
      addSecondsToTask({
        id: currentTaskId,
        seconds: elapsedThisRun,
      }),
    );
  }

  if (phase === "focus") {
    dispatch(incrementFocusCycle());
  } else if (phase === "longBreak") {
    dispatch(resetCycles());
  }

  dispatch(
    transitionToPhase({
      phase: transition.nextPhase,
      secondsLeft: transition.nextSecondsLeft,
    }),
  );

  showAppNotification(getPhaseCompleteNotificationMessage(phase), "");
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

  playSound("stop");
  dispatch(addTodaySeconds(state.timer.elapsedThisRun));

  const resetSeconds = getPhaseSeconds(state.settings, state.timer.phase);
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
  const focusSeconds = getPhaseSeconds(getState().settings, "focus");
  dispatch(resetSession({ focusSeconds }));
  dispatch(openMain());
};
