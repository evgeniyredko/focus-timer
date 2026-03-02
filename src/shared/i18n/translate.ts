import type { Language } from "../../features/settings/model/settingsSlice";

type Leaf = Record<"en" | "ru", string>;
type Dict = Record<string, Record<string, Leaf>>;

const dict = {
  settings: {
    language: { en: "language", ru: "язык" },
    theme: { en: "theme", ru: "тема" },
    resetStats: { en: "reset statistics", ru: "сбросить статистику" },
    statistics: { en: "statistics", ru: "статистика" },
  },
  phase: {
    focus: { en: "focus", ru: "фокус" },
    shortBreak: { en: "break", ru: "перерыв" },
    longBreak: { en: "break", ru: "перерыв" },
  },
  main: {
    start: { en: "start", ru: "начать" },
    reset: { en: "reset", ru: "сбросить" },
    taskToday: { en: "task today", ru: "задач сегодня" },
    timeToday: { en: "time today", ru: "время сегодня" },
    placeholder: { en: "task name...", ru: "название задачи..." },
    error: { en: "enter task name", ru: "введите название задачи" },
  },
  modals: {
    reset: { en: "reset", ru: "сбросить" },
    skip: { en: "skip", ru: "пропустить" },
    stop: { en: "stop", ru: "остановить" },
    cancel: { en: "cancel", ru: "отмена" },
    resetSession: { en: "reset this session?", ru: "сбросить задачу?" },
    resetStatistics: { en: "reset statistics?", ru: "сбросить статистику?" },
    skipSession: { en: "skip this session?", ru: "пропустить задачу?" },
    stopSession: { en: "stop this session?", ru: "остановить задачу?" },
  },
  statistic: {
    today: { en: "TODAY", ru: "СЕГОДНЯ" },
    close: { en: "close", ru: "закрыть" },
    noTasks: { en: "No tasks", ru: "Задач нет" },
  }
} as const satisfies Dict;

export const translate = <
  String extends keyof typeof dict,
  Key extends keyof typeof dict[String]
>(
  section: String,
  key: Key,
  lang: Language & keyof (typeof dict)[String][Key]
) => dict[section][key][lang];