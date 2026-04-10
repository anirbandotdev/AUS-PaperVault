import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X } from "lucide-react";

/**
 * Styled confirmation modal for destructive actions.
 *
 * Props:
 *   open      – boolean
 *   title     – heading text
 *   message   – body text (string or JSX)
 *   onConfirm – callback on "Yes, Delete"
 *   onCancel  – callback on "Cancel" or backdrop click
 *   confirmLabel – override the confirm button text (default "Yes, Delete")
 *   variant   – "danger" (default) | "warning"
 */
export default function ConfirmModal({
  open,
  title = "Confirm Deletion",
  message = "This action cannot be undone. Are you sure?",
  onConfirm,
  onCancel,
  confirmLabel = "Yes, Delete",
  variant = "danger",
}) {
  const cancelRef = useRef(null);

  // Focus the cancel button when the modal opens
  useEffect(() => {
    if (open && cancelRef.current) {
      cancelRef.current.focus();
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onCancel?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  const isDanger = variant === "danger";

  return createPortal(
    <div className="confirm-modal-overlay" onClick={onCancel}>
      <div
        className="confirm-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-desc"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div
          className="confirm-modal-icon"
          style={{
            background: isDanger
              ? "rgba(248, 113, 113, 0.1)"
              : "rgba(251, 191, 36, 0.1)",
            borderColor: isDanger
              ? "rgba(248, 113, 113, 0.3)"
              : "rgba(251, 191, 36, 0.3)",
          }}
        >
          <AlertTriangle
            size={28}
            color={isDanger ? "#f87171" : "#fbbf24"}
          />
        </div>

        {/* Title */}
        <h3 id="confirm-modal-title" className="confirm-modal-title">
          {title}
        </h3>

        {/* Message */}
        <p id="confirm-modal-desc" className="confirm-modal-message">
          {message}
        </p>

        {/* Actions */}
        <div className="confirm-modal-actions">
          <button
            type="button"
            className="confirm-modal-cancel"
            ref={cancelRef}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`confirm-modal-confirm ${isDanger ? "confirm-modal-confirm--danger" : "confirm-modal-confirm--warning"}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>

        {/* Close X */}
        <button
          type="button"
          className="confirm-modal-close"
          onClick={onCancel}
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>,
    document.body,
  );
}
