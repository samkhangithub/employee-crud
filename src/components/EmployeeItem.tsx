// src/components/EmployeeItem.tsx
import React, { useState } from "react";
import type  { Employee } from "../types";
import { useEmployeesContext } from "../context/EmployeeContext";

interface Props {
  emp: Employee;
}

const EmployeeItem: React.FC<Props> = ({ emp }) => {
  const { deleteEmployee, updateEmployee } = useEmployeesContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editEmp, setEditEmp] = useState<Employee>(emp);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditEmp({ ...editEmp, [name]: value });
  };

  const handleUpdate = async () => {
    if (emp.id) {
      await updateEmployee(emp.id, editEmp);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4 mb-2">
      {isEditing ? (
        <div className="grid grid-cols-2 gap-2 w-full">
          <input
            type="text"
            name="firstName"
            value={editEmp.firstName}
            onChange={handleChange}
            className="border rounded-md p-1"
          />
          <input
            type="text"
            name="lastName"
            value={editEmp.lastName}
            onChange={handleChange}
            className="border rounded-md p-1"
          />
          <input
            type="text"
            name="email"
            value={editEmp.email}
            onChange={handleChange}
            className="border rounded-md p-1"
          />
          <input
            type="text"
            name="position"
            value={editEmp.position}
            onChange={handleChange}
            className="border rounded-md p-1"
          />
          <input
            type="number"
            name="salary"
            value={editEmp.salary || ""}
            onChange={handleChange}
            className="border rounded-md p-1"
          />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full text-gray-800">
          <div>
            <p className="font-semibold">{emp.firstName} {emp.lastName}</p>
            <p className="text-sm text-gray-500">{emp.position}</p>
          </div>
          <p className="text-sm text-gray-500">{emp.email}</p>
          <p className="text-sm text-gray-700">${emp.salary}</p>
        </div>
      )}

      <div className="flex gap-2 mt-2 md:mt-0">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => emp.id && deleteEmployee(emp.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeItem;
