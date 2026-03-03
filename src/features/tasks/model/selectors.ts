import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store/store";
import type { Task } from "./tasksSlice";

const selectTasks = (state: RootState) => state.tasks.tasks;
const selectCurrentTaskId = (state: RootState) => state.tasks.currentTaskId;

export const selectCurrentTask = createSelector(
  [selectTasks, selectCurrentTaskId],
  (tasks, currentTaskId): Task | null => {
    if (!currentTaskId) return null;
    return tasks.find((task) => task.id === currentTaskId) ?? null;
  },
);

export const selectTodayTasksSorted = createSelector([selectTasks], (tasks): Task[] => {
  return tasks
    .filter((task) => task.todaySecondsSpent > 0)
    .slice()
    .sort((a, b) => b.todaySecondsSpent - a.todaySecondsSpent);
});
