import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import { logout } from '../redux/slices/authSlice';
import { FaShoppingCart } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import { PiShoppingBagFill } from "react-icons/pi";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import Logo from "../assets/logo.png";
import { MdOutlineDashboardCustomize } from "react-icons/md";
// Import Badge from Material UI
import { Badge } from '@mui/material'; // Material UI Badge component

const Navbar = () => {
    const { isAuth, role } = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart); // Get cart state
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate('/');
    };

    // Function to calculate the total number of items in the cart
    const getTotalItems = () => {
        return cart.items.reduce((acc, item) => acc + item.quantity, 0); // Sum all item quantities
    };

    const renderDashboardOrHomeButton = () => {
        if (location.pathname === '/adminDashboard') {
            return (
                <Link to="/" className='flex flex-col items-center text-gray-600 hover:text-black'>
                    <AiFillHome size={24} />
                    <span className='text-xs mt-1'>Home</span>
                </Link>
            );
        } else {
            return (
                <Link to="/adminDashboard" className='flex flex-col items-center text-gray-600 hover:text-black'>
                    <MdOutlineDashboardCustomize size={24} />
                    <span className='text-xs mt-1'>Dashboard</span>
                </Link>
            );
        }
    };

    return (
        <nav className='flex justify-between items-center p-4 bg-white shadow-md'>
            <div className='flex items-center'>
                <Link to="/">
                    <img src={Logo} alt="Logo" className='w-16 md:w-24 h-16 md:h-24 object-contain' />
                </Link>
            </div>
            
            <div className='hidden sm:block w-1/3'>
                <input 
                    type="text" 
                    placeholder='Search...' 
                    className='p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500' 
                />
            </div>

            <div>
                {
                    isAuth ? (
                        role === "User" ? (
                            <div className='flex gap-4 md:gap-6 text-lg font-normal'>
                                <Link to="/" className='flex flex-col items-center text-gray-600 hover:text-black'>
                                    <AiFillHome size={24} />
                                    <span className='text-xs mt-1'>Home</span>
                                </Link>
                                <Link to="/cart" className='flex flex-col items-center text-gray-600 hover:text-black relative'>
                                    {/* Dynamic Badge for Cart Items */}
                                    <Badge badgeContent={getTotalItems()} color="error">
                                        <FaShoppingCart size={24} />
                                    </Badge>
                                    <span className='text-xs mt-1'>Cart</span>
                                </Link>
                                <Link to="/myorder" className='flex flex-col items-center text-gray-600 hover:text-black'>
                                    <PiShoppingBagFill size={24} />
                                    <span className='text-xs mt-1'>My Orders</span>
                                </Link>
                                <Link to="/profile" className='flex flex-col items-center text-gray-600 hover:text-black'>
                                    <CgProfile size={24} />
                                    <span className='text-xs mt-1'>Profile</span>
                                </Link>
                                <button 
                                    className='text-gray-600 hover:text-red-600 transition-colors' 
                                    onClick={handleLogout}
                                >
                                    <MdLogout size={28} />
                                </button>
                            </div>
                        ) : (
                            <div className='flex gap-6 text-lg font-normal'>
                                 {renderDashboardOrHomeButton()}
                                <button 
                                    className='text-gray-600 hover:text-red-600 transition-colors' 
                                    onClick={handleLogout}
                                >
                                    <MdLogout size={28} />
                                </button>
                            </div>
                        )
                    ) :
                    (
                        <div className='flex gap-4 md:gap-6 text-lg font-normal'>
                            <Link to="/" className='flex flex-col items-center text-gray-600 hover:text-black'>
                                <AiFillHome size={24} />
                                <span className='text-xs mt-1'>Home</span>
                            </Link>
                            <Link to="/cart" className='flex flex-col items-center text-gray-600 hover:text-black relative'>
                                {/* Dynamic Badge for Cart Items */}
                                <Badge badgeContent={getTotalItems()} color="error">
                                    <FaShoppingCart size={24} />
                                </Badge>
                                <span className='text-xs mt-1'>Cart</span>
                            </Link>
                            <Link to="/login" className='flex flex-col items-center text-gray-600 hover:text-black'>
                                <RiLoginBoxFill size={24} />
                                <span className='text-xs mt-1'>Login</span>
                            </Link>
                            <Link to="/signup" className='flex flex-col items-center text-gray-600 hover:text-black'>
                                <FaUserPlus size={24} />
                                <span className='text-xs mt-1'>Signup</span>
                            </Link>
                        </div>
                    )
                }
            </div>
        </nav>
    );
}

export default Navbar;
