import type { AppDispatch, RootState } from "../../../app/store/store";
import { reopenTask, setCurrentTask, addTask, completeTask, clearDraft } from "./tasksSlice";

export const commitDraftTaskThunk =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { draftTitle, tasks, currentTaskId } = getState().tasks;

    const trimmed = draftTitle.trim();
    if (!trimmed) return;

    const normalize = (s: string) => s.trim().toLowerCase();
    const found = tasks.find(t => normalize(t.title) === normalize(trimmed));

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