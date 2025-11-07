import React, { useState, useEffect } from "react";
import { useEmployees } from "../context/EmployeeContext";
import { motion } from "framer-motion";

interface ModalProps {
  onClose: () => void;
  isEdit?: boolean;
  editData?: { id: string; name: string; position: string; salary: string };
}

const EmployeeModal: React.FC<ModalProps> = ({ onClose, isEdit, editData }) => {
  const { addEmployee, updateEmployee } = useEmployees();
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    if (isEdit && editData) {
      setName(editData.name);
      setPosition(editData.position);
      setSalary(editData.salary);
    }
  }, [isEdit, editData]);

  const handleSubmit = async () => {
    const data = { name, position, salary };
    if (isEdit && editData?.id) {
      await updateEmployee(editData.id, data);
    } else {
      await addEmployee(data);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center">
          {isEdit ? "Edit Employee" : "Add New Employee"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
          />
          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
          />
          <input
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
          />
        </div>

        <div className="flex justify-between mt-6 gap-3">
          <button
            onClick={onClose}
            className="w-1/2 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-md transition text-sm sm:text-base"
          >
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeeModal;
