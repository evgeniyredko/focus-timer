import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { openConfirmResetStats, openMain, openTasksModal } from "../../../app/ui/uiSlice";
import { toggleTheme, setLanguage } from "../model/settingsSlice";
import type { Language } from "../model/settingsSlice";
import { translate } from "../../../shared/i18n/translate";

import BackIcon from "../../../assets/icons/arrow.svg?react";
import SettingsIcon from "../../../assets/icons/settings.svg?react";
import ThemeDark from "../../../assets/icons/theme-dark.svg?react";
import ThemeLight from "../../../assets/icons/theme-light.svg?react";

export const SettingsPanel = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((s) => s.settings.language);

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white w-full max-w-225 m-auto">
      <div className="mx-auto px-4 py-6 min-h-screen flex flex-col">
        <header className="shrink-0 flex items-center justify-between">
          <BackIcon
            className="h-10 w-10 text-black dark:text-white cursor-pointer hover:text-accent hover:scale-110 transition duration-300"
            onClick={() => dispatch(openMain())}
          />
          <SettingsIcon className="h-10 w-10 text-black dark:text-white transition duration-300" />
        </header>
        <div className="flex flex-col mt-6 gap-4">
          <div className="flex text-3xl font-semibold justify-between gap-4 border-t-2 pt-4 px-1">
            <span>{translate("settings", "theme", lang)}</span>
            <div className="relative bg-black/15 dark:bg-white/30 rounded-full shadow-sm shadow-black/15 dark:shadow-white/30">
              <button
                className="flex cursor-pointer hover:outline-2 outline-offset-1 rounded-full transition duration-300"
                onClick={() => dispatch(toggleTheme())}
              >
                <div className="relative p-3 z-50">
                  <ThemeDark />
                </div>
                <div className="relative p-3 z-50">
                  <ThemeLight />
                </div>
              </button>
              <div className="absolute bg-accent outline-2 p-5 rounded-full dark:left-0.5 top-0.5 translate-x-full dark:translate-x-0 left-1 transition duration-300"></div>
            </div>
          </div>
          <div className="relative flex text-3xl font-semibold justify-between gap-4 border-y-2 pt-5 pb-4 px-1">
            <span>{translate("settings", "language", lang)}</span>
            <select
              value={lang}
              onChange={(e) => dispatch(setLanguage(e.target.value as Language))}
              className="px-3 pt-1 cursor-pointer bg-black/15 dark:bg-white/30 focus-visible:outline-none hover:outline-2 rounded-xl pb-2 -mt-1 appearance-none pr-10"
            >
              <option className="dark:text-black" value="en">
                english
              </option>
              <option className="dark:text-black" value="ru">
                русский
              </option>
            </select>
            <svg
              className="
                pointer-events-none
                absolute right-3 top-1/2
                -translate-y-1/2
                h-4 w-4
                currentColor
              "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        <button
          className="mt-auto mb-4 w-full rounded-2xl bg-white text-black pt-3 pb-4 text-2xl font-semibold dark:bg-black dark:text-white outline-2 cursor-pointer hover:bg-accent hover:scale-101 transition duration-300"
          onClick={() => dispatch(openConfirmResetStats())}
        >
          {translate("settings", "resetStats", lang)}
        </button>
        <button
          className="w-full rounded-2xl bg-black text-white pt-3 pb-4 text-2xl font-semibold dark:bg-white dark:text-black cursor-pointer hover:bg-accent hover:scale-101 transition duration-300"
          onClick={() => dispatch(openTasksModal())}
        >
          {translate("settings", "statistics", lang)}
        </button>
      </div>
    </div>
  );
};
