import React from "react";
import { EmployeeProvider } from "./context/EmployeeContext";
import EmployeeTable from "./components/EmployeeTable";

const App: React.FC = () => {
  return (
    <EmployeeProvider>
      <EmployeeTable />
    </EmployeeProvider>
  );
};

export default App;
