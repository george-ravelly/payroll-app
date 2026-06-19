import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import EmployeeHome from './components/employee/Home'
import Footer from './components/Footer'

import Header from './components/Header'
import AdminHome from './components/adm/HomeAdm'
// import Content from './components/Content/index.jsx'


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/human-resources" element={<AdminHome />} />
        <Route path="/employee" element={<EmployeeHome employee={{}} />} />
        <Route path="*" element={<Navigate to="/employee" replace />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
