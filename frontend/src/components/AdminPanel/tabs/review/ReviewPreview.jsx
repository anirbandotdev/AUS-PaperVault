import feedbackPdf from "../FEEDBACK.pdf";

/**
 * PDF preview area.
 * Always embeds the bundled FEEDBACK.pdf as a preview example.
 * When the backend adds a file-serving endpoint (e.g. GET /files/view/:id),
 * replace `feedbackPdf` with the constructed URL.
 */
export default function ReviewPreview({ selected }) {
  // TODO: When backend adds a file-serving route, use:
  //   const previewUrl = `${API_BASE}/files/view/${selected?._id}`;
  const previewUrl = feedbackPdf;

  return (
    <div className="admin-preview-area">
      <div className="admin-preview-embed">
        <iframe
          src={previewUrl}
          title={`Preview: ${selected?.originalName || selected?.fileName || "Document"}`}
          className="admin-preview-iframe"
        />
        <div className="admin-preview-overlay-label">
          [ DOCUMENT_PREVIEW :: {selected?.originalName || selected?.fileName || "FEEDBACK.pdf"} ]
        </div>
      </div>
    </div>
  );
}
