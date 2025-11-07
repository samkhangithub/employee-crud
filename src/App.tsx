import React from "react";
import { EmployeeProvider } from "./context/EmployeeContext";
import EmployeeTable from "./components/EmployeeTable";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <EmployeeProvider>
      <Toaster position="top-right" reverseOrder={false} />

      <EmployeeTable />
    </EmployeeProvider>
  );
};

export default App;
