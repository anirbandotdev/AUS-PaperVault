import { SEMESTERS } from '../../data/departments';
import { getAllPapers } from '../../data/mockPapers';
import './SemesterSelector.css';

export default function SemesterSelector({ departmentId, subject, selectedSemester, onSelect }) {
  const allPapers = getAllPapers();

  return (
    <div className="semester-selector">
      <h3 className="semester-selector-title">Select Semester</h3>
      <div className="semester-grid">
        {SEMESTERS.map((sem) => {
          const count = allPapers.filter(
            (p) =>
              p.department === departmentId &&
              p.subject === subject &&
              p.semester === sem
          ).length;
          return (
            <button
              key={sem}
              className={`semester-btn ${selectedSemester === sem ? 'active' : ''}`}
              onClick={() => onSelect(sem)}
            >
              <span className="semester-btn-num">{sem}</span>
              <span className="semester-btn-label">Sem</span>
              {count > 0 && (
                <span className="semester-btn-count">{count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
