import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { startTimerThunk } from "../model/timerThunks";
import { openConfirmResetSession, openSettings } from "../../../app/ui/uiSlice";
import { formatMMSS } from "../../../shared/lib/time";
import {
  incCurrentPhaseMinutesThunk,
  decCurrentPhaseMinutesThunk,
} from "../../settings/model/settingsThunks";
import { CycleDots } from "../../../shared/ui/CycleDots";
import { commitDraftTaskThunk } from "../../tasks/model/tasksThunks";
import { setDraftTitle } from "../../tasks/model/tasksSlice";
import { translate } from "../../../shared/i18n/translate";

import LogoIcon from "../../../assets/icons/logo.svg?react";
import MenuIcon from "../../../assets/icons/menu.svg?react";
import MinusIcon from "../../../assets/icons/minus.svg?react";
import PlusIcon from "../../../assets/icons/plus.svg?react";

export const MainPanel = () => {
  const dispatch = useAppDispatch();
  const phase = useAppSelector((state) => state.timer.phase);
  const todaySeconds = useAppSelector((state) => state.stats.todaySeconds);
  const tasksCompletedToday = useAppSelector((state) => state.stats.tasksCompletedToday);
  const { focusMinutes, shortBreakMinutes, longBreakMinutes } = useAppSelector((s) => s.settings);
  const [inputError, setInputError] = useState(false);
  const minutes =
    phase === "focus"
      ? focusMinutes
      : phase === "shortBreak"
        ? shortBreakMinutes
        : longBreakMinutes;
  const seconds = minutes * 60;
  const formattedTime = formatMMSS(seconds);
  const formattedTimeToday = formatMMSS(todaySeconds);
  const cyclesCompleted = useAppSelector((s) => s.timer.cyclesCompleted);
  const cyclesBeforeLongBreak = useAppSelector((s) => s.settings.cyclesBeforeLongBreak);
  const draftTitle = useAppSelector((s) => s.tasks.draftTitle);
  const currentTaskId = useAppSelector((s) => s.tasks.currentTaskId);
  const tasks = useAppSelector((s) => s.tasks.tasks);
  const lang = useAppSelector((s) => s.settings.language);
  const currentTask = currentTaskId ? tasks.find((t) => t.id === currentTaskId) : null;
  const handleStart = () => {
    const hasDraft = draftTitle.trim().length > 0;
    if (!currentTask && !hasDraft) {
      setInputError(true);
      return;
    }
    setInputError(false);
    if (!currentTask && hasDraft) {
      dispatch(commitDraftTaskThunk());
    }
    dispatch(startTimerThunk());
  };

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white w-full max-w-225 m-auto">
      <div className="mx-auto px-4 py-6 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="shrink-0 flex items-center justify-between">
          <LogoIcon className="h-10 w-10 text-black dark:text-white transition duration-300" />
          <MenuIcon
            className="h-10 w-10 text-black dark:text-white cursor-pointer hover:text-accent hover:scale-110 transition duration-300"
            onClick={() => dispatch(openSettings())}
          />
        </header>

        <main className="flex-1 min-h-0 flex">
          <div className="m-auto w-full flex flex-col gap-[clamp(16px,4vh,64px)]">
            {/* Title */}
            <section className="text-center text-6xl font-extrabold leading-[0.9]">
              <div className="">focus</div>
              <div className="">timer</div>
            </section>

            {/* Sessions */}
            <CycleDots total={cyclesBeforeLongBreak} completed={cyclesCompleted} />

            {/* Timer */}
            <section className=" font-black flex justify-center items-center [@media_(max-width:389px)]:justify-between -mt-2">
              <MinusIcon
                className="h-10 w-10 text-black dark:text-white mt-3 cursor-pointer hover:text-accent select-none hover:scale-110 transition duration-300"
                onClick={() => dispatch(decCurrentPhaseMinutesThunk())}
              />
              <div className="w-fit text-center text-7xl mx-7 [@media_(max-width:389px)]:mx-0">
                {formattedTime}
              </div>
              <PlusIcon
                className="h-10 w-10 text-black dark:text-white mt-3 cursor-pointer hover:text-accent select-none hover:scale-110 transition duration-300"
                onClick={() => dispatch(incCurrentPhaseMinutesThunk())}
              />
            </section>

            {/* Mode */}
            <section className="text-center text-2xl font-semibold -mt-7.5">
              <div className="underline">{translate("phase", phase, lang)}</div>
            </section>

            {/* Task */}
            {!currentTask ? (
              <section className=" space-y-4 text-center -mb-4 w-full self-center">
                <input
                  className={`w-full rounded-2xl p-3 border-2 text-2xl text-center ${inputError ? "border-accent" : "border-black dark:border-white"}`}
                  value={draftTitle}
                  onChange={(e) => {
                    dispatch(setDraftTitle(e.target.value));
                    if (inputError) setInputError(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleStart();
                    }
                  }}
                  placeholder={translate("main", "placeholder", lang)}
                />
                {inputError && (
                  <p className="text-m text-center text-accent -mt-2">
                    {translate("main", "error", lang)}
                  </p>
                )}
              </section>
            ) : (
              <section className=" space-y-4 flex justify-center font-semibold mb-2">
                <div className="relative px-10 max-w-full text-center line-clamp-2 text-3xl before:content-[''] before:absolute before:left-0 before:top-1/2 before:translate-y-px before:w-6 before:h-1 before:bg-black after:content-[''] after:absolute after:right-0 after:top-1/2 after:translate-y-px after:w-6 after:h-1 after:bg-black dark:before:bg-white dark:after:bg-white wrap-break-words">
                  {currentTask.title}
                </div>
              </section>
            )}

            {/* Buttons */}
            <section className="flex flex-col gap-3 w-full self-center">
              <button
                onClick={handleStart}
                onBlur={() => {
                  if (inputError) setInputError(false);
                }}
                className="w-full rounded-2xl bg-black text-white pt-3 pb-4 text-2xl font-semibold dark:bg-white dark:text-black cursor-pointer hover:bg-accent hover:scale-101 transition duration-300"
              >
                {translate("main", "start", lang)}
              </button>
              {currentTask && (
                <button
                  className="w-full rounded-2xl text-black pt-3 pb-4 text-2xl border-2 font-regular dark:text-white cursor-pointer hover:text-accent hover:scale-103 transition duration-300"
                  onClick={() => dispatch(openConfirmResetSession())}
                >
                  {translate("main", "reset", lang)}
                </button>
              )}
            </section>
          </div>
        </main>

        {/* Today stats */}
        <footer className="shrink-0 flex justify-between gap-4 font-extrabold">
          <div className="w-20 text-center">
            <div className="">{tasksCompletedToday}</div>
            <div className="w-15 m-auto text-black/50 dark:text-white/60">
              {translate("main", "taskToday", lang)}
            </div>
          </div>
          <div className="w-20 text-center">
            <div className="">{formattedTimeToday}</div>
            <div className="w-15 m-auto text-black/50 dark:text-white/60">
              {translate("main", "timeToday", lang)}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
