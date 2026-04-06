import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import departments from '../../data/departments';
import { getPaperCountByDept } from '../../data/mockPapers';
import './DepartmentGrid.css';

export default function DepartmentGrid() {
  return (
    <section className="dept-grid-section" id="departments">
      <div className="container-vault">
        {/* Section Header */}
        <div className="dept-grid-header">
          <div className="dept-grid-label">
            Select Department
          </div>
          <h2 className="dept-grid-title">Browse By Department</h2>
          <p className="dept-grid-subtitle">
            Choose your department to find question papers organized by subject,
            semester, and year.
          </p>
        </div>

        {/* Grid */}
        <div className="dept-grid">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            const paperCount = getPaperCountByDept(dept.id);
            return (
              <Link
                to={`/department/${dept.id}`}
                key={dept.id}
                className="dept-card animate-slideUp"
                style={{
                  '--card-accent': dept.color,
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <div className="dept-card-icon" style={{ color: dept.color }}>
                  <Icon />
                </div>
                <div className="dept-card-short">{dept.shortName}</div>
                <div className="dept-card-name">{dept.name}</div>
                <div className="dept-card-meta">
                  <div className="dept-card-papers">
                    <FileText size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    <span>{paperCount}</span> papers
                  </div>
                  <ArrowRight size={14} className="dept-card-arrow" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
