import React, { useState } from "react";
import { useEmployees } from "../context/EmployeeContext";
import EmployeeModal from "./EmployeeModal";
import { FaEdit, FaTrash } from "react-icons/fa";

const EmployeeTable: React.FC = () => {
  const { employees, deleteEmployee } = useEmployees();
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg py-4 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-center sm:text-left">
          Employee Management
        </h1>
        <button
          onClick={() => {
            setEditData(null);
            setShowModal(true);
          }}
          className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-50 hover:scale-105 transition duration-200"
        >
          + Add Employee
        </button>
      </header>

      {/* Main Table */}
      <main className="p-4 sm:p-8">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 p-4 sm:p-6 overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Employee List
          </h2>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-blue-50 text-gray-700 uppercase text-sm">
                  <th className="text-left py-3 px-4 rounded-l-lg">Name</th>
                  <th className="text-left py-3 px-4">Position</th>
                  <th className="text-left py-3 px-4">Salary</th>
                  <th className="text-center py-3 px-4 rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-blue-50 transition duration-200 border-b border-gray-100"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">{emp.name}</td>
                    <td className="py-3 px-4 text-gray-600">{emp.position}</td>
                    <td className="py-3 px-4 text-gray-700">${emp.salary}</td>
                    <td className="py-3 px-4 text-center flex justify-center gap-4">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition"
                        onClick={() => {
                          setEditData(emp);
                          setShowModal(true);
                        }}
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 transition"
                        onClick={() => emp.id && deleteEmployee(emp.id)}
                        title="Delete"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {employees.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-gray-500">
                      No employees yet — click “Add Employee” to create one ✨
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="md:hidden space-y-4">
            {employees.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                No employees yet — click “Add Employee” to create one ✨
              </p>
            ) : (
              employees.map((emp) => (
                <div
                  key={emp.id}
                  className="bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md p-4 border border-gray-200 flex flex-col gap-2"
                >
                  <p className="font-semibold text-gray-800 text-base">{emp.name}</p>
                  <p className="text-sm text-gray-600">Position: {emp.position}</p>
                  <p className="text-sm text-gray-700">Salary: ${emp.salary}</p>
                  <div className="flex justify-end gap-4 mt-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition"
                      onClick={() => {
                        setEditData(emp);
                        setShowModal(true);
                      }}
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => emp.id && deleteEmployee(emp.id)}
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {showModal && (
        <EmployeeModal
          onClose={() => setShowModal(false)}
          isEdit={!!editData}
          editData={editData}
        />
      )}
    </div>
  );
};

export default EmployeeTable;
