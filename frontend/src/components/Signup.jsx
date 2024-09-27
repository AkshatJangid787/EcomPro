import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { signup } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const validationSchema = z.object({
        name: z.string().min(1, "Name is required").max(40, "Name cannot exceed 40 characters"),
        email: z.string().min(1, "Email is required").email("Invalid Email"),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[a-z]/, "Password must contain at least 1 lower case letter")
            .regex(/[A-Z]/, "Password must contain at least 1 upper case letter")
            .regex(/[0-9]/, "Password must contain at least 1 number")
            .regex(/[\W_]/, "Password must contain at least 1 special character"),
        phoneNumber: z.string().min(10, "Phone number is required")
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(validationSchema)
    });

    const onSubmit = async (data) => {
        dispatch(signup(data));
    }

    useEffect(() => {
        if (error) {
            alert(error.message);
        }
    }, [error]);

    return (
        <div className='h-screen w-screen flex justify-center items-center bg-[#f9f9f9]'>
            <div className='flex w-3/4 md:w-1/3 h-[75%] justify-center items-center bg-white shadow-lg rounded-lg overflow-hidden p-6'>
                <div className='w-full h-full flex flex-col justify-start'>
                    <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>Create an Account</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='flex flex-col'>
                                <label className='text-gray-700 font-medium'>Name</label>
                                <input
                                    type="text"
                                    className={`block p-3 border rounded-md outline-none w-full shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-blue-300`}
                                    {...register("name")}
                                />
                                {errors.name && <p className='text-xs text-red-500'>{errors.name.message}</p>}
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-gray-700 font-medium'>Email</label>
                                <input
                                    type="email"
                                    className={`block p-3 border rounded-md outline-none w-full shadow-sm ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-blue-300`}
                                    {...register("email")}
                                />
                                {errors.email && <p className='text-xs text-red-500'>{errors.email.message}</p>}
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-gray-700 font-medium'>Password</label>
                                <input
                                    type="password"
                                    className={`block p-3 border rounded-md outline-none w-full shadow-sm ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-blue-300`}
                                    {...register("password")}
                                />
                                {errors.password && <p className='text-xs text-red-500'>{errors.password.message}</p>}
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-gray-700 font-medium'>Phone Number</label>
                                <input
                                    type="text"
                                    className={`block p-3 border rounded-md outline-none w-full shadow-sm ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-blue-300`}
                                    {...register("phoneNumber")}
                                />
                                {errors.phoneNumber && <p className='text-xs text-red-500'>{errors.phoneNumber.message}</p>}
                            </div>
                        </div>
                        <button className='p-3 w-full my-6 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 shadow-md'>
                            {isLoading ? "Loading..." : "Sign Up"}
                        </button>
                    </form>
                    <p className='mt-4 text-gray-600 text-center'>
                        Already have an account? 
                        <span className='text-blue-600 cursor-pointer hover:underline' onClick={() => navigate("/login")}> Log In</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
