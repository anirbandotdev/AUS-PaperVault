import { useState, useEffect } from "react";
import { Activity, DownloadCloud, FileText, Users, MessageSquare, Upload, Clock, Loader2 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { apiFetch } from "../../../api/api";

export default function AnalyticsTab({ allDepartments }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        const res = await apiFetch("/files/analytics", "GET", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.success && res.analytics) {
          setAnalytics(res.analytics);
        } else {
          setError(res.message || "Failed to fetch analytics");
        }
      } catch (err) {
        setError(err.message || "Network error");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  // ─── Loading Skeleton ──────────────────────────────────
  if (loading) {
    return (
      <div
        className="admin-analytics-section animate-slideUp"
        style={{ padding: "2rem", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ textAlign: "center" }}>
          <Loader2
            size={32}
            style={{ color: "var(--color-vault-lavender)", animation: "spin 1s linear infinite" }}
          />
          <p style={{ color: "var(--color-vault-steel)", marginTop: "1rem", fontSize: "0.9rem" }}>
            Loading analytics data...
          </p>
        </div>
      </div>
    );
  }

  // ─── Error State ───────────────────────────────────────
  if (error) {
    return (
      <div
        className="admin-analytics-section animate-slideUp"
        style={{ padding: "2rem", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div className="glass-card" style={{ padding: "2rem", textAlign: "center", maxWidth: "400px" }}>
          <p style={{ color: "var(--color-vault-danger)", marginBottom: "0.5rem", fontWeight: "600" }}>
            Failed to load analytics
          </p>
          <p style={{ color: "var(--color-vault-steel)", fontSize: "0.85rem" }}>{error}</p>
        </div>
      </div>
    );
  }

  // ─── Computed values ───────────────────────────────────
  const {
    totalUploads = 0,
    pendingReview = 0,
    approved = 0,
    totalDownloads = 0,
    totalUsers = 0,
    totalFeedback = 0,
    departmentStats = [],
    weeklyTraffic = [],
    recentUploads = [],
  } = analytics || {};

  // Use live department stats if available, otherwise fall back to allDepartments prop
  const deptChartData =
    departmentStats.length > 0
      ? departmentStats
      : allDepartments.map((dept) => ({ name: dept.shortName, papers: 0 }));

  // Format large numbers with commas
  const fmt = (n) => Number(n).toLocaleString();

  // Format relative time
  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <div
      className="admin-analytics-section animate-slideUp"
      style={{ padding: "2rem", height: "100%", overflowY: "auto" }}
    >
      <h2
        className="admin-departments-title"
        style={{ marginBottom: "2rem" }}
      >
        Vault_Analytics{" "}
        <Activity
          size={18}
          style={{
            display: "inline",
            marginLeft: "0.5rem",
            color: "var(--color-vault-lavender)",
          }}
        />
      </h2>

      {/* ═══ Top Stat Cards ═══ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div className="glass-card" style={{ padding: "1.5rem", borderLeft: "3px solid var(--color-vault-lavender)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "var(--color-vault-steel)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            <Upload size={13} /> Total Uploads
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", fontFamily: "var(--font-heading)", color: "var(--color-vault-text)" }}>{fmt(totalUploads)}</div>
        </div>
        <div className="glass-card" style={{ padding: "1.5rem", borderLeft: "3px solid var(--color-vault-warning)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "var(--color-vault-steel)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            <Clock size={13} /> Pending Review
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", fontFamily: "var(--font-heading)", color: "var(--color-vault-text)" }}>{fmt(pendingReview)}</div>
        </div>
        <div className="glass-card" style={{ padding: "1.5rem", borderLeft: "3px solid var(--color-vault-success)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "var(--color-vault-steel)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            <FileText size={13} /> Approved
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", fontFamily: "var(--font-heading)", color: "var(--color-vault-text)" }}>{fmt(approved)}</div>
        </div>
        <div className="glass-card" style={{ padding: "1.5rem", borderLeft: "3px solid #3b82f6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "var(--color-vault-steel)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            <DownloadCloud size={13} /> Total Downloads
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", fontFamily: "var(--font-heading)", color: "var(--color-vault-text)" }}>{fmt(totalDownloads)}</div>
        </div>
        <div className="glass-card" style={{ padding: "1.5rem", borderLeft: "3px solid #a78bfa" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "var(--color-vault-steel)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            <Users size={13} /> Registered Users
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", fontFamily: "var(--font-heading)", color: "var(--color-vault-text)" }}>{fmt(totalUsers)}</div>
        </div>
        <div className="glass-card" style={{ padding: "1.5rem", borderLeft: "3px solid #f59e0b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "var(--color-vault-steel)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            <MessageSquare size={13} /> Feedback
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", fontFamily: "var(--font-heading)", color: "var(--color-vault-text)" }}>{fmt(totalFeedback)}</div>
        </div>
      </div>

      {/* ═══ Charts Grid ═══ */}
      <div
        className="admin-analytics-grid"
        style={{ marginBottom: "2rem" }}
      >
        {/* Weekly Upload Distribution */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1rem",
              color: "var(--color-vault-steel)",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Upload size={16} /> Weekly Upload Activity (Last 30 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyTraffic}>
              <defs>
                <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#afb3f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#afb3f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#607b96"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#607b96"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "rgba(22, 26, 34, 0.95)",
                  border: "1px solid rgba(175, 179, 247, 0.2)",
                  borderRadius: "8px",
                  color: "var(--color-vault-text)",
                }}
                itemStyle={{ color: "var(--color-vault-text)" }}
              />
              <Area
                type="monotone"
                dataKey="uploads"
                stroke="#afb3f7"
                fillOpacity={1}
                fill="url(#colorUploads)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Papers by Department */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1rem",
              color: "var(--color-vault-steel)",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FileText size={16} /> Approved Papers by Department
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deptChartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#607b96"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#607b96"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "rgba(22, 26, 34, 0.95)",
                  border: "1px solid rgba(175, 179, 247, 0.2)",
                  borderRadius: "8px",
                  color: "var(--color-vault-text)",
                }}
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
              />
              <Bar dataKey="papers" fill="#92bcea" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ═══ Recent Uploads Table ═══ */}
      {recentUploads.length > 0 && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1rem",
              color: "var(--color-vault-steel)",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Activity size={16} /> Recent Uploads
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <th style={thStyle}>Subject</th>
                  <th style={thStyle}>Department</th>
                  <th style={thStyle}>Semester</th>
                  <th style={thStyle}>Year</th>
                  <th style={thStyle}>Uploaded By</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>When</th>
                </tr>
              </thead>
              <tbody>
                {recentUploads.map((file) => (
                  <tr
                    key={file.id}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <td style={tdStyle}>{file.subject}</td>
                    <td style={tdStyle}>
                      <span style={{
                        background: "rgba(var(--color-vault-lavender-rgb), 0.15)",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                      }}>
                        {file.department}
                      </span>
                    </td>
                    <td style={tdStyle}>Sem {file.semester}</td>
                    <td style={tdStyle}>{file.year}</td>
                    <td style={tdStyle}>{file.uploadedBy}</td>
                    <td style={tdStyle}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontSize: "0.7rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        color: file.isApproved ? "var(--color-vault-success)" : "var(--color-vault-warning)",
                      }}>
                        <span style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: file.isApproved ? "var(--color-vault-success)" : "var(--color-vault-warning)",
                        }} />
                        {file.isApproved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, color: "var(--color-vault-gray)" }}>{timeAgo(file.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Table cell styles ──────────────────────────────────────
const thStyle = {
  textAlign: "left",
  padding: "0.75rem 0.75rem",
  color: "var(--color-vault-gray)",
  fontWeight: "600",
  fontSize: "0.7rem",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "0.75rem 0.75rem",
  color: "var(--color-vault-text)",
  whiteSpace: "nowrap",
};
