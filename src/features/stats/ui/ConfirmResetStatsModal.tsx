import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { closeConfirmResetStats } from "../../../app/ui/uiSlice";
import { resetTodayThunk } from "../model/statsThunks";
import { translate } from "../../../shared/i18n/translate";
import { ConfirmModal } from "../../../shared/ui/ConfirmModal";

export const ConfirmResetStatsModal = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((s) => s.settings.language);
  const isOpen = useAppSelector((state) => state.ui.isConfirmResetStatsOpen);

  return (
    <ConfirmModal
      isOpen={isOpen}
      title={translate("modals", "resetStatistics", lang)}
      confirmLabel={translate("modals", "reset", lang)}
      cancelLabel={translate("modals", "cancel", lang)}
      onConfirm={() => {
        dispatch(resetTodayThunk());
        dispatch(closeConfirmResetStats());
      }}
      onCancel={() => {
        dispatch(closeConfirmResetStats());
      }}
    />
  );
};
