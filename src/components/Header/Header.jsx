import React, { useEffect, useState } from 'react';
import './Header.css';

// import { motion } from 'framer-motion';
// import logo from '../../assets/images/eco-logo.png';
import { NavLink } from 'react-router-dom';

const nav__links = [
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'create',
        display: 'Create'
    },
    {
        path: 'survey',
        display: 'Survey'
    },

];

export default function Header() {

    const [isSticky, setIsSticky] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 65) {
                setIsSticky(true);
            }
            else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    });

    return (
        <header className={`header ${isSticky ? "nav__sticky" : ""}`}>
            <div className="nav__wrapper">

                <div className='nav__logo' >
                    <NavLink to='/home' className='nav__logo'>
                        {/* <img src={logo} alt="logo" /> */}
                        <p>POLLMASTER</p>
                    </NavLink>
                </div>

                <div className="nav__menu">
                    <ul className='nav__list'>
                        {nav__links.map((item, index) => (
                            <li className='nav__item' key={index}>
                                <NavLink to={item.path} className={(navClass) => navClass.isActive ? 'nav__active' : ""}>{item.display}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </header>

    )
}