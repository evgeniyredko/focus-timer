import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { closeTasksModal } from "../../../app/ui/uiSlice";
import { formatHHMMSS } from "../../../shared/lib/time";
import { translate } from "../../../shared/i18n/translate";
import { selectTodayTasksSorted } from "../model/selectors";

export const TasksStatsModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isTasksModalOpen);
  const tasksFiltered = useAppSelector(selectTodayTasksSorted);
  const lang = useAppSelector((s) => s.settings.language);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-black rounded-2xl p-4 pt-6 w-150 m-6 text-center dark:outline-1">
        <div className="text-3xl pb-4 border-b font-bold">
          {translate("statistic", "today", lang)}
        </div>
        {tasksFiltered.length === 0 ? (
          <div className="text-center mt-4 text-2xl font-semibold">
            {translate("statistic", "noTasks", lang)}
          </div>
        ) : (
          tasksFiltered.map((task) => (
            <div key={task.id} className="flex justify-between pt-1 pb-1.5 text-2xl border-b">
              <span className="text-left w-full border-r pr-2 pl-1 font-semibold">
                {task.title}
              </span>
              <span className="pl-2 pr-1 font-semibold">
                {formatHHMMSS(task.todaySecondsSpent)}
              </span>
            </div>
          ))
        )}
        <button
          onClick={() => {
            dispatch(closeTasksModal());
          }}
          className="px-6 py-3 text-xl mt-4 font-semibold bg-black dark:bg-white text-white dark:text-black rounded-xl w-full cursor-pointer hover:bg-accent"
        >
          {translate("statistic", "close", lang)}
        </button>
      </div>
    </div>
  );
};
