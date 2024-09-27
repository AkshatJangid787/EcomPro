import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='bg-[#f1f0f0] py-10 mt-10'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-lg font-bold mb-4'>About Us</h3>
            <p className='text-gray-700'>
              We are an e-commerce platform dedicated to providing quality products at the best prices.
            </p>
          </div>
          <div>
            <h3 className='text-lg font-bold mb-4'>Customer Service</h3>
            <ul>
              <li className='mb-2'><a href="/contact" className='text-gray-700 hover:text-blue-500'>Contact Us</a></li>
              <li className='mb-2'><a href="/faq" className='text-gray-700 hover:text-blue-500'>FAQs</a></li>
              <li className='mb-2'><a href="/returns" className='text-gray-700 hover:text-blue-500'>Returns & Exchanges</a></li>
              <li className='mb-2'><a href="/shipping" className='text-gray-700 hover:text-blue-500'>Shipping Info</a></li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-bold mb-4'>Quick Links</h3>
            <ul>
              <li className='mb-2'><a href="/products" className='text-gray-700 hover:text-blue-500'>Products</a></li>
              <li className='mb-2'><a href="/cart" className='text-gray-700 hover:text-blue-500'>Cart</a></li>
              <li className='mb-2'><a href="/login" className='text-gray-700 hover:text-blue-500'>Login</a></li>
              <li className='mb-2'><a href="/signup" className='text-gray-700 hover:text-blue-500'>Sign Up</a></li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-bold mb-4'>Follow Us</h3>
            <div className='flex space-x-4'>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className='text-gray-700 hover:text-blue-500' size={24} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className='text-gray-700 hover:text-blue-500' size={24} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className='text-gray-700 hover:text-blue-500' size={24} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className='text-gray-700 hover:text-blue-500' size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-gray-300 mt-11 py-4 text-center'>
        <p className='text-gray-600'>© 2024 Your E-Commerce Site. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
