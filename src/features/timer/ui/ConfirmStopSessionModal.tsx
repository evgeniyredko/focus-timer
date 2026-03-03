import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { stopTimerThunk } from "../model/timerThunks";
import { closeConfirmStopSession } from "../../../app/ui/uiSlice";
import { translate } from "../../../shared/i18n/translate";
import { ConfirmModal } from "../../../shared/ui/ConfirmModal";

export const ConfirmStopSessionModal = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((s) => s.settings.language);
  const isOpen = useAppSelector((state) => state.ui.isConfirmStopSessionOpen);

  return (
    <ConfirmModal
      isOpen={isOpen}
      title={translate("modals", "stopSession", lang)}
      confirmLabel={translate("modals", "stop", lang)}
      cancelLabel={translate("modals", "cancel", lang)}
      onConfirm={() => {
        dispatch(stopTimerThunk());
        dispatch(closeConfirmStopSession());
      }}
      onCancel={() => {
        dispatch(closeConfirmStopSession());
      }}
    />
  );
};
