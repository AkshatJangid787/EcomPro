import React from 'react';

const DashboardOverview = () => {
    return (
        <div className="p-6 bg-gray-100 h-full">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Users Card */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">Total Users</h2>
                    <p className="text-2xl mt-4">1,245</p>
                </div>

                {/* Products Card */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">Total Products</h2>
                    <p className="text-2xl mt-4">456</p>
                </div>

                {/* Orders Card */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">Total Orders</h2>
                    <p className="text-2xl mt-4">789</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
