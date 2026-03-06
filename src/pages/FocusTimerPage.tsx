import { useAppSelector } from "../app/store/hooks";
import { RunningPanel } from "../features/timer/ui/RunningPanel";
import { MainPanel } from "../features/timer/ui/MainPanel";
import { SettingsPanel } from "../features/settings/ui/SettingsPanel";
import { PhaseCompleteModal } from "../features/timer/ui/PhaseCompleteModal";
import { TasksStatsModal } from "../features/tasks/ui/TasksStatsModal";
import { ConfirmResetStatsModal } from "../features/stats/ui/ConfirmResetStatsModal";
import { ConfirmResetSessionModal } from "../features/timer/ui/ConfirmResetSessionModal";
import { ConfirmSkipSessionModal } from "../features/timer/ui/ConfirmSkipSessionModal";
import { ConfirmStopSessionModal } from "../features/timer/ui/ConfirmStopSessionModal";
import { useApplyTheme } from "../shared/lib/theme";

export const FocusTimerPage = () => {
  const view = useAppSelector((s) => s.ui.view);
  useApplyTheme();

  const translateClass =
    view === "timer" ? "translate-x-0" : view === "main" ? "-translate-x-1/3" : "-translate-x-2/3";

  return (
    <div className="fixed inset-0 overflow-hidden bg-white dark:bg-black text-black dark:text-white">
      <div
        className={`flex h-full w-[300%] transform transition-transform duration-300 ease-out ${translateClass}`}
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <section className="h-full w-screen shrink-0">
          <RunningPanel />
        </section>
        <section className="h-full w-screen shrink-0">
          <MainPanel />
        </section>
        <section className="h-full w-screen shrink-0">
          <SettingsPanel />
        </section>
      </div>
      <PhaseCompleteModal />
      <TasksStatsModal />
      <ConfirmResetStatsModal />
      <ConfirmResetSessionModal />
      <ConfirmSkipSessionModal />
      <ConfirmStopSessionModal />
    </div>
  );
};
