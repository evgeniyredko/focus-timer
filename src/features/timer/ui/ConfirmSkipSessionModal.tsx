import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { skipPhaseThunk } from "../model/timerThunks";
import { closeConfirmSkipSession } from "../../../app/ui/uiSlice";
import { translate } from "../../../shared/i18n/translate";
import { ConfirmModal } from "../../../shared/ui/ConfirmModal";

export const ConfirmSkipSessionModal = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((s) => s.settings.language);
  const isOpen = useAppSelector((state) => state.ui.isConfirmSkipSessionOpen);

  return (
    <ConfirmModal
      isOpen={isOpen}
      title={translate("modals", "skipSession", lang)}
      confirmLabel={translate("modals", "skip", lang)}
      cancelLabel={translate("modals", "cancel", lang)}
      onConfirm={() => {
        dispatch(skipPhaseThunk());
        dispatch(closeConfirmSkipSession());
      }}
      onCancel={() => {
        dispatch(closeConfirmSkipSession());
      }}
    />
  );
};
