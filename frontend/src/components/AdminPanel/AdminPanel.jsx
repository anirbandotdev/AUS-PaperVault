import { useState } from 'react';
import { Shield, Lock, CheckCircle2, XCircle, FileText, Inbox } from 'lucide-react';
import departments from '../../data/departments';
import {
  getPendingUploads,
  getApprovedPapers,
  approveUpload,
  rejectUpload,
  getTotalPaperCount,
} from '../../data/mockPapers';
import './AdminPanel.css';

const ADMIN_PASSWORD = 'ausvault2024';

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, forceUpdate] = useState(0);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError('');
    } else {
      setError('Invalid password. Access denied.');
    }
  };

  const handleApprove = (id) => {
    approveUpload(id);
    forceUpdate((n) => n + 1);
  };

  const handleReject = (id) => {
    rejectUpload(id);
    forceUpdate((n) => n + 1);
  };

  if (!authed) {
    return (
      <div className="admin-wrapper">
        <div className="admin-title-section">
          <div className="admin-badge">
            <Shield size={14} />
            Restricted Access
          </div>
          <h1 className="admin-title">Admin Panel</h1>
          <p className="admin-subtitle">Authenticate to manage uploads</p>
        </div>

        <div className="admin-auth glass-card">
          <div className="admin-auth-icon">
            <Lock />
          </div>
          <h2 className="admin-auth-title">Enter Admin Password</h2>
          <form className="admin-auth-form" onSubmit={handleLogin}>
            <input
              type="password"
              className="input-cyber"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <div className="admin-auth-error">{error}</div>}
            <button type="submit" className="btn-cyber-solid" style={{ justifyContent: 'center' }}>
              <Shield size={14} />
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  const pending = getPendingUploads();
  const approved = getApprovedPapers();
  const totalPapers = getTotalPaperCount();

  const getDeptName = (id) => {
    const dept = departments.find((d) => d.id === id);
    return dept ? dept.shortName : id;
  };

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-title-section">
        <div className="admin-badge">
          <Shield size={14} />
          Admin Dashboard
        </div>
        <h1 className="admin-title">Manage Uploads</h1>
        <p className="admin-subtitle">Review, approve, or reject submitted papers</p>
      </div>

      {/* Stats */}
      <div className="admin-stats-row">
        <div className="admin-stat-card glass-card">
          <div className="admin-stat-value">{totalPapers}</div>
          <div className="admin-stat-label">Total Papers</div>
        </div>
        <div className="admin-stat-card glass-card">
          <div className="admin-stat-value" style={{ color: 'var(--color-vault-warning)' }}>
            {pending.length}
          </div>
          <div className="admin-stat-label">Pending</div>
        </div>
        <div className="admin-stat-card glass-card">
          <div className="admin-stat-value" style={{ color: 'var(--color-vault-success)' }}>
            {approved.length}
          </div>
          <div className="admin-stat-label">Approved</div>
        </div>
      </div>

      {/* Pending Uploads */}
      <h2 className="admin-section-title">Pending Uploads</h2>

      {pending.length === 0 ? (
        <div className="admin-empty glass-card" style={{ padding: '2rem' }}>
          <div className="admin-empty-icon">
            <Inbox />
          </div>
          <p>No pending uploads. All clear!</p>
        </div>
      ) : (
        <div className="pending-list">
          {pending.map((upload) => (
            <div key={upload.id} className="pending-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                <div style={{
                  width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(175,179,247,0.08)', border: '1px solid rgba(175,179,247,0.12)', flexShrink: 0
                }}>
                  <FileText size={18} style={{ color: 'var(--color-vault-lavender)' }} />
                </div>
                <div className="pending-card-info">
                  <div className="pending-card-subject">{upload.subject}</div>
                  <div className="pending-card-meta">
                    <span className="pending-tag">{getDeptName(upload.department)}</span>
                    <span className="pending-tag">Sem {upload.semester}</span>
                    <span className="pending-tag">{upload.year}</span>
                    <span className="pending-tag">{upload.fileName}</span>
                  </div>
                  <div className="pending-card-time">
                    Submitted: {formatDate(upload.submittedAt)}
                  </div>
                </div>
              </div>
              <div className="pending-card-actions">
                <button
                  className="btn-cyber"
                  style={{ color: 'var(--color-vault-success)', borderColor: 'rgba(74,222,128,0.3)' }}
                  onClick={() => handleApprove(upload.id)}
                >
                  <CheckCircle2 size={14} />
                  Approve
                </button>
                <button className="btn-cyber-danger" onClick={() => handleReject(upload.id)}>
                  <XCircle size={14} />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
