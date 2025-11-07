// src/components/EmployeeForm.tsx
import React, { useState } from "react";
import { useEmployeesContext } from "../context/EmployeeContext";
import type  { Employee } from "../types";

const EmployeeForm: React.FC = () => {
  const { addEmployee } = useEmployeesContext();

  const [employee, setEmployee] = useState<Employee>({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    salary: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee.firstName || !employee.lastName || !employee.email || !employee.position) {
      alert("Please fill all required fields");
      return;
    }
    await addEmployee(employee);
    setEmployee({ firstName: "", lastName: "", email: "", position: "", salary: 0 });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <input
        type="text"
        name="firstName"
        value={employee.firstName}
        onChange={handleChange}
        placeholder="First Name"
        className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="lastName"
        value={employee.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        name="email"
        value={employee.email}
        onChange={handleChange}
        placeholder="Email"
        className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="position"
        value={employee.position}
        onChange={handleChange}
        placeholder="Position"
        className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="salary"
        value={employee.salary || ""}
        onChange={handleChange}
        placeholder="Salary"
        className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="col-span-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Add Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
