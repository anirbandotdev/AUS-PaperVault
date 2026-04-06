import { useState } from 'react';
import { useParams } from 'react-router-dom';
import departments from '../data/departments';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import SubjectSelector from '../components/SubjectSelector/SubjectSelector';
import SemesterSelector from '../components/SemesterSelector/SemesterSelector';
import PaperList from '../components/PaperList/PaperList';
import './DepartmentPage.css';

export default function DepartmentPage() {
  const { deptId } = useParams();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const department = departments.find((d) => d.id === deptId);

  if (!department) {
    return (
      <div className="page-enter">
        <div className="container-vault" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-vault-danger)', marginBottom: '1rem' }}>
            Department Not Found
          </h1>
          <p style={{ color: 'var(--color-vault-gray)' }}>
            The department you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  const Icon = department.icon;

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: department.name, to: selectedSubject ? `/department/${deptId}` : null },
  ];
  if (selectedSubject) {
    breadcrumbItems.push({
      label: selectedSubject,
      to: selectedSemester ? `/department/${deptId}` : null,
    });
  }
  if (selectedSemester) {
    breadcrumbItems.push({ label: `Semester ${selectedSemester}` });
  }

  return (
    <div className="page-enter">
      <div className="container-vault dept-page">
        <Breadcrumb items={breadcrumbItems} />

        {/* Department Header */}
        <div className="dept-page-header">
          <div className="dept-page-icon" style={{ color: department.color }}>
            <Icon />
          </div>
          <div>
            <h1 className="dept-page-title">{department.name}</h1>
            <p className="dept-page-short">{department.shortName}</p>
          </div>
        </div>

        {/* Step 1: Subject Selection */}
        <SubjectSelector
          subjects={department.subjects}
          departmentId={department.id}
          selectedSubject={selectedSubject}
          onSelect={(sub) => {
            setSelectedSubject(sub);
            setSelectedSemester(null);
          }}
        />

        {/* Step 2: Semester Selection (after subject) */}
        {selectedSubject && (
          <div className="animate-slideUp">
            <SemesterSelector
              departmentId={department.id}
              subject={selectedSubject}
              selectedSemester={selectedSemester}
              onSelect={setSelectedSemester}
            />
          </div>
        )}

        {/* Step 3: Paper List (after subject + semester) */}
        {selectedSubject && selectedSemester && (
          <div className="animate-slideUp">
            <PaperList
              departmentId={department.id}
              subject={selectedSubject}
              semester={selectedSemester}
            />
          </div>
        )}
      </div>
    </div>
  );
}
