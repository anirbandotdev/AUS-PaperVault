import { SlidersHorizontal } from "lucide-react";
import { queueIdLabel, getTimeAgo, getDeptShort } from "./reviewUtils";

/**
 * Left sidebar showing pending-queue stats and the scrollable file list.
 */
export default function ReviewQueueSidebar({
  pendingFiles,
  selectedIndex,
  onSelect,
  allDepartments,
  now,
}) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-stats">
        <div className="admin-sidebar-stat">
          <div className="admin-sidebar-stat-label">Pending_Reviews</div>
          <div className="admin-sidebar-stat-value pending">
            {pendingFiles.length}
          </div>
        </div>
      </div>

      <div className="admin-queue-header">
        <span className="admin-queue-title">Queue_Buffer</span>
        <SlidersHorizontal size={14} className="admin-queue-icon" />
      </div>

      <div className="admin-queue-list">
        {pendingFiles.map((item, index) => (
          <button
            key={item._id}
            className={`admin-queue-item ${selectedIndex === index ? "active" : ""}`}
            onClick={() => onSelect(index)}
          >
            <div className="admin-queue-item-top">
              <span className="admin-queue-item-id">
                ID: {queueIdLabel(item._id)}
              </span>
              <span className="admin-queue-item-time">
                {getTimeAgo(item.createdAt, now)}
              </span>
            </div>
            <div className="admin-queue-item-subject">
              {item.subject || "Untitled"}
            </div>
            <div className="admin-queue-item-meta">
              {getDeptShort(item.department, allDepartments)} • Sem{" "}
              {item.semester} • {item.year}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
