import { createSlice } from "@reduxjs/toolkit";

type View = "main" | "timer" | "settings";

interface UiState {
  view: View;
  isPhaseCompleteModalOpen: boolean;
  isTasksModalOpen: boolean;
  isConfirmResetStatsOpen: boolean;
  isConfirmResetSessionOpen: boolean;
  isConfirmSkipSessionOpen: boolean;
  isConfirmStopSessionOpen: boolean;
}

const initialState: UiState = {
  view: "main",
  isPhaseCompleteModalOpen: false,
  isTasksModalOpen: false,
  isConfirmResetStatsOpen: false,
  isConfirmResetSessionOpen: false,
  isConfirmSkipSessionOpen: false,
  isConfirmStopSessionOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openMain: (state) => {
      state.view = "main";
    },
    openTimer: (state) => {
      state.view = "timer";
    },
    openSettings: (state) => {
      state.view = "settings";
    },
    openPhaseCompleteModal: (state) => {
      state.isPhaseCompleteModalOpen = true;
    },
    closePhaseCompleteModal: (state) => {
      state.isPhaseCompleteModalOpen = false;
    },
    openTasksModal: (state) => {
      state.isTasksModalOpen = true;
    },
    closeTasksModal: (state) => {
      state.isTasksModalOpen = false;
    },
    openConfirmResetStats: (state) => {
      state.isConfirmResetStatsOpen = true;
    },
    closeConfirmResetStats: (state) => {
      state.isConfirmResetStatsOpen = false;
    },
    openConfirmResetSession: (state) => {
      state.isConfirmResetSessionOpen = true;
    },
    closeConfirmResetSession: (state) => {
      state.isConfirmResetSessionOpen = false;
    },
    openConfirmSkipSession: (state) => {
      state.isConfirmSkipSessionOpen = true;
    },
    closeConfirmSkipSession: (state) => {
      state.isConfirmSkipSessionOpen = false;
    },
    openConfirmStopSession: (state) => {
      state.isConfirmStopSessionOpen = true;
    },
    closeConfirmStopSession: (state) => {
      state.isConfirmStopSessionOpen = false;
    },
  },
});

export const {
  openMain,
  openTimer,
  openSettings,
  openPhaseCompleteModal,
  closePhaseCompleteModal,
  openTasksModal,
  closeTasksModal,
  openConfirmResetStats,
  closeConfirmResetStats,
  openConfirmResetSession,
  closeConfirmResetSession,
  openConfirmSkipSession,
  closeConfirmSkipSession,
  openConfirmStopSession,
  closeConfirmStopSession,
} = uiSlice.actions;
export default uiSlice.reducer;
