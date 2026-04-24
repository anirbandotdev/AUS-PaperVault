import { useState } from "react";
import { addDepartment, deleteDepartment, getDepartments } from "../../../data/departments";
import { notifySuperAdminEvent } from "../../../data/adminNotifications";
import ConfirmModal from "../ConfirmModal";
import DepartmentsHeader from "./departments/DepartmentsHeader";
import DepartmentsAddForm from "./departments/DepartmentsAddForm";
import DepartmentsEditForm from "./departments/DepartmentsEditForm";
import DepartmentsList from "./departments/DepartmentsList";

export default function DepartmentsTab({ allDepartments, setAllDepartments }) {
  const [showAddDeptForm, setShowAddDeptForm] = useState(false);
  const [editingDeptId, setEditingDeptId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [deptError, setDeptError] = useState("");
  const [deptSuccess, setDeptSuccess] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [newDeptForm, setNewDeptForm] = useState({
    name: "",
    shortName: "",
    color: "#92bcea",
    semesters: 8,
  });

  const [editDeptForm, setEditDeptForm] = useState({
    name: "",
    shortName: "",
    color: "#92bcea",
    semesters: 8,
  });

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    setDeptError("");
    setDeptSuccess("");

    if (!newDeptForm.name.trim()) {
      setDeptError("Department name is required");
      return;
    }
    if (!newDeptForm.shortName.trim()) {
      setDeptError("Short name is required");
      return;
    }

    try {
      const fullName = newDeptForm.name.toLowerCase().replace(/\s+/g, "-");
      const semesterCount = parseInt(newDeptForm.semesters) || 8;

      const success = await addDepartment({
        fullName: newDeptForm.name,
        shortName: newDeptForm.shortName.toUpperCase(),
        color: newDeptForm.color,
        semesterCount,
      });
      if(!success) {
        throw new Error("Error in adding department")
      }
      const depts = await getDepartments()
      setAllDepartments(depts);
      window.dispatchEvent(new Event("departmentsUpdated"));

      notifySuperAdminEvent({
        title: "Department added",
        body: `Created "${newDeptForm.name}" (${newDeptForm.shortName.toUpperCase()}).`,
        linkTab: "departments",
        type: "department",
      });

      setNewDeptForm({
        name: "",
        shortName: "",
        color: "#92bcea",
        semesters: 8,
      });
      setShowAddDeptForm(false);
      setDeptSuccess("Department added successfully! ✓");

      setTimeout(() => setDeptSuccess(""), 3000);
    } catch (err) {
      setDeptError(err.message);
    }
  };

  const handleEditDepartment = (dept) => {
    setEditingDeptId(dept.id);
    setEditDeptForm({
      name: dept.name,
      shortName: dept.shortName,
      color: dept.color,
      semesters: dept.semesterCount || 8,
    });
    setShowEditForm(true);
    setDeptError("");
  };

  const handleSaveEditDepartment = (e) => {
    e.preventDefault();
    setDeptError("");
    setDeptSuccess("");

    if (!editDeptForm.name.trim()) {
      setDeptError("Department name is required");
      return;
    }
    if (!editDeptForm.shortName.trim()) {
      setDeptError("Short name is required");
      return;
    }

    try {
      const updatedDepts = allDepartments.map((dept) => {
        if (dept.id === editingDeptId) {
          return {
            ...dept,
            name: editDeptForm.name,
            shortName: editDeptForm.shortName.toUpperCase(),
            color: editDeptForm.color,
            semesterCount: parseInt(editDeptForm.semesters) || 8,
          };
        }
        return dept;
      });

      const serializeDepts = updatedDepts.map((dept) => ({
        ...dept,
        iconName: dept.icon?.name || "Monitor",
      }));

      localStorage.setItem("aus_vault_departments", JSON.stringify(serializeDepts));
      setAllDepartments(updatedDepts);
      window.dispatchEvent(new Event("departmentsUpdated"));

      notifySuperAdminEvent({
        title: "Department updated",
        body: `Saved changes for "${editDeptForm.name}".`,
        linkTab: "departments",
        type: "department",
      });

      setEditingDeptId(null);
      setShowEditForm(false);
      setDeptSuccess("Department updated successfully! ✓");

      setTimeout(() => setDeptSuccess(""), 3000);
    } catch (err) {
      setDeptError(err.message);
    }
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setEditingDeptId(null);
    setEditDeptForm({
      name: "",
      shortName: "",
      color: "#92bcea",
      semesters: 8,
    });
    setDeptError("");
  };

  const handleDeleteDepartment = (dept) => {
    setConfirmDelete(dept);
  };

  const executeDeleteDepartment = () => {
    const dept = confirmDelete;
    if (!dept) return;
    setConfirmDelete(null);

    try {
      deleteDepartment(dept.id);
      setAllDepartments(getDepartments());
      window.dispatchEvent(new Event("departmentsUpdated"));
      notifySuperAdminEvent({
        title: "Department removed",
        body: `Deleted department "${dept.name}".`,
        linkTab: "departments",
        type: "department",
      });
      setDeptSuccess(`Department "${dept.name}" deleted successfully! ✓`);
      setTimeout(() => setDeptSuccess(""), 3000);
    } catch (err) {
      setDeptError("Failed to delete department: " + err.message);
      setTimeout(() => setDeptError(""), 3000);
    }
  };

  return (
    <div className="admin-departments-section">
      <ConfirmModal
        open={!!confirmDelete}
        title="Delete Department"
        message={confirmDelete ? `Are you sure you want to permanently delete "${confirmDelete.name}" (${confirmDelete.shortName})? All associated data will be lost. This action cannot be undone.` : ""}
        confirmLabel="Yes, Delete"
        onConfirm={executeDeleteDepartment}
        onCancel={() => setConfirmDelete(null)}
      />
      
      <DepartmentsHeader 
        showAddDeptForm={showAddDeptForm} 
        setShowAddDeptForm={setShowAddDeptForm} 
      />

      {showAddDeptForm && (
        <DepartmentsAddForm
          handleAddDepartment={handleAddDepartment}
          newDeptForm={newDeptForm}
          setNewDeptForm={setNewDeptForm}
          deptError={deptError}
          setDeptError={setDeptError}
          deptSuccess={deptSuccess}
          setShowAddDeptForm={setShowAddDeptForm}
        />
      )}

      {showEditForm && (
        <DepartmentsEditForm
          handleSaveEditDepartment={handleSaveEditDepartment}
          editDeptForm={editDeptForm}
          setEditDeptForm={setEditDeptForm}
          deptError={deptError}
          deptSuccess={deptSuccess}
          handleCancelEdit={handleCancelEdit}
        />
      )}

      <DepartmentsList
        allDepartments={allDepartments}
        handleEditDepartment={handleEditDepartment}
        handleDeleteDepartment={handleDeleteDepartment}
      />
    </div>
  );
}
