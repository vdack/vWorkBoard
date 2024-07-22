import { useState, useEffect, } from 'react';
import { useCookies } from 'react-cookie';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link, 
} from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { BoardPage } from './pages/BoardPage';
import { RegisterPage } from './pages/RegisterPage';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
function App() {
  const [cookies, setCookies] = useCookies(['authorized', 'authToken']);
  useEffect(()=>{
    if (!cookies['authorized']) {
      setCookies('authorized', false, {path: '/', maxAge: 60*60, sameSite: 'none',});
    }
    
  }, [])

  let authorized = cookies.authorized;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={authorized ? (<Navigate to="/home" />) : (<LoginPage />)} />
          <Route path="/register" element={authorized? (<Navigate to="/home" />) : (<RegisterPage />)} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/board" element={<BoardPage />} /> 
        </Routes>
      </Router>
    </>
  )
}

export default App
