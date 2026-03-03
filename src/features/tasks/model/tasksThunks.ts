import type { AppDispatch, RootState } from "../../../app/store/store";
import { reopenTask, setCurrentTask, addTask, completeTask, clearDraft } from "./tasksSlice";

const normalizeTaskTitle = (title: string) => title.trim().toLowerCase();

export const commitDraftTaskThunk = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const { draftTitle, tasks, currentTaskId } = getState().tasks;

  const trimmed = draftTitle.trim();
  if (!trimmed) return;

  const found = tasks.find(
    (task) => normalizeTaskTitle(task.title) === normalizeTaskTitle(trimmed),
  );

  if (currentTaskId && currentTaskId !== found?.id) {
    dispatch(completeTask(currentTaskId));
  }

  if (found) {
    dispatch(reopenTask(found.id));
    dispatch(setCurrentTask(found.id));
  } else {
    const newTask = {
      id: crypto.randomUUID(),
      title: trimmed,
      secondsSpent: 0,
      todaySecondsSpent: 0,
      isCompleted: false,
    };
    dispatch(addTask(newTask));
    dispatch(setCurrentTask(newTask.id));
  }

  dispatch(clearDraft());
};
