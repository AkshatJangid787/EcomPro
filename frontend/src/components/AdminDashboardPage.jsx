import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const AdminDashboardPage = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-6 bg-gray-100 h-screen overflow-y-scroll">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboardPage;
