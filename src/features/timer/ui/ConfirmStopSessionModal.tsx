import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { stopTimerThunk } from "../model/timerThunks";
import { closeConfirmStopSession } from "../../../app/ui/uiSlice";
import { translate } from "../../../shared/i18n/translate";

export const ConfirmStopSessionModal = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((s) => s.settings.language);
  const isOpen = useAppSelector((state) => state.ui.isConfirmStopSessionOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-black rounded-2xl p-4 pt-6 w-100 text-center dark:outline-1 mx-6">
        <p className="text-3xl font-black mb-6">{translate("modals", "stopSession", lang)}</p>

        <div className="flex gap-4">
          <button
            onClick={() => {
              dispatch(stopTimerThunk());
              dispatch(closeConfirmStopSession());
            }}
            className="px-6 py-3 text-xl font-semibold bg-white dark:bg-black border-2 text-black dark:text-white rounded-xl w-full cursor-pointer hover:bg-accent"
          >
            {translate("modals", "stop", lang)}
          </button>
          <button
            onClick={() => {
              dispatch(closeConfirmStopSession());
            }}
            className="px-6 py-3 text-xl font-semibold bg-black dark:bg-white text-white dark:text-black rounded-xl w-full cursor-pointer hover:bg-accent"
          >
            {translate("modals", "cancel", lang)}
          </button>
        </div>
      </div>
    </div>
  );
};
