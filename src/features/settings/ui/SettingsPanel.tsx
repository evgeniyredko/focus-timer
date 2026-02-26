import { useAppDispatch } from "../../../app/store/hooks";
import { openMain, openTasksModal } from "../../../app/ui/uiSlice"
import { toggleTheme } from "../model/settingsSlice";
import { resetTodayThunk } from "../../stats/model/statsThunks";

import BackIcon from '../../../assets/icons/arrow.svg?react';
import SettingsIcon from '../../../assets/icons/settings.svg?react';
import ThemeDark from '../../../assets/icons/theme-dark.svg?react';
import ThemeLight from '../../../assets/icons/theme-light.svg?react';

export const SettingsPanel = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white w-full max-w-225 m-auto">
      <div className="mx-auto px-4 py-6 min-h-screen flex flex-col">
        <header className="shrink-0 flex items-center justify-between">
          <BackIcon className="h-10 w-10 text-black dark:text-white cursor-pointer hover:text-accent hover:scale-110 transition duration-300" onClick={() => dispatch(openMain())} />
          <SettingsIcon className="h-10 w-10 text-black dark:text-white transition duration-300" />
        </header>
        <div className="flex flex-col mt-10 gap-2">
          <div className="flex text-3xl font-semibold justify-between gap-4">
            <span>theme</span>
            <div className="relative bg-black/15 dark:bg-white/30 rounded-full shadow-sm shadow-black/15 dark:shadow-white/30">
              <button className="flex cursor-pointer hover:outline-2 outline-offset-1 rounded-full transition duration-300" onClick={() => dispatch(toggleTheme())}>
                <div className="relative p-3 z-50">
                  <ThemeDark/>
                </div>
                <div className="relative p-3 z-50">
                  <ThemeLight/>
                </div>
              </button>
              <div className="absolute bg-accent outline-2 p-5 rounded-full dark:left-0.5 top-0.5 translate-x-full dark:translate-x-0 left-1 transition duration-300"></div>
            </div>
          </div>
          <div className="text-3xl font-semibold">language</div>
        </div>
        <button className="mt-auto mb-4 w-full rounded-2xl bg-white text-black pt-3 pb-4 text-2xl font-semibold dark:bg-black dark:text-white outline-2 cursor-pointer hover:bg-accent hover:scale-101 transition duration-300" onClick={() => dispatch(resetTodayThunk())}>reset stats</button>
        <button className="w-full rounded-2xl bg-black text-white pt-3 pb-4 text-2xl font-semibold dark:bg-white dark:text-black cursor-pointer hover:bg-accent hover:scale-101 transition duration-300" onClick={() => dispatch(openTasksModal())}>statistics</button>
      </div>
    </div>
  )
}