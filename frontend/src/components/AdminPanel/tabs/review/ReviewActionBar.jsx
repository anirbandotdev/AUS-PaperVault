import { Flag, X, Upload } from "lucide-react";

/**
 * Bottom action bar with Reject / Approve / Flag buttons.
 */
export default function ReviewActionBar({ fileId, onApprove, onReject }) {
  return (
    <div className="admin-action-bar">
      <button
        className="admin-flag-btn"
        title="Flag an issue with this upload"
      >
        <Flag size={13} />
        _Flag_Issue
      </button>
      <div className="admin-action-spacer" />
      <button
        className="admin-reject-btn"
        onClick={() => onReject(fileId)}
      >
        <X size={15} />
        Reject_File
      </button>
      <button
        className="admin-approve-btn"
        onClick={() => onApprove(fileId)}
      >
        <Upload size={15} />
        Confirm_&_Upload
      </button>
    </div>
  );
}
