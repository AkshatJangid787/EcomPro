import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Home from '../components/Home';
import Profile from '../components/Profile';
import Cart from '../components/Cart';
import Unprotected from '../components/Unprotected';
import Private from '../components/Private';
import AdminDashboardPage from '../components/AdminDashboardPage';
import AdminProduct from '../components/AdminProduct';
import AdminUser from '../components/AdminUser';
import AdminOrder from '../components/AdminOrder';
import MyOrder from '../components/MyOrder';
import Order from '../components/Order';
import OpenRoute from '../components/OpenRoute';
import GoogleAuth from '../components/GoogleAuth';

const Router = createBrowserRouter([
    {
        element: <OpenRoute />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/cart", element: <Cart /> },
            { path: "/googleAuth", element: <GoogleAuth /> },
        ]
    },
    {
        element: <Unprotected />,
        children: [
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
        ]
    },
    {
        element: <Private allowedRole={["Admin"]} />,
        children: [
            {
                path: "/adminDashboard",
                element: <AdminDashboardPage />,
                children: [
                    { path: "admin/product", element: <AdminProduct /> },
                    { path: "admin/user", element: <AdminUser /> },
                    { path: "admin/order", element: <AdminOrder /> },
                ]
            }
        ]
    },
    {
        element: <Private allowedRole={["User"]} />,
        children: [
            { path: "/myorder", element: <MyOrder /> },
            { path: "/order", element: <Order /> }
        ]
    },
    {
        element: <Private allowedRole={["Admin", "User"]} />,
        children: [
            { path: "/profile", element: <Profile /> }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
]);

export default Router;
