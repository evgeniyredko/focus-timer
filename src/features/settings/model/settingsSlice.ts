import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Language = "en" | "ru";
type Theme = "light" | "dark" | "system";

const MIN_MINUTES = 5;
const MAX_MINUTES = 95;
const STEP_MINUTES = 5;

const MIN_CYCLES = 1;
const MAX_CYCLES = 10;
const STEP_CYCLES = 1;

export interface SettingsState {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  cyclesBeforeLongBreak: number;
  language: Language;
  theme: Theme;
}

const initialState: SettingsState = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  cyclesBeforeLongBreak: 4,
  language: "en",
  theme: "system",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    incFocus: (state) => {
      state.focusMinutes = Math.min(MAX_MINUTES, state.focusMinutes + STEP_MINUTES);
    },
    decFocus: (state) => {
      state.focusMinutes = Math.max(MIN_MINUTES, state.focusMinutes - STEP_MINUTES);
    },
    incShortBreak: (state) => {
      state.shortBreakMinutes = Math.min(MAX_MINUTES, state.shortBreakMinutes + STEP_MINUTES);
    },
    decShortBreak: (state) => {
      state.shortBreakMinutes = Math.max(MIN_MINUTES, state.shortBreakMinutes - STEP_MINUTES);
    },
    incLongBreak: (state) => {
      state.longBreakMinutes = Math.min(MAX_MINUTES, state.longBreakMinutes + STEP_MINUTES);
    },
    decLongBreak: (state) => {
      state.longBreakMinutes = Math.max(MIN_MINUTES, state.longBreakMinutes - STEP_MINUTES);
    },
    incCycles: (state) => {
      state.cyclesBeforeLongBreak = Math.min(MAX_CYCLES, state.cyclesBeforeLongBreak + STEP_CYCLES);
    },
    decCycles: (state) => {
      state.cyclesBeforeLongBreak = Math.max(MIN_CYCLES, state.cyclesBeforeLongBreak - STEP_CYCLES);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const {
  incFocus,
  decFocus,
  incShortBreak,
  decShortBreak,
  incLongBreak,
  decLongBreak,
  incCycles,
  decCycles,
  toggleTheme,
  setLanguage,
  setTheme,
} = settingsSlice.actions;
export default settingsSlice.reducer;
