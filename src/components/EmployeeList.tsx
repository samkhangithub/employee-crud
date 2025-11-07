// src/components/EmployeeList.tsx
import React from "react";
import { useEmployeesContext } from "../context/EmployeeContext";
import EmployeeItem from "./EmployeeItem";

const EmployeeList: React.FC = () => {
  const { employees, loading } = useEmployeesContext();

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Employee List</h2>
      {employees.length === 0 ? (
        <p className="text-gray-500">No employees found.</p>
      ) : (
        employees.map((emp) => <EmployeeItem key={emp.id} emp={emp} />)
      )}
    </div>
  );
};

export default EmployeeList;
