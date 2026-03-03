import type { TasksState } from "../../features/tasks/model/tasksSlice";
import type { StatsState } from "../../features/stats/model/statsSlice";
import type { SettingsState } from "../../features/settings/model/settingsSlice";

const STORAGE_KEY = "focus-timer";

export const getDayKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

type PersistedState = {
  dayKey: string;
  tasks: TasksState;
  stats: StatsState;
  settings: SettingsState;
};

export const loadPersistedState = ():
  | { tasks: TasksState; stats: StatsState; settings: SettingsState }
  | undefined => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw) as PersistedState;
    const todayKey = getDayKey();

    parsed.tasks.tasks.forEach((task) => {
      if (typeof task.todaySecondsSpent !== "number") {
        task.todaySecondsSpent = 0;
      }
    });

    if (parsed.dayKey !== todayKey) {
      parsed.tasks.tasks.forEach((task) => {
        task.todaySecondsSpent = 0;
      });

      parsed.dayKey = todayKey;
    }

    const stats: StatsState =
      parsed.dayKey === todayKey ? parsed.stats : { todaySeconds: 0, tasksCompletedToday: 0 };

    return {
      tasks: parsed.tasks,
      stats,
      settings: parsed.settings,
    };
  } catch {
    return undefined;
  }
};

export const savePersistedState = (state: {
  tasks: TasksState;
  stats: StatsState;
  settings: SettingsState;
}) => {
  const data: PersistedState = {
    dayKey: getDayKey(),
    tasks: state.tasks,
    stats: state.stats,
    settings: state.settings,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
