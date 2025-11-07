import React, { useState, useEffect } from "react";
import { useEmployees } from "../context/EmployeeContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface ModalProps {
  onClose: () => void;
  isEdit?: boolean;
  editData?: {
    id: string;
    name: string;
    email: string;
    position: string;
    salary: string;
  };
}

const EmployeeModal: React.FC<ModalProps> = ({ onClose, isEdit, editData }) => {
  const { addEmployee, updateEmployee } = useEmployees();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isEdit && editData) {
      setName(editData.name);
      setEmail(editData.email);
      setPosition(editData.position);
      setSalary(editData.salary);
    }
  }, [isEdit, editData]);

  const handleSubmit = async () => {
    if (!name || !email || !position || !salary) {
      toast.error("Please fill in all fields!");
      return;
    }

    const data = { name, email, position, salary };

    try {
      setLoading(true);
      if (isEdit && editData?.id) {
        await updateEmployee(editData.id, data);
        toast.success("Employee updated successfully!");
      } else {
        await addEmployee(data);
        toast.success("Employee added successfully!");
      }
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative bg-gradient-to-b from-white to-blue-50/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-sm sm:max-w-md border border-white/40"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          {isEdit ? "Edit Employee" : "Add New Employee"}
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Position
            </label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Software Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Salary ($)
            </label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="e.g. 50000"
            />
          </div>
        </div>

        <div className="flex justify-between mt-8 gap-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="w-1/2 py-2.5 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-medium cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-1/2 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition duration-300 cursor-pointer text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-blue-600"
            }`}
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Adding..."
              : isEdit
              ? "Update"
              : "Add"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeeModal;
