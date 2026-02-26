import { createSlice } from "@reduxjs/toolkit";

type View = "main" | "timer" | "settings";

interface UiState {
  view: View
  isPhaseCompleteModalOpen: boolean
  isTasksModalOpen: boolean
}

const initialState: UiState = {
  view: "main",
  isPhaseCompleteModalOpen: false,
  isTasksModalOpen: false
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openMain: (state) => {
        state.view = "main"
    },
    openTimer: (state) => {
        state.view = "timer"
    },
    openSettings: (state) => {
        state.view = "settings"
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
  }
})

export const { openMain, openTimer, openSettings, openPhaseCompleteModal, closePhaseCompleteModal, openTasksModal, closeTasksModal } = uiSlice.actions
export default uiSlice.reducer