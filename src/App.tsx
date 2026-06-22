import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import EmployeeHome from './components/employee/Home'
import Footer from './components/Footer'

import AdminHome from './components/adm/HomeAdm'
import Login from './components/Login'
import { useCallback, useState } from 'react'
import { loginWithEmailAndCpf } from './utils/request'
import { UserLogin } from './types/dto'
import { Employee, EmployeeSchema } from './types/employee'
import Header from './components/Header'
import z from 'zod'

const AUTH_STORAGE_KEY = 'payroll-auth-user';
const StoredEmployeeSchema = EmployeeSchema.extend({
  hireDate: z.coerce.date(),
});

function getStoredUser(): Employee | null {
  const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!storedUser) return null;

  try {
    const parsedUser = StoredEmployeeSchema.safeParse(JSON.parse(storedUser));
    if (parsedUser.success) return parsedUser.data;
  } catch {
    // Invalid storage data should not block the app from loading.
  }

  localStorage.removeItem(AUTH_STORAGE_KEY);
  return null;
}

function App() {
  const [usuario, setUsuario] = useState<Employee | null>(() => getStoredUser());

  const handleLogin = useCallback(async (credentials: UserLogin) => {
    const employee = await loginWithEmailAndCpf(credentials);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(employee));
    setUsuario(employee);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUsuario(null);
  }, []);

  return (
    <>
      {usuario && <Header employee={usuario} onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/login"
          element={usuario ? <Navigate to="/employee" replace /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/human-resources"
          element={usuario ? <AdminHome /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/employee"
          element={usuario ? <EmployeeHome employee={usuario} /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to={usuario ? "/employee" : "/login"} replace />} />
      </Routes>
      {usuario && <Footer />}
    </>
  )
}

export default App
