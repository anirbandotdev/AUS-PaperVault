import { useState, useEffect } from "react";
import { CheckCircle2, Eye, Loader2 } from "lucide-react";
import useReviewQueue from "../../../hooks/useReviewQueue";
import ReviewQueueSidebar from "./review/ReviewQueueSidebar";
import ReviewHeader from "./review/ReviewHeader";
import ReviewPreview from "./review/ReviewPreview";
import ReviewActionBar from "./review/ReviewActionBar";
import ReviewFeedbackToast from "./review/ReviewFeedbackToast";

export default function ReviewTab({ currentAdmin, allDepartments, semestersData }) {
  const [now, setNow] = useState(() => Date.now());
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    pendingFiles,
    isLoading,
    error,
    actionFeedback,
    approveFile,
    rejectFile,
    updateFileTags,
  } = useReviewQueue();

  // Keep relative timestamps fresh
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Clamp selected index when the list shrinks after approve/reject
  useEffect(() => {
    if (selectedIndex >= pendingFiles.length && pendingFiles.length > 0) {
      setSelectedIndex(pendingFiles.length - 1);
    }
  }, [pendingFiles.length, selectedIndex]);

  /* ── Demo fallback when queue is empty ────────────────── */
  const DEMO_FILE = {
    _id: "demo_feedback_pdf",
    subject: "Feedback Form",
    department: allDepartments[0]?.id || "general",
    semester: "1",
    year: new Date().getFullYear().toString(),
    originalName: "FEEDBACK.pdf",
    fileName: "FEEDBACK.pdf",
    fileSize: 175000,
    mimeType: "application/pdf",
    uploadedBy: "System",
    createdAt: new Date().toISOString(),
  };

  const files = pendingFiles.length > 0 ? pendingFiles : [DEMO_FILE];
  const isDemo = pendingFiles.length === 0;
  const selected = files[selectedIndex] || null;

  const handleApprove = async (fileId) => {
    if (isDemo) return; // Don't call API for demo entry
    await approveFile(fileId);
  };

  const handleReject = async (fileId) => {
    if (isDemo) return;
    await rejectFile(fileId);
  };

  const handleUpdateTags = async (fileId, data) => {
    if (isDemo) return;
    await updateFileTags(fileId, data);
  };

  /* ── Loading state ──────────────────────────────────── */
  if (isLoading) {
    return (
      <div className="admin-empty-state">
        <div className="admin-empty-icon">
          <Loader2 className="animate-spin" />
        </div>
        <h2 className="admin-empty-title">Loading Queue…</h2>
        <p className="admin-empty-sub">Fetching pending uploads from server.</p>
      </div>
    );
  }

  /* ── Main review UI ─────────────────────────────────── */
  return (
    <>
      <ReviewQueueSidebar
        pendingFiles={files}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        allDepartments={allDepartments}
        now={now}
      />

      <div className="admin-main">
        {selected ? (
          <>
            <ReviewHeader
              selected={selected}
              currentAdmin={currentAdmin}
              allDepartments={allDepartments}
              onUpdateTags={handleUpdateTags}
            />

            <ReviewPreview selected={selected} />

            <ReviewFeedbackToast actionFeedback={actionFeedback} />

            <ReviewActionBar
              fileId={selected._id}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </>
        ) : (
          <div className="admin-no-selection">
            <div className="admin-no-selection-icon">
              <Eye size={28} />
            </div>
            <p>Select an item from the queue to review</p>
          </div>
        )}
      </div>
    </>
  );
}
