/**
 * Fixed-position toast notification for approve/reject feedback.
 */
export default function ReviewFeedbackToast({ actionFeedback }) {
  if (!actionFeedback) return null;

  const isApproved = actionFeedback.type === "approved";

  return (
    <div
      className="animate-slideUp"
      style={{
        position: "fixed",
        bottom: "5rem",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "0.6rem 1.5rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        letterSpacing: "0.06em",
        zIndex: 100,
        borderRadius: "0.35rem",
        background: isApproved
          ? "rgba(74,222,128,0.15)"
          : "rgba(248,113,113,0.15)",
        border: `1px solid ${
          isApproved ? "rgba(74,222,128,0.4)" : "rgba(248,113,113,0.4)"
        }`,
        color: isApproved
          ? "var(--color-vault-success)"
          : "var(--color-vault-danger)",
        boxShadow: `0 4px 24px ${
          isApproved ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.2)"
        }`,
      }}
    >
      {actionFeedback.message}
    </div>
  );
}
