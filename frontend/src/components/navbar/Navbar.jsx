import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa6';
import { LiaTimesSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import logo from '../../assete/logo/logo_remote_careers-removebg-preview.png';
import axiosInstance from '../../axios/axios';

const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const navLinks = [
        { href: '/jobs', label: 'Find Jobs' },
        { href: '/saved-jobs', label: 'Saved jobs' },
        { href: '/blog', label: 'Blog' },
    ];

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                await axiosInstance.post('/auth/logout/', { refresh_token: refreshToken });
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Check if user is logged in
    const isLoggedIn = !!localStorage.getItem('access_token');

    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const menu = document.getElementById('navbar-menu');
            if (open && menu && !menu.contains(event.target)) {
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    return (
        <nav className='w-full h-[8ch] bg-neutral-50 flex items-center justify-between lg:px-32 md:px-16 sm:px-7 px-4 z-50 border-b border-neutral-200'>
            {/* Logo Section */}
            <Link to="/" className='text-2xl text-hover font-bold flex items-start'>
                <img className='w-40 cursor-pointer block hover:opacity-85' src={logo} alt="logo" />
            </Link>

            {/* Toggle button for mobile */}
            <button
                onClick={handleClick}
                className='lg:hidden text-neutral-600 ease-in-out duration-300'
                style={{ zIndex: 1000 }} // Ensure it appears above other elements
            >
                {open ? <LiaTimesSolid className='text-xl' /> : <FaBars className='text-xl' />}
            </button>

            {/* Menu Items and Buttons */}
            <div
                id="navbar-menu"
                className={`lg:flex ${open ? 'flex' : 'hidden'} flex-col lg:flex-row  items-center absolute lg:static top-[8ch] w-full lg:w-auto bg-neutral-50 lg:bg-transparent border-b lg:border-none border-neutral-200 shadow-md lg:shadow-none 
                
                flex-1 border rounded-3xl`}
                style={{ zIndex: 999 }} // Ensure it appears above other elements
            >
                {/* Menu Items */}
                <ul className='flex flex-col lg:flex-row gap-y-3 lg:gap-x-7 text-base text-neutral-500 font-medium w-full p-4 lg:p-4'>
                    {navLinks.map((nav) => (
                        <li key={nav.href} className='w-full lg:w-auto'>
                            <Link to={nav.href} onClick={handleClose} className='hover:text-primary ease-in-out duration-300 block w-full py-2 lg:py-0'>
                                {nav.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Buttons */}
                <div className='flex flex-col lg:flex-row items-center gap-y-2 lg:gap-x-5 text-base font-medium text-neutral-50 w-full lg:w-auto p-4 lg:p-0'>
                    {!isLoggedIn ? (
                        <>
                            <Link to='/signUp' className='w-full lg:w-auto'>
                                <button className="w-full lg:w-fit px-6 py-2 rounded-full bg-primary hover:bg-hover ease-in-out duration-300">
                                    Sign Up
                                </button>
                            </Link>
                            <Link to='/login' className='w-full lg:w-auto'>
                                <button className="w-full lg:w-fit px-6 py-2 rounded-full bg-primary hover:bg-hover ease-in-out duration-300">
                                    Log In
                                </button>
                            </Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="w-full lg:w-fit px-6 py-2 rounded-full bg-primary hover:bg-hover ease-in-out duration-300">
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;