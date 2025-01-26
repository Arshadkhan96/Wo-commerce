import React from 'react';
import './navigation.css';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";

const Navigation = () => {
    return (
        <>
            <nav className='navbar'>
                <nav className='logo'>
                    <MdOutlineShoppingCart className='cart' />
                    <h1>E-Commerce</h1>
                </nav>

                {/* <input type="text" placeholder='Search for products...' className='searchbox' /> */}

                <nav className='navname'>
                    <h3><Link to="/" className='heading'>Home</Link></h3>
                    <h3><Link to='/category' className='category'>Category</Link></h3>
                    <h3><Link to="/products" className='heading'>Products</Link></h3>
                    <h3> <Link to="/search" className='searchbox'>Search</Link></h3>   
                    <h3><Link to="/about" className='heading'>About</Link></h3>
                    <h3><Link to="/blog" className='heading'>Blog</Link></h3>
                    <h3><Link to="/contacts" className='heading'>Contacts</Link></h3>
                    <Link to="/signup" className='btn'>Sign Up</Link>
                    <Link to="/login" className='btn'>Login</Link>
                </nav>
            </nav>
        </>
    );
}

export default Navigation;
