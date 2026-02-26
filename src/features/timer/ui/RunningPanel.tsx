import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { stopTimerThunk, skipPhaseThunk, togglePauseThunk } from "../model/timerThunks";
import { useTimerTicker } from "../lib/useTimerTicker";
import { formatMMSS } from "../../../shared/lib/time";
import { CycleDots } from "../../../shared/ui/CycleDots";
import { getPhaseLabel } from "../../../shared/lib/phase";
import { ProgressCircle } from "./ProgressCircle";

import StopIcon from '../../../assets/icons/stop.svg?react';
import SkipIcon from '../../../assets/icons/skip.svg?react';
import PauseIcon from '../../../assets/icons/pause.svg?react';
import PlayIcon from '../../../assets/icons/play.svg?react';

export const RunningPanel = () => {
  useTimerTicker();

  const dispatch = useAppDispatch();
  const status = useAppSelector((s) => s.timer.status);
  const secondsLeft = useAppSelector((state) => state.timer.secondsLeft);
  const cyclesCompleted = useAppSelector((s) => s.timer.cyclesCompleted);
  const cyclesBeforeLongBreak = useAppSelector((s) => s.settings.cyclesBeforeLongBreak);
  const phase = useAppSelector((state) => state.timer.phase);
  const PhaseLabel = getPhaseLabel(phase);
  const totalSeconds = useAppSelector((state) => state.timer.totalSeconds)
  const progress =
  totalSeconds > 0
    ? (totalSeconds - secondsLeft) / totalSeconds
    : 0;
  const currentTaskId = useAppSelector((s) => s.tasks.currentTaskId);
  const tasks = useAppSelector((s) => s.tasks.tasks);
  const currentTask = currentTaskId
    ? tasks.find((t) => t.id === currentTaskId)
    : null;

  return (
    <div className="h-full w-full flex items-center py-12">
      <div className='flex flex-col max-h-fit items-center justify-center h-screen w-screen gap-14'>
        <section className=" space-y-4 flex justify-center font-semibold -mb-2.5">
          <div className="relative px-6 max-w-full text-center line-clamp-2 text-3xl wrap-break-words">{currentTask && <span>{currentTask.title}</span>}</div>
        </section>
        <CycleDots total={cyclesBeforeLongBreak} completed={cyclesCompleted} />

        <div className="relative">
          <ProgressCircle progress={progress} />
          {/* Timer */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-5xl font-bold">{formatMMSS(secondsLeft)}</div>
            </div>
            <div className="text-center text-2xl font-semibold mt-2">
              <div className="">{PhaseLabel}</div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 items-center">
          <StopIcon className="h-15 w-15 text-black dark:text-white cursor-pointer hover:text-accent hover:scale-110 transition duration-300" onClick={() => dispatch(stopTimerThunk())} />
          {status === "running" ? 
          <PauseIcon className="h-20 w-20 text-black dark:text-white cursor-pointer hover:text-accent hover:scale-110 transition duration-300" onClick={() => dispatch(togglePauseThunk())} />
          :
          <PlayIcon className="h-20 w-20 text-black dark:text-white cursor-pointer hover:text-accent hover:scale-110 transition duration-300" onClick={() => dispatch(togglePauseThunk())} />
          }
          <SkipIcon className="h-15 w-15 text-black dark:text-white cursor-pointer hover:text-accent hover:scale-110 transition duration-300" onClick={() => dispatch(skipPhaseThunk())} />
        </div>
      </div>
    </div>
  );
};
