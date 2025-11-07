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
      {" "}
      {/* Header */}{" "}
      <header className="bg-[#1e3a8a] text-[#ffffff] shadow-lg py-5 px-6 sm:px-10 flex flex-col sm:flex-row justify-between items-center gap-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-center sm:text-left">
          Employee Management
        </h1>

        <button
          onClick={() => {
            setEditData(null);
            setShowModal(true);
          }}
          className="relative px-5 py-2 bg-[#ffffff] text-[#1e3a8a] font-semibold rounded-xl shadow-md border border-transparent hover:bg-[#2563eb] hover:text-[#ffffff] hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="inline-block align-middle">➕</span> Add Employee
          </div>
        </button>
      </header>
      <main className="p-4 sm:p-8">
        {" "}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 p-4 sm:p-6 overflow-x-auto">
          {" "}
          <h2 className="text-lg sm:text-xl  text-gray-800 mb-4">
            {" "}
            Employee List{" "}
          </h2>{" "}
          <div className="hidden md:block">
            {" "}
            <table className="w-full border-collapse">
              {" "}
              <thead>
                {" "}
                <tr className="bg-[#1e3a8a] text-[#ffffff] uppercase text-sm">
                  <th className="text-left py-3 px-4 rounded-l-lg">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Position</th>
                  <th className="text-left py-3 px-4">Salary</th>
                  <th className="text-center py-3 px-4 rounded-r-lg">
                    Actions
                  </th>
                </tr>
              </thead>{" "}
              <tbody>
                {" "}
                {employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-[#2563eb]/10 transition duration-200 border-b border-gray-100"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {emp.name}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{emp.email}</td>
                    <td className="py-3 px-4 text-gray-600">{emp.position}</td>
                    <td className="py-3 px-4 text-gray-700">${emp.salary}</td>
                    <td className="py-3 px-4 text-center flex justify-center gap-4">
                      <button
                        className="text-[#ffffff] cursor-pointer bg-[#1e3a8a] p-2 rounded-full hover:bg-[#2563eb] transition"
                        onClick={() => {
                          setEditData(emp);
                          setShowModal(true);
                        }}
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        className="text-[#ffffff] cursor-pointer bg-red-600 p-2 rounded-full hover:bg-red-700 transition"
                        onClick={() => emp.id && deleteEmployee(emp.id)}
                        title="Delete"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}{" "}
                {employees.length === 0 && (
                  <tr>
                    {" "}
                    <td colSpan={8} className="text-center py-10 text-gray-500">
                      {" "}
                      No employees yet — click “Add Employee” to create one ✨{" "}
                    </td>{" "}
                  </tr>
                )}{" "}
              </tbody>{" "}
            </table>{" "}
          </div>{" "}
          <div className="md:hidden space-y-4">
            {" "}
            {employees.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                {" "}
                No employees yet — click “Add Employee” to create one ✨{" "}
              </p>
            ) : (
              employees.map((emp) => (
                <div
                  key={emp.id}
                  className="bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md p-4 border border-gray-200 flex flex-col gap-2"
                >
                  {" "}
                  <p className="font-semibold text-gray-800 text-base">
                    {" "}
                    {emp.name}{" "}
                  </p>{" "}
                  <p className="text-sm text-gray-600">Email: {emp.email}</p>
                  <p className="text-sm text-gray-600">
                    {" "}
                    Position: {emp.position}{" "}
                  </p>{" "}
                  <p className="text-sm text-gray-700">Salary: ${emp.salary}</p>{" "}
                  <div className="flex justify-end gap-4 mt-2">
                    {" "}
                    <button
                      className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                      onClick={() => {
                        setEditData(emp);
                        setShowModal(true);
                      }}
                    >
                      {" "}
                      <FaEdit size={16} className="cursor-pointer" />{" "}
                    </button>{" "}
                    <button
                      className="text-red-600 hover:text-red-800 transition cursor-pointer"
                      onClick={() => emp.id && deleteEmployee(emp.id)}
                    >
                      {" "}
                      <FaTrash size={16} className="cursor-pointer" />{" "}
                    </button>{" "}
                  </div>{" "}
                </div>
              ))
            )}{" "}
          </div>{" "}
        </div>{" "}
      </main>{" "}
      {showModal && (
        <EmployeeModal
          onClose={() => setShowModal(false)}
          isEdit={!!editData}
          editData={editData}
        />
      )}{" "}
    </div>
  );
};
export default EmployeeTable;
