import React, { useEffect, useState } from 'react';
import './navigation.css';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";

const Navigation = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(() => {
        return JSON.parse(localStorage.getItem('user')); // Parse user data only once on mount
    });

    // Redirect unauthenticated users to login page only once
    useEffect(() => {
        if (!auth) {
            navigate('/login', { replace: true }); // Use replace to prevent infinite redirection loops
        }
    }, []); // Empty dependency array to run only once

    const logOut = () => {
        localStorage.clear();
        setAuth(null); // Update state to reflect logout
        navigate('/logOut', { replace: true }); // some time logOut change to login
    };

    return (
        <nav className='navbar'>
            <div className='logo'>
                <MdOutlineShoppingCart className='cart' />
                <h1>E-Commerce</h1>
            </div>

            <div className='navname'>
                {auth ? (
                    <>
                        <h3><Link to="/" className='heading'>Home</Link></h3>
                        <h3><Link to="/products" className='heading'>Products</Link></h3>
                        <h3><Link to="/search" className='searchbox'>Search</Link></h3>   
                        <h3><Link to="/about" className='heading'>About</Link></h3>
                        <h3><Link to="/blog" className='heading'>Blog</Link></h3>
                        <h3><Link to="/contacts" className='heading'>Contacts</Link></h3>
                        {/* <h3><Link to="/profile" title={auth?.name} className='heading'>Profile</Link></h3> */}
                        <h3><Link to="/updateProfile" className='heading'>EditProfile</Link></h3>
                    </>
                ) : (
                    <>
                        <button onClick={logOut} className='btn'>Logout</button>
                        <h3><Link to="/profile" title={auth?.name} className='heading'>Profile</Link></h3>
                      
                        <Link to="/login" className='btn'>Login</Link>

                    </>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
