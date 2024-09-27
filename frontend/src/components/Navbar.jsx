import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import { logout } from '../redux/slices/authSlice';
import { FaShoppingCart } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import { PiShoppingBagFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import Logo from "../assets/logo.png";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const Navbar = () => {
    const { isAuth, role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className='flex justify-between items-center p-4 bg-white shadow-md'>
            <div className='flex items-center'>
                <img src={Logo} alt="Logo" className='w-24 h-24 object-contain' />
            </div>
            
            <div className='w-1/3'>
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
                            <div className='flex gap-6 text-lg font-normal'>
                                <Link to="/cart" className='flex flex-col items-center text-gray-600 hover:text-black'>
                                    <FaShoppingCart size={24} />
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
                                <Link to="/adminDashboard" className='flex flex-col items-center text-gray-600 hover:text-black'>
                                    <MdOutlineDashboardCustomize size={24} />
                                    <span className='text-xs mt-1'>Dashboard</span>
                                </Link>
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
                        <div className='flex gap-6 text-lg font-normal'>
                            <Link to="/cart" className='flex flex-col items-center text-gray-600 hover:text-black'>
                                <FaShoppingCart size={24} />
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
