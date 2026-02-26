import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
  secondsSpent: number;
  todaySecondsSpent: number;
  isCompleted: boolean;
}

export interface TasksState {
  tasks: Task[];
  currentTaskId: string | null;
  draftTitle: string;
}

const initialState: TasksState = {
  tasks: [],
  currentTaskId: null,
  draftTitle: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setDraftTitle: (state, action: PayloadAction<string>) => {
      state.draftTitle = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    setCurrentTask: (state, action: PayloadAction<string>) => {
      state.currentTaskId = action.payload;
    },
    completeTask: (state, action: PayloadAction<string>) => {
      const t = state.tasks.find(x => x.id === action.payload);
      if (t) t.isCompleted = true;
    },
    reopenTask: (state, action: PayloadAction<string>) => {
      const t = state.tasks.find(x => x.id === action.payload);
      if (t) t.isCompleted = false;
    },
    addSecondsToTask: (state, action: PayloadAction<{ id: string; seconds: number }>) => {
      const t = state.tasks.find(x => x.id === action.payload.id);
      if (t) {
        t.secondsSpent += action.payload.seconds; 
        t.todaySecondsSpent += action.payload.seconds;
      }
    },
    clearDraft: (state) => {
      state.draftTitle = "";
    },
    clearCurrentTask: (state) => {
      state.currentTaskId = null;
      state.draftTitle = "";
    },
    resetTasksTodaySeconds: (state) => {
      state.tasks.forEach(t => {
        t.todaySecondsSpent = 0;
      });
    }
  }
})

export const {
  setDraftTitle,
  addTask,
  setCurrentTask,
  completeTask,
  reopenTask,
  addSecondsToTask,
  clearDraft,
  clearCurrentTask,
  resetTasksTodaySeconds
} = tasksSlice.actions;
export default tasksSlice.reducer
