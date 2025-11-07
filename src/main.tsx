import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { EmployeeProvider } from "./context/EmployeeContext";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EmployeeProvider>
      <App />
    </EmployeeProvider>
  </StrictMode>,
)
