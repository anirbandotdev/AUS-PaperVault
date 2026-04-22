import { queueIdLabel, getDeptName, getDeptShort } from "./reviewUtils";

/**
 * Header bar above the preview showing file metadata and review context.
 */
export default function ReviewHeader({ selected, currentAdmin, allDepartments }) {
  return (
    <div className="admin-review-header">
      <div className="admin-review-header-left">
        <div className="admin-review-target">
          <span className="admin-review-target-dot" />
          Active_Review_Target :: {queueIdLabel(selected._id)}
        </div>
        <h2 className="admin-review-subject">
          {selected.subject || "Untitled"}
        </h2>
        <div className="admin-review-tags">
          <span className="admin-review-tag primary">
            {getDeptShort(selected.department, allDepartments)}-
            {selected.semester}0{selected.semester}
          </span>
          <span className="admin-review-tag">
            {getDeptName(selected.department, allDepartments)}
          </span>
          <span className="admin-review-tag">
            Semester_{selected.semester}
          </span>
          <span className="admin-review-tag">{selected.year}</span>
        </div>
      </div>
      <div className="admin-review-header-right">
        <div className="admin-review-meta-item">
          <span className="admin-review-meta-label">Uploaded_By</span>
          <span className="admin-review-meta-value">
            {selected.uploadedBy || "Anonymous"}
          </span>
        </div>
        <div className="admin-review-meta-item">
          <span className="admin-review-meta-label">File_Size</span>
          <span className="admin-review-meta-value">
            {selected.fileSize
              ? `${(selected.fileSize / (1024 * 1024)).toFixed(1)} MB`
              : "—"}{" "}
            ({selected.mimeType?.split("/").pop()?.toUpperCase() || "PDF"})
          </span>
        </div>
        <div className="admin-review-meta-item">
          <span className="admin-review-meta-label">Original_File</span>
          <span className="admin-review-meta-value">
            {selected.originalName || selected.fileName || "—"}
          </span>
        </div>
        <div className="admin-review-meta-item">
          <span className="admin-review-meta-label">Reviewed_By</span>
          <span className="admin-review-meta-value admin-review-meta-reviewer">
            {currentAdmin?.username}
          </span>
        </div>
      </div>
    </div>
  );
}
