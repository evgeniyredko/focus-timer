import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface StatsState {
  todaySeconds: number
  tasksCompletedToday: number
}

const initialState: StatsState = {
  todaySeconds: 0,
  tasksCompletedToday: 0
}

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    addTodaySeconds: (state, action: PayloadAction<number>) => {
      state.todaySeconds += action.payload
    },
    incTasksCompletedToday: (state) => {
      state.tasksCompletedToday += 1
    },
    resetTodayStats: (state) => {
      state.todaySeconds = 0;
      state.tasksCompletedToday = 0;
    }
  }
})

export const { addTodaySeconds, incTasksCompletedToday, resetTodayStats } = statsSlice.actions
export default statsSlice.reducer