import { useState, useEffect, useCallback } from "react";
import { getDepartments, SEMESTERS } from "../data/departments";
import { getApprovedPapers } from "../data/mockPapers";

/**
 * Custom hook to use departments with reactive updates
 * Automatically refetches departments when they change in localStorage
 * @returns {Array} Array of department objects with live updates
 */
export function useDepartments() {
  const [departments, setDepartments] = useState(() => getDepartments());

  // Listen for storage changes (from other tabs/windows or the admin panel)
  useEffect(() => {
    const handleStorageChange = () => {
      setDepartments(getDepartments());
    };

    const handleDepartmentsUpdate = () => {
      setDepartments(getDepartments());
    };

    // Listen to storage changes from other components/tabs
    window.addEventListener("storage", handleStorageChange);
    // Listen to custom event from admin panel (same-tab updates)
    window.addEventListener("departmentsUpdated", handleDepartmentsUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("departmentsUpdated", handleDepartmentsUpdate);
    };
  }, []);

  return departments;
}

/**
 * Get a specific department by ID with reactive updates
 * @param {string} deptId - Department ID to find
 * @returns {Object|null} Department object or null if not found
 */
export function useDepartment(deptId) {
  const allDepartments = useDepartments();
  return allDepartments.find((d) => d.id === deptId) || null;
}

/**
 * Custom hook to use semesters with reactive updates
 * Automatically refetches semesters when they change in localStorage
 * @returns {Array} Array of semester numbers with live updates
 */
export function useSemesters() {
  const [semesters, setSemesters] = useState(() => {
    const stored = localStorage.getItem("aus_vault_semesters");
    return stored ? JSON.parse(stored) : SEMESTERS;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("aus_vault_semesters");
      setSemesters(stored ? JSON.parse(stored) : SEMESTERS);
    };

    const handleSemestersUpdate = () => {
      const stored = localStorage.getItem("aus_vault_semesters");
      setSemesters(stored ? JSON.parse(stored) : SEMESTERS);
    };

    // Listen to storage changes from other tabs/windows
    window.addEventListener("storage", handleStorageChange);
    // Listen to custom event from admin panel (same-tab updates)
    window.addEventListener("semestersUpdated", handleSemestersUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("semestersUpdated", handleSemestersUpdate);
    };
  }, []);

  return semesters;
}

/**
 * Custom hook to use approved papers with reactive updates
 * Automatically refetches papers when they change in localStorage
 * @returns {Array} Array of approved question papers with live updates
 */
export function useApprovedPapers() {
  const [papers, setPapers] = useState(() => getApprovedPapers());

  useEffect(() => {
    const handleStorageChange = () => {
      setPapers(getApprovedPapers());
    };

    const handlePapersUpdate = () => {
      setPapers(getApprovedPapers());
    };

    // Listen to storage changes from other tabs/windows
    window.addEventListener("storage", handleStorageChange);
    // Listen to custom event from admin panel (same-tab updates)
    window.addEventListener("papersUpdated", handlePapersUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("papersUpdated", handlePapersUpdate);
    };
  }, []);

  return papers;
}
