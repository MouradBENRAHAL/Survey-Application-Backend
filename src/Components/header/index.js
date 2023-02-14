import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <header className='navbar'>
            <BrowserRouter>
                <div className='navbar__title navbar__item'> Winshot Survey </div>
                <div className='navbar__item'>Contact</div>
                <div className='navbar__item'><Link to="/survey"> </Link>Your survey</div>
                <div className='navbar__item navbar_paddin_gright'>Profile</div>
            </BrowserRouter>
        </header>

    )
}

export default Header
