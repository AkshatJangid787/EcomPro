import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const validationSchema = z.object({
        email: z.string().min(1, "Email is required").email("Invalid Email"),
        password: z.string().min(1, "Password is required")
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, error, isAuth } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(validationSchema)
    });

    const onSubmit = async (data) => {
        dispatch(login(data));
    }

    useEffect(() => {
        if (error) {
            alert(error.message);
        }
    }, [error]);

    useEffect(() => {
        if (isAuth) {
            navigate("/");
        }
    }, [isAuth]);

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/api/auth/google';
    };

    return (
        <div className='h-screen w-screen flex justify-center items-center bg-[#f1f1f1]'>
            <div className='flex w-1/3 h-[80%] justify-center items-center bg-white shadow-lg rounded-lg overflow-hidden'>
                <div className='w-full h-full flex flex-col justify-center items-center p-8'>
                    <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>Welcome Back!</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                        <div className='w-full flex flex-col mb-4'>
                            <label className='text-gray-700 font-medium'>Email</label>
                            <input
                                type="email"
                                className={`block p-3 border rounded-md outline-none w-full my-1 shadow-sm ${errors.email ? 'border-red-500' : "border-gray-300"} focus:ring focus:ring-blue-300`}
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className='text-xs text-red-500'>{errors.email.message}</p>
                            )}
                        </div>
                        <div className='w-full flex flex-col mb-4'>
                            <label className='text-gray-700 font-medium'>Password</label>
                            <input
                                type="password"
                                className={`block p-3 border rounded-md outline-none w-full my-1 shadow-sm ${errors.password ? 'border-red-500' : "border-gray-300"} focus:ring focus:ring-blue-300`}
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className='text-xs text-red-500'>{errors.password.message}</p>
                            )}
                        </div>
                        <button className='p-3 w-full my-4 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 shadow-md'>
                            {isLoading ? "Loading..." : "Log In"}
                        </button>
                    </form>
                    <div className='my-4'>
                        <button className='p-3 w-full font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-300 shadow-md' onClick={handleGoogleLogin}>
                            Log In With Google
                        </button>
                    </div>
                    <p className='mt-4 text-gray-600'>
                        Don't have an account? 
                        <span className='text-blue-600 cursor-pointer hover:underline' onClick={() => navigate("/signup")}> Sign Up</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
