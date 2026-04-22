"use client";

type AlertModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  onClose: () => void;
};

export default function AlertModal({
  open,
  title,
  description,
  confirmLabel = "확인",
  onClose,
}: AlertModalProps) {
  if (!open) return null;

  const titleId = "alert-modal-title";
  const descriptionId = "alert-modal-description";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="w-full max-w-[312px] overflow-hidden rounded-[18px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
      >
        <div className="px-6 py-8 text-center text-[18px] font-bold leading-[1.45] text-[#1f2937]">
          <p id={titleId}>{title}</p>
          {description ? (
            <p id={descriptionId} className="mt-1">
              {description}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          className="flex h-[50px] w-full cursor-pointer items-center justify-center border-t border-[#eceff3] text-[17px] font-bold text-[#12b886]"
          onClick={onClose}
          autoFocus
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}
