// Cart.js corrections
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, fetchCart, updateCartItem } from '../redux/slices/cartSlice';
import OrderModal from './OrderModal';
import emptCart from '../assets/emptCart.png';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId, quantity) => {
    dispatch(updateCartItem({ productId, quantity: quantity + 1 }));
  };

  const handleDecreaseQuantity = (productId, quantity) => {
    if (quantity > 1) {
      dispatch(updateCartItem({ productId, quantity: quantity - 1 }));
    }
  };

  const handleOrderNow = () => {
    const order = {
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price
      })),
      total: cart.total
    };
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="cart-container max-w-5xl mx-auto p-6 md:p-10 bg-white rounded-lg shadow-xl mt-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Shopping Cart</h2>

      {cart.items.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-xl">Your cart is empty 😔</p>
          <img 
            src={emptCart}
            alt="Empty Cart" 
            className="mx-auto mt-8 w-36 md:w-48"
          />
        </div>
      ) : (
        <div className="space-y-10">
          <ul className="space-y-6">
            {cart.items.map((item) => (
              <li 
                key={item.productId._id} 
                className="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-200 rounded-lg shadow-lg p-4"
              >
                <div className="flex items-center space-x-6">
                  <img 
                    src={`http://localhost:5000/${item.productId.productUrl}`} 
                    alt={item.productId.name} 
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{item.productId.name}</h3>
                    <p className="text-gray-500">₹{item.productId.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                </div>

                <div className="flex items-center mt-4 md:mt-0 space-x-3">
                  <button 
                    className={`text-lg font-semibold px-3 py-1 rounded-lg ${item.quantity === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => handleDecreaseQuantity(item.productId._id, item.quantity)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2">
                    {item.quantity}
                  </span>
                  <button 
                    className="text-lg font-semibold px-3 py-1 rounded-lg"
                    onClick={() => handleIncreaseQuantity(item.productId._id, item.quantity)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="text-red-500 hover:text-red-700 font-semibold mt-4 md:mt-0"
                  onClick={() => handleRemove(item.productId._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h3 className="text-xl font-semibold">Total:</h3>
              <span className="text-xl font-bold text-green-500">₹{cart.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={handleOrderNow}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}

      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        order={currentOrder} 
      />
    </div>
  );
};

export default Cart;