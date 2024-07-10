import { useState, useEffect } from 'react'
import './App.css'
import { LoginPage } from './pages/LoginPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link, 
} from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
function App() {

  useEffect(()=>{
    localStorage.setItem('authToken', '3');
    localStorage.setItem('name', 'vdack');
  }, [])

  let authorized = localStorage.getItem('authToken').length > 0;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={authorized ? (<Navigate to="/home" />) : (<LoginPage />)} />
          <Route path="/register" element={authorized? (<Navigate to="/home" />) : (<RegisterPage />)} />
          <Route path="/about" element={<AboutPage />} /> 
        </Routes>
      </Router>
    </>
  )
}

export default App
