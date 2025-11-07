import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface Employee {
  id?: string;
  name: string;
  email: string;
  position: string;
  salary: string;
}

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (emp: Employee) => Promise<void>;
  updateEmployee: (id: string, emp: Employee) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextType | null>(null);

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context)
    throw new Error("useEmployees must be used within EmployeeProvider");
  return context;
};

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Employee[];
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async (emp: Employee) => {
    await addDoc(collection(db, "employees"), emp);
    fetchEmployees();
  };

  const updateEmployee = async (id: string, emp: Employee) => {
    const empRef = doc(db, "employees", id);
     await updateDoc(empRef, { ...emp });
    fetchEmployees();
  };

  const deleteEmployee = async (id: string) => {
    const empRef = doc(db, "employees", id);
    await deleteDoc(empRef);
    fetchEmployees();
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
