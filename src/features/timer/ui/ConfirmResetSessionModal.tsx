import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { stopTimerThunk, resetSessionThunk } from "../model/timerThunks";
import { clearCurrentTask } from "../../tasks/model/tasksSlice";
import { closeConfirmResetSession } from "../../../app/ui/uiSlice";
import { translate } from "../../../shared/i18n/translate";
import { ConfirmModal } from "../../../shared/ui/ConfirmModal";

export const ConfirmResetSessionModal = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((s) => s.settings.language);
  const isOpen = useAppSelector((state) => state.ui.isConfirmResetSessionOpen);

  const handleReset = () => {
    dispatch(stopTimerThunk());
    dispatch(clearCurrentTask());
    dispatch(resetSessionThunk());
    dispatch(closeConfirmResetSession());
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      title={translate("modals", "resetSession", lang)}
      confirmLabel={translate("modals", "reset", lang)}
      cancelLabel={translate("modals", "cancel", lang)}
      onConfirm={handleReset}
      onCancel={() => {
        dispatch(closeConfirmResetSession());
      }}
    />
  );
};
