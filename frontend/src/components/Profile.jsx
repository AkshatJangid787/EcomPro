import React from 'react';
import { useSelector } from 'react-redux';
import { FaUserAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';  // Icons for better visuals

const Profile = () => {
  // Fetch user details from the Redux store
  const user = useSelector((state) => state.auth.user);
 
  
  return (
    <div className='max-w-md mx-auto my-10 p-6'>
      <h2 className='text-3xl font-extrabold text-gray-900 mb-6 text-center'>Profile Details</h2>
      {user ? (
        <div className='bg-white shadow-lg rounded-lg p-8'>
          <div className='flex items-center mb-6'>
            <FaUserAlt className='text-3xl text-blue-500 mr-4' />
            <div>
              <h3 className='text-xl font-semibold text-gray-700'>Name</h3>
              <p className='text-lg text-gray-900'>{user.name}</p>
            </div>
          </div>
          <div className='flex items-center mb-6'>
            <FaEnvelope className='text-3xl text-blue-500 mr-4' />
            <div>
              <h3 className='text-xl font-semibold text-gray-700'>Email</h3>
              <p className='text-lg text-gray-900'>{user.email}</p>
            </div>
          </div>
          <div className='flex items-center'>
            <FaPhoneAlt className='text-3xl text-blue-500 mr-4' />
            <div>
              <h3 className='text-xl font-semibold text-gray-700'>Phone</h3>
              <p className='text-lg text-gray-900'>{user.phone}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center bg-red-100 text-red-600 p-4 rounded-lg shadow-md'>
          <p className='text-lg'>No user details available. Please log in.</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
