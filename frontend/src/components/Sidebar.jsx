import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDashboardCustomize, MdLogout } from 'react-icons/md';
import { FaUsers, FaProductHunt } from 'react-icons/fa';
import { PiShoppingBagFill } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="w-64 bg-white p-6 shadow-lg h-screen">
            <ul className="space-y-6">
                <li>
                    <Link to="/adminDashboard" className="flex items-center space-x-2 text-gray-700 hover:text-black">
                        <MdOutlineDashboardCustomize size={24} />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="admin/product" className="flex items-center space-x-2 text-gray-700 hover:text-black">
                        <FaProductHunt size={24} />
                        <span>Products</span>
                    </Link>
                </li>
                <li>
                    <Link to="admin/user" className="flex items-center space-x-2 text-gray-700 hover:text-black">
                        <FaUsers size={24} />
                        <span>Users</span>
                    </Link>
                </li>
                <li>
                    <Link to="admin/order" className="flex items-center space-x-2 text-gray-700 hover:text-black">
                        <PiShoppingBagFill size={24} />
                        <span>Orders</span>
                    </Link>
                </li>
            </ul>
            <div className="mt-auto">
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 mt-8"
                >
                    <MdLogout size={24} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
