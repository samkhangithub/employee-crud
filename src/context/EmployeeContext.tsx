// src/context/EmployeeContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import type  { Employee } from "../types";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

type EmployeeContextType = {
  employees: Employee[];
  loading: boolean;
  addEmployee: (employee: Employee) => Promise<void>;
  updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
};

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

// Custom hook for easy access
export const useEmployeesContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployeesContext must be used within EmployeeProvider");
  }
  return context;
};

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for real-time updates
    const q = query(collection(db, "employees"), orderBy("firstName"));
    const unsub = onSnapshot(q, (snapshot) => {
      const list: Employee[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Employee),
      }));
      setEmployees(list);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Create
  const addEmployee = async (employee: Employee) => {
    await addDoc(collection(db, "employees"), employee);
  };

  // Update
  const updateEmployee = async (id: string, employee: Partial<Employee>) => {
    const ref = doc(db, "employees", id);
    await updateDoc(ref, employee);
  };

  // Delete
  const deleteEmployee = async (id: string) => {
    const ref = doc(db, "employees", id);
    await deleteDoc(ref);
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, loading, addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
