import { useState } from 'react';
import { FileText, Download, FolderOpen } from 'lucide-react';
import { YEARS } from '../../data/departments';
import { getAllPapers } from '../../data/mockPapers';
import './PaperList.css';

export default function PaperList({ departmentId, subject, semester }) {
  const [selectedYear, setSelectedYear] = useState(null);

  const allPapers = getAllPapers();
  const filtered = allPapers.filter(
    (p) =>
      p.department === departmentId &&
      p.subject === subject &&
      p.semester === semester &&
      (selectedYear ? p.year === selectedYear : true)
  );

  return (
    <div className="paper-list">
      <div className="paper-list-header">
        <h3 className="paper-list-title">
          Question Papers {filtered.length > 0 && `(${filtered.length})`}
        </h3>
        <div className="year-tabs">
          <button
            className={`year-tab-all ${!selectedYear ? 'active' : ''}`}
            onClick={() => setSelectedYear(null)}
          >
            All Years
          </button>
          {YEARS.map((year) => (
            <button
              key={year}
              className={`year-tab ${selectedYear === year ? 'active' : ''}`}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="paper-empty">
          <div className="paper-empty-icon">
            <FolderOpen />
          </div>
          <p className="paper-empty-text">No papers found</p>
          <p className="paper-empty-sub">
            {selectedYear
              ? `No papers available for ${selectedYear}. Try another year.`
              : 'No papers uploaded for this combination yet.'}
          </p>
        </div>
      ) : (
        <div className="paper-cards">
          {filtered.map((paper) => (
            <div key={paper.id} className="paper-card">
              <div className="paper-card-icon">
                <FileText />
              </div>
              <div className="paper-card-info">
                <div className="paper-card-subject">{paper.subject}</div>
                <div className="paper-card-meta">
                  <span className="paper-card-tag">
                    Year: <span>{paper.year}</span>
                  </span>
                  <span className="paper-card-tag">
                    Sem: <span>{paper.semester}</span>
                  </span>
                  <span className="paper-card-tag">
                    {paper.fileName}
                  </span>
                </div>
              </div>
              <button className="paper-card-download" title="Download paper">
                <Download size={12} />
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
