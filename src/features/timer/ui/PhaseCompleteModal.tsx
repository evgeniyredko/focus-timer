import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { openMain, closePhaseCompleteModal } from "../../../app/ui/uiSlice";

import DoneIcon from "../../../assets/icons/done.svg?react";

export const PhaseCompleteModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isPhaseCompleteModalOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-black rounded-2xl p-4 pt-6 w-60 text-center dark:outline-1">
        <DoneIcon className="h-30 w-30 text-black dark:text-white justify-self-center" />
        <p className="text-3xl font-black mb-4">DONE</p>

        <button
          onClick={() => {
            dispatch(closePhaseCompleteModal());
            dispatch(openMain());
          }}
          className="px-6 py-3 text-xl font-semibold bg-black dark:bg-white text-white dark:text-black rounded-xl w-full cursor-pointer hover:bg-accent"
        >
          continue
        </button>
      </div>
    </div>
  );
};
