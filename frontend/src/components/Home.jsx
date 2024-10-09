import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, fetchCart } from '../redux/slices/cartSlice';
import Carousel from './Carousel';
import Category from './Category';
import Footer from './Footer';
import { getAllProduct } from '../redux/slices/productSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(fetchCart());
  }, [dispatch]);

  const isInCart = (productId) => {
    return cart.some(item => item.productId._id === productId);
  };

  const handleCartToggle = (product) => {
    if (isInCart(product._id)) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(addToCart({ productId: product._id, quantity: 1 }));
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className='bg-gray-100'>
      <Carousel />
      <Category />
      
      <div className='w-[90%] mx-auto mt-12'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Featured Products</h2>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {products.map((product) => (
            <div 
              key={product._id} 
              className='bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'
            >
              <img 
                src={`http://localhost:5000/${product.productUrl}`} 
                alt={product.name} 
                className='w-full h-56 object-cover' 
              />
              
              <div className='p-4'>
                <h3 className='text-xl font-semibold mb-2'>{product.name}</h3>
                <p className='text-gray-600 mb-4'>₹{product.price.toFixed(2)}</p>
                
                <button 
                  onClick={() => handleCartToggle(product)}
                  className={`w-full py-2 rounded-lg font-semibold transition-colors duration-300 ${
                    isInCart(product._id)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {isInCart(product._id) ? "Remove from Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;