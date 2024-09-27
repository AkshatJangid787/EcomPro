import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import Carousel from './Carousel';
import Category from './Category';
import Product1 from "../assets/shirt.jpg";
import Footer from './Footer';

const Home = () => {
  const [products, setProducts] = useState([0, 1, 2, 3, 4, 5, 6, 7]);

  return (
    <div>
      <Carousel />
      <Category />
      <div className='w-[90%] mx-auto mt-8'>
        <h2 className='text-2xl font-bold mb-6'>Featured Products</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.map((item, i) => (
            <div key={i} className='border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'>
              <img src={Product1} alt="Product" className='w-full h-50 object-cover' />
              <div className='p-4'>
                <h3 className='text-lg font-semibold mb-1'>Slim Fit Jacket</h3>
                <p className='text-gray-700 mb-2'>Rs. 5499.00</p>
                <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300'>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
