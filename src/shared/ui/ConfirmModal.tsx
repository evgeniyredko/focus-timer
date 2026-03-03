type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({
  isOpen,
  title,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-black rounded-2xl p-4 pt-6 w-100 text-center dark:outline-1 mx-6">
        <p className="text-3xl font-black mb-6">{title}</p>

        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="px-6 py-3 text-xl font-semibold bg-white dark:bg-black border-2 text-black dark:text-white rounded-xl w-full cursor-pointer hover:bg-accent"
          >
            {confirmLabel}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 text-xl font-semibold bg-black dark:bg-white text-white dark:text-black rounded-xl w-full cursor-pointer hover:bg-accent"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
