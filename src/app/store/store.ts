import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../ui/uiSlice";
import settingsReducer from "../../features/settings/model/settingsSlice"
import timerReducer from "../../features/timer/model/timerSlice"
import statsReducer from "../../features/stats/model/statsSlice"
import tasksReducer from "../../features/tasks/model/tasksSlice"
import { loadPersistedState, savePersistedState } from "./persist";

const preloaded = loadPersistedState();

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    settings: settingsReducer,
    timer: timerReducer,
    stats: statsReducer,
    tasks: tasksReducer,
  },
  preloadedState: preloaded,
});

store.subscribe(() => {
  const s = store.getState();
  savePersistedState({ tasks: s.tasks, stats: s.stats, settings: s.settings });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;