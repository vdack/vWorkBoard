import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link
  } from 'react-router-dom';
import './ButtomBar.css';

export function ButtomBar() {
    
    return (
    <nav className='ButtomBar'>
        <div className='ButtomBar-container'>
            <li className='ButtomBar-item'>
                <Link to='/home' className='ButtomBar-links'>
                    Home
                </Link>
            </li>
            <li className='ButtomBar-item'>
                <Link to='/login' className='ButtomBar-links'>
                    Login
                </Link>
            </li>
            <li className='ButtomBar-item'>
                <Link to='/register' className='ButtomBar-links'>
                    Register
                </Link>
            </li>
            <li className='ButtomBar-item'>
                <Link to='/about' className='ButtomBar-links'>
                    About
                </Link>
            </li>
        </div>
    </nav>
    );
};