// src/App.tsx
import React from "react";
import { EmployeeProvider } from "./context/EmployeeContext";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";

const App: React.FC = () => {
  return (
    <EmployeeProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">
          Employee Management System
        </h1>
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
          <EmployeeForm />
          <EmployeeList />
        </div>
      </div>
    </EmployeeProvider>
  );
};

export default App;
